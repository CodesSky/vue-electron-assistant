<template>
  <div class="document-container">
    <topbar header-title="文档区"></topbar>
    <div class="document-content">
      <mavon-editor class="editor"
                    v-model="value" />
    </div>
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
            value: ``
        };
    }
};
</script>

<style lang="scss" scoped>
.document-container {
  .document-content {
    padding: 10px;

    .editor {
      max-height: 960px;
      overflow: auto;
    }
  }
}
</style>
