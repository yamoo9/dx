import './randomCounter.css';
import React, { useState, useEffect, CSSProperties } from 'react';
import { getRandomCount } from '@/utils';


const DOC_TITLE = document.title;

interface RandomCounterProps {
  min?: number;
  max?: number;
  fps?: number;
  onComplete?: () => void;
}

export default function RandomCounter({
  min = 10,
  max = 100,
  fps = 1000 / 60,
  onComplete,
}: RandomCounterProps) {
  const [MAX_COUNT] = useState<number>(getRandomCount(min, max));

  useEffect(() => {
    document.title = `(${MAX_COUNT}) ${DOC_TITLE}`;
  }, [MAX_COUNT]);

  const [count, setCount] = useState<number>(0);

  let isComplete: boolean = count >= MAX_COUNT;

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
      style={(!isComplete ? null : { animationName: 'none' }) as CSSProperties}
    >
      {count}
    </output>
  );
}
