import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <header className="w-full py-6 px-4 flex justify-between items-center bg-white/80 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold text-blue-700 tracking-tight">
            XenoCrm
          </span>
        </div>
        <nav className="space-x-6">
          <Link
            to="/dashboard"
            className="text-blue-700 font-semibold hover:underline"
          >
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-lg">
          Supercharge Your{" "}
          <span className="text-blue-700">Customer Relationships</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl">
          XenoCrm helps you manage, segment, and engage your customers with
          AI-driven insights and powerful marketing tools. Grow your business
          with the next-generation CRM platform.
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-4 bg-blue-700 text-white text-lg font-bold rounded-full shadow-lg hover:bg-blue-800 transition mb-12"
        >
          Get Started
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <svg
              className="w-10 h-10 text-blue-600 mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5.13V7a4 4 0 10-8 0v2m8 0a4 4 0 01-8 0m8 0v2a4 4 0 01-8 0V9m8 0V7a4 4 0 00-8 0v2"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">AI-Powered Segmentation</h3>
            <p className="text-gray-500">
              Automatically group your customers for targeted campaigns and
              higher engagement.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <svg
              className="w-10 h-10 text-blue-600 mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7m0 0H8m4 0h4"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">Unified Dashboard</h3>
            <p className="text-gray-500">
              See all your campaigns, customers, and analytics in one beautiful
              dashboard.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <svg
              className="w-10 h-10 text-blue-600 mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-1 4V7a1 1 0 00-1-1h-3m-4 0H5a1 1 0 00-1 1v4m0 0v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1v-4m-1 4v4a1 1 0 01-1 1h-3m-4 0H5a1 1 0 01-1-1v-4"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">Automated Campaigns</h3>
            <p className="text-gray-500">
              Launch, track, and optimize campaigns with smart automation and
              real-time feedback.
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full py-8 bg-white border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/ankit6686510/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                <FiGithub className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankiitjhaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://ankit6686510.github.io/AnkitJha/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                <FiGlobe className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} XenoCrm. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
