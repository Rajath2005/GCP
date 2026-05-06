import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { experiments } from '../data/experiments';
import ExperimentCard from '../components/ExperimentCard';
import { useExperimentProgress } from '../hooks/useExperimentProgress';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isCompleted, completedExperiments } = useExperimentProgress();

  const filteredExperiments = experiments.filter((exp) => 
    exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.aim.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completionPercentage = Math.round((completedExperiments.length / experiments.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-extrabold text-white mb-4 tracking-tight"
            >
              CloudLab <span className="text-blue-500 font-mono">Prep_Portal</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg"
            >
              Master Google Cloud Platform labs with interactive guides and quick revision notes.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg flex items-center space-x-6"
          >
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Progress</div>
              <div className="text-2xl font-mono font-bold text-white">{completionPercentage}%</div>
            </div>
            <div className="w-32 h-2 bg-gray-900 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
              />
            </div>
          </motion.div>
        </div>

        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search experiments, services, or IDs..."
            className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredExperiments.map((exp, index) => (
            <motion.div
              key={exp.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <ExperimentCard 
                experiment={exp} 
                isCompleted={isCompleted(exp.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredExperiments.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-gray-600 font-mono mb-2">0 matches found for "{searchQuery}"</div>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-blue-500 hover:underline text-sm font-bold"
          >
            Clear Search
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
