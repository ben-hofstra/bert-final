import Axios from 'axios';

const getAnswer = (question, context) => {
    return new Promise((resolve, reject) => {
        Axios.post(
            `https://api-inference.huggingface.co/models/bert-large-uncased-whole-word-masking-finetuned-squad`,
            {
                inputs: {
                    question,
                    context,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${'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'}`,
                },
            }
        )
            .then((res) => {
                resolve(res.data);
            })
            .catch(reject);
    });
};

export { getAnswer };
