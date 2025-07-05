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

  const getFunFacts = (distributionName: string): string[] => {
    const funFacts: { [key: string]: string[] } = {
      normal: [
        "The normal distribution is also called the 'bell curve' due to its characteristic shape",
        "About 68% of data falls within one standard deviation of the mean",
        "About 95% of data falls within two standard deviations of the mean",
        "About 99.7% of data falls within three standard deviations of the mean",
        "The central limit theorem makes it the most important distribution in statistics",
        "It was first described by Abraham de Moivre in 1733"
      ],
      gamma: [
        "The gamma distribution generalizes the exponential distribution",
        "It's commonly used to model waiting times and life spans",
        "The gamma function Γ(x) is a generalization of the factorial function",
        "When the shape parameter equals 1, it becomes the exponential distribution",
        "It's conjugate to many other distributions in Bayesian statistics",
        "The chi-squared distribution is a special case of the gamma distribution"
      ],
      studentt: [
        "Named after William Sealy Gosset, who published under the pseudonym 'Student'",
        "Has heavier tails than the normal distribution",
        "As degrees of freedom increase, it approaches the normal distribution",
        "Used when the population standard deviation is unknown",
        "The t-test is based on this distribution",
        "It's more conservative than the normal distribution for small samples"
      ],
      chisquare: [
        "The sum of squared standard normal random variables follows this distribution",
        "Used extensively in hypothesis testing and confidence intervals",
        "The chi-squared test is one of the most common statistical tests",
        "Degrees of freedom determine the shape of the distribution",
        "It's always positive and right-skewed",
        "Used in analysis of variance (ANOVA) and regression analysis"
      ],
      beta: [
        "Defined only on the interval [0,1], making it perfect for modeling probabilities",
        "Conjugate to the binomial distribution in Bayesian statistics",
        "Can take many shapes: uniform, U-shaped, bell-shaped, or skewed",
        "The beta function B(a,b) is related to the gamma function",
        "Used to model uncertainty about probabilities",
        "The uniform distribution is a special case when a=b=1"
      ],
      lognormal: [
        "If X is log-normally distributed, then ln(X) is normally distributed",
        "Always positive, making it great for modeling variables that can't be negative",
        "Commonly used to model income, stock prices, and particle sizes",
        "Has a long right tail, making it useful for modeling skewed data",
        "The median is e^μ, while the mean is e^(μ+σ²/2)",
        "Multiplicative rather than additive in nature"
      ],
      weibull: [
        "Named after Swedish mathematician Waloddi Weibull",
        "Extremely flexible - can approximate many other distributions",
        "Widely used in reliability engineering and survival analysis",
        "Can model increasing, decreasing, or constant failure rates",
        "The exponential distribution is a special case",
        "Used to model wind speeds, particle sizes, and component lifetimes"
      ],
      binomial: [
        "Describes the number of successes in n independent Bernoulli trials",
        "The sum of n independent Bernoulli random variables",
        "Used in quality control, survey sampling, and genetics",
        "When n=1, it becomes the Bernoulli distribution",
        "As n increases, it approaches the normal distribution",
        "The probability of success p must be between 0 and 1"
      ],
      poisson: [
        "Named after French mathematician Siméon Denis Poisson",
        "Models rare events occurring at a constant rate",
        "Used to model radioactive decay, traffic accidents, and system failures",
        "The mean equals the variance for this distribution",
        "Can be derived as a limit of the binomial distribution",
        "The Poisson process is fundamental in queueing theory"
      ],
      negativebinomial: [
        "Describes the number of failures before r successes occur",
        "More flexible than the Poisson distribution for overdispersed data",
        "Used in ecology, epidemiology, and insurance",
        "When r=1, it becomes the geometric distribution",
        "The variance is always greater than the mean",
        "Can model count data with high variability"
      ]
    };
    
    return funFacts[distributionName] || [
      "This distribution is widely used in statistical analysis",
      "It has important applications in various fields of study",
      "Understanding its properties helps in data modeling"
    ];
  };

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

      {/* Fun Facts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Facts About {distribution.label}
        </h3>
        <ul className="space-y-2 text-gray-700">
          {getFunFacts(distribution.name).map((fact, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>

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