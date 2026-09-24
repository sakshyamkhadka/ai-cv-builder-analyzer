import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'AI CV Builder API is running'
  })
})

serve({
  fetch: app.fetch,
  port: 5000
})

console.log('Server running on http://localhost:5000')