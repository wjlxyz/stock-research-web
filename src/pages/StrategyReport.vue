<template>
    <div>
        <div style="border: 1px solid #eee; padding: 10px">
            <div style="border: 1px solid #eee; padding: 10px">
                <div>
                    <el-select v-model="brokerCode" filterable placeholder="请选择券商" @change="getStrategyReport">
                        <el-option
                                v-for="item in brokers"
                                :key="item.orgCode"
                                :label="item.orgSName"
                                :value="item.orgCode">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-bottom: 10px">
                    <el-row>
                        <el-col :span="6">
                            <el-input v-model="filters[0].value" placeholder="输入研报标题关键字"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-input v-model="filters[1].value" placeholder="输入买入评级关键字"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <div>
            <el-pagination style="border: #eee 1px solid; margin-top: 4px"
                           background
                           layout="total, prev, pager, next, sizes"
                           :total="totalHits"
                           :page-size="pageSize"
                           :current-page="currentPage"
                           :page-sizes="[5, 10, 20, 50, 100]"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
            ></el-pagination>
            <el-table stripe :data="tableData" :filters="filters" :key="tableKey">
                <el-table-column prop="id" label="编号" width="64px">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="report_title" label="研报标题" width="420px">
                    <template slot-scope="scope">
                        <a :href="scope.row.report_url" target="_blank">{{scope.row.report_title}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        v-for="title in titles"
                        :prop="title.prop"
                        :label="title.label"
                        :key="title.prop">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import data from "../data";

    export default {
        name: "StrategyReport",
        created() {

        },
        data() {
            return {
                brokers: data.brokerList,
                brokerCode: '0',
                titles: [
                    {prop: 'broker_name', label: '券商'},
                    {prop: 'publish_date', label: '发布时间'},
                    {prop: 'rate', label: '买卖评级'},
                ],
                filters: [
                    {
                        prop: 'report_title',
                        value: ''
                    }, {
                        prop: 'rate',
                        value: ''
                    }
                ],
                tableData: [],
                tableKey: 0,
                totalHits: 0,
                pageSize: 10,
                currentPage: 1
            }
        },
        methods: {
            getStrategyReport: function () {
                let url = 'http://reportapi.eastmoney.com/report/dg?' +
                    'pageNo=' + this.currentPage +
                    '&pageSize=' + this.pageSize +
                    '&author=*' +
                    '&orgCode=' + (this.brokerCode === 0 ? '' : this.brokerCode) +
                    '&qType=*' +
                    '&beginTime=' +
                    '&endTime='
                axios.get(url).then(response => {
                    this.totalHits = response.data['hits']
                    let responseData = response.data.data
                    if (responseData.length > 0) {
                        this.tableData = []
                    }
                    for (let i = 0; i < responseData.length; i++) {
                        const reportUrl = 'http://pdf.dfcfw.com/pdf/H3_' + responseData[i]['infoCode'] + '_1.pdf'
                        this.tableData[i] = {
                            'id': i + 1,
                            'report_title': responseData[i]['title'],
                            'report_url': reportUrl,
                            'broker_name': responseData[i]['orgSName'],
                            'publish_date': responseData[i]['publishDate'].substr(0, 11),
                            'rate': '-'
                        }
                    }
                    this.tableKey++
                })
            },
            handleCurrentChange: function (current) {
                this.currentPage = current
                this.getStrategyReport()
            },
            handleSizeChange: function (val) {
                this.pageSize = val
                this.currentPage = 1
                this.getStrategyReport()
            }
        }
    }
</script>

<style scoped>

</style>