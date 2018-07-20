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
              <el-radio-group v-model="form.protocol">
                <el-radio label="http"></el-radio>
                <el-radio label="https"></el-radio>
                <!-- <el-radio label="webSocket"></el-radio> -->
              </el-radio-group>
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
                <!-- <el-option value="PUT"></el-option>
                <el-option value="DELETE"></el-option> -->
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="入参请求模式">
              <el-select v-model="form.b5" placeholder="请选择入参请求模式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>入参定义</span>
        </div>
        <div class="text item">
          <el-table :data="requestParameters" border style="width: 100%" header-cell-class-name="tb-bg">
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
                <el-select v-model="scope.row.location" placeholder="请选择参数位置">
                  <el-option v-for="item in locationOptions" :key="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择类型">
                  <el-option v-for="item in typeOptions" :key="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="required" label="必填">
              <template slot-scope="scope">
                <el-select v-model="scope.row.required" placeholder="请选择是否必填">
                  <el-option v-for="item in requiredOptions" :key="item" :value="item">
                  </el-option>
                </el-select>
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
      locationOptions: ['BODY', 'HEAD', 'QUERY', 'PATH'],
      typeOptions: ['STRING', 'INT', 'LONG', 'FLOAT', 'DOUBLE', 'BOOLEAN'],
      requiredOptions: ['REQUIRED', 'OPTIONAL'],
      formHeight: `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 200])}px;`, // 表单高度
      form: {},
      requestParameters: [],
    };
  },
  methods: {
    // 获取本地存储数据
    getLocal() {
      const base = window.sessionStorage.getItem('requestConfig');
      const bases = window.sessionStorage.getItem('requestParameters');
      if (base && base !== '{}') {
        this.form = this.convert.getJSON(base);
      }
      if (bases && bases !== '{}') {
        this.requestParameters = this.convert.getJSON(bases);
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
      this.requestParameters.push(a);
    },
    // 删除该行数据
    deleteData(index) {
      this.requestParameters.splice(index, 1);
      console.log(index, this.requestParameters);
    },
    // 上一步
    toBefore() {
      window.sessionStorage.setItem('requestConfig', JSON.stringify(this.form));
      window.sessionStorage.setItem('requestParameters', JSON.stringify(this.requestParameters));
      this.$router.push({ path: '/CreateOne' });
    },
    // 下一步
    toNext() {
      // this.form.protocol = this.form.protocol.toString();
      window.sessionStorage.setItem('requestConfig', JSON.stringify(this.form));
      window.sessionStorage.setItem('requestParameters', JSON.stringify(this.requestParameters));
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
