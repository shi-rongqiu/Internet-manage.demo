import _ from 'lodash'
import axios from 'axios'
// import Cookies from 'js-cookie'

// let URL = '/api' // 'http://192.168.0.111'

export default {
  URL: URL + '/union',
  // ACCESS_TOKEN: sessionStorage.getItem('token'),
  // @todo去缓存
  axios (opt, _this) {
      opt.type = opt.type || 'get'
      let ajax = ''
      if (opt.type === 'get') {
        ajax = axios[opt.type](this.URL + opt.url, {
          params: _.extend(opt.params)
        })
      } else {
        ajax = axios[opt.type](this.URL + opt.url,
          opt.params
        )
      }
      return ajax.then((response) => {
        if (response.status) {
          if (typeof opt.done === 'function') opt.done.call(_this, response.data)
        } else {
          if (typeof opt.error === 'function') opt.error.call(_this, response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
  }
}
