import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Task, type AnimationTrigger, type ExperimentArchitecture } from '../types';
import ArchitectureCanvas from './ArchitectureCanvas';

interface InteractiveStepViewerProps {
  tasks: Task[];
  architecture?: ExperimentArchitecture;
}

const InteractiveStepViewer = ({ tasks, architecture }: InteractiveStepViewerProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [activeTrigger, setActiveTrigger] = useState<AnimationTrigger | undefined>();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');
  const currentTask = tasks[currentTaskIndex];
  const currentArchitecture = architecture?.tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / tasks.length) * 100;

  // Set active trigger when task changes
  useEffect(() => {
    const firstTriggerIndex = currentTask.steps.findIndex((step) => step.animationTrigger);
    const nextIndex = firstTriggerIndex >= 0 ? firstTriggerIndex : 0;
    setActiveStepIndex(nextIndex);
    setActiveTrigger(currentTask.steps[nextIndex]?.animationTrigger);
    setViewMode('overview');
  }, [currentTaskIndex, currentTask]);

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Right Column (Visual Simulation) - Shown first on mobile (order-1) and second on desktop (lg:order-2) */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 order-1 lg:order-2 mb-8 lg:mb-0">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">Live_Architecture_Canvas</h3>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div className="flex items-center rounded-full bg-gray-900/60 border border-gray-800 p-0.5 text-[10px] font-mono uppercase">
              <button
                type="button"
                onClick={() => setViewMode('overview')}
                className={`px-2 py-1 rounded-full transition-all ${
                  viewMode === 'overview'
                    ? 'bg-blue-500/20 text-blue-200'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setViewMode('detail')}
                className={`px-2 py-1 rounded-full transition-all ${
                  viewMode === 'detail'
                    ? 'bg-blue-500/20 text-blue-200'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Detail
              </button>
            </div>
          </div>
        </div>
        <ArchitectureCanvas
          activeTrigger={activeTrigger}
          steps={currentTask.steps}
          activeStepIndex={activeStepIndex}
          architecture={currentArchitecture}
          viewMode={viewMode}
          onSelectStep={(index) => {
            setActiveStepIndex(index);
            setActiveTrigger(currentTask.steps[index]?.animationTrigger);
            setViewMode('detail');
          }}
        />
        <div className="mt-4 devtool-card p-4 rounded-lg opacity-60">
          <p className="text-[10px] font-mono text-gray-500 leading-relaxed uppercase tracking-wider">
            Architecture simulation is reactive. Icons with blue borders indicate an interactive trigger point.
          </p>
        </div>
      </div>

      {/* Left Column (Instructions) - Shown second on mobile (order-2) and first on desktop (lg:order-1) */}
      <div className="lg:col-span-7 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-2xl order-2 lg:order-1">
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
              {currentTask.steps.map((step, idx) => {
                const isActiveStep = idx === activeStepIndex;

                return (
                <div
                  key={idx}
                  className="relative flex group cursor-pointer"
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setActiveTrigger(step.animationTrigger);
                    setViewMode('detail');
                  }}
                >
                  {/* Vertical Line */}
                  {idx !== currentTask.steps.length - 1 && (
                    <div className="absolute left-[15px] top-[40px] bottom-[-20px] w-[2px] bg-gray-800 group-hover:bg-gray-700 transition-colors" />
                  )}
                  
                  {/* Step Circle */}
                  <div 
                    onClick={() => step.animationTrigger && setActiveTrigger(step.animationTrigger)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 border-2 flex items-center justify-center text-[10px] font-mono font-bold z-10 transition-all mt-1 ${
                      isActiveStep
                        ? 'border-blue-400 text-blue-200 shadow-[0_0_12px_rgba(88,166,255,0.35)] ring-2 ring-blue-500/30'
                        : step.animationTrigger 
                          ? 'border-blue-500 text-blue-400 cursor-pointer shadow-[0_0_10px_rgba(88,166,255,0.2)]' 
                          : 'border-gray-800 text-gray-500 group-hover:border-gray-700'
                    }`}
                  >
                    {step.animationTrigger ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (idx + 1)}
                  </div>

                  <div className={`flex-grow ml-6 pb-12 rounded-lg transition-colors ${
                    isActiveStep ? 'bg-blue-500/5' : ''
                  }`}>
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
                          className="absolute right-3 bottom-3 p-1.5 rounded bg-gray-800 text-gray-500 hover:text-blue-400 border border-gray-700 opacity-100 md:opacity-0 md:group-hover/cmd:opacity-100 transition-all flex items-center space-x-2 text-[10px] font-bold"
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
              );
              })}
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

    </div>
  );
};

export default InteractiveStepViewer;
