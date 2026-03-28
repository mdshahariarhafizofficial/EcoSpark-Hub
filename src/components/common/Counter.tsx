'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function Counter({ value, duration = 2.5, suffix = '', prefix = '', className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = value % 1 !== 0;
    const controls = animate(0, value, {
      duration,
      onUpdate: (latest) => {
        if (isDecimal) {
          setDisplayValue(latest.toFixed(1));
        } else {
          setDisplayValue(Math.floor(latest).toLocaleString());
        }
      },
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
