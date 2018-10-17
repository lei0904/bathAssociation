import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import Data from "./data/index";

export default {
  init () {
    let mock = new MockAdapter(axios)

    mock.onPost('/').reply(arg => {
      let data = JSON.parse(arg.data);
      let cmd = data['cmd'];
      console.log(cmd);

      return new Promise((resolve) => {
        setTimeout(() => {
            resolve([200, Data[cmd]])
        }, 1000)
      })
    })
  }
}
