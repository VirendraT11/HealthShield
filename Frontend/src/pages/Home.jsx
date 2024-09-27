import React from "react";
import LandingSection from "../components/home/LandingSection";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <LandingSection />
            </main>
        </div>
    );
}
