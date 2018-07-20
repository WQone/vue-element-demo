<template>
  <div>
    <p class="cardList_title">API-列表详情</p>
    <div class="create-body form-text" :style="formHeight" v-loading="loading">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>消费概览</span>
        </div>
        <div class="text item">
          <div id="echart" ref="mychart" style="height:300px;text-align: center;"></div>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>消费记录</span>
        </div>
        <div class="text item">
          <div class="middle">
            <div class="middle-search">
              <el-row>
                <el-col :span="12" :lg="12">
                  <div class="searchDiv">
                    <span class="searchLabel">名称</span>
                    <div class="searchInput">
                      <el-input placeholder="请输入请求进行查找" v-model="searchVal">
                      </el-input>
                    </div>
                  </div>
                </el-col>
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
            </el-col> -->
                <el-col :span="12" :lg="12">
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
          <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中" header-cell-class-name="tb-bg">
            <el-table-column prop="num" label="#" width="55">
            </el-table-column>
            <el-table-column prop="apiName" label="调用请求">
            </el-table-column>
            <el-table-column prop="createdAt" label="调用时间">
            </el-table-column>
            <el-table-column prop="amount" label="费用消耗（元）">
            </el-table-column>
            <el-table-column label="调用结果">
              <template slot-scope="scope">
                <el-button @click.native.prevent="toItem(scope.row.invokeResult)" type="text" size="small">
                  详情
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
      </el-card>
    </div>
    <div class="btn">
      <el-button plain @click="goList">返回列表</el-button>
    </div>
    <el-dialog title="API名称 - 调用结果" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="调用时间：2018-7-2">
          <el-input v-model="invokeResult" auto-complete="off" type="textarea" :rows="20"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseApi from '../../api/base';
import menu from '../../utils/menu';
import echarts from '../../utils/echartsImport'; //  按需引入echarts，降低打包体积

export default {
  created() {
    this.tableHeightRun();
    window.onresize = () => {
      this.tableHeightRun();
      this.myChart.resize();
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.mychart);
    this.myChart.setOption(this.opt); // 图表
    this.dataList();
  },
  computed: {
    opt() {
      const obj = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          height: '230',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
          },
        ],
      };
      return obj;
    },
  },
  data() {
    return {
      invokeResult: '', // 调用结果
      dialogFormVisible: false, // 弹框显示隐藏
      myChart: null,
      formHeight: 0, // 表格高度
      loading: false,
      searchVal: null, // 搜索值
      // typeActive: null, // 搜索-分组
      dateValue: null, // 搜索-时间区间
      createdAt: null,
      endAt: null,
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
      baseApi
        .apiAmount(
          this.page,
          this.size,
          this.$route.query.id,
          this.searchVal,
          this.createdAt,
          this.endAt,
        )
        .then((res) => {
          if (res.data.code === '0') {
            const data = res.data.data.result;
            for (let i = 0; i < data.length; i += 1) {
              data[i].num = i + 1 + this.page * this.size;
              data[i].createdAt = data[i].createdTime
                ? this.convert.formatDate(data[i].createdAt)
                : '';
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
      this.createdAt = this.dateValue ? this.convert.convertDate(this.dateValue[0]) : '';
      this.endAt = this.dateValue ? this.convert.convertDate(this.dateValue[1]) : '';
      console.log(this.dateValue);
      this.page = 0;
      this.dataList();
    },
    // 返回列表
    goList() {
      this.$router.push({ path: '/ApiList' });
    },
    // 点击详情
    toItem(item) {
      this.invokeResult = item;
      this.dialogFormVisible = true;
    },
    //  计算表格高度
    tableHeightRun() {
      const tableHeightFun = () => {
        this.formHeight = window.tableCustom.tableHeight(['.cardList_title', '.paging', 135]);
      };
      setTimeout(tableHeightFun, 0);
    },
  },
};
</script>

<style scoped>
.form-text .el-form-item {
  margin-bottom: 0px;
}
.form-text .w-text {
  padding: 20px;
}
.box-card {
  margin-bottom: 40px;
}
.middle {
  overflow: hidden;
  display: block;
  width: 100%;
  padding: 10px 0 5px 0;
  position: relative;
}
.middle-search {
  /* width: 400px; */
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
.el-dialog__body .el-form-item {
  width: 100%;
}
</style>
<style>
.el-dialog__body {
  padding: 0px 30px;
}
</style>

