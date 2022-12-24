import Home from "../pages/Home.vue";
import Search from "../pages/Search.vue";
import Profile from "../pages/Profile.vue";
import ProfileEdit from "../pages/ProfileEdit.vue";
import Login from "../pages/Login.vue";
import {createRouter, createMemoryHistory} from 'vue-router';
import {getJwtToken} from "../api/auth.js";
import {message} from 'ant-design-vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/search_result',
        name: 'search_result',
        component: Search
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/profile/edit',
        name: 'profileEdit',
        component: ProfileEdit
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = createRouter({
    routes,
    history: createMemoryHistory(),
});
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        const tokenStr = getJwtToken()
        if (!tokenStr) {
            message.error('未登录，请重新登录').then(r => {})
            next('/login')
        } else {
            next()
        }
    }
})
export {router}