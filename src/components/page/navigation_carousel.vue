<template>
  <div>
    <div>
      <div>
        <div class="row">
          <div class="col-sm-3"> 分类搜索:<input type="text"
                   v-model="search"></div>
          <div class="col-sm-3"> <button @click="sortTitle(0)">恢复排序</button>
            <button @click="sortTitle(1)">降序排序</button>
            <button @click="sortTitle(2)">升序排序</button>
            <button @click="sortTitle(Math.random())">随机排序</button></div>
          <div class="col-sm-3">
            <div>生命中总是存在奇迹！可以放天气预报,新闻等浮动内容</div>
          </div>
        </div>
      </div>
    </div>
    <div id="myCarousel"
         class="carousel slide">
      <!-- 轮播（Carousel）指标 -->
      <!-- <ol class="carousel-indicators">
        <li data-target="#myCarousel"
            data-slide-to="0"
            class="active"></li>
        <li data-target="#myCarousel"
            data-slide-to="1"></li>
        <li data-target="#myCarousel"
            data-slide-to="2"></li>
      </ol> -->
      <!-- 轮播（Carousel）项目 -->
      <div class="carousel-inner"
           v-if="refresh">
        <div v-for="(item,index) in parentData"
             :key="index"
             :class="item.field"
             :id="item.id">
          <!-- <img :src="item.src"
               alt=""> -->

          <Divider />
          <div class="row"
               style="height:400px">
            <div class="col-sm-4"
                 v-for="(data,index) in item.datas"
                 :key="index">
              <div>
                <div>
                  <a :href="data.url"
                     target="_blank">
                    <Tooltip content="Top Right text"
                             placement="top">
                      <Card style="width:206px;height:90px;margin:6px 0;">
                        <div style="text-align:center">
                          <img src="">
                          <div>{{data.title}}</div>
                        </div>
                      </Card>
                    </Tooltip>
                  </a>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <Divider />
        </div>
        <!-- <div class="item">
          <img src="/wp-content/uploads/2014/07/slide3.png"
               alt="Third slide">
        </div> -->
      </div>
      <!-- 轮播（Carousel）导航 -->
      <a class="left carousel-control"
         href="#myCarousel"
         role="button"
         data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"
              aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control"
         href="#myCarousel"
         role="button"
         data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"
              aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>

import page from './navigation_page'
import $ from 'jquery'

export default {
  components: { page },
  name: 'carousel',
  data () {
    return {
      search: '',
      orderType: 0, // 默认排序
      parentData: [],
      refresh: true
    }
  },
  mounted () {
    $('#myCarousel').carousel({
      interval: 1000,
      pause: 'hover',
      wrap: 'true'
    })
  },
  methods: {
    sortTitle (orderType) {
      this.orderType = orderType
    },
    varietyDatas () {
      const { search, datas, orderType } = this
      let filterArr = []
      if (typeof (datas) === 'undefined') {
        return
      }
      // 过滤数组
      filterArr = datas.filter(p => p.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      // 排序
      if (orderType) {
        filterArr.sort(function (a, b) {
          if (orderType === 1) {
            // 降序
            return b.num - a.num
          } else if (orderType === 2) {
            // 升序
            return a.num - b.num
          } else {
            return Math.random() - 0.5
          }
        })
      }
      // bootstrap轮播bug,每次切换分类强制刷到第一页
      // if (filterArr.length < datas.length) {
      //   $('#myCarousel').carousel(0)
      // }

      // 分类下导航链接数长度
      let s = filterArr
      // 每页显示个数
      let core = 12
      // 轮播页面计数
      var k = 0
      var json = []
      var elementsJson = []
      // console.log(s.length)
      json.length = 0

      if (s.length <= core) {
        for (var i = 0; i < s.length; i++) {
          elementsJson.push(s[i])
        }
        var resultJsonActiveSingle = { 'field': 'item active',
          'alt': 'Third slide',
          'id': 'img' + (k + 1),
          'src': '../static/1.jpg',
          'datas': [].concat(elementsJson) }
        json.push(resultJsonActiveSingle)
        elementsJson.length = 0
      } else {
        for (var j = 0; j < s.length; j++) {
          elementsJson.push(s[j])
          if (elementsJson.length % core === 0 && j === core - 1) {
            k++
            var resultJsonActive = { 'field': 'item active',
              'alt': 'Third slide',
              'id': 'img' + k,
              'src': '../static/1.jpg',
              'datas': [].concat(elementsJson) }
            // console.log(elementsJson.length)
            json.push(resultJsonActive)
            elementsJson.length = 0
          } else if (elementsJson.length % core === 0) {
            k++
            var resultJson = { 'field': 'item',
              'alt': 'Third slide',
              'id': 'img' + k,
              'src': '../static/1.jpg',
              'datas': [].concat(elementsJson) }
            json.push(resultJson)
            // console.log(elementsJson.length)
            elementsJson.length = 0
          } else if (elementsJson.length % core !== 0 && j + 1 === s.length) {
            k++
            var resultJsons = { 'field': 'item',
              'alt': 'Third slid344',
              'id': 'img' + k,
              'src': '../static/1.jpg',
              'datas': [].concat(elementsJson) }
            json.push(resultJsons)
            // console.log(elementsJson.length)
            elementsJson.length = 0
          }
        }
      }
      // console.log(json)
      // this.$forceUpdate()

      // 切换分类需要强制重新渲染
      this.refresh = false
      this.$nextTick(function () {
        this.refresh = true
        this.parentData = json
      })
    }

  },
  // created () {
  //   this.$store.dispatch('showTitles')
  // },
  computed: {
    datas () {
      return this.$store.state.datas
    }
  },
  watch: {
    datas: 'varietyDatas',
    orderType: 'varietyDatas',
    search: 'varietyDatas'
  }

}
</script>

<style scoped>
/* .carousel-inner {
  background: url("/static/2.png");
}
.item {
  background: url("/static/2.png");
} */
</style>
