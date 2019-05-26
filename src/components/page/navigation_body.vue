<template>
  <div class="container">
    <navigationHead></navigationHead>
    <navigationCarousel></navigationCarousel>

  </div>
</template>

<script>
export default {
  components: {
    navigationHead: require('../page/navigation_head').default,
    navigationPage: require('../page/navigation_page').default,
    navigationCarousel: require('../page/navigation_carousel').default
  }
}
</script>
