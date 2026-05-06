import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Task } from '../types';

interface InteractiveStepViewerProps {
  tasks: Task[];
}

const InteractiveStepViewer = ({ tasks }: InteractiveStepViewerProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / tasks.length) * 100;

  const nextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
      {/* Header Info */}
      <div className="bg-gray-800/50 border-b border-gray-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Step {currentTaskIndex + 1}/{tasks.length}
            </span>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
              {progress.toFixed(0)}% Complete
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{currentTask.title}</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={prevTask}
            disabled={currentTaskIndex === 0}
            className="flex items-center px-3 py-1.5 rounded bg-gray-800 text-gray-400 border border-gray-700 disabled:opacity-30 hover:text-white hover:border-gray-500 transition-all text-xs font-bold font-mono"
          >
            PREV
          </button>
          <button
            onClick={nextTask}
            disabled={currentTaskIndex === tasks.length - 1}
            className="flex items-center px-3 py-1.5 rounded bg-blue-600 text-white disabled:opacity-30 hover:bg-blue-500 transition-all text-xs font-bold font-mono"
          >
            NEXT
          </button>
        </div>
      </div>

      {/* Progress Bar Thin */}
      <div className="h-0.5 bg-gray-800 w-full">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTaskIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-0 relative"
          >
            {currentTask.steps.map((step, idx) => (
              <div key={idx} className="relative flex group">
                {/* Vertical Line */}
                {idx !== currentTask.steps.length - 1 && (
                  <div className="absolute left-[15px] top-[40px] bottom-[-20px] w-[2px] bg-gray-800 group-hover:bg-gray-700 transition-colors" />
                )}
                
                {/* Step Circle */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-800 flex items-center justify-center text-[10px] font-mono font-bold text-gray-500 z-10 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all mt-1">
                  {idx + 1}
                </div>

                <div className="flex-grow ml-6 pb-12">
                  <p className="text-gray-300 text-base leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {step.command && (
                    <div className="relative group/cmd mb-4 max-w-2xl">
                      <div className="devtool-code p-4 font-mono text-sm text-gray-100 overflow-x-auto">
                        <div className="flex items-center space-x-2 text-gray-600 mb-3 border-b border-gray-800 pb-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                          <span className="text-[10px] font-bold tracking-widest uppercase ml-2">Terminal</span>
                        </div>
                        <pre className="text-blue-400"><span className="text-gray-600 mr-2">$</span>{step.command}</pre>
                      </div>
                      <button
                        onClick={() => copyToClipboard(step.command!)}
                        className="absolute right-3 bottom-3 p-1.5 rounded bg-gray-800 text-gray-500 hover:text-blue-400 border border-gray-700 opacity-0 group-hover/cmd:opacity-100 transition-all flex items-center space-x-2 text-[10px] font-bold"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>COPY</span>
                      </button>
                    </div>
                  )}

                  {step.expectedOutput && (
                    <div className="mt-4 max-w-2xl">
                      <div className="flex items-center space-x-2 mb-1">
                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Expected Output</span>
                      </div>
                      <div className="bg-green-500/5 border border-green-500/10 rounded p-3 text-green-400/70 text-xs font-mono italic">
                        {step.expectedOutput}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 pt-8 border-t border-gray-800 flex justify-between items-center">
          <button
            onClick={prevTask}
            disabled={currentTaskIndex === 0}
            className="text-xs font-mono font-bold text-gray-500 hover:text-white disabled:opacity-20 transition-colors flex items-center"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            PREVIOUS_TASK
          </button>
          
          <div className="text-[10px] font-mono text-gray-700 font-bold uppercase tracking-[0.2em]">
            Cloud_Lab_Protocol_v1.0
          </div>

          <button
            onClick={nextTask}
            disabled={currentTaskIndex === tasks.length - 1}
            className="text-xs font-mono font-bold text-blue-500 hover:text-blue-400 disabled:opacity-20 transition-colors flex items-center"
          >
            NEXT_TASK
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStepViewer;
