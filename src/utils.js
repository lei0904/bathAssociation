import Vue from 'vue'

function find(list, f) {
  return list.filter(f)[0]
}

export default {
  extend: function(obj, props) {
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        obj[key] = props[key];
      }
    }
    return obj;
  },

  deepCopy: function(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache)
    })

    return copy
  },


  forEachValue:function (obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
  },

  isObject: function (obj) {
    return obj !== null && typeof obj === 'object'
  },

  isPromise: function (val) {
    return val && typeof val.then === 'function'
  },

  assert: function (condition, msg) {
    if (!condition) throw new Error(`[vuex] ${msg}`)
  },

  //~~~~~ custom ~~~~

  geography: function () {
    let baseUrl;
    if (typeof window.location.origin === 'undefined') {
      baseUrl = location.protocol + '//' + location.host;
    } else {
      baseUrl = window.location.origin;
    }
    return (baseUrl + '/geography.html')
  },

  toast: function (message, iconClass) {
    Vue.$toast({
      message: message,
      className: 'with-icon',
      iconClass: iconClass | 'failed'
    });
  },

  VeeValidateErrors: {
    first ($errors, field) {
      return $errors.first(field)
    },
    collect ($errors, field) {
      return $errors.collect(field)
    },
    has ($errors, field) {
      return $errors.has(field)
    },
    all ($errors) {
      return $errors.all()
    },
    any ($errors) {
      return $errors.any()
    },

    render ($errors) {
      let messages = $errors.all() || [];
      let message = messages[0] || '填写出错啦'
      if (message.indexOf('agreement') !== -1) {
        message = '请您阅读并同意 e批生鲜用户服务协议'
      }
      Vue.$toast({
        message: message,
        className: 'with-icon',
        iconClass: 'failed'
      })
    }
  },
  getParameters: function () {
    let href = window.location.href;
    let p = {};
    if (href.indexOf('?') > -1) {
      let query = href.substring(href.indexOf('?') + 1);
      let kvs = query.split('&');
      if (kvs.length > 0) {
        kvs.forEach(function (kv) {
          let arr = kv.split('=');
          p[arr[0]] = arr[1];
        })
      }
    }
    return p;
  },

  getStyle (el, attr) {
    if(el.currentStyle){
      return el.currentStyle[attr];
    } else{
      return document.defaultView.getComputedStyle(el, null)[attr];
    }
  }
}
