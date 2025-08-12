import React from 'react';
import { Zap, Clock, Gauge, Wind } from 'lucide-react';

interface EDMParameters {
  material: string;
  grade: string;
  thickness: number;
  laserPower: number;
  speed: number;
  gasAndPressure: string;
  surfaceRoughness: number;
  deviation: number;
  kerfTaper: number;
  hazDepth: number;
  linearEnergy: number;
}

interface ParameterPanelProps {
  parameters: EDMParameters;
  onParameterChange: (key: keyof EDMParameters, value: number) => void;
}

const ParameterPanel: React.FC<ParameterPanelProps> = ({ parameters, onParameterChange }) => {
  const materialOptions = ['Mild Steel', 'Stainless Steel', 'Aluminium', 'Titanium'];
  const gradeOptions = {
    'Mild Steel': ['S355JR'],
    'Stainless Steel': ['AISI 304'],
    'Aluminium': ['Al-6061'],
    'Titanium': ['Ti6Al4V']
  };
  const gasOptions = ['O₂ @ 0.40 bar', 'N₂ @ 1.0 bar', 'N₂ @ 1.2 bar', 'N₂ @ 1.5 bar'];

  const parameterConfigs = [
    { key: 'thickness', label: 'Thickness (mm)', min: 2, max: 10, step: 0.5, icon: Gauge, color: 'text-blue-400' },
    { key: 'laserPower', label: 'Laser Power (kW)', min: 2.5, max: 6.0, step: 0.1, icon: Zap, color: 'text-yellow-400' },
    { key: 'speed', label: 'Feed Rate (mm/min)', min: 500, max: 5000, step: 25, icon: Wind, color: 'text-green-400' },
    { key: 'surfaceRoughness', label: 'Ra (µm)', min: 0.7, max: 1.5, step: 0.1, icon: Gauge, color: 'text-cyan-400' },
    { key: 'deviation', label: 'Deviation (mm)', min: 0.070, max: 0.225, step: 0.005, icon: Gauge, color: 'text-purple-400' },
    { key: 'kerfTaper', label: 'Kerf Taper (mm)', min: 0.01, max: 0.21, step: 0.01, icon: Gauge, color: 'text-orange-400' },
    { key: 'hazDepth', label: 'HAZ Depth (µm)', min: 15, max: 320, step: 5, icon: Gauge, color: 'text-red-400' },
    { key: 'linearEnergy', label: 'Linear Energy (J/mm)', min: 33, max: 240, step: 1, icon: Zap, color: 'text-pink-400' },
  ] as const;

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
        <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        EDM Parameters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Material Selection */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
            <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            Material
          </label>
          <select
            value={parameters.material}
            onChange={(e) => {
              const newMaterial = e.target.value;
              const newGrade = gradeOptions[newMaterial as keyof typeof gradeOptions][0];
              onParameterChange('material', newMaterial as any);
              onParameterChange('grade', newGrade as any);
            }}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-blue-500"
          >
            {materialOptions.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>

        {/* Grade Selection */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
            <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
            Grade
          </label>
          <select
            value={parameters.grade}
            onChange={(e) => onParameterChange('grade', e.target.value as any)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-blue-500"
          >
            {gradeOptions[parameters.material as keyof typeof gradeOptions]?.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
        {parameterConfigs.map(({ key, label, min, max, step, icon: Icon, color }) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
                <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${color}`} />
                <span className="truncate">{label}</span>
              </label>
              <span className="text-xs sm:text-sm font-mono text-white bg-gray-700 px-2 py-1 rounded min-w-0 flex-shrink-0">
                {typeof parameters[key] === 'number' ? parameters[key] : ''}
              </span>
            </div>
            {typeof parameters[key] === 'number' && (
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={parameters[key] as number}
              onChange={(e) => onParameterChange(key, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            )}
            {typeof parameters[key] === 'number' && (
            <div className="flex justify-between text-xs text-gray-500">
              <span>{min}</span>
              <span>{max}</span>
            </div>
            )}
          </div>
        ))}

        {/* Gas & Pressure Selection */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
            <Wind className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            Gas & Pressure
          </label>
          <select
            value={parameters.gasAndPressure}
            onChange={(e) => onParameterChange('gasAndPressure', e.target.value as any)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-blue-500"
          >
            {gasOptions.map(gas => (
              <option key={gas} value={gas}>{gas}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ParameterPanel;