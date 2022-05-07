import React from 'react';

const Step1 = ({ stepIndex, setStepIndex }) => {
    React.useEffect(() => {
        if (stepIndex !== 0) return;

        const onKeyDown = (e) => {
            if (e.code !== 'Space') return;

            if (stepIndex === 0) setStepIndex(1);
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [stepIndex, setStepIndex]);

    return (
        <>
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                <div className='text-7xl font-bold'>BERT</div>
                <div className='text-xl mt-6 italic'>
                    Press the <strong>spacebar</strong> to begin
                </div>
            </div>
            <div className='fixed left-1/2 -translate-x-1/2 bottom-8'>by Benjamin Schoelkopf</div>
        </>
    );
};

export { Step1 };
