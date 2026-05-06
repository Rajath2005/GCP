import { motion, AnimatePresence } from 'framer-motion';
import { type AnimationTrigger } from '../types';

interface ArchitectureCanvasProps {
  activeTrigger?: AnimationTrigger;
}

const ArchitectureCanvas = ({ activeTrigger }: ArchitectureCanvasProps) => {
  return (
    <div className="w-full h-full min-h-[400px] bg-[#0d1117] rounded-lg border border-[#30363d] p-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#58a6ff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <AnimatePresence mode="wait">
        {!activeTrigger && (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-700 font-mono text-[10px] uppercase tracking-widest text-center"
          >
            Awaiting_Architecture_Signal...
          </motion.div>
        )}

        {activeTrigger === 'CREATE_VM' && (
          <motion.div 
            key="create_vm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="relative"
          >
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -inset-8 border-2 border-dashed border-blue-500/30 rounded-xl"
            />
            <div className="bg-blue-500/10 border border-blue-500/50 p-6 rounded-lg shadow-[0_0_30px_rgba(88,166,255,0.1)]">
              <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              <div className="mt-4 text-center font-mono text-[10px] text-blue-400 font-bold uppercase tracking-widest">Compute_Engine</div>
            </div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              className="h-0.5 bg-blue-500 mt-2 rounded-full"
            />
          </motion.div>
        )}

        {activeTrigger === 'INSTALL_NGINX' && (
          <motion.div 
            key="install_nginx"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="bg-blue-500/10 border border-blue-500/50 p-4 rounded-lg">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute -top-2 -right-2 w-6 h-6 border-2 border-t-green-500 border-green-500/20 rounded-full"
              />
            </div>
            <div className="bg-green-500/10 border border-green-500/50 px-4 py-2 rounded text-green-400 font-mono text-[10px] font-bold">
              NGINX_SERVICE_ACTIVE
            </div>
          </motion.div>
        )}

        {activeTrigger === 'CREATE_BUCKET' && (
          <motion.div 
            key="create_bucket"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-yellow-500/10 border border-yellow-500/50 p-8 rounded-full shadow-[0_0_40px_rgba(241,196,15,0.1)]"
          >
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <div className="mt-4 text-center font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Cloud_Storage</div>
          </motion.div>
        )}

        {activeTrigger === 'UPLOAD_FILE' && (
          <motion.div 
            key="upload_file"
            className="flex items-center space-x-12"
          >
            <div className="p-4 bg-gray-800 rounded border border-gray-700">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="relative w-24">
              <div className="h-0.5 w-full bg-dashed border-t-2 border-dashed border-gray-700" />
              <motion.div 
                animate={{ x: [0, 96] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#58a6ff]"
              />
            </div>
            <div className="p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
              <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </motion.div>
        )}
        
        {/* Fallback for other triggers */}
        {['CREATE_DB', 'CONNECT_DB', 'PUBLISH_MSG', 'CREATE_VPC', 'PEER_VPC', 'DEPLOY_FUNCTION', 'CREATE_CLUSTER'].includes(activeTrigger || '') && (
          <motion.div 
            key="generic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="bg-purple-500/10 border border-purple-500/50 p-8 rounded-2xl">
              <svg className="w-16 h-16 text-purple-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="mt-4 font-mono text-[10px] text-purple-400 font-bold uppercase tracking-widest">
              {activeTrigger?.replace('_', ' ')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Corner Borders */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-800" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gray-800" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gray-800" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-800" />
    </div>
  );
};

export default ArchitectureCanvas;
