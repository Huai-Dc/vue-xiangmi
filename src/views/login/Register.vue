<template>
    <div class="register-content">
        <van-nav-bar
                title="注册"
                :fixed="fixed"
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="register-tips">设置密码后，你就可以用账户登录享觅后台</div>
        <van-cell-group>
            <template v-for="(item, index) in formData">
                <van-row type="flex" justify="center">
                    <van-col span="22">
                        <div class="register-form-title">{{item.title}}</div>
                        <van-field :type="item.type" :required="item.required" v-model="item.value" :placeholder="item.placeholder"/>
                    </van-col>
                </van-row>
            </template>
            <van-row type="flex" justify="center" class="file-upload">
                <van-col span="6" class="upload-title">
                    营业执照
                </van-col>
                <van-col span="16" class="upload-button">
                    <van-uploader :after-read="afterRead">
                        <img height="200" class="store_img" v-if="storeImage" :src="baseHost + storeImage"/>
                    </van-uploader>
                </van-col>
            </van-row>
        </van-cell-group>
        <van-row type="flex" justify="center" class="register-button">
            <van-col span="22" class="submit-button">
                <van-button type="primary" size="large" @click.native="doRegister">完成</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import apis from '../../api/apis';
    import $http from './../../api/http';
    import {validatePhone} from '../../utils/validate';
    import {Toast} from 'vant';

    export default {
        name: "register",
        data() {
            return {
                baseHost: apis.baseHost,
                fixed: true,
                storeImage: null, // 营业执照
                formData: {
                    'mobile': {
                        title: "手机号（登录账号）",
                        placeholder: '请输入手机号',
                        required: true,
                        validType: 'phone',
                        type: 'number',
                        value: ''
                    },
                    'password': {
                        title: "密码",
                        placeholder: '请输入密码',
                        required: true,
                        validType: 'password',
                        type: 'password',
                        value: ''
                    },
                    'confirm_password': {
                        title: "确认密码",
                        placeholder: '请在此输入密码',
                        required: true,
                        validType: 'confirmpassword',
                        type: 'password',
                        value: ''
                    },
                    'address': {
                        title: "地址",
                        placeholder: '请输入地址',
                        required: true,
                        validType: null,
                        type: 'text',
                        value: ''
                    }, 'shop_name': {
                        title: "门店名",
                        placeholder: '请输入门店名',
                        required: true,
                        validType: null,
                        type: 'text',
                        value: ''
                    }, 'name': {
                        title: "联系人",
                        placeholder: '请输入联系人',
                        required: true,
                        validType: null,
                        type: 'text',
                        value: ''
                    },
                }
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            doRegister() {
                const formData = this.formData;
                let flag = this.validFormData(formData);
                if (!flag) return false;
                let params = new FormData();
                params.append('shop_name', formData.shop_name.value);
                params.append('mobile', formData.mobile.value);
                params.append('address', formData.address.value);
                params.append('password', formData.password.value);
                params.append('name', formData.name.value);
                params.append('img1', this.storeImage);

                $http.post(apis.baseHost + apis.register,
                    {
                    'shop_name': formData.shop_name.value,
                    'mobile': formData.mobile.value,
                    'address': formData.address.value,
                    'password': formData.password.value,
                    'name': formData.name.value, //联系人
                    'img1': this.storeImage // 营业执照
                }
                ).then((res)=>{
                    if(res.status == 200 && res.statusText == "OK" && res.data.code == 1){
                        let _this = this;
                        Toast({
                            message: '注册成功！',
                            type: 'success',
                            duration: 1500,
                            onClose: function () {
                                _this.$router.push({
                                    path: '/login'
                                });
                            }
                        })
                    }else{
                        Toast.fail(res.data.msg);
                    }
                });
            },
            validFormData(data) {
                let mobile = data.mobile.value;
                let password = data.password.value;
                let confirm_password = data.confirm_password.value;
                let address = data.address.value;
                let shopName = data.shop_name.value;
                let name = data.name.value;

                if (password == "" || confirm_password == "" || mobile == "" || address == "" || shopName == "" || name == "") {
                    Toast.fail('请完整填写资料不能为空！');
                    return false;
                }

                if (!validatePhone(mobile)) {
                    Toast.fail('请输入正确手机号');
                    return false;
                }

                if (password != confirm_password) {
                    Toast.fail('密码输入不一致');
                    return false;
                }

                return true;
            },
            afterRead(file) {  // 获取到文件对象
                let params = new FormData();
                params.append('file', file.file);

                $http.postImage(apis.baseHost + apis.uploadRegister, params).then((res) => {
                    let data = res.data;
                    if (data.code && data.code == 1) {
                        this.storeImage = data.msg;
                        Toast.success('上传成功！');
                    } else {
                        Toast.fail('上传失败！');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register-content {
        background-color: #f2f2f2;
        padding-top: 46px;

        .register-tips {
            font-size: .6rem;
            color: #434343;
            padding: 1rem;
        }

        .van-row {
            .register-form-title {
                margin: 1.2rem 0 0.6rem 0;
                font-size: .8rem;
            }

            .van-cell {
                border-radius: .3rem;
                border: 1px solid #D2D2D2;
            }
        }

        .register-button {
            background-color: #ffffff;

            .submit-button {
                margin: 1rem 0;

                .van-button--primary {
                    color: #fff;
                    background-color: #CD3D39;
                    border: 1px solid #CD3D39;
                    height: 40px;
                    border-radius: .3rem;
                    line-height: 40px;
                }
            }
        }

        .file-upload{
            margin-top: .5rem;
            color: #323233;
            font-size: .8rem;
            line-height: 24px;
            .upload-button{
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
        .store_img{
            width: 80px;
            height: 80px;
        }
    }
</style>