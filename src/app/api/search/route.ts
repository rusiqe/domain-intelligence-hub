import { NextRequest, NextResponse } from 'next/server'
import { SearchQuery, SearchResult } from '@/types'
import { generateSuggestionsWithAI } from '@/lib/ai/suggestions'

export async function POST(request: NextRequest) {
  try {
    const body: SearchQuery = await request.json()
    
    // Validate required fields
    if (!body.keywords || body.keywords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Keywords are required' },
        { status: 400 }
      )
    }

    const suggestions = await generateSuggestionsWithAI(body)

    const result: SearchResult = {
      query: body,
      suggestions,
      totalResults: suggestions.length,
      searchTime: Math.random() * 2 + 0.5,
      aiInsights: `Based on your keywords "${body.keywords.join(', ')}", prioritize memorability and clarity. Favor .com when available; otherwise consider .io/.ai.`
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date()
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        timestamp: new Date()
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to search for domains.',
    timestamp: new Date()
  }, { status: 405 })
}
