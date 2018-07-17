<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header style="" class="header">
        <!-- <img src="./assets/logo.png" /> -->
        <span>API数据DEMO</span>
      </el-header>
      <el-container>
        <el-aside style="background: #f9f9f9;width: 200px;">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>API数据配置</template>
              <el-menu-item v-for="(item, index) in menuList" :key="index" :index="item.name" @click="linkPage(item.url)" :class="{ 'is-active': item.url === $route.path }">{{item.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main-body">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>

import menu from './utils/menu';

export default {
  name: 'App',
  data() {
    return {
      menuList: menu.menuLists,
    };
  },
  methods: {
    linkPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-menu {
  background: #f9f9f9;
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
  /* margin-left: 30px; */
  font-size: 20px;
  color: #ffffff;
  vertical-align: middle;
}
.header img {
  vertical-align: middle;
}
.main-body {
  width: 80%;
  overflow: hidden;
}
</style>
