import { column, defineDb, defineTable } from "astro:db";

// Définition du modèle pour les logins
const DataTracking = defineTable({
  columns: {
    key: column.text({ unique: true }),
    value: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    DataTracking,
  },
});
