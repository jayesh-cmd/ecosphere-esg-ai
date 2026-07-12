import Anthropic from '@anthropic-ai/sdk';

export function generateSummary(scores) {
  const { environmental, social, governance, overall } = scores;
  return `Your overall ESG score is ${overall}/100 this quarter. Social performance leads at ${social}/100, while Environmental is at ${environmental}/100 and Governance is at ${governance}/100. Ask me anything to get a deeper analysis of these numbers.`;
}

export async function answerQuestion(question, globalState) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return "Error: VITE_ANTHROPIC_API_KEY is not set in your .env file. Please add your key and restart the dev server to chat with Claude.";
  }

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
      baseURL: window.location.origin + '/api/anthropic',
      dangerouslyAllowBrowser: true // Needed for direct frontend calls
    });

    // Isolate key data to pass to Claude
    const context = {
      overallScores: globalState.esgScores,
      departmentRankings: globalState.departments.map(d => ({
        name: d.name,
        total: d.total,
        environmental: d.environmental,
        social: d.social,
        governance: d.governance
      })),
      openComplianceIssues: globalState.complianceIssues.filter(i => i.status !== 'Closed')
    };

    const systemPrompt = `You are an ESG performance analyst. Given this company's current ESG data:
${JSON.stringify(context, null, 2)}

Answer the user's question in 2-4 concise sentences, referencing specific numbers where relevant. Do not use markdown headers, just plain text or simple bullet points. Keep it highly professional but approachable.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: 'user', content: question }]
    });

    return response.content[0].text;
  } catch (err) {
    console.error("Anthropic API error:", err);
    return "API Error: " + err.toString();
  }
}
