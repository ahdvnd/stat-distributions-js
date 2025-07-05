# Statistical Distributions Explorer

A modern, interactive React application for exploring and visualizing statistical probability distributions. Built with TypeScript, React, and Plotly.js.

## Features

- **Interactive Visualizations**: Real-time plotting of PDF and CDF functions
- **Multiple Distributions**: Support for 10+ statistical distributions
- **Parameter Controls**: Interactive sliders to adjust distribution parameters
- **Mathematical Formulas**: Beautiful LaTeX rendering of probability density functions
- **Distribution Properties**: Display of mean, variance, mode, and other statistical properties
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Discrete & Continuous**: Support for both discrete and continuous distributions

## Quick Start

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Building for Production

```bash
npm run build
```

The build folder will contain the optimized production build.

### Deployment

The app can be deployed to any static hosting service. For example:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload the build folder to an S3 bucket

## Supported Distributions

### Continuous Distributions

#### Normal/Gaussian Distribution
- Mean/Standard Deviation parametrization
- Mean/Variance parametrization

#### Gamma Distribution
- Shape/Scale parametrization

#### Student's t Distribution
- Location/Scale parametrization

#### Chi-squared Distribution
- Scaled parametrization

#### Beta Distribution
- a/b parametrization

#### Log-normal Distribution
- μ/σ² parametrization

#### Weibull Distribution
- Shift/Scale/Shape parametrization

### Discrete Distributions

#### Binomial Distribution
- Probability parametrization (N, p)

#### Poisson Distribution
- Rate parametrization (λ)

#### Negative Binomial Distribution
- Probability parametrization (r, p)

## Usage

1. **Select a Distribution**: Choose from the available distributions in the sidebar
2. **Choose Parametrization**: Select the desired parametrization if multiple options are available
3. **Adjust Parameters**: Use the interactive sliders to modify distribution parameters
4. **View Results**: See the real-time updates in the plot and distribution properties
5. **Switch Plot Types**: Toggle between PDF and CDF views
6. **Explore Properties**: View mean, variance, mode, and other statistical properties

## Technical Details

### Built With

- **React 18** with TypeScript
- **Plotly.js** for interactive plotting
- **KaTeX** for mathematical formula rendering
- **Custom CSS** for modern styling
- **Custom Statistical Functions** for distribution calculations

### Architecture

```
src/
├── components/          # React components
│   ├── DistributionViewer.tsx
│   ├── DistributionPlot.tsx
│   ├── ParameterControls.tsx
│   └── ...
├── data/               # Distribution definitions
│   └── distributions.ts
├── types/              # TypeScript type definitions
│   └── distributions.ts
├── utils/              # Statistical utility functions
│   └── statistics.ts
└── App.tsx             # Main application component
```

### Adding New Distributions

To add a new distribution:

1. Define the distribution parameters in `src/data/distributions.ts`
2. Implement the PDF and CDF functions in `src/utils/statistics.ts`
3. Add the distribution to the `distributions` object

Example:
```typescript
export class MyDistribution {
  static pdf(x: number, param1: number, param2: number): number {
    // Implementation
  }
  
  static cdf(x: number, param1: number, param2: number): number {
    // Implementation
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Original inspiration from [stat-distributions-js](https://github.com/richarddmorey/stat-distributions-js)
- Statistical functions adapted from various mathematical libraries
- UI design inspired by modern data visualization tools
