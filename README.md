# 🌐 Domain Intelligence Hub

> AI-powered domain search, analysis, and acquisition platform with Bitcoin payments

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/domain-intelligence-hub)

## 🚀 Overview

Domain Intelligence Hub is an intelligent domain search and acquisition platform that leverages AI to help users discover, analyze, and purchase domains across multiple registrars. Built with LangChain for intelligent decision-making and deployed on Vercel for lightning-fast performance.

### ✨ Key Features

- **🔍 AI-Powered Domain Search**: Intelligent domain suggestions using LangChain agents
- **💰 Multi-Registrar Price Comparison**: Real-time pricing across major domain providers
- **₿ Bitcoin Payment Integration**: Secure cryptocurrency payments via Lightning Network
- **📊 Domain Valuation AI**: ML-driven domain value estimation
- **🎯 SEO & Brandability Analysis**: Automated domain quality assessment
- **⚡ Bulk Domain Checker**: Process hundreds of domains simultaneously
- **📈 Market Trend Analysis**: AI insights on domain market dynamics

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js UI    │───▶│  Vercel Edge     │───▶│   LangChain     │
│   (Frontend)    │    │   Functions      │    │   Agents        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              ┌──────────────────┐    ┌─────────────────┐
         │              │   Domain APIs    │    │  AI/ML Models   │
         │              │  (Registrars)    │    │   (OpenAI)      │
         │              └──────────────────┘    └─────────────────┘
         ▼
┌─────────────────┐
│   Bitcoin/LN    │
│   Payment       │
└─────────────────┘
```

## 🛠️ Tech Stack

### Core Technologies
- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Vercel Edge Functions, Node.js
- **AI/ML**: LangChain, OpenAI GPT-4, Custom domain analysis models
- **Payments**: Lightning Network, Bitcoin integration
- **Database**: Vercel KV (Redis), PostgreSQL for analytics
- **Styling**: Tailwind CSS, shadcn/ui components

### External APIs
- **Domain Registrars**: Namecheap, GoDaddy, Porkbun, Cloudflare
- **Domain Intelligence**: Whois API, DNS lookup services
- **SEO Data**: Ahrefs API, Moz API
- **Market Data**: Domain sales databases, trending keywords

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- OpenAI API key
- Bitcoin Lightning wallet (for payments)

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/domain-intelligence-hub.git
cd domain-intelligence-hub
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
# AI Configuration
OPENAI_API_KEY=your_openai_api_key
LANGCHAIN_API_KEY=your_langchain_api_key

# Domain APIs
NAMECHEAP_API_KEY=your_namecheap_key
GODADDY_API_KEY=your_godaddy_key
PORKBUN_API_KEY=your_porkbun_key

# Bitcoin/Lightning
LIGHTNING_WALLET_MACAROON=your_wallet_macaroon
LIGHTNING_NODE_URL=your_node_url

# Database
KV_URL=your_vercel_kv_url
POSTGRES_URL=your_postgres_connection

# Analytics (Optional)
AHREFS_API_KEY=your_ahrefs_key
MOZ_API_KEY=your_moz_key
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Core Features

### AI Domain Search
```typescript
// Example: AI-powered domain suggestions
const suggestions = await searchDomains({
  business: "AI consulting company",
  keywords: ["intelligence", "consulting", "AI"],
  budget: 500,
  preferences: ["short", "brandable", ".com preferred"]
});
```

### Price Comparison
```typescript
// Compare prices across registrars
const pricing = await comparePrices("example.com");
// Returns: { namecheap: $12.99, godaddy: $14.99, porkbun: $9.99 }
```

### Domain Analysis
```typescript
// Comprehensive domain evaluation
const analysis = await analyzeDomain("example.com");
// Returns: SEO score, brandability, market value, availability
```

## 📁 Project Structure

```
domain-intelligence-hub/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 api/               # API routes
│   ├── 📁 search/            # Search page
│   ├── 📁 analyze/           # Analysis dashboard
│   └── 📁 checkout/          # Payment flow
├── 📁 components/            # React components
│   ├── 📁 ui/               # shadcn/ui components
│   ├── 📁 domain/           # Domain-specific components
│   └── 📁 payment/          # Payment components
├── 📁 lib/                  # Utility libraries
│   ├── 📁 ai/              # LangChain configurations
│   ├── 📁 domain-apis/     # Registrar integrations
│   ├── 📁 bitcoin/         # Crypto payment logic
│   └── 📁 analytics/       # Domain analysis tools
├── 📁 types/               # TypeScript definitions
└── 📁 docs/               # Documentation
```

## 🔧 API Endpoints

### Domain Search
- `GET /api/search` - AI-powered domain search
- `GET /api/suggestions` - Generate domain suggestions
- `GET /api/availability` - Bulk availability checker

### Domain Analysis  
- `GET /api/analyze/:domain` - Comprehensive domain analysis
- `GET /api/pricing/:domain` - Price comparison across registrars
- `GET /api/valuation/:domain` - AI domain valuation

### Payments
- `POST /api/payment/invoice` - Generate Lightning invoice
- `GET /api/payment/status/:id` - Check payment status
- `POST /api/purchase` - Complete domain purchase

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
```bash
npm run build
vercel --prod
```

### Environment Variables in Production
Ensure all required environment variables are set in your Vercel project settings.

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 📊 Analytics & Monitoring

- **Performance**: Vercel Analytics integration
- **Errors**: Sentry error tracking
- **Usage**: Custom analytics dashboard
- **AI Costs**: OpenAI usage monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- LangChain team for the AI framework
- Vercel for hosting and edge functions
- Domain registrars for API access

## 📞 Support

- 📧 Email: support@domainintelligencehub.com
- 💬 Discord: [Join our community](https://discord.gg/your-server)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/domain-intelligence-hub/issues)

---

**Built with ❤️ and AI** | [Website](https://domainintelligencehub.com) | [Documentation](https://docs.domainintelligencehub.com)
