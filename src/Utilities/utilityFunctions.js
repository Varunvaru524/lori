const OPENAI_API_KEY = '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';

async function callAiModel(prompt) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API Error:', data.error);
      return null;
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling AI model:', error);
    return null;
  }
}

function createStoryPrompt(userDetails) {
  const { childAge, country, language, moral, interests, childName } = userDetails;
  return `Write a short bedtime story for a ${childAge}-year-old child from ${country}. The story should be in ${language} and based on the moral: ${moral} and interests: ${interests}. If personalization = yes, include the child’s name: ${childName}. Keep the tone warm, simple, and suitable for toddlers. Length: 3–5 minutes of reading.`
}


export {
  callAiModel,
  createStoryPrompt
}