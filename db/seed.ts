import { DataTracking, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(DataTracking).values([
    { key: "access", value: 0 },
    { key: "click_username", value: 0 },
    { key: "click_password", value: 0 },
    { key: "click_login_btn", value: 0 },
    { key: "click_chat_input", value: 0 },
    { key: "click_send_chat_btn", value: 0 },
  ]);
}
