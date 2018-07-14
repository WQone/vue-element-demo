<template>
  <el-container style="height: 80%;">
    <el-header style="" class="header">
      <img src="../../assets/logo.png" />
      <span>比一比API数据DEMO</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>API配置</template>
            <el-menu-item index="2-1">外部数据API列表</el-menu-item>
            <el-menu-item index="2-2">计费管理
            </el-menu-item>
            <el-menu-item index="2-3">对账管理
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    return {
      tableData: Array(10).fill(item),
    };
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
<style scoped>
.header {
  text-align: left;
  font-size: 12px;
  background: #333;
  padding: 0 2.5%;
  line-height: 60px;
  font-size: 14px;
}
.header span {
  margin-left: 30px;
  font-size: 20px;
  color: #ffffff;
  vertical-align: middle;
}
.header img {
  vertical-align: middle;
}
</style>

