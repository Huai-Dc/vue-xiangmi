<template>
    <div class="benefit-public-content">
        <van-nav-bar
                title="菜品发布"
                :fixed="fixed"
        />
        <van-row type="flex" justify="center">
            <van-col span="22">
                <div class="form-title">活动名称</div>
                <van-field v-model="activeName" v-on:blur="saveEditorData" placeholder="请输入活动名称"/>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center" class="insert-row-bar">
            <van-col span="22">
                <van-button type="danger" size="small" @click.native="menuAddShow=true">新增菜单</van-button>
            </van-col>
        </van-row>

        <!-- 菜单表格 -->
        <van-cell-group class="table-content">
            <van-row type="flex" justify="center" class="table-title">
                <van-col span="3">
                    序号
                </van-col>
                <van-col span="4">
                    菜名
                </van-col>
                <van-col span="4">
                    原价
                </van-col>
                <van-col span="4">
                    折扣价
                </van-col>
                <van-col span="4">
                    限制数量
                </van-col>
                <van-col span="3" class="handler-col">
                    删除
                </van-col>
            </van-row>
            <template v-for="(item, index) in tableCols">
                <van-row type="flex" justify="center">
                    <van-col span="3">
                        {{index+1}}
                    </van-col>
                    <van-col span="4">
                        {{item.menu_name}}
                    </van-col>
                    <van-col span="4">
                        {{item.price}}
                    </van-col>
                    <van-col span="4">
                        {{item.disprice}}
                    </van-col>
                    <van-col span="4">
                        {{item.limit_num}}
                    </van-col>
                    <van-col span="3" class="handler-col">
                        <van-icon name="cross" @click.native="delItem(item)"/>
                        <!--<span name="cross" @click="delItem(item)">删除</span>-->
                    </van-col>
                </van-row>
            </template>
        </van-cell-group>
        <van-row type="flex" justify="center">
            <van-col span="22">
                <div class="form-title">活动条件</div>
                <!--<van-field v-model="condition" type="textarea" placeholder="请输入活动条件" rows="3"-->
                <!--autosize/>-->
                <vue-html5-editor :content="condition" :height="200" @change='updateCondition'
                ></vue-html5-editor>
            </van-col>
        </van-row>
        <!-- 时间选择 -->
        <van-row type="flex" justify="center">
            <van-col span="22">
                <div class="form-title">时间选择</div>
                <van-row type="flex" justify="center" class="picker-time-bar">
                    <van-col span="11">
                        <van-field v-on:blur="saveEditorData" v-model="startDate" placeholder="开始时间" readonly="readonly" @click="showStart=true"/>
                    </van-col>
                    <van-col span="2">-</van-col>
                    <van-col span="11">
                        <van-field v-on:blur="saveEditorData" v-model="endDate" placeholder="结束时间" readonly="readonly" @click="showEnd=true"/>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="22">
                <div class="form-title">联系电话</div>
                <van-field v-on:blur="saveEditorData" v-model="phone" placeholder="请输入联系电话"/>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="22">
                <div class="form-title">地址</div>
                <div class="tagContent">
                    <!--<van-tag v-for="item of areaList" @click.native="toggleAddress(item)" plain size="large"-->
                    <!--:class="{danger:~checkSelect(item.id)}">{{item.label}}-->
                    <!--</van-tag>-->
                    <van-field v-on:blur="saveEditorData" type="textarea" v-model="fitArea" placeholder="请输入适用地址" rows="3"/>
                </div>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center" class="active-submit-button">
            <van-col span="22" class="submit-button">
                <van-button type="primary" size="large" @click.native="onsubmit">完成</van-button>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <div style="height:50px;"></div>
            </van-col>
        </van-row>
        <!-- 时间弹出层 -->
        <van-popup v-model="showStart" position="bottom">
            <van-datetime-picker
                    v-model="currentDateStart"
                    type="datetime"
                    @cancel="showStart=false"
                    @confirm="getStartTime"
                    :formatter="formatter"
            />
        </van-popup>
        <van-popup v-model="showEnd" position="bottom">
            <van-datetime-picker
                    v-model="currentDateEnd"
                    type="datetime"
                    @cancel="showEnd=false"
                    @confirm="getEndTime"
                    :formatter="formatter"
            />
        </van-popup>
        <!-- 新增菜品 -->
        <van-popup
                v-model="menuAddShow"
                position="bottom"
                @cancel="menuAddShow=false"
                class="add-menu-bar"
        >
            <van-cell-group>
                <van-field
                        v-model="newMenuItem.menu_name"
                        label="菜名"
                        placeholder="请输入菜名"
                        required
                />

                <van-field
                        v-model="newMenuItem.price"
                        label="原价"
                        placeholder="请输入原价"
                        required
                />
                <van-field
                        v-model="newMenuItem.disprice"
                        label="折扣价"
                        placeholder="请输入折扣价"
                        required
                />
                <van-field
                        v-model="newMenuItem.limit_num"
                        label="限制数量"
                        placeholder="请输入限制数量"
                        type="number"
                        required
                />
                <!--<van-field-->
                <!--v-model="newMenuItem.format"-->
                <!--label="备注"-->
                <!--placeholder="请输入备注"-->
                <!--required-->
                <!--/>-->
            </van-cell-group>
            <van-row type="flex" justify="center" class="active-submit-button">
                <van-col span="22" class="submit-button">
                    <van-button type="primary" size="large" @click.native="addItem">添加菜单</van-button>
                </van-col>
            </van-row>
        </van-popup>
    </div>
