<template>
  <div class="container">
    <div class="layout-sidebar">
      <sider-bar @active-item="activeItem"></sider-bar>
    </div>
    <div class="content">
      <div v-if="activeIndex === 0">
        <navigation></navigation>
      </div>
      <div v-if="activeIndex === 1">
        <template-store></template-store>
      </div>
      <div v-if="activeIndex === 2">
        <components-store></components-store>
      </div>
      <div v-if="activeIndex === 3">
        <document></document>
      </div>
      <div v-if="activeIndex === 4">
        <workflow></workflow>
      </div>
      <div v-if="activeIndex === 5">
        <toolbox></toolbox>
      </div>
      <div v-if="activeIndex === 99">
        <versions></versions>
      </div>
    </div>
  </div>
</template>

<script>
// import Config from './config';
import Navigation from './navigation/index';
import SiderBar from './sider-bar';
import Versions from './versions';
import Toolbox from './toolbox/index';
import Document from './document/index';
import Workflow from './workflow/index';
import ComponentsStore from './components-store/index';
import TemplateStore from './template-store/index';
export default {
    components: {
        Navigation,
        SiderBar,
        Versions,
        Toolbox,
        Document,
        Workflow,
        ComponentsStore,
        TemplateStore
    },
    data() {
        return {
            drawer: false,
            activeIndex: ''
        };
    },
    mounted() {

    },
    methods: {
        activeItem(activeId) {
            this.activeIndex = activeId;
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .layout-sidebar {
    flex: 0 0 68px;
    height: 100%;
    background: #0f2850;
    position: relative;
  }
  .content {
    flex: 1;
    height: 100%;
    background-color: #f3f3f3;
  }
}
</style>
