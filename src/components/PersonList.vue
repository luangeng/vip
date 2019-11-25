<template>
  <div style="padding:10px">
    <span>姓名:</span>
    <cube-input v-model="name" placeholder="输入姓名查询" type="text" :autofocus="true"></cube-input>

    <span>电话</span>
    <cube-input v-model="phone" placeholder="输入电话查询" type="number"></cube-input>

    <cube-button :primary="true" @click="query">查询</cube-button>

    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="items" :options="options" @click="detail"></cube-scroll>
    </div>
  </div>
</template>


<script>
import g from '@/components/Global'
export default {
  data() {
    return {
      name: "",
      phone: "",
      items: [],
      ids: [],
      options: {
        scrollbar: true,
        startY: 0
      }
    };
  },
  created: function() {
  },
  methods: {
    query() {
      var query1 = new g.AV.Query("Person");
      query1.contains("name", this.name);
      var query2 = new g.AV.Query("Person");
      query2.contains("phone", this.phone);
      var query = g.AV.Query.and(query1, query2);
      if (this.name.trim().length == 0) {
        query = query2;
      } else if (this.phone.trim().length == 0) {
        query = query1;
      }
      query.find().then(results => {
        this.items.splice(0);
        this.ids.splice(0);
        for (var i = 0; i < results.length; i++) {
          this.ids.push(results[i].id);
          this.items.push(
            i +
              ": " +
              results[i].attributes.name +
              " " +
              results[i].attributes.phone
          );
        }
      });
    },
    detail(str) {
      var index = str.substring(0, str.indexOf(":"));
      var id = this.ids[index];
      console.log(id);
       this.$router.push({name: 'Person',params:{ id:id}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.scroll-list-wrap {
  height: 350px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transform: rotate(0deg);
  overflow: hidden;
  text-align: left;
  margin-top: 10px;
}
</style>