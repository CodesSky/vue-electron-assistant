<template>
    <div class="menu-sidebar">
        <div class="fireworks-menu">
            <ul >
                <li v-for="(item, index) of sidebarList" :key="item.itemId">
                    <a :class="item.active ? 'active' : ''" @click="handleActive(index)">
                        <i :class="item.itemIcon" :style="{ color: item.active ? '#fff' : ''}"></i>
                        <span class="menu-tip" :style="{ color: item.active ? '#fff' : ''}">{{item.itemName}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <el-button type="text" class="setting-item" icon="el-icon-setting" size="small" @click="handleSetting"></el-button>
    </div>

</template>

<script>
export default {
    data() {
        return {
            sidebarList: [
                {
                    itemName: '导航',
                    itemIcon: 'el-icon-s-promotion menu-icon',
                    itemId: 0,
                    active: true
                },
                {
                    itemName: '模板',
                    itemIcon: 'el-icon-s-data menu-icon',
                    itemId: 1,
                    active: false
                },
                {
                    itemName: '组件',
                    itemIcon: 'el-icon-s-grid menu-icon',
                    itemId: 2,
                    active: false
                },
                {
                    itemName: '文档',
                    itemIcon: 'el-icon-s-management menu-icon',
                    itemId: 3,
                    active: false
                },
                {
                    itemName: '工作',
                    itemIcon: 'el-icon-s-platform menu-icon',
                    itemId: 4,
                    active: false
                },
                {
                    itemName: '工具',
                    itemIcon: 'el-icon-s-tools menu-icon',
                    itemId: 5,
                    active: false
                }
            ]
        };
    },
    mounted() {
        this.$emit('active-item', 0);
    },
    methods: {
        handleSetting() {
            this.$emit('active-item', 99);
        },
        handleActive(idx) {
            this.setDefault();
            this.sidebarList[idx].active = true;
            this.$emit('active-item', idx);
        },
        setDefault() {
            this.sidebarList.map(item => {
                item.active = false;
            });
        }

    }
};
</script>

<style lang="scss" scoped>
.menu-sidebar {
    height: 100%;
    padding-top: 35px;
    position: relative;
    .setting-item {
        position: absolute;
        bottom: 50px;
        left: 26px;
        font-size: 16px !important;
    }
    ol, ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .fireworks-menu {
        position: relative;

        a {
            display: block;
            text-align: center;
            cursor: pointer;
            padding: 11px 0;
            text-decoration: none;
            color: rgba(255,255,255,.7);
            position: relative;

            &:hover::before {
                content: '';
                display: block;
                width: 4px;
                height: 40px;
                position: absolute;
                top: 11px;
                left: 0;
                border-radius: 2px;
                background-color: rgba(255,255,255,.6);
            }
            .menu-icon {
                font-size: 18px;
            }
            .menu-tip {
                padding-top: 4px;
                font-size: 11px;
                color: rgba(255,255,255,.7);
                display: block;
            }
        }
        .active::before {
                content: '';
                display: block;
                width: 4px;
                height: 40px;
                position: absolute;
                top: 11px;
                left: 0;
                border-radius: 2px;
                background-color: #fff;
        }
    }

}
</style>
