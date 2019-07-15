<template>
    <div class="login-container">
        <div class="login-background">
            <img src="../../assets/background/background_glass.jpg"/>
        </div>
        <div class="login-content">
            <!-- LOGO -->
            <van-row type="flex" class="logo" justify="center">
                <van-col span="8"><img src="../../assets/logo.png"/></van-col>
            </van-row>
            <!-- 登录表单 -->
            <div class="form-content">
                <van-row class="user" type="flex" justify="center">
                    <van-col span="3" class="iconBar">
                        <van-icon name="contact"/>
                    </van-col>
                    <van-col span="17" class="inputBar">
                        <van-field v-model="loginForm.username" placeholder="请输入用户名"/>
                    </van-col>
                </van-row>
                <van-row class="password" type="flex" justify="center">
                    <van-col span="3" class="iconBar">
                        <van-icon name="lock"/>
                    </van-col>
                    <van-col span="17" class="inputBar">
                        <van-field v-model="loginForm.password" type="password" placeholder="请输入密码"/>
                    </van-col>
                </van-row>
                <van-row type="flex" justify="center" class="remember-password">
                    <van-col span="20">
                        <van-checkbox v-model="checked">记住密码</van-checkbox>
                    </van-col>
                </van-row>
                <van-row class="submit-button" type="flex" justify="center">
                    <van-col span="20">
                        <van-button type="primary" size="large" loading-text="登录中..." :loading="isLoading"
                                    @click.native="doLogin">{{showLoading}}
                        </van-button>
                    </van-col>
                </van-row>
            </div>
            <!-- 跳转注册 -->
            <van-row class="gotoRegister" type="flex" justify="center">
                <span href="#" @click="gotoRegister">没有帐号，立即注册</span>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import {setCookie, getCookie} from "../../utils/storageData";
    import * as qs from "qs";

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                isLoading: false,
                checked: false, // 记住密码
            }
        },
        computed: {
            showLoading: function () {
                return this.isLoading ? "登录中..." : "登录";
            }
        },
        methods: {
            doLogin() { // 登录
                this.rememberLoginInfo();
                let _this = this;
                if(_this.isLoading) return false; // 正在加载
                let {username, password} = _this.loginForm;
                if (username != "" && password != "") {
                    _this.isLoading = true;
                    let postData = {
                        username: username,
                        password: password
                    };
                    this.$store.dispatch('LoginByUser', postData).then((res) => {
                        _this.isLoading = false;
                        if(res.data.code == 1){
                            this.$router.push({
                                path: '/HomeIndex'
                            });
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    });
                } else {
                    Toast.fail('登录名或密码不能为空！');
                }
            },
            gotoRegister() {
                this.$router.push({
                    path: '/register'
                });
            },
            rememberLoginInfo() {
                if (this.checked) {
                    let cookieInfo = qs.stringify({
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                        checked: this.checked,
                    });
                    setCookie('Login_info', cookieInfo);
                } else {
                    setCookie('Login_info', null);
                }
            },
            setRememberInfo() {
                let info = qs.parse(getCookie('Login_info'));
                if (info) {
                    this.loginForm.username = info.username ? info.username : '';
                    this.loginForm.password = info.password ? info.password : '';
                    this.checked = info.checked ? info.checked : false;
                }
            }
        },
        mounted() {
            this.setRememberInfo();
        }
    }
</script>
<style lang="scss" scoped>
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;

        .login-background {
            object-fit: cover;
            margin: auto;
            position: absolute;
            z-index: -1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            visibility: visible;
            width: 100%;
            height: 100%;
        }

        .login-content {
            .logo img {
                width: 100%;
                margin: 5rem 0;
            }
        }

        .form-content {
            .user .van-col, .password .van-col {
                height: 2.8rem;
                background-color: rgba(0, 0, 0, 0.5);
            }

            .user {
                margin-bottom: .8rem;
            }

            .password {
                margin-bottom: 1.5rem;
            }

            .submit-button {
                .van-button--primary {
                    color: #fff;
                    background-color: #CD3D39;
                    border: 1px solid #CD3D39;
                }
            }

            .iconBar {
                border-top-left-radius: .3rem;
                border-bottom-left-radius: .3rem;
                margin-right: 2px;
                line-height: 3.2rem;
                text-align: center;

                .van-icon {
                    font-size: 1.5rem;
                    color: #CD3D39;
                }
            }

            .inputBar {
                border-top-right-radius: .3rem;
                border-bottom-right-radius: .3rem;
                overflow: hidden;

                .van-field {
                    background: transparent;
                }
            }
        }

        .gotoRegister {
            margin-top: 1rem;
            font-size: 1rem;
            color: #fff;
        }

        .remember-password {
            margin-bottom: 1rem;
            font-size: .8rem;

            .van-checkbox__label {
                color: #fff;
            }
        }
    }
</style>