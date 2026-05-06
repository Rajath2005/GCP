import { useState, useEffect } from 'react';

export const useExperimentProgress = () => {
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('completed_experiments');
    if (stored) {
      setCompletedExperiments(JSON.parse(stored));
    }
  }, []);

  const toggleCompletion = (id: string) => {
    const newCompleted = completedExperiments.includes(id)
      ? completedExperiments.filter((expId) => expId !== id)
      : [...completedExperiments, id];
    
    setCompletedExperiments(newCompleted);
    localStorage.setItem('completed_experiments', JSON.stringify(newCompleted));
  };

  const isCompleted = (id: string) => completedExperiments.includes(id);

  return { completedExperiments, toggleCompletion, isCompleted };
};
