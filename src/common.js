import axios from "axios";
import IndustryReport from "./pages/IndustryReport";

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
        IndustryReport.data().brokerKey++
    },
    industryBkCode: [],
    regionBkCode: [],
    conceptBkCode: [],
    brokerInfo: []
}