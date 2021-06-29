<template>
    <div>
        <div style="border: 1px solid #eee; padding: 10px">
            <div>
                <el-select v-model="brokerCode" filterable placeholder="请选择券商" @change="getMacroSearch">
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
            <el-table
                    stripe
                    :data="tableData"
                    border
                    :filters="filters"
                    :key="tableKey"
            >
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

    export default {
        name: "MacroSearch",
        created() {
            this.getMacroSearch()
        },
        data() {
            return {
                brokers: this.common.brokerInfo,
                brokerCode: '0',
                titles: [
                    {prop: 'broker_name', label: '券商'},
                    {prop: 'researcher', label: '研究员'},
                    {prop: 'publish_date', label: '发布时间'},
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
            getMacroSearch: function () {
                let that = this
                const url = 'http://reportapi.eastmoney.com/report/jg?'
                    + '&pageSize=' + this.pageSize
                    + '&beginTime='
                    + '&endTime='
                    + '&pageNo=' + this.currentPage
                    + '&fields='
                    + '&qType=3'
                    + '&orgCode=' + (this.brokerCode === '0' ? '' : this.brokerCode)
                    + '&_='
                axios.get(url).then(response => {
                    this.totalHits = response.data['hits']
                    let responseData = response.data.data
                    if (responseData.length > 0) {
                        this.tableData = []
                    }
                    for (let i = 0; i < responseData.length; i++) {
                        const reportUrl = 'http://pdf.dfcfw.com/pdf/H3_' + responseData[i]['infoCode'] + '_1.pdf'
                        that.tableData[i] = {
                            'id': i + 1,
                            'report_title': responseData[i]['title'],
                            'report_url': reportUrl,
                            'broker_name': responseData[i]['orgSName'],
                            'publish_date': responseData[i]['publishDate'].substr(0, 11),
                            'researcher': responseData[i]['researcher']
                        }
                    }
                    that.tableKey++
                })
            },
            handleCurrentChange: function (current) {
                this.currentPage = current
                this.getMacroSearch()
            },
            handleSizeChange: function (val) {
                this.pageSize = val
                this.currentPage = 1
                this.getMacroSearch()
            }
        }
    }
</script>

<style scoped>
.pagination-wrap {
    display: none;
}

</style>