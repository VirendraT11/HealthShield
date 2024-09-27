import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function LandingSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section (Existing Design) */}
        <div className="flex flex-col lg:flex-row items-center justify-between lg:flex-row-reverse mb-16">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* First Image */}
              <img
                src="./src/assets/1.jpg"
                alt="Doctor reviewing health data"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
              Take Control of Your Health with AI-Powered Risk Assessment
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              HealthShield.ai uses advanced algorithms to analyze your medical history, lifestyle, and genetic factors, providing personalized recommendations for a healthier life.
            </p>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Personalized health risk assessment
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                AI-driven health recommendations
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Comprehensive lifestyle analysis
              </li>
            </ul>
            <Link to="/test">
              <Button size="lg" className="text-lg px-8 py-4">
                Take the Test Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Second Section (New Image and Description) */}
        <div className="flex flex-col lg:flex-row items-center justify-between lg:flex-row mb-16">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Second Image */}
              <img
                src="./src/assets/image.png"
                alt="Health consultation"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
              Get Personalized Health Insights Anytime
            </h2>
            <p className="text-xl mb-8 text-gray-700">
              With HealthShield.ai, you can access accurate health information and detailed risk assessments from anywhere. Get instant insights based on your health data.
            </p>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 access to AI-driven insights
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Real-time health assessments
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Easy access to health reports
              </li>
            </ul>
            <Link to="/analysis"> {/* Correct Link path */}
              <Button size="lg" className="text-lg px-8 py-4">
                Analyze the Risk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
