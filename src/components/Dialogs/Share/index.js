
import Vue from 'vue';
import dialog from './index.vue';

let DialogConstructor = Vue.extend(dialog);

let instance;


var initInstance = function() {
  instance = new DialogConstructor({
    el: document.createElement('div')
  });
};

let ShareDialog = function(callback) {
  if (!instance) {
    initInstance();
  }

  if (!instance.value) {
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.value = true;
    });
  }
};

ShareDialog.close = function() {
  if (!instance) return;
  instance.value = false;
};

export default ShareDialog;
