import Vue from 'vue'
import Router from 'vue-router'

// shared
import Header from '@/components/shared/Header'
import Indice from '@/components/shared/Indice'
import Footer from '@/components/shared/Footer'
import Apoio from '@/components/shared/Apoio'

// pages
import Main from '@/components/pages/Main'

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'Main',
			components: {
				header: Header,
				indice: Indice,
				main: Main,
				apoio: Apoio,
				footer: Footer
			}
		},
	]
})

export default router;