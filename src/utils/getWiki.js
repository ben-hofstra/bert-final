import Axios from 'axios';

const getWiki = () => {
    return new Promise((resolve, reject) => {
        Axios.get('https://en.wikipedia.org/api/rest_v1/page/random/summary').then(async (res) => {
            const numWords = res.data.extract.split(' ').length;

            if (numWords < 75 || numWords > 200) {
                console.log('searching again');
                resolve(await getWiki());
            } else {
                console.log('got wiki');
                resolve(res.data);
            }
        });
    });
};

export { getWiki };
