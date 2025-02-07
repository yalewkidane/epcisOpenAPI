const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3045;

var options = {
  swaggerOptions: {
    url: 'https://ref.gs1.org/standards/epcis/openapi.json'
  }
}

//This directly fetches the openapi.json from https://ref.gs1.org/standards/epcis/openapi.json
app.use('/api-docs/online', swaggerUi.serve, swaggerUi.setup(null, options));



//const swaggerDocument = require('./openApiJson/epcisV2_openapi.json');
const swaggerDocument = require('./openApiJson/epcisV2_openapi.json');
app.use('/api-docs/local', swaggerUi.serve, swaggerUi.setup(swaggerDocument));





// Root route that displays the options
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>API Documentation Options</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
                .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #333; }
                p { font-size: 16px; color: #555; }
                a { display: block; margin: 10px 0; padding: 10px; text-decoration: none; color: white; background: #007BFF; border-radius: 5px; width: 250px; margin: auto; }
                a:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Choose API Documentation</h1>
                <p><strong>Online API Documentation:</strong> Fetches the latest version from an external source.</p>
                <a href="/api-docs/online">View Online API Docs</a>

                <p><strong>Local API Documentation:</strong> Loads the JSON file stored locally (downloaded on Feb 7, 2025).</p>
                <a href="/api-docs/local">View Local API Docs</a>
            </div>
        </body>
        </html>
    `);
});


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
    console.log('API-Interface localhost:'+PORT+'/api-docs');
})