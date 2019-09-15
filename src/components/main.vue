<template>
  <div class="container">
    <div class="layout-sidebar">
        <sider-bar @active-item="activeItem"></sider-bar>
    </div>
    <div class="content">
      <div v-if="activeIndex === 0">
          <el-button type="text"
                 icon="el-icon-setting"
                 size="small"
                 class="config"
                 @click="() => {this.drawer = true}"
                 circle></el-button>

        <config class="content-item" :entry-list="EntryList"></config>
      </div>
      <div v-if="activeIndex === 0">
          <config></config>
      </div>
      <div v-if="activeIndex === 1">
          <template-store></template-store>
      </div>
      <div v-if="activeIndex === 2">
          <components-store></components-store>
      </div>
      <div v-if="activeIndex === 3">
          <document></document>
      </div>
      <div v-if="activeIndex === 4">
          <workflow></workflow>
      </div>
      <div v-if="activeIndex === 5">
          <toolbox></toolbox>
      </div>
      <div v-if="activeIndex === 99">
          <versions></versions>
      </div>
    </div>
    <el-drawer title="设置"
                 size="300"
                 :visible.sync="drawer"
                 direction="rtl"
                 :before-close="() => { this.drawer = false }">
        <div class="config-part demo-drawer__content">
          <span style="margin-left: 10px;">拖拽排序</span>
          <el-button type="primary"
                     icon="el-icon-plus"
                     plain
                     @click="handleAddShortcut">添加</el-button>
          <el-button type="primary"
                     @click="handleSaveSetting">保存配置</el-button>

          <div class="setting"
               style="padding: 10px;">
            <draggable :list="EntryList"
                       class="list-group"
                       ghost-class="ghost"
                       @start="dragging = true"
                       @end="dragging = false">
              <div class="list-group-item"
                   v-for="(element,index) in EntryList"
                   :key="element.websiteName">
                <el-tag size="small"
                        effect="dark">{{ element.websiteName }}</el-tag>
                <el-popover placement="right"
                            width="400"
                            trigger="click">
                  <el-input v-model="element.websiteUrl"
                            :disabled="!element.editable"
                            placeholder="请填写跳转链接">
                    <template slot="prepend">
                      <el-button type="primary"
                                    size="mini"
                                 @click=" element.editable = !element.editable ">{{ element.editable ? '保存' : '编辑' }}</el-button>
                    </template>
                  </el-input>
                  <el-button slot="reference"
                             style="float: right;"
                             size="mini"
                             circle
                             icon="el-icon-edit"></el-button>
                </el-popover>
                <el-switch style="float: right;padding-top: 5px;"
                           v-model="element.visiable">
                </el-switch>
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           plain
                           @click="handleDelete(index)"></el-button>
              </div>
            </draggable>
          </div>
        </div>
      </el-drawer>
  </div>
</template>

