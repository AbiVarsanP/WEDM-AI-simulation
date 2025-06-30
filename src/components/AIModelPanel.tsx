import React, { useState } from 'react';
import { Brain, Target, Zap, Dna } from 'lucide-react';

interface AIModelPanelProps {
  onTrainModel: (modelType: string, data: any) => void;
  trainingResults: Record<string, any>;
}

const AIModelPanel: React.FC<AIModelPanelProps> = ({ onTrainModel, trainingResults }) => {
  const [selectedModel, setSelectedModel] = useState('SVM');
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const models = [
    { id: 'SVM', name: 'Support Vector Machine', icon: Target, color: 'text-blue-400' },
    { id: 'ANN', name: 'Artificial Neural Network', icon: Brain, color: 'text-green-400' },
    { id: 'ELM', name: 'Extreme Learning Machine', icon: Zap, color: 'text-yellow-400' },
    { id: 'GA', name: 'Genetic Algorithm', icon: Dna, color: 'text-purple-400' },
  ];

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          onTrainModel(selectedModel, generateTrainingData());
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const generateTrainingData = () => {
    // Generate synthetic training data
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        voltage: 20 + Math.random() * 280,
        current: 1 + Math.random() * 49,
        pulseOn: 0.5 + Math.random() * 99.5,
        pulseOff: 1 + Math.random() * 199,
        materialRemovalRate: Math.random() * 10,
        surfaceRoughness: Math.random() * 5,
        accuracy: 0.8 + Math.random() * 0.2,
      });
    }
    return data;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Brain className="w-6 h-6 text-green-400" />
        AI Model Training
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {models.map(({ id, name, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setSelectedModel(id)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedModel === id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon className={`w-5 h-5 ${color}`} />
              <div className="text-left">
                <div className="font-medium text-white text-sm">{id}</div>
                <div className="text-xs text-gray-400">{name}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleTrainModel}
        disabled={isTraining}
        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors mb-4"
      >
        {isTraining ? 'Training...' : `Train ${selectedModel} Model`}
      </button>

      {isTraining && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Training Progress</span>
            <span>{trainingProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-100"
              style={{ width: `${trainingProgress}%` }}
            />
          </div>
        </div>
      )}

      {trainingResults[selectedModel] && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-white mb-2">Training Results</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Accuracy:</span>
              <span className="text-green-400 ml-2 font-mono">
                {(trainingResults[selectedModel].accuracy * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-gray-400">Training Time:</span>
              <span className="text-blue-400 ml-2 font-mono">
                {trainingResults[selectedModel].trainingTime}ms
              </span>
            </div>
            <div>
              <span className="text-gray-400">Samples:</span>
              <span className="text-yellow-400 ml-2 font-mono">
                {trainingResults[selectedModel].samples}
              </span>
            </div>
            <div>
              <span className="text-gray-400">RMSE:</span>
              <span className="text-orange-400 ml-2 font-mono">
                {trainingResults[selectedModel].rmse.toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIModelPanel;