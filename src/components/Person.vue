<template>
  <div>
    <cube-input v-model="name" type="text" :autofocus="true" :disabled="!editing">
      <span slot="prepend" class="span-text">姓名:</span>
    </cube-input>

    <!-- <span slot="prepend">性别:</span>
    <cube-radio-group v-model="sex" :options="sexs" :horizontal="true" :disabled="!editing"></cube-radio-group>-->

    <cube-input v-model="phone" type="number" :disabled="!editing">
      <span slot="prepend" class="span-text">电话:</span>
    </cube-input>

    <cube-input v-model="sex" type="text" :disabled="!editing">
      <span slot="prepend" class="span-text">性别:</span>
    </cube-input>

    <cube-input v-model="age" type="number" :disabled="!editing">
      <span slot="prepend" class="span-text">年龄:</span>
    </cube-input>

    <cube-input v-model="email" type="email" :disabled="!editing">
      <span slot="prepend" class="span-text">邮箱:</span>
    </cube-input>

    <cube-input v-model="remark" type="text" :disabled="!editing">
      <span slot="prepend" class="span-text">备注:</span>
    </cube-input>

    <cube-input v-model="date" type="text" :disabled="true">
      <span slot="prepend" class="span-text">注册时间:</span>
    </cube-input>

    <div class="scroll-list-wrap">
      <span class="span-text">事件：</span>
      <cube-scroll ref="scroll" :data="events" :options="options" @click="editEvent"></cube-scroll>
    </div>

    <div style="margin-top:20px">
      <cube-button :primary="true" @click="newEvent">新建事件</cube-button>
      <div v-if="!editing">
        <cube-button :primary="true" @click="edit">编辑</cube-button>
      </div>
      <div v-if="editing">
        <cube-button :primary="true" @click="save">保存</cube-button>
      </div>
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
      name: "",
      phone: "",
      age: "",
      email: "",
      date: new Date().format("yyyy-MM-dd hh:mm"),
      sex: "",
      remark: "",
      editing: false,
      events: [],
      eventsMap: undefined,
      options: {
        scrollbar: true,
        startY: 0
      }
    };
  },
  watch: {
    value(newV) {
      if (newV.length > 10) {
        newV = newV.slice(0, 10);
        this.$nextTick(() => {
          this.value = newV;
        });
      }
    }
  },
  created: function() {
    if (this.id != undefined) {
      this.editing = false;

      var loading = this.$createToast({
        txt: "Loading...",
        mask: true
      });
      loading.show();

      var query = new g.AV.Query("Person");
      query.get(this.id).then(p => {
        loading.hide();
        this.name = p.get("name");
        this.sex = p.get("sex");
        this.phone = p.get("phone");
        this.age = p.get("age");
        this.email = p.get("email");
        this.remark = p.get("remark");
        this.date = p.get("createdAt").format("yyyy-MM-dd hh:mm");
      });
      this.queryEvents();
    } else {
      this.editing = true;
    }
  },
  methods: {
    save() {
      var p;
      if (this.editing) {
        p = g.AV.Object.createWithoutData("Person", this.id);
      } else {
        var Person = g.AV.Object.extend("Person");
        p = new Person();
      }

      p.set("name", this.name);
      p.set("phone", this.phone);
      p.set("sex", this.sex);
      p.set("age", this.age);
      p.set("email", this.email);
      p.set("remark", this.remark);
      p.save().then(
        res => {
          this.editing = false;
          this.$createDialog({
            type: "alert",
            title: "Alert",
            content: "dialog content"
          }).show();
        },
        function(error) {
          console(error);
        }
      );
    },
    edit() {
      this.editing = true;
    },
    queryEvents() {
      var query = new g.AV.Query("Event");
      this.eventsMap = new Map();
      query.equalTo("personId", this.id);
      query.descending("createdAt");
      query.find().then(results => {
        this.events.splice(0);
        for (var i = 0; i < results.length; i++) {
          var text =
            results[i].get("createdAt").format("yyyy-MM-dd hh:mm") +
            " " +
            results[i].get("desc");
          this.events.push(text);
          this.eventsMap.set(text, results[i].id);
        }
      });
    },
    newEvent() {
      this.$router.push({ path: "event", query: { personId: this.id } });
    },
    editEvent(str) {
      var id = this.eventsMap.get(str);
      this.$router.push({
        path: "event",
        query: { id: id, personId: this.id }
      });
    },
    back() {
      this.$router.push({ path: "personList" });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.scroll-list-wrap {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transform: rotate(0deg);
  overflow: hidden;
  text-align: left;
  margin-top: 10px;
}

.cube-scroll-list {
  color: grey;
}

.cube-scroll-item {
  font-size: 12px;
  line-height: 30px;
  height: 30px;
  padding-left: 10px;
}
</style>