</template>

<script>
    import {formatTimeToStr} from "../../utils/date";
    import {Tag, Toast} from 'vant';
    import $http from "../../api/http";
    import apis from "../../api/apis";
    import {getCookie, getStorage, removeStorage, setStorage} from "../../utils/storageData";
    import * as qs from "qs";

    export default {
        name: 'Index',
        // 接参数
        props: {},
        // 引入组件
        components: {Tag},
        // 计算
        computed: {},
        // 监听
        watch: {},
        data() {
            return {
                content: '请输入文章内容',
                fixed: true,
                showStart: false,
                showEnd: false,
                menuAddShow: false,
                startDate: '', // 开始时间
                endDate: '', // 结束时间
                currentDateStart: new Date(),
                currentDateEnd: new Date(),

                activeName: '',  // 菜单名称
                tableCols: [  // 菜单列表
                ],
                areaList: [
                    {id: 1, label: '集美分店'},
                    {id: 2, label: '同安分店'},
                    {id: 3, label: '翔安分店'},
                    {id: 4, label: '海沧分店'},
                ],
                selectAddress: [], // 选中的试用地址
                fitArea: '',  // 适用地址
                activeTitle: '', // 活动名称
                condition: '', // 条件
                newMenuItem: {
                    menu_name: '',
                    price: '',
                    disprice: '', // 折扣
                    limit_num: '',  // 限制数量
                    format: '',  /// 备注
                },
                phone: "",  // 联系方式
                postData: {} // 提交数据
            }
        },

        methods: {
            getStartTime(value) {
                this.showStart = false;
                this.startDate = formatTimeToStr(value);
                this.saveEditorData();
            },
            getEndTime(value) {
                this.showEnd = false;
                this.endDate = formatTimeToStr(value);
                this.saveEditorData();
            },
            toggleAddress(item) {
                let indexCode = this.selectAddress.indexOf(item.id);
                if (~indexCode) {
                    this.selectAddress.splice(indexCode, 1);
                } else {
                    this.selectAddress.push(item.id);
                }
            },
            checkSelect(id) {
                return this.selectAddress.indexOf(id);
            },
            saveEditorData() {// 保存编辑中的数据
                setStorage('benefit_data', qs.stringify({
                    "activeName": this.activeName,
                    "startDate": this.startDate,
                    "endDate": this.endDate,
                    "fitArea": this.fitArea,
                    "condition": this.condition,
                    "tableCols": this.tableCols,
                    "mobile": this.phone,
                }));
            },
            getEditorData(){
                let data = qs.parse(getStorage("benefit_data"));

                this.activeName = data.activeName;
                this.startDate = data.startDate;
                this.endDate = data.endDate;
                this.fitArea = data.fitArea;
                this.condition = data.condition;
                this.tableCols = data.tableCols || [];
                this.phone = data.mobile;
            },
            onsubmit() {
                if (!this.checkdata()) {
                    Toast.fail('请将数据填写完整！');
                    return false;
                }

                this.changeData(this.tableCols);

                this.postData['title'] = this.activeName;
                this.postData['begin_time'] = this.startDate;
                this.postData['end_time'] = this.endDate;
                this.postData['address'] = this.fitArea;
                this.postData['condition'] = this.condition;
                this.postData['mobile'] = this.phone;
                this.postData['token'] = getCookie('User-Token');

                $http.post(apis.baseHost + apis.menuEdit, this.postData).then((res) => {
                    let data = res.data;
                    if (data.code == 1) {
                        removeStorage("benefit_data");
                        let _this = this;
                        Toast({
                            type: "success",
                            message: '新增成功！',
                            onClose() {
                                _this.resetData();
                                _this.$router.push({
                                    name: 'HomeIndex'
                                });
                            }
                        });

                    } else {
                        Toast.fail(data.msg);
                        return false;
                    }
                })
            },
            addItem() {
                let newItemInfo = this.newMenuItem;

                this.tableCols.push({
                    id: 'new_' + Math.random(),
                    menu_name: newItemInfo.menu_name,
                    price: newItemInfo.price,
                    disprice: newItemInfo.disprice,
                    limit_num: newItemInfo.limit_num,
                    format: newItemInfo.format
                });

                this.newMenuItem = {
                    menu_name: '',
                    price: '',
                    disprice: '',
                    limit_num: '',
                    format: '',
                };

                this.menuAddShow = false;
                this.saveEditorData();
            },
            delItem(itemCol) {
                this.tableCols.splice(this.tableCols.findIndex(item => item.id == itemCol.id), 1);
            },
            changeData(menuAddShow) {
                this.postData = {};// 清除残留数据
                menuAddShow.map((item, index) => {
                    for (let x in item) {
                        if (x != "id") {
                            this.postData[x + "[" + index + "]"] = item[x];
                        }
                    }
                })
            },
            checkdata() {
                if (this.activeName == "" || this.startDate == "" || this.endDate == "" || this.fitArea == "" || this.condition == "") {
                    return false;
                }
                return true;
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day') {
                    return `${value}日`
                } else if (type === 'hour') {
                    return `${value}时`
                } else if (type === 'minute') {
                    return `${value}分`
                }
                return value;
            },
            resetData() {
                this.activeName = "";
                this.tableCols = [];
                this.startDate = "";
                this.endDate = "";
                this.fitArea = "";
                this.condition = "";
                this.phone = "";
            },
            updateCondition(e = '') {
                this.condition = e;
                this.saveEditorData();
            },
            getDefaultAdress() {
                $http.post(apis.baseHost + apis.getDefaultAddress, {
                    mid: getCookie('User-Token'),
                    token: getCookie('User-Token')
                }).then(res => {
                    let data = res.data;
                    if (data.code == 1) {
                        this.fitArea = data.data.address;
                        this.phone = data.data.mobile;
                    }
                });
            }
        },

        mounted() {
            this.getDefaultAdress();
            this.getEditorData();
        },
        async created() {

        },
    }
</script>

<style lang="scss" scoped>
    .benefit-public-content {
        background-color: #FFFFFF;
        padding-top: 46px;
        height: 100%;

        .van-row {
            .form-title {
                margin: 1.2rem 0 0.6rem 0;
                font-size: .8rem;
            }

            .van-cell {
                border-radius: .3rem;
                border: 1px solid #D2D2D2;
            }

            .picker-time-bar {
                .van-col {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        .insert-row-bar {
            margin-top: .8rem;
        }

        .table-content {
            border: none;
            margin: .8rem 0;

            .van-row {
                height: 2rem;
                line-height: 2rem;

                .van-col {
                    color: #333333;
                    font-size: .9rem;
                    padding-left: .3rem;
                    border-bottom: 1px solid #E5E5E5;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

            .table-title {
                .van-col {
                    background-color: #E5E5E5;
                    font-weight: bold;
                }
            }

            /*.van-cell {*/
            /*padding: .1rem;*/
            /*}*/

            /*.van-col {*/
            /*padding: .1rem;*/
            /*}*/
        }

        .tagContent {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3rem;

            .danger {
                color: #CD3D39 !important;
            }
        }

        .active-submit-button {
            /*margin-bottom: 6rem;*/

            .submit-button {
                margin: 1rem 0;

                .van-button--primary {
                    color: #fff;
                    background-color: #CD3D39;
                    border: 1px solid #CD3D39;
                    height: 40px;
                    border-radius: .3rem;
                    line-height: 40px;
                }
            }
        }

        .handler-col {
            display: flex;
            justify-content: center;
            align-items: center;

            i, span {
                color: #df0004;
            }

        }

        .add-menu-bar {
            height: 18rem;
        }

        [class*=van-hairline]::after {
            border: none;
        }
    }
</style>