import { motion, AnimatePresence } from 'framer-motion';
import {
  type AnimationTrigger,
  type DetailedStep,
  type TaskArchitecture,
  type ArchitectureNode,
  type ArchitectureView,
  type ArchitectureLayout,
} from '../types';

interface ArchitectureCanvasProps {
  activeTrigger?: AnimationTrigger;
  steps?: DetailedStep[];
  activeStepIndex?: number;
  onSelectStep?: (index: number) => void;
  architecture?: TaskArchitecture;
  viewMode?: 'overview' | 'detail';
}

const MAX_STEP_LABEL = 44;

const trimLabel = (value: string) => {
  if (value.length <= MAX_STEP_LABEL) {
    return value;
  }

  return `${value.slice(0, MAX_STEP_LABEL - 3)}...`;
};

const clampValue = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const applyLayout = (node: ArchitectureNode, layout?: ArchitectureLayout) => {
  if (!layout) {
    return node;
  }

  const xScale = layout.xScale ?? 1;
  const yScale = layout.yScale ?? 1;
  const xOffset = layout.xOffset ?? 0;
  const yOffset = layout.yOffset ?? 0;

  const x = clampValue(50 + (node.x - 50) * xScale + xOffset, 6, 94);
  const y = clampValue(50 + (node.y - 50) * yScale + yOffset, 8, 92);

  return {
    ...node,
    x,
    y,
  };
};

const getNodeClassNames = (node: ArchitectureNode) => {
  const base = 'relative rounded-full border flex items-center justify-center shadow-lg';
  const sizeClass = node.size === 'lg'
    ? 'h-16 w-16'
    : node.size === 'sm'
      ? 'h-10 w-10'
      : 'h-12 w-12';

  const palette: Record<ArchitectureNode['type'], string> = {
    compute: 'border-blue-400/60 bg-blue-500/15 text-blue-300',
    storage: 'border-yellow-400/60 bg-yellow-500/15 text-yellow-300',
    database: 'border-emerald-400/60 bg-emerald-500/15 text-emerald-300',
    network: 'border-cyan-400/60 bg-cyan-500/15 text-cyan-200',
    serverless: 'border-purple-400/60 bg-purple-500/15 text-purple-300',
    monitoring: 'border-orange-400/60 bg-orange-500/15 text-orange-300',
    messaging: 'border-pink-400/60 bg-pink-500/15 text-pink-300',
    registry: 'border-indigo-400/60 bg-indigo-500/15 text-indigo-300',
    cicd: 'border-sky-400/60 bg-sky-500/15 text-sky-300',
    app: 'border-slate-400/60 bg-slate-500/15 text-slate-200',
    user: 'border-gray-300/60 bg-gray-500/15 text-gray-200',
    ops: 'border-lime-400/60 bg-lime-500/15 text-lime-300',
    generic: 'border-gray-500/60 bg-gray-700/20 text-gray-200',
  };

  return `${base} ${sizeClass} ${palette[node.type]}`;
};

const renderArchitectureView = (view: ArchitectureView, layout?: ArchitectureLayout) => {
  const adjustedNodes = view.nodes.map((node) => applyLayout(node, layout));
  const nodeMap = new Map(adjustedNodes.map((node) => [node.id, node]));

  return (
    <div className="relative w-full h-full min-h-[200px] md:min-h-[300px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {view.edges.map((edge) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);

          if (!from || !to) {
            return null;
          }

          return (
            <g key={edge.id}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`blueprint-edge ${edge.style === 'dashed' ? 'blueprint-edge-dashed' : ''}`}
              />
              {edge.animated && (
                <motion.circle
                  cx={from.x}
                  cy={from.y}
                  r="1.6"
                  className="blueprint-packet"
                  animate={{ cx: [from.x, to.x], cy: [from.y, to.y] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {adjustedNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className={getNodeClassNames(node)}>
            <div className="h-2.5 w-2.5 rounded-full bg-current opacity-80 shadow-[0_0_10px_currentColor]" />
          </div>
          <div className="mt-2 text-center text-[10px] font-mono uppercase tracking-widest text-gray-400 max-w-[120px]">
            {node.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ArchitectureCanvas = ({
  activeTrigger,
  steps,
  activeStepIndex,
  onSelectStep,
  architecture,
  viewMode = 'detail',
}: ArchitectureCanvasProps) => {
  const hasSteps = Boolean(steps?.length);
  const hasArchitecture = Boolean(architecture?.overview.nodes.length);
  const detailView = architecture?.detail.find((detail) => detail.stepIndex === activeStepIndex);
  const resolvedView = viewMode === 'detail' && detailView ? detailView : architecture?.overview;

  return (
    <div className="w-full h-full min-h-[250px] md:min-h-[420px] bg-[#0b1220] rounded-lg border border-[#1f2a3a] p-6 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 pointer-events-none blueprint-grid" />
      <div className="absolute inset-0 pointer-events-none blueprint-glow" />
      <div className="absolute inset-0 pointer-events-none blueprint-scan" />

      <div className="relative flex-1 flex items-center justify-center">
        {hasArchitecture && resolvedView ? (
          <div className="w-full">
            <div className="mb-3 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500">
              <span>{viewMode === 'overview' ? 'Topology_Overview' : 'Step_Architecture'}</span>
              <span className="text-blue-400">v2</span>
            </div>
            {renderArchitectureView(resolvedView, architecture?.layout)}
          </div>
        ) : (
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
        )}

        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-800" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gray-800" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gray-800" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-800" />
      </div>

      {hasSteps && (
        <div className="relative mt-6 w-full">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em]">
              Step_Flow
            </div>
            <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
              Interactive
            </div>
          </div>
          <div className="mt-3 max-h-[200px] overflow-auto pr-1 space-y-2">
            {steps?.map((step, index) => {
              const isActive = index === activeStepIndex;
              const isLive = Boolean(step.animationTrigger);

              return (
                <button
                  key={`${index}-${step.description}`}
                  type="button"
                  onClick={() => onSelectStep?.(index)}
                  className={`w-full text-left flex items-start gap-3 rounded-lg border px-3 py-2 transition-all ${
                    isActive
                      ? 'border-blue-500/70 bg-blue-500/10 text-blue-200 shadow-[0_0_18px_rgba(88,166,255,0.18)]'
                      : 'border-gray-800 bg-gray-900/60 text-gray-500 hover:border-blue-500/40 hover:text-gray-300'
                  } ${onSelectStep ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="mt-1">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        isActive
                          ? 'bg-blue-400 shadow-[0_0_10px_rgba(88,166,255,0.6)] animate-pulse'
                          : isLive
                            ? 'bg-blue-500/70'
                            : 'bg-gray-700'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold tracking-tight">
                      {trimLabel(step.description)}
                    </div>
                    <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-gray-600">
                      Step_{String(index + 1).padStart(2, '0')}
                      {isLive ? <span className="ml-2 text-blue-400">Live_Trigger</span> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureCanvas;
