import React from 'react';
import { InlineMath } from 'react-katex';
import { DistributionParameter } from '../types/distributions';
import { round } from '../utils/statistics';
import 'katex/dist/katex.min.css';

interface ParameterControlsProps {
  parameters: DistributionParameter[];
  values: number[];
  onChange: (index: number, value: number) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  parameters,
  values,
  onChange,
}) => {
  const handleSliderChange = (index: number, rawValue: number) => {
    const param = parameters[index];
    const [min, max] = param.interactRange;
    
    let value: number;
    if (param.interactLog) {
      // Logarithmic scale
      const logMin = Math.log(min);
      const logMax = Math.log(max);
      const logValue = logMin + (rawValue / 100) * (logMax - logMin);
      value = Math.exp(logValue);
    } else {
      // Linear scale
      value = min + (rawValue / 100) * (max - min);
    }
    
    onChange(index, value);
  };

  const getSliderValue = (index: number): number => {
    const param = parameters[index];
    const value = values[index];
    const [min, max] = param.interactRange;
    
    if (param.interactLog) {
      const logMin = Math.log(min);
      const logMax = Math.log(max);
      const logValue = Math.log(value);
      return ((logValue - logMin) / (logMax - logMin)) * 100;
    } else {
      return ((value - min) / (max - min)) * 100;
    }
  };

  return (
    <div className="space-y-6">
      {parameters.map((param, index) => (
        <div key={param.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              <InlineMath math={param.label} />
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {round(values[index] || param.interactStart, 3)}
            </span>
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={getSliderValue(index)}
            onChange={(e) => handleSliderChange(index, parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${getSliderValue(index)}%, #E5E7EB ${getSliderValue(index)}%, #E5E7EB 100%)`
            }}
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>{round(param.interactRange[0], 2)}</span>
            <span>{round(param.interactRange[1], 2)}</span>
          </div>
          
          {param.note && (
            <p className="text-xs text-gray-500 italic">{param.note}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ParameterControls; 