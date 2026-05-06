export type AnimationTrigger = 
  | 'CREATE_VM' 
  | 'INSTALL_NGINX' 
  | 'CREATE_BUCKET' 
  | 'UPLOAD_FILE' 
  | 'MAKE_PUBLIC'
  | 'CONNECT_DB' 
  | 'CREATE_DB'
  | 'PUBLISH_MSG'
  | 'CREATE_VPC'
  | 'PEER_VPC'
  | 'DEPLOY_FUNCTION'
  | 'CREATE_CLUSTER';

export type ArchitectureNodeType =
  | 'compute'
  | 'storage'
  | 'database'
  | 'network'
  | 'serverless'
  | 'monitoring'
  | 'messaging'
  | 'registry'
  | 'cicd'
  | 'app'
  | 'user'
  | 'ops'
  | 'generic';

export type ArchitectureEdgeStyle = 'solid' | 'dashed';

export interface DetailedStep {
  description: string;
  command?: string;
  codeBlock?: string;
  expectedOutput?: string;
  animationTrigger?: AnimationTrigger;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: ArchitectureNodeType;
  x: number;
  y: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface ArchitectureEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  style?: ArchitectureEdgeStyle;
  animated?: boolean;
}

export interface ArchitectureView {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ArchitectureLayout {
  xScale?: number;
  yScale?: number;
  xOffset?: number;
  yOffset?: number;
}

export interface ArchitectureStepDetail extends ArchitectureView {
  stepIndex: number;
  title?: string;
}

export interface TaskArchitecture {
  overview: ArchitectureView;
  detail: ArchitectureStepDetail[];
  layout?: ArchitectureLayout;
}

export interface ExperimentArchitecture {
  tasks: TaskArchitecture[];
}

export interface Task {
  title: string;
  steps: DetailedStep[];
}

export interface Command {
  cmd: string;
  purpose: string;
}

export interface Viva {
  question: string;
  answer: string;
}

export interface Experiment {
  id: string;
  title: string;
  aim: string;
  sourceUrl: string;
  tasks: Task[];
  commands: Command[];
  viva: Viva[];
  architecture?: ExperimentArchitecture;
  notes?: string[];
  conclusion?: string;
  result?: string;
}
