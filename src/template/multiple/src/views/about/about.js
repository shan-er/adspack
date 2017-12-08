import Vue from 'vue';
import index from './index.vue';
require('./../../assets/scss/common.scss');

new Vue({
	render: h => h(index)
}).$mount('#app');