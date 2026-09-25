import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from './prisma/db.js'
import authRoutes from './routes/auth.routes.js'
import cvRoutes from './routes/cv.routes.js'
import educationRoutes from './routes/education.routes.js'

const app = new Hono()
app.route('/api/auth', authRoutes)
app.route('/api/cv', cvRoutes)
app.route('/api/education', educationRoutes)

app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'AI CV Builder API is running'
  })
})

app.get('/api/db-test', async (c) => {
  try {
    const users = await db.orm.public.User.all()

    return c.json({
      success: true,
      message: 'Database connected successfully',
      users
    })
  } catch (error) {
    console.error('Database error:', error)

    return c.json({
      success: false,
      message: 'Database connection failed'
    }, 500)
  }
})

serve({
  fetch: app.fetch,
  port: 5000
})

console.log('Server running on http://localhost:5000')