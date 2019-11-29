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
  /* font-size: 20px; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #afafaf; */
  margin-top: 0px;
}
</style>
