import Cookies from 'js-cookie';


export function setAuthTime(value) {
    return Cookies.set('authTime', value, { expires: 365 });
}

export function getAuthTime() {
    return Cookies.get('authTime');
}

export function setAuth (value) {
  // 设置用户的cookies，有效时间为半月
  return Cookies.set('auth', value, { expires: 15 })
}
  
export function getAuth () {
  return Cookies.get('auth') ? Cookies.get('auth') : null;
}
  