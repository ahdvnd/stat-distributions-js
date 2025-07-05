import React, { useState } from 'react';
import { distributionList } from './data/distributions';
import { Distribution } from './types/distributions';
import DistributionViewer from './components/DistributionViewer';
import DistributionSelector from './components/DistributionSelector';
import DistributionComparison from './components/DistributionComparison';
import './App.css';

function App() {
  const [selectedDistribution, setSelectedDistribution] = useState<Distribution | null>(
    distributionList[0] || null
  );
  const [selectedParametrization, setSelectedParametrization] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Statistical Distributions Explorer
          </h1>
          <p className="text-lg text-gray-600">
            Interactive visualization of probability distributions
          </p>
          <p className="text-sm text-gray-500 mt-2">
            A project by{' '}
            <a 
              href="https://www.ahadavand.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Aboozar Hadavand
            </a>
          </p>
        </header>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-lg p-2 inline-flex">
            <button
              onClick={() => setViewMode('single')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Single View
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'compare'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Compare Distributions
            </button>
          </div>
        </div>

        {viewMode === 'single' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Select Distribution
                </h2>
                <DistributionSelector
                  distributions={distributionList}
                  selectedDistribution={selectedDistribution}
                  onDistributionChange={(dist) => {
                    setSelectedDistribution(dist);
                    setSelectedParametrization(0);
                  }}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {selectedDistribution ? (
                <DistributionViewer
                  distribution={selectedDistribution}
                  parametrizationIndex={selectedParametrization}
                  onParametrizationChange={setSelectedParametrization}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <p className="text-gray-500">Select a distribution to get started</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <DistributionComparison distributions={distributionList} />
        )}
      </div>
    </div>
  );
}

export default App;
