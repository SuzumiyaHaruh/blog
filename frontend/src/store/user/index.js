import {getUser, login, register, saveUser, setJwtToken} from "../../api/auth";
import {message} from 'ant-design-vue';
import {router} from "../../routes/index.js";
import {changeUser} from "../../api/user.js";

export const user = {
    state() {
        return {
            user: getUser('user')||{},//用户信息
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        /**
         * 注册用户
         * @param commit
         * @param email
         * @param username
         * @param password
         * @returns {Promise<void>}
         */
        async registerUser({commit}, {email, username, password}) {
            await register(email, username, password).then(res => {
                if (res.data === null) {
                    message.error(res.error.message);
                } else {
                    setJwtToken(res.jwt)
                    saveUser(res.user)
                    commit('setUser', res.user)
                    message.success('注册成功');
                    router.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        /**
         * 登录
         * @param commit
         * @param email
         * @param password
         * @returns {Promise<void>}
         */
        async loginUser({commit}, {email, password}) {
            await login(email, password).then(res => {
                console.log(res)
                if (res.data === null) {
                    message.error(res.error.message);
                } else {
                    setJwtToken(res.jwt)
                    saveUser(res.user)
                    commit('setUser', res.user)
                    message.success('登录成功');
                    router.push('/')
                }

            })
        },
        //更新用户
        async updateUser({commit}, user) {
            await changeUser(user).then(res => {
                message.success('修改成功');
                commit("setUser", res);
                saveUser(res);
            });
        },

    },
};
