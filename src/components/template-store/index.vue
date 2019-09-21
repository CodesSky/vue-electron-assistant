<template>
  <div class="template-container">
    <topbar header-title="模板库"></topbar>
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
.template-container {
}
</style>
