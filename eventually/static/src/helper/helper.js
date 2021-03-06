export const s3Root='https://s3.eu-west-2.amazonaws.com/eventually-photos/';

export function getImageUrl(imageName){
    return s3Root + imageName;
}

export const isLogged = () => document.cookie.indexOf('sessionid') !== -1;

export const getUserId = () => {
    let cookies = document.cookie.split(';').map(cookie => cookie.replace(' ', ''));
    const name = 'user_id=';

    for (let i=0; i < cookies.length; i++) {
        if(cookies[i].indexOf(name) !== -1) {
            return +cookies[i].substring(name.length, cookies[i].length);
        }
    }
    return null;
};

export const apiUrl = '/api/v1/';
