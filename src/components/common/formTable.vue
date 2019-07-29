/**  
  适用于表格可编辑，且为弹窗编辑 (未完善)
**/
<template>
  <div>
    <!-- tableData：数据（必）  height：高度  maxHeight：最大高度  stripe：斑马纹  border：边框  treeProps：树形表结构-->
    <el-table
      :data="minTable.tableData"
      style="width: 100%"
      :height="minTable.height"
      :max-height="minTable.maxHeight"
      :stripe="minTable.stripe"
      :border="minTable.border"
      :tree-props="minTable.treeProps"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @row-click="handleRowClick"
      @expand-change="handleExpandChange"
    >
      <template v-for="colItem in cols">
        <!-- 可展开 -->
        <template v-if="colItem.type === 'expand'">
          <el-table-column
            type="expand"
            :key="colItem.type"
            :width="colItem.width"
            :fixed="colItem.fixed"
            :align="colItem.align"
          >
            <template slot-scope="props">
              <el-form label-position="left" inline class="inner-table-expand">
                <el-form-item
                  :label="infoItem.label"
                  v-for="(infoItem, infoKey) in colItem.info"
                  :key="infoKey"
                >
                  <span>{{ props.row[infoItem.prop] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </template>
        <!-- 可排序 -->
        <template v-if="colItem.type==='index'">
          <el-table-column
            type="index"
            :index="colItem.index"
            :key="colItem.type"
            :width="colItem.width"
            :fixed="colItem.fixed"
            :align="colItem.align"
          ></el-table-column>
        </template>
        <!-- 可勾选 -->
        <template v-if="colItem.type==='selection'">
          <el-table-column
            type="selection"
            :key="colItem.type"
            :width="colItem.width"
            :align="colItem.align"
            :fixed="colItem.fixed"
          ></el-table-column>
        </template>
        <!-- 按钮 -->
        <template v-if="colItem.type==='btn'">
          <el-table-column
            :label="colItem.label"
            :key="colItem.type"
            :width="colItem.width"
            :fixed="colItem.fixed"
            :align="colItem.align"
          >
            <template slot-scope="scope">
              <div class="btn-data">
                <div v-for="btnItem in colItem.btnData" :key="btnItem.operatTitle">
                  <!-- 可上传 -->
                  <el-upload
                    v-if="btnItem.otype==='file'"
                    class="upload-demo"
                    :action="btnItem.action"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :multiple="btnItem.multiple"
                    :limit="btnItem.limit"
                    :on-exceed="handleExceed"
                    :file-list="btnItem.fileList"
                  >
                    <el-button
                      :size="btnItem.size?btnItem.size:'mini'"
                      :type="btnItem.type"
                      @click="handleOperator(scope.$index, scope.row,btnItem.operatTitle)"
                    >
                      <i
                        class="icon-menu-item"
                        :class="'iconfont icon-' + btnItem.iconName"
                        v-if="btnItem.iconName"
                      ></i>
                      {{btnItem.operatTitle}}
                    </el-button>
                  </el-upload>
                  <!-- 其他操作（删、改、查、下载等） -->
                  <el-button
                    v-else
                    :size="btnItem.size?btnItem.size:'mini'"
                    :type="btnItem.type"
                    @click="handleOperator(scope.$index, scope.row,btnItem.operatTitle)"
                    style="margin-right:5px;"
                  >
                    <i
                      class="icon-menu-item"
                      :class="'iconfont icon-' + btnItem.iconName"
                      v-if="btnItem.iconName"
                      style="font-size:12px;"
                    ></i>
                    {{btnItem.operatTitle}}
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </template>
        <!-- 其他 -->
        <template v-else>
          <el-table-column
            show-overflow-tooltip
            :key="colItem.prop"
            :label="colItem.label"
            :width="colItem.width"
            :fixed="colItem.fixed"
            :align="colItem.align"
            :prop="colItem.prop"
          ></el-table-column>
        </template>
      </template>
    </el-table>

    <!-- 编辑打开的表单 -->
    <el-dialog :title="pubForm.title" :visible.sync="pubForm.visible">
      <el-form
        :model="pubForm.form"
        :rules="pubForm.rules"
        ref="pubForm.form"
        :label-width="pubForm.labelWidth"
      >
        <el-row>
          <template v-for="(formItem,key) in cols">
            <template v-if="formItem.type !== 'btn'">
              <el-col :span="12">
                <el-form-item :label="formItem.label" :key="key" :prop="formItem.prop">
                  <!-- input输入框 -->
                  <template v-if="formItem.textType==='input'">
                    <el-input
                      v-model="pubForm.form[formItem.prop]"
                      :type="formItem.inputType"
                      clearable
                      :placeholder="formItem.placeholder"
                      :disabled="formItem.inputDisabled"
                      style="max-width:220px;"
                    ></el-input>
                  </template>
                  <!-- select选择框 -->
                  <template v-if="formItem.textType==='select'">
                    <el-select
                      style="max-width:220px;"
                      v-model="pubForm.form[formItem.prop]"
                      :placeholder="formItem.placeholder"
                      clearable
                      :disabled="formItem.selectDisabled"
                    >
                      <el-option
                        :label="formSelect.label"
                        :value="formSelect.value"
                        v-for="formSelect in formItem.formOption"
                        :key="formSelect.value"
                      ></el-option>
                    </el-select>
                  </template>
                  <!-- 日期选择器 -->
                  <template v-if="formItem.textType==='date'">
                    <el-date-picker
                      style="max-width:220px;"
                      v-model="pubForm.form[formItem.prop]"
                      :type="formItem.dateType"
                      :placeholder="formItem.placeholder"
                      clearable
                      :disabled="formItem.dateDisabled"
                    ></el-date-picker>
                  </template>
                  <!-- 其他（待完善） -->
                  <template v-else></template>
                </el-form-item>
              </el-col>
            </template>
          </template>
        </el-row>
      </el-form>
      <el-row>
        <!-- <div slot="footer" class="dialog-footer"> -->
        <el-button @click="pubForm.visible = false" style="margin-left: 40%;">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
        <!-- </div> -->
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "form-table",
  props: {
    // 大表格属性配置
    minTable: {
      default: () => ({
        tableData: []
      })
    },
    // 表头数据
    cols: {
      default: Array
    },
    // 编辑表单
    pubForm: {
      required: false,
      default: Object
    }
  },
  methods: {
    // 单选事件
    handleSelect(selection, row) {
      this.$emit("min-select", selection, row);
    },
    // 多选事件
    handleSelectAll(selection) {
      this.$emit("min-select-all", selection);
    },
    // 行点击事件
    handleRowClick(row, column, event) {
      this.$emit("min-row-click", row, column, event);
    },
    // 展开行
    handleExpandChange(row, expanded) {
      this.$emit("min-expand-change", row, expanded);
    },
    // 按钮操作
    handleOperator(index, row, operatTitle) {
      this.$emit("min-operator", index, row, operatTitle);
    },
    // 编辑确认事件
    handleEdit() {
      this.$emit("on-edit");
    }
  }
};
</script>
<style scoped>
.btn-data {
  display: flex;
}
/* .el-form {
  display: flex;
}
@media screen and (min-width: 1201px) {
  .el-form {
    flex-flow: row;
  }
}
@media screen and (max-width: 1200px) {
  .el-form {
    flex-flow: column;
  }
} */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: auto;
}
</style>
