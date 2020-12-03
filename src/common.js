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
        return this.getBkCode('016')
    },
    getAllRegionBkCode: async function () {
        return this.getBkCode('020')
    },
    getAllConceptBkCode: async function () {
        return this.getBkCode('007')
    }
}