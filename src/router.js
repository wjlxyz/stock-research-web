import Vue from 'vue'
import VueRouter from 'vue-router'
import MacroSearch from "./pages/MacroSearch";
import IndustryReport from "./pages/IndustryReport";
import StockReport from "./pages/StockReport";
import StrategyReport from "./pages/StrategyReport";
import BrokerMorningBriefing from "./pages/BrokerMorningBriefing";
import HomePage from "./pages/HomePage";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',

    routes: [
        {path: '/', name: 'HomePage', component: HomePage},
        {path: '/MacroSearch', name: 'MacroSearch', component: MacroSearch},
        {path: '/IndustryReport', name: 'IndustryReport', component: IndustryReport},
        {path: '/StockReport', name: 'StockReport', component: StockReport},
        {path: '/StrategyReport', name: 'StrategyReport', component: StrategyReport},
        {path: '/BrokerMorningBriefing', name: 'BrokerMorningBriefing', component: BrokerMorningBriefing}
    ]
})