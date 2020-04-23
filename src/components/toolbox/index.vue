<template>
	<div class="toolbox-container">
		<topbar header-title="工具箱"> </topbar>
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
            value: ''
        };
    }
};
</script>

<style lang="scss" scoped>
.toolbox-container {

}
</style>
