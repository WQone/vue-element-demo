<template>
  <div>
    <el-steps :active="3" simple finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="定义API请求"></el-step>
      <el-step title="定义API后端服务"></el-step>
      <el-step title="定义返回结果"></el-step>
    </el-steps>
    <div class="create-body">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>返回结果基础定义</span>
        </div>
        <div class="text item card-body">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="Http Method">
              <el-select v-model="form.d1" placeholder="请选择Http Method">
                <el-option label="Post" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
                <el-button @click.native.prevent="toItem(scope.$index, tableData)" type="text" size="small">
                  查看
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

export default {
  mounted() {
    console.log(77, this.$store.state.view.form4);
    this.form = this.$store.state.view.form4;
  },
  data() {
    return {
      form: {
        tableData: [],
      },
    };
  },
  methods: {
    ...mapActions([
      'ClearForm',
    ]),
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
    // 上一步
    toBefore() {
      this.$router.push({ path: '/CreateThree' });
    },
    // 创建
    toNext() {
      this.ClearForm();
      this.$store.commit('form4', this.form); // 第一步
      this.$message({
        showClose: true,
        message: '创建成功',
        type: 'success',
      });
      console.log(this.form);
      this.$router.push({ path: '/ApiList' });
    },
  },
};
</script>
