import { Server } from 'socket.io'

// Mock data for real-time prices
const mockAssets = {
  PETR4: { price: 36.45, change: 2.34 },
  VALE3: { price: 68.90, change: -1.23 },
  ITUB4: { price: 32.15, change: 0.89 },
  BBDC4: { price: 14.32, change: -0.78 },
  WEGE3: { price: 35.67, change: 3.21 },
  HGLG11: { price: 162.50, change: 0.15 },
  XPML11: { price: 108.90, change: 1.45 },
  BOVA11: { price: 125.67, change: 1.23 },
}

const PORT = 3003

// Create Socket.IO server
const io = new Server(PORT, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

console.log(`🚀 Real-time Quotes Service running on port ${PORT}`)

// Store active subscriptions
const subscriptions = new Map<string, Set<string>>()

// Helper function to generate price movement
function simulatePriceMovement(basePrice: number, volatility: number = 0.001): number {
  const change = (Math.random() - 0.5) * 2 * volatility
  return Math.max(basePrice * (1 + change), basePrice * 0.9) // Max 10% drop
}

// Broadcast price updates every 2 seconds
setInterval(() => {
  const updates: any[] = []

  for (const [ticker, data] of Object.entries(mockAssets)) {
    const newPrice = simulatePriceMovement(data.price)
    const priceChange = ((newPrice - data.price) / data.price) * 100

    const update = {
      ticker,
      price: newPrice,
      change: priceChange,
      volume: Math.floor(Math.random() * 1000000) + 100000,
      timestamp: new Date().toISOString()
    }

    // Update mock data
    mockAssets[ticker as keyof typeof mockAssets] = {
      price: newPrice,
      change: priceChange
    }

    updates.push(update)
  }

  // Broadcast to all connected clients
  io.emit('quotes', updates)

  console.log(`📊 Broadcasted ${updates.length} price updates`)
}, 2000)

// Handle connections
io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`)

  // Send initial prices
  const initialPrices = Object.entries(mockAssets).map(([ticker, data]) => ({
    ticker,
    price: data.price,
    change: data.change,
    timestamp: new Date().toISOString()
  }))

  socket.emit('initial', initialPrices)

  // Handle subscription to specific tickers
  socket.on('subscribe', (tickers: string[]) => {
    console.log(`📡 Client ${socket.id} subscribed to: ${tickers.join(', ')}`)

    const userSubscriptions = subscriptions.get(socket.id) || new Set()
    tickers.forEach(ticker => userSubscriptions.add(ticker.toUpperCase()))
    subscriptions.set(socket.id, userSubscriptions)

    socket.emit('subscribed', {
      tickers: Array.from(userSubscriptions),
      message: `Subscribed to ${tickers.length} tickers`
    })
  })

  // Handle unsubscription
  socket.on('unsubscribe', (tickers: string[]) => {
    console.log(`📤 Client ${socket.id} unsubscribed from: ${tickers.join(', ')}`)

    const userSubscriptions = subscriptions.get(socket.id) || new Set()
    tickers.forEach(ticker => userSubscriptions.delete(ticker.toUpperCase()))
    subscriptions.set(socket.id, userSubscriptions)

    socket.emit('unsubscribed', {
      tickers,
      message: `Unsubscribed from ${tickers.length} tickers`
    })
  })

  // Handle request for specific ticker
  socket.on('get_quote', (ticker: string) => {
    const upperTicker = ticker.toUpperCase()
    const data = mockAssets[upperTicker as keyof typeof mockAssets]

    if (data) {
      socket.emit('quote', {
        ticker: upperTicker,
        price: data.price,
        change: data.change,
        timestamp: new Date().toISOString()
      })
    } else {
      socket.emit('error', {
        message: `Ticker ${upperTicker} not found`
      })
    }
  })

  // Handle ping/pong for keep-alive
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: new Date().toISOString() })
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`)
    subscriptions.delete(socket.id)
  })

  // Send current subscriptions
  socket.on('get_subscriptions', () => {
    const userSubscriptions = subscriptions.get(socket.id) || new Set()
    socket.emit('subscriptions', Array.from(userSubscriptions))
  })
})

// Server events
io.on('error', (error) => {
  console.error('❌ Socket.IO error:', error)
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...')
  io.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...')
  io.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})
