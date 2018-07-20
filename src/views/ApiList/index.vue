<template>
  <div>
    <p class="cardList_title">外部数据API列表</p>
    <div class="cardList_body">
      <ul class="cardList_ul">
        <li class="cardList_body_list" v-for="(item, index) in typeArr" :key="index" @click="changeType(item.id)" :class="{ 'cardList_body_list_avtive': item.id === typeActive }">{{item.name}}</li>
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
        <el-table-column prop="apiName" label="API名称" header-align="center">
        </el-table-column>
        <el-table-column prop="accessType" label="类型" header-align="center">
        </el-table-column>
        <el-table-column prop="groupId" label="分组" header-align="center">
        </el-table-column>
        <el-table-column prop="description" label="描述" header-align="center">
        </el-table-column>
        <el-table-column prop="createdTime" label="最后修改" header-align="center" min-width='100'>
        </el-table-column>
        <el-table-column prop="factoryName" label="厂商名称" header-align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="toItem(scope.row.apiId)" type="text" size="small">
              查看详情
            </el-button>
            <!-- <el-button @click.native.prevent="toTest(scope.row.apiId)" type="text" size="small">
              调用API
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <div class="page_left">
          <el-button type="primary" @click="toCreatePage">创建API</el-button>
        </div>
        <div class="block page_right">
          <el-pagination @current-change="CurrentChange" :page-size="size" layout="total, prev, pager, next" :total="total" :current-page="page + 1">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseApi from '../../api/base';
import menu from '../../utils/menu';

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
      typeArr: menu.typeArr,
      typeActive: null,
      page: 0,
      size: 10,
      total: 0,
    };
  },
  methods: {
    // 获取列表
    dataList() {
      this.loading = true;
      baseApi.apiFind(this.page, this.size, this.typeActive, this.searchVal).then((res) => {
        if (res.data.code === '0') {
          const data = res.data.data.result;
          for (let i = 0; i < data.length; i += 1) {
            data[i].num = i + 1 + this.page * this.size;
            data[i].createdTime = data[i].createdTime
              ? this.convert.formatDate(data[i].createdTime)
              : '';
            const arr = menu.typeArr.filter((item) => item.id === data[i].groupId);
            data[i].groupId = arr[0].name;
          }
          this.tableData = data;
          this.total = res.data.data.total;
        }
        this.loading = false;
      });
    },
    // 当前页改变
    CurrentChange(val) {
      this.page = val - 1;
      this.dataList(val);
      console.log(`当前页: ${val}`);
    },
    // 查看详情
    toItem(id) {
      this.$router.push({ path: '/ApiList/Item', query: { id } });
    },
    toTest(id) {
      baseApi.routeTest(id).then((res) => {
        if (res.data.code === '0') {
          this.$message({
            message: '调用成功',
            type: 'success',
          });
        }
      });
    },
    // 点击数据类型
    changeType(index) {
      this.page = 0;
      if (this.typeActive === index) {
        this.typeActive = null;
      } else {
        this.typeActive = index;
      }
      this.dataList();
      console.log(index);
    },
    // 点击搜索
    toSearch() {
      this.page = 0;
      this.dataList();
    },
    // 创建API
    toCreatePage() {
      this.$router.push({ path: '/CreateOne' });
    },
    //  计算表格高度
    tableHeightRun() {
      const tableHeightFun = () => {
        this.tableHeight = window.tableCustom.tableHeight([
          '.cardList_title',
          '.cardList_ul',
          '.paging',
          135,
        ]);
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

