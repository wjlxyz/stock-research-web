<template>
    <div>
        <div style="border: 1px solid #eee; padding: 10px">
            <div>
                <el-select v-model="brokerCode" filterable placeholder="请选择券商" @change="getIndustryReportList">
                    <el-option
                            v-for="item in brokers"
                            :key="item.orgCode"
                            :label="item.orgSName"
                            :value="item.orgCode">
                    </el-option>
                </el-select>
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
    import data from "../data"

    export default {
        name: "IndustryReport",
        created() {
            this.getIndustryReportList()
        },
        data() {
            return {
                brokers: data.brokerList,
                brokerCode: '0',
                titles: [
                    {prop: 'broker_name', label: '券商'},
                    {prop: 'industryName', label: '板块'},
                    {prop: 'emRatingName', label: '评级'},
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
                currentPage: 1
            }
        },
        methods: {
            getIndustryReportList: function () {
                const url = 'http://reportapi.eastmoney.com/report/list?industryCode='
                    + '&pageSize=' + this.pageSize
                    + '&industry='
                    + '&rating='
                    + '&ratingChange=*'
                    + '&beginTime='
                    + '&endTime='
                    + '&pageNo=' + this.currentPage
                    + '&fields=&'
                    + 'qType=1'
                    + '&orgCode=' + (this.brokerCode === '0' ? '' : this.brokerCode)
                    + '&rcode=&_='
                axios.get(url).then(response => {
                    console.log(response)
                    let responseData = response.data.data
                    this.totalHits = response.data['hits']
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
                            'industryName': responseData[i]['industryName'],
                            'emRatingName': responseData[i]['emRatingName'],
                            'researcher': responseData[i]['researcher']
                        }
                    }
                    this.tableKey++
                })
            },
            handleCurrentChange: function (current) {
                this.currentPage = current
                this.getIndustryReportList()
            },
            handleSizeChange: function (val) {
                this.pageSize = val
                this.currentPage = 1
                this.getIndustryReportList()
            }
        }
    }
</script>

<style scoped>

</style>