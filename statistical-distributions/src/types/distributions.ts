export interface DistributionParameter {
  name: string;
  label: string;
  range: [number, number];
  interactRange: [number, number];
  interactLog: boolean;
  interactStart: number;
  type: 'discrete' | 'continuous';
  conjugate: string | null;
  note: string;
}

export interface DistributionParametrization {
  name: string;
  params: DistributionParameter[];
  density: (x: number, ...args: number[]) => number;
  densityDisplay: string;
  cdf: (x: number, ...args: number[]) => number;
  limits: [number, number];
  interactLimits: (...args: number[]) => [number, number];
  displayLimits: string;
  checkPars: (...args: number[]) => boolean;
  conjugate: string | null;
  quantities: {
    [key: string]: {
      fun: (...args: number[]) => number;
      display: string;
    };
  };
  note: string | null;
}

export interface Distribution {
  name: string;
  label: string;
  type: 'discrete' | 'continuous';
  parametrizations: DistributionParametrization[];
  note: string | null;
  referenceurl: {
    name: string;
    link: string;
  };
}

export interface PlotData {
  x: number[];
  y: number[];
  type: 'scatter' | 'bar';
  mode?: 'lines' | 'markers' | 'lines+markers';
  name?: string;
  fill?: 'tozeroy' | 'tonexty' | 'none';
  fillcolor?: string;
} 