'use client';

import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate?: Date;
  onComplete?: () => void;
}

export default function CountdownTimer({ endDate, onComplete }: CountdownTimerProps) {
  // Default: 24 hours from now
  const defaultEndDate = new Date();
  defaultEndDate.setHours(defaultEndDate.getHours() + 24);
  
  const targetDate = endDate || defaultEndDate;
  
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      onComplete?.();
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const timeUnits = [
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass-strong border border-pink-500/30"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        </motion.div>
        <span className="text-white font-bold">Limited Time:</span>
      </div>
      
      <div className="flex items-center gap-2">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="min-w-[3rem] px-3 py-2 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white font-bold text-2xl text-center"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>
              <span className="text-xs text-gray-400 mt-1">{unit.label}</span>
            </div>
            
            {index < timeUnits.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-2xl text-pink-400 font-bold mx-1"
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
