<template>

        <!--配置项-->
        <!--
        column:
            tableRowDetail:颜色继承,有下划线
            tableRowTitle:蓝色字,无下划线
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
            <el-table-column
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
                clearTimeout(this.timer);
                this.timer = setTimeout(this.renderTableCheck, 100);
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
        methods: {
            renderTableCheck() {
                let is_check = document.querySelector('.el-checkbox__input.is-checked');
                let tableData = this.tableData;
                let currentPageCheck = [];
                let checkDataId = JSON.parse(JSON.stringify(this.checkDataId));
                for (let i = 0; i < tableData.length; i++) {
                    if (checkDataId.indexOf(tableData[i].id) !== -1) {
                        currentPageCheck.push(tableData[i]);
                    }
                }
                this.currentPageCheck = currentPageCheck;
                if (is_check || this.currentPageCheck.length === 0) {
                    clearTimeout(this.timer);
                } else {
                    this.currentPageCheck.forEach(row => {
                        if (checkDataId.indexOf(row.id) !== -1) {
                            this.$refs.multipleTable.toggleRowSelection(row, true);
                        }
                    });
                    this.timer = setTimeout(this.renderTableCheck, 100);
                }
            },
            handleSelectOne: function (ar, ob) {
                let dataIndex = this.checkDataId.indexOf(ob.id);
                if (dataIndex === -1) {
                    this.checkData.push(ob);
                    this.checkDataId.push(ob.id);
                } else {
                    this.checkData.splice(dataIndex, 1);
                    this.checkDataId.splice(dataIndex, 1);
                }
            },
            handleSelectAll: function (ar) {
                let tableData = this.tableData;
                let checkData = JSON.parse(JSON.stringify(this.checkData));
                let checkDataId = JSON.parse(JSON.stringify(this.checkDataId));
                let dataIndex;
                if (ar.length > 0) {
                    for (let i = 0; i < tableData.length; i++) {
                        dataIndex = checkDataId.indexOf(tableData[i].id);
                        if (dataIndex === -1) {
                            checkData.push(tableData[i]);
                            checkDataId.push(tableData[i].id);
                        }
                    }
                } else {
                    for (let i = 0; i < tableData.length; i++) {
                        dataIndex = checkDataId.indexOf(tableData[i].id);
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