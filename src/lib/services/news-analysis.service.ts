import ZAI from 'z-ai-web-dev-sdk';

export interface NewsArticle {
  title: string;
  content: string;
  source: string;
  publishedAt: Date;
  url?: string;
}

export interface NewsAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  summary: string;
  keyPoints: string[];
  impact: 'high' | 'medium' | 'low';
  relatedAssets: string[];
  recommendations: string[];
}

export class NewsAnalysisService {
  private zai: any;

  async initialize() {
    this.zai = await ZAI.create();
  }

  async analyzeNews(article: NewsArticle): Promise<NewsAnalysis> {
    if (!this.zai) {
      await this.initialize();
    }

    const analysisPrompt = `Analyze this financial news article:

Title: ${article.title}
Content: ${article.content}
Source: ${article.source}
Date: ${article.publishedAt.toLocaleDateString('pt-BR')}

Provide analysis in the following JSON format:
{
  "sentiment": "positive|negative|neutral",
  "summary": "2-3 sentence summary of the news",
  "keyPoints": ["key point 1", "key point 2", "key point 3"],
  "impact": "high|medium|low",
  "relatedAssets": ["TICKER1", "TICKER2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}

Guidelines:
- sentiment: overall tone of the news (positive = good for markets, negative = bad for markets, neutral = balanced)
- summary: concise summary in Portuguese
- keyPoints: main takeaways from the article
- impact: potential market impact (high = major market-moving news, medium = moderate impact, low = minor impact)
- relatedAssets: list of ticker symbols mentioned or affected by this news (PETR4, VALE3, etc.)
- recommendations: actionable insights for investors (not specific buy/sell recommendations)`;

    try {
      const completion = await this.zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert financial news analyst. Analyze news articles for market impact, sentiment, and provide actionable insights for investors. Always respond in valid JSON format.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        thinking: { type: 'disabled' }
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        throw new Error('Empty response from AI');
      }

      // Parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid JSON response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      return analysis;
    } catch (error) {
      console.error('News analysis error:', error);
      throw new Error('Erro ao analisar notícia');
    }
  }

  async analyzeMultipleNews(articles: NewsArticle[]): Promise<NewsAnalysis[]> {
    const analyses = await Promise.all(
      articles.map(article => this.analyzeNews(article))
    );
    return analyses;
  }

  async getMarketSentiment(articles: NewsArticle[]): Promise<{
    overall: 'positive' | 'negative' | 'neutral';
    positiveCount: number;
    negativeCount: number;
    neutralCount: number;
  }> {
    const analyses = await this.analyzeMultipleNews(articles);

    const positiveCount = analyses.filter(a => a.sentiment === 'positive').length;
    const negativeCount = analyses.filter(a => a.sentiment === 'negative').length;
    const neutralCount = analyses.filter(a => a.sentiment === 'neutral').length;

    let overall: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (positiveCount > negativeCount && positiveCount > neutralCount) {
      overall = 'positive';
    } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
      overall = 'negative';
    }

    return {
      overall,
      positiveCount,
      negativeCount,
      neutralCount
    };
  }

  async getInvestmentRecommendation(portfolio: any[], marketContext: string): Promise<string> {
    if (!this.zai) {
      await this.initialize();
    }

    const portfolioSummary = portfolio.map(asset =>
      `${asset.ticker}: ${asset.quantity} @ R$ ${asset.avgPrice} (${asset.profitPercent >= 0 ? '+' : ''}${asset.profitPercent.toFixed(2)}%)`
    ).join('\n');

    const prompt = `Based on the following portfolio and market context, provide general investment recommendations (not specific buy/sell):

Portfolio:
${portfolioSummary}

Market Context:
${marketContext}

Provide recommendations in Portuguese focusing on:
1. Portfolio diversification insights
2. Risk considerations
3. General sector trends
4. Suggestions for research/further learning

IMPORTANT: Do NOT provide specific buy/sell recommendations for individual stocks. Focus on educational insights and general strategy.`;

    try {
      const completion = await this.zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert investment advisor providing educational insights and general guidance. Never give specific buy/sell recommendations. Always include risk warnings.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        thinking: { type: 'disabled' }
      });

      return completion.choices[0]?.message?.content || 'Unable to generate recommendations';
    } catch (error) {
      console.error('Recommendation error:', error);
      throw new Error('Erro ao gerar recomendações');
    }
  }

  async getSectorAnalysis(sector: string, assets: any[]): Promise<{
    overview: string;
    trend: 'bullish' | 'bearish' | 'neutral';
    risks: string[];
    opportunities: string[];
  }> {
    if (!this.zai) {
      await this.initialize();
    }

    const sectorData = assets
      .filter(a => a.sector === sector)
      .map(a => `${a.ticker}: R$ ${a.price} (${a.changePercent >= 0 ? '+' : ''}${a.changePercent.toFixed(2)}%)`)
      .join('\n');

    const prompt = `Analyze this sector for investment insights:

Sector: ${sector}

Assets in sector:
${sectorData}

Provide analysis in the following JSON format:
{
  "overview": "brief sector overview",
  "trend": "bullish|bearish|neutral",
  "risks": ["risk 1", "risk 2"],
  "opportunities": ["opportunity 1", "opportunity 2"]
}

Respond in Portuguese.`;

    try {
      const completion = await this.zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert sector analyst. Provide factual insights about market sectors, their trends, risks, and opportunities. Always respond in valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        thinking: { type: 'disabled' }
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        throw new Error('Empty response from AI');
      }

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid JSON response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Sector analysis error:', error);
      throw new Error('Erro ao analisar setor');
    }
  }
}
