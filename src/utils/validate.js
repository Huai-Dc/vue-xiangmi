/**
 * 验证手机号码是否合法
 * @param textval
 * @returns {boolean}
 */
export function validatePhone(phone) {
    const urlregex = /^[1][3,4,5,7,8][0-9]{9}$/;
    return urlregex.test(phone);
}