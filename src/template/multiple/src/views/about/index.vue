<template>
    <div>
        <header-tab></header-tab>
		<a href="index.html">index</a>
    </div>
</template>

<script>

import HeaderTab from '../../components/header.vue'

export default {
	name: 'about',
	data() {
		return {
			msg: 'Welcome to Vue App-about'
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