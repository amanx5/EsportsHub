import { lazy } from 'react';
import about from './about.json';

export const pagesConfig = {
	error: {
		title: about.name,
		style: {
			background: "lightgrey"
		},
		Page: lazy(() => import('../components/RouteError.jsx')),
	},
	home: {
		url: '',
		title: about.name,
		style: {
			background: "linear-gradient(to top left, #000010, #05004a, #0077aa)"
		},
		Page: lazy(() => import('../pages/home/Home.jsx')),
	},
	tournaments: {
		url: '/tournament',
		title: 'Tournaments',
		Page: lazy(() => import('../pages/tournament/Tournament.jsx')),
		navConfig: {
			guest: true,
			user: true,
			desktop: {
				position: 'left'
			},
			mobile: {
			}
		}
	},
	leaderboard: {
		url: '/leaderboard',
		title: 'Leaderboard',
		Page: lazy(() => import('../pages/leaderboard/Leaderboard.jsx')),
		navConfig: {
			guest: true,
			user: true,
			desktop: {
				position: 'left'
			},
			mobile: {
			}
		}
	},
	login: {
		url: '/login',
		title: 'Sign In',
		Page: lazy(() => import('../pages/profile/Profile.jsx')),
		navConfig: {
			guest: true,
			user: false,
			desktop: {
				position: 'right',
				icon: ''
			},
			mobile: {
			}
		}
	},
	register: {
		url: '/register',
		title: 'Sign Up',
		Page: lazy(() => import('../pages/profile/Profile.jsx')),
		navConfig: {
			guest: true,
			user: false,
			desktop: {
				position: 'right',
				icon: ''
			},
			mobile: {
			}
		}
	},
	profile: {
		url: '/profile',
		title: 'Profile',
		Page: lazy(() => import('../pages/profile/Profile.jsx')),
		navConfig: {
			guest: false,
			user: true,
			desktop: {
				position: 'right',
				icon: ''
			},
			mobile: {
			}
		}
	},
};