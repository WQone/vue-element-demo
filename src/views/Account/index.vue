<template>
  <div>
    <p class="cardList_title">对账管理</p>
    <div class="cardList_body">
      <div class="middle">
        <div class="middle-search">
          <el-input placeholder="请输入厂商名称进行查找（支持模糊查询）" v-model="searchVal">
            <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中" header-cell-class-name="tb-bg" :height="tableHeight">
        <el-table-column prop="factoryName" label="厂商" header-align="center">
        </el-table-column>
        <el-table-column prop="apiName" label="API名称" header-align="center">
        </el-table-column>
        <el-table-column prop="groupId" label="分组" header-align="center">
        </el-table-column>
        <el-table-column prop="totalAmount" label="已使用金额" header-align="center">
        </el-table-column>
        <el-table-column prop="address" label="已开通时间" header-align="center">
        </el-table-column>
        <el-table-column prop="zip" label="到期时间" header-align="center">
        </el-table-column>
      </el-table>
      <div class="paging">
        <div class="page_left">
          <el-button type="primary" @click="outData">数据导出</el-button>
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
      searchVal: '',
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
      baseApi.accountList(this.page, this.size, this.searchVal).then((res) => {
        if (res.data.code === '0') {
          const data = res.data.data.result;
          for (let i = 0; i < data.length; i += 1) {
            data[i].num = (i + 1) + (this.page * this.size);
            data[i].createdTime = data[i].createdTime ? this.convert.formatDate(data[i].createdTime) : '';
            if (data[i].groupId) {
              const arr = menu.typeArr.filter((item) => item.id === data[i].groupId);
              data[i].groupId = arr[0].name;
            }
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
    // 点击搜索
    toSearch() {
      this.page = 0;
      this.dataList();
    },
    // 数据导出
    outData() {
      const form = {
        apiName: this.searchVal,
      };
      const url = baseApi.accountExport(form);
      window.open(url);
      console.log('数据导出', url);
    },
    //  计算表格高度
    tableHeightRun() {
      const tableHeightFun = () => {
        this.tableHeight = window.tableCustom.tableHeight(['.cardList_title', '.paging', 135]);
      };
      setTimeout(tableHeightFun, 0);
    },
  },
};
</script>

<style scoped>
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
.middle-btn {
  float: right;
}
.block {
  float: right;
  padding: 20px 0;
}
</style>
