import React from 'react';
import Axios from 'axios';

const App = () => {
    const [results, setResults] = React.useState('');
    const [query, setQuery] = React.useState('');
    const [answer, setAnswer] = React.useState();
    const [status, setStatus] = React.useState(0);

    const format = () => {
        if (!answer) return results;

        let first = results.substring(0, answer.start);
        let end = results.substring(answer.end);

        return (
            <div>
                {first}
                <mark>{answer.answer}</mark>
                {end}
            </div>
        );

        // const split = results.split(answer);
        // if (!answer || split.length !== 2) return results;

        // return (
        //     <div>
        //         {split[0]}
        //         <mark>{answer}</mark>
        //         {split[1]}
        //     </div>
        // );
    };

    const foo = () => {
        setResults('');
        setStatus(1);
        setAnswer();
        setQuery('');
        return new Promise((resolve, reject) => {
            Axios.get('https://en.wikipedia.org/api/rest_v1/page/random/summary').then(
                async (res) => {
                    const { extract } = res.data;

                    const numWords = extract.split(' ').length;
                    if (numWords < 75 || numWords > 200) {
                        setResults(await foo());
                    } else {
                        setStatus(0);
                        setResults(extract);
                        resolve(extract);
                    }
                }
            );
        });
    };

    const search = () => {
        if (!results || !query) return;

        Axios.post(
            `https://api-inference.huggingface.co/models/bert-large-uncased-whole-word-masking-finetuned-squad`,
            {
                inputs: {
                    question: query,
                    context: results,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${'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'}`,
                },
            }
        )
            .then((res) => {
                setAnswer(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <button onClick={foo} disabled={status !== 0}>
                {status === 0 ? 'Load Random Wikipedia Entry' : 'Loading...'}
            </button>
            <br />
            <br />
            <div>{format(results)}</div>
            <br />
            {results !== '' && (
                <div>
                    <input
                        autoFocus
                        style={{ width: '400px' }}
                        type='text'
                        placeholder='Ask a question:'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={search}>Search:</button>
                </div>
            )}
            {/* <br /> */}
            {/* <div>{answer}</div> */}
        </div>
    );
};

export { App };
