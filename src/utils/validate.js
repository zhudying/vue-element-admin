/**
 * @author zhudying
 * @description 地址检验方法
 * @param {string} path  地址
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @author zhudying
 * @description 权限检验方法
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @author zhudying
 * @description url地址检验方法
 * @param {string} url  地址
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @author zhudying
 * @description 小写英文检验方法
 * @param {string} str  小写英文字符串
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @author zhudying
 * @description 大写英文检验方法
 * @param {string} str  大写英文字符串
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @author zhudying
 * @description 英文检验方法
 * @param {string} str 英文字符串
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @author zhudying
 * @description 邮箱检验方法
 * @param {string} email  邮箱名称
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @author zhudying
 * @description 手机方法
 * @param {string} phone  手机号
 * @returns {Boolean}
 */
export function validPhone(phone) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(phone);
}

/**
 * @author zhudying
 * @description 数字检验方法
 * @param {string} number  数字
 * @returns {Boolean}
 */
export function validNumber(number) {
  const reg = /^[0-9]+$/;
  return reg.test(number);
}
/**
 * @author zhudying
 * @description 字符串检验方法
 * @param {string} str 字符串
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @author zhudying
 * @description 数组检验方法
 * @param {Array} arg 数组
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
/**
 * @author zhudying
 * @description 判断是否为整数
 * @param {Array} num 数组
 * @param {Array} type 数组
 * @returns {Boolean}
 */
export function validatenum(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}

/**
 * @author zhudying
 * @description 判断是否为空
 * @param  val  校验值
 * @returns {Boolean}
 */
export function validatenull(val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}