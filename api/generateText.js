// generateText.js
const fetch = require('node-fetch');

const API_KEY = process.env.OPENAI_API_TOKEN;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userMessage } = req.body;

    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }),
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        res.status(200).json({ response: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Try again...' });
    }
}
