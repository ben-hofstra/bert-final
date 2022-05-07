import React from 'react';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';

const STEPS = [Step1, Step2];

const App = () => {
    const [stepIndex, setStepIndex] = React.useState(0);
    const [wiki, setWiki] = React.useState();

    const renderStep = () => {
        const C = STEPS[stepIndex];
        if (!C) return null;

        return (
            <C stepIndex={stepIndex} setStepIndex={setStepIndex} wiki={wiki} setWiki={setWiki} />
        );
    };

    return <div className='h-screen w-screen'>{renderStep()}</div>;
};

export { App };
