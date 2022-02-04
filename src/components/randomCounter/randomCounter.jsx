import './randomCounter.css';
import React, { useState, useEffect } from 'react';
import { getRandomCount } from '@/utils';


const DOC_TITLE = document.title;

export default function RandomCounter({
  min = 10,
  max = 100,
  fps = 1000 / 60,
  onComplete,
}) {

  const [MAX_COUNT] = useState(getRandomCount(min, max));

  useEffect(
    () => (document.title = `(${MAX_COUNT}) ${DOC_TITLE}`),
    [MAX_COUNT]
  );

  const [count, setCount] = useState(0);

  let isComplete = count >= MAX_COUNT;

  useEffect(() => {
    let clearId = setTimeout(() => {
      if (!isComplete) setCount((count) => count + 1);
      else onComplete?.();
    }, fps);

    return () => clearTimeout(clearId);
  }, [count, fps, isComplete, onComplete]);

  return (
    <output
      data-testid="output"
      className="randomCounter"
      style={!isComplete ? null : { animationName: 'none' }}
    >
      {count}
    </output>
  );
  
}
