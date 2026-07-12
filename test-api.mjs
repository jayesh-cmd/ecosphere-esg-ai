import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY
});

async function main() {
  try {
    const models = ['claude-3-5-sonnet-20240620', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307', 'claude-3-5-haiku-20241022', 'claude-3-sonnet-20240229'];
    for (const model of models) {
      try {
        await anthropic.messages.create({
          model: model,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hi' }]
        });
        console.log(`✅ Success: ${model}`);
        break; // If one works, stop testing
      } catch (err) {
        console.log(`❌ Failed: ${model} - ${err.message}`);
      }
    }
  } catch (err) {
    console.error("Fatal error:", err);
  }
}
main();
