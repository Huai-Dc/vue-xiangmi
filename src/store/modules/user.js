import $http from './../../api/http';
import { setStorage, getStorage, setCookie , delCookie, removeStorage} from './../../utils/storageData'
import apis from "../../api/apis";
import * as qs from "qs";
import * as Toast from "vant";

const SET_NAME = 'SET_NAME';
const SET_CNAME = 'SET_CNAME';
const SET_STATUS = 'SET_STATE';
const SET_ROLES = 'SET_ROLES';
const SET_TOKEN = 'SET_TOKEN';
const SET_CODE = 'SET_CODE';
const SET_AVATAR = 'SET_AVATAR';
const SET_INTRODUCTION = 'SET_INTRODUCTION';
const SET_USERID = 'SET_USERID';
const SET_MOBILE = 'SET_MOBILE';

const user = {
    state: {
        name: '', // 登录名  // 对标store_name
        // userId: '', // 用户id
        // cName: '',  // 中文名
        // status: '', // 身份/地位
        // roles: [], // 用户角色
        token: '',
        // code: '',
        avatar: '', // 头像
        mobile: '', // 联系方式
        // introduction: ''  // 描述
    },
    mutations: {
        [SET_NAME](state, name){
            state.name = name;
        },
        // [SET_USERID](state, id){
        //     state.id = id;
        // },
        // [SET_CNAME](state, cname){
        //     state.cName = cname;
        // },
        // [SET_STATUS](state,status){
        //     state.status = status;
        // },
        // [SET_ROLES](state, roles){
        //     state.roles = roles;
        // },
        [SET_TOKEN](state, token){
            state.token = token;
        },
        // [SET_CODE](state, code){
        //     state.code = code;
        // },
        [SET_AVATAR](state, avatar){
            state.avatar = avatar;
        },
        [SET_MOBILE](state, mobile){
            state.mobile = mobile;
        },
        // [SET_INTRODUCTION](state, introduction){
        //     state.introduction = introduction;
        // }
    },
    actions: {
        LoginByUser({ commit, rootState }, userInfo){
            return new Promise((resolve, reject) => {
                $http.post(apis.baseHost + apis.login, userInfo)
                    .then(response => {
                        resolve(response);
                        if(response.data.code == 1){ //success
                            resolve(response);
                            const userData = response.data.data;
                            commit('SET_TOKEN', userData.token);
                            commit('SET_NAME', userData.shop_name);
                            commit('SET_AVATAR', userData.logo);
                            commit('SET_MOBILE', userData.mobile);
                            setCookie('User-Token', userData.token);
                            setStorage('User-Info', qs.stringify(userData));
                            setStorage('api_token', userData.token);
                            /// 登录后删除缓存数据
                            removeStorage("benefit_data");
                            removeStorage("active_data");

                        }else { // failed
                            //
                        }
                    }).catch( error =>{
                        reject(error)
                })
            })
        },
        /**
         *  获取用户信息
         * @param commit
         * @param state
         * @returns {Promise<any>}
         */
        getUserInfo({ commit, state }){
            return new Promise((resolve, reject) => {
                // 此处可改成异步请求
                const isJson = function(obj){
                    if(typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length){
                        return true;
                    }
                    return false;
                }
                let userData = qs.parse(getStorage('User-Info'));

                if(userData.token){
                    commit('SET_TOKEN', userData.token);
                    commit('SET_AVATAR', userData.logo);
                    commit('SET_NAME', userData.shop_name);
                    commit('SET_MOBILE', userData.mobile);
                }

                resolve({});
            });
        },
        /**
         * 登出
         * @param commit
         * @param state
         * @returns {Promise<any>}
         * @constructor
         */
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '');
                commit('SET_AVATAR', '');
                commit('SET_NAME', '');
                commit('SET_MOBILE', '');

                delCookie('User-Token');
                removeStorage('User-Info');
                removeStorage('api_token');
                resolve();
            });
        },
    }
};

export default user