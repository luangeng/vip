<template>
  <div>
    <span>时间: {{date}}</span>
    <br />

    <span>事件:</span>
    <cube-input v-model="event" type="text" :autofocus="true"></cube-input>

    <div style="margin-top:20px">
      <cube-button :primary="true" @click="save">保存</cube-button>
    </div>
  </div>
</template>

<script>
import g from "@/components/Global";
export default {
  data() {
    return {
      personId: this.$route.query.personId,
      event: "",
      date: new Date().format("yyyy-MM-dd hh:mm")
    };
  },
  created: function() {},
  methods: {
    save() {
      if (this.personId == undefined || this.event.trim().length == 0) {
        this.$createToast({
          type: "error",
          time: 2500,
          txt: "请输入事件"
        }).show();
        return;
      }

      var loading = this.$createToast({
        txt: "Loading...",
        mask: true
      });
      loading.show();

      var Event = g.AV.Object.extend("Event");
      var e = new Event();
      e.set("personId", this.personId);
      e.set("desc", this.event);
      e.save().then(
        res => {
          loading.hide();
          this.$createToast({
            type: "correct",
            time: 2500,
            txt: "保存成功"
          }).show();
          this.$router.push({ path: "person", query: { id: this.personId } });
        },
        error => {
          loading.hide();
          this.$createToast({
            type: "error",
            time: 2500,
            txt: error.rawMessage
          }).show();
        }
      );
    }
  }
};
</script>