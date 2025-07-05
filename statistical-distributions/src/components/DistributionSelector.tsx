import React from 'react';
import { Distribution } from '../types/distributions';

interface DistributionSelectorProps {
  distributions: Distribution[];
  selectedDistribution: Distribution | null;
  onDistributionChange: (distribution: Distribution) => void;
}

const DistributionSelector: React.FC<DistributionSelectorProps> = ({
  distributions,
  selectedDistribution,
  onDistributionChange,
}) => {
  return (
    <div className="space-y-2">
      {distributions.map((distribution) => (
        <button
          key={distribution.name}
          onClick={() => onDistributionChange(distribution)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedDistribution?.name === distribution.name
              ? 'bg-blue-100 text-blue-800 border-blue-300'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          } border`}
        >
          <div className="font-medium">{distribution.label}</div>
          <div className="text-sm text-gray-500">
            {distribution.parametrizations.length} parametrization{distribution.parametrizations.length > 1 ? 's' : ''}
          </div>
        </button>
      ))}
    </div>
  );
};

export default DistributionSelector; 