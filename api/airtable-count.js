// Vercel serverless function to fetch count from Airtable view
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { viewId } = req.query;
  
  if (!viewId) {
    return res.status(400).json({ error: 'viewId is required' });
  }

  try {
    // Airtable API configuration
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return res.status(500).json({ 
        error: 'Airtable configuration missing. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.' 
      });
    }

    // Fetch records from the specific view
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/tblyhMPmCt87ORo3t?view=${viewId}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Return the count of records in this view
    return res.status(200).json({ 
      count: data.records ? data.records.length : 0,
      viewId: viewId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Airtable count:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch count from Airtable',
      details: error.message 
    });
  }
}
