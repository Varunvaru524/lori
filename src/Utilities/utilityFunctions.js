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
  const { language, morals, interests, childName, personalization } = userDetails;
  
  let prompt = `Write a short bedtime story in ${language} that teaches the following values: ${morals}. 
The story should incorporate these interests: ${interests}. `;

  if (personalization === 'yes' && childName) {
    prompt += `The main character should be named ${childName}. `;
  } else {
    prompt += `Use a generic character name that children can relate to. `;
  }

  prompt += `Keep the tone warm, gentle, and suitable for bedtime. 
Length: 3-5 minutes of reading (approximately 300-500 words).
Always format in **Markdown** with:
- A title (# heading)
- Section breaks (## headings) 
- Use bold for emphasis
- Keep paragraphs short and engaging
- End with a peaceful conclusion perfect for bedtime`;

  return prompt;
}


export {
  callAiModel,
  createStoryPrompt
}