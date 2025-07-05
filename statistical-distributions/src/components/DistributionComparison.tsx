import React, { useState } from 'react';
import { Distribution } from '../types/distributions';
import DistributionViewer from './DistributionViewer';

interface DistributionComparisonProps {
  distributions: Distribution[];
}

const DistributionComparison: React.FC<DistributionComparisonProps> = ({
  distributions,
}) => {
  const [leftDistribution, setLeftDistribution] = useState<Distribution | null>(
    distributions[0] || null
  );
  const [rightDistribution, setRightDistribution] = useState<Distribution | null>(
    distributions[1] || null
  );
  const [leftParametrization, setLeftParametrization] = useState<number>(0);
  const [rightParametrization, setRightParametrization] = useState<number>(0);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl">
      {/* Left Distribution */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex-1 max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Distribution 1
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Distribution
          </label>
          <select
            value={leftDistribution?.name || ''}
            onChange={(e) => {
              const selected = distributions.find(d => d.name === e.target.value);
              setLeftDistribution(selected || null);
              setLeftParametrization(0);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a distribution...</option>
            {distributions.map((dist) => (
              <option key={dist.name} value={dist.name}>
                {dist.label}
              </option>
            ))}
          </select>
        </div>
        {leftDistribution ? (
          <DistributionViewer
            distribution={leftDistribution}
            parametrizationIndex={leftParametrization}
            onParametrizationChange={setLeftParametrization}
            compact={true}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Select a distribution</p>
          </div>
        )}
      </div>

      {/* Right Distribution */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex-1 max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Distribution 2
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Distribution
          </label>
          <select
            value={rightDistribution?.name || ''}
            onChange={(e) => {
              const selected = distributions.find(d => d.name === e.target.value);
              setRightDistribution(selected || null);
              setRightParametrization(0);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a distribution...</option>
            {distributions.map((dist) => (
              <option key={dist.name} value={dist.name}>
                {dist.label}
              </option>
            ))}
          </select>
        </div>
        {rightDistribution ? (
          <DistributionViewer
            distribution={rightDistribution}
            parametrizationIndex={rightParametrization}
            onParametrizationChange={setRightParametrization}
            compact={true}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Select a distribution</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default DistributionComparison; 