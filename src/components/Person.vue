<template>
  <div>
    <span>姓名:</span>
    <cube-input v-model="name" type="text" :autofocus="true" :disabled="!editing"></cube-input>

    <span>性别:</span>
    <cube-radio-group v-model="sex" :options="sexs" :horizontal="true" :disabled="!editing" />

    <span>phone</span>
    <cube-input v-model="phone" placeholder="phone" type="number" :disabled="!editing"></cube-input>

    <span>age:</span>
    <cube-input v-model="age" placeholder="age" type="number" :disabled="!editing"></cube-input>

    <span>Email:</span>
    <cube-input v-model="email" placeholder="email" type="email" :disabled="!editing"></cube-input>

    <span>Date:</span>
    <cube-input v-model="date" type="text" :disabled="true"></cube-input>

    <span>remark:</span>
    <cube-textarea v-model="remark" placeholder="备注" :disabled="!editing"></cube-textarea>

    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="events" :options="options" @click="edit"></cube-scroll>
    </div>

    <div style="margin-top:20px">
      <cube-button :primary="true" @click="newEvent">新建事件</cube-button>
      <div v-if="!editing">
        <cube-button :primary="true" @click="edit">编辑</cube-button>
      </div>
      <div v-if="editing">
        <cube-button :primary="true" @click="save">保存</cube-button>
      </div>
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
      date: "",
      sex: "1",
      remark: "",
      editing: false,
      events: [],
      eventsIds: [],
      options: {
        scrollbar: true,
        startY: 0
      },
      sexs: [
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "0"
        }
      ]
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
      var query = new g.AV.Query("Person");
      query.get(this.id).then(p => {
        this.name = p.get("name");
        this.sex = p.get("sex");
        this.phone = p.get("phone");
        this.age = p.get("age");
        this.email = p.get("email");
        this.remark = p.get("remark");
        this.date = p.get("createdAt").format("yyyy-MM-dd hh:mm:ss");
      });
      this.queryEvents();
    } else {
      this.editing = true;
    }
  },
  methods: {
    save() {
      var Person = g.AV.Object.extend("Person");
      var p = new Person();
      p.set("name", this.name);
      p.set("phone", this.phone);
      p.set("sex", this.sex);
      p.set("age", this.age);
      p.set("email", this.email);
      p.set("remark", this.remark);
      p.save().then(
        function(res) {
          this.editing = false;
          this.$createDialog({
            type: "alert",
            title: "Alert",
            content: "dialog content"
          }).show();
        },
        function(error) {}
      );
    },
    edit() {
      this.editing = true;
    },
    queryEvents() {
      var query = new g.AV.Query("Event");
      query.equalTo("personId", this.id);
      query.descending("createdAt");
      query.find().then(results => {
        this.events.splice(0);
        for (var i = 0; i < results.length; i++) {
          this.events.push(
            results[i].get("createdAt").format("yyyy-MM-dd hh:mm") +
              " " +
              results[i].get("desc")
          );
        }
      });
    },
    newEvent() {
      this.$router.push({ path: "event", query: { personId: this.id } });
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

.cube-scroll-item {
  font-size: 0.18rem;
}
</style>
