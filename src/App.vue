<template>
    <div id="app">
        <el-header>
            <el-header style="text-align: left; font-size: 24px">
                <router-link :to="{name: 'HomePage'}">主页</router-link>
            </el-header>
        </el-header>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="160px" style="background-color: rgb(238, 241, 246)">
                <el-menu class="el-menu-vertical-demo" :default-openeds="['1']" :unique-opened="true" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <router-link :to="{name: 'MacroSearch'}"><i class="el-icon-menu"></i>宏观研究</router-link>
                        </template>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <router-link :to="{name: 'IndustryReport'}"><i class="el-icon-menu"></i>行业研报</router-link>
                        </template>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <router-link :to="{name: 'StockReport'}"><i class="el-icon-menu"></i>个股研报</router-link>
                        </template>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <router-link :to="{name: 'StrategyReport'}"><i class="el-icon-menu"></i>策略报告</router-link>
                        </template>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <router-link :to="{name: 'BrokerMorningBriefing'}"><i class="el-icon-menu"></i>券商晨会
                            </router-link>
                        </template>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <router-link :to="{name: 'BrokerMorningBriefing'}"><i class="el-icon-menu"></i>龙虎榜
                            </router-link>
                        </template>
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
            // this.common.getSHStockInfoList()
            // this.common.getSZStockInfoList()
        },
        data() {
            return {
                isCollapse: false
            }
        },
    }

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

    .el-main {
        overflow: hidden;
        height: fit-content;
    }
    li.is-opened {
        background: #8cc5ff;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 160px;
        min-height: 400px;
    }
    .el-submenu__title {

    }
</style>
