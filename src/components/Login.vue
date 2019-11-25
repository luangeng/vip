<template>
  <div style="padding:20px">
    <span>邮箱:</span>
    <cube-input v-model="email" type="text"  :autofocus="true"></cube-input>
    <span>密码:</span>
    <cube-input v-model="pwd" type="password"  :eye="eye"></cube-input>

    <cube-button type="submit" :primary="true" @click="login">登陆</cube-button>
  </div>
</template>


<script>
import g from '@/components/Global'
export default {
  data() {
    return {
      email: "",
      pwd: "",
      eye: {
        open: true,
        reverse: true
      }
    };
  },
  created: function() {
    
  },
  methods: {
    login() {
      console.log("aaa");
    }
  }
};

</script>
