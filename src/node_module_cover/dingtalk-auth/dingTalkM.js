"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axios = require("axios");
var ddMApi_1 = require("./ddMApi");
var Promise = require("promise");
//签名免登
var DingTalkM = /** @class */ (function () {
    function DingTalkM() {
    }
    DingTalkM.prototype.ddConfig = function (jsApiList, url, domain) {
        return new Promise(function (resolve, reject) {
            var _url = "" + (url || '/api/auth/getJsConfig') + location.search + (domain ? '&domain=' + domain : '');
            Axios.default.get(_url + "&ts=" + Date.now())
                .then(function (res) {
                var jsConfig = res.data;
                jsConfig.jsApiList = jsApiList;
                ddMApi_1.default.config(jsConfig);
                resolve(res.data);
            }, function (err) {
                reject(err);
            });
        });
    };
    DingTalkM.prototype.authLogin = function (corpId, url) {
        return new Promise(function (resolve, reject) {
            ddMApi_1.default.ready().then(function () {
                ddMApi_1.default.requestAuthCode(corpId).then(function (code) {
                    Axios.default.get((url || '/api/auth/login') + ("?corpId=" + corpId + "&code=" + code) + "&ts=" + Date.now())
                        .then(function (res) {
                        // let token = res.data
                        resolve(res.data);
                    }, function (err) {
                        reject(err);
                    });
                });
            });
            ddMApi_1.default.error().then(function (res) {
                console.log(res);
            });
        });
    };
    return DingTalkM;
}());
var dingTalkM = new DingTalkM();
exports.default = dingTalkM;
