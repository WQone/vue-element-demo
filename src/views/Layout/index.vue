<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header class="header" style>
        <img src="../../assets/logo.png">
        <span>比一比API数据DEMO</span>
      </el-header>
      <el-container>
        <el-aside style="background: #f9f9f9;width: 200px;">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>玩玩玩玩
              </template>
              <el-menu-item :class="{ 'is-active': item.url === $route.path }" :index="item.name" :key="index" @click="linkPage(item.url)" v-for="(item, index) in menuList">{{item.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main-body">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :key="index" v-for="(item, index) in breadcrumbList">{{item.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <p class="cardList_title">{{$route.name}}</p>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menu from '../../utils/menu';

export default {
  name: 'App',
  data() {
    return {
      breadcrumbList: [],
      menuList: menu.menuLists,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    linkPage(path) {
      this.$router.push(path);
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      const first = matched[0];
      matched = [{ path: '/', meta: { title: '首页' } }].concat(matched);
      this.breadcrumbList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
      );
      console.log(this.$route.matched, this.$route, this.breadcrumbList);
    },
  },
  mounted() {
    this.getBreadcrumb();
  },
};
</script>

<style>
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
  /* overflow: hidden; */
}
</style>
