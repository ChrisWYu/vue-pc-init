"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axios = require("axios");
var ddPcApi_1 = require("./ddPcApi");
var Promise = require("promise");
//签名免登
var DingTalkPc = /** @class */ (function () {
    function DingTalkPc() {
    }
    DingTalkPc.prototype.ddConfig = function (jsApiList, url) {
        return new Promise(function (resolve, reject) {
            var _url = "" + (url || '/api/auth/getJsConfig') + location.search;
            Axios.default.post(_url)
                .then(function (res) {
                    var jsConfig = res.data;
                    jsConfig.jsApiList = jsApiList;
                    ddPcApi_1.default.config(jsConfig);
                    resolve(res);
                    // ddPcApi_1.default.ready().then(function (res) {
                    //     console.log(res);
                    //     resolve(res);
                    // });
                    // ddPcApi_1.default.error().then(function (err) {
                    //     console.log(err);
                    //     reject(err);
                    // });
                }, function (err) {
                    reject(err);
                });
        });
    };
    DingTalkPc.prototype.authCode = function (corpId) {
        return new Promise(function (resolve) {
            ddPcApi_1.default.requestAuthCode(corpId).then(function (code) {
                resolve(code);
            });
        });
    };
    DingTalkPc.prototype.authLogin = function (corpId, url) {
        return new Promise(function (resolve, reject) {
            // ddPcApi_1.default.ready().then(function () {
            ddPcApi_1.default.requestAuthCode(corpId).then(function (code) {
                localStorage.setItem('code', code);
                Axios.default.post((url || '/api/auth/login'), {
                    corpId: corpId ,
                    code: code
                }).then(function (res) {
                    //    let token = res.data
                    resolve(res.data);
                }, function (err) {
                    console.log(err);
                    reject(err);
                });
            });
            // });
            // ddPcApi_1.default.error().then(function (res) {
            //     console.log(res);
            // });
        });
    };
    return DingTalkPc;
}());
var dingTalkPc = new DingTalkPc();
exports.default = dingTalkPc;