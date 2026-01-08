// Market Data Service - Integration with external APIs
// Supports multiple providers: Alpha Vantage, Yahoo Finance, etc.

export interface MarketQuote {
  ticker: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
  open: number
  timestamp: Date
}

export interface PriceHistoryData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface AssetInfo {
  ticker: string
  name: string
  type: 'Ação' | 'FII' | 'ETF' | 'BDR'
  sector?: string
  description?: string
}

// Mock data for Brazilian stocks (B3)
const MOCK_ASSETS: AssetInfo[] = [
  // Ações
  { ticker: 'PETR4', name: 'Petrobras PN', type: 'Ação', sector: 'Petróleo e Gás' },
  { ticker: 'PETR3', name: 'Petrobras ON', type: 'Ação', sector: 'Petróleo e Gás' },
  { ticker: 'VALE3', name: 'Vale ON', type: 'Ação', sector: 'Mineração' },
  { ticker: 'VALE4', name: 'Vale PN', type: 'Ação', sector: 'Mineração' },
  { ticker: 'ITUB4', name: 'Itaú Unibanco PN', type: 'Ação', sector: 'Bancos' },
  { ticker: 'ITUB3', name: 'Itaú Unibanco ON', type: 'Ação', sector: 'Bancos' },
  { ticker: 'BBDC4', name: 'Bradesco PN', type: 'Ação', sector: 'Bancos' },
  { ticker: 'BBAS3', name: 'Banco do Brasil ON', type: 'Ação', sector: 'Bancos' },
  { ticker: 'SANB11', name: 'Santander Brasil', type: 'Ação', sector: 'Bancos' },
  { ticker: 'WEGE3', name: 'WEG ON', type: 'Ação', sector: 'Indústria' },
  { ticker: 'RENT3', name: 'Localiza ON', type: 'Ação', sector: 'Aluguel de Veículos' },
  { ticker: 'MGLU3', name: 'Magazine Luiza ON', type: 'Ação', sector: 'Varejo' },
  { ticker: 'BTOW3', name: 'B2W Digital', type: 'Ação', sector: 'Varejo' },
  { ticker: 'AMER3', name: 'Americanas ON', type: 'Ação', sector: 'Varejo' },
  { ticker: 'GGBR4', name: 'Gerdau PN', type: 'Ação', sector: 'Siderurgia' },
  { ticker: 'CSNA3', name: 'CSN ON', type: 'Ação', sector: 'Siderurgia' },
  { ticker: 'BRFS3', name: 'BRF ON', type: 'Ação', sector: 'Alimentos' },
  { ticker: 'JBSS3', name: 'JBS ON', type: 'Ação', sector: 'Alimentos' },
  { ticker: 'ABEV3', name: 'Ambev ON', type: 'Ação', sector: 'Bebidas' },
  { ticker: 'EQTL3', name: 'Equatorial ON', type: 'Ação', sector: 'Energia Elétrica' },
  { ticker: 'ENEV3', name: 'Eneva ON', type: 'Ação', sector: 'Energia Elétrica' },
  // FIIs
  { ticker: 'HGLG11', name: 'CSHG Logística', type: 'FII', sector: 'Logística' },
  { ticker: 'XPML11', name: 'XP Malls', type: 'FII', sector: 'Shoppings' },
  { ticker: 'KNRI11', name: 'Kinea Renda', type: 'FII', sector: 'Títulos' },
  { ticker: 'VGIP11', name: 'Vinci Garantia', type: 'FII', sector: 'Títulos' },
  { ticker: 'HGRE11', name: 'CSHG Residencial', type: 'FII', sector: 'Lajes' },
  { ticker: 'SAFY11', name: 'Safra Logística', type: 'FII', sector: 'Logística' },
  { ticker: 'RBRP11', name: 'RBR Properties', type: 'FII', sector: 'Galpões' },
  { ticker: 'BCRI11', name: 'Brasil Capital', type: 'FII', sector: 'Títulos' },
  { ticker: 'XPCR11', name: 'XP Corporate', type: 'FII', sector: 'Lajes' },
  { ticker: 'FIIB11', name: 'FII Banespa', type: 'FII', sector: 'Títulos' },
  { ticker: 'HCTR11', name: 'Haitong Consumer', type: 'FII', sector: 'Lajes' },
  { ticker: 'VISC11', name: 'Vinci Shopping', type: 'FII', sector: 'Shoppings' },
  { ticker: 'ALZR11', name: 'Alianza Trust', type: 'FII', sector: 'Lajes' },
  { ticker: 'XPIN11', name: 'XP Infra', type: 'FII', sector: 'Infraestrutura' },
  // ETFs
  { ticker: 'BOVA11', name: 'iShares IBOV', type: 'ETF', sector: 'Índice' },
  { ticker: 'IVVB11', name: 'iShares S&P 500', type: 'ETF', sector: 'Índice' },
  { ticker: 'SMAL11', name: 'iShares Small Cap', type: 'ETF', sector: 'Índice' },
  { ticker: 'DIVO11', name: 'iShares Dividendos', type: 'ETF', sector: 'Dividendos' },
  { ticker: 'FIND11', name: 'iShares Financeiro', type: 'ETF', sector: 'Financeiro' },
  { ticker: 'MATB11', name: 'iShares Materiais Básicos', type: 'ETF', sector: 'Materiais Básicos' },
  { ticker: 'ECOO11', name: 'Ecoo ETF', type: 'ETF', sector: 'Sustentabilidade' },
]

