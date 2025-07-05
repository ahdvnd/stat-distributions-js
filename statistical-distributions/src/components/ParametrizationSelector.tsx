import React from 'react';
import { DistributionParametrization } from '../types/distributions';

interface ParametrizationSelectorProps {
  parametrizations: DistributionParametrization[];
  selectedIndex: number;
  onParametrizationChange: (index: number) => void;
}

const ParametrizationSelector: React.FC<ParametrizationSelectorProps> = ({
  parametrizations,
  selectedIndex,
  onParametrizationChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Parametrization
      </label>
      <select
        value={selectedIndex}
        onChange={(e) => onParametrizationChange(parseInt(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {parametrizations.map((param, index) => (
          <option key={index} value={index}>
            {param.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParametrizationSelector; 