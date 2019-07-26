<template>
    <div>

    </div>
</template>

<script>
    import {Loading} from 'element-ui';

    export default {
        props: ['options'],
        mounted() {
            let post_options = this.options;
            let default_options = {fullscreen: true, spinner: 'el-icon-loading', text: '拼命加载中'};
            let result = !!post_options ? Object.assign(default_options, post_options) : default_options;
            this.loading = Loading.service(result);
        },
        components: {},
        data: function () {
            return {
                loading: {}
            }
        },
        beforeDestroy() {
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                this.loading.close();
            });
        },
        methods: {}
    }
</script>
<style>

</style>