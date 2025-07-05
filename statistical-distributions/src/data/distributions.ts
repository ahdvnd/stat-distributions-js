import { Distribution, DistributionParameter, DistributionParametrization } from '../types/distributions';
import { 
  Normal, 
  Gamma, 
  StudentT, 
  ChiSquared, 
  Beta, 
  LogNormal, 
  Weibull, 
  Binomial, 
  Poisson, 
  NegativeBinomial 
} from '../utils/statistics';

// Helper function to create parameters
function createParameter(
  name: string,
  label: string,
  range: [number, number],
  interactRange: [number, number],
  interactLog: boolean,
  interactStart: number,
  type: 'discrete' | 'continuous',
  conjugate: string | null,
  note: string
): DistributionParameter {
  return {
    name,
    label,
    range,
    interactRange,
    interactLog,
    interactStart,
    type,
    conjugate,
    note
  };
}

// Normal distribution parameters
const normalMean = createParameter(
  'mu',
  '\\mu',
  [-Infinity, Infinity],
  [-5, 5],
  false,
  0,
  'continuous',
  'normal',
  'location'
);

const normalStandardDeviation = createParameter(
  'sigma',
  '\\sigma',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'standard deviation'
);

const normalVariance = createParameter(
  'sigma2',
  '\\sigma^2',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  'inversegamma',
  'variance'
);

// Gamma distribution parameters
const gammaShape = createParameter(
  'k',
  'k',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'shape'
);

const gammaScale = createParameter(
  's',
  's',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  'inversegamma',
  'scale'
);

// Student's t distribution parameters
const tDegreesOfFreedom = createParameter(
  'nu',
  '\\nu',
  [0, Infinity],
  [1, 50],
  false,
  5,
  'discrete',
  null,
  'degrees of freedom'
);

const tLocation = createParameter(
  'mu',
  '\\mu',
  [-Infinity, Infinity],
  [-8, 8],
  false,
  0,
  'continuous',
  null,
  'location'
);

const tScale = createParameter(
  'sigma',
  '\\sigma',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'scale'
);

// Chi-squared distribution parameters
const chiSquaredDf = createParameter(
  'nu',
  '\\nu',
  [0, Infinity],
  [1, 10],
  false,
  3,
  'discrete',
  null,
  'degrees of freedom'
);

const chiSquaredScaleParam = createParameter(
  'sigma',
  '\\sigma',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'scale'
);

// Beta distribution parameters
const betaA = createParameter(
  'a',
  'a',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'shape'
);

const betaB = createParameter(
  'b',
  'b',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'shape'
);

// Log-normal distribution parameters
const logNormalMean = createParameter(
  'mu',
  '\\mu',
  [-Infinity, Infinity],
  [-2, 2],
  false,
  1,
  'continuous',
  'normal',
  'log-scale'
);

const logNormalVariance = createParameter(
  'sigma2',
  '\\sigma^2',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  'inversegamma',
  'shape'
);

// Weibull distribution parameters
const weibullShift = createParameter(
  'x0',
  'x_0',
  [-Infinity, Infinity],
  [-3, 5],
  false,
  0,
  'continuous',
  null,
  'shift'
);

const weibullShape = createParameter(
  'k',
  'k',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'shape'
);

const weibullScale = createParameter(
  's',
  's',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  'inversegamma',
  'scale'
);

// Binomial distribution parameters
const binomialN = createParameter(
  'N',
  'N',
  [0, Infinity],
  [1, 100],
  false,
  20,
  'discrete',
  null,
  'sample size'
);

const binomialP = createParameter(
  'p',
  'p',
  [0, 1],
  [0, 1],
  false,
  0.5,
  'continuous',
  'beta',
  'probability of success'
);

// Poisson distribution parameters
const poissonLambda = createParameter(
  'lambda',
  '\\lambda',
  [0, Infinity],
  [0.1, 10],
  true,
  1,
  'continuous',
  null,
  'rate'
);

// Negative Binomial distribution parameters
const negBinomialR = createParameter(
  'r',
  'r',
  [0, Infinity],
  [1, 50],
  false,
  20,
  'discrete',
  null,
  'number of successes required'
);