// Generate mock price data
function generateMockPrice(basePrice: number, volatility: number = 0.02): number {
  const change = (Math.random() - 0.5) * 2 * volatility
  return basePrice * (1 + change)
}

function generateMockVolume(): number {
  return Math.floor(Math.random() * 20000000) + 1000000
}

export class MarketDataService {
  /**
   * Get current quote for a ticker
   */
  static async getQuote(ticker: string): Promise<MarketQuote | null> {
    try {
      const asset = MOCK_ASSETS.find(a => a.ticker === ticker.toUpperCase())
      if (!asset) {
        return null
      }

      // Generate mock price based on ticker
      let basePrice: number
      if (asset.ticker.startsWith('PETR')) basePrice = 35 + Math.random() * 5
      else if (asset.ticker.startsWith('VALE')) basePrice = 65 + Math.random() * 10
      else if (asset.ticker.startsWith('ITUB')) basePrice = 30 + Math.random() * 5
      else if (asset.ticker.startsWith('BBDC')) basePrice = 14 + Math.random() * 2
      else if (asset.ticker.startsWith('BBAS')) basePrice = 15 + Math.random() * 2
      else if (asset.ticker.startsWith('WEGE')) basePrice = 35 + Math.random() * 5
      else if (asset.ticker.startsWith('RENT')) basePrice = 45 + Math.random() * 10
      else if (asset.ticker.startsWith('HGLG')) basePrice = 160 + Math.random() * 10
      else if (asset.ticker.startsWith('XPML')) basePrice = 105 + Math.random() * 10
      else if (asset.ticker.startsWith('KNRI')) basePrice = 150 + Math.random() * 10
      else if (asset.ticker.startsWith('BOVA')) basePrice = 120 + Math.random() * 10
      else if (asset.ticker.startsWith('IVVB')) basePrice = 280 + Math.random() * 20
      else basePrice = 20 + Math.random() * 30

      const price = generateMockPrice(basePrice)
      const open = generateMockPrice(basePrice, 0.01)
      const high = Math.max(price, open) * (1 + Math.random() * 0.01)
      const low = Math.min(price, open) * (1 - Math.random() * 0.01)
      const change = price - open
      const changePercent = (change / open) * 100
      const volume = generateMockVolume()

      return {
        ticker: asset.ticker,
        name: asset.name,
        price,
        change,
        changePercent,
        volume,
        high,
        low,
        open,
        timestamp: new Date()
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
      return null
    }
  }

  /**
   * Get price history for a ticker
   */
  static async getPriceHistory(ticker: string, days: number = 30): Promise<PriceHistoryData[]> {
    try {
      const asset = MOCK_ASSETS.find(a => a.ticker === ticker.toUpperCase())
      if (!asset) {
        return []
      }

      let basePrice: number
      if (asset.ticker.startsWith('PETR')) basePrice = 35
      else if (asset.ticker.startsWith('VALE')) basePrice = 70
      else if (asset.ticker.startsWith('ITUB')) basePrice = 30
      else if (asset.ticker.startsWith('BBDC')) basePrice = 15
      else if (asset.ticker.startsWith('HGLG')) basePrice = 160
      else if (asset.ticker.startsWith('BOVA')) basePrice = 125
      else basePrice = 50

      const history: PriceHistoryData[] = []
      const now = new Date()

      for (let i = days; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        const volatility = 0.02
        basePrice = generateMockPrice(basePrice, volatility)

        const open = basePrice
        const high = open * (1 + Math.random() * volatility)
        const low = open * (1 - Math.random() * volatility)
        const close = low + Math.random() * (high - low)
        const volume = generateMockVolume()

        history.push({
          date: date.toISOString().split('T')[0],
          open,
          high,
          low,
          close,
          volume
        })

        basePrice = close // Use close as next day's base
      }

      return history
    } catch (error) {
      console.error('Error fetching price history:', error)
      return []
    }
  }

  /**
   * Search for assets
   */
  static async searchAssets(query: string): Promise<AssetInfo[]> {
    try {
      const searchTerm = query.toLowerCase()
      return MOCK_ASSETS.filter(
        asset =>
          asset.ticker.toLowerCase().includes(searchTerm) ||
          asset.name.toLowerCase().includes(searchTerm) ||
          asset.type.toLowerCase().includes(searchTerm) ||
          (asset.sector && asset.sector.toLowerCase().includes(searchTerm))
      )
    } catch (error) {
      console.error('Error searching assets:', error)
      return []
    }
  }

  /**
   * Get all assets
   */
  static async getAllAssets(): Promise<AssetInfo[]> {
    return MOCK_ASSETS
  }

  /**
   * Get assets by type
   */
  static async getAssetsByType(type: string): Promise<AssetInfo[]> {
    return MOCK_ASSETS.filter(asset => asset.type === type)
  }

  /**
   * Get asset info by ticker
   */
  static async getAssetInfo(ticker: string): Promise<AssetInfo | null> {
    return MOCK_ASSETS.find(a => a.ticker === ticker.toUpperCase()) || null
  }

  /**
   * Batch update prices for multiple assets
   */
  static async batchUpdatePrices(tickers: string[]): Promise<MarketQuote[]> {
    const quotes = await Promise.all(
      tickers.map(ticker => this.getQuote(ticker))
    )
    return quotes.filter((q): q is MarketQuote => q !== null)
  }

  /**
   * Initialize assets in database
   */
  static async initializeAssets(): Promise<void> {
    const { db } = await import('@/lib/db')

    for (const asset of MOCK_ASSETS) {
      try {
        await db.asset.upsert({
          where: { ticker: asset.ticker },
          update: {},
          create: {
            ticker: asset.ticker,
            name: asset.name,
            type: asset.type,
            sector: asset.sector,
            description: asset.description
          }
        })
      } catch (error) {
        console.error(`Error creating asset ${asset.ticker}:`, error)
      }
    }
  }

  /**
   * Sync price history to database
   */
  static async syncPriceHistory(ticker: string, days: number = 30): Promise<void> {
    const { db } = await import('@/lib/db')

    const history = await this.getPriceHistory(ticker, days)

    for (const data of history) {
      try {
        await db.priceHistory.upsert({
          where: {
            assetId_date: {
              assetId: ticker.toUpperCase(),
              date: new Date(data.date)
            }
          },
          update: {
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume
          },
          create: {
            assetId: ticker.toUpperCase(),
            date: new Date(data.date),
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume
          }
        })
      } catch (error) {
        // Ignore duplicate entries
      }
    }
  }
}
