<template>
  <div>
    <p class="cardList_title">已购买API列表</p>
    <div class="cardList_body">
      <div class="middle">
        <div class="middle-search">
          <el-row>
            <el-col :span="10" :lg="8">
              <div class="searchDiv">
                <span class="searchLabel">名称</span>
                <div class="searchInput">
                  <el-input placeholder="请输入数据源名称进行查找（支持模糊查询）" v-model="searchVal">
                    <!-- <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button> -->
                  </el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="10" :lg="8">
              <div class="searchDiv">
                <span class="searchLabel">分组</span>
                <div class="searchInput">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
            </el-col>
          </el-row>
        </div>
        <div class="middle-btn">
          <el-button type="primary" icon="el-icon-search" @click="toSearch"></el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中" header-cell-class-name="tb-bg" :height="tableHeight">
        <el-table-column prop="date" label="API名称" header-align="center">
        </el-table-column>
        <el-table-column prop="province" label="分组" header-align="center">
        </el-table-column>
        <el-table-column prop="zip" label="厂商" header-align="center">
        </el-table-column>
        <el-table-column prop="city" label="已使用金额" header-align="center">
        </el-table-column>
        <el-table-column prop="address" label="开通时间" header-align="center">
        </el-table-column>
        <el-table-column prop="address" label="到期时间" header-align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="toItem(scope.$index, tableData)" type="text" size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <div class="block page_right">
          <el-pagination @current-change="CurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="100">
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
      const docWidth = document.body.clientWidth;
      const mainBody = document.getElementsByClassName('main-body');
      if (docWidth > 1180 && docWidth < 1400) {
        mainBody[0].style.minWidth = '1200px';
      } else {
        mainBody[0].removeAttribute('style');
      }
      // console.log(document.body.clientWidth);
      this.tableHeightRun();
    };
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀',
      zip: 200333,
    };
    return {
      tableHeight: 0, // 表格高度
      loading: false,
      searchVal: null,
      currentPage: 1,
      tableData: Array(5).fill(item),
      typeArr: ['工商数据', '司法数据', '经营数据', '税务数据', '企业年报', '项目信息', '知识产权', '招投标（采购）', '税务数据', '业务流水', '征信数据', '其他数据'],
      typeActive: 0,
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
      dateValue: '',
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
      this.dateValue = this.dateValue ? `${this.convert.convertDateOther(this.dateValue[0])}-${this.convert.convertDateOther(this.dateValue[1])}` : '';
      console.log(this.dateValue);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      console.log(this.searchVal);
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
.searchDiv {
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
}
</style>
