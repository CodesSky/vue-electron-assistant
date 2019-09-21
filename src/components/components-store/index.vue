<template>
  <div class="components-container">
    <topbar header-title="组件库"></topbar>
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
.components-container {
}
</style>
