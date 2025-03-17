import type { APIRoute } from "astro";
import { DataTracking, db, eq } from "astro:db";

// Définir les clés autorisées
const ALLOWED_KEYS: string[] = [
  "access",
  "click_username",
  "click_password",
  "click_login_btn",
  "click_chat_input",
  "click_send_chat_btn",
];

// Type pour une opération dans la queue
type QueueOperation = () => Promise<void>;

// Queue pour gérer les opérations de base de données concurrentes
const operationQueue: QueueOperation[] = [];
let isProcessing: boolean = false;

// Fonction pour traiter la queue
async function processQueue(): Promise<void> {
  if (isProcessing || operationQueue.length === 0) return;

  isProcessing = true;

  try {
    const operation = operationQueue.shift();
    if (operation) {
      await operation();
    }
  } catch (error) {
    console.error("Error processing queue:", error);
  } finally {
    isProcessing = false;
    if (operationQueue.length > 0) {
      processQueue();
    }
  }
}

// Fonction pour incrémenter une valeur en base de données
async function incrementKey(key: string): Promise<void> {
  try {
    // Vérifier si la clé existe déjà
    const existingRecord = await db
      .select()
      .from(DataTracking)
      .where(eq(DataTracking.key, key))
      .limit(1);

    if (existingRecord.length > 0) {
      // Incrémenter la valeur existante
      await db
        .update(DataTracking)
        .set({ value: existingRecord[0].value + 1 })
        .where(eq(DataTracking.key, key));
    } else {
      // Créer une nouvelle entrée
      await db.insert(DataTracking).values({
        key: key,
        value: 1,
      });
    }
  } catch (error) {
    console.error(`Error incrementing key ${key}:`, error);
    throw error;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Pour chaque clé autorisée présente dans les données, incrémenter sa valeur
    const promises: Promise<void>[] = ALLOWED_KEYS.filter(
      (key) => data[key]
    ).map((key) => {
      return new Promise<void>((resolve, reject) => {
        // Ajouter l'opération à la queue
        operationQueue.push(async () => {
          try {
            await incrementKey(key);
            resolve();
          } catch (error) {
            reject(error);
          }
        });

        // Démarrer le traitement de la queue
        processQueue();
      });
    });

    // Attendre que toutes les opérations soient terminées
    await Promise.all(promises);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing tracking data:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
