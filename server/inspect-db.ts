import { db } from "./src/prisma/db.ts";

console.log("ORM:");
console.log(db.orm);

console.log("\nORM KEYS:");
console.log(Object.keys(db.orm));

for (const key of Object.keys(db.orm)) {
  console.log(`\n${key}:`);
  console.log(db.orm[key as keyof typeof db.orm]);
}

await db.close();