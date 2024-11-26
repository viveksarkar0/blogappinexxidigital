import prisma from '@/lib/db';
import axios from 'axios';
import { NextResponse } from 'next/server';

// NewsAPI Endpoint and API Key
const API_KEY = '96e0a59a87304e5c80d36591cc352c76';
const BASE_URL = 'https://newsapi.org/v2/everything';


export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10); 
  const limit = parseInt(url.searchParams.get('limit') || '10', 10); 

  try {

    const response = await axios.get(BASE_URL, {
      params: {
        q: 'tesla',
        from: '2024-10-26',
        sortBy: 'publishedAt',
        apiKey: API_KEY,
        page: page,
        pageSize: limit,
      },
    });

    const data = response.data;

    if (!data.articles || data.articles.length === 0) {
      return NextResponse.json({ error: 'No news articles found' }, { status: 404 });
    }

    // Map and store articles in the database
    const articles = await Promise.all(
      data.articles.map(async (article: {
        source: { id: any }; title: any; description: any; url:string; urlToImage: any; publishedAt: any; content: any;
      }) => {
        // Check if the article already exists in the database based on URL
        const existingArticle = await prisma.article.findUnique({
          where: { url: article.url }, 
        });

        // If the article does not exist, create a new one
        if (!existingArticle) {
          return await prisma.article.create({
            data: {
              title: article.title,
              description: article.description,
              url: article.url,
              image: article.urlToImage,
              publishedAt: new Date(article.publishedAt),
              content: article.content || '', 
            },
          });
        }

  
        return existingArticle;
      })
    );

    return NextResponse.json({
      articles,
      totalResults: data.totalResults,
    });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
