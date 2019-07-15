<template>
    <div class="home-content">
        <van-nav-bar
                title="活动列表"
                :fixed="fixed"
        />
        <van-swipe :autoplay="3000" indicator-color="white" class="swiper-content">
            <template v-for="(item, index) in bannerList">
                <van-swipe-item>
                    <img :src="host+item.img"
                         alt="">
                </van-swipe-item>
            </template>
        </van-swipe>
        <div class="second-title">活动列表</div>
        <div class="active-list">
            <template v-for="(item, index) in activeList">
                <van-row type="flex" justify="center">
                    <van-col span="22" class="item-row">
                        <van-row type="flex" justify="center">
                            <van-col span="3" class="icon"><img
                                    :src="item.status?require('../../assets/continue-red.png'):require('../../assets/continue-gray.png')"
                                    height="140"
                                    width="140"/></van-col>
                            <van-col span="9">
                                <van-row type="flex" class="row-bar">
                                    <van-col span="22" class="title-bar">{{item.title}}</van-col>
                                </van-row>
                                <van-row type="flex" class="row-bar">
                                    <van-col span="22" class="time-bar">{{item.begin_time}}</van-col>
                                </van-row>
                                <van-row type="flex" class="row-bar">
                                    <van-col span="22" class="time-bar">{{item.end_time}}</van-col>
                                </van-row>
                            </van-col>
                            <van-col span="4" class="button-bar">
                                <van-button v-if="item.status != 1" plain round type="default" size="small"
                                            @click.native="delActive(item.id)">
                                    删除
                                </van-button>
                            </van-col>
                            <van-col span="4" class="button-bar">
                                <van-button v-if="item.status != 1" plain round type="primary" size="small"
                                            @click.native="editItem(item.id, 'active')">
                                    编辑
                                </van-button>
                            </van-col>
                            <van-col span="4" class="button-bar">
                                <van-button plain round type="danger" size="small"
                                            @click.native="pushItem({status:item.status,active_id: item.id,ordersn: item.ordersn})">
                                    {{item.status==1?'取消':'推送'}}
                                </van-button>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </template>
        </div>

        <div class="second-title">菜品发布</div>
        <div class="menu-list">
            <template v-for="(item, index) in menuList">
                <van-row type="flex" justify="center">
                    <van-col span="22" class="item-row">
                        <van-row type="flex" justify="center">
                            <van-col span="3" class="icon"><img
                                    :src="item.status?require('../../assets/continue-red.png'):require('../../assets/continue-gray.png')"
                                    height="140"
                                    width="140"/></van-col>
                            <van-col span="9">
                                <van-row type="flex" class="row-bar">
                                    <van-col span="22" class="title-bar">{{item.title}}</van-col>
                                </van-row>
                                <van-row type="flex" class="row-bar">
                                    <van-col span="22" class="time-bar">{{item.begin_time}}</van-col>
                                </van-row>
                                <van-row type="flex" class="row-bar">
                                    <van-col span="22" class="time-bar">{{item.end_time}}</van-col>
                                </van-row>
                            </van-col>
                            <van-col span="4" class="button-bar">
                                <van-button v-if="item.status != 1" plain round type="default" size="small" @click.native="delMenu(item.id)">
                                    删除
                                </van-button>
                            </van-col>
                            <van-col span="4" class="button-bar">
                                <van-button v-if="item.status != 1" plain round type="primary" size="small"
                                            @click.native="editItem(item.id, 'menu')">
                                    编辑
                                </van-button>
                            </van-col>
                            <van-col span="4" class="button-bar">
                                <van-button plain round type="danger" size="small"
                                            @click.native="pushItem({status:item.status,menu_id: item.id,ordersn: item.ordersn})">
                                    {{item.status==1?'取消':'推送'}}
                                </van-button>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </template>
            <div style="height:50px;"></div>
        </div>
    </div>
</template>

