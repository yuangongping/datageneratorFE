import Cookies from 'js-cookie';


export function setAuthTime(value) {
    return Cookies.set('authTime', value, { expires: 365 });
}

export function getAuthTime() {
    return Cookies.get('authTime');
}