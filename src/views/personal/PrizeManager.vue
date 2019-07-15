<template>
    <div class="prize-list-content">
        <van-nav-bar
                title="中奖人列表"
                :fixed="fixed"
                left-arrow
                @click-left="onClickLeft"
        />
        <form action="/">
            <van-search
                    v-model="searchValue"
                    placeholder="请输入搜索关键词"
                    show-action
                    clearable
                    background="#f2f2f2"
                    @search="onSearch"
                    @cancel="onCancel"
                    @clear="onCancel"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </form>
        <PrizeItem :prizeList="showPrizeList"/>
    </div>
</template>

<script>
    import PrizeItem from './PrizeItem'
    import $http from "../../api/http";
    import apis from "../../api/apis";
    import {getCookie} from "../../utils/storageData";
    import {Toast} from 'vant';

    export default {
        name: "prize-manager",
        data() {
            return {
                fixed: true,
                searchValue: '',
                prizeList: [],
                prizeLists: [],
                showPrizeList: [],  // 展示列表
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onCancel() {
                this.showPrizeList = this.prizeLists;
            },
            onSearch() {
                if (this.searchValue == "") {
                    this.showPrizeList = this.prizeLists;
                } else {
                    this.showPrizeList = this.prizeLists.filter((item) => {
                        return item.name.indexOf(this.searchValue) != -1 || item.mobile.indexOf(this.searchValue) != -1;
                    });
                }
            },
            async getPrizeList() {
                Toast.loading({
                    mask: true,
                    message: '加载中...',
                });
                await $http.get(apis.baseHost + apis.awardList + '?token=' + getCookie('User-Token')).then((res) => {
                    let data = res.data;

                    Toast.clear();
                    if (data.code == 1) {
                        this.prizeLists = data.data.info;
                        this.showPrizeList = data.data.info;
                    } else {
                        Toast.fail(data.msg);
                        return false;
                    }
                });
            },
        },
        components: {
            PrizeItem,
        },
        mounted() {
            this.getPrizeList();
        }
    }
</script>

<style lang="scss" scoped>
    .prize-list-content {
        background-color: #f2f2f2;
        padding-top: 46px;
        height: 100%;

        .van-search__content {
            background-color: #ffffff;
        }
    }
</style>