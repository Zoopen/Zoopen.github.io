import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.myGet = function (key, url, data={}) {
  return new Promise((resolve, reject) => {
    let stor = JSON.parse(localStorage.getItem(key));
    if (stor && Date.now() < stor.time + 60 * 60 * 1000) {
      resolve(stor)
    } else {
      this.axios.get(url, data)
        .then(res => {
          resolve(res)
          let msg = res.data
          localStorage.setItem(
            key,
            JSON.stringify({
              time: Date.now(),
              data: msg
            })
          );
        }).catch(err => {
          reject(err)
        })
    }
  })
}

Vue.prototype.$setSongList = function(key,songs){
  localStorage.setItem(
    key,
    JSON.stringify({
      data: songs
    })
  );
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')