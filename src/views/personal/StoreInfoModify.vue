<template>
    <div class="store-info-content">
        <van-nav-bar
                title="信息修改"
                :fixed="fixed"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-field
                    v-model="shop_name"
                    required
                    label="店名"
                    placeholder="请输入新店名"
            />
            <van-field
                    v-model="name"
                    required
                    label="联系人"
                    placeholder="请输入联系人"
            />
            <van-field
                    v-model="address"
                    required
                    label="地址"
                    placeholder="请输入地址"
            />
            <van-field
                    v-model="phone"
                    required
                    label="联系电话"
                    placeholder="请输入联系电话"
            />
            <van-row type="flex" justify="center" class="file-upload">
                <van-col span="6" class="upload-title">
                    营业执照
                </van-col>
                <van-col span="16" class="upload-button">
                    <van-uploader :after-read="afterRead">
                        <img class="store_img" height="200" v-if="storeImage" :src="baseHost + storeImage"/>
                    </van-uploader>
                </van-col>
            </van-row>
        </van-cell-group>
        <van-row type="flex" justify="center" class="store-modify-button">
            <van-col span="22" class="submit-button">
                <van-button :disabled="enableModify" type="primary" size="large" @click.native="modifyStore">完成
                </van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import $http from "../../api/http";
    import apis from "../../api/apis";
    import {mapGetters} from 'vuex'
    import {getCookie} from "../../utils/storageData";
    import {Uploader, Toast} from 'vant';

    export default {
        name: "store-info-modify",
        data() {
            return {
                baseHost: apis.baseHost,
                fixed: true,
                shop_name: '',
                name: '',
                address: '',
                phone: '',
                storeImage: null,
                pickImage: null, // 拾取的图片
                pickFile: null,
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            async modifyStore() {
                let _this = this;
                await $http.post(apis.baseHost + apis.changeMemberInfo,
                    {
                        shop_name: this.shop_name,
                        mobile: this.phone,
                        name: this.name,  // 店长名即联系人
                        address: this.address,
                        mid: getCookie('User-Token'),
                        img1: this.storeImage,
                        token: getCookie('User-Token'),
                        act: 'upd'
                    }
                ).then((res) => {
                    let data = res.data;
                    if (data.code == 1) {
                        _this.$router.push({
                            name: 'Personal',
                        });
                        Toast.success('修改成功！');
                    } else {
                        Toast.fail(data.msg);
                    }
                });
            },
            afterRead(file) {
                let params = new FormData();
                params.append('logo', file.file);
                params.append('mid', getCookie('User-Token'));
                params.append('token', getCookie('User-Token'));
                // params.append('act', 'register');

                $http.postImage(apis.baseHost + apis.imgUpload, params).then((res) => {
                    let data = res.data;
                    console.log(data);
                    if (data.code && data.code == 1) {
                        this.storeImage = data.msg;
                        Toast.success('修改成功！');
                    } else {
                        Toast.fail('修改失败！');
                    }
                });

            },
            getStoreInfo() {
                $http.post(apis.baseHost + apis.changeMemberInfo, {
                    mid: getCookie('User-Token'),
                    token: getCookie('User-Token')
                }).then(res => {
                    let data = res.data;
                    if (data.code == 1) {
                        this.shop_name = data.data.shop_name;
                        this.name = data.data.name;
                        this.address = data.data.address;
                        this.phone = data.data.mobile;
                        this.storeImage = data.data.img1 == "" ? null : data.data.img1;
                        this.pickImage = data.data.img1 == "" ? null : data.data.img1;
                    }
                })
            }
        },
        mounted() {
            this.getStoreInfo();
        },
        computed: {
            enableModify: function () {
                return (this.name.length == 0) || (this.address.length == 0) || (this.phone.length == 0);
            },
            ...mapGetters([
                'token'
            ]),
        },
    }
</script>

<style lang="scss" scoped>
    .store-info-content {
        background-color: #f2f2f2;
        padding-top: 46px;
        height: 100%;

        .store-modify-button {
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

        .file-upload {
            color: #323233;
            font-size: 14px;
            line-height: 24px;

            .upload-button {
                padding-top: .5rem;
            }

            .upload-title::before {
                position: absolute;
                left: 7px;
                color: #f44;
                font-size: 14px;
                content: '*';
            }
        }
    }
</style>