const negBinomialP = createParameter(
  'p',
  'p',
  [0, 1],
  [0, 1],
  false,
  0.2,
  'continuous',
  'beta',
  'probability of failure'
);

// Normal distribution parametrizations
const normalMeanStandardDeviation: DistributionParametrization = {
  name: 'mean/standard deviation',
  params: [normalMean, normalStandardDeviation],
  density: (x: number, mu: number, sigma: number) => Normal.pdf(x, mu, sigma),
  densityDisplay: '\\left(2\\pi\\sigma^2\\right)^{-\\frac{1}{2}}\\exp\\left\\{-\\frac{1}{2\\sigma^2}\\left(x-\\mu\\right)^2\\right\\}',
  cdf: (x: number, mu: number, sigma: number) => Normal.cdf(x, mu, sigma),
  limits: [-Infinity, Infinity],
  interactLimits: (mu: number, sigma: number) => [mu - 4 * sigma, mu + 4 * sigma],
  displayLimits: '(-\\infty,\\infty)',
  checkPars: (mu: number, sigma: number) => sigma > 0,
  conjugate: null,
  quantities: {
    mean: {
      fun: (mu: number, sigma: number) => Normal.mean(mu, sigma),
      display: '\\mu'
    },
    variance: {
      fun: (mu: number, sigma: number) => Normal.variance(mu, sigma),
      display: '\\sigma^2'
    },
    median: {
      fun: (mu: number, sigma: number) => Normal.median(mu, sigma),
      display: '\\mu'
    },
    mode: {
      fun: (mu: number, sigma: number) => Normal.mode(mu, sigma),
      display: '\\mu'
    }
  },
  note: null
};

const normalMeanVariance: DistributionParametrization = {
  name: 'mean/variance',
  params: [normalMean, normalVariance],
  density: (x: number, mu: number, sigma2: number) => Normal.pdf(x, mu, Math.sqrt(sigma2)),
  densityDisplay: '\\left(2\\pi\\sigma^2\\right)^{-\\frac{1}{2}}\\exp\\left\\{-\\frac{1}{2\\sigma^2}\\left(x-\\mu\\right)^2\\right\\}',
  cdf: (x: number, mu: number, sigma2: number) => Normal.cdf(x, mu, Math.sqrt(sigma2)),
  limits: [-Infinity, Infinity],
  interactLimits: (mu: number, sigma2: number) => [mu - 4 * Math.sqrt(sigma2), mu + 4 * Math.sqrt(sigma2)],
  displayLimits: '(-\\infty,\\infty)',
  checkPars: (mu: number, sigma2: number) => sigma2 > 0,
  conjugate: 'normalinversegamma',
  quantities: {
    mean: {
      fun: (mu: number, sigma2: number) => Normal.mean(mu, Math.sqrt(sigma2)),
      display: '\\mu'
    },
    variance: {
      fun: (mu: number, sigma2: number) => Normal.variance(mu, Math.sqrt(sigma2)),
      display: '\\sigma^2'
    },
    median: {
      fun: (mu: number, sigma2: number) => Normal.median(mu, Math.sqrt(sigma2)),
      display: '\\mu'
    },
    mode: {
      fun: (mu: number, sigma2: number) => Normal.mode(mu, Math.sqrt(sigma2)),
      display: '\\mu'
    }
  },
  note: null
};

// Gamma distribution parametrization
const gammaShapeScale: DistributionParametrization = {
  name: 'shape/scale',
  params: [gammaShape, gammaScale],
  density: (x: number, k: number, s: number) => Gamma.pdf(x, k, s),
  densityDisplay: '\\frac{1}{\\Gamma(k)s^{k}} x^{k - 1} \\exp\\left\\{-\\frac{x}{s}\\right\\}',
  cdf: (x: number, k: number, s: number) => Gamma.cdf(x, k, s),
  limits: [0, Infinity],
  interactLimits: (k: number, s: number) => [0.01, k * s + 4 * Math.sqrt(k * s * s)],
  displayLimits: '(0,\\infty)',
  checkPars: (k: number, s: number) => k > 0 && s > 0,
  conjugate: null,
  quantities: {
    mean: {
      fun: (k: number, s: number) => Gamma.mean(k, s),
      display: 'ks'
    },
    variance: {
      fun: (k: number, s: number) => Gamma.variance(k, s),
      display: 'ks^2'
    },
    mode: {
      fun: (k: number, s: number) => Gamma.mode(k, s),
      display: '(k-1)s, k\\geq 1'
    }
  },
  note: null
};

