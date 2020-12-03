import axios from "axios";

export default {
    getAllBkCode: async function () {
        let today = new Date().getTime()
        let url = 'http://reportapi.eastmoney.com/report/bk?bkCode=016&_=' + today
        let resp = await axios.get(url)
        console.log(resp.data.data)
        return resp.data.data
    }
}