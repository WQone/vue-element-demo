<template>
  <div>
    <p class="cardList_title">已购买API列表</p>
    <div class="cardList_body">
      <div class="middle">
        <div class="middle-search">
          <el-input placeholder="请输入数据源名称进行查找（支持模糊查询）" v-model="searchVal">
            <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
          </el-input>
          <!-- <el-row>
            <el-col :span="10" :lg="24">
              <div class="searchDiv">
                <span class="searchLabel">名称</span>
                <div class="searchInput">
                  <el-input placeholder="请输入数据源名称进行查找（支持模糊查询）" v-model="searchVal">
                  </el-input>
                </div>
              </div>
            </el-col> -->
            <!-- <el-col :span="10" :lg="8">
              <div class="searchDiv">
                <span class="searchLabel">分组</span>
                <div class="searchInput">
                  <el-select v-model="typeActive" placeholder="请选择" clearable>
                    <el-option v-for="item in typeArr" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="10" :lg="8">
              <div class="searchDiv">
                <span class="searchLabel">时间区间</span>
                <div class="searchInput">
                  <el-date-picker v-model="dateValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
            </el-col> -->
          <!-- </el-row> -->
        </div>
        <!-- <div class="middle-btn">
          <el-button type="primary" icon="el-icon-search" @click="toSearch"></el-button>
        </div> -->
      </div>
      <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中" header-cell-class-name="tb-bg" :height="tableHeight">
        <el-table-column prop="num" label="#" header-align="center" width="55">
        </el-table-column>
        <el-table-column prop="apiName" label="API名称" header-align="center">
        </el-table-column>
        <!-- <el-table-column prop="groupId" label="分组" header-align="center">
        </el-table-column> -->
        <el-table-column prop="factoryName" label="厂商" header-align="center">
        </el-table-column>
        <el-table-column prop="totalAmount" label="已使用金额" header-align="center">
        </el-table-column>
        <!-- <el-table-column prop="address" label="开通时间" header-align="center">
        </el-table-column>
        <el-table-column prop="address" label="到期时间" header-align="center">
        </el-table-column> -->
        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="toItem(scope.row.apiId)" type="text" size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
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
      searchVal: null, // 搜索值
      typeActive: null, // 搜索-分组
      dateValue: null, // 搜索-时间区间
      dateValueS: null,
      currentPage: 1,
      tableData: [],
      typeArr: menu.typeArr,
      page: 0,
      size: 10,
      total: 0,
    };
  },
  methods: {
    // 获取列表
    dataList() {
      this.loading = true;
      baseApi.chargingList(this.page, this.size,
        this.typeActive, this.searchVal, this.dateValueS).then((res) => {
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
      this.dataList();
      console.log(`当前页: ${val}`);
    },
    // 点击搜索
    toSearch() {
      this.dateValueS = this.dateValue ? `${this.convert.convertDateOther(this.dateValue[0])}-${this.convert.convertDateOther(this.dateValue[1])}` : '';
      console.log(this.dateValue);
      this.page = 0;
      this.dataList();
    },
    // 查看详情
    toItem(id) {
      this.$router.push({ path: '/Charging/Item', query: { id } });
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
  position: relative;
}
.middle-search {
  width: 400px;
  float: left;
}
.middle-btn {
  float: right;
  position: absolute;
  right: 15px;
}
.middle-btn button {
  font-weight: bolder;
  color: #909399;
  background-color: #f5f7fa;
  border-color: #dcdfe6;
}
.block {
  float: right;
  padding: 20px 0;
}
/* .searchDiv {
  position: relative;
}

.searchLabel {
  position: absolute;
  text-align: right;
  width: 65px;
  line-height: 40px;
  top: 0;
  left: 0;
  box-sizing: border-box;
  font-size: 14px;
}
.searchInput {
  position: relative;
  width: 100%;
  padding-left: 75px;
  box-sizing: border-box;
}
.searchInput .el-select {
  display: block;
}
.searchInput .el-date-editor--daterange.el-input__inner {
  width: 100%;
} */
</style>
