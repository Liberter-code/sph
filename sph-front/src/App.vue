<template>
  <div>
    <!--    <h1 v-upper="msg"></h1>-->
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.hasFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  data() {
    return {
      msg: 'abc'
    }
  },
  components: {
    Header, Footer
  },
  mounted() {
    this.$store.dispatch('home/categoryList')
  },
}
</script>

<style></style>
