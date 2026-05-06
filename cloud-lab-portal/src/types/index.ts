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

export interface DetailedStep {
  description: string;
  command?: string;
  codeBlock?: string;
  expectedOutput?: string;
  animationTrigger?: AnimationTrigger;
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
  notes?: string[];
  conclusion?: string;
  result?: string;
}
