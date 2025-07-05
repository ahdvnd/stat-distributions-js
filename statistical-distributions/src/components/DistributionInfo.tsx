import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Distribution, DistributionParametrization } from '../types/distributions';
import { round } from '../utils/statistics';
import 'katex/dist/katex.min.css';

interface DistributionInfoProps {
  distribution: Distribution;
  parametrization: DistributionParametrization;
  parameterValues: number[];
}

const DistributionInfo: React.FC<DistributionInfoProps> = ({
  distribution,
  parametrization,
  parameterValues,
}) => {
  const calculateQuantities = () => {
    if (parameterValues.length === 0) return {};
    
    const quantities: { [key: string]: number } = {};
    
    for (const [name, quantity] of Object.entries(parametrization.quantities)) {
      try {
        quantities[name] = quantity.fun(...parameterValues);
      } catch (error) {
        quantities[name] = NaN;
      }
    }
    
    return quantities;
  };

  const quantities = calculateQuantities();

  return (
    <div className="space-y-6">
      {/* Distribution Description */}
      {distribution.note && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            About {distribution.label}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {distribution.note}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Formula */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Probability Density Function
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <BlockMath math={parametrization.densityDisplay} />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Domain:</strong> <InlineMath math={parametrization.displayLimits} /></p>
            <p><strong>Type:</strong> {distribution.type}</p>
            {distribution.referenceurl && (
              <p>
                <strong>Reference:</strong>{' '}
                <a
                  href={distribution.referenceurl.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {distribution.referenceurl.name}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Distribution Properties */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribution Properties
          </h3>
          <div className="space-y-3">
            {Object.entries(quantities).map(([name, value]) => (
              <div key={name} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {name}:
                </span>
                <span className="text-sm text-gray-600 font-mono">
                  {isNaN(value) ? 'undefined' : round(value, 4)}
                </span>
              </div>
            ))}
          </div>
          
          {parameterValues.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Current Parameters
              </h4>
              <div className="space-y-2">
                {parametrization.params.map((param, index) => (
                  <div key={param.name} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      <InlineMath math={param.label} />:
                    </span>
                    <span className="text-sm text-gray-600 font-mono">
                      {round(parameterValues[index] || param.interactStart, 3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionInfo; 