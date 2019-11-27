<template>
  <div style="padding:20px">
    <span>邮箱:</span>
    <cube-input v-model="email" type="text" :autofocus="true"></cube-input>
    <span>密码:</span>
    <cube-input v-model="pwd" type="password" :eye="eye"></cube-input>

    <cube-button type="submit" :primary="true" @click="login">登陆</cube-button>
  </div>
</template>


<script>
import g from "@/components/Global";
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
  created: function() {},
  methods: {
    login() {
      if (this.email.trim().length == 0 || this.pwd.trim().length == 0) {
        var toast = this.$createToast({
          time: 2500,
          type: "error",
          txt: "请输入邮箱和密码"
        });
        toast.show();
        return;
      }
      var loading = this.$createToast({
        txt: "Loading...",
        mask: true
      });
      loading.show();
      g.AV.User.logIn(this.email, this.pwd).then(
        function(user) {
          loading.hide();
          this.$createToast({
            time: 1000,
            type: "correct",
            txt: "登陆成功，欢迎xxx"
          }).show();
          this.$router.push({ name: "PersonList", params: { id: id } });
        },
        function(error) {
          loading.hide();
          this.$createToast({
            time: 1000,
            type: "error",
            txt: error.rawMessage
          }).show();
        }
      );
    }
  }
};
</script>
