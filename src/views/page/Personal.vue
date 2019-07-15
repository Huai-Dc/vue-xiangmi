<template>
    <div class="personal-content">
        <van-nav-bar
                title="享觅后台管理"
                :fixed="fixed"
        />
        <!-- 个人信息 -->
        <van-row type="flex" class="userinfo">
            <van-col span="1"></van-col>
            <van-col span="4" class="logo">
                <van-uploader :after-read="afterRead" :before-read="beforeRead" accept="image/gif,image/jpeg,image/png">
                    <img :src="avatarFile?baseHost+avatarFile:require('../../assets/logo.png')"/>
                </van-uploader>

                <!--<input ref="memberuploader" type="file" name="image" /> <br>-->
                <!--<input value="上传" @click="submit"/>-->
            </van-col>
            <van-col span="16" class="nickname">{{nickname}}</van-col>
        </van-row>
        <MenuBarItem :menus="tabBar"/>
        <van-row type="flex" justify="center">
            <van-col span="22">
                <van-cell title="合作联系" is-link :value="phone" class="contacts"/>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="22">
                <van-button type="default" size="large" @click.native="logout">退出登录</van-button>
            </van-col>
        </van-row>

        <div class="company-bar">
            <van-row type="flex" justify="center">
                <van-col span="4" class="logo">
                    <img src="../../assets/logo.png" height="40px" width="40px"/></van-col>
                <van-col span="4">
                    <div class="column-bar">
                        <div>享觅</div>
                        <div>XIANGMI</div>
                    </div>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center" class="company-name-bar">
                <van-col span="6">
                    <span>丛享网络科技</span>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {Uploader, Toast} from 'vant';
    import MenuBarItem from '../personal/MenuBarItem';
    import {getCookie, getStorage, setStorage} from "../../utils/storageData";
    import * as qs from "qs";
    import $http from "../../api/http";
    import apis from "../../api/apis";

    export default {
        name: 'MyHome',
        data() {
            return {
                baseHost: apis.baseHost,
                fixed: true,
                avatar: "",
                nickname: '店铺名称',
                phone: '暂无联系方式',
                avatarFile: null, // 头像文件
                tabBar: [
                    {icon: "success", title: '信息管理', link: '/personal/infoManager', icon: 'icon-shop'},
                    {icon: "success", title: '中奖管理', link: '/personal/prizeManager', icon: 'icon-gift'},
                    {icon: "success", title: '密码修改', link: '/personal/passwordModify', icon: 'icon-unlock'},
                    {icon: "success", title: '平台反馈', link: '/personal/feedback', icon: 'icon-comment'},
                ]
            }
        },
        // 接参数

        // 引入组件
        components: {
            MenuBarItem,
        },
        // 计算
        computed: {},
        // 监听
        watch: {},
        methods: {
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload()// 为了重新实例化vue-router对象以避免错误。
                })
            },
            beforeRead(file) {
                // if (file.type !== 'image/jpeg') {
                //     Toast.fail('请上传 jpg 格式图片');
                //     return false;
                // }

                return true;
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                this.avatarFile = file;

                let params = new FormData();
                params.append('logo', file.file);
                params.append('mid', getCookie('User-Token'));
                params.append('token', getCookie('User-Token'));

                $http.postImage(apis.baseHost + apis.memberUpload, params).then((res) => {
                    let data = res.data;
                    if (data.code && data.code == 1) {
                        this.avatarFile = data.msg;
                        Toast.success('修改成功！');
                    } else {
                        Toast.fail('修改失败！');
                    }
                });
            },
            async getMemberInfo() { /// 获取最新用户数据
                $http.post(apis.baseHost + apis.getMemberInfo, {'token': getCookie('User-Token')}).then(res => {
                    let data = res.data;
                    if(data.code == 1){
                        let memberInfo = data.data;
                        this.nickname = memberInfo.shop_name;
                        this.phone = memberInfo.mobile;
                        this.avatarFile = memberInfo.logo;

                        /// setStorage('User-Info', qs.stringify(memberInfo));   /// 重新设置 个人信息
                    }
                })
            }
        },
        mounted() {
            let data = getStorage("User-Info");
            let parseData = qs.parse(data);

            this.nickname = parseData.shop_name;
            this.phone = parseData.mobile;
            if (parseData.logo && parseData.logo != "") {
                this.avatarFile = parseData.logo;
            }

            this.getMemberInfo();
        },
        async created() {

        },
    }
</script>

<style lang="scss" scoped>
    .personal-content {
        padding-top: 46px;
        height: 100%;
        background-color: #f2f2f2;

        .userinfo {
            align-items: center;
            height: 5rem;

            .logo img {
                width: 3rem;
                height: 3rem;
                border-radius: 1.5rem;
                overflow: hidden;
            }

            .nickname {

            }
        }

        .contacts {
            margin: 1.2rem 0rem;
            padding: .8rem;
            border-radius: .3rem;
            background-color: #ffffff;
        }

        .company-bar {
            margin-top: 5rem;

            .column-bar {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .logo {
                    text-align: right;
                }

                div {
                    text-align: center;
                    font-size: .8rem;
                    display: block;
                    margin: .2rem 0;
                }
            }

            .company-name-bar {
                span {
                    color: #A0A0A0;
                    font-size: .5rem;
                }

                .van-col {
                    text-align: center;
                }
            }
        }
    }
</style>