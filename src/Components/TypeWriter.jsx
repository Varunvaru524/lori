import { memo, useEffect, useState } from "react";
import Markdown from 'react-native-markdown-display';


const TypeWriter = memo(({ text, style, onComplete }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!text) { setDisplayText(''); return; }
    setDisplayText('');

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 30));
        currentIndex += 30;                                        // Typing speed
      } else {
        clearInterval(interval);
        onComplete()
      }
    }, 25);                                                        // Typing speed

    return () => clearInterval(interval);
  }, [text]);

  return <Markdown style={style}>{displayText}</Markdown>;
});


// Export
export default TypeWriter;