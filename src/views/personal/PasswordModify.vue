<template>
    <div class="password-content">
        <van-nav-bar
                title="修改密码"
                :fixed="fixed"
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="password-tips">设置密码后，你就可以用手机号登录</div>
        <van-cell-group>
            <van-field
                    v-model="oldPassword"
                    required
                    type="password"
                    label="原密码"
                    placeholder="请输入原密码"
            />

            <van-field
                    v-model="newPassword"
                    type="password"
                    label="新密码"
                    placeholder="请输入新密码"
                    required
            />

            <van-field
                    v-model="confirmPassword"
                    type="password"
                    label="确认新密码"
                    placeholder="请再次输入新密码"
                    required
            />
        </van-cell-group>
        <van-row type="flex" justify="center" class="password-modify-button">
            <van-col span="22" class="submit-button">
                <van-button :disabled="enableModify" type="primary" size="large" @click.native="doPasswordModify">完成
                </van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import $http from "../../api/http";
    import apis from "../../api/apis";
    import {getCookie} from "../../utils/storageData";

    export default {
        name: "password-modify",
        data() {
            return {
                fixed: true,
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        },
        computed: {
            enableModify: function () {
                return (this.oldPassword.length == 0) || (this.newPassword.length == 0) || (this.confirmPassword.length == 0);
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            doPasswordModify() {
                if (this.newPassword != this.confirmPassword) {
                    Toast.fail('新密码输入不一致！');
                    this.newPassword = '';
                    this.confirmPassword = '';
                    return false;
                }
                $http.post(apis.baseHost + apis.changePwd, {
                    oldPwd: this.oldPassword,
                    newPwd: this.newPassword,
                    token: getCookie('User-Token'),
                }).then((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        Toast.success('修改成功！');
                        this.$router.push({
                            name: 'Personal',
                        });
                    }else{
                        Toast.fail(data.msg);
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .password-content {
        background-color: #f2f2f2;
        padding-top: 46px;
        height: 100%;

        .password-tips {
            font-size: .6rem;
            color: #434343;
            padding: 1rem;
        }

        .password-modify-button {
            background-color: #ffffff;

            .submit-button {
                margin: 1rem 0;

                .van-button--primary {
                    color: #fff;
                    background-color: #CD3D39;
                    border: 1px solid #CD3D39;
                    height: 40px;
                    line-height: 40px;
                    border-radius: .3rem;
                }
            }
        }
    }
</style>