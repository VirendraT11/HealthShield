import React, { useState } from 'react';
import { XMLHttpRequest } from "xmlhttprequest";

// Parameters for the form
const parameters = [
  { name: "Radius mean", unit: "years", eg:"17" },
  { name: "Texture mean", unit: "years", eg:"10" },
  { name: "Perimeter mean", unit: "mmHg", eg:"122" },
  { name: "Area mean", unit: "mg/dL", eg:"1001" },
  { name: "Smoothness mean", unit: "kg/m²", eg:"0.1184" },
  { name: "Compactness mean", unit: "score", eg:"0.2776" },
  { name: "Concavity mean", unit: "hours/week", eg:"0.3001" },
  { name: "Concave points mean", unit: "score", eg:"0.1471" },
  { name: "Symmetry mean", unit: "score", eg:"0.2419" },
  { name: "Fractal dimension mean", unit: "hours/night", eg:"0.07871" },

  { name: "Radius se", unit: "years" , eg:"1.095" },
  { name: "Texture se", unit: "years", eg:"0.09053"  },
  { name: "Perimeter se", unit: "mmHg", eg:"8.589"  },
  { name: "Area se", unit: "mg/dL", eg:"153.4"  },
  { name: "Smoothness se", unit: "kg/m²", eg:"0.0064"  },
  { name: "Compactness se", unit: "score", eg:"0.04904"  },
  { name: "Concavity se", unit: "hours/week", eg:"0.05373"  },
  { name: "Concave points se", unit: "score", eg:"0.01587"  },
  { name: "Symmetry se", unit: "score" , eg:"0.3003" },
  { name: "Fractal dimension se", unit: "hours/night", eg:"0.00619"  },

  { name: "Radius worst", unit: "years",eg:"25" },
  { name: "Texture worst", unit: "years" ,eg:"17"},
  { name: "Perimeter worst", unit: "mmHg",eg:"184" },
  { name: "Area worst", unit: "mg/dL",eg:"2019" },
  { name: "Smoothness worst", unit: "kg/m²",eg:"0.1622" },
  { name: "Compactness worst", unit: "score",eg:"0.6656" },
  { name: "Concavity worst", unit: "hours/week",eg:"0.7119" },
  { name: "Concave points worst", unit: "score",eg:"0.2654" },
  { name: "Symmetry worst", unit: "score",eg:"0.4601" },
  { name: "Fractal dimension worst", unit: "hours/night",eg:"0.1189" }
];

export default function TestInputForm() {
  const [values, setValues] = useState({});
  const [dataValues, setDataValues] = useState([8434830]); // Initial ID value
  const [result, setResult] = useState('--')

  // Function to handle input changes and update the state
  const handleValueChange = (parameter, newValue) => {
    setValues(prevValues => ({
      ...prevValues,
      [parameter]: newValue // Update the specific input field's value
    }));

    setDataValues(prevDataValues => {
      const updatedData = [...prevDataValues]; // Copy the current data array
      const index = parameters.findIndex(p => p.name === parameter); // Find index of the current parameter
      updatedData[index + 1] = newValue; // Add 1 to account for the initial ID value at index 0
      return updatedData;
    });
  };

  // Handle form submission and send data to IBM Watson API
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dataValues)

    const payLoad = {
    dataValues: [dataValues]
    }
    
    const data = await fetch('http://localhost:3000/prediction',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payLoad)
    })

    const parsedData = await data.json()
    console.log(parsedData)

    setResult(parsedData.prediction[0])
    console.log(parsedData.prediction[0])
    parsedData.prediction[0] == 'M' ? setResult('Cancerious') : setResult('Non Cancerious')

  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Health Risk Assessment for Doctors</h2>
        <form onSubmit={(e) => {handleSubmit(e)}} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"> 
          <div className="p-8 grid gap-6 md:grid-cols-2">
            {parameters.map(({ name, unit, eg }) => (
              <div key={name} className="space-y-2">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{name}</label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleValueChange(name, (Number(values[name]) || 0) - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id={name}
                    name={name}
                    value={values[name] || ''}
                    onChange={(e) => handleValueChange(name, Number(e.target.value))}
                    className="flex-1 min-w-0 block w-full px-3 py-2 text-gray-700 border-gray-300 text-center"
                    placeholder={eg}
                  />
                  <button
                    type="button"
                    onClick={() => handleValueChange(name, (Number(values[name]) || 0) + 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                {/* <p className="text-xs text-gray-500 mt-1">Unit: {unit}</p> */}
              </div>
            ))}
          </div>
          <div className="px-8 py-4 bg-gray-50 flex justify-between">
          <div className="p-5 bg-green-900 rounded-md text-white">
            Result: {result}
        </div>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md">
              Submit Assessment
            </button>
          </div>
        </form>
      </div>
      <div>
      </div>
    </section>
  );
}