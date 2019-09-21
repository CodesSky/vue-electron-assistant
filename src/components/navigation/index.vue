<template>
  <div class="navigation-container">
    <div class="navigation-topbar">
      <h3 class="title">传送门</h3>
      <div class="module"></div>
      <el-button type="text"
                 icon="el-icon-setting"
                 size="small"
                 class="setting-btn"
                 @click="() => {this.drawer = true}"
                 circle></el-button>
    </div>
    <config class="content-item"
            :entry-list="EntryList"></config>
    <el-drawer title="设置"
               size="300px"
               :visible.sync="drawer"
               direction="rtl"
               :before-close="() => { this.drawer = false }">
      <div class="config-part demo-drawer__content">
        <el-form>
          <el-form-item label=""
                        label-width="120">
            <draggable :list="EntryList"
                       class="list-group"
                       ghost-class="ghost"
                       @start="dragging = true"
                       @end="dragging = false">
              <div class="list-group-item"
                   v-for="(element,index) in EntryList"
                   :key="element.websiteName">
                <el-tag size="small"
                        class="tag-title"
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
                                 plain
                                 @click=" element.editable = !element.editable ">{{ element.editable ? '保存' : '编辑' }}</el-button>
                    </template>
                  </el-input>
                  <el-button slot="reference"
                             size="mini"
                             class="tag-edit"
                             circle
                             icon="el-icon-edit"></el-button>
                </el-popover>
                <el-switch class="tag-switch"
                           v-model="element.visiable"></el-switch>
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           class="tag-delete"
                           plain
                           @click="handleDelete(index)"></el-button>
              </div>
            </draggable>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer"
             style="text-align:center;">
          <el-button type="primary"
                     plain
                     class="btn"
                     @click="handleAddShortcut">添加</el-button>
          <el-button type="primary"
                     class="btn"
                     @click="handleSaveSetting">保存</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Config from './config.vue';
import Draggable from 'vuedraggable';

export default {
    components: {
        Config,
        Draggable
    },
    data() {
        return {
            drawer: false,
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
                    websiteUrl: 'https://flutter.cn/docs',
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
                },
                {
                    id: 21,
                    websiteName: '自动化流程',
                    websiteUrl: 'http://doc.uc108.org:8002/web/#/168?page_id=5084',
                    websiteBg: 'flutter-bg',
                    visiable: true,
                    editable: false
                }
            ]
        };
    },
    methods: {
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
.navigation-container {
  .navigation-topbar {
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
    .setting-btn {
      flex: 0.3;
      position: fixed;
      right: 5px;
      z-index: 1;
    }
  }
  .content-item {
    height: 100vh;
    overflow-y: auto;
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

  .list-group {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .list-group-item {
      width: 300px;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-content: center;
      background-color: #c8ebfb;
      margin-bottom: 5px;
      cursor: move;
      .tag-title {
        width: 75px;
      }
      .tag-edit {
        width: 75px;
      }
      .tag-switch {
        width: 75px;
      }
      .tag-delete {
        width: 75px;
      }
    }
  }

  .config-part {
    margin: 5px 10px;
    .setting {
      max-height: 600px;
      overflow-y: scroll;
    }
    .operation {
    }
  }

  .list-group-item i {
    cursor: pointer;
  }
}
</style>
