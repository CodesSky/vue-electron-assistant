<template>
    <div class="container">
        <template v-for="(item,index) of EntryList">
            <el-card shadow="always" :class="item.websiteBg" v-if="item.visiable" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{item.websiteName}}</span>
                </div>
                <div class="bottom clearfix">
                    <a :href="item.websiteUrl" target="_blank" style="text-align:center;" class="el-button el-button--mini el-button--plain">进入</a>
                </div>
            </el-card>
        </template>
    </div>

<!-- </div> -->
</template>

<script>
export default {
    props: {
        EntryList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .el-card {
        margin: 20px;
        width: 150px;

        a {
            text-decoration: none;
        }

        .bottom {
            display: flex;
            align-content: center;
            justify-content: center;
        }
    }

    .element-bg {
        background-image: url('../assets/element.png');
        background-size: 100% 100%;
    }

    .gitblit-bg {
        background-image: url('../assets/gitblit-bg.png');
        background-size: 100% 100%;
    }
}
</style>
