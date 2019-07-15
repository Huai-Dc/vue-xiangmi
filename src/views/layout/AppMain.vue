<template>
  <div class="appmain" id="AppMain">
    <router-view></router-view>
  </div>  
</template>

<script>
export default {
  name: 'AppMain',
  props: {
    msg: String
  }
}
</script>

<style>
#AppMain, .mainbody{
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
}
</style>