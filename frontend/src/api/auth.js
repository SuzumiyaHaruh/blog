import {request} from "../utils/request";
import {message} from 'ant-design-vue';
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getJwtToken() {
    return Cookies.get(TokenKey)
}

export function setJwtToken(jwt) {
    return Cookies.set(TokenKey, jwt)
}

export function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export async function register(email, username, password) {
    return await request("/api/auth/local/register", {
        method: "POST",
        auth: false,
        body: {
            email,
            username,
            password,
            name: username,
        },
    });
}

export async function login(email, password) {
    return await request("/api/auth/local", {
        method: "POST",
        auth: false,
        body: {
            identifier: email,
            password,
        },
    });
}

export function logout() {
    localStorage.removeItem("user")
    removeToken()
    message.success('退出成功！')
}

// export function logout() {
//     // localStorage.removeItem("jwtToken");
//     // localStorage.removeItem("user");
// }