// Student's t distribution parametrization
const studentTLocationScale: DistributionParametrization = {
  name: 'location/scale',
  params: [tDegreesOfFreedom, tLocation, tScale],
  density: (x: number, nu: number, mu: number, sigma: number) => StudentT.pdf(x, nu, mu, sigma),
  densityDisplay: '\\frac{\\Gamma\\left(\\frac{\\nu+1}{2}\\right)}{\\sqrt{\\pi\\nu\\sigma^2}\\Gamma\\left(\\frac{\\nu}{2}\\right)}\\left(1+\\frac{(x-\\mu)^2}{\\nu\\sigma^2}\\right)^{-\\frac{\\nu+1}{2}}',
  cdf: (x: number, nu: number, mu: number, sigma: number) => StudentT.cdf(x, nu, mu, sigma),
  limits: [-Infinity, Infinity],
  interactLimits: (nu: number, mu: number, sigma: number) => [mu - 10, mu + 10],
  displayLimits: '(-\\infty,\\infty)',
  checkPars: (nu: number, mu: number, sigma: number) => sigma > 0 && nu > 0,
  conjugate: null,
  quantities: {
    mean: {
      fun: (nu: number, mu: number, sigma: number) => StudentT.mean(nu, mu, sigma) || 0,
      display: '\\mu, \\nu>1'
    },
    variance: {
      fun: (nu: number, mu: number, sigma: number) => StudentT.variance(nu, mu, sigma) || 0,
      display: '\\frac{\\nu}{\\nu-2}\\sigma^2, \\nu>2'
    },
    median: {
      fun: (nu: number, mu: number, sigma: number) => StudentT.median(nu, mu, sigma),
      display: '\\mu'
    },
    mode: {
      fun: (nu: number, mu: number, sigma: number) => StudentT.mode(nu, mu, sigma),
      display: '\\mu'
    }
  },
  note: null
};

// Chi-squared distribution parametrization
const chiSquaredScale: DistributionParametrization = {
  name: 'scaled',
  params: [chiSquaredDf, chiSquaredScaleParam],
  density: (x: number, nu: number, sigma: number) => ChiSquared.pdf(x, nu, sigma),
  densityDisplay: '\\frac{1}{(2\\sigma)^\\frac{\\nu}{2}\\Gamma\\left(\\frac{\\nu}{2}\\right)}x^{\\frac{\\nu}{2}-1}\\exp\\left\\{-\\frac{x}{2\\sigma}\\right\\}',
  cdf: (x: number, nu: number, sigma: number) => ChiSquared.cdf(x, nu, sigma),
  limits: [0, Infinity],
  interactLimits: (nu: number, sigma: number) => [0, 40],
  displayLimits: '[0,\\infty)',
  checkPars: (nu: number, sigma: number) => sigma > 0 && nu > 0,
  conjugate: null,
  quantities: {
    mean: {
      fun: (nu: number, sigma: number) => ChiSquared.mean(nu, sigma),
      display: '\\sigma\\nu'
    },
    variance: {
      fun: (nu: number, sigma: number) => ChiSquared.variance(nu, sigma),
      display: '2\\nu\\sigma^2'
    }
  },
  note: null
};

