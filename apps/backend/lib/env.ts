import 'dotenv/config'; // loads .env automatically
import { cleanEnv, str, bool, port } from 'envalid';

export const env = cleanEnv(process.env, {
  OPENAI_API_KEY: str({ desc: 'Your OpenAI API key' }),
  USE_LLM: bool({ desc: 'Enable LLM parsing for search' }),
  PORT: port({ default: 3000, desc: 'Backend server port' }),
});
