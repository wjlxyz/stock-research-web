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
                <p>{{response}}</p>
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
                        value-format="yyyy-MM-dd"
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
            <data-tables :data="data" :filters="filters">
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
                this.response = response;
                console.log(response)
            })

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
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 1000 * 3600 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 1000 * 3600 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                dateRangeValue: '',
                data: [
                    {report_title: '大国重器', broker_name: '平安证券', publish_date: '2020-10-11', rate: '持有'},
                    {report_title: '大国软蛋', broker_name: '哈喽证券', publish_date: '2020-11-11', rate: '买入'}
                ],
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
                response: ''
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>