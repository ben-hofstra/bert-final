import React from 'react';
import STATUSCODES from '../utils/STATUSCODES';
import { getWiki } from '../utils/getWiki';

const HIDDEN_STYLES = {
    opacity: '0',
    position: 'fixed',
};

const Step2 = ({ wiki, setWiki }) => {
    const [status, setStatus] = React.useState(STATUSCODES.UNLOADED);
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
        if (status !== STATUSCODES.UNLOADED) return;

        setStatus(STATUSCODES.LOADING);

        getWiki().then((x) => {
            setWiki(x);
            setStatus(STATUSCODES.LOADED);
        });
    }, [status, setWiki]);

    React.useEffect(() => {
        const onKeyDown = (e) => {
            if (e.code === 'Space' && query === '') {
                setWiki();
                setStatus(STATUSCODES.UNLOADED);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [setWiki, query]);

    if (status !== STATUSCODES.LOADED) {
        return (
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold'>
                Finding a topic on Wikipedia...
                <div className='animate-spin inline-block ml-4'>🔍</div>
            </div>
        );
    }

    return (
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='text-3xl font-bold'>{wiki.title}</div>
            <p className='mt-2'>{wiki.extract}</p>
            <div className='text-lg mt-6 italic'>
                {query === '' && (
                    <>
                        Press the <strong>spacebar</strong> for another topic, or{' '}
                        <strong>start typing</strong> to ask a question
                    </>
                )}
                <input
                    value={query}
                    autoFocus
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={(e) => e.target.focus()}
                    style={query === '' ? HIDDEN_STYLES : {}}
                    className='outline-none italic'
                />
            </div>
        </div>
    );
};

export { Step2 };
