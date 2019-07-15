<template>
    <div class="itemEdit-content">
        <van-nav-bar
                title="活动编辑"
                :fixed="fixed"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">活动名称</div>
                    <van-field v-model="activeTitle" placeholder="请输入活动名称"/>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">活动内容</div>
                    <!--<van-field v-model="activeContent" type="textarea" placeholder="请输入活动内容" rows="2"-->
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
                            <van-field left-icon="calender-o" v-model="startDate" placeholder="开始时间" readonly="readonly"
                                       @click="showStart=true"/>
                        </van-col>
                        <van-col span="2">-</van-col>
                        <van-col span="11">
                            <van-field left-icon="calender-o" v-model="endDate" placeholder="结束时间" readonly="readonly"
                                       @click="showEnd=true"/>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">活动备注</div>
                    <van-field v-model="activeRemark" placeholder="请输入活动备注"/>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">适用地址</div>
                    <van-field v-model="address" placeholder="请输入适用地址"/>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center">
                <van-col span="22">
                    <div class="form-title">联系电话</div>
                    <van-field v-model="phone" placeholder="请输入联系电话"/>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center" class="active-submit-button">
                <van-col span="22" class="submit-button">
                    <van-button type="primary" size="large" @click.native="onsubmit">完成</van-button>
                </van-col>
            </van-row>
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
    import $http from "../../api/http";
    import apis from "../../api/apis";
    import {formatTimeToStr} from "../../utils/date";
    import {Toast} from 'vant';
    import {validatePhone} from "../../utils/validate";
    import {getCookie} from "../../utils/storageData";

    export default {
        name: "ItemEdit",
        data() {
            return {
                fixed: true,
                showStart: false,
                showEnd: false,
                currentDateStart: new Date(),
                currentDateEnd: new Date(),

                id: '',
                activeTitle: '',  // 活动名称
                startDate: '',
                endDate: '',
                activeCondition: '',  // 满足条件
                activeContent: '',  //  活动内容
                phone: '',  // 联系电话
                address: '',  // 适用地址
                activeRemark: '',  // 活动备注
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            getActive() { // 获取活动数据
                if (!this.id) return false;
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                $http.post(apis.baseHost + apis.getEditActive, {
                    id: this.id,
                    token: getCookie('User-Token'),
                }).then((res) => {
                    let data = res.data.data;

                    if (data.acInfo) {
                        let acInfo = data.acInfo;
                        this.activeTitle = acInfo.title;
                        this.address = acInfo.address;
                        this.activeCondition = acInfo.condition;
                        this.activeContent = acInfo.content;
                        this.startDate = acInfo.begin_time;
                        this.endDate = acInfo.end_time;
                        this.activeRemark = acInfo.remark;
                        this.phone = acInfo.mobile;

                        //this.activeCondition = data.acInfo.
                    } else {
                        console.log(data);
                    }
                    Toast.clear();
                })
            },
            getRouterData() {
                let params = this.$route.params;
                this.id = params.id;
            },
            getStartTime(value) {
                this.showStart = false;
                this.startDate = formatTimeToStr(value);
            },
            getEndTime(value) {
                this.showEnd = false;
                this.endDate = formatTimeToStr(value);
            },
            onsubmit() {
                if (!this.checkData()) {
                    return false;
                }
                let _this = this;
                $http.post(apis.baseHost + apis.activeEdit, {
                    title: this.activeTitle,
                    content: this.activeContent,
                    condition: this.activeCondition,
                    begin_time: this.startDate,
                    end_time: this.endDate,
                    remark: this.activeRemark,
                    address: this.address,
                    mobile: this.phone,
                    mid: getCookie('User-Token'),
                    token: getCookie('User-Token'),
                    img: '暂无',
                    id: this.id
                }).then((res) => {
                    let data = res.data;
                    if (data.code == 1) {
                        Toast.success('修改成功！');
                        _this.$router.push({
                            name: 'HomeIndex',
                        });
                        this.resetData();
                    } else {
                        Toast.fail('修改失败！');
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
                }else if(type === 'hour'){
                    return `${value}时`
                }else if(type === 'minute'){
                    return `${value}分`
                }
                return value;
            },
            updateContent(e = ''){
                this.activeContent = e;
            },
            updateCondition(e = ''){
                this.activeCondition = e;
            }
        },
        mounted() {
            this.getActive();
        },
        created() {
            this.getRouterData();
        },
    }
</script>

<style lang="scss" scoped>
    .itemEdit-content {
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
            margin-bottom: 3rem;

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
    }
</style>