<template>
    <div class="app-wrapper">
        <div class="mainbody">
            <app-main></app-main>
        </div>
        <van-tabbar v-model="active" route class="bottom-tab-bar">
            <van-tabbar-item name="home" to="/HomeIndex">
                <span>首页</span>
                <i slot="icon" slot-scpoe="props" class="icon-home"></i>
            </van-tabbar-item>
            <van-tabbar-item name="activity" to="/Active">
                <span>活动发布</span>
                <i slot="icon" slot-scpoe="props" class="icon-gift"></i>
            </van-tabbar-item>
            <van-tabbar-item name="benefit" to="/Benefit">
                <span>菜品发布</span>
                <i slot="icon" slot-scpoe="props" class="icon-project"></i>
            </van-tabbar-item>
            <van-tabbar-item name="personal" to="/Personal">
                <span>个人中心</span>
                <i slot="icon" slot-scpoe="props" class="icon-user"></i>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import AppMain from './AppMain.vue'
    import {Tabbar, TabbarItem} from 'vant';
    export default {
        name: "layout",
        data(){
            return {
                active: 1
            }
        },
        components: {
            AppMain,
            Tabbar, TabbarItem,
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .app-wrapper, #app {
        height: 100%;
        box-sizing: border-box;
        position: relative;
        overflow: auto;
    }

    .router-link-active {
        color: #000 !important;
    }

    .bottom-tab-bar{
        i{
            font-size: 24px;
        }
    }
</style>