<template>
  <div>
    <verify @imgCode="imgCode"></verify>
    <el-button type="primary" @click="dialogTableVisible = true">打开拖拽弹窗</el-button>
    <!-- v-el-drag-dialog -->
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="拖拽弹窗">
      <el-table :data="tableData">
        <el-table-column prop="display_time" label="日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="author" label="姓名"></el-table-column>
        <el-table-column prop="title" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
    <form-table
      :minTable="minTable"
      :cols="cols"
      :pubForm="pubForm"
      @min-operator="handleOperator"
      @on-edit="onEdit"
    ></form-table>
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
      tableData: [], // 弹窗数据
      // 表格参数
      minTable: {
        tableData: [] // 表格数据
      },
      // 表头参数
      cols: [
        {
          prop: "author", // 表头prop
          label: "姓名", // 表头名称
          textType: "input" // 表格对应表单的类型
        },
        {
          prop: "status",
          label: "状态",
          textType: "select",
          // 表格对应表单的下拉选项
          formOption: [
            {
              label: "published",
              value: "published"
            },
            {
              label: "draft",
              value: "draft"
            },
            {
              label: "deleted",
              value: "deleted"
            }
          ]
        },
        {
          prop: "display_time",
          label: "日期",
          textType: "date"
        },
        {
          prop: "timestamp",
          label: "提交人",
          textType: "input"
        },
        {
          prop: "",
          label: "操作",
          type: "btn",
          // 操作按钮组
          btnData: [
            {
              operatTitle: "编辑"
            },
            {
              operatTitle: "删除",
              type: "danger" // 设置按钮样式
            }
          ]
        }
      ],
      // 表单参数
      pubForm: {
        visible: false, // 展示表单弹窗变量
        title: "修改数据", // 弹窗标题
        form: {}, // 表单对象
        labelWidth: "100px", // 表单标题宽度
        // 表单对象的校验规则
        rules: {
          author: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ]
        }
      }
    };
  },
  created() {
    this.getList(); // 获取弹窗数据
  },
  methods: {
    // 获取数据
    getList() {
      // 如果vuex中userMock为true
      if (this.$store.state.useMock) {
        // 使用延时器模拟异步
        window.setTimeout(() => {
          let res = mockData.list;
          this.tableData = JSON.parse(JSON.stringify(res.data.datas));
          this.minTable.tableData = JSON.parse(JSON.stringify(res.data.datas));
          // 业务逻辑
        }, 1000);
        return;
      }
    },
    // 操作事件
    handleOperator(index, row, title) {
      // 点击编辑按钮
      if (title === "编辑") {
        console.log(title);
        this.pubForm.form = JSON.parse(JSON.stringify(row));
        this.pubForm.visible = true;
      }
    },
    // 编辑确认按钮
    onEdit() {
      // 将修改后的数据传给后端，刷新表格数据
      console.log(this.pubForm.form, "this.pubForm.form");
      // this.getList();
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
