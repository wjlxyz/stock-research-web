<template>
  <div id="app">
    <el-header>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
    </el-header>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" :unique-opened="true">
          <el-submenu index="1">
            <template slot="title"><router-link :to="{name: 'MacroSearch'}"><i class="el-icon-menu"></i>宏观研究</router-link></template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><router-link :to="{name: 'IndustryReport'}"><i class="el-icon-menu"></i>行业研报</router-link></template>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><router-link :to="{name: 'StockReport'}"><i class="el-icon-menu"></i>个股研报</router-link></template>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><router-link :to="{name: 'StrategyReport'}"><i class="el-icon-menu"></i>策略报告</router-link></template>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><router-link :to="{name: 'BrokerMorningBriefing'}"><i class="el-icon-menu"></i>券商晨会</router-link></template>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><router-link :to="{name: 'BrokerMorningBriefing'}"><i class="el-icon-menu"></i>龙虎榜</router-link></template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    // this.common.getAllBrokerInfo()
    this.common.getAllIndustryBkCode()
  },
  data() {
    return {
      showIndex: 1
    }
  },
}

// let reportInfo = {'title': '产业链完整的幕墙骨干企业，背靠海发控协同优势凸显', 'stockName': '海南发展', 'stockCode': '002163', 'orgCode': '80000124', 'orgName': '天风证券股份有限公司', 'orgSName': '天风证券', 'publishDate': '2020-11-18 00:00:00.000', 'infoCode': 'AP202011181430518588', 'column': '002004001003', 'predictNextTwoYearEps': '0.0800000000', 'predictNextTwoYearPe': '257.1900000000', 'predictNextYearEps': '0.0700000000', 'predictNextYearPe': '298.5800000000', 'predictThisYearEps': '0.0700000000', 'predictThisYearPe': '287.7700000000', 'predictLastYearEps': '', 'predictLastYearPe': '', 'actualLastTwoYearEps': '', 'actualLastYearEps': '', 'industryCode': '', 'industryName': '', 'emIndustryCode': '', 'indvInduCode': '546', 'indvInduName': '玻璃陶瓷', 'emRatingCode': '007', 'emRatingValue': '3', 'emRatingName': '买入', 'lastEmRatingCode': '', 'lastEmRatingValue': '', 'lastEmRatingName': '', 'ratingChange': 2, 'reportType': 2, 'author': ['11000177906.刘章明', '11000233623.李华丰'], 'indvIsNew': '001', 'researcher': '刘章明,李华丰', 'newListingDate': '2007-08-23 00:00:00.000', 'newPurchaseDate': '2007-08-09 00:00:00.0', 'newIssuePrice': 8.15, 'newPeIssueA': 29.96, 'indvAimPriceT': '21.5200000000', 'indvAimPriceL': '21.5200000000', 'attachType': '0', 'attachSize': 2338, 'attachPages': 18, 'encodeUrl': 'HVnlvJ9oZBGQwGIxjhO4PGbIgf8n9v/JTDXEN65JA84=', 'sRatingName': '买入', 'sRatingCode': '0201', 'market': 'SHENZHEN', 'authorID': ['11000177906', '11000233623'], 'count': 1, 'orgType': 'white'}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  /*margin-top: 60px;*/
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
