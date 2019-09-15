<template>
  <div id="app" class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'electron-vue-assistant'
};
</script>

<style lang="scss">
  /* CSS */
#app {
    position: relative;
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
}

*::-webkit-scrollbar
  {
      width: 5px;
      height: 16px;
      background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  *::-webkit-scrollbar-track
  {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 5px;
      background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  *::-webkit-scrollbar-thumb
  {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: rgba(144,147,153,.3);
        transition: background-color .3s;
  }
</style>