<script>
import Config from './config';
import SiderBar from './sider-bar';
import Versions from './versions';
import Toolbox from './toolbox/index';
import Document from './document/index';
import Workflow from './workflow/index';
import ComponentsStore from './components-store/index';
import TemplateStore from './template-store/index';
import draggable from 'vuedraggable';
export default {
    components: {
        Config,
        SiderBar,
        Versions,
        Toolbox,
        Document,
        Workflow,
        ComponentsStore,
        TemplateStore,
        draggable
    },
    data() {
        return {
            drawer: false,
            activeIndex: '',
            EntryList: [
                {
                    id: 1,
                    websiteName: 'Dart',
                    websiteUrl: 'http://webtest.tcy365.org:1505/dart/index.html#/log',
                    websiteBg: 'dart-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 2,
                    websiteName: 'OA',
                    websiteUrl: 'http://oa.ct108.com/#/login',
                    websiteBg: 'oa-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 3,
                    websiteName: 'ElementUI',
                    websiteUrl: 'https://element.eleme.io/2.11/#/zh-CN',
                    websiteBg: 'element-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 4,
                    websiteName: 'Echarts',
                    websiteUrl: 'https://echarts.baidu.com/index.html',
                    websiteBg: 'echarts-bg',
                    visiable: true,
                    editable: false
                },
                {
                    websiteName: 'GitLab',
                    websiteUrl: 'http://192.168.101.244/users/sign_in',
                    websiteBg: 'gitlab-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 5,
                    websiteName: 'GitBlit',
                    websiteUrl: 'http://192.168.1.146:8080/repositories/',
                    websiteBg: 'gitblit-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 6,
                    websiteName: 'Vue',
                    websiteUrl: 'https://cn.vuejs.org/',
                    websiteBg: 'vue-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 7,
                    websiteName: 'React',
                    websiteUrl: 'https://react.docschina.org/',
                    websiteBg: 'react-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 8,
                    websiteName: 'Angular',
                    websiteUrl: 'https://angular.cn/',
                    websiteBg: 'angular-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 9,
                    websiteName: 'ES6阮一峰',
                    websiteUrl:
            'http://es6.ruanyifeng.com/?search=Array.of&x=0&y=0#docs/set-map',
                    websiteBg: 'es6-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 10,
                    websiteName: 'Vuex',
                    websiteUrl: 'https://vuex.vuejs.org/zh/guide/',
                    websiteBg: 'vuex-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 11,
                    websiteName: 'YAPI',
                    websiteUrl: 'http://yapi.tcy365.org:3000/group/166',
                    websiteBg: 'yapi-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 12,
                    websiteName: '禅道',
                    websiteUrl: 'http://192.168.1.50/zentao/my/',
                    websiteBg: 'zentao-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 13,
                    websiteName: 'Electron',
                    websiteUrl: 'https://electronjs.org/',
                    websiteBg: 'electron-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 14,
                    websiteName: 'ShowDoc',
                    websiteUrl: 'http://doc.uc108.org:8002/web/#/item/index',
                    websiteBg: 'showdoc-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 15,
                    websiteName: 'AntDesign',
                    websiteUrl: 'https://ant.design/index-cn',
                    websiteBg: 'antdesign-bg',
                    visiable: true
                },
                {
                    id: 16,
                    websiteName: 'TypeScript',
                    websiteUrl: 'https://www.tslang.cn/',
                    websiteBg: 'typescript-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 17,
                    websiteName: 'React小书',
                    websiteUrl: 'http://huziketang.mangojuice.top/books/react/',
                    websiteBg: 'reactbook-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 18,
                    websiteName: 'Sass',
                    websiteUrl: 'https://www.sasscss.com/sass-guidelines/',
                    websiteBg: 'sass-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 19,
                    websiteName: 'Flutter',
                    websiteUrl: 'https://flutterchina.club/docs/',
                    websiteBg: 'flutter-bg',
                    visiable: true,
                    editable: false
                },
                {
                    id: 20,
                    websiteName: '流程工作表',
                    websiteUrl: 'http://webtest.tcy365.org:1505/P-WorkFlow/index.html#/',
                    websiteBg: 'flutter-bg',
                    visiable: true,
                    editable: false
                }
            ]
        };
    },
    mounted() {
        if (localStorage.getItem('entryConfigList')) {
            this.EntryList = JSON.parse(localStorage.getItem('entryConfigList'));
        }
    },
    methods: {

        activeItem(activeId) {
            this.activeIndex = activeId;
        },
        handleAddShortcut() {
            const item = {
                websiteName: '自定义',
                websiteUrl: '',
                websiteBg: '',
                visiable: true,
                editable: false
            };

            this.EntryList.unshift(item);
        },
        handleSaveSetting() {
            if (localStorage.getItem('entryConfigList')) {
                localStorage.removeItem('entryConfigList');
                localStorage.setItem('entryConfigList', JSON.stringify(this.EntryList));
            }
        },
        handleDelete(index) {
            this.$confirm(
                `此操作将永删除该配 ${this.EntryList[index].websiteName} 置项, 是否继续?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }
            )
                .then(() => {
                    this.EntryList.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height:100vh;
  overflow: hidden;

  .layout-sidebar {
    flex: 0 0 68px;
    height: 100%;
    background: #0f2850;
    position: relative;
  }
  .content {
    flex: 1;
    height: 100%;
    background: #ffffff;

    .content-item {
        overflow-y: auto;
    }
  }
}

.setting {
    margin-top: 10px;
    height: 100vh;
    overflow-y: scroll;
}

.config {
  position: fixed;
  right: 5px;
  z-index: 1;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group-item {
  width: 300px;
  height: 30px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  background-color: #c8ebfb;
  margin-bottom: 5px;
  cursor: move;
}

.config-part {
  margin-left: 10px;
}

.list-group-item i {
  cursor: pointer;
}
</style>
