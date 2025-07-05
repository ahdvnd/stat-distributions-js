// Statistical utility functions
export class StatUtils {
  // Gamma function approximation (Lanczos approximation)
  static gamma(z: number): number {
    const g = 7;
    const C = [
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7
    ];

    if (z < 0.5) {
      return Math.PI / (Math.sin(Math.PI * z) * this.gamma(1 - z));
    }

    z -= 1;
    let x = C[0];
    for (let i = 1; i < g + 2; i++) {
      x += C[i] / (z + i);
    }
    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }

  // Beta function
  static beta(a: number, b: number): number {
    return (this.gamma(a) * this.gamma(b)) / this.gamma(a + b);
  }

  // Incomplete beta function (approximation)
  static incompleteBeta(x: number, a: number, b: number): number {
    if (x === 0) return 0;
    if (x === 1) return 1;
    
    // Simple approximation for demonstration
    return x ** a * (1 - x) ** b / this.beta(a, b);
  }

  // Error function approximation
  static erf(x: number): number {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  // Standard normal CDF
  static standardNormalCDF(x: number): number {
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  // Standard normal PDF
  static standardNormalPDF(x: number): number {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  // Factorial
  static factorial(n: number): number {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  // Binomial coefficient
  static binomial(n: number, k: number): number {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
  }
}

// Normal distribution functions
export class Normal {
  static pdf(x: number, mu: number, sigma: number): number {
    return StatUtils.standardNormalPDF((x - mu) / sigma) / sigma;
  }

  static cdf(x: number, mu: number, sigma: number): number {
    return StatUtils.standardNormalCDF((x - mu) / sigma);
  }

  static mean(mu: number, sigma: number): number {
    return mu;
  }

  static variance(mu: number, sigma: number): number {
    return sigma * sigma;
  }

  static median(mu: number, sigma: number): number {
    return mu;
  }

  static mode(mu: number, sigma: number): number {
    return mu;
  }
}

// Gamma distribution functions
export class Gamma {
  static pdf(x: number, shape: number, scale: number): number {
    if (x <= 0) return 0;
    return Math.pow(x, shape - 1) * Math.exp(-x / scale) / 
           (Math.pow(scale, shape) * StatUtils.gamma(shape));
  }

  static cdf(x: number, shape: number, scale: number): number {
    if (x <= 0) return 0;
    // Incomplete gamma function approximation
    const t = x / scale;
    let sum = 0;
    let term = 1;
    for (let i = 0; i < 100; i++) {
      sum += term;
      term *= t / (shape + i);
      if (term < 1e-10) break;
    }
    return sum * Math.exp(-t) * Math.pow(t, shape) / StatUtils.gamma(shape);
  }

  static mean(shape: number, scale: number): number {
    return shape * scale;
  }

  static variance(shape: number, scale: number): number {
    return shape * scale * scale;
  }

  static mode(shape: number, scale: number): number {
    return shape >= 1 ? (shape - 1) * scale : 0;
  }
}

// Student's t distribution
export class StudentT {
  static pdf(x: number, nu: number, mu: number = 0, sigma: number = 1): number {
    const z = (x - mu) / sigma;
    const numerator = StatUtils.gamma((nu + 1) / 2);
    const denominator = Math.sqrt(Math.PI * nu) * StatUtils.gamma(nu / 2) * sigma;
    return (numerator / denominator) * Math.pow(1 + (z * z) / nu, -(nu + 1) / 2);
  }

  static cdf(x: number, nu: number, mu: number = 0, sigma: number = 1): number {
    const z = (x - mu) / sigma;
    // Approximation using normal distribution for large degrees of freedom
    if (nu > 30) {
      return StatUtils.standardNormalCDF(z);
    }
    // Simple approximation for smaller degrees of freedom
    return 0.5 + Math.atan(z / Math.sqrt(nu)) / Math.PI;
  }

  static mean(nu: number, mu: number = 0, sigma: number = 1): number | undefined {
    return nu > 1 ? mu : undefined;
  }

  static variance(nu: number, mu: number = 0, sigma: number = 1): number | undefined {
    return nu > 2 ? (nu / (nu - 2)) * sigma * sigma : undefined;
  }

  static median(nu: number, mu: number = 0, sigma: number = 1): number {
    return mu;
  }

  static mode(nu: number, mu: number = 0, sigma: number = 1): number {
    return mu;
  }
}

// Chi-squared distribution
export class ChiSquared {
  static pdf(x: number, nu: number, sigma: number = 1): number {
    if (x <= 0) return 0;
    const scaledX = x / sigma;
    return Math.pow(scaledX, nu / 2 - 1) * Math.exp(-scaledX / 2) / 
           (Math.pow(2, nu / 2) * StatUtils.gamma(nu / 2) * sigma);
  }

  static cdf(x: number, nu: number, sigma: number = 1): number {
    if (x <= 0) return 0;
    const scaledX = x / sigma;
    return Gamma.cdf(scaledX, nu / 2, 2);
  }

  static mean(nu: number, sigma: number = 1): number {
    return nu * sigma;
  }

  static variance(nu: number, sigma: number = 1): number {
    return 2 * nu * sigma * sigma;
  }
}

// Beta distribution
export class Beta {
  static pdf(x: number, a: number, b: number): number {
    if (x <= 0 || x >= 1) return 0;
    return Math.pow(x, a - 1) * Math.pow(1 - x, b - 1) / StatUtils.beta(a, b);
  }

  static cdf(x: number, a: number, b: number): number {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return StatUtils.incompleteBeta(x, a, b);
  }

  static mean(a: number, b: number): number {
    return a / (a + b);
  }

  static variance(a: number, b: number): number {
    return (a * b) / ((a + b) * (a + b) * (a + b + 1));
  }

  static median(a: number, b: number): number {
    // No closed form, approximation
    return a / (a + b);
  }

  static mode(a: number, b: number): number | undefined {
    if (a > 1 && b > 1) {
      return (a - 1) / (a + b - 2);
    }
    return undefined;
  }
}

// Log-normal distribution
export class LogNormal {
  static pdf(x: number, mu: number, sigma: number): number {
    if (x <= 0) return 0;
    const logX = Math.log(x);
    return Normal.pdf(logX, mu, sigma) / x;
  }

  static cdf(x: number, mu: number, sigma: number): number {
    if (x <= 0) return 0;
    const logX = Math.log(x);
    return Normal.cdf(logX, mu, sigma);
  }

  static mean(mu: number, sigma: number): number {
    return Math.exp(mu + sigma * sigma / 2);
  }

  static variance(mu: number, sigma: number): number {
    const expSigma2 = Math.exp(sigma * sigma);
    return (expSigma2 - 1) * Math.exp(2 * mu + sigma * sigma);
  }

  static median(mu: number, sigma: number): number {
    return Math.exp(mu);
  }

  static mode(mu: number, sigma: number): number {
    return Math.exp(mu - sigma * sigma);
  }
}

// Weibull distribution
export class Weibull {
  static pdf(x: number, x0: number, scale: number, shape: number): number {
    if (x <= x0) return 0;
    const z = (x - x0) / scale;
    return (shape / scale) * Math.pow(z, shape - 1) * Math.exp(-Math.pow(z, shape));
  }

  static cdf(x: number, x0: number, scale: number, shape: number): number {
    if (x <= x0) return 0;
    const z = (x - x0) / scale;
    return 1 - Math.exp(-Math.pow(z, shape));
  }

  static mean(x0: number, scale: number, shape: number): number {
    return x0 + scale * StatUtils.gamma(1 + 1 / shape);
  }

  static variance(x0: number, scale: number, shape: number): number {
    const mean = this.mean(x0, scale, shape);
    const secondMoment = scale * scale * StatUtils.gamma(1 + 2 / shape);
    return secondMoment - mean * mean;
  }

  static mode(x0: number, scale: number, shape: number): number {
    if (shape <= 1) return x0;
    return x0 + scale * Math.pow((shape - 1) / shape, 1 / shape);
  }

  static median(x0: number, scale: number, shape: number): number {
    return x0 + scale * Math.pow(Math.log(2), 1 / shape);
  }
}

// Binomial distribution
export class Binomial {
  static pdf(x: number, n: number, p: number): number {
    if (x < 0 || x > n || Math.floor(x) !== x) return 0;
    return StatUtils.binomial(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
  }

  static cdf(x: number, n: number, p: number): number {
    if (x < 0) return 0;
    if (x >= n) return 1;
    
    let sum = 0;
    for (let i = 0; i <= Math.floor(x); i++) {
      sum += this.pdf(i, n, p);
    }
    return sum;
  }

  static mean(n: number, p: number): number {
    return n * p;
  }

  static variance(n: number, p: number): number {
    return n * p * (1 - p);
  }
}

// Poisson distribution
export class Poisson {
  static pdf(x: number, lambda: number): number {
    if (x < 0 || Math.floor(x) !== x) return 0;
    return Math.pow(lambda, x) * Math.exp(-lambda) / StatUtils.factorial(x);
  }

  static cdf(x: number, lambda: number): number {
    if (x < 0) return 0;
    
    let sum = 0;
    for (let i = 0; i <= Math.floor(x); i++) {
      sum += this.pdf(i, lambda);
    }
    return sum;
  }

  static mean(lambda: number): number {
    return lambda;
  }

  static variance(lambda: number): number {
    return lambda;
  }
}

// Negative Binomial distribution
export class NegativeBinomial {
  static pdf(x: number, r: number, p: number): number {
    if (x < 0 || Math.floor(x) !== x) return 0;
    return StatUtils.binomial(x + r - 1, x) * Math.pow(p, x) * Math.pow(1 - p, r);
  }

  static cdf(x: number, r: number, p: number): number {
    if (x < 0) return 0;
    
    let sum = 0;
    for (let i = 0; i <= Math.floor(x); i++) {
      sum += this.pdf(i, r, p);
    }
    return sum;
  }

  static mean(r: number, p: number): number {
    return p * r / (1 - p);
  }

  static variance(r: number, p: number): number {
    return p * r / Math.pow(1 - p, 2);
  }
}

// Utility function to generate sequence of numbers
export function seq(start: number, end: number, steps: number): number[] {
  const result: number[] = [];
  const step = (end - start) / (steps - 1);
  for (let i = 0; i < steps; i++) {
    result.push(start + i * step);
  }
  return result;
}

// Round to specified digits
export function round(value: number, digits: number): number {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
} 