<template>
    <div class="prize-detail-content">
        <van-nav-bar
                title="中奖详情"
                :fixed="fixed"
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="password-tips">{{title}}</div>
        <van-cell-group class="prize-bar">
            <van-cell title="奖品" :value="gift"/>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="姓名" :value="username"/>
            <van-cell title="微信号" :value="wechat"/>
            <van-cell title="联系电话" :value="phone"/>
            <van-cell title="中奖时间" :value="winDate"/>
            <van-cell title="到期时间" :value="expireDate"/>
        </van-cell-group>
        <div class="tips">请认真核对中奖人信息</div>
        <div class="cash-button">
            <van-button :disabled="status!=0" round type="danger" @click.native="cashPrize">{{status == 1? "已兑现":status
                == 0?"兑现":"已逾期"}}
            </van-button>
        </div>
    </div>
</template>

<script>
    import {Dialog, Toast} from 'vant';
    import $http from "../../api/http";
    import apis from "../../api/apis";
    import {getCookie} from "../../utils/storageData";

    export default {
        name: "PrizeDetailInfo",
        data() {
            return {
                fixed: true,
                id: '',
                title: '',
                gift: '',
                username: '',
                wechat: '',
                phone: '',
                winDate: '',
                expireDate: '',
                status: '-1',  // 1 已兑现  0兑现 -1 已逾期
                item: null
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            getRouterData() {
                let item = this.$route.params.item;

                if (!item) {
                    /// 无信息则跳转个人中心
                    this.$router.push({
                        name: 'Personal'
                    });
                } else {
                    this.status = item.status;
                    this.item = item;
                    this.id = item.id;
                    this.title = item.title;
                    this.gift = item.award;
                    this.username = item.name;
                    this.wechat = item.wechat;
                    this.phone = item.mobile;
                    this.winDate = item.award_time;
                    this.expireDate = item.valid_time;
                }
            },
            cashPrize() {
                let _this = this;
                Dialog.confirm({
                    title: '兑奖',
                    message: '是否已核对信息并兑奖？'
                }).then(() => {
                    // on confirm
                    $http.get(apis.baseHost + apis.checkInfo + "?id=" + this.id + "&token=" + getCookie('User-Token')).then((res) => {
                        let data = res.data;
                        if (data.code == 1) {
                            this.status = 1;  /// 切换成已兑现
                            Toast({
                                message: '兑奖成功！',
                                type: 'success',
                                duration: 1500,
                                onClose: function () {
                                    // _this.$router.push({
                                    //     name: 'prizeManager',
                                    // });
                                }
                            })
                        } else {
                            Toast.fail(data.msg);
                            return false;
                        }
                    });
                }).catch(() => {
                    // on cancel
                    Toast.fail('出现异常，请联系管理员！');
                });
            }
        },
        created() {
            this.getRouterData();
        },
    }
</script>

<style lang="scss" scoped>
    .prize-detail-content {
        background-color: #f2f2f2;
        padding-top: 46px;
        height: 100%;

        .password-tips {
            font-size: 1rem;
            color: #434343;
            padding: 1rem;
            font-weight: bold;
        }

        .prize-bar {
            margin: 0 0 0.5rem 0;
        }

        .tips {
            font-size: .6rem;
            color: #434343;
            padding: .8rem;
            text-align: center;
        }

        .cash-button {
            text-align: center;
            margin-top: .2rem;

            span.van-button__text {
                padding: 0 1rem;
                color: #ffffff;
            }
        }
    }
</style>