<template>
  <div>
    <p class="cardList_title">外部数据API列表</p>
    <div class="cardList_body">
      <ul class="cardList_ul">
        <li class="cardList_body_list" v-for="(item, index) in typeArr" :key="index" @click="changeType(index)" :class="{ 'cardList_body_list_avtive': index === typeActive }">{{item}}</li>
      </ul>
      <div class="middle">
        <div class="middle-search">
          <el-input placeholder="请输入数据源名称进行查找（支持模糊查询）" v-model="searchVal">
            <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中" header-cell-class-name="tb-bg" :height="tableHeight">
        <el-table-column prop="num" label="#" header-align="center" width="55">
        </el-table-column>
        <el-table-column prop="date" label="API名称" header-align="center">
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
            <el-button @click.native.prevent="toItem(scope.$index)" type="text" size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <div class="page_left">
          <el-button type="primary" @click="toCreatePage">创建API</el-button>
        </div>
        <div class="block page_right">
          <el-pagination @current-change="CurrentChange" :page-size="size" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.tableHeightRun();
    window.onresize = () => {
      this.tableHeightRun();
    };
  },
  mounted() {
    this.dataList();
  },
  data() {
    return {
      tableHeight: 0, // 表格高度
      loading: false,
      searchVal: null,
      tableData: [],
      typeArr: ['工商数据', '司法数据', '经营数据', '税务数据', '企业年报', '项目信息', '知识产权', '招投标（采购）', '税务数据', '业务流水', '征信数据', '其他数据'],
      typeActive: 0,
      page: 0,
      size: 5,
      total: 0,
    };
  },
  methods: {
    // 获取列表
    dataList(page, size, filterForm) {
      this.loading = true;
      if (page !== undefined) this.page = page;
      if (size !== undefined) this.size = size;
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀',
        zip: 200333,
      };
      this.tableData = [];
      for (let i = 0; i < 5; i += 1) {
        this.tableData.push({
          ...item,
          num: (i + 1) + (this.page * this.size),
        });
      }
      this.total = this.tableData.length;
      setTimeout(() => {
        this.loading = false;
        console.log(page, size, filterForm);
      }, 500);
    },
    // 当前页改变
    CurrentChange(val) {
      this.dataList(val);
      console.log(`当前页: ${val}`);
    },
    // 查看详情
    toItem(index, data) {
      this.$router.push({ path: '/ApiList/Item' });
      console.log(index, data);
    },
    // 点击数据类型
    changeType(index) {
      this.typeActive = index;
      this.dataList();
      console.log(index);
    },
    // 点击搜索
    toSearch() {
      this.dataList(this.page, this.size, this.searchVal);
    },
    // 创建API
    toCreatePage() {
      this.$router.push({ path: '/CreateOne' });
    },
    //  计算表格高度
    tableHeightRun() {
      const tableHeightFun = () => {
        this.tableHeight = window.tableCustom.tableHeight(['.cardList_title', '.cardList_ul', '.paging', 135]);
      };
      setTimeout(tableHeightFun, 0);
    },
  },
};
</script>

<style scoped>
ul {
  float: left;
  padding: 5px 0 0 0;
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
  padding: 10px 0 5px 0;
}
.middle-search {
  width: 400px;
  float: left;
}
/* .middle-btn {
  float: right;
} */
.block {
  float: right;
  padding: 20px 0;
}
.cardList_body_list_avtive {
  background: green;
  color: white;
}
</style>

