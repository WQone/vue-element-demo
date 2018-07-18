<template>
  <div>
    <el-steps :active="1" simple finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="定义API请求"></el-step>
      <el-step title="定义API后端服务"></el-step>
      <el-step title="定义返回结果"></el-step>
    </el-steps>
    <div class="create-body" :style="formHeight">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>请求基础定义</span>
        </div>
        <div class="text item card-body">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="协议">
              <el-checkbox-group v-model="form.protocol">
                <el-checkbox label="http" name="type"></el-checkbox>
                <el-checkbox label="https" name="type"></el-checkbox>
                <el-checkbox label="webSocket" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="请求地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="请求Path">
              <el-input v-model="form.path"></el-input>
              <p>请求Path必须包含请求参数中的Parameter Path,包含在[]中</p>
            </el-form-item>
            <el-form-item label="Http Method">
              <el-select v-model="form.httpMethod" placeholder="请选择Http Method">
                <el-option value="GET"></el-option>
                <el-option value="POST"></el-option>
                <el-option value="PUT"></el-option>
                <el-option value="DELETE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入参请求模式">
              <el-select v-model="form.b5" placeholder="请选择入参请求模式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>入参定义</span>
        </div>
        <div class="text item">
          <el-table :data="form.requestParameters" border style="width: 100%" header-cell-class-name="tb-bg">
            <!-- <el-table-column prop="n1" label="修改顺序" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n1" placeholder="修改顺序"></el-input>
              </template>
            </el-table-column> -->
            <el-table-column prop="name" label="参数名" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="参数名"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="location" label="参数位置">
              <template slot-scope="scope">
                <el-input v-model="scope.row.location" placeholder="参数位置"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型">
              <template slot-scope="scope">
                <el-input v-model="scope.row.type" placeholder="类型"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="required" label="必填">
              <template slot-scope="scope">
                <el-input v-model="scope.row.required" placeholder="必填"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="defaultValue" label="默认值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.defaultValue" placeholder="默认值"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="demoValue" label="示例">
              <template slot-scope="scope">
                <el-input v-model="scope.row.demoValue" placeholder="示例"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.description" placeholder="描述"></el-input>
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
    <el-button type="primary" @click="toNext">下一步</el-button>
    </div>
  </div>
</template>

<script>
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
        protocol: [],
        requestParameters: [],
      },
    };
  },
  methods: {
    // 获取本地存储数据
    getLocal() {
      const base = window.sessionStorage.getItem('form2');
      if (base && base !== '{}') {
        this.form = this.convert.getJSON(base);
        console.log(787, this.form);
      }
    },
    // 新增一条数据
    createNewData() {
      const a = {
        // n1: '',
        name: '',
        location: '',
        type: '',
        required: '',
        defaultValue: '',
        demoValue: '',
        description: '',
      };
      this.form.requestParameters.push(a);
    },
    // 删除该行数据
    deleteData(index) {
      this.form.requestParameters.splice(index, 1);
      console.log(index, this.form.requestParameters);
    },
    // 上一步
    toBefore() {
      this.$router.push({ path: '/CreateOne' });
    },
    // 下一步
    toNext() {
      // this.form.protocol = JSON.stringify(this.form.protocol);
      window.sessionStorage.setItem('form2', JSON.stringify(this.form));
      this.$router.push({ path: '/CreateThree' });
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
