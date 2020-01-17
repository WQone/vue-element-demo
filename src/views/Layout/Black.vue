<template>
  <div>
    <keep-alive>
      <router-view v-bind="$attrs" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-bind="$attrs" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {};
</script>
