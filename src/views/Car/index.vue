<template>
  <div>
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="appkey">
        <el-input v-model="form.appkey"></el-input>
      </el-form-item>
      <el-form-item label="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="page">
        <el-select placeholder="page" style="width: 100%;" v-model="form.page">
          <el-option label="监控" value="monitor"></el-option>
          <el-option label="跟踪" value="tracking"></el-option>
          <el-option label="回放" value="playback"></el-option>
          <el-option label="统计" value="report"></el-option>
          <el-option label="租赁黑名单" value="blacklist"></el-option>
          <el-option label="微信版" value="weixin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="target">
        <el-input v-model="form.target"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getURL" type="primary">获取链接</el-button>
      </el-form-item>
      <el-form-item label="链接">
        <span v-text="url"></span>
      </el-form-item>
    </el-form>
    <iframe :src="url"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      url: '',
    };
  },
  methods: {
    getURL() {
      this.url = `http://pageapi.gpsoo.net/third?method=jump&appkey=${this.form.appkey}&account=${
        this.form.account
      }&page=${this.form.page}&target=${this.form.target}`;
      console.log(this.form);
    },
  },
};
</script>
<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 500px;
}
</style>
