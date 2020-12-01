<template>
    <div>
        <div style="border: 1px solid #eee; padding: 10px">
            <div>
                <el-select v-model="brokerName" placeholder="请选择券商">
                    <el-option
                            v-for="item in brokers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span class="demonstration">请选择时间范围</span>
                <el-date-picker
                        v-model="dateRangeValue"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        :picker-options="pickerOptions">
                </el-date-picker>
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

        <div>
            <data-tables :data="tableData" :filters="filters">
                <el-table-column
                        v-for="title in titles"
                        :prop="title.prop"
                        :label="title.label"
                        :key="title.prop">
                </el-table-column>
            </data-tables>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Report",
        created() {
            this.loadData()
        },
        data() {
            return {
                brokers: [
                    {value: '0', label: 'all'}
                ],
                brokerName: '',
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 1000 * 3600 * 24 * 7);
                                picker.$emit('pick', [start.getTime(), end.getTime()]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 1000 * 3600 * 24 * 30);
                                picker.$emit('pick', [start.getTime(), end.getTime()]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 1000 * 3600 * 24 * 90);
                                picker.$emit('pick', [start.getTime(), end.getTime()]);
                            }
                        }
                    ],
                    disabledDate: (time) => {
                        return time.getTime() > Date.now()
                    }
                },
                dateRangeValue: [new Date().getTime() - 1000 * 3600 * 24 * 7, new Date().getTime()],
                titles: [
                    {prop: 'report_title', label: '研报标题'},
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
                tableData: []
            }
        },
        methods: {
            loadData() {
                let that = this
                const url = 'http://reportapi.eastmoney.com/report/jg?'
                    + '&pageSize=5'
                    + '&beginTime='
                    + '&endTime='
                    + '&pageNo=1'
                    + '&fields='
                    + '&qType=3'
                    + '&orgCode=80055521'
                    + '&_=1605007898254'
                axios.get(url).then(response => {
                    const responseData = response.data.data
                    for (let i = 0; i < responseData.length; i++) {
                        that.tableData[i] = {
                            'report_title': responseData[i]['title'],
                            'broker_name': responseData[i]['orgSName'],
                            'publish_date': responseData[i]['publishDate'],
                            'rate': ''
                        }
                    }
                    console.log(that.tableData)
                })
            }
        }
    }
</script>

<style scoped>

</style>