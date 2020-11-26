<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
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
</style>
