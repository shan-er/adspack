<template>
    <div>
        <header-tab></header-tab>
		<a href="about.html">about</a>
    </div>
</template>

<script>

import HeaderTab from '../../components/header.vue'

export default {
	name: 'index',
	data() {
		return {
			msg: 'Welcome to Vue App-index'
		}
	},
	components: {
		HeaderTab
	},
	mounted() {
	},
	methods: {
	}
}
</script>