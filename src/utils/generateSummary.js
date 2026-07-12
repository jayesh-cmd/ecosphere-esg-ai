// EcoSphere AI Assistant — mock responses
// Replace the body of generateSummary() and answerQuestion() with real API calls later.

export function generateSummary(scores) {
  const { environmental, social, governance, overall } = scores;
  return `Your overall ESG score is ${overall}/100 this quarter. Social performance leads at ${social}/100, driven by strong CSR participation rates. Environmental stands at ${environmental}/100 with momentum from the renewable energy push, while governance at ${governance}/100 needs attention — two compliance issues are overdue and policy acknowledgement rates have dipped below 70% in two departments.`;
}

// ─── Contextual Q&A ──────────────────────────────────────────────
// Matches user questions to known topics and returns relevant answers.
// Wire this to OpenAI / Gemini later by replacing the return statements.

const RESPONSES = {
  governance_low: [
    `Governance is at 72/100 — the main drags are two overdue compliance issues (GDPR Data Retention and the Fire Safety Drill), plus the Whistleblower Protection Policy sitting at only 60% acknowledgement. Closing those two issues alone could recover 4–6 points within the month.`,
    `The 72 governance score reflects three open items: a Critical GDPR breach from Legal, an overdue fire drill from HR, and a supplier code-of-conduct unsigned by Finance. Prioritising the Critical severity item first will have the biggest impact on your rating.`,
  ],
  environmental_improve: [
    `To push environmental beyond 78, focus on two levers: Operations' fleet vehicles are the single largest carbon debit at –340 kg CO₂ this period — switching even 30% of the fleet to EVs would significantly improve the net balance. Second, the "Achieve 50% Renewable Energy" goal is only at 45% — accelerating procurement would help both the environmental score and the overall ESG index.`,
    `The Tree Planting Drive is nearly done at 87% — completing it will close that goal and add a small boost. The bigger opportunity is reducing air travel emissions. Consider a remote-first travel policy for internal meetings; Operations and Engineering account for the majority of that category.`,
  ],
  social_driving: [
    `The social score of 85/100 is your strongest pillar. The main contributors are high employee participation — 847 active employees across CSR activities — and the Digital Literacy Workshop and Community Clean-Up Drive both holding Approved status with solid turnout. The HR department leads social scoring at 92.`,
    `Social is strong because your CSR programme covers multiple categories (Environment, Education, Health, Diversity, Community). Diversity and Community initiatives tend to have the highest multiplier on social scores in ESG frameworks. Keeping approval rates above 80% for new activities is key to sustaining this.`,
  ],
  overall_improve: [
    `The quickest wins to lift the overall 78 score: (1) Close the two overdue compliance issues — adds ~3 governance points. (2) Finish the Tree Planting Drive — adds ~1 environmental point. (3) Push Whistleblower Policy acknowledgement from 60% to 80%+ — another governance point. Together that's a realistic path to 82–83 by end of quarter.`,
  ],
  carbon: [
    `Your net carbon position this period is –470 kg CO₂ (–760 kg emissions, +290 kg offsets). Fleet vehicles from Operations are the largest single source at –340 kg. Solar panel output (+60 kg) and the carbon offset purchase (+80 kg) are the top offset contributors. The Tree Planting Drive at +150 kg is your most impactful upcoming offset when completed.`,
  ],
  score_explanation: [
    `ESG scores are calculated on a 0–100 scale across three pillars. Environmental measures carbon efficiency, renewable energy adoption, and waste reduction progress. Social covers CSR activity quality, employee participation, and diversity metrics. Governance looks at compliance issue resolution rate, policy acknowledgement completion, and audit readiness. Each pillar is weighted equally in your overall score.`,
  ],
  default: [
    `Based on the current data, your ESG score of 78/100 puts you in the upper-mid tier for your sector. Governance at 72 is the primary area of opportunity — resolving the two overdue issues would have an immediate impact. Would you like a deeper breakdown of any specific pillar?`,
    `That's a great question. Looking at your ESG data: Social leads at 85, Environmental is at 78, and Governance is at 72. The overall score of 78 has improved 13 points since February, which is strong momentum. Let me know if you want specifics on any dimension.`,
  ],
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function answerQuestion(question, scores) {
  const q = question.toLowerCase();

  if (q.includes('governance') && (q.includes('low') || q.includes('why') || q.includes('bad') || q.includes('weak'))) {
    return pick(RESPONSES.governance_low);
  }
  if ((q.includes('environmental') || q.includes('carbon') || q.includes('green') || q.includes('emission')) && (q.includes('improve') || q.includes('better') || q.includes('increase') || q.includes('boost'))) {
    return pick(RESPONSES.environmental_improve);
  }
  if (q.includes('carbon') || q.includes('co2') || q.includes('emission')) {
    return pick(RESPONSES.carbon);
  }
  if (q.includes('social') && (q.includes('driving') || q.includes('why') || q.includes('good') || q.includes('high') || q.includes('strong'))) {
    return pick(RESPONSES.social_driving);
  }
  if ((q.includes('improve') || q.includes('better') || q.includes('increase') || q.includes('boost')) && (q.includes('overall') || q.includes('esg') || q.includes('score'))) {
    return pick(RESPONSES.overall_improve);
  }
  if (q.includes('score') && (q.includes('how') || q.includes('calculated') || q.includes('work') || q.includes('what is'))) {
    return pick(RESPONSES.score_explanation);
  }
  if (q.includes('governance') && (q.includes('improve') || q.includes('fix') || q.includes('better'))) {
    return pick(RESPONSES.governance_low);
  }
  if (q.includes('social')) {
    return pick(RESPONSES.social_driving);
  }
  if (q.includes('environmental') || q.includes('green')) {
    return pick(RESPONSES.environmental_improve);
  }

  return pick(RESPONSES.default);
}
