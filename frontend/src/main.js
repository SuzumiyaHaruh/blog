import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./routes/index.js";
import {store} from "./store/index.js";
import 'ant-design-vue/dist/antd.css'
// 动画 animate.css
import animate from "animate.css";
// import Antd from 'ant-design-vue'
const app = createApp(App)
app.use(router);
app.use(store);
app.use(animate)
// app.use(Antd)
app.mount('#app');