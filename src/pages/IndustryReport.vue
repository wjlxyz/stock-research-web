<template>
  <div>
    <div style="border: 1px solid #eee; padding: 10px">
      <div>
        <el-select v-model="brokerCode" :key="brokerKey" placeholder="请选择券商">
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
      <data-tables :data="tableData" :filters="filters" :key="tableKey">
        <el-table-column prop="report_title" label="研报标题">
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
      </data-tables>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "IndustryReport",
    created() {
      this.getIndustryReportInfo()
      this.fillBrokerInfo()
    },
    data() {
      return {
        brokers: [
          {value: '0', label: 'all'},
        ],
        brokerCode: '',
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
        tableData: [],
        tableKey: 0,
        brokerKey: 0
      }
    },
    methods: {
      getIndustryReportInfo: function () {
        let that = this
        const url = 'http://reportapi.eastmoney.com/report/list?industryCode='
            + '&pageSize=50'
            + '&industry='
            + '&rating='
            + '&ratingChange=*'
            + '&beginTime=' + this.dateRangeValue[0]
            + '&endTime=' + this.dateRangeValue[1]
            + '&pageNo=1'
            + '&fields=&'
            + 'qType=1'
            + '&orgCode='
            + '&rcode=&_=' + this.dateRangeValue[1]
        axios.get(url).then(response => {
          let responseData = response.data.data
          console.log(responseData)
          for (let i = 0; i < responseData.length; i++) {
            const reportUrl = 'http://pdf.dfcfw.com/pdf/H3_' + responseData[i]['infoCode'] + '_1.pdf'
            that.tableData[i] = {
              'report_title': responseData[i]['title'],
              'report_url': reportUrl,
              'broker_name': responseData[i]['orgSName'],
              'publish_date': responseData[i]['publishDate'].substr(0, 11),
              'rate': '-'
            }
          }
          that.tableKey++
        })
      },
      fillBrokerInfo: function () {
        this.brokers[0] = {
          'label': 'all',
          'value': 0
        }
        console.log(this.common.brokerInfo)
        for (let i = 0; i < this.common.brokerInfo.length; i++) {
          this.brokers[i - 1] = {
            'label': this.common.brokerInfo[i]['orgSName'],
            'value': this.common.brokerInfo[i]['orgCode']
          }
        }
        console.log(this.brokers)
        this.brokerKey++
      }
    }
  }
</script>

<style scoped>

</style>