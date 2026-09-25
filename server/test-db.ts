import { db } from "./src/prisma/db.ts";

async function test() {
  try {
    const users = await db.orm.public.User.all();

    console.log("DATABASE CONNECTION SUCCESS");
    console.log(users);
  } catch (error) {
    console.error("DATABASE ERROR:");
    console.error(error);
  } finally {
    await db.close();
  }
}

test();