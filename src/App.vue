<template>
  <div id="app">
    <div>会员管理系统</div>
    <div style="padding:10px">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eeeeee;
  margin-top: 0px;
}
</style>
