<template>
    <el-container>
        <el-header><img src="../../src/assets/logo.png" style="height: 34px;margin-top: 8px;margin-left: 35px">
        </el-header>
        <el-container>
            <el-aside style="width: 2rem;box-shadow: 0 2px 12px 0 rgba(0,0,0,.05)">
                <expandMenu></expandMenu>
            </el-aside>
            <el-main style="background: #F6F7F8;padding: .14rem 0;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>


    export default {

        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    };
</script>
<style lang="scss">
    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 100px;
    }

    body {
        /*height: 100%;*/
        font-size: 12px;
        position: relative;
    }

    .bodyContent {
        .header {
            .el-input, .el-date-editor.el-input__inner {
                width: 2.2rem;
                height: .35rem;

                .el-input__inner {
                    height: .35rem;
                    line-height: .35rem;
                }

                .el-input__icon {
                    line-height: .35rem;
                }
            }

            .block {
                display: inline-block;
                white-space: nowrap;
                margin-left: .2rem;
                margin-top: .16rem;

                .title {
                    display: inline-block;
                    font-size: 14px;
                    width: 70px;
                }
            }

            .operateRow {
                text-align: right;
                padding-right: 0.2rem;
                margin: .2rem 0 .1rem;
            }
        }

        .contentDetail {
            padding: .1rem .2rem;
        }
    }

    body .el-table th.gutter {
        display: table-cell !important;
    }
    .expandInput input{
        height: 36px;
    }
    .operateRow .operateButton {
        margin-left: 0.2rem;
        letter-spacing: 1px;
        vertical-align: bottom;
    }

    .operateRow .operateButton:nth-child(1) {
        margin-left: 0;
    }
    .cusButton {
        display: inline-block;
        width: 1rem;
        height: .36rem;
        line-height: .36rem;
        text-align: center;
        font-size: .16rem;
        border-radius: .05rem;
        letter-spacing: .04rem;
        cursor: pointer;
        &.small{
            width: 0.8rem;
            height: .3rem;
            line-height: .3rem;
            letter-spacing: 0;
            font-size: 0.14rem;
            vertical-align: middle;
        }
    }

    .cusRed {
        background-color: #F13D3D;
        color: #ffffff;
    }

    .cusRed:hover {
        background-color: #C80512;
    }

    .cusWhite {
        border: 1px solid #D0D0D0;
        background-color: #ffffff;
        color: #333333;
        height:calc(0.36rem + 1px)
    }

    .cusWhite:hover {
        border: 1px solid #F8D1D3;
        background-color: #FBE6E7;
        color: #F13D3D;
    }

    /*.bodyContent .contentTitle {*/
    /*    font-size: 14px;*/
    /*    color: #333333;*/
    /*    margin-bottom: 19px;*/
    /*}*/

    /*.bodyContent .contentDetail {*/
    /*    border-radius: 4px;*/
    /*    padding: 10px 24px;*/
    /*    background-color: #ffffff;*/
    /*    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);*/
    /*}*/

</style>
