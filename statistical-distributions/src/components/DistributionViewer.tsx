import React, { useState, useEffect } from 'react';
import { Distribution } from '../types/distributions';
import DistributionPlot from './DistributionPlot';
import ParameterControls from './ParameterControls';
import ParametrizationSelector from './ParametrizationSelector';
import DistributionInfo from './DistributionInfo';

interface DistributionViewerProps {
  distribution: Distribution;
  parametrizationIndex: number;
  onParametrizationChange: (index: number) => void;
}

const DistributionViewer: React.FC<DistributionViewerProps> = ({
  distribution,
  parametrizationIndex,
  onParametrizationChange,
}) => {
  const [plotType, setPlotType] = useState<'pdf' | 'cdf'>('pdf');
  const [parameterValues, setParameterValues] = useState<number[]>([]);

  const currentParametrization = distribution.parametrizations[parametrizationIndex];

  // Initialize parameter values
  useEffect(() => {
    if (currentParametrization) {
      const initialValues = currentParametrization.params.map(param => param.interactStart);
      setParameterValues(initialValues);
    }
  }, [currentParametrization]);

  const handleParameterChange = (index: number, value: number) => {
    const newValues = [...parameterValues];
    newValues[index] = value;
    setParameterValues(newValues);
  };

  if (!currentParametrization) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">Invalid parametrization selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Distribution Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {distribution.label}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setPlotType('pdf')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                plotType === 'pdf'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              PDF
            </button>
            <button
              onClick={() => setPlotType('cdf')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                plotType === 'cdf'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              CDF
            </button>
          </div>
        </div>

        {/* Parametrization Selector */}
        {distribution.parametrizations.length > 1 && (
          <ParametrizationSelector
            parametrizations={distribution.parametrizations}
            selectedIndex={parametrizationIndex}
            onParametrizationChange={onParametrizationChange}
          />
        )}
      </div>

      {/* Plot and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plot */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <DistributionPlot
              parametrization={currentParametrization}
              parameterValues={parameterValues}
              plotType={plotType}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Parameters
            </h3>
            <ParameterControls
              parameters={currentParametrization.params}
              values={parameterValues}
              onChange={handleParameterChange}
            />
          </div>
        </div>
      </div>

      {/* Distribution Info */}
      <DistributionInfo
        distribution={distribution}
        parametrization={currentParametrization}
        parameterValues={parameterValues}
      />
    </div>
  );
};

export default DistributionViewer; 