// Beta distribution parametrization
const betaAB: DistributionParametrization = {
  name: 'a/b',
  params: [betaA, betaB],
  density: (x: number, a: number, b: number) => Beta.pdf(x, a, b),
  densityDisplay: '\\frac{1}{B(a,b)} x^{a-1} (1-x)^{b-1}',
  cdf: (x: number, a: number, b: number) => Beta.cdf(x, a, b),
  limits: [0, 1],
  interactLimits: (a: number, b: number) => [0, 1],
  displayLimits: '(0,1)',
  checkPars: (a: number, b: number) => a > 0 && b > 0,
  conjugate: null,
  quantities: {
    mean: {
      fun: (a: number, b: number) => Beta.mean(a, b),
      display: '\\frac{a}{a+b}'
    },
    variance: {
      fun: (a: number, b: number) => Beta.variance(a, b),
      display: '\\frac{ab}{(a+b)^2(a+b+1)}'
    },
    median: {
      fun: (a: number, b: number) => Beta.median(a, b),
      display: 'no closed form'
    },
    mode: {
      fun: (a: number, b: number) => Beta.mode(a, b) || 0,
      display: '\\frac{a-1}{a+b-2}, a>1, b>1'
    }
  },
  note: null
};

// Log-normal distribution parametrization
const logNormalMeanVariance: DistributionParametrization = {
  name: 'mu/sigma2',
  params: [logNormalMean, logNormalVariance],
  density: (x: number, mu: number, sigma2: number) => LogNormal.pdf(x, mu, Math.sqrt(sigma2)),
  densityDisplay: '\\left(\\pi\\sigma^2x^2\\right)^{-\\frac{1}{2}}\\exp\\left\\{-\\frac{1}{2\\sigma^2}\\left(\\log(x)-\\mu\\right)^2\\right\\}',
  cdf: (x: number, mu: number, sigma2: number) => LogNormal.cdf(x, mu, Math.sqrt(sigma2)),
  limits: [0, Infinity],
  interactLimits: (mu: number, sigma2: number) => [0, 15],
  displayLimits: '(0,\\infty)',
  checkPars: (mu: number, sigma2: number) => sigma2 > 0,
  conjugate: 'normalinversegamma',
  quantities: {
    mean: {
      fun: (mu: number, sigma2: number) => LogNormal.mean(mu, Math.sqrt(sigma2)),
      display: '\\exp\\left\\{\\mu + \\frac{\\sigma^2}{2}\\right\\}'
    },
    variance: {
      fun: (mu: number, sigma2: number) => LogNormal.variance(mu, Math.sqrt(sigma2)),
      display: '\\left(e^{\\sigma^2}-1\\right)\\exp\\left\\{2\\mu + \\sigma^2\\right\\}'
    },
    median: {
      fun: (mu: number, sigma2: number) => LogNormal.median(mu, Math.sqrt(sigma2)),
      display: 'e^\\mu'
    },
    mode: {
      fun: (mu: number, sigma2: number) => LogNormal.mode(mu, Math.sqrt(sigma2)),
      display: '\\exp\\left\\{\\mu-\\sigma^2\\right\\}'
    }
  },
  note: null
};

// Weibull distribution parametrizations
const weibullShiftShapeScale: DistributionParametrization = {
  name: 'shift/scale/shape',
  params: [weibullShift, weibullScale, weibullShape],
  density: (x: number, x0: number, s: number, k: number) => Weibull.pdf(x, x0, s, k),
  densityDisplay: '\\frac{k}{s}\\left(\\frac{x-x_0}{s}\\right)^{k-1} \\exp\\left\\{-\\left(\\frac{x-x_0}{s}\\right)^k\\right\\}',
  cdf: (x: number, x0: number, s: number, k: number) => Weibull.cdf(x, x0, s, k),
  limits: [0, Infinity],
  interactLimits: (x0: number, s: number, k: number) => [x0, x0 + 10],
  displayLimits: '(x_0,\\infty)',
  checkPars: (x0: number, s: number, k: number) => s > 0 && k > 0,
  conjugate: null,
  quantities: {
    mean: {
      fun: (x0: number, s: number, k: number) => Weibull.mean(x0, s, k),
      display: 'x_0 + s\\Gamma\\left(1+\\frac{1}{k}\\right)'
    },
    variance: {
      fun: (x0: number, s: number, k: number) => Weibull.variance(x0, s, k),
      display: 's^2\\Gamma\\left(1+\\frac{2}{k}\\right) - \\left(x_0 + s\\Gamma\\left(1+\\frac{1}{k}\\right)\\right)^2'
    },
    mode: {
      fun: (x0: number, s: number, k: number) => Weibull.mode(x0, s, k),
      display: 's\\left(\\frac{k-1}{k}\\right)^{\\frac{1}{k}}, k > 1'
    },
    median: {
      fun: (x0: number, s: number, k: number) => Weibull.median(x0, s, k),
      display: 's\\left(\\log(2)\\right)^{\\frac{1}{k}}'
    }
  },
  note: null
};

