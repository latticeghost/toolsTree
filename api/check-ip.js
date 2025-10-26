// Vercel Serverless Function located at /api/check-ip.js

// This function runs on Vercel's backend, not in the user's browser.
export default async function handler(request, response) {
  // 1. Get IP address from the query parameter (e.g., /api/check-ip?ip=1.1.1.1)
  const ipAddress = request.query.ip;

  // 2. Securely get your AbuseIPDB API key from Vercel Environment Variables
  const ABUSEIPDB_API_KEY = process.env.ABUSEIPDB_API_KEY;

  // 3. Basic validation
  if (!ipAddress) {
    return response.status(400).json({ error: 'IP address is required.' });
  }
  if (!ABUSEIPDB_API_KEY) {
    console.error('ABUSEIPDB_API_KEY environment variable is not set.');
    return response.status(500).json({ error: 'API key configuration error on server.' });
  }

  // 4. Construct the AbuseIPDB API URL
  const abuseUrl = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ipAddress)}&maxAgeInDays=90&verbose=true`;

  try {
    // 5. Make the actual request to AbuseIPDB from the server, adding the secret key
    const abuseResponse = await fetch(abuseUrl, {
      headers: {
        'Key': ABUSEIPDB_API_KEY,
        'Accept': 'application/json'
      }
    });

    // 6. Handle potential errors from AbuseIPDB
    if (!abuseResponse.ok) {
      const errorData = await abuseResponse.json();
      console.error(`AbuseIPDB API Error (${abuseResponse.status}):`, errorData);
      // Try to forward a meaningful error message
      const detail = errorData?.errors?.[0]?.detail || `Failed to query AbuseIPDB (Status: ${abuseResponse.status})`;
      return response.status(abuseResponse.status).json({ error: detail });
    }

    // 7. Parse the successful response
    const data = await abuseResponse.json();

    // 8. Send *only* the relevant 'data' part back to your frontend
    // This prevents accidentally leaking rate limit info etc. from the API response
    return response.status(200).json(data.data);

  } catch (error) {
    // 9. Handle network errors during the fetch from server -> AbuseIPDB
    console.error('Server-side fetch error:', error);
    return response.status(500).json({ error: 'Server failed to connect to AbuseIPDB.' });
  }
}
