<template>
  <div>
    <div style="border: 1px solid #eee; padding: 10px">
      <div>
        <el-select v-model="brokerCode" placeholder="请选择券商" @change="getSingleStockReportInfo">
          <el-option
                  v-for="item in brokers"
                  :key="item.orgCode"
                  :label="item.orgSName"
                  :value="item.orgCode">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="demonstration">请选择时间范围</span>
        <el-date-picker
                @change="getSingleStockReportInfo"
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
      <data-tables :data="tableData" :filters="filters" :key="tableKey" :loading="true" :pagination.sync="pagination">
<!--        <el-pagination-->
<!--                background-->
<!--                layout="prev, pager, next"-->
<!--                :total="1000">-->
<!--        </el-pagination>-->
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
  import data from "../data"

  export default {
    name: "BrokerMorningBriefing",
    created() {
      this.getSingleStockReportInfo()
    },
    data() {
      return {
        brokers: data.brokerList,
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
          {prop: 'broker_name', label: '券商'},
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
        pagination: {},
        currentPage: 1,
        pageSize: 40,
        totalHits: 0,
        industry: "",
        stockName: ''
      }
    },
    watch: {
      pagination: {
        deep: true,
        handler() {
          console.log(this.pagination)
        }
      }
    },
    methods: {
      getSingleStockReportInfo: function () {
        const url = 'http://reportapi.eastmoney.com/report/dg?'
                + '&pageSize=' + this.pageSize
                + '&orgCode=' + (this.brokerCode === 0 ? '' : this.brokerCode)
                + '&beginTime=' + this.dateRangeValue[0]
                + '&endTime=' + this.dateRangeValue[1]
                + '&pageNo=' + this.currentPage
                + '&qType=4'
        console.log(url)
        axios.get(url).then(response => {
          console.log(response)
          let responseData = response.data.data
          this.totalHits = response.data['hits']
          for (let i = 0; i < responseData.length; i++) {
            const reportUrl = 'http://pdf.dfcfw.com/pdf/H3_' + responseData[i]['infoCode'] + '_1.pdf'
            this.tableData[i] = {
              'stock_name': responseData[i]['stockName'],
              'report_title': responseData[i]['title'],
              'report_url': reportUrl,
              'broker_name': responseData[i]['orgSName'],
              'publish_date': responseData[i]['publishDate'].substr(0, 11),
              'rate': responseData[i]['emRatingName'],
              'bk': responseData[i]['indvInduName']
            }
          }
          this.tableKey++
        })
      }
    }
  }
</script>

<style scoped>

</style>