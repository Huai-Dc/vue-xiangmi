<template>
    <div class="my-panel-list">

        <template v-if="prizeList.length > 0">
            <div class="my-panel" v-for="(item, index) in prizeList" >
                <van-row class="panel-content">
                    <van-col class="cover" span="7"><img src="../../assets/logo.png" alt=""></van-col>
                    <van-col span="17">
                        <van-row>
                            <van-col class="title" span="12">{{item.title}}</van-col>
                            <van-col class="win-date" span="12">中奖时间：{{item.award_time}}</van-col>
                        </van-row>
                        <van-row class="row-middle">
                            <van-col class="key-value" span="12">中奖者：{{item.name}}</van-col>
                            <van-col class="key-value" span="12">奖品：{{item.award}}</van-col>
                        </van-row>
                        <van-row class="row-last">
                            <van-col class="valid-date" span="24">有效期至：{{item.valid_time}}</van-col>
                        </van-row>
                        <!--<van-row>-->
                            <!--<van-col class="valid-date" span="24">手机号：{{item.mobile}}</van-col>-->
                        <!--</van-row>-->
                        <van-row>
                            <van-col class="valid-date" span="16">手机号：{{item.mobile}}</van-col>
                            <van-col class="valid-date" span="8" :class="item.status==-1?'red':item.status==0?'green':'orange'">{{item.status==-1?"已过期":item.status == 0? "未兑现": "已兑现"}}</van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <van-row class="action-button-group">
                    <van-col span="24"><van-button type="default" size="small" @click.native="showDetail(item)">查看详情</van-button></van-col>
                </van-row>
            </div>
        </template>

        <template v-else>
            <div class="without-text-data">暂无数据！</div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "PrizeItem",
        methods: {
            showDetail(item){
                this.$router.push({
                    name: 'prizeDetailInfo',
                    params: {
                        item: item,
                    }
                });
            }
        },
        props: {
            prizeList: {
                type: Array
            }
        },
    }
</script>

<style lang="scss" scoped>
.my-panel-list{
    .my-panel{
        background-color: #ffffff;
        margin-bottom: .8rem;
        .panel-content{
            padding: 1rem 16px .5rem;
            .row-middle{
                margin: .4rem 0;
            }
            .row-last{
                margin-bottom: .4rem;
            }
            .cover{
                padding: 0 16px 0 0;
                img{
                    width: 100%;
                }
            }
            .title{}
            .win-date, .valid-date{
                font-size: .6rem;
                color: #A0A0A0;
                text-align: left;
            }
            .key-value{
                font-size: .8rem;
                color: #A0A0A0;
                text-align: left;
            }
        }
        .action-button-group{
            padding: .5rem 15px;
            text-align: right;
            border-top: 1px solid #E5E5E5;
        }
    }
    .without-text-data{
        text-align: center;
        height: 3rem;
        line-height: 3rem;
        color: #5e5e5e;
    }
    .green{
        color: green!important;
        /*margin-top: .4rem;*/
    }
    .red{
        color: red!important;
        /*margin-top: .4rem;*/
    }
    .orange{
        color: orange!important;
        /*margin-top: .4rem;*/
    }
}
</style>