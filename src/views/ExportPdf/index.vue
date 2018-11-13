<template>
  <div id="pdfDom">
    <div class="cardList_body">
      <div class="middle">
        <div class="middle-search">
          <el-input placeholder="请输入数据源名称进行查找（支持模糊查询）" v-model="searchVal">
            <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
          </el-input>
        </div>
        <div class="middle-btn">
          <el-button type="primary" @click="outPdf">导出PDF</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;margin: 10px 0;" border fit v-loading="loading" element-loading-text="拼命加载中" header-cell-class-name="tb-bg">
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
            <el-button @click.native.prevent="toItem(scope.$index, tableData)" type="text" size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详情" :visible.sync="centerDialogVisible" width="30%" center>
        <span>XXXXXXXXXXXXXXXXXXXXX</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div class="block">
        <el-pagination @current-change="CurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 导出页面为PDF格式
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';

export default {
  mounted() {
    console.log(1);
    this.test();
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
      centerDialogVisible: false,
      loading: false,
      searchVal: null,
      currentPage: 1,
      tableData: Array(5).fill(item),
      htmlTitle: '我是PDF',
    };
  },
  methods: {
    async test() {
      await this.value();
      console.log(12);
    },
    value() {
      console.log(11);
    },
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
      this.centerDialogVisible = true;
      console.log(index, data);
    },
    // 点击搜索
    toSearch() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      console.log(this.searchVal);
    },
    outPdf() {
      console.log('导出Pdf');
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true,
      }).then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        const pageHeight = (contentWidth / 592.28) * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        const imgWidth = 595.28;
        const imgHeight = (592.28 / contentWidth) * contentHeight;
        const pageData = canvas.toDataURL('image/jpeg', 1.0);
        const PDF = new JsPDF('', 'pt', 'a4');
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        PDF.save(`${this.htmlTitle}.pdf`);
      });
    },
  },
};
</script>

<style scoped>
ul {
  float: left;
  padding: 5px 0 5px 0;
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
