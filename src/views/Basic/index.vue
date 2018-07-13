<template>
  <div>
    <ul>
      <li class="cardList_body_list" v-for="(item, index) in typeArr" :key="index" @click="changeType(index)" :class="{ 'cardList_body_list_avtive': index === typeActive }">{{item}}</li>
    </ul>
    <div class="middle">
      <div class="middle-search">
        <el-input placeholder="请输入数据源名称进行查找（支持模糊查询）" v-model="searchVal">
          <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
        </el-input>
      </div>
      <div class="middle-btn">
        <el-button type="primary" @click="toCreatePage">创建API</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column prop="date" label="API名称" header-align="center" header-cell-class-name="wuqian">
      </el-table-column>
      <el-table-column prop="name" label="类型" header-align="center">
      </el-table-column>
      <el-table-column prop="province" label="分组" header-align="center">
      </el-table-column>
      <el-table-column prop="city" label="描述" header-align="center">
      </el-table-column>
      <el-table-column prop="address" label="最后修改" header-align="center">
      </el-table-column>
      <el-table-column prop="zip" label="厂商名称" header-align="center">
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="toItem(scope.$index, tableData)" type="text" size="small">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="CurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333,
    };
    return {
      loading: false,
      searchVal: null,
      currentPage: 1,
      tableData: Array(10).fill(item),
      typeArr: ['工商数据', '司法数据', '经营数据', '税务数据', '企业年报', '项目信息', '知识产权', '招投标（采购）', '税务数据', '业务流水', '征信数据', '其他数据'],
      typeActive: 0,
    };
  },
  methods: {
    // 当前页改变
    CurrentChange(val) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      console.log(`当前页: ${val}`);
    },
    // 查看详情
    toItem(index, data) {
      console.log(index, data);
    },
    // 点击数据类型
    changeType(index) {
      this.typeActive = index;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      console.log(index);
    },
    // 点击搜索
    toSearch() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      console.log(this.searchVal);
    },
    // 创建API
    toCreatePage() {
      this.$router.push({ path: '/Create' });
    },
  },
};
</script>

<style>
.wuqian {
  background: red;
}
</style>

<style scoped>
ul {
  float: left;
  padding: 10px 0 10px 0;
}
.cardList_body_list {
  float: left;
  padding: 7px 15px;
  background: #ccc;
  color: black;
  margin-right: 18px;
  margin-bottom: 18px;
}
.middle {
  overflow: hidden;
  display: block;
  width: 100%;
  padding: 20px 0;
}
.middle-search {
  width: 400px;
  float: left;
}
.middle-btn {
  float: right;
}
.block {
  float: right;
  padding: 20px 0;
}
.cardList_body_list_avtive {
  background: green;
  color: white;
}
</style>

