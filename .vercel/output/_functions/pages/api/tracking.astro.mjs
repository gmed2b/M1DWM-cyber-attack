import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

const db = await createRemoteDatabaseClient({
  dbType: "libsql",
  remoteUrl: "libsql://cybersecurite-gmed2b.turso.io",
  appToken: process.env.ASTRO_DB_APP_TOKEN ?? "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDIyMjQ4ODYsImlkIjoiNzU1OTk4ZjAtMTZhZi00YTlhLThiYTEtODQxNmM0ZWE1MTVjIn0.8c1juxGM3R6CtluO2ITQw9glqRp2qm4fTKYTrmgTA1rlHTGm62LOGj5ZUQ907aYMJQPZNo1k2q0--72aCzU8DQ"
});
const DataTracking = asDrizzleTable("DataTracking", { "columns": { "key": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "key", "collection": "DataTracking", "primaryKey": false, "optional": false } }, "value": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "value", "collection": "DataTracking", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const prerender = false;
const ALLOWED_KEYS = [
  "access",
  "click_username",
  "click_password",
  "click_login_btn",
  "form_submit",
  "click_chat_input",
  "click_send_chat_btn"
];
const operationQueue = [];
let isProcessing = false;
async function processQueue() {
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
async function incrementKey(key) {
  try {
    const existingRecord = await db.select().from(DataTracking).where(eq(DataTracking.key, key)).limit(1);
    if (existingRecord.length > 0) {
      await db.update(DataTracking).set({ value: existingRecord[0].value + 1 }).where(eq(DataTracking.key, key));
    } else {
      await db.insert(DataTracking).values({
        key,
        value: 1
      });
    }
  } catch (error) {
    console.error(`Error incrementing key ${key}:`, error);
    throw error;
  }
}
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const promises = ALLOWED_KEYS.filter(
      (key) => data[key]
    ).map((key) => {
      return new Promise((resolve, reject) => {
        operationQueue.push(async () => {
          try {
            await incrementKey(key);
            resolve();
          } catch (error) {
            reject(error);
          }
        });
        processQueue();
      });
    });
    await Promise.all(promises);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error processing tracking data:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
