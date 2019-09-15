<template>
      <el-timeline class="timeline-style">
        <el-timeline-item v-for="(activity, index) in versionList" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
            {{activity.content}}
        </el-timeline-item>
    </el-timeline>
</template>

<script>
export default {
    data () {
        return {
            versionList: [
                {
                    content: 'version: 0.0.1 支持基本页面快捷打开,暂时只支持系统macos',
                    timestamp: '2019-08-01 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-s-tools'
                },
                {
                    content:
            'version: 0.0.2 支持快捷项配置，拖拽排序，增加和删除，页面打开方式为新窗口打开，暂时只支持系统macos',
                    timestamp: '2019-08-05 17:00',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-s-tools'
                },
                {
                    content: 'version: 0.0.3 同时支持windows版本',
                    timestamp: '具体时间忘记了',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-s-tools'
                },
                {
                    content: 'version: 1.0.0 更改工具名字,添加侧边栏和功能区分类',
                    timestamp: '2019-09-12 01:00',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-s-tools'
                },
                {
                    content: `version: 1.1.0
                    ①更改项目名称为vue-electron-assistant并调整结构;
                    ②升级electron 到6.0.0版本;
                    ③element-ui到2.12.0版本;
                    ④更换了应用字体，反正就是好看了😁;
                    ⑤更改mac版本顶部栏的快捷图标;
                    `,
                    timestamp: '2019-09-15 12:00',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-s-tools'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.timeline-style {
    padding: 20px 20px;
}
</style>
