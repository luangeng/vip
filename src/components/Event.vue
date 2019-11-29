<template>
  <div>
    <cube-input v-model="date" type="text" disabled="true">
      <span slot="prepend" class="span-text">时间:</span>
    </cube-input>

    <cube-input v-model="event" type="text">
      <span slot="prepend" class="span-text">事件:</span>
    </cube-input>

    <div style="margin-top:20px">
      <cube-button :primary="true" @click="save">保存</cube-button>
      <cube-button :primary="true" @click="del">删除</cube-button>
      <cube-button :primary="true" @click="back">返回</cube-button>
    </div>
  </div>
</template>

<script>
import g from "@/components/Global";
export default {
  data() {
    return {
      id: this.$route.query.id,
      personId: this.$route.query.personId,
      event: "",
      date: new Date().format("yyyy-MM-dd hh:mm")
    };
  },
  created: function() {
    if (this.id != undefined) {
      var query = new g.AV.Query("Event");
      query.get(this.id).then(p => {
        this.event = p.get("desc");
        this.date = p.get("createdAt").format("yyyy-MM-dd hh:mm");
      });
    }
  },
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
    },
    back() {
      this.$router.push({ path: "person", query: { id: this.personId } });
    },
    del() {
      this.$createDialog({
        type: "confirm",
        title: "确认",
        content: "确认要删除吗？",
        confirmBtn: {
          text: "确定",
          active: true
        },
        cancelBtn: {
          text: "取消",
          active: false
        },
        onConfirm: () => {
          var e = g.AV.Object.createWithoutData("Event", this.id);
          e.destroy().then(a => this.back());
        },
        onCancel: () => {}
      }).show();
    }
  }
};
</script>