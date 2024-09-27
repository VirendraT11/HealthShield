import React, { useState } from 'react';

// Parameters for the form
const parameters = [
  { name: "Radius mean", unit: "years" },
  { name: "Texture mean", unit: "years" },
  { name: "Perimeter mean", unit: "mmHg" },
  { name: "Area mean", unit: "mg/dL" },
  { name: "Smoothness mean", unit: "kg/m²" },
  { name: "Compactness mean", unit: "score" },
  { name: "Concavity mean", unit: "hours/week" },
  { name: "Concave points mean", unit: "score" },
  { name: "Symmetry mean", unit: "score" },
  { name: "Fractal dimension mean", unit: "hours/night" },

  { name: "Radius se", unit: "years" },
  { name: "Texture se", unit: "years" },
  { name: "Perimeter se", unit: "mmHg" },
  { name: "Area se", unit: "mg/dL" },
  { name: "Smoothness se", unit: "kg/m²" },
  { name: "Compactness se", unit: "score" },
  { name: "Concavity se", unit: "hours/week" },
  { name: "Concave points se", unit: "score" },
  { name: "Symmetry se", unit: "score" },
  { name: "Fractal dimension se", unit: "hours/night" },

  { name: "Radius worst", unit: "years" },
  { name: "Texture worst", unit: "years" },
  { name: "Perimeter worst", unit: "mmHg" },
  { name: "Area worst", unit: "mg/dL" },
  { name: "Smoothness worst", unit: "kg/m²" },
  { name: "Compactness worst", unit: "score" },
  { name: "Concavity worst", unit: "hours/week" },
  { name: "Concave points worst", unit: "score" },
  { name: "Symmetry worst", unit: "score" },
  { name: "Fractal dimension worst", unit: "hours/night" }
];

export default function TestInputForm() {
  const [values, setValues] = useState({});
  const [dataValues, setDataValues] = useState([8434830]); // Initial ID value

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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const API_KEY = "4YSJFFLNjcEai2nY_UwzUFsoiora7A7uQnIW6czisPYQ"; // Replace with your IBM Watson API key

    function getToken(errorCallback, loadCallback) {
      const req = new XMLHttpRequest();
      req.addEventListener("load", loadCallback);
      req.addEventListener("error", errorCallback);
      req.open("POST", "https://iam.cloud.ibm.com/identity/token");
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.setRequestHeader("Accept", "application/json");
      req.send("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + API_KEY);
    }

    function apiPost(scoring_url, token, payload, loadCallback, errorCallback) {
      const oReq = new XMLHttpRequest();
      oReq.addEventListener("load", loadCallback);
      oReq.addEventListener("error", errorCallback);
      oReq.open("POST", scoring_url);
      oReq.setRequestHeader("Accept", "application/json");
      oReq.setRequestHeader("Authorization", "Bearer " + token);
      oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      oReq.send(payload);
    }

    getToken(
      (err) => console.log("Error getting token:", err),
      function () {
        let tokenResponse;
        try {
          tokenResponse = JSON.parse(this.responseText);
        } catch (ex) {
          console.error("Error parsing token response:", ex);
          return;
        }

        const inputFields = [
          'id',
          "radius_mean", "texture_mean", "perimeter_mean", "area_mean",
          "smoothness_mean", "compactness_mean", "concavity_mean",
          "concave_points_mean", "symmetry_mean", "fractal_dimension_mean",
          "radius_se", "texture_se", "perimeter_se", "area_se",
          "smoothness_se", "compactness_se", "concavity_se",
          "concave_points_se", "symmetry_se", "fractal_dimension_se",
          "radius_worst", "texture_worst", "perimeter_worst",
          "area_worst", "smoothness_worst", "compactness_worst",
          "concavity_worst", "concave_points_worst", "symmetry_worst",
          "fractal_dimension_worst"
        ];

        const payload = JSON.stringify({
          input_data: [{
            fields: inputFields,
            values: [dataValues] // Send data values array
          }]
        });

        const scoring_url = "https://eu-de.ml.cloud.ibm.com/ml/v4/deployments/fd49289a-ca8a-44f7-a122-195400291efd/predictions?version=2021-05-01";

        apiPost(scoring_url, tokenResponse.access_token, payload, function (resp) {
          let parsedPostResponse;
          try {
            parsedPostResponse = JSON.parse(this.responseText);
          } catch (ex) {
            console.error("Error parsing scoring response:", ex);
            return;
          }

          console.log("Scoring response:", parsedPostResponse);

          if (parsedPostResponse.predictions && parsedPostResponse.predictions.length > 0) {
            const prediction = parsedPostResponse.predictions[0];
            console.log("Predicted values:", prediction.values);
          } else {
            console.log("No predictions found in the response.");
          }
        });
      }
    );
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Health Risk Assessment for Doctors</h2>
        <form onSubmit={console.log('')} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8 grid gap-6 md:grid-cols-2">
            {parameters.map(({ name, unit }) => (
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
                    placeholder="0"
                  />
                  <button
                    type="button"
                    onClick={() => handleValueChange(name, (Number(values[name]) || 0) + 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Unit: {unit}</p>
              </div>
            ))}
          </div>
          <div className="px-8 py-4 bg-gray-50 flex justify-end">
            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md">
              Submit Assessment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}