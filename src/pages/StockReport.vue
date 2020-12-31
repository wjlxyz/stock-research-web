<template>
    <div>
        <div style="border: 1px solid #eee; padding: 10px">
            <div>
                <el-select v-model="brokerCode" filterable placeholder="请选择券商" @change="getSingleStockReportInfo">
                    <el-option
                            v-for="item in brokers"
                            :key="item.orgCode"
                            :label="item.orgSName"
                            :value="item.orgCode">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入个股名称或编码" v-model="stockName" clearable></el-input>
                <el-button type="primary" @click="getSingleStockReportInfo">查询</el-button>
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
            <el-table stripe :data="tableData" :filters="filters" :key="tableKey" :loading="true">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
                <el-table-column prop="id" label="编号" width="64px">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="report_title" label="研报标题" width="320px">
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
    import data from "../data"

    export default {
        name: "StockReport",
        created() {
            this.getSingleStockReportInfo()
        },
        data() {
            return {
                brokers: data.brokerList,
                brokerCode: '0',
                titles: [
                    {prop: 'stock_name', label: '个股名称'},
                    {prop: 'broker_name', label: '券商'},
                    {prop: 'rate', label: '买卖评级'},
                    {prop: 'bk', label: '所属板块'},
                    {prop: 'researcher', label: '研究员'},
                    {prop: 'publish_date', label: '发布时间'}
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
                currentPage: 1,
                industry: "",
                stockName: '',
            }
        },
        methods: {
            getStockCode: function (name) {
                for (let i = 0; i < data.stockInfoList.length; i++) {

                    if (data.stockInfoList[i].name === name) {
                        return data.stockInfoList[i].code
                    }
                    if (data.stockInfoList[i].code === name) {
                        return name
                    }
                }
                return ''
            },
            getSingleStockReportInfo: function () {
                this.stockName = this.getStockCode(this.stockName)
                const url = 'http://reportapi.eastmoney.com/report/list?'
                    + (this.stockName.length === 0 ? '' : '&code=' + this.stockName)
                    + '&industryCode=*'
                    + '&pageSize=' + this.pageSize
                    + '&industry=' + this.industry
                    + '&rating='
                    + '&ratingChange=*'
                    + '&beginTime='
                    + '&endTime='
                    + '&pageNo=' + this.currentPage
                    + '&fields='
                    + '&qType=0'
                    + '&orgCode=' + (this.brokerCode === '0' ? '*' : this.brokerCode)
                    + '&rcode=&_='
                axios.get(url).then(response => {
                    let responseData = response.data.data
                    this.totalHits = response.data['hits']
                    if (responseData.length > 0) {
                        this.tableData = []
                    }
                    for (let i = 0; i < responseData.length; i++) {
                        const reportUrl = 'http://pdf.dfcfw.com/pdf/H3_' + responseData[i]['infoCode'] + '_1.pdf'
                        this.tableData[i] = {
                            'id': i + 1,
                            'stock_name': responseData[i]['stockName'],
                            'report_title': responseData[i]['title'],
                            'report_url': reportUrl,
                            'broker_name': responseData[i]['orgSName'],
                            'publish_date': responseData[i]['publishDate'].substr(0, 11),
                            'rate': responseData[i]['emRatingName'],
                            'bk': responseData[i]['indvInduName'],
                            'researcher': responseData[i]['researcher']
                        }
                    }
                    this.tableKey++
                })
            },
            handleCurrentChange: function (current) {
                this.currentPage = current
                this.getSingleStockReportInfo()
            },
            handleSizeChange: function (val) {
                this.pageSize = val
                this.currentPage = 1
                this.getSingleStockReportInfo()
            }
        }
    }
</script>

<style scoped>

</style>