// Binomial distribution parametrization
const binomialNp: DistributionParametrization = {
  name: 'probability',
  params: [binomialN, binomialP],
  density: (x: number, N: number, p: number) => Binomial.pdf(x, N, p),
  densityDisplay: '\\binom{N}{x} p^x (1-p)^{N-x}',
  cdf: (x: number, N: number, p: number) => Binomial.cdf(x, N, p),
  limits: [0, Infinity],
  interactLimits: (N: number, p: number) => [0, N],
  displayLimits: '[0,N]',
  checkPars: (N: number, p: number) => N > 0 && Math.floor(N) === N && p < 1 && p > 0,
  conjugate: 'beta',
  quantities: {
    mean: {
      fun: (N: number, p: number) => Binomial.mean(N, p),
      display: 'Np'
    },
    variance: {
      fun: (N: number, p: number) => Binomial.variance(N, p),
      display: 'Np(1-p)'
    }
  },
  note: null
};

// Poisson distribution parametrization
const poissonRate: DistributionParametrization = {
  name: 'rate',
  params: [poissonLambda],
  density: (x: number, lambda: number) => Poisson.pdf(x, lambda),
  densityDisplay: '\\frac{\\lambda^x}{x!} \\exp\\left\\{-\\lambda\\right\\}',
  cdf: (x: number, lambda: number) => Poisson.cdf(x, lambda),
  limits: [0, Infinity],
  interactLimits: (lambda: number) => [0, 25],
  displayLimits: '[0,\\infty)',
  checkPars: (lambda: number) => lambda > 0,
  conjugate: 'gamma',
  quantities: {
    mean: {
      fun: (lambda: number) => Poisson.mean(lambda),
      display: '\\lambda'
    },
    variance: {
      fun: (lambda: number) => Poisson.variance(lambda),
      display: '\\lambda'
    }
  },
  note: null
};

// Negative Binomial distribution parametrization
const negBinomialRp: DistributionParametrization = {
  name: 'probability',
  params: [negBinomialR, negBinomialP],
  density: (x: number, r: number, p: number) => NegativeBinomial.pdf(x, r, p),
  densityDisplay: '\\binom{x+r-1}{x} p^x (1-p)^{r}',
  cdf: (x: number, r: number, p: number) => NegativeBinomial.cdf(x, r, p),
  limits: [0, Infinity],
  interactLimits: (r: number, p: number) => [0, 50],
  displayLimits: '[0,\\infty)',
  checkPars: (r: number, p: number) => r > 0 && Math.floor(r) === r && p < 1 && p > 0,
  conjugate: 'beta',
  quantities: {
    mean: {
      fun: (r: number, p: number) => NegativeBinomial.mean(r, p),
      display: '\\frac{rp}{1-p}'
    },
    variance: {
      fun: (r: number, p: number) => NegativeBinomial.variance(r, p),
      display: '\\frac{rp}{(1-p)^2}'
    }
  },
  note: null
};

// Distribution definitions
export const distributions: { [key: string]: Distribution } = {
  normal: {
    name: 'normal',
    label: 'Normal/Gaussian',
    type: 'continuous',
    parametrizations: [normalMeanStandardDeviation, normalMeanVariance],
    note: 'The normal distribution is the most important probability distribution in statistics, describing many natural phenomena. It is symmetric, bell-shaped, and characterized by its mean and standard deviation. The central limit theorem states that the sum of many independent random variables tends toward a normal distribution, making it fundamental in statistical inference.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Normal_distribution'
    }
  },
  gamma: {
    name: 'gamma',
    label: 'Gamma',
    type: 'continuous',
    parametrizations: [gammaShapeScale],
    note: 'The gamma distribution is a two-parameter family of continuous probability distributions. It is commonly used to model waiting times, life spans, and other positive random variables. The distribution is skewed and becomes more symmetric as the shape parameter increases. It generalizes the exponential distribution and is conjugate to many other distributions.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Gamma_distribution'
    }
  },
  studentt: {
    name: 'studentt',
    label: "Student's t",
    type: 'continuous',
    parametrizations: [studentTLocationScale],
    note: "Student's t-distribution is used when estimating the mean of a normally distributed population when the sample size is small and the population standard deviation is unknown. It has heavier tails than the normal distribution, providing more conservative estimates. As degrees of freedom increase, it approaches the normal distribution.",
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Student%27s_t-distribution'
    }
  },
  chisquare: {
    name: 'chisquare',
    label: 'Chi-squared',
    type: 'continuous',
    parametrizations: [chiSquaredScale],
    note: 'The chi-squared distribution is widely used in statistical inference, particularly in hypothesis testing and confidence interval construction. It describes the distribution of the sum of squared standard normal random variables. It is fundamental in chi-squared tests, analysis of variance, and other statistical procedures.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Chi-squared_distribution'
    }
  },
  beta: {
    name: 'beta',
    label: 'Beta',
    type: 'continuous',
    parametrizations: [betaAB],
    note: 'The beta distribution is defined on the interval [0,1] and is often used to model probabilities and proportions. It is conjugate to the binomial distribution and is commonly used in Bayesian statistics. The distribution can take many shapes depending on its parameters, from uniform to U-shaped to bell-shaped.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Beta_distribution'
    }
  },
  lognormal: {
    name: 'lognormal',
    label: 'Log-normal',
    type: 'continuous',
    parametrizations: [logNormalMeanVariance],
    note: 'The log-normal distribution describes variables whose logarithm is normally distributed. It is commonly used to model variables that are always positive and have long right tails, such as income, stock prices, and particle sizes. The distribution is skewed and multiplicative rather than additive.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Log-normal_distribution'
    }
  },
  weibull: {
    name: 'weibull',
    label: 'three-parameter Weibull',
    type: 'continuous',
    parametrizations: [weibullShiftShapeScale],
    note: 'The Weibull distribution is widely used in reliability engineering and survival analysis. It can model various failure rates and is flexible enough to approximate many other distributions. The three-parameter version includes a location parameter, making it suitable for modeling data that cannot start at zero.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Weibull_distribution'
    }
  },
  binomial: {
    name: 'binomial',
    label: 'Binomial',
    type: 'discrete',
    parametrizations: [binomialNp],
    note: 'The binomial distribution describes the number of successes in a fixed number of independent Bernoulli trials, each with the same probability of success. It is fundamental in probability theory and statistics, used in quality control, survey sampling, and many other applications involving counting successes.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Binomial_distribution'
    }
  },
  poisson: {
    name: 'poisson',
    label: 'Poisson',
    type: 'discrete',
    parametrizations: [poissonRate],
    note: 'The Poisson distribution describes the number of events occurring in a fixed interval of time or space, given a constant average rate of occurrence. It is used to model rare events such as radioactive decay, traffic accidents, and system failures. The distribution is skewed and becomes more symmetric as the rate increases.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Poisson_distribution'
    }
  },
  negativebinomial: {
    name: 'negativebinomial',
    label: 'Negative binomial',
    type: 'discrete',
    parametrizations: [negBinomialRp],
    note: 'The negative binomial distribution describes the number of failures before a specified number of successes occurs in a sequence of independent Bernoulli trials. It is more flexible than the Poisson distribution for modeling overdispersed count data and is used in ecology, epidemiology, and insurance.',
    referenceurl: {
      name: 'Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Negative_binomial_distribution'
    }
  }
};

export const distributionList = Object.values(distributions); 