export default {
    syncRequest: function (url) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url, false)
        xhr.send()
        return JSON.parse(xhr.response)
    },
    getBkCode: function(bkInfo) {
        let today = new Date().getTime()
        let url = 'http://reportapi.eastmoney.com/report/bk?bkCode=' + bkInfo + '&_=' + today
        return this.syncRequest(url)
        // let resp = await axios.get(url)
        // return resp.data.data
    },

    getAllIndustryBkCode: function () {
        this.industryBkCode = this.getBkCode('016').data
    },
    getAllRegionBkCode: function () {
        this.regionBkCode = this.getBkCode('020').data
    },
    getAllConceptBkCode: function () {
        this.conceptBkCode = this.getBkCode('007').data
    },
    getAllBrokerInfo: function() {
        let url = 'http://reportapi.eastmoney.com/report/org'
        this.brokerInfo = this.syncRequest(url).data
    },
    getSZStockInfoList: function() {
        let url = 'http://91.push2.eastmoney.com/api/qt/clist/get?'
            + 'pn=1'
            + '&pz=10000'
            + '&po=1'
            + '&np=1'
            + '&fs=m:0+t:6,m:0+t:13,m:0+t:80'
            + '&fields=f12,f14'
        let resp = this.syncRequest(url)
        resp.data.diff.forEach((stock, index) => {
            this.szStockInfoList[index] = {'code': stock['f12'], 'name': stock['f14']}
        })
    },
    getSHStockInfoList: function() {
        let url = 'http://91.push2.eastmoney.com/api/qt/clist/get?'
            + 'pn=1'
            + '&pz=10000'
            + '&po=1'
            + '&np=1'
            + '&fs=m:1+t:2,m:1+t:23'
            + '&fields=f12,f14'
        let resp = this.syncRequest(url)
        resp.data.diff.forEach((stock, index) => {
            this.shStockInfoList[index] = {'code': stock['f12'], 'name': stock['f14']}
        })
    },
    industryBkCode: [],
    regionBkCode: [],
    conceptBkCode: [],
    brokerInfo: [],
    szStockInfoList: [],
    shStockInfoList: []
}