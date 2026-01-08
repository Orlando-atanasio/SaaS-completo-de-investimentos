/**
 * Market Data Service - Integrates with Alpha Vantage API
 * For free stock market data
 */

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || ''
const BASE_URL = 'https://www.alphavantage.co/query'

export interface QuoteData {
  symbol: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  latestTradingDay: string
}

export interface TimeSeriesData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

/**
 * Get real-time quote for a stock symbol
 */
export async function getQuote(symbol: string): Promise<QuoteData | null> {
  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (data['Global Quote']?.['01. symbol']) {
      return {
        symbol: data['Global Quote']['01. symbol'],
        open: parseFloat(data['Global Quote']['02. open']),
        high: parseFloat(data['Global Quote']['03. high']),
        low: parseFloat(data['Global Quote']['04. low']),
        close: parseFloat(data['Global Quote']['05. price']),
        volume: parseInt(data['Global Quote']['06. volume']),
        latestTradingDay: data['Global Quote']['07. latest trading day']
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching quote:', error)
    return null
  }
}

/**
 * Get historical time series data for a stock symbol
 */
export async function getTimeSeries(
  symbol: string,
  interval: 'DAILY' | 'WEEKLY' | 'MONTHLY' = 'DAILY'
): Promise<TimeSeriesData[] | null> {
  try {
    const url = `${BASE_URL}?function=TIME_SERIES_${interval}&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    const timeSeriesKey = `Time Series (${interval})`

    if (data[timeSeriesKey]) {
      const timeSeries: TimeSeriesData[] = Object.entries(data[timeSeriesKey]).map(([date, values]: [string, any]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      }))

      return timeSeries.sort((a, b) => a.date.localeCompare(b.date))
    }

    return null
  } catch (error) {
    console.error('Error fetching time series:', error)
    return null
  }
}

/**
 * Search for stock symbols
 */
export async function searchSymbols(keywords: string): Promise<any[] | null> {
  try {
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${ALPHA_VANTAGE_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (data.bestMatches) {
      return data.bestMatches.map((match: any) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        marketOpen: match['5. marketOpen'],
        marketClose: match['6. marketClose'],
        timezone: match['7. timezone'],
        currency: match['8. currency'],
        matchScore: match['9. matchScore']
      }))
    }

    return null
  } catch (error) {
    console.error('Error searching symbols:', error)
    return null
  }
}

/**
 * Generate mock data for Brazilian stocks (since Alpha Vantage is US-focused)
 */
export function generateBrazilianStockData(ticker: string): {
  quote: QuoteData
  timeSeries: TimeSeriesData[]
} {
  const basePrice = 30 + Math.random() * 20
  const now = new Date()

  const timeSeries: TimeSeriesData[] = []
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const volatility = (Math.random() - 0.5) * 2
    const open = basePrice + volatility
    const close = basePrice + volatility * (Math.random() - 0.5)
    const high = Math.max(open, close) + Math.random() * 1
    const low = Math.min(open, close) - Math.random() * 1

    timeSeries.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 20000000) + 5000000
    })
  }

  const latest = timeSeries[timeSeries.length - 1]

  return {
    quote: {
      symbol: ticker,
      open: latest.open,
      high: latest.high,
      low: latest.low,
      close: latest.close,
      volume: latest.volume,
      latestTradingDay: latest.date
    },
    timeSeries
  }
}
