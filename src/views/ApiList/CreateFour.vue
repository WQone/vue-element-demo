<template>
  <div>
    <el-steps :active="3" simple finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="定义API请求"></el-step>
      <el-step title="定义API后端服务"></el-step>
      <el-step title="定义返回结果"></el-step>
    </el-steps>
    <div class="create-body" :style="formHeight">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>返回结果基础定义</span>
        </div>
        <div class="text item card-body">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="返回ContentType">
              <el-select v-model="form.d1" placeholder="请选择返回ContentType">
                <el-option value="JSON"></el-option>
                <el-option value="XML"></el-option>
                <el-option value="文本"></el-option>
                <el-option value="HTML"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="返回结果示例">
              <el-input type="textarea" :rows="5" v-model="form.d2"></el-input>
            </el-form-item>
            <el-form-item label="失败结果示例">
              <el-input type="textarea" :rows="5" v-model="form.d3"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>错误定义</span>
        </div>
        <div class="text item">
          <el-table :data="form.tableData" border style="width: 100%" header-cell-class-name="tb-bg" fit>
            <el-table-column prop="n1" label="错误码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n1" placeholder="错误码"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n2" label="错误信息">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n2" placeholder="错误信息"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n3" label="描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n3" placeholder="描述"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteData(scope.$index)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin: 10px 0" size="small" icon="el-icon-plus" @click.native.prevent="createNewData">
            增加一条
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="btn">
      <el-button type="info" @click="toBefore">上一步</el-button>
      <el-button type="primary" @click="toNext">创建</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import bases from '../../api/base';

export default {
  created() {
    this.tableHeightRun();
    window.onresize = () => {
      this.tableHeightRun();
    };
  },
  mounted() {
    this.getLocal();
  },
  data() {
    return {
      formHeight: `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 200])}px;`, // 表单高度
      form: {
        tableData: [],
      },
    };
  },
  methods: {
    // 获取本地存储数据
    getLocal() {
      const base = window.sessionStorage.getItem('form4');
      if (base && base !== '{}') {
        this.form = this.convert.getJSON(base);
        console.log(787, this.form);
      }
    },
    // 新增一条数据
    createNewData() {
      const a = {
        n1: '',
        n2: '',
        n3: '',
        n4: '',
        n5: '',
        n6: '',
        n7: '',
        n8: '',
      };
      this.form.tableData.push(a);
    },
    // 删除该行数据
    deleteData(index) {
      this.form.tableData.splice(index, 1);
      console.log(index, this.form.tableData);
    },
    // 上一步
    toBefore() {
      window.sessionStorage.setItem('form4', JSON.stringify(this.form));
      this.$router.push({ path: '/CreateThree' });
    },
    // 创建
    toNext() {
      const a = {
        ...this.convert.getJSON(window.sessionStorage.getItem('form1')),
        requestConfig: JSON.stringify(this.convert.getJSON(window.sessionStorage.getItem('form2'))),
        requestParameters: JSON.stringify(this.convert.getJSON(window.sessionStorage.getItem('form2')).requestParameters),
        serviceConfig: JSON.stringify(this.convert.getJSON(window.sessionStorage.getItem('form3'))),
        ServiceParameters: JSON.stringify(this.convert.getJSON(window.sessionStorage.getItem('form3')).ServiceParameters),
      };
      console.log(a);
      bases.apiAdd(JSON.stringify(a)).then((res) => {
        if (res.data.code === '0') {
          this.$message({
            showClose: true,
            message: '创建成功',
            type: 'success',
          });
          window.sessionStorage.clear();
          this.$router.push({ path: '/ApiList' });
        }
        console.log(this.form);
      });
    },
    //  计算表格高度
    tableHeightRun() {
      const tableHeightFun = () => {
        this.formHeight = `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 200])}px;`;
      };
      setTimeout(tableHeightFun, 0);
    },
  },
};
</script>
