import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
// import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import RiskAnalysis from "./components/analysis/RiskAnalysis";  // Import RiskAnalysis component

export default function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/test" element={<Test2 />} />
                        <Route path="/analysis" element={<RiskAnalysis />} /> {/* Add the route for RiskAnalysis */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
