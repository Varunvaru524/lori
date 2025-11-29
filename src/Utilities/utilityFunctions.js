import Svg, { Circle, Defs, Path, Rect, G, Stop, LinearGradient, ClipPath, Mask } from "react-native-svg"


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

function NewAiChatIcon({ color, size, ...rest }) {
  return (
    <Svg width={size} height={size} {...rest} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path fill={color} d="M7.71951 2.65625C7.89078 2.32292 8.36729 2.32291 8.53856 2.65625L10.3274 6.13781C10.3713 6.22335 10.441 6.29298 10.5265 6.33693L14.0081 8.12576C14.3414 8.29703 14.3414 8.77354 14.0081 8.94481L10.5265 10.7336C10.441 10.7776 10.3713 10.8472 10.3274 10.9327L8.53856 14.4143C8.36729 14.7476 7.89078 14.7476 7.71951 14.4143L5.93068 10.9327C5.88673 10.8472 5.8171 10.7776 5.73156 10.7336L2.25 8.94481C1.91667 8.77354 1.91666 8.29703 2.25 8.12576L5.73156 6.33693C5.8171 6.29298 5.88673 6.22335 5.93068 6.13781L7.71951 2.65625Z" />
      <Path fill={color} d="M17.1821 9.68724C17.3083 9.44162 17.6594 9.44162 17.7856 9.68724L19.1037 12.2526C19.1361 12.3156 19.1874 12.3669 19.2504 12.3993L21.8158 13.7174C22.0614 13.8436 22.0614 14.1947 21.8158 14.3209L19.2504 15.639C19.1874 15.6714 19.1361 15.7227 19.1037 15.7857L17.7856 18.3511C17.6594 18.5967 17.3083 18.5967 17.1821 18.3511L15.864 15.7857C15.8316 15.7227 15.7803 15.6714 15.7173 15.639L13.152 14.3209C12.9063 14.1947 12.9063 13.8436 13.152 13.7174L15.7173 12.3993C15.7803 12.3669 15.8316 12.3156 15.864 12.2526L17.1821 9.68724Z" />
      <Path fill={color} d="M10.8598 17.3502C10.9319 17.2099 11.1326 17.2099 11.2047 17.3502L11.9579 18.8161C11.9764 18.8522 12.0057 18.8815 12.0417 18.9L13.5076 19.6532C13.648 19.7253 13.648 19.9259 13.5076 19.998L12.0417 20.7512C12.0057 20.7697 11.9764 20.799 11.9579 20.8351L11.2047 22.301C11.1326 22.4413 10.9319 22.4413 10.8598 22.301L10.1066 20.8351C10.0881 20.799 10.0588 20.7697 10.0228 20.7512L8.55688 19.998C8.41652 19.9259 8.41652 19.7253 8.55688 19.6532L10.0228 18.9C10.0588 18.8815 10.0881 18.8522 10.1066 18.8161L10.8598 17.3502Z" />
    </Svg>
  )
}


export {
  callAiModel,
  createStoryPrompt,
  NewAiChatIcon
}