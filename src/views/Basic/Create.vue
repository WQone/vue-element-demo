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
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <el-button type="info" @click="onSubmit">上一步</el-button>
    <el-button type="primary" @click="onSubmit">下一步</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }],
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
