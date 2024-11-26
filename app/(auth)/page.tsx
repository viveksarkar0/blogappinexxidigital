'use client'

import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center relative">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl mx-auto flex flex-col items-center space-y-8 z-10">
     
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-400 mb-4">
          Welcome to BlogApp
        </h1>
        <p className="text-2xl text-gray-700 text-center leading-relaxed max-w-3xl mx-auto mb-8">
          Discover a community of readers and writers. Share your stories, engage with others, and explore the world of content through BlogApp.
        </p>

        <div className="flex justify-center gap-6">
          {/* Get Started button redirects to a generic sign-up page */}
          <Link
            href="/get-started"
            className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </Link>
          
          {/* Sign Up button redirects to the specific sign-up page */}
          <Link
            href="/sign-up"
            className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Background Image Section */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-40" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?books,reading")' }}></div>
    </main>
  );
};

export default HomePage;
