/**
 * AutoMed Proposal Generator - 도메인 모델
 * Boris Cherny 관점: 컴파일 타임에 최대한 많은 오류 포착
 */

// ACT 타입 - 리터럴 타입으로 제한
export type ActNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type ActTitle = 
  | '상황'
  | '위기'
  | '전환점'
  | '해결책 1: 마케팅 전략'
  | '해결책 2: AI CRM'
  | '요약 및 Next Step';

export type ActSubtitle = 
  | 'Situation'
  | 'Crisis'
  | 'Turning Point'
  | 'Marketing Strategy'
  | 'AI CRM'
  | 'Summary & Next Step';

// 슬라이드 타입
export type SlideType = 
  | 'cover'        // 표지
  | 'toc'          // 목차
  | 'divider'      // ACT 간지
  | 'content'      // 일반 콘텐츠
  | 'chart'        // 차트/그래프
  | 'comparison'   // 비교
  | 'summary';     // 요약

// 차트 데이터 타입
export interface ChartDataPoint {
  readonly label: string;
  readonly value: number;
  readonly annotation?: string;
}

export interface LineChartData {
  readonly type: 'line';
  readonly data: readonly ChartDataPoint[];
  readonly yAxisLabel?: string;
}

export interface BarChartData {
  readonly type: 'bar';
  readonly data: readonly ChartDataPoint[];
  readonly yAxisLabel?: string;
}

export interface PieChartData {
  readonly type: 'pie';
  readonly data: readonly ChartDataPoint[];
}

export type ChartData = LineChartData | BarChartData | PieChartData;

// 슬라이드 콘텐츠 (판별 유니온)
export interface CoverSlide {
  readonly type: 'cover';
  readonly title: string;
  readonly subtitle?: string;
  readonly date: string;
  readonly company: string;
}

export interface TocSlide {
  readonly type: 'toc';
  readonly items: readonly {
    readonly act: ActNumber;
    readonly title: ActTitle;
    readonly startPage: number;
  }[];
}

export interface DividerSlide {
  readonly type: 'divider';
  readonly act: ActNumber;
  readonly title: ActTitle;
  readonly subtitle: ActSubtitle;
}

export interface ContentSlide {
  readonly type: 'content';
  readonly title: string;
  readonly content: string;
  readonly bullets?: readonly string[];
  readonly emphasis?: string;
  readonly tone?: 'positive' | 'negative' | 'neutral';
}

export interface ChartSlide {
  readonly type: 'chart';
  readonly title: string;
  readonly chart: ChartData;
  readonly highlight?: string;
  readonly description?: string;
}

export interface ComparisonSlide {
  readonly type: 'comparison';
  readonly title: string;
  readonly before: {
    readonly label: string;
    readonly items: readonly string[];
  };
  readonly after: {
    readonly label: string;
    readonly items: readonly string[];
  };
}

export interface SummarySlide {
  readonly type: 'summary';
  readonly title: string;
  readonly keyPoints: readonly string[];
  readonly nextSteps?: readonly string[];
}

export type SlideContent = 
  | CoverSlide 
  | TocSlide 
  | DividerSlide 
  | ContentSlide 
  | ChartSlide 
  | ComparisonSlide 
  | SummarySlide;

// 슬라이드 엔티티
export interface Slide {
  readonly id: string;
  readonly pageNumber: number;
  readonly act: ActNumber;
  readonly content: SlideContent;
}

// ACT 엔티티
export interface Act {
  readonly number: ActNumber;
  readonly title: ActTitle;
  readonly subtitle: ActSubtitle;
  readonly purpose: string;
  readonly slides: readonly Slide[];
}

// 제안서 루트 엔티티
export interface Proposal {
  readonly id: string;
  readonly clientName: string;
  readonly createdAt: string;
  readonly acts: readonly Act[];
  readonly totalPages: number;
}

// 네비게이션 상태
export interface NavigationState {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly currentAct: ActNumber;
}

// 타입 가드
export function isCoverSlide(slide: SlideContent): slide is CoverSlide {
  return slide.type === 'cover';
}

export function isChartSlide(slide: SlideContent): slide is ChartSlide {
  return slide.type === 'chart';
}

export function isDividerSlide(slide: SlideContent): slide is DividerSlide {
  return slide.type === 'divider';
}
