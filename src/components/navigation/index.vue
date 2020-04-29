/* eslint-disable no-mixed-spaces-and-tabs */
<template>
	<div class="navigation-container">
		<div class="navigation-topbar">
			<h3 class="title">传送门</h3>
			<div class="module"></div>
			<el-button
				type="text"
				icon="el-icon-setting"
				size="small"
				class="setting-btn"
				@click="
					() => {
						this.drawer = true;
					}
				"
				circle
			></el-button>
		</div>
		<config class="content-item" :entry-list="entryList"></config>
		<el-drawer
			title="设置"
			size="320px"
			:visible.sync="drawer"
			direction="rtl"
			:before-close="
				() => {
					this.drawer = false;
				}
			"
		>
		<div slot="title">
			配置
		</div>
			<div class="config-part">
				<el-form>
					<el-form-item label="" label-width="120">
						<draggable
							:list="entryList"
							class="list-group"
							ghost-class="ghost"
							@start="dragging = true"
							@end="dragging = false"
						>
							<div
								class="list-group-item"
								v-for="(element, index) in entryList"
								:key="element.websiteName"
							>
								<el-row>
									<el-col :span="20">
										<span>
											<strong style="text-align:left;padding-left:5px;">
												{{ element.websiteName }}
											</strong>
										</span>

									</el-col>
									<el-col :span="4">
										<el-popover
											placement="right"
											width="400"
											trigger="click"
										>
											<el-input
												v-model="element.websiteName"
												:disabled="!element.editable"
												placeholder="请填写名称"
											>
												<template slot="prepend">
													<el-button
														type="primary"
														plain
														@click="
															element.editable = !element.editable
														"
														>{{
															element.editable
																? "保存"
																: "编辑"
														}}</el-button
													>
												</template>
											</el-input>
											<el-input
												v-model="element.websiteUrl"
												:disabled="!element.editable"
												placeholder="请填写跳转链接"
											>
												<template slot="prepend">
													<el-button
														type="primary"
														plain
														@click="
															element.editable = !element.editable
														"
														>{{
															element.editable
																? "保存"
																: "编辑"
														}}</el-button
													>
												</template>
											</el-input>
											<el-button
												slot="reference"
												type="text"
												icon="el-icon-edit"
											></el-button>
										</el-popover>
										<el-button
											type="text"
											icon="el-icon-delete"
											@click="handleDelete(index)"
										></el-button>
										<el-button
											type="text"
											:icon="`${element.visible ? 'el-icon-open' : 'el-icon-turn-off'}`"
											@click="handleSwitch(index)"
										></el-button>
									</el-col>
								</el-row>
							</div>
						</draggable>
					</el-form-item>
				</el-form>
				<div class="drawer-footer">
					<el-button
						type="primary"
						plain
						class="btn"
						@click="handleAddShortcut"
						>添加</el-button
					>
					<el-button
						type="primary"
						class="btn"
						@click="handleSaveSetting"
						>保存</el-button
					>
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
            // entryList: [
            //     {
            //         id: 1,
            //         websiteName: 'Dart',
            //         websiteUrl:
            // 			'http://webtest.tcy365.org:1505/dart/index.html#/log',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 2,
            //         websiteName: 'OA',
            //         websiteUrl: 'http://oa.ct108.com/#/login',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 3,
            //         websiteName: 'ElementUI',
            //         websiteUrl: 'https://element.eleme.cn/#/zh-CN',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 4,
            //         websiteName: 'Echarts',
            //         websiteUrl: 'https://echarts.baidu.com/index.html',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         websiteName: 'GitLab',
            //         websiteUrl: 'http://192.168.101.244/users/sign_in',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 5,
            //         websiteName: 'GitBlit',
            //         websiteUrl: 'http://192.168.1.146:8080/repositories/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 6,
            //         websiteName: 'Vue',
            //         websiteUrl: 'https://cn.vuejs.org/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 7,
            //         websiteName: 'React',
            //         websiteUrl: 'https://react.docschina.org/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 8,
            //         websiteName: 'Angular',
            //         websiteUrl: 'https://angular.cn/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 9,
            //         websiteName: 'ES6阮一峰',
            //         websiteUrl:
            // 			'http://es6.ruanyifeng.com/?search=Array.of&x=0&y=0#docs/set-map',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 10,
            //         websiteName: 'Vuex',
            //         websiteUrl: 'https://vuex.vuejs.org/zh/guide/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 11,
            //         websiteName: 'YAPI',
            //         websiteUrl: 'http://yapi.tcy365.org:3000/group/166',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 12,
            //         websiteName: '禅道',
            //         websiteUrl: 'http://192.168.1.50/zentao/my/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 13,
            //         websiteName: 'Electron',
            //         websiteUrl: 'https://electronjs.org/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 14,
            //         websiteName: 'ShowDoc',
            //         websiteUrl: 'http://doc.uc108.org:8002/web/#/item/index',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 15,
            //         websiteName: 'AntDesign',
            //         websiteUrl: 'https://ant.design/index-cn',
            //         visible: true
            //     },
            //     {
            //         id: 16,
            //         websiteName: 'TypeScript',
            //         websiteUrl: 'https://www.tslang.cn/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 17,
            //         websiteName: 'React小书',
            //         websiteUrl: 'http://huziketang.mangojuice.top/books/react/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 18,
            //         websiteName: 'Sass',
            //         websiteUrl: 'https://www.sasscss.com/sass-guidelines/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 19,
            //         websiteName: 'Flutter',
            //         websiteUrl: 'https://flutter.cn/docs',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 20,
            //         websiteName: '流程工作表',
            //         websiteUrl:
            // 			'http://webtest.tcy365.org:1505/P-WorkFlow/index.html#/',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 21,
            //         websiteName: '自动化流程',
            //         websiteUrl:
            // 			'http://doc.uc108.org:8002/web/#/168?page_id=5084',
            //         visible: true,
            //         editable: false
            //     },
            //     {
            //         id: 22,
            //         websiteName: '常用正则表达式 ',
            //         websiteUrl:
            // 			'https://www.json.cn/',
            //         visible: true,
            //         editable: false
            //     }
            // ],
            entryList: []
        };
    },
    mounted() {
        this.$axios.get('http://localhost:3000/entry').then(res => {
            if (res.data.Code === 0) {
                this.entryList = res.data.Data;
            }
        });
    },
    methods: {
        handleSwitch(index) {
            this.entryList[index].visible = !this.entryList[index].visible;
        },
        handleAddShortcut() {
            const item = {
                websiteName: '自定义',
                websiteUrl: '',
                visible: true,
                editable: false
            };

            this.entryList.unshift(item);
            // this.$axios.post('http://localhost:3000/entry', {
            //     data: {
            //         item: item
            //     }
            // });
        },
        handleSaveSetting() {
            if (localStorage.getItem('entryConfigList')) {
                localStorage.removeItem('entryConfigList');
                localStorage.setItem(
                    'entryConfigList',
                    JSON.stringify(this.entryList)
                );
            }
            this.drawer = false;
        },
        handleDelete(index) {
            this.$confirm(
                `此操作将永删除该配 ${this.entryList[index].websiteName} 置项, 是否继续?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }
            )
                .then(() => {
                    this.entryList.splice(index, 1);
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
	/deep/ .el-drawer__header {
		margin-bottom: 10px;
		padding: 0 20px 0;
	}
	/deep/ .el-drawer__body {
		overflow-y: auto;
	}
	/deep/ .el-button+.el-button {
		margin-left: 0;
	}
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
			border-radius: 5px;
			background-color: #c8ebfb;
			margin-bottom: 5px;
			cursor: move;
		}
	}

	.config-part {
		margin: 5px 10px;
		.drawer-footer {
			text-align: center;
			.btn {
				margin-left: 10px;
			}
		}
		.setting {
			overflow-y: auto;
		}
	}

	.list-group-item i {
		cursor: pointer;
	}
}
</style>
