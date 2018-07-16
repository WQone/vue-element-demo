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
              <el-radio-group v-model="form.c1">
                <el-radio label="Http/Https"></el-radio>
                <el-radio label="函数计算"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="后端服务地址">
              <el-input v-model="form.c2"></el-input>
              <p>后端服务地址指API网关调用底层服务器时的域名或者IP，不包含Path</p>
            </el-form-item>
            <el-form-item label="后端请求Path">
              <el-input v-model="form.c3"></el-input>
            </el-form-item>
            <el-form-item label="Http Method">
              <el-select v-model="form.c4" placeholder="请选择Http Method">
                <el-option label="Post" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后端超时">
              <el-input v-model="form.c5">
                <template slot="append">ms</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Content Type">
              <el-select v-model="form.c6" placeholder="请选择接入类型">
                <el-option label="XML" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
          <el-table :data="form.tableData" border style="width: 100%" header-cell-class-name="tb-bg">
            <el-table-column prop="n1" label="修改顺序" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n1" placeholder="修改顺序"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n2" label="参数名" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n2" placeholder="参数名"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n3" label="参数位置">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n3" placeholder="参数位置"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n4" label="类型">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n4" placeholder="类型"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n5" label="必填">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n5" placeholder="必填"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n6" label="默认值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n6" placeholder="默认值"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n7" label="示例">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n7" placeholder="示例"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n8" label="描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n8" placeholder="描述"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin: 10px 0" size="small" icon="el-icon-plus" @click.native.prevent="createNewData">
            增加一条
          </el-button>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>常量参数</span>
        </div>
        <div class="text item">
          <el-table :data="form.tableDataM" border style="width: 100%" header-cell-class-name="tb-bg" fit>
            <el-table-column prop="n1" label="后端参数名称" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n1" placeholder="后端参数名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n2" label="参数值" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n2" placeholder="参数值"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n3" label="参数位置">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n3" placeholder="参数位置"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="n8" label="描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.n8" placeholder="描述"></el-input>
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
          <el-button type="primary" style="margin: 10px 0" size="small" icon="el-icon-plus" @click.native.prevent="createNewDataM">
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
    console.log(77, this.$store.state.view.form1);
    this.form = this.$store.state.view.form3;
  },
  data() {
    return {
      formHeight: `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 200])}px;`, // 表单高度
      form: {
        b1: [],
        tableData: [],
        tableDataM: [],
      },
    };
  },
  methods: {
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
    // 新增一条数据
    createNewDataM() {
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
      this.form.tableDataM.push(a);
    },
    deleteData(index) {
      this.form.tableDataM.splice(index, 1);
      console.log(index, this.form.tableDataM);
    },
    // 上一步
    toBefore() {
      this.$router.push({ path: '/CreateTwo' });
    },
    // 下一步
    toNext() {
      this.$store.commit('form3', this.form); // 第一步
      console.log(this.form);
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
