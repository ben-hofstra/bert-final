import React from 'react';
import STATUSCODES from '../utils/STATUSCODES';
import { getWiki } from '../utils/getWiki';
import { getAnswer } from '../utils/getAnswer';

const HIDDEN_STYLES = {
    opacity: '0',
    position: "fixed"
};

const Step2 = ({ wiki, setWiki }) => {
    const [status, setStatus] = React.useState(STATUSCODES.UNLOADED);
    const [status2, setStatus2] = React.useState(STATUSCODES.UNLOADED);
    const [query, setQuery] = React.useState('');
    const [answer, setAnswer] = React.useState();
    const [oldQuery, setOldQuery] = React.useState('');

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
                setAnswer();
                setStatus(STATUSCODES.UNLOADED);
            } else if (e.code === 'Enter') {
                const z = query;
                setQuery('');
                setOldQuery(z);
                setStatus2(STATUSCODES.LOADING);
                getAnswer(z, wiki.extract)
                    .then((answer) => {
                        setAnswer(answer);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                    .finally(() => {
                        setStatus2(STATUSCODES.UNLOADED);
                        setQuery('');
                    });
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [setWiki, query, wiki]);

    const formatWithAnswer = () => {
        if (!answer || query) return <p>{wiki.extract}</p>;

        let first = wiki.extract.substring(0, answer.start);
        let end = wiki.extract.substring(answer.end);

        return (
            <p>
                {first}
                <span
                    style={{ backgroundColor: '#ffcd00', margin: '-2px', padding: '2px' }}
                    className='font-bold rounded-sm'
                >
                    {answer.answer}
                </span>
                {end}
            </p>
        );
    };

    if (status !== STATUSCODES.LOADED) {
        return (
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold'>
                Finding a topic on Wikipedia...
                <div className='animate-spin inline-block ml-4'>🔍</div>
            </div>
        );
    }

    return (
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' style={{maxWidth: "600px"}}>
            <div className='text-3xl font-bold'>{wiki.title}</div>
            <p className='mt-2'>{formatWithAnswer()}</p>
            <div
                style={{
                    backgroundColor: '#ffcd00',
                    padding: '2px 4px',
                    opacity:
                        (!answer && status2 !== STATUSCODES.LOADING) || query !== '' ? '0' : '',
                }}
                className='font-bold rounded-sm inline-block mt-2'
            >
                {status2 === STATUSCODES.LOADING ? (
                    "..."
                ) : (
                    oldQuery
                )}
            </div>
            <div className='text-lg mt-4 italic'>
                <div style={{ display: query === '' ? 'block' : 'none' }}>
                    Press the <strong>spacebar</strong> for another topic, or{' '}
                    <strong>start typing</strong> to ask a question
                </div>
                <input
                    value={query}
                    autoFocus
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={(e) => e.target.focus()}
                    style={query === '' ? HIDDEN_STYLES : {}}
                    className='outline-none italic w-full font-semibold'
                />
            </div>
            <div className='text-md mt-2 italic' style={{ opacity: query === '' ? '0' : '' }}>
                {status2 === STATUSCODES.UNLOADED ? (
                    <>
                        Press <strong>enter</strong> to ask your question...
                    </>
                ) : (
                    <>need something here</>
                )}
            </div>
        </div>
    );
};

export { Step2 };
