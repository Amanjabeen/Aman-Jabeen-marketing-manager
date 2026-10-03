export interface CaseStudyMetric {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface CaseStudyDashboardData {
  title: string;
  platform: 'Google Ads' | 'Meta Ads' | 'YouTube Ads' | 'Web & Search';
  dateRange?: string;
  summaryMetrics: {
    name: string;
    value: string;
    change?: string;
    color?: string;
  }[];
  tableRows?: {
    keywordOrCampaign: string;
    type?: string;
    impressions?: string;
    clicks?: string;
    ctr?: string;
    avgCpc?: string;
    cost?: string;
    conversions?: string;
    costPerConv?: string;
  }[];
  caption?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client?: string;
  industry: string;
  market: string;
  platform: string;
  serviceType: string;
  summary: string;
  tags: string[];
  role: string;
  overview: string;
  challenge: string;
  objectives: string[];
  strategy: string[];
  executionPoints: string[];
  metrics?: CaseStudyMetric[];
  dashboardPreview?: CaseStudyDashboardData;
  achievements: string[];
  outcome: string;
  websiteUrl?: string;
  accentColor?: string;
  relatedIds?: string[];
}

export interface ServiceCapability {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceDetailData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
  icon: string;
  heroHeadline: string;
  heroSubhead: string;
  capabilitiesHeading: string;
  capabilitiesSubhead: string;
  capabilities: ServiceCapability[];
  processHeading: string;
  processSubhead: string;
  processSteps: ServiceProcessStep[];
  relevantCaseStudyIds: string[];
  faqs: { question: string; answer: string }[];
  testimonialId?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  relatedCaseStudyIds?: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  nameArabic?: string;
  country: string;
  countryFlag: string;
  role: string;
  quote: string;
  avatarText: string;
  rating: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}
