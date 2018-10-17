import Utils from '../utils'

import base from './base'
import api1 from './api1'
import api2 from './api2'

let api = Utils.extend({}, base)
api = Utils.extend(api, api1)
api = Utils.extend(api, api2)

export default api
