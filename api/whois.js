// Vercel Serverless Function located at /api/whois.js

export default async function handler(request, response) {
  // 1. Get domain name from the query parameter (e.g., /api/whois?domain=google.com)
  const domain = request.query.domain;

  // 2. Securely get your WhoisJSON API key from Vercel Environment Variables
  const WHOISJSON_API_KEY = process.env.WHOISJSON_API_KEY;

  // 3. Basic validation
  if (!domain) {
    return response.status(400).json({ error: 'Domain name is required.' });
  }
  if (!WHOISJSON_API_KEY) {
    console.error('WHOISJSON_API_KEY environment variable is not set.');
    return response.status(500).json({ error: 'API key configuration error on server.' });
  }

  // 4. Construct the WhoisJSON API URL
  const whoisUrl = `https://whoisjson.com/api/v1/whois?domain=${encodeURIComponent(domain)}&apiKey=${WHOISJSON_API_KEY}`;

  try {
    // 5. Make the actual request to WhoisJSON from the server
    const whoisResponse = await fetch(whoisUrl);

    // 6. Handle potential errors from WhoisJSON
    if (!whoisResponse.ok) {
      // Try to parse error, but WhoisJSON might not return JSON on error
      let errorMsg = `Failed to query WhoisJSON (Status: ${whoisResponse.status})`;
      try {
        const errorData = await whoisResponse.json();
        errorMsg = errorData.message || errorMsg; // Use their message if available
      } catch (e) {
         // Ignore parsing error, use the status text
         errorMsg = `WhoisJSON Error: ${whoisResponse.status} ${whoisResponse.statusText}`;
      }
      console.error(`WhoisJSON API Error (${whoisResponse.status}):`, errorMsg);
      return response.status(whoisResponse.status).json({ error: errorMsg });
    }

    // 7. Parse the successful response
    const data = await whoisResponse.json();

    // 8. Send the relevant WHOIS data back to your frontend
    // You might want to select specific fields if the response is very large
    return response.status(200).json(data);

  } catch (error) {
    // 9. Handle network errors during the fetch from server -> WhoisJSON
    console.error('Server-side WHOIS fetch error:', error);
    return response.status(500).json({ error: 'Server failed to connect to WhoisJSON.' });
  }
}
