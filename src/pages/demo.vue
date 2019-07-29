<template>
  <div>
    <verify @imgCode="imgCode"></verify>
    <el-button type="primary" @click="dialogTableVisible = true">打开拖拽弹窗</el-button>
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="拖拽弹窗">
      <el-table :data="tableData">
        <el-table-column prop="display_time" label="日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="author" label="姓名"></el-table-column>
        <el-table-column prop="title" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import mockData from "./../mock/demo"; // 引入mock数据
import elDragDialog from "@/directive/drag"; // 引入拖拽指令
export default {
  directives: { elDragDialog }, // 注册vue指令
  data() {
    return {
      dialogTableVisible: false, // 弹窗变量
      tableData: [] // 弹窗数据
    };
  },
  created() {
    this.getList(); // 获取弹窗数据
  },
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
