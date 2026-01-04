// src/pages/BlogPage.jsx
import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "How to Find the Perfect Study Partner",
    excerpt: "Tips to match with the right student for effective study sessions.",
  },
  {
    id: 2,
    title: "Top 5 Study Techniques",
    excerpt: "Boost your learning with these proven study methods.",
  },
  {
    id: 3,
    title: "Managing Your Study Time",
    excerpt: "Organize your schedule to maximize productivity.",
  },
];

const BlogPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">StudyMate Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
