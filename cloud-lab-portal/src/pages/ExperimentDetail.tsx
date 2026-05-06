import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { experiments } from '../data/experiments';
import { useState } from 'react';
import InteractiveStepViewer from '../components/InteractiveStepViewer';
import { useExperimentProgress } from '../hooks/useExperimentProgress';

const ExperimentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const experiment = experiments.find((e) => e.id === id);
  const { isCompleted, toggleCompletion } = useExperimentProgress();

  if (!experiment) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-3xl font-bold mb-4">Experiment not found</h2>
        <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const completed = isCompleted(experiment.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <Link to="/" className="inline-flex items-center text-xs font-mono font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Back_to_Dashboard
        </Link>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => toggleCompletion(experiment.id)}
            className={`flex items-center px-4 py-2 rounded font-mono text-xs font-bold transition-all border ${
              completed 
                ? 'bg-green-500/10 text-green-500 border-green-500/50' 
                : 'bg-gray-800 text-gray-500 border-gray-700 hover:border-gray-500'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {completed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {completed ? 'COMPLETED' : 'MARK_DONE'}
          </button>

          <a 
            href={experiment.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 rounded font-mono text-xs font-bold bg-gray-800 text-gray-500 border border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-all"
          >
            SOURCE_URL
          </a>
          
          <button
            onClick={() => setIsRevisionMode(!isRevisionMode)}
            className={`flex items-center px-4 py-2 rounded font-mono text-xs font-bold transition-all border ${
              isRevisionMode 
                ? 'bg-blue-600 text-white border-blue-500' 
                : 'bg-gray-800 text-gray-500 border-gray-700 hover:border-gray-500'
            }`}
          >
            {isRevisionMode ? 'EXIT_REVISION' : 'REVISION_MODE'}
          </button>
        </div>
      </div>

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-[0.3em] mb-2 block">
            LAB_PROTOCOL_{experiment.id}
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">
            {experiment.title}
          </h1>
          <div className="h-1 w-20 bg-blue-600 rounded-full" />
        </div>

        <AnimatePresence mode="wait">
          {isRevisionMode ? (
            <motion.div
              key="revision"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              <div className="ruled-paper text-gray-900 p-8 pt-12 pb-20 rounded shadow-2xl min-h-[800px]">
                <div className="pl-20">
                  <div className="border-b-2 border-red-500/20 pb-4 mb-12 text-center">
                    <h2 className="text-3xl font-bold uppercase tracking-[0.2em] text-blue-900 font-serif">Lab Record</h2>
                  </div>
                  
                  <div className="space-y-10 font-serif text-lg leading-[1.5em]">
                    <section>
                      <h3 className="font-bold text-xl text-red-600 mb-2">AIM:</h3>
                      <p className="ml-4 italic">{experiment.aim}</p>
                    </section>

                    <section>
                      <h3 className="font-bold text-xl text-red-600 mb-2">PROCEDURE:</h3>
                      <ol className="list-decimal list-outside ml-10 space-y-4">
                        {experiment.tasks.map((task, i) => (
                          <li key={i}>
                            <span className="font-bold underline">{task.title}</span>
                            <ul className="list-disc list-outside ml-6 mt-1 space-y-1 font-normal text-base opacity-80">
                              {task.steps.map((step, si) => (
                                <li key={si}>{step.description}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ol>
                    </section>

                    <section>
                      <h3 className="font-bold text-xl text-red-600 mb-2">RESULT:</h3>
                      <p className="ml-4 italic">{experiment.result || 'The experiment was successfully performed and the output was verified on the Google Cloud Console.'}</p>
                    </section>

                    <section>
                      <h3 className="font-bold text-xl text-red-600 mb-2">CONCLUSION:</h3>
                      <p className="ml-4 italic">{experiment.conclusion || `Successfully understood the deployment and management of ${experiment.title.toLowerCase()} in GCP.`}</p>
                    </section>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600 font-mono text-[10px] uppercase tracking-widest">
                <div className="w-10 h-px bg-gray-800" />
                <span>END_OF_RECORD</span>
                <div className="w-10 h-px bg-gray-800" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <section className="devtool-card rounded-lg p-8 mb-12">
                <div className="flex items-center space-x-2 mb-4 text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest">Executive_Summary</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                  {experiment.aim}
                </p>
              </section>

              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Guide</h2>
                  <div className="text-[10px] font-mono text-gray-600 font-bold uppercase tracking-widest bg-gray-800/50 px-3 py-1 rounded">
                    Terminal_v2.4
                  </div>
                </div>
                <InteractiveStepViewer tasks={experiment.tasks} />
              </section>

              <section className="mb-16">
                <div className="flex items-center space-x-2 mb-8 text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest">Viva_Preparation</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {experiment.viva.map((item, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ x: 4 }}
                      className="devtool-card p-6 rounded-lg"
                    >
                      <h4 className="text-blue-400 font-bold font-mono text-sm mb-2">Q: {item.question}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">A: {item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ExperimentDetail;

