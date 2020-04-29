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
			:show-close="false"
			:before-close="
				() => {
					this.drawer = false;
				}
			"
		>
		<div slot="title" class="drawer-title">
			配置
			<el-button
                type="primary"
                round
				icon="el-icon-plus"
                @click="innerDrawer = true"
                >添加</el-button>
				<el-drawer
					title="添加"
					:append-to-body="true"
					:wrapperClosable="false"
					:visible.sync="innerDrawer">
						<el-form :model="baseItem" ref="baseItem" size="mini" style="width:300px;" label-width="60px">
							<el-form-item
								label="简称"
								prop="websiteName"
								:rules="[
									{ required: true, message: '名称必填'},
								]"
							>
								<el-input type="text" v-model.trim="baseItem.websiteName" style="margin-right: 20px;" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item
								label="URL"
								prop="websiteUrl"
								:rules="[
									{ required: true, message: 'URL必填'},
								]"
							>
								<el-input type="age" v-model.trim="baseItem.websiteUrl" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('baseItem')">提交</el-button>
								<el-button @click="resetForm('baseItem')">取消</el-button>
							</el-form-item>
						</el-form>
				</el-drawer>
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
            innerDrawer: false,
            entryList: [],
            baseItem: {
                websiteName: '',
                websiteUrl: '',
                visible: true,
                editable: false
            }
        };
    },
    mounted() {
        this.getEntryList();
    },
    methods: {
        getEntryList() {
            this.$axios.get('http://localhost:3000/entry').then(res => {
                if (res.data.Code === 0) {
                    this.entryList = res.data.Data;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.innerDrawer = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleAddShortcut();
                } else {
                    return false;
                }
            });
        },
        handleSwitch(index) {
            this.entryList[index].visible = !this.entryList[index].visible;
        },
        // 添加便签
        handleAddShortcut() {
            this.$axios.post('http://localhost:3000/entry', {
                ...this.baseItem
            }).then(res => {
                this.$message.success('添加成功');
                this.innerDrawer = false;
                this.getEntryList();
            });
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
		padding: 10px 20px 0;
	}
	/deep/ .el-drawer__body {
		overflow-y: auto;
	}
	/deep/ .el-button+.el-button {
		margin-left: 0;
	}
	.drawer-title {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		/deep/.el-drawer .el-drawer__header {
			margin-bottom: 10px;
			padding: 10px 20px 0;
		}
		.inner-form {
			width: 280px;
			padding: 10px;
		}
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
				float: right;
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
