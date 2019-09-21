<template>
  <div class="workflow-topbar">
    <h3 class="title">{{headerTitle}}</h3>
    <div class="module"></div>
    <div class="search"></div>
  </div>
</template>

<script>
export default {
    props: {
        headerTitle: {
            type: String,
            default: '标题'
        }
    },
    data() {
        return {
            searchItem: 'value'
        };
    }
};
</script>

<style lang="scss" scoped>
.workflow-topbar {
  height: 60px;
  padding: 0 5px;
  border-bottom: 0.5px solid #e0e0e0;
  background: #ffffff;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  text-align: center;
  .title {
    flex: 0.1;
    text-align: left;
    padding-left: 15px;
  }

  .module {
    flex: 0.6;
  }
  .search {
    flex: 0.3;
  }
}
</style>
