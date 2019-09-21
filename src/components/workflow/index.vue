<template>
  <div class="workflow-container">
    <topbar header-title="工作流"></topbar>
    <div class="workflow-content"></div>

  </div>
</template>

<script>
import Topbar from '@/components/layout/topbar.vue';
export default {
    components: {
        Topbar
    },
    data() {
        return {
            key: ''
        };
    }
};
</script>

<style lang="scss" scoped>
.workflow-container {
}
</style>
