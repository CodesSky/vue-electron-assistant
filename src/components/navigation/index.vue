/* eslint-disable no-mixed-spaces-and-tabs */
<template>
	<div class="navigation-container">
		<div class="navigation-topbar">
			<h3 class="title">传送门</h3>
			<div class="module">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-select style="width: 100%;" v-model="searchId" @clear="handleClear" clearable filterable  placeholder="请选择">
						  <el-option v-for="entry in entryList" :key="entry._id" :label="entry.websiteName" :value="entry._id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="2">
						<el-button type="primary" @click="handleSearch" round>查 找</el-button>
					</el-col>
					<el-col :span="14"></el-col>
				</el-row>

			</div>
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
                @click="handleAdd"
                >添加</el-button>

		</div>
		<el-drawer
			:title="innerDrawerTitle"
			size="320px"
			direction="rtl"
			:show-close="false"
			:append-to-body="true"
			:withHeader="true"
			:wrapperClosable="false"
			:visible.sync="innerDrawer">
					<div slot="title">
						<el-page-header @back="handleInnerBack" content="添加便签">
					</el-page-header>
					</div>
						<el-form :model="baseItem" ref="baseItem" style="padding-right:10px;" label-width="10px">
							<el-form-item
								label=""
								prop="websiteName"
								:rules="[
									{ required: true, message: '名称必填'},
								]"
							>
								<el-input type="text" v-model.trim="baseItem.websiteName" style="margin-right: 20px;" placeholder="简称" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item
								label=""
								prop="websiteUrl"
								:rules="[
									{ required: true, message: 'URL必填'},
								]"
							>
								<el-input type="age" v-model.trim="baseItem.websiteUrl" placeholder="有效的URL" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" v-if="innerDrawerTitle === '添加便签'" @click="submitForm('baseItem')">保存</el-button>
								<el-button type="primary" v-if="innerDrawerTitle === '编辑便签'" @click="editForm('baseItem')">保存</el-button>
								<el-button @click="resetForm('baseItem')">取消</el-button>
							</el-form-item>
						</el-form>
				</el-drawer>
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
										<el-button
											type="text"
											icon="el-icon-edit"
											@click="handleEdit(element._id, index)"
										></el-button>
										<el-popconfirm
											title="确认删除?"
											confirmButtonText='是'
  											cancelButtonText='否'
											@onConfirm="handleDelete(element._id)"
										>
											<el-button
												slot="reference"
												type="text"
												icon="el-icon-delete"
											></el-button>
										</el-popconfirm>
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
            searchId: '',
            entryList: [],
            innerDrawerTitle: '',
            currIndex: -1,
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
        handleSearch() {
            if (this.searchId) {
                this.$axios.get(`http://localhost:3000/searchEntry/${this.searchId}`).then(res => {
                    if (res.data.Code === 0) {
                        this.entryList = res.data.Data;
                    }
                });
            }
        },
        handleClear() {
            this.getEntryList();
        },
        getEntryList() {
            this.$axios.get('http://localhost:3000/entrylist').then(res => {
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
        editForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleEditShortcut();
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
            this.$axios.post('http://localhost:3000/addEntry', {
                websiteName: this.baseItem.websiteName,
                websiteUrl: this.baseItem.websiteUrl,
                visible: true,
                editable: false
            }).then(res => {
                this.$message.success('添加成功');
                this.innerDrawer = false;
                this.getEntryList();
            });
        },
        // 编辑便签
        handleEditShortcut() {
            this.$axios.post('http://localhost:3000/updateEntry', {
                id: this.baseItem._id,
                websiteName: this.baseItem.websiteName,
                websiteUrl: this.baseItem.websiteUrl,
                visible: true,
                editable: false
            }).then(res => {
                if (res.data.Code === 0) {
                    this.$message.success('编辑成功');
                    this.innerDrawer = false;
                    this.getEntryList();
                } else {
                    this.$message.error(res.data.Message);
                }
            });
        },
        handleAdd() {
            this.innerDrawerTitle = '添加便签';
            this.innerDrawer = true;
            this.baseItem = {};
        },
        handleInnerBack() {
            this.$refs.baseItem.resetFields();
            this.innerDrawer = false;
        },
        handleEdit(id, index) {
            this.innerDrawerTitle = '编辑便签';
            this.currIndex = index;
            this.innerDrawer = true;
            this.baseItem = {
                ...this.entryList[index]
            };
        },
        handleDelete(id) {
            this.$axios.post('http://localhost:3000/deleteEntry', {
                id: id
            }).then(res => {
                if (res.data.Code === 0) {
                    this.$message.success('删除成功');
                    this.innerDrawer = false;
                    this.getEntryList();
                }
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
	/deep/ .el-input__inner {
		border-radius: 20px;
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
