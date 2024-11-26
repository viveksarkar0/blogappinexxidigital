'use client'
import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [blogsPerPage] = useState<number>(6); 

  // Fetch blog posts from the backend API route
  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/blogs', {
        params: {
          page,
          limit: blogsPerPage,
        },
      });
      setBlogs(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  const totalPages = Math.ceil(totalResults / blogsPerPage);

  return (
    <main className="py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog: any) => (
          <div key={blog.id || blog.source.id || Math.random().toString(36).substr(2, 9)} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            {blog.image && (
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-64 object-cover rounded-lg mb-4" 
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
            <p className="text-gray-600 mt-2">
              {blog.body ? blog.body.slice(0, 100) + '...' : 'No description available.'}
            </p>
            <a 
              href={`/viewblog/${blog.id}`} 
              className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
            >
              Read more
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-l-lg hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-800">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-r-lg hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
