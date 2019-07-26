// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import {nativeAxios, httpRequest} from './api/api.inc'
import './theme/theme-red.scss'
import cusComponent from './components/common/index.js'

Vue.use(cusComponent);
Vue.use(ElementUI);

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
Vue.config.productionTip = false;

Vue.prototype.$http = httpRequest;
Vue.prototype.$axios = nativeAxios;

/* eslint-disable no-new */
new Vue({
    router,
    template: '<App/>',
    components: {
        App
    },
    created() {
        //this.$router.push({name: 'HelloWorld'});
    },
    beforeDestroy() {
        sessionStorage.clear();
    }
}).$mount('#app');
