import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: any) {
  const { id } = params; 

  try {

    const article = await prisma.article.findUnique({
      where: {
        id: id, 
      },
    });

    if (!article) {
   
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    
    return NextResponse.json({
      id: article.id,
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image,
      publishedAt: article.publishedAt,
      content: article.content, 
    });
  } catch (error) {
    console.error('Error fetching article from database:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
