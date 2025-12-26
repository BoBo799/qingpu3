
export enum OrderStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABNORMAL = 'ABNORMAL',
  RECTIFYING = 'RECTIFYING',
  CLOSED = 'CLOSED'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface InspectionOrder {
  id: string;
  type: string;
  voltage: string;
  team: string;
  person: string;
  createTime: string;
  status: OrderStatus;
  riskLevel: RiskLevel;
  description: string;
  aiComment?: string;
  evidenceUrls: string[];
}

export interface Rule {
  id: string;
  name: string;
  code: string;
  category: string;
  logic: string;
  riskLevel: RiskLevel;
  isActive: boolean;
}

export interface PerformanceStats {
  quality: number;
  efficiency: number;
  safety: number;
  standard: number;
  innovation: number;
}

export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
}
