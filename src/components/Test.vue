<template>
  <div style="padding:10px">
    <span>姓名:</span>
    <cube-input v-model="name"  :type="type" :maxlength="5" :autofocus="true"></cube-input>
    
    <span>性别:</span>
    <cube-radio-group v-model="sex" :options="sexs" :horizontal="true" />

    <span>phone</span>
    <cube-input
      v-model="phone"
      :placeholder="phone"
      :type="type"
      :maxlength="20"
      :autofocus="false"
    ></cube-input>

    <span>age:</span>
    <cube-input v-model="age" :placeholder="age" :type="type" :maxlength="2" :autofocus="false"></cube-input>

    <span>Email:</span>
    <cube-input
      v-model="email"
      :placeholder="email"
      :type="type"
      :maxlength="2"
      :autofocus="false"
    ></cube-input>

    <span>Date:</span>
    <cube-input v-model="date" :type=text></cube-input>

    <span>remark:</span>
    <cube-textarea v-model="remark" :placeholder="remark" :maxlength="1000"></cube-textarea>

    <cube-button :primary="true" @click="save">保存</cube-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type:"text",
      name: "",
      phone:"123",
      age:"123",
      email:"123Í",
      date: new Date,
      sex: "1",
      remark:"",
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
  methods: {
    save() {
      this.$createDialog({
        type: "alert",
        title: "Alert",
        content: "dialog content"
      }).show();
    }
  }
};
</script>
