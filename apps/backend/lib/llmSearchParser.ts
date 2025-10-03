import { OpenAI } from 'openai';
import { env } from './env'; // ✅ import validated env

type ParsedQuery = {
  keywords: string[];
  filters: {
    priceMax: number | undefined;
    type: string | undefined;
  };
};

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY }); // ✅ safe and validated
const USE_LLM = env.USE_LLM; // ✅ boolean, already parsed

export async function parseSearchQuery(query: string) : Promise<ParsedQuery>{
    if (!USE_LLM) {
        return mockParse(query);
    }
    const prompt = `Extract structured filters from this bike search query: "${query}". Return JSON like:
        {
            "keywords": ["commuting"],
            "filters": {
            "priceMax": 500,
            "type": "electric"
        }
    }`;

    try {
        const response = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: [{ role: 'user', content: prompt }],
        });

        const content = response.choices[0]?.message?.content || '';
        const match = content.match(/\{[\s\S]*\}/);
        if (!match) throw new Error('No JSON found in LLM response');
        const json = JSON.parse(match[0]);
        console.log('LLM parsed query:', json);
        return json;
    } catch (err) {
        console.error('LLM parsing failed:', err);
        return mockParse(query); // fallback
    }
}

const mockParse = (query: string) : ParsedQuery => {
    const lower = query.toLowerCase();
    return {
        keywords: lower.includes('commuting') ? ['commuting'] : [],
            filters: {
            priceMax: lower.includes('£500') ? 500 : undefined,
            type: lower.includes('electric') ? 'electric' : undefined,
        },
  };
}