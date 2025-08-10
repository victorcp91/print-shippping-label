import React from "react";

export interface BreadcrumbStep {
  id: number;
  label: string;
  mobileLabel: string;
}

export interface BreadcrumbNavigationProps {
  steps: BreadcrumbStep[];
  currentStep?: number;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  steps,
  currentStep = 1,
}) => {
  const renderStepIndicator = (step: BreadcrumbStep) => {
    const isActive = step.id === currentStep;
    const isCompleted = step.id < currentStep;

    const stepClasses = [
      "flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium transition-colors duration-200",
      "sm:w-7 sm:h-7 sm:text-base",
      isActive || isCompleted
        ? "bg-primary-500 text-white"
        : "bg-neutral-200 text-text-secondary",
    ].join(" ");

    return (
      <div className="flex flex-col sm:flex-row sm:items-center flex-shrink-0 min-w-0 flex-1">
        <div className="flex justify-center sm:justify-start">
          <div className={stepClasses}>{step.id}</div>
        </div>

        <div className="mt-1 sm:mt-0 sm:ml-2 lg:ml-3 flex-1 min-w-0 text-center sm:text-left">
          <span
            className={`
              block text-xs sm:text-sm lg:text-base font-medium transition-colors duration-200 leading-tight
              ${
                isActive || isCompleted
                  ? "text-primary-500"
                  : "text-text-secondary"
              }
            `}
            title={step.label}
          >
            <span className="hidden sm:inline">{step.label}</span>
            <span className="sm:hidden">{step.mobileLabel}</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <nav
      aria-label="Etapas do envio"
      className="bg-background-primary border-b border-border-light"
    >
      <div className="w-full sm:max-w-fit sm:mx-auto px-4">
        <ol className="flex items-center h-16 sm:h-14 py-2 sm:py-0 w-full">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            return (
              <React.Fragment key={step.id}>
                <li
                  className="flex items-center w-full"
                  aria-current={isActive ? "step" : undefined}
                >
                  {renderStepIndicator(step)}
                </li>
                {index < steps.length - 1 && (
                  <div
                    className="flex-1 h-px bg-neutral-300 mx-1 sm:mx-2 lg:mx-4 min-w-[1rem] sm:min-w-[2rem] lg:min-w-[3rem] self-center -mt-3 sm:mt-0"
                    data-testid="separator"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;
