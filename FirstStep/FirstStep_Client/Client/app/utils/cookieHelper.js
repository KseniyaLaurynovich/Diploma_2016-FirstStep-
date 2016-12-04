import cookie from 'react-cookie'

export function logout(){
    cookie.remove('userData', { path: '/' });
}

export function login(userData, expires){
    logout();
    cookie.save('userData', userData, { path: '/', expires: expires});
}

export function loadAuthCookie(){
  return cookie.load('userData');
}
