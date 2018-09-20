<template>
  <div>
    <div class="cardList_body">
      <div class="middle">
        <div class="middle-search">
          <el-input placeholder="请输入厂商名称进行查找（支持模糊查询）" v-model="searchVal">
            <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
          </el-input>
        </div>
        <div class="middle-btn">
          <el-button type="primary" @click="outData">数据导出</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中" header-cell-class-name="tb-bg" id="out-table">
        <el-table-column prop="name" label="厂商" header-align="center">
        </el-table-column>
        <el-table-column prop="date" label="API名称" header-align="center">
        </el-table-column>
        <el-table-column prop="province" label="分组" header-align="center">
        </el-table-column>
        <el-table-column prop="city" label="已使用金额" header-align="center">
        </el-table-column>
        <el-table-column prop="address" label="已开通时间" header-align="center">
        </el-table-column>
        <el-table-column prop="zip" label="到期时间" header-align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="toItem(scope.$index)" type="text" size="small">
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
  </div>
</template>

<script>
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀44444444444444sddd',
      zip: 200333,
    };
    return {
      loading: false,
      searchVal: null,
      currentPage: 1,
      tableData: Array(5).fill(item),
      typeArr: [
        '工商数据',
        '司法数据',
        '经营数据',
        '税务数据',
        '企业年报',
        '项目信息',
        '知识产权',
        '招投标（采购）',
        '税务数据',
        '业务流水',
        '征信数据',
        '其他数据',
      ],
      typeActive: 0,
      filename: '测试Excel',
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
    // 直接导出
    exportExcel() {
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
      /* get binary string as output */
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx');
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
      }
      return wbout;
    },
    // 自定义数据导出
    outData() {
      console.log('数据导出');
      import('@/utils/Excel/Export2Excel').then((excel) => {
        const tHeader = ['Date', 'Address', 'Author', 'Readings', 'yes'];
        const filterVal = ['date', 'address', 'author', 'pageviews', 'display_time'];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        console.log(data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: true, // 表格适应宽度
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
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
