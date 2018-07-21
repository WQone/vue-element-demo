<template>
  <div>
    <p class="cardList_title">{{graphForm.apiName}}-消费详情</p>
    <div class="create-body form-text" :style="formHeight" v-loading="loading">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>消费概览</span>
        </div>
        <div class="text item">
          <el-row style="height: 70px;line-height: 70px;width: 90%;margin: auto;font-size:14px;">
            <el-col :span="8">消费总额（元）：{{graphForm.totalAmount}}</el-col>
            <el-col :span="8">调用次数（次）：{{graphForm.count}} </el-col>
            <el-col :span="8">接入时间：{{graphForm.createdTime}}</el-col>
          </el-row>
          <div id="echart" ref="mychart" style="height:290px;text-align: center;"></div>
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
                <!-- <el-col :span="12" :lg="12">
                  <div class="searchDiv">
                    <span class="searchLabel">名称</span>
                    <div class="searchInput">
                      <el-input placeholder="请输入请求进行查找" v-model="searchVal">
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
            </el-col> -->
                <el-col :span="24" :lg="24">
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
          <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit header-cell-class-name="tb-bg">
            <el-table-column prop="num" label="#" width="55">
            </el-table-column>
            <el-table-column prop="url" label="调用请求" min-width="120">
            </el-table-column>
            <el-table-column prop="createdAt" label="调用时间">
            </el-table-column>
            <el-table-column prop="amount" label="费用消耗（元）">
            </el-table-column>
            <el-table-column label="调用结果">
              <template slot-scope="scope">
                <el-button @click.native.prevent="toItem(scope.row)" type="text" size="small">
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" custom-class="dialog-custom">
      <div style="height: 50px;line-height: 50px;font-size:15px;">调用时间:
        <span style="margin-left:10px;">{{createdAtDg}}</span>
      </div>
      <div style="height: 20px;line-height: 20px;font-size:15px">调用结果:</div>
      <div v-html="invokeResult" :style="dialogHeight" style="overflow-y:auto;background: #f2f2f2;margin: 10px 0;padding:10px;">
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseApi from '../../api/base';
import menu from '../../utils/menu';
import JSONfmatter from '../../utils/JSONfmatter';
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
    this.dataList();
    this.graphList();
  },
  computed: {
    dialogHeight() {
      return `height: ${window.innerHeight - 380}px; overflow-y: auto;`;
    },
    opt() {
      const obj = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        color: ['#3398DB'],
        grid: {
          left: '2%',
          right: '2%',
          bottom: '1%',
          height: '260',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.graphData.date,
          // axisTick: {
          //   interval: 0,
          //   alignWithLabel: true,
          // },
          axisLabel: { rotate: 50, interval: 0 },
        },
        yAxis: {
          type: 'value',
          name: '( 次  )',
        },
        series: [
          {
            data: this.graphData.count,
            type: 'line',
          },
        ],
      };
      return obj;
    },
  },
  data() {
    return {
      title: '',
      invokeResult: '', // 调用结果
      createdAtDg: '', // 调用时间
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
      graphData: {
        date: [],
        count: [],
      }, // 图表数据
      graphForm: {},
    };
  },
  methods: {
    // 获取图表
    graphList() {
      baseApi.graphAmount(this.$route.query.id).then((res) => {
        if (res.data.code === '0') {
          const data = res.data.data.list;
          const a = [];
          const b = [];
          for (let j = -30; j < 1; j += 1) {
            b.push('');
            a.push(this.convert.getDay(j));
          }
          for (let i = 0; i < data.length; i += 1) {
            if (a.indexOf(data[i].date) > -1) {
              const index = a.indexOf(data[i].date);
              b[index] = data[i].count;
            }
          }
          console.log(a, b);
          this.graphData = {
            date: a,
            count: b,
          };
          this.graphForm = res.data.data.head;
          this.myChart.setOption(this.opt); // 图表
        }
      });
    },
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
      this.$router.push({ path: '/Charging' });
    },
    // 点击详情
    toItem(item) {
      console.log('22', JSONfmatter(item));
      // this.invokeResult = JSONfmatter(JSON.parse(item));
      this.title = `${item.apiName} - 调用结果`;
      this.createdAtDg = item.createdAt;
      this.invokeResult = JSONfmatter(JSON.parse(item.invokeResult));
      this.dialogFormVisible = true;
    },
    //  计算表格高度
    tableHeightRun() {
      const tableHeightFun = () => {
        this.formHeight = `height: ${window.tableCustom.tableHeight([
          '. cardList_title',
          '.btn',
          200,
        ])}px;`;
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
  margin-bottom: 30px;
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
.dialog-custom {
  margin-top: 10vh !important;
  text-align: left;
}
</style>

