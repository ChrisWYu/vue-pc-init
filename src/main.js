// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // mock数据所用
import ElementUI from 'element-ui'
import {nativeAxios, httpRequest} from './api/api.inc'
import './theme/theme-red.scss'
// import cusComponent from './components/common/index.js'
// Vue.use(cusComponent);

Vue.use(ElementUI);
// 全局导入所有组件 页面中直接使用，无需注册组件
import Components from './components'
Vue.use(Components);

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
import {
    dingTalkPc //PC端
    //手机端 dingTalkM
} from 'dingtalk-auth'
/* eslint-disable no-new */
new Vue({
    router,
    store,
    template: '<App/>',
    components: {
        App
    },
    created() {
        let jsApiList = [
            'biz.contact.choose', 'biz.contact.complexPicker', 'biz.ding.post', 'biz.util.downloadFile', 'biz.util.previewImage', 'biz.util.uploadImage', 'biz.contact.choose', "biz.user.get", 'device.geolocation.get'
        ]
        // dingTalkPc.ddConfig(jsApiList, '/api/ddadapter/dingding/expBarcode/getJsTicketPc').then(re => {
        //     console.log("开始鉴权")
        //     console.log(re)
        //     sessionStorage.setItem("corpId", re.data.corpId);
        //     // 免登
        //     dingTalkPc.authLogin(re.data.corpId, '/api/ddadapter/dingding/expBarcode/getUserCode').then(res => {
        //         console.log("开始免登")
        //         console.log(res)
        //         sessionStorage.setItem("roleid", res.roleid);
        //         sessionStorage.setItem("userid", res.userid);
        //         sessionStorage.setItem("username", res.username);
        //         sessionStorage.setItem("warcode", res.warinfo.warcode);
        //         // router.replace({
        //         //     name: 'abnormalScanSuperviseList'
        //         // });
        //     }, err => {
        //         console.log(err)
        //     })
        // }, err => {
        //     console.log(err)
        // })
        //this.$router.push({name: 'HelloWorld'});
    },
    beforeDestroy() {
        sessionStorage.clear();
    }
}).$mount('#app');
