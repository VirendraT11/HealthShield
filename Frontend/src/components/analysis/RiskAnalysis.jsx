import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Background component to render stars
function Background() {
  return (
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
  );
}

// Analysis form component for user input
function AnalysisForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    smoker: '',
    familyHistory: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white bg-opacity-80 p-6 rounded-lg shadow-xl mt-[100px]">
      <div>
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="height">Height (cm)</Label>
        <Input id="height" name="height" type="number" value={formData.height} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="smoker">Smoker</Label>
        <Select id="smoker" name="smoker" value={formData.smoker} onChange={handleChange} required>
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="familyHistory">Family History of Heart Disease</Label>
        <Select id="familyHistory" name="familyHistory" value={formData.familyHistory} onChange={handleChange} required>
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </div>
      <Button type="submit">Analyze Risk</Button>
    </form>
  );
}

// Risk display component to show results
function RiskDisplay({ riskData }) {
  return (
    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-xl space-y-4">
      <h2 className="text-2xl font-bold">Risk Analysis Results</h2>
      <div className="text-4xl font-bold text-red-600">{riskData.overallRisk}% Risk of heart disease</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={riskData.factors}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="risk" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      {/* <Button onClick={() => Implement download logic}>Download Report</Button> */}
    </div>
  );
}

// Main Risk Analysis Page component
export default function RiskAnalysisPage() {
  const [riskData, setRiskData] = useState(null);

  const handleFormSubmit = (formData) => {
    // Simulate risk calculation (replace with actual calculation logic)
    const calculatedRisk = {
      overallRisk: Math.floor(Math.random() * 100),
      factors: [
        { name: 'Age', risk: Math.floor(Math.random() * 100) },
        { name: 'BMI', risk: Math.floor(Math.random() * 100) },
        { name: 'Smoking', risk: Math.floor(Math.random() * 100) },
        { name: 'Family History', risk: Math.floor(Math.random() * 100) },
      ]
    };
    setRiskData(calculatedRisk);
  };

  return (
    <div className="h-screen w-full">
      <Canvas>
        <Suspense fallback={null}>
          <Background />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <AnalysisForm onSubmit={handleFormSubmit} />
          </div>
          <div className="md:w-1/2">
            {riskData && <RiskDisplay riskData={riskData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
