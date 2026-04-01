export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { action, link, orderId } = req.body;
    
    // Panel Info
    const API_KEY = process.env.PANEL_API_KEY; 
    const API_URL = "https://smmpakpanels.com/api/v2"; 
    const SERVICE_ID = "4768"; // Apni 500 likes wali ID yahan likhen

    try {
        let params = new URLSearchParams();
        params.append('key', API_KEY);

        if (action === 'add') {
            params.append('action', 'add');
            params.append('service', SERVICE_ID);
            params.append('link', link);
            params.append('quantity', '500');
        } else if (action === 'status') {
            params.append('action', 'status');
            params.append('order', orderId);
        }

        const response = await fetch(API_URL, { method: 'POST', body: params });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Panel API Error" });
    }
}
