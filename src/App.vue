<template>
  <div id="app">
    <el-container style="height: 80%;">
      <el-header style="" class="header">
        <img src="./assets/logo.png" />
        <span>比一比API数据DEMO</span>
      </el-header>
      <el-main class="main-body">
        <p class="cardList_title" v-if="$route.path !== '/Create'">外部数据API列表</p>
        <div class="cardList_body">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style scoped>
.header {
  text-align: left;
  font-size: 12px;
  background: #333;
  padding: 0 2.5%;
  line-height: 60px;
  font-size: 14px;
}
.header span {
  margin-left: 30px;
  font-size: 20px;
  color: #ffffff;
  vertical-align: middle;
}
.header img {
  vertical-align: middle;
}
.main-body {
  width: 80%;
  margin: 20px auto;
  overflow-x: hidden;
}

.cardList_body {
  width: 100%;
  overflow: hidden;
  padding: 0 20px;
}
</style>

