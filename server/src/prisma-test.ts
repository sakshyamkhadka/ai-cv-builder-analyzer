import { db } from './prisma/db.js'

async function test() {
  try {
    const plan = db.sql.public.user
      .select('id')
      .limit(1)
      .build()

    const result = await db.runtime().query(plan)

    console.log(result)
  } catch (error) {
    console.error(error)
  } finally {
    await db.close()
  }
}

test()