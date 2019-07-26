<template>
        <!--配置项-->
        <!--
        column----class:
            tableRowDetail:颜色继承,有下划线
            tableRowTitle:蓝色字,无下划线
        :tableData="tableData":表格数据,数组类型
        :tableTotal="tableTotal":表格数量,数字类型
         v-model="checkDataDetail":checkDataDetail是选择选中内容
         loadingStatus:控制loading展示
         v-on:refreshList="refreshListConfirm":refreshListConfirm当列表更新后,调用的函数
         selectColumnId="id" 数组中唯一的区分字段,默认id,可不填,用于记录选择框选择状态
        -->
    <div class="expandTable">
        <el-table
                ref="multipleTable"
                @select="handleSelectOne"
                @select-all="handleSelectAll"
                empty-text="暂无数据～"
                border
                :data="tableData"
                style="width: 100%">
            <el-table-column v-if="selectColumn"
                    type="selection"
                    width="35"
            >
            </el-table-column>
            <slot></slot>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="currentChange"
                layout="total, sizes, prev, pager, next,slot"
                :page-size="pageSize"
                :current-page="currentPage"
                :total="tableTotal"
                :page-sizes="pageSizes"
        >
            <div class="routerTo">
                <el-input
                        class="expandInput routerToInput"
                        v-model="routerToNum"
                        @blur="blurRouterTo()"
                >
                </el-input>
                <div class="routerToButton" @click="handleRouterTo()">
                    GO
                </div>
            </div>
        </el-pagination>
        <loading v-if="loadingStatus" v-model="loadingStatus"></loading>
    </div>
</template>

<script>
    export default {
        props: {
            tableData: {
                default() {
                    return []
                },
                type: Array
            },
            tableTotal: {
                default() {
                    return 0
                },
                type: Number
            },
            loadingStatus:{
                default() {
                    return false
                },
                type: Boolean
            },
            selectColumn:{
                default() {
                    return false
                },
                type: Boolean
            },
            selectColumnId:{
                default() {
                    return 'id'
                },
                type: String
            }
        },
        data() {
            return {
                input: '',
                showColumns: {
                    date: '日期'
                },
                pageSizes: [10, 15, 20, 25],
                pageSize: 10,
                currentPage: 1,
                routerToNum: 1,
                checkData: [],
                checkDataId: [],
                currentPageCheck: [],
                timer: {}
            }
        },
        watch: {
            tableData: function () {
                if(this.selectColumn){
                    clearTimeout(this.timer);
                    this.timer = setTimeout(this.renderTableCheck, 100);
                }
            },
            checkDataId: function () {
                this.$emit('input', {
                    checkedList: this.checkData,
                    checkedIdList: this.checkDataId
                })
            }
        },
        mounted() {
            this.refreshList();
        },
        computed:{
          checkUseId:function(){
              return this.selectColumnId ? this.selectColumnId:'id';
          }
        },
        methods: {
            renderTableCheck() {
                let is_check = document.querySelector('.el-checkbox__input.is-checked');
                let tableData = this.tableData;
                let currentPageCheck = [];
                let checkDataId = JSON.parse(JSON.stringify(this.checkDataId));
                let checkUseId = this.checkUseId;
                for (let i = 0; i < tableData.length; i++) {
                    if (checkDataId.indexOf(tableData[i][checkUseId]) !== -1) {
                        currentPageCheck.push(tableData[i]);
                    }
                }
                this.currentPageCheck = currentPageCheck;
                if (is_check || this.currentPageCheck.length === 0) {
                    clearTimeout(this.timer);
                } else {
                    this.currentPageCheck.forEach(row => {
                        if (checkDataId.indexOf(row[checkUseId]) !== -1) {
                            this.$refs.multipleTable.toggleRowSelection(row, true);
                        }
                    });
                    this.timer = setTimeout(this.renderTableCheck, 100);
                }
            },
            handleSelectOne: function (ar, ob) {
                let checkUseId= this.checkUseId;
                let dataIndex = this.checkDataId.indexOf(ob[checkUseId]);
                if (dataIndex === -1) {
                    this.checkData.push(ob);
                    this.checkDataId.push(ob[checkUseId]);
                } else {
                    this.checkData.splice(dataIndex, 1);
                    this.checkDataId.splice(dataIndex, 1);
                }
            },
            handleSelectAll: function (ar) {
                let tableData = this.tableData;
                let checkData = JSON.parse(JSON.stringify(this.checkData));
                let checkDataId = JSON.parse(JSON.stringify(this.checkDataId));
                let checkUseId = this.checkUseId;
                let dataIndex;
                if (ar.length > 0) {
                    for (let i = 0; i < tableData.length; i++) {
                        dataIndex = checkDataId.indexOf(tableData[i][checkUseId]);
                        if (dataIndex === -1) {
                            checkData.push(tableData[i]);
                            checkDataId.push(tableData[i][checkUseId]);
                        }
                    }
                } else {
                    for (let i = 0; i < tableData.length; i++) {
                        dataIndex = checkDataId.indexOf(tableData[i][checkUseId]);
                        if (dataIndex !== -1) {
                            checkData.splice(dataIndex, 1);
                            checkDataId.splice(dataIndex, 1);
                        }
                    }
                }
                this.checkData = checkData;
                this.checkDataId = checkDataId;
            },
            refreshList: function (routerToNum) {
                this.$emit('refreshList', {
                    currentPage: routerToNum,
                    pageSize: this.pageSize,
                });
            },
            handleRouterTo: function () {
                let routerToNum = JSON.parse(JSON.stringify(this.routerToNum));
                this.currentPage = routerToNum;
                this.refreshList(routerToNum);
            },
            blurRouterTo: function () {
                let routeToNum = this.routerToNum;
                let num = parseInt(routeToNum, 10);
                let pageSize = this.pageSize;
                let tableTotal = this.tableTotal;
                let max = Math.ceil(tableTotal / pageSize);
                let result = 1;
                if (!isNaN(num)) {
                    if (num > 1) {
                        if (num > max) {
                            result = max;
                        } else {
                            result = num;
                        }
                    }
                }
                this.routerToNum = result;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.refreshList(1);
            },
            currentChange(val) {
                this.currentPage = val;
                this.refreshList(val);
            }
        }
    }
</script>
<style lang="scss">

</style>