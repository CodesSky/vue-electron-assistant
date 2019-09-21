<template>
    <div class="container">
        <template v-for="(item,index) of EntryList">
            <el-card shadow="always" class="card-item" v-if="item.visiable" :key="index">
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
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;

    .card-item {
        margin: 10px 10px 10px 10px;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        text-align: center;

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
        background-size: 100% 100%;
    }

    .gitblit-bg {
        background-size: 100% 100%;
    }
}
</style>
