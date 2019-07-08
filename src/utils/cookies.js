import Cookies from 'js-cookie';


const TimestampKey = 'timestamp'
export function setCookies(value) {
    return Cookies.set(TimestampKey, value);
}

export function getCookies() {
    return Cookies.get(TimestampKey);
}