import ZAI from 'z-ai-web-dev-sdk';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class InvestmentAssistant {
  private zai: any;
  private messages: ChatMessage[] = [];
  private maxHistory: number = 20;

  private systemPrompt = `You are an expert investment assistant for the Brazilian stock market (B3). 

Your role is to help users make informed investment decisions by providing:
- Educational information about stocks, FIIs, ETFs, and other financial instruments
- Technical and fundamental analysis concepts
- Risk management strategies
- Portfolio diversification recommendations
- Market insights and trends

IMPORTANT GUIDELINES:
1. NEVER give specific buy/sell recommendations for individual stocks
2. ALWAYS include risk warnings when discussing investments
3. Emphasize that past performance does not guarantee future results
4. Recommend consulting with a licensed financial advisor for major decisions
5. Provide balanced views discussing both risks and opportunities
6. Use clear, accessible language but maintain professional tone
7. When discussing specific stocks, focus on factual information about the company, sector, and general market conditions

ANSWER FORMAT:
- Start with a direct answer to the user's question
- Provide supporting details and context
- Include relevant risk factors or considerations
- End with a helpful follow-up question or suggestion
- Keep responses concise (max 3-4 paragraphs) unless user asks for more detail
- Use bullet points when listing multiple items`;

  async initialize() {
    this.zai = await ZAI.create();
    this.messages = [
      {
        role: 'system',
        content: this.systemPrompt
      }
    ];
  }

  async chat(userMessage: string, portfolioContext?: any): Promise<string> {
    if (!this.zai) {
      await this.initialize();
    }

    // Add portfolio context if available
    let enhancedMessage = userMessage;
    if (portfolioContext) {
      enhancedMessage = `User's portfolio context: ${JSON.stringify(portfolioContext)}\n\nUser question: ${userMessage}`;
    }

    // Add user message to history
    this.messages.push({
      role: 'user',
      content: enhancedMessage
    });

    // Trim history if exceeding limit
    if (this.messages.length > this.maxHistory) {
      this.messages = [
        this.messages[0], // Keep system prompt
        ...this.messages.slice(-this.maxHistory + 1)
      ];
    }

    try {
      const completion = await this.zai.chat.completions.create({
        messages: this.messages,
        thinking: { type: 'disabled' }
      });

      const assistantResponse = completion.choices[0]?.message?.content;

      if (!assistantResponse) {
        throw new Error('Empty response from AI');
      }

      // Add assistant response to history
      this.messages.push({
        role: 'assistant',
        content: assistantResponse
      });

      return assistantResponse;
    } catch (error) {
      console.error('AI Chat error:', error);
      throw new Error('Erro ao processar sua pergunta. Por favor, tente novamente.');
    }
  }

  async analyzeAsset(ticker: string, assetData: any): Promise<string> {
    if (!this.zai) {
      await this.initialize();
    }

    const analysisPrompt = `Analyze this asset for investment consideration:

Ticker: ${ticker}
Name: ${assetData.name}
Type: ${assetData.type}
Sector: ${assetData.sector}
Recent Price: R$ ${assetData.price}
30-Day Change: ${assetData.changePercent}%
Volume: ${assetData.volume}

Please provide:
1. A brief overview of the company/asset type
2. Key factors that could influence the stock price
3. Risks associated with this investment
4. What investors should research further

Keep it concise and factual.`;

    const completion = await this.zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: this.systemPrompt
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      thinking: { type: 'disabled' }
    });

    return completion.choices[0]?.message?.content || 'Unable to generate analysis';
  }

  async getPortfolioRecommendations(portfolioData: any[]): Promise<string> {
    if (!this.zai) {
      await this.initialize();
    }

    const prompt = `Analyze this investment portfolio and provide recommendations:

Portfolio:
${portfolioData.map(asset => 
  `- ${asset.ticker} (${asset.name}): ${asset.quantity} units @ R$ ${asset.avgPrice}, current R$ ${asset.currentPrice}, ${asset.profitPercent >= 0 ? '+' : ''}${asset.profitPercent.toFixed(2)}%`
).join('\n')}

Total Invested: R$ ${portfolioData.reduce((sum, a) => sum + a.totalInvested, 0).toFixed(2)}
Current Value: R$ ${portfolioData.reduce((sum, a) => sum + a.total, 0).toFixed(2)}
Total Return: ${((portfolioData.reduce((sum, a) => sum + a.total, 0) / portfolioData.reduce((sum, a) => sum + a.totalInvested, 0) - 1) * 100).toFixed(2)}%

Provide:
1. Portfolio diversification analysis
2. Sector concentration assessment
3. Risk level evaluation
4. General improvement suggestions (not specific buy/sell recommendations)
5. Educational insights about the portfolio composition`;

    const completion = await this.zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: this.systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      thinking: { type: 'disabled' }
    });

    return completion.choices[0]?.message?.content || 'Unable to generate portfolio analysis';
  }

  async explainConcept(concept: string): Promise<string> {
    if (!this.zai) {
      await this.initialize();
    }

    const prompt = `Explain this investment concept clearly and concisely for an investor: "${concept}"

Include:
1. Simple definition
2. How it works in practice
3. Common use cases in investing
4. Key risks or considerations to understand

Keep it under 300 words.`;

    const completion = await this.zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: this.systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      thinking: { type: 'disabled' }
    });

    return completion.choices[0]?.message?.content || 'Unable to generate explanation';
  }

  getHistory(): ChatMessage[] {
    return this.messages;
  }

  clearHistory() {
    this.messages = [
      {
        role: 'system',
        content: this.systemPrompt
      }
    ];
  }

  getMessageCount(): number {
    // Subtract 1 for system message
    return Math.max(0, this.messages.length - 1);
  }
}
