let root = 'http://erptest.epfresh.com/'

import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'

function api (method, url, params, loading) {
  if (params) {
    let qs = Qs.stringify(params)
    if (method === 'GET') {
      if (url.indexOf('?') > -1) {
        url = url + '&' + qs
      } else {
        url = url + '?' + qs
      }
    }
  }

  return new Promise(function (resolve, reject) {
    return axios({
      _loading: loading,
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      baseURL: root,
      withCredentials: false,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        let data = response.data
        if (data.status === 200) {
          resolve(data.response)
          let error = data.response['error']
          if (error) {
            Vue.$toast({
              message: error || '操作失败',
              className: 'with-icon',
              iconClass: 'failed'
            })
          }
        } else {
          Vue.$toast({
            message: data.error || '操作失败',
            className: 'with-icon',
            iconClass: 'failed'
          })
          if (reject) {
            reject(data)
          }
        }
      } else {
        Vue.$toast({
          message: '网络请求失败',
          className: 'with-icon',
          iconClass: 'failed'
        })
      }
    }).catch(function (error) {
      Vue.$toast({
        message: '网络请求失败',
        className: 'with-icon',
        iconClass: 'failed'
      })
      Vue['$indicator'].close()
      console.error(error)
    })
  })
}

axios.interceptors.request.use(function (config) {
  let loading = config['_loading']
  if (loading) {
    if (typeof loading === 'object') {
      Vue['$indicator'].open(loading.tip)
    } else {
      Vue['$indicator'].open('加载中...')
    }
  }
  return config
})

axios.interceptors.response.use(function (response) {
  let config = response.config
  let loading = config['_loading']
  if (loading) {
    Vue['$indicator'].close()
  }

  return response
})

export const get = (url, params, loading) => {
  return api('GET', url, params, typeof loading === 'undefined' ? true : loading)
}

export const post = (url, params, loading) => {
  return api('POST', url, params, typeof loading === 'undefined' ? true : loading)
}

export const handleParamters = (parameters) => {
  if (!parameters['token']) {
    parameters['token'] = sessionStorage.getItem('token')
  }
  if (!parameters['storeId']) {
    parameters['storeId'] = sessionStorage.getItem('storeID')
  }
}

export default {
  handleParamters,

  get,
  post
  /* get: function (url, params, loading) {
    return api('GET', url, params, typeof loading === 'undefined' ? true : loading)
  },
  post: function (url, params, loading) {
    return api('POST', url, params, typeof loading === 'undefined' ? true : loading)
  },
  put: function (url, params, loading) {
    return api('PUT', url, params, typeof loading === 'undefined' ? true : loading)
  },
  delete: function (url, params, loading) {
    return api('DELETE', url, params, typeof loading === 'undefined' ? true : loading)
  } */
}

