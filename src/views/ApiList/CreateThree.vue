<template>
  <div>
    <el-steps :active="2" simple finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="定义API请求"></el-step>
      <el-step title="定义API后端服务"></el-step>
      <el-step title="定义返回结果"></el-step>
    </el-steps>
    <div class="create-body" :style="formHeight">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>后端基础定义</span>
        </div>
        <div class="text item card-body">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="后端服务类型">
              <el-radio-group v-model="form.protocol">
                <el-radio label="http"></el-radio>
                <el-radio label="https"></el-radio>
                <!-- <el-radio label="函数计算"></el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item label="后端服务地址">
              <el-input v-model="form.address"></el-input>
              <p>后端服务地址指API网关调用底层服务器时的域名或者IP，不包含Path</p>
            </el-form-item>
            <el-form-item label="后端请求Path">
              <el-input v-model="form.path"></el-input>
            </el-form-item>
            <el-form-item label="Http Method">
              <el-select v-model="form.httpMethod" placeholder="请选择Http Method">
                <el-option v-for="item in httpMethodOptions" :key="item" :value="item">
                </el-option>
                <!-- <el-option value="GET"></el-option>
                <el-option value="POST"></el-option>
                <el-option value="PATCH"></el-option>
                <el-option value="PUT"></el-option>
                <el-option value="DELETE"></el-option>
                <el-option value="HEAD"></el-option>
                <el-option value="ANY"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="后端超时">
              <el-input v-model.number="form.timeout" type="number">
                <template slot="append">ms</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Content Type">
              <el-select v-model="form.contentTypeValue" placeholder="请选择接入类型">
                <el-option value="XML"></el-option>
                <el-option value="JSON"></el-option>
                <el-option value="格式文本"></el-option>
              </el-select>
              <p>数据解析及标准化，外部数据格式</p>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>后端服务参数配置</span>
        </div>
        <div class="text item">
          <el-table :data="serviceParameters" border style="width: 100%" header-cell-class-name="tb-bg">
            <!-- <el-table-column prop="n1" label="修改顺序" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n1" placeholder="修改顺序"></el-input>
              </template>
            </el-table-column> -->
            <el-table-column prop="name" label="后端参数名称" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="后端参数名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="location" label="后端参数位置">
              <template slot-scope="scope">
                <el-select v-model="scope.row.location" placeholder="请选择参数位置">
                  <el-option v-for="item in locationOptions" :key="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="后端参数类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择类型">
                  <el-option v-for="item in typeOptions" :key="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="required" label="对应入参位置">
              <template slot-scope="scope">
                <el-input v-model="scope.row.required" placeholder="对应入参位置"></el-input>
              </template>
            </el-table-column> -->
            <el-table-column prop="catalog" label="请求参数类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.catalog" placeholder="请选择类型">
                  <el-option v-for="item in catalogOptions" :key="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="constValue" label="参数值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.constValue" placeholder="参数值"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteData(scope.$index, 1)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin: 10px 0" size="small" icon="el-icon-plus" @click.native.prevent="createNewData(1)">
            增加一条
          </el-button>
        </div>
      </el-card>
      <!-- <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>常量参数</span>
        </div>
        <div class="text item">
          <el-table :data="form.tableDataM" border style="width: 100%" header-cell-class-name="tb-bg" fit>
            <el-table-column prop="name" label="后端参数名称" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="后端参数名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n2" label="参数值" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n2" placeholder="参数值"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="location" label="参数位置">
              <template slot-scope="scope">
                <el-input v-model="scope.row.location" placeholder="参数位置"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.description" placeholder="描述"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteData(scope.$index, 2)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin: 10px 0" size="small" icon="el-icon-plus" @click.native.prevent="createNewData(2)">
            增加一条
          </el-button>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>系统参数</span>
        </div>
        <div class="text item">
          <el-table :data="tableDatas" border style="width: 100%" header-cell-class-name="tb-bg">
            <el-table-column prop="name" label="系统参数名" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="系统参数名"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="后端参数名称" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="后端参数名称"></el-input>
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
            <el-table-column prop="description" label="描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.description" placeholder="描述"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteData(scope.$index, 3)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin: 10px 0" size="small" icon="el-icon-plus" @click.native.prevent="createNewData(3)">
            增加一条
          </el-button>
        </div>
      </el-card> -->
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
      httpMethodOptions: ['GET', 'POST', 'DELETE', 'PUT', 'HEADER', 'TRACE', 'PATCH', 'CONNECT', 'OPTIONS'],
      locationOptions: ['BODY', 'HEAD', 'QUERY', 'PATH', 'CONST', 'SYSTEM'],
      typeOptions: ['STRING', 'NUMBER', 'BOOLEAN'],
      catalogOptions: ['REQUEST', 'CONSTANT', 'SYSTEM'],
      formHeight: `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 200])}px;`, // 表单高度
      form: {
        contentTypeValue: 'JSON',
        // b1: [],
        // tableDataM: [],
      },
      serviceParameters: [],
      tableDatas: [],
    };
  },
  methods: {
    // 获取本地存储数据
    getLocal() {
      const base = window.sessionStorage.getItem('serviceConfig');
      const bases = window.sessionStorage.getItem('serviceParameters');
      if (base && base !== '{}') {
        this.form = this.convert.getJSON(base);
        console.log(787, this.form);
      }
      if (bases && bases !== '{}') {
        this.serviceParameters = this.convert.getJSON(bases);
      }
    },
    // 新增一条数据
    createNewData(type) {
      const a = {
        // n1: '',
        // description: '',
        name: '',
        location: '',
        type: '',
        catalog: '',
        constValue: '',
        // required: '',
        // defaultValue: '',
        // demoValue: '',
      };
      if (type === 1) {
        this.serviceParameters.push(a);
      } else if (type === 3) {
        this.tableDatas.push(a);
      } else {
        this.form.tableDataM.push(a);
      }
    },
    deleteData(index, type) {
      if (type === 1) {
        this.serviceParameters.splice(index, 1);
      } else if (type === 3) {
        this.tableDatas.splice(index, 1);
      } else {
        this.form.tableDataM.splice(index, 1);
      }
      console.log(index, this.form.tableDataM);
    },
    // 上一步
    toBefore() {
      window.sessionStorage.setItem('serviceConfig', JSON.stringify(this.form));
      window.sessionStorage.setItem('serviceParameters', JSON.stringify(this.serviceParameters));
      this.$router.push({ path: '/CreateTwo' });
    },
    // 下一步
    toNext() {
      window.sessionStorage.setItem('serviceConfig', JSON.stringify(this.form));
      window.sessionStorage.setItem('serviceParameters', JSON.stringify(this.serviceParameters));
      this.$router.push({ path: '/CreateFour' });
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
