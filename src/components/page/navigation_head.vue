<template>
  <div>
    <div>
      <!-- <h1>主标题</h1> -->
    </div>
    <div>
      <ul class="nav nav-tabs">
        <li v-for="(item,index) in classify"
            :key="index"
            :class=item.field
            @click="switchTag($event)"
            :id=item.text>
          <a :href=item.text
             data-toggle="tab">{{item.name}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'navigationHead',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('showTitles')
  },
  methods: {
    switchTag: function (event) {
      // 未存在分类不进行页面渲染
      if (typeof (this.$store.state.wholeDatas[event.currentTarget.id]) === 'undefined') {
        return
      }
      // this在then里无法被vue调用
      // var self = this
      // this.axios.get('http://localhost:8080/static/demo.json', {})
      //   .then(function (response) {
      //     self.classify = response.data.classify
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
      // bootstrap轮播bug,每次切换分类强制刷到第一页
      // $('#myCarousel').carousel(0)

      this.$store.commit('modifyTitles', event.currentTarget.id)
    }
  },
  computed: {
    classify () {
      return this.$store.state.wholeDatas.classify
    }
  }

}
</script>
