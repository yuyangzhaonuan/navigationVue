<template>
  <div>
    <div>
      <div><input type="text"
               v-model="search"></div>
      <button @click="sortTitle(0)">恢复排序</button>
      <button @click="sortTitle(1)">降序排序</button>
      <button @click="sortTitle(2)">升序排序</button>
      <button @click="sortTitle(Math.random())">随机排序</button>
      <div>生命中总是存在奇迹！可以放天气预报,新闻等浮动内容</div>
    </div>
    <Divider />
    <div class="row">
      <div class="col-sm-3"
           v-for="(data,index) in filterText.slice(0,10)"
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
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      search: '',
      orderType: 0, // 默认排序
      disabled: 'true',
      carouselNums: ''

    }
  },
  methods: {
    sortTitle (orderType) {
      this.orderType = orderType
    }

  },
  computed: {
    filterText () {
      const { search, datas, orderType } = this
      let filterArr = []
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
      return filterArr
    },
    datas () {
      // console.log(this.$store.state.datas.length)
      // console.log(this.$store.state.parentData.length)

      // let numberPages = this.$store.state.parentData.length
      // let arrs = []
      return this.$store.state.datas
    }

  }

}
</script>
