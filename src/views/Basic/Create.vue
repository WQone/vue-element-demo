<template>
  <div>
    <el-steps :active="1" simple>
      <el-step title="基本信息"></el-step>
      <el-step title="定义API请求"></el-step>
      <el-step title="定义API后端服务"></el-step>
      <el-step title="定义返回结果"></el-step>
    </el-steps>
    <div class="create-body">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>名称及描述</span>
        </div>
        <div class="text item card-body">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="协议">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="http" name="type"></el-checkbox>
                <el-checkbox label="https" name="type"></el-checkbox>
                <el-checkbox label="webSocket" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="请求地址">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="请求Path">
              <el-input v-model="form.name"></el-input>
              <p>请求Path必须包含请求参数中的Parameter Path,包含在[]中</p>
            </el-form-item>
            <el-form-item label="Http Method">
              <el-select v-model="form.region" placeholder="请选择Http Method">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入参请求模式">
              <el-select v-model="form.region" placeholder="请选择入参请求模式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <span>入参定义</span>
        </div>
        <div class="text item">
          <el-table :data="tableData" border style="width: 100%" header-cell-class-name="tb-bg">
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
    </div>
    <el-button type="info" @click="toBefore">上一步</el-button>
    <el-button type="primary" @click="toNext">下一步</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
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
      this.tableData.push(a);
    },
    // 上一步
    toBefore() {
    },
    // 下一步
    toNext() {
    },
  },
};
</script>

<style>
.el-step__title {
  min-width: 55% !important;
}
.el-form-item {
  width: 500px;
}
.el-select {
  width: 370px;
}
.el-card__body {
  padding: 0;
}
</style>
<style scoped>
.create-body {
  margin: 20px 0;
  text-align: left;
}
.card-body {
  margin: auto;
  width: 60%;
}
</style>
