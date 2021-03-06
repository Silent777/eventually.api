import {apiUrl} from 'src/helper';

const appItem = apiUrl + 'user/1/';

const getData = id => {
    let data;
    switch (id) {
        case 1:
            data = {
                description: 'It is your first task and you have to read books from literature list',
                literatureList: ['Learn Python in 3 days', 'Think Python', 'Dive into Python' ],
                timeToLive: 60*60*1000,
            };
            break;
        case 2:
            data = {
                description: 'It is your second task and you have to read books from literature list',
                literatureList: ['Dive into Python' ],
                timeToLive: 60*60*1000,
            };
            break;
        default:
            data = {
                description: '',
                literatureList: [],
                timeToLive: 0,
            };
    }
    return data;
};


const sendAnswer = (statement) => {
    return 1;
};

export {getData, sendAnswer};
