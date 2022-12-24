import {createStore} from "vuex";
import {user} from "./user/index.js";
import {post} from "./post/index.js";
import {comment} from "./comment/index.js";
// 引入vuex持久化方法createPersistedState
// import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
    modules: {
        user,
        post,
        comment
    },
    state() {
        return {
            showPostUpload: false,
            showPostDetails: false
        }
    },
    mutations: {
        changeShowPostUpload(state, show) {
            state.showPostUpload = show
        },
        changeShowPostDetails(state, show) {
            state.showPostDetails = show
        }
    },
    // plugins: [
    //     // 持久化配置
    //     // createPersistedState({
    //     //     key: 'my',
    //     //     paths: ['user']
    //     // })
    // ]

})