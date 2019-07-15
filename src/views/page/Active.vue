<template>
    <div class="active-public-content">
        <van-nav-bar
                title="活动设置"
                :fixed="fixed"
        />
        <van-cell-group>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">活动名称</div>
                    <van-field v-on:blur="saveEditorData" v-model="activeTitle" placeholder="请输入活动名称"/>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">活动内容</div>
                    <!--<van-field v-model="activeContent" type="textarea" placeholder="请输入活动内容" rows="4"-->
                    <!--autosize/>-->
                    <vue-html5-editor :content="activeContent" :height="200" @change="updateContent"
                    ></vue-html5-editor>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">满足条件</div>
                    <!--<van-field v-model="activeCondition" type="textarea" placeholder="请输入满足条件" rows="2"-->
                    <!--autosize/>-->
                    <vue-html5-editor :content="activeCondition" :height="200" @change='updateCondition'
                    ></vue-html5-editor>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">活动时间</div>
                    <van-row type="flex" justify="center" class="picker-time-bar">
                        <van-col span="11">
                            <van-field v-on:blur="saveEditorData" left-icon="calender-o" v-model="startDate" placeholder="开始时间" readonly="readonly"
                                       @click="showStart=true"/>
                        </van-col>
                        <van-col span="2">-</van-col>
                        <van-col span="11">
                            <van-field v-on:blur="saveEditorData" left-icon="calender-o" v-model="endDate" placeholder="结束时间" readonly="readonly"
                                       @click="showEnd=true"/>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">活动备注</div>
                    <van-field v-on:blur="saveEditorData" v-model="activeRemark" placeholder="请输入活动备注"/>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">适用地址</div>
                    <van-field v-on:blur="saveEditorData" v-model="address" placeholder="请输入适用地址"/>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">联系电话</div>
                    <van-field v-on:blur="saveEditorData" v-model="phone" placeholder="请输入联系电话"/>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center" class="active-submit-button">
                <van-col span="22" class="submit-button">
                    <van-button type="primary" size="large" @click.native="onsubmit">完成</van-button>
                </van-col>
            </van-row>
            <div style="height:50px;"></div>
        </van-cell-group>
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
    </div>
</template>

<script>
    import {formatTimeToStr} from "../../utils/date";
    import {Toast} from 'vant';
    import {validatePhone} from "../../utils/validate";
    import $http from "../../api/http";
    import apis from "../../api/apis";
    import {getCookie, getStorage, removeStorage, setStorage} from "../../utils/storageData";
    import * as qs from "qs";

    export default {
        name: 'active',
        // 接参数
        props: {},
        // 引入组件
        components: {},
        // 计算
        computed: {},
        // 监听
        watch: {},
        data() {
            return {
                fixed: true,
                showStart: false,
                showEnd: false,
                startDate: '',  // 开始时间
                endDate: '',  // 结束时间
                minHour: 10,
                maxHour: 20,
                currentDateStart: new Date(),
                currentDateEnd: new Date(),

                activeTitle: '', // 活动名称
                activeContent: '', // 活动内容
                activeCondition: '', // 活动条件
                activeRemark: '', // 活动备注
                address: '', // 适用地址
                phone: '', // 联系电话
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
            onsubmit() {
                if (!this.checkData()) {
                    return false;
                }
                $http.post(apis.baseHost + apis.activeEdit, {
                    title: this.activeTitle,
                    content: this.activeContent,
                    condition: this.activeCondition,
                    begin_time: this.startDate,
                    end_time: this.endDate,
                    remark: this.activeRemark,
                    address: this.address,
                    mid: getCookie('User-Token'),
                    mobile: this.phone,
                    img: '暂无',
                    token: getCookie('User-Token'),
                }).then((res) => {
                    let data = res.data;
                    if (data.code == 1) {
                        removeStorage("active_data");
                        this.$router.push({
                            name: 'HomeIndex'
                        });
                        Toast.success('活动创建成功！');
                        this.resetData();
                    } else {
                        Toast.fail('活动创建失败！');
                        return false;
                    }
                });
            },
            checkData() {
                if (this.startDate == "" || this.endDate == "") {
                    Toast.fail('时间不能为空！');
                    return false;
                } else if (this.activeTitle == '') {
                    Toast.fail('活动名称不能为空！');
                    return false;
                } else if (this.activeContent == '') {
                    Toast.fail('活动内容不能为空！');
                    return false;
                } else if (this.activeCondition == '') {
                    Toast.fail('活动条件不能为空！');
                    return false;
                } else if (this.activeRemark == '') {
                    Toast.fail('活动备注不能为空！');
                    return false;
                } else if (this.address == '') {
                    Toast.fail('适用地址不能为空！');
                    return false;
                } else if (this.phone == '') {
                    Toast.fail('联系电话不能为空！');
                    return false;
                }

                if (!validatePhone(this.phone)) {
                    Toast.fail('请输入正确手机号');
                    return false;
                }

                return true;
            },
            resetData() {
                this.startDate = '';
                this.endDate = '';
                this.activeTitle = '';
                this.activeContent = '';
                this.activeCondition = '';
                this.activeRemark = '';
                this.address = '';
                this.phone = '';
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
            updateContent(e = '') {
                this.activeContent = e;
                this.saveEditorData();
            },
            updateCondition(e = '') {
                this.activeCondition = e;
                this.saveEditorData();
            },
            getDefaultAdress() {
                $http.post(apis.baseHost + apis.getDefaultAddress, {
                    mid: getCookie('User-Token'),
                    token: getCookie('User-Token')
                }).then(res => {
                    let data = res.data;
                    if(data.code == 1){
                        this.address = data.data.address;
                        this.phone = data.data.mobile;
                    }
                })
            },
            saveEditorData(){
                setStorage('active_data', qs.stringify({
                    "activeTitle": this.activeTitle,
                    "activeContent": this.activeContent,
                    "activeCondition": this.activeCondition,
                    "startDate": this.startDate,
                    "endDate": this.endDate,
                    "activeRemark": this.activeRemark,
                    "address": this.address,
                    "mobile": this.mobile,
                }));
            },
            getEditorData(){
                let data = qs.parse(getStorage("active_data"));
                this.activeTitle = data.activeTitle;
                this.activeContent = data.activeContent;
                this.activeCondition = data.activeCondition;
                this.startDate = data.startDate;
                this.endDate = data.endDate;
                this.activeRemark = data.activeRemark;
                this.address = data.address;
                this.phone = data.phone;
            },
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
    .active-public-content {
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

        [class*=van-hairline]::after {
            border: none;
        }
    }

</style>