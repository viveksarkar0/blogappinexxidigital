'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'; 

const ArticleDetailsPage = () => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          setLoading(true); 
          const response = await axios.get(`/api/blogs/${id}`); 
          setArticle(response.data);
        } catch (error) {
          setError('Failed to fetch article details');
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Article Details
        </h1>
        {article && (
          <div className="space-y-6">
            {/* Article Title */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold">{article.title}</h2>
              <p className="mt-2 text-lg">{article.description}</p>
            </div>

            {/* Article Image */}
            {article.image && (
              <div className="text-center mt-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Content</h3>
              <p className="text-lg text-gray-700">{article.content}</p>
            </div>

            {/* Published Date */}
            <div className="text-right mt-4">
              <p className="text-gray-500">
                Published on: {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ArticleDetailsPage;
