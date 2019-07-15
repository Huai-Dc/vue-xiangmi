<template>
    <div class="feedback-content">
        <van-nav-bar
                title="平台反馈"
                :fixed="fixed"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-row type="flex" justify="center" class="message-box">
            <van-col span="22">
                <van-cell-group>
                    <van-field
                            v-model="message"
                            type="textarea"
                            placeholder="请详细描述你遇到的问题或建议"
                            rows="5"
                            autosize
                    />
                </van-cell-group>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" class="message-box">
            <van-col span="22">
                <van-button :disabled="message.length==0" type="primary" size="large" @click.native="postFeedback">提交
                </van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import $http from "../../api/http";
    import apis from "../../api/apis";

    import {Toast} from 'vant';
    import {getCookie} from "../../utils/storageData";

    export default {
        name: "feedback",
        data() {
            return {
                fixed: true,
                message: ''
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            postFeedback() {
                Toast.loading({
                    mask: true,
                    message: '提交中...'
                });
                let _this = this;
                $http.post(apis.baseHost + apis.mess, {content: this.message,token: getCookie('User-Token'),}).then((res) => {
                    Toast.clear();
                    if (res.data.code == 1) {
                        _this.$router.push({
                            name: 'Personal',
                        });
                        Toast.success('反馈成功');
                    } else {
                        Toast.fail(data.msg);
                        return false;
                    }
                });

            }
        }
    }
</script>

<style lang="scss" scoped>
    .feedback-content {
        height: 100%;
        background-color: #f2f2f2;
        padding-top: 46px;

        .message-box {
            margin: 1rem 0;
            border-radius: .3rem;

            .van-button--primary {
                color: #fff;
                background-color: #CD3D39;
                border: 1px solid #CD3D39;
                height: 40px;
                line-height: 40px;
            }
        }
    }
</style>