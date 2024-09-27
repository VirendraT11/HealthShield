const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const https = require('https'); // Import the https module

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({}));

// Define a simple route

app.post('/hi', (req,res) => {
    // res.send({data:"hi"})
    console.log('djf')
    res.send('hii')
})
app.post('/prediction', (req, res) => {
  const val = req.body.dataValues;

  const API_KEY = "4YSJFFLNjcEai2nY_UwzUFsoiora7A7uQnIW6czisPYQ"; // Replace with your IBM Watson API key

  function getToken() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'iam.cloud.ibm.com',
        path: '/identity/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }
      };

      const req = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const tokenResponse = JSON.parse(data);
          resolve(tokenResponse.access_token);
        });
      });

      req.on('error', (error) => {
        console.error("Error getting token:", error);
        reject(error);
      });

      req.write(`grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${API_KEY}`);
      req.end();
    });
  }

  function apiPost(scoring_url, token, payload) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'eu-de.ml.cloud.ibm.com',
        path: '/ml/v4/deployments/fd49289a-ca8a-44f7-a122-195400291efd/predictions?version=2021-05-01',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
        }
      };

      const req = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (error) => {
        console.error("Error during API post:", error);
        reject(error);
      });

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
          values: val
        }]
      });

      req.write(payload);
      req.end();
    });
  }

  getToken()
    .then((token) => {
      return apiPost("https://eu-de.ml.cloud.ibm.com/ml/v4/deployments/fd49289a-ca8a-44f7-a122-195400291efd/predictions", token, {});
    })
    .then((parsedPostResponse) => {
      console.log("Scoring response:", parsedPostResponse);

      if (parsedPostResponse.predictions && parsedPostResponse.predictions.length > 0) {
        const prediction = parsedPostResponse.predictions[0];
        console.log("Predicted values:", prediction.values);
        res.json({ prediction: prediction.values });
      } else {
        console.log("No predictions found in the response.");
        res.status(404).json({ error: "No predictions found." });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
