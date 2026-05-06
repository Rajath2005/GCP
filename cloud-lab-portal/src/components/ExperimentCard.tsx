import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { type Experiment } from '../types';

interface ExperimentCardProps {
  experiment: Experiment;
  isCompleted: boolean;
}

const ExperimentCard = ({ experiment, isCompleted }: ExperimentCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="devtool-card rounded-lg overflow-hidden flex flex-col h-full relative"
    >
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-green-500/20 text-green-400 p-1 rounded-full border border-green-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
      
      <Link to={`/experiment/${experiment.id}`} className="flex flex-col h-full p-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-tighter bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
            {experiment.id}
          </span>
          {isCompleted && <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Completed</span>}
        </div>
        
        <h3 className="text-lg font-bold text-gray-100 mb-2 leading-tight group-hover:text-blue-400 transition-colors">
          {experiment.title}
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
          {experiment.aim}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
          <span className="text-xs font-mono text-gray-600">GCP Service</span>
          <div className="flex items-center text-blue-400 text-xs font-bold uppercase tracking-widest group">
            Open Lab
            <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExperimentCard;
