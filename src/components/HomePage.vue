<template>
    <div id="homepage">
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
                <el-menu :default-openeds="['1']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>宏观研究</template>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>行业研报</template>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-menu"></i>个股研报</template>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-menu"></i>策略报告</template>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-menu"></i>券商晨会</template>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <Report></Report>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Report from "./Report";
    export default {
        name: 'HelloWorld',
        components: {Report}
    }
</script>


<style scoped>
#homepage {
  height: 100%;
  width: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

</style>