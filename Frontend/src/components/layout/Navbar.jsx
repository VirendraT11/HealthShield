import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">HealthShield.ai</span>
            <img src={Logo} alt="logo" className="w-20" />
          </a>
          <div className="hidden md:flex items-center space-x-4">
            <Link className="border-2 border-blue-500 p-3 bg-blue rounded-md" variant="outline" to="/test">For Doctor</Link>
            <Link className="border-2 border-blue-500 p-3 bg-blue rounded-md" variant="outline" to="/analysis">For Patient</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
