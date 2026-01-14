import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  onComplete?: (data: any) => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const next = (data?: any) => {
    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete?.({ ...formData, ...data });
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-primary text-white'
                    : 'glass text-primary-lighter light:bg-gray-200 light:text-gray-600'
                }`}
              >
                {index < currentStep ? <Check size={20} /> : index + 1}
              </div>
              <span className={`text-xs mt-2 ${index === currentStep ? 'text-white font-medium light:text-primary' : 'text-primary-lighter light:text-gray-600'}`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-glass light:bg-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="glass rounded-lg p-6 light:bg-white light:shadow-lg">
        {React.cloneElement(steps[currentStep].content as React.ReactElement, {
          onNext: next,
          onPrev: prev,
          isFirst: currentStep === 0,
          isLast: currentStep === steps.length - 1,
          formData
        })}
      </div>
    </div>
  );
};
