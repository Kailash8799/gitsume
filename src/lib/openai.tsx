import axios from 'axios';

const OPENAI_API_BASE_URL = 'https://api.openai.com/v1';

// Function to interact with OpenAI API for generating text
export const generateText = async (prompt: string) => {
    try {
        const response = await axios.post(`${OPENAI_API_BASE_URL}/completions`, {
            model: 'text-davinci-003', // Adjust model based on your preference
            prompt: prompt,
            temperature: 0.7, // Adjust temperature based on your preference
            max_tokens: 150, // Adjust max tokens based on your preference
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_KEY}`,
            },
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating text using OpenAI API:', error);
        throw error;
    }
};