<template>
    <div>
        <expandTable v-model="checkDataDetail" :loadingStatus="loadingStatus" :tableData="tableData"
                     :tableTotal="tableTotal" v-on:refreshList="refreshListConfirm">
            <el-table-column
                    show-overflow-tooltip
                    prop="distributor"
                    label="经销商"
                    width="140">
                <template slot-scope="scope">
                    <div @click="handleClick(scope.row)"
                         class="tableRowTitle">
                        {{scope.row.distributor}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    prop="warBelong"
                    label="所属战区"
                    width="140">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="115"
                    align="center"
                    label="异常数">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top">
                        <template slot="content">
                            <div slot="content">
                                <span v-if="scope.row.codeA">{{changeAbnormalStatus('codeA')}} ：{{scope.row.codeA}}</span>
                            </div>
                            <div slot="content">
                                <span v-if="scope.row.codeB">{{changeAbnormalStatus('codeB')}} ：{{scope.row.codeB}}</span>
                            </div>
                            <div slot="content">
                                <span v-if="scope.row.codeC">{{changeAbnormalStatus('codeC')}} ：{{scope.row.codeC}}</span>
                            </div>
                            <div slot="content">
                                <span v-if="scope.row.codeD">{{changeAbnormalStatus('codeD')}} ：{{scope.row.codeD}}</span>
                            </div>
                        </template>
                        <div class="tableRowDetail">
                            {{totalAbnormalStatusTotal(scope.row)}}
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="120"
                    prop="createDate"
                    label="创建日期">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="140"
                    prop="warCheck"
                    label="核查战区">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="170"
                    prop="checkStartTime"
                    label="分派时间">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="170"
                    prop="checkEndTime"
                    label="截止时间">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="115"
                    prop="checkStatus"
                    label="核查情况">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="125"
                    prop="superviseCharge"
                    label="督导负责人">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    width="125"
                    prop="superviseStatus"
                    label="督导情况">
            </el-table-column>
        </expandTable>
    </div>
</template>

<script>
    import expandTable from './common/expandTable'

    export default {
        components: {
            expandTable
        },
        data() {
            return {
                loadingStatus: false,
                searchData: {
                    currentRouterName: JSON.parse(JSON.stringify(this.$route.name)),
                    warCheck: '',
                    warCharge: '',
                    warChargeValue: '',
                    warOperator: '',
                    warOperatorValue: '',
                    superviseCharge: '',
                    superviseChargeValue: '',
                    checkStatus: '',
                    superviseStatus: '',
                    warBelong: '',
                    distributor: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    createDate: [],
                    assignDate: [],
                    endDate: [],
                },
                searchUseData: {
                    currentRouterName: JSON.parse(JSON.stringify(this.$route.name)),
                    warCheck: '',
                    warCharge: '',
                    warChargeValue: '',
                    warOperator: '',
                    warOperatorValue: '',
                    superviseCharge: '',
                    superviseChargeValue: '',
                    checkStatus: '',
                    superviseStatus: '',
                    warBelong: '',
                    distributor: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    createDate: [],
                    assignDate: [],
                    endDate: [],
                },
                input: '',
                tableTotal: 12,
                tableData: [],
                pageInfo: {},
                checkDataDetail: {},
            }
        },
        watch: {
            checkDataDetail: function () {
                console.log(this.checkDataDetail);
            }
        },
        mounted() {
            // this.getList().then((res) => {
            //     console.log(res);
            // }).catch((err) => {
            //     console.log(err);
            // });
            this.getList();
        },
        methods: {
            getList: function () {
                this.loadingStatus = true;
                this.$http({
                    url: '/api/ddadapter/openApi/data', method: 'post', data: {
                        "code": "00711ZI01",
                        "data": {
                            //当前页数
                            currentPage: this.pageInfo.currentPage,
                            //每页条数
                            pageSize: this.pageInfo.pageSize,
                            //核查战区
                            warCheck: this.searchUseData.warCheck,
                            //战区负责人
                            warCharge: this.searchUseData.warChargeValue,
                            //战区执行人
                            warOperator: this.searchUseData.warOperatorValue,
                            //督导负责人
                            superviseCharge: this.searchUseData.superviseChargeValue,
                            //核查情况
                            checkStatus: this.searchUseData.checkStatus,
                            //督导情况
                            superviseStatus: this.searchUseData.superviseStatus,
                            //所属战区
                            warBelong: this.searchUseData.warBelong,
                            //经销商
                            distributor: this.searchUseData.distributor,
                            //异常大类
                            abnormalLargeCategory: this.searchUseData.abnormalLargeCategory,
                            //异常小类
                            abnormalSmallCategory: this.searchUseData.abnormalSmallCategory,
                            //创建日期
                            createDate: this.searchUseData.createDate,
                            //分派日期
                            checkStartTime: this.searchUseData.assignDate,
                            //截止日期
                            checkEndTime: this.searchUseData.endDate,
                            //用户id
                            userid: sessionStorage.userid
                        }
                    }
                }, (res) => {
                    let tableData = res.data.data.list;
                    this.tableData = tableData;
                    this.tableTotal = res.data.data.total;
                    this.loadingStatus = false;
                }, (error) => {
                    console.log(error);
                });
            },
            totalAbnormalStatusTotal(e) {
                return e.codeA + e.codeB + e.codeC + e.codeD;
            },
            changeAbnormalStatus(obj) {
                let codeResult = {codeA: '作业层级异动', codeB: '跨渠道异动', codeC: '跨客户异动', codeD: '跨区域异动'};
                return codeResult[obj];
            },
            refreshListConfirm: function (e) {
                this.pageInfo = e;
                this.getList();
            }
        }
    }
</script>
<style lang="scss">

</style>