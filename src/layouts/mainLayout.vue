<template>
    <el-container>
        <el-header><img src="../../src/assets/logo.png" style="height: 34px;margin-top: 8px;margin-left: 35px">
        </el-header>
        <el-container>
            <el-aside style="width: 240px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.05)">
               <expandMenu></expandMenu>
            </el-aside>
            <el-main style="background: #F6F7F8;padding: 24px 24px;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>


    export default {

        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {

        }
    };
</script>
<style lang="scss">
    .bodyContent .contentTitle {
        font-size: 14px;
        color: #333333;
        margin-bottom: 19px;
    }

    .bodyContent .contentDetail {
        border-radius: 4px;
        padding: 10px 24px;
        background-color: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }

</style>
