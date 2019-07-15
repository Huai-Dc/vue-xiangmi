<template>
    <van-row type="flex" justify="space-around" class="menu-content">
        <template v-for="(item, index) in menus">
            <van-col span="5" @click.native="gotoItem(item.link)">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
            </van-col>
        </template>
    </van-row>
</template>

<script>
    export default {
        name: "menu-bar-item",
        props: {
            menus: {
                type: Array
            }
        },
        methods: {
            gotoItem: function (link) {
                this.$router.push({
                    path: link
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-content {
        margin: 0 1rem;
        background-color: #ffffff;
        border-radius: .5rem;

        .van-col {
            display: flex;
            float: none;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 5rem;
            text-align: center;
            vertical-align: middle;

            i {
                margin: .6rem;
                font-size: 28px;
            }

            span {
                display: block;
                padding: 0 5px;
                font-size: 0.7rem;
                line-height: 18px;
            }
        }

    }
</style>