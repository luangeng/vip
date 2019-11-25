<template>
  <div style="padding:10px">
    <span>姓名:</span>
    <cube-input v-model="name" type="text" :autofocus="true" :readonly="!editing"></cube-input>

    <span>性别:</span>
    <cube-radio-group v-model="sex" :options="sexs" :horizontal="true" :readonly="!editing" />

    <span>phone</span>
    <cube-input v-model="phone" placeholder="phone" type="number" :readonly="!editing"></cube-input>

    <span>age:</span>
    <cube-input v-model="age" placeholder="age" type="number" :readonly="!editing"></cube-input>

    <span>Email:</span>
    <cube-input v-model="email" placeholder="email" type="email" :readonly="!editing"></cube-input>

    <span>Date:</span>
    <cube-input v-model="date" type="text" :readonly="true"></cube-input>

    <span>remark:</span>
    <cube-textarea v-model="remark" placeholder="备注" :readonly="!editing"></cube-textarea>

    <div v-if="!editing">
      <cube-button :primary="true" @click="edit">编辑</cube-button>
    </div>
    <div v-if="editing">
      <cube-button :primary="true" @click="save">保存</cube-button>
    </div>
  </div>
</template>

<script>
import g from "@/components/Global";
export default {
  data() {
    return {
      type: "text",
      id: this.$route.params.id,
      name: "",
      phone: "",
      age: "",
      email: "",
      date: "2019-1-1 2:2:2",
      sex: "1",
      remark: "",
      editing: false,
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
      console.log(this.id);
      var query = new g.AV.Query("Person");
      query.get(this.id).then(p => {
        this.name = p.get("name");
        this.sex = p.get("sex");
        this.phone = p.get("phone");
        this.age = p.get("age");
        this.email = p.get("email");
        this.remark = p.get("remark");
      });
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
        },
        function(error) {}
      );
      this.$createDialog({
        type: "alert",
        title: "Alert",
        content: "dialog content"
      }).show();
    },
    edit() {
      this.editing = true;
      //   var query = new g.AV.Query("Person");
      //   query.equalTo("objectId", "5ddb42ab844bb40088750ee9");
      //   query.find().then(
      //     function(results) {
      //       if (results.length > 0) {
      //         console.log(results[0]);
      //       }
      //     },
      //     function(error) {
      //       console.info(
      //         "Failed to create new object, with error message: " + error.message
      //       );
      //     }
      //   );
    }
  }
};
</script>
