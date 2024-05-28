import React from "react";

export function Steppers({
  steps,
  activeStep,
  handleNext,
  handleBack,
  isValid,
  dirty,
}) {
  const allSteps = steps.flatMap((step) => step.section.components);

  const linearRenderSteps = steps.filter((step) => !step.isIntro);

  const sectionBoundaries = linearRenderSteps.reduce((acc, current, index) => {
    const lastIndex = acc.length ? acc[acc.length - 1].end + 1 : 0;
    const end = lastIndex + current.section.components.length - 1;
    acc.push({ start: lastIndex, end });
    return acc;
  }, []);

  const sectionProgress = sectionBoundaries.map(({ start, end }) => {
    if (activeStep < start) {
      return 0;
    } else if (activeStep > end) {
      return 100;
    } else {
      const activeInSection = activeStep - start;
      const sectionLength = end - start + 1;
      return (activeInSection / sectionLength) * 100;
    }
  });

  const isIntro = steps[activeStep]?.isIntro;

  const Component =
    allSteps[activeStep]?.component || (() => <div>No content available</div>);

  return (
    <>
      <div className="stepper-content">
        <Component />
      </div>
      <footer className="stepper-footer">
        <div className="progress-container">
          {isIntro ? (
            <div
              className="progress-bar-container"
              style={{ width: "100%" }}
            ></div>
          ) : (
            sectionProgress.map((progress, index) => (
              <div
                key={index}
                className="progress-bar-container"
                style={{
                  flex: 1,
                  marginRight:
                    index !== sectionProgress.length - 1 ? "8px" : "0",
                }}
              >
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            ))
          )}
        </div>
        <div className="stepper-footer-actions">
          <button
            className="stepper-back"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </button>
          <button
            className="stepper-next"
            onClick={handleNext}
            disabled={!isValid}
          >
            {activeStep < allSteps.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </footer>
    </>
  );
}