<script>
    import $http from './../../api/http';
    import apis from '../../api/apis';
    import {Toast} from 'vant';
    import {getCookie} from "../../utils/storageData";

    export default {
        name: 'Index',
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
                host: apis.baseHost,
                bannerList: [], // 轮播图
                activeList: [],  // 活动列表
                menuList: [],  // 菜品列表
                isLoading: false,  // 数据加载中
                isLoaded: false,  // 数据加载完成
            }
        },
        methods: {
            async getSlide() {
                await $http.post(apis.baseHost + apis.getSlide, {token: getCookie('User-Token'),}).then((res) => {
                    this.bannerList = res.data.data;
                });
            },
            async getListInfo() {
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                await $http.post(apis.baseHost + apis.getLists, {token: getCookie('User-Token'),}).then((res) => {
                    let data = res.data.data;

                    this.activeList = data.ac;
                    this.menuList = data.me;
                    // 清除加载中 提示
                    Toast.clear();
                })
            },
            delActive(id) { // 删除
                $http.post(apis.baseHost + apis.delActive, {id: id, token: getCookie('User-Token'),}).then((res) => {
                    if (res.data.code == 1) {
                        Toast.success('删除成功！');
                        this.activeList.splice(this.activeList.findIndex(item => item.id == id), 1);
                    }
                })
            },
            delMenu(id) {
                $http.post(apis.baseHost + apis.delMenu, {id: id, token: getCookie('User-Token'),}).then((res) => {
                    if (res.data.code == 1) {
                        Toast.success('删除成功！');
                        this.menuList.splice(this.menuList.findIndex(item => item.id == id), 1);
                    }
                });
            },
            pushItem(pushData) { // status active_id  menu_id
                $http.post(apis.baseHost + apis.ajaxStatus, {
                    status: pushData.status,
                    active_id: pushData.active_id,
                    menu_id: pushData.menu_id,
                    ordersn: pushData.ordersn,
                    token: getCookie('User-Token'),
                }).then((res) => {
                    let data = res.data;
                    if (data.code == 1) {
                        Toast.success('操作成功！');
                        if (data.data.active_id) {
                            this.activeList.findIndex((item) => {
                                if (item.id == data.data.active_id) {
                                    item.status = data.data.status;
                                }
                            });
                        } else if (data.data.menu_id) {
                            this.menuList.findIndex((item) => {
                                if (item.id == data.data.menu_id) {
                                    item.status = data.data.status;
                                }
                            });
                        }
                    } else {
                        Toast.fail('操作失败，请重试！');
                    }
                });
            },
            editItem(id, type) {
                if (type == 'active') {
                    this.$router.push({
                        name: 'activeItemManager',
                        params: {
                            id: id,
                        }
                    });
                } else if (type == 'menu') {
                    this.$router.push({
                        name: 'menuItemManager',
                        params: {
                            id: id,
                        }
                    });
                }
            }
        },
        mounted() {
            this.getSlide();
            this.getListInfo();
        },
    }
</script>

<style lang="scss" scoped>
    .home-content {
        background-color: #f2f2f2;
        padding-top: 46px;
        height: 100%;

        .swiper-content {
            height: 11rem;

            .van-swipe-item {
                padding: .2rem 0;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: calc(100% - 1.6rem);
                    height: calc(100% - 1.4rem);
                    border-radius: .5rem;
                }
            }
        }

        .second-title {
            font-size: 1rem;
            color: #333333;
            padding: .8rem;
            font-weight: normal;
            background-color: #f2f2f2;
        }

        .active-list, .menu-list {
            .item-row {
                margin-bottom: .5rem;
                padding: .5rem;
                background-color: #ffffff;
                border-radius: .5rem;

                .icon img {
                    width: 2.5rem;
                    height: 2.5rem;
                }

                .title-bar {
                    font-size: .8rem;
                    color: #333333;
                }

                .time-bar {
                    font-size: .5rem;
                    color: #7D7D7D;
                }

                .row-bar {
                    margin-left: .4rem;
                    margin-top: .3rem;
                    margin-bottom: .3rem;
                }

                .button-bar {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .van-button {
                        width: 95%;
                        min-width: 40px;
                    }
                }
            }
        }

        .menu-list {
            background-color: #f2f2f2;
            /*margin-bottom: 3rem;*/
        }
    }
</style>