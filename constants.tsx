
import { OrderStatus, RiskLevel, InspectionOrder, Rule } from './types';

export const MOCK_ORDERS: InspectionOrder[] = [
  {
    id: 'QP-20240520-001',
    type: '计划性检修',
    voltage: '10kV',
    team: '配电运检一班',
    person: '陈明(夏阳供电所)',
    createTime: '2024-05-20 09:00',
    status: OrderStatus.ABNORMAL,
    riskLevel: RiskLevel.HIGH,
    description: '青浦中心医院备用电源接入工程',
    aiComment: 'AI识别：现场安全围栏设置高度不符合上海市电力公司《现场安全文明标准》，高度低于1.2m。建议立即整改。',
    evidenceUrls: ['https://picsum.photos/seed/qp1/400/300', 'https://picsum.photos/seed/qp2/400/300']
  },
  {
    id: 'QP-20240520-002',
    type: '应急抢修',
    voltage: '0.4kV',
    team: '抢修中心二组',
    person: '王海(朱家角供电所)',
    createTime: '2024-05-20 10:45',
    status: OrderStatus.COMPLETED,
    riskLevel: RiskLevel.LOW,
    description: '朱家角古镇1号公变断路器更换',
    aiComment: 'AI识别：作业步骤完整，工作票现场照片与PMS 3.0系统记录逻辑一致，作业区域清理干净。',
    evidenceUrls: ['https://picsum.photos/seed/qp3/400/300']
  },
  {
    id: 'QP-20240520-003',
    type: '专项巡检',
    voltage: '10kV',
    team: '自动化班',
    person: '周伟(徐泾供电所)',
    createTime: '2024-05-20 13:20',
    status: OrderStatus.IN_PROGRESS,
    riskLevel: RiskLevel.MEDIUM,
    description: '进博会核心区馈线自动化校验',
    aiComment: 'AI分析中：正在匹配《进博会重要用户保电技术导则》，初步检测设备铭牌清晰度达标。',
    evidenceUrls: ['https://picsum.photos/seed/qp4/400/300']
  },
  {
    id: 'QP-20240520-004',
    type: '日常巡检',
    voltage: '10kV',
    team: '巡视二组',
    person: '李芳(练塘供电所)',
    createTime: '2024-05-20 14:15',
    status: OrderStatus.COMPLETED,
    riskLevel: RiskLevel.LOW,
    description: '练塘工业园区配变例行巡检',
    aiComment: 'AI识别：设备运行状态正常，未发现油迹或发热迹象。',
    evidenceUrls: ['https://picsum.photos/seed/qp5/400/300']
  },
  {
    id: 'QP-20240520-005',
    type: '基建施工',
    voltage: '35kV',
    team: '施工二队',
    person: '张强(华新供电所)',
    createTime: '2024-05-20 15:00',
    status: OrderStatus.ABNORMAL,
    riskLevel: RiskLevel.CRITICAL,
    description: '华新物流园1号基坑开挖作业',
    aiComment: 'AI识别：基坑深度检测仪显示当前深度1.1m，低于设计要求1.5m，且周边土堆堆放过近，存在塌方风险。',
    evidenceUrls: ['https://picsum.photos/seed/qp6/400/300', 'https://picsum.photos/seed/qp7/400/300']
  },
  {
    id: 'QP-20240520-006',
    type: '表计更换',
    voltage: '0.4kV',
    team: '营销服务班',
    person: '赵敏(赵巷供电所)',
    createTime: '2024-05-20 15:45',
    status: OrderStatus.COMPLETED,
    riskLevel: RiskLevel.LOW,
    description: '赵巷嘉松中路智能电表批量更换',
    aiComment: 'AI识别：新表读数清晰，封印完整，现场环境整洁。',
    evidenceUrls: ['https://picsum.photos/seed/qp8/400/300']
  }
];

export const MOCK_RULES: Rule[] = [
  {
    id: 'QP-R001',
    name: '上海公司现场安全围栏红外感应校验',
    code: 'SH_SAFE_FENCE',
    category: '安全红线',
    logic: 'IF (WorkArea.Status == ACTIVE) AND (Fence.Coverage < 100%) THEN ALERT_CRITICAL',
    riskLevel: RiskLevel.CRITICAL,
    isActive: true
  },
  {
    id: 'QP-R002',
    name: '青浦古镇狭窄空间作业工器具合规性',
    code: 'QP_NARROW_SPACE',
    category: '技术规程',
    logic: 'IF (Location == ZHUJIAJIAO) AND (Tool.Type != SPECIAL_NARROW) THEN WARNING',
    riskLevel: RiskLevel.HIGH,
    isActive: true
  },
  {
    id: 'QP-R003',
    name: 'PMS 3.0 图片GPS空间偏移自动校核',
    code: 'PMS3_GPS_CHECK',
    category: '数字化标准',
    logic: 'IF (Image.GPS - Station.Asset.GPS > 10m) THEN AUTO_FLAG',
    riskLevel: RiskLevel.MEDIUM,
    isActive: true
  },
  {
    id: 'QP-R004',
    name: '施工现场绝缘绳索探伤检测',
    code: 'SAFE_ROPE_01',
    category: '安全规程',
    logic: 'IF (Rope.VisualAnalysis == DAMAGED) THEN BLOCK_OPERATION',
    riskLevel: RiskLevel.CRITICAL,
    isActive: true
  },
  {
    id: 'QP-R005',
    name: '进博会保电重要用户供电路径校验',
    code: '保电_PATH_CHECK',
    category: '专项保电',
    logic: 'IF (User.Priority == VIP) AND (BackupPath.Status != STANDBY) THEN TRIGGER_ALARM',
    riskLevel: RiskLevel.HIGH,
    isActive: false
  }
];

export const DASHBOARD_TREND_DATA = [
  { name: '夏阳', count: 120, error: 12 },
  { name: '盈浦', count: 132, error: 8 },
  { name: '香花桥', count: 101, error: 15 },
  { name: '朱家角', count: 134, error: 5 },
  { name: '徐泾', count: 190, error: 22 },
  { name: '赵巷', count: 230, error: 18 },
  { name: '华新', count: 210, error: 30 },
];

export const PERFORMANCE_RADAR_DATA = [
  { subject: '工单合规', A: 142, B: 110, fullMark: 150 },
  { subject: '响应速度', A: 98, B: 130, fullMark: 150 },
  { subject: '安全红线', A: 148, B: 130, fullMark: 150 },
  { subject: '录入质量', A: 110, B: 120, fullMark: 150 },
  { subject: '创新贡献', A: 125, B: 90, fullMark: 150 },
];

export const PERFORMANCE_RANK_DATA = [
  { name: '运检一班', score: 98 },
  { name: '抢修中心二组', score: 96 },
  { name: '自动化监控班', score: 94 },
  { name: '赵巷运检班', score: 91 },
  { name: '盈浦抢修组', score: 88 },
  { name: '巡视二组', score: 85 },
];

// Fix: Export REGION_STATIONS for Dashboard heatmap visualization
export const REGION_STATIONS = [
  { id: 'S1', x: 45, y: 45, town: '夏阳镇', name: '夏阳供电所', count: 124, risk: 2, status: 'normal' },
  { id: 'S2', x: 35, y: 55, town: '盈浦镇', name: '盈浦供电所', count: 98, risk: 0, status: 'normal' },
  { id: 'S3', x: 55, y: 35, town: '香花桥镇', name: '香花桥供电所', count: 156, risk: 5, status: 'warning' },
  { id: 'S4', x: 25, y: 70, town: '朱家角镇', name: '朱家角供电所', count: 112, risk: 1, status: 'normal' },
  { id: 'S5', x: 85, y: 45, town: '徐泾镇', name: '徐泾供电所', count: 245, risk: 12, status: 'danger' },
  { id: 'S6', x: 70, y: 55, town: '赵巷镇', name: '赵巷供电所', count: 189, risk: 4, status: 'warning' },
  { id: 'S7', x: 65, y: 20, town: '华新镇', name: '华新供电所', count: 167, risk: 8, status: 'danger' },
  { id: 'S8', x: 30, y: 30, town: '重固镇', name: '重固分局', count: 76, risk: 1, status: 'normal' },
  { id: 'S9', x: 20, y: 85, town: '练塘镇', name: '练塘供电所', count: 88, risk: 0, status: 'normal' },
  { id: 'S10', x: 45, y: 80, town: '金泽镇', name: '金泽供电所', count: 65, risk: 2, status: 'normal' },
];
