import Vue from 'vue'
// import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VeeValidate, { Validator } from 'vee-validate'

let zh_CN = {
  name: 'zh_CN',
  messages: {
    after: function (n, e) {
      return ' ' + n + '必须在' + e[0] + '之后'
    },
    alpha_dash: function (n) {
      return ' ' + n + '不能包含特殊字符'
    },
    alpha_num: function (n) {
      return n + ' 只能包含字母数字字符.'
    },
    alpha_spaces: function (n) {
      return ' ' + n + ' 只能包含字母字符，包括空格.'
    },
    alpha: function (n) {
      return ' ' + n + ' 只能包含字母字符.'
    },
    before: function (n, e) {
      return ' ' + n + ' 必须在' + e[0] + ' 之前.'
    },
    between: function (n, e) {
      return ' ' + n + ' 必须在' + e[0] + ' ' + e[1] + '之间.'
    },
    confirmed: function (n, e) {
      return ' ' + n + ' 不能和' + e[0] + '匹配.'
    },
    date_between: function (n, e) {
      return ' ' + n + '必须在' + e[0] + '和' + e[1] + '之间.'
    },
    date_format: function (n, e) {
      return ' ' + n + '必须在在' + e[0] + '格式中.'
    },
    decimal: function (n, e) {
      void 0 === e && (e = [])
      var t = e[0]
      return void 0 === t && (t = '*'), ' ' + n + ' 必须是数字的而且能够包含' + (t === '*' ? '' : t) + ' 小数点.'
    },
    digits: function (n, e) {
      if (n === '4位验证码') {
        return '请输入' + n
      }
      return ' ' + n + ' 必须是数字，且精确到 ' + e[0] + '数'
    },
    dimensions: function (n, e) {
      return ' ' + n + '必须是 ' + e[0] + ' 像素到 ' + e[1] + ' 像素.'
    },
    email: function (n) {
      return ' ' + n + ' 必须是有效的邮箱.'
    },
    ext: function (n) {
      return ' ' + n + ' 必须是有效的文件.'
    },
    image: function (n) {
      return ' ' + n + ' 必须是图片.'
    },
    in: function (n) {
      return ' ' + n + ' 必须是一个有效值.'
    },
    ip: function (n) {
      return ' ' + n + ' 必须是一个有效的地址.'
    },
    max: function (n, e) {
      if (n === '手机号') {
        return '请输入正确的' + n
      }
      return ' ' + n + ' 不能大于' + e[0] + '字符.'
    },
    max_value: function (n, e) {
      return ' ' + n + ' 必须小于或等于' + e[0] + '.'
    },
    mimes: function (n) {
      return ' ' + n + ' 必须是有效的文件类型.'
    },
    min: function (n, e) {
      return ' ' + ' 请输入至少 ' + e + '位的 ' + n
    },
    min_value: function (n, e) {
      return ' ' + n + ' 必须大于或等于' + e[0] + '.'
    },
    not_in: function (n) {
      return ' ' + n + '必须是一个有效值.'
    },
    numeric: function (n) {
      return ' ' + n + ' 只能包含数字字符.'
    },
    regex: function (n) {
      return ' ' + n + ' 格式无效.'
    },
    required: function (n) {
      if (n === '密码') {
        return '请输入至少六位的' + n + ',可包含数字、英文字母、符号'
      }
      return '请输入' + n
    },
    size: function (n, e) {
      return ' ' + n + ' 必须小于 ' + (function (n) {
        var e = (n = 1024 * Number(n)) == 0 ? 0 : Math.floor(Math.log(n) / Math.log(1024))
        return 1 * (n / Math.pow(1024, e)).toFixed(2) + ' ' + ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][e]
      }(e[0])) + '.'
    },
    url: function (n) {
      return ' ' + n + '不是有效的url.'
    }
  },
  attributes: {}
}

Validator.localize('zh_CN', zh_CN)

Validator.extend('phone', {
  getMessage: function (field) {
    return '请输入正确的' + field + '.'
  },
  validate: function (val) {
    return /^1[34578]\d{9}$/.test(val)
  }
})

const config = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: false,
  aria: true,
  i18n: null, // the vue-i18n plugin instance,
  i18nRootKey: 'validations' // the nested key under which the validation messsages will be located
}

Vue.use(VeeValidate, config)
