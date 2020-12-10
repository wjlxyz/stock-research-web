import axios from "axios";

export default {
    getBkCode: async function(bkInfo) {
        let today = new Date().getTime()
        let url = 'http://reportapi.eastmoney.com/report/bk?bkCode=' + bkInfo + '&_=' + today
        let resp = await axios.get(url)
        console.log(resp.data.data)
        return resp.data.data
    },

    getAllIndustryBkCode: async function () {
        this.industryBkCode = this.getBkCode('016')
        console.log(this.industryBkCode)
    },
    getAllRegionBkCode: async function () {
        this.regionBkCode = this.getBkCode('020')
    },
    getAllConceptBkCode: async function () {
        this.conceptBkCode = this.getBkCode('007')
    },
    getAllBrokerInfo: async function() {
        let url = 'http://reportapi.eastmoney.com/report/org'
        let resp = await axios.get(url)
        this.brokerInfo = resp.data.data
    },
    getSZStockInfoList: async function() {
        let url = 'http://91.push2.eastmoney.com/api/qt/clist/get?'
            + 'pn=1'
            + '&pz=10000'
            + '&po=1'
            + '&np=1'
            + '&fs=m:0+t:6,m:0+t:13,m:0+t:80'
            + '&fields=f12,f14'
        let resp = await axios.get(url)
        resp.data.data.diff.forEach((stock, index) => {
            this.szStockInfoList[index] = {'code': stock['f12'], 'name': stock['f14']}
        })
        this.szStockInfoList = resp.data.data.diff
        console.log(this.szStockInfoList)
    },
    getSHStockInfoList: async function() {
        let url = 'http://91.push2.eastmoney.com/api/qt/clist/get?'
            + 'pn=1'
            + '&pz=10000'
            + '&po=1'
            + '&np=1'
            + '&fs=m:1+t:2,m:1+t:23'
            + '&fields=f12,f14'
        let resp = await axios.get(url)
        resp.data.data.diff.forEach((stock, index) => {
            this.shStockInfoList[index] = {'code': stock['f12'], 'name': stock['f14']}
        })
        this.shStockInfoList = resp.data.data.diff
        console.log(this.shStockInfoList)
    },
    industryBkCode: [],
    regionBkCode: [],
    conceptBkCode: [],
    brokerInfo: [],
    szStockInfoList: [],
    shStockInfoList: []
}