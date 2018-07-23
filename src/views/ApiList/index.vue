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
        <el-table-column prop="apiId" label="apiId" header-align="center">
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
            <el-button @click.native.prevent="openDialog(scope.row.apiId)" type="text" size="small">
              调用API
            </el-button>
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
    <el-dialog title="调用API" :visible.sync="dialogShow" width="40%" custom-class="dialog-custom">
      <el-form label-width="100px">
        <el-form-item label="apiId">
          <el-input v-model="id" :disabled="true">
            <el-button slot="append" @click="toTest" style="background: #409EFF;color:#fff;border-radius:0px;">调用API</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="参数">
          <el-input v-model="params" type="textarea" :rows="5">
          </el-input>
        </el-form-item>
        <el-form-item label="调用结果">
          <div v-html="invokeResult" :style="dialogHeight" style="overflow-y:auto;background: #f2f2f2;margin: 10px 0;padding:10px;text-align:left;">
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseApi from '../../api/base';
import menu from '../../utils/menu';
import JSONfmatter from '../../utils/JSONfmatter';

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
  computed: {
    dialogHeight() {
      return `height: ${window.innerHeight - 580}px; overflow-y: auto;`;
    },
  },
  data() {
    return {
      invokeResult: '', // 返回结果
      id: '',
      params: '', // 传参
      dialogShow: false, // 弹框
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
    // 查看详情
    toItem(id) {
      this.$router.push({ path: '/ApiList/Item', query: { id } });
    },
    openDialog(id) {
      this.id = id;
      this.params = '';
      this.invokeResult = '';
      this.dialogShow = true;
    },
    toTest() {
      baseApi.routeTest(this.id, this.params).then((res) => {
        if (res.data.code === '0') {
          this.$message({
            message: '调用成功',
            type: 'success',
          });
          this.invokeResult = JSONfmatter(res.data.data);
          // this.dialogShow = false;
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
<style>
.el-input.is-disabled .el-input__inner {
  color: #585858;
}
.el-dialog__body {
  padding: 0px 30px;
}
.dialog-custom .el-form-item {
  width: 90%;
}
.dialog-custom .el-form-item:last-child {
  margin-bottom:5px;
}
.el-input-group__append{
  border-radius:0px;
}
</style>
