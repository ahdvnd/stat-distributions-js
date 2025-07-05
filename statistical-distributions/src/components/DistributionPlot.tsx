import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { DistributionParametrization } from '../types/distributions';
import { seq } from '../utils/statistics';

interface DistributionPlotProps {
  parametrization: DistributionParametrization;
  parameterValues: number[];
  plotType: 'pdf' | 'cdf';
}

const DistributionPlot: React.FC<DistributionPlotProps> = ({
  parametrization,
  parameterValues,
  plotType,
}) => {
  const plotData = useMemo(() => {
    if (parameterValues.length === 0) return null;

    // Get plot limits
    const limits = parametrization.interactLimits(...parameterValues);
    
    // Check if this is a discrete distribution by looking at the first parameter
    const isDiscrete = parametrization.params[0]?.type === 'discrete';
    
    if (isDiscrete) {
      // For discrete distributions, use integer values
      const xValues: number[] = [];
      const yValues: number[] = [];
      
      for (let x = Math.floor(limits[0]); x <= Math.ceil(limits[1]); x++) {
        try {
          const func = plotType === 'pdf' ? parametrization.density : parametrization.cdf;
          const y = func(x, ...parameterValues);
          if (y > 0 || plotType === 'cdf') {
            xValues.push(x);
            yValues.push(y);
          }
        } catch (error) {
          // Skip invalid values
        }
      }

      return {
        x: xValues,
        y: yValues,
        type: 'bar' as const,
        name: plotType.toUpperCase(),
        marker: { color: '#3B82F6' },
      };
    } else {
      // For continuous distributions, use line plot
      const xValues = seq(limits[0], limits[1], 200);
      const yValues = xValues.map(x => {
        try {
          const func = plotType === 'pdf' ? parametrization.density : parametrization.cdf;
          return func(x, ...parameterValues);
        } catch (error) {
          return 0;
        }
      });

      return {
        x: xValues,
        y: yValues,
        type: 'scatter' as const,
        mode: 'lines' as const,
        line: { color: '#3B82F6', width: 2 },
        name: plotType.toUpperCase(),
      };
    }
  }, [parametrization, parameterValues, plotType]);

  if (!plotData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading plot...</p>
      </div>
    );
  }

  const isDiscrete = parametrization.params[0]?.type === 'discrete';

  return (
    <Plot
      data={[plotData]}
      layout={{
        width: 600,
        height: 400,
        title: {
          text: `${plotType.toUpperCase()} - ${parametrization.name}`,
          font: { size: 16 },
        },
        xaxis: {
          title: { text: 'x' },
          gridcolor: '#E5E7EB',
        },
        yaxis: {
          title: { text: plotType === 'pdf' ? 'Density' : 'Cumulative Probability' },
          gridcolor: '#E5E7EB',
          range: plotType === 'cdf' ? [0, 1] : undefined,
        },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
        font: { family: 'Inter, sans-serif' },
        margin: { l: 60, r: 40, t: 60, b: 60 },
        bargap: isDiscrete ? 0.1 : undefined,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
    />
  );
};

export default DistributionPlot; 