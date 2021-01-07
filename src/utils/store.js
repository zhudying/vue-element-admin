import {
  validatenull
} from './validate';
/**
 * @author zhudying
 * @description 保存Store
 * @param {String} name    需要存储Store的 name
 * @param {String} content 需要存储Store的 content
 * @param {String} type    需要存储Store的类型；sessionStorage 统一传 'session';localStorage 统一传 'local'
 */
export const setStore = (params = {}) => {
  let {
    name,
    content,
    type,
  } = params;
  // name = keyName + name

  let obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
  else window.localStorage.setItem(name, JSON.stringify(obj));
}

/**
 * @author zhudying
 * @description 获取 Store
 * @param {String} name    需要获取Store 的 name
 */
export const getStore = (params = {}) => {
  let {
    name,
    debug
  } = params;
  // name = keyName + name
  let obj = {},
    content;
  obj = window.sessionStorage.getItem(name);
  if (validatenull(obj)) obj = window.localStorage.getItem(name);
  if (validatenull(obj)) return;
  try {
    obj = JSON.parse(obj);
  } catch {
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType == 'string') {
    content = obj.content;
  } else if (obj.dataType == 'number') {
    content = Number(obj.content);
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content);
  } else if (obj.dataType == 'object') {
    content = obj.content;
  }
  return content;
}

/**
 * @author zhudying
 * @description 删除 Store
 * @param {String} name    需要删除 Store 的 name
 * @param {String} type    需要删除 Store 的 类型
 * 
 */
export const removeStore = (params = {}) => {
  let {
    name,
    type
  } = params;
  // name = keyName + name
  if (type) {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }

}

/**
 * @author zhudying
 * @description 获取全部 Store
 * @param {String} type    需要获取全部 Store 的 类型
 * 
 */
export const getAllStore = (params = {}) => {
  let list = [];
  let {
    type
  } = params;
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i),
        })
      })

    }
  }
  return list;

}


/**
 * @author zhudying
 * @description 清空全部 Store
 * @param {String} type    需要清空全部 Store 的 类型
 * 
 */
export const clearStore = (params = {}) => {
  let { type } = params;
  if (type) {
    window.sessionStorage.clear();
  } else {
    window.localStorage.clear()
  }
}