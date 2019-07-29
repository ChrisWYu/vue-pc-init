<template>
  <div>
    <verify @imgCode="imgCode"></verify>
  </div>
</template>
<script>
// import mockData from "./../mock/demo"; // 引入mock数据
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    // 获取数据
    getList() {
      //如果vuex中userMock为true
      if (this.$store.state.useMock) {
        //使用延时器模拟异步
        window.setTimeout(() => {
          let res = mockData.list;
          this.tableData = JSON.parse(JSON.stringify(res.data.datas));
          //业务逻辑
        }, 1000);
        return;
      }
    },
    // 获取验证码
    imgCode(data) {
      console.log("imgCode:" + data);
    }
  }
};
</script>
<style scoped>
</style>
