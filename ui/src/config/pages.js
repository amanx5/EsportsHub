import { lazy } from 'react';
import app from './app.json';

export const pagesConfig = {
	home: {
		url: '',
		title: app.name,
		style: {
			background: "linear-gradient(to top left, #020024, #090979, #00d4ff)"
		},
		Page: lazy(() => import('../pages/home/Home.jsx')),
	},
	tournaments: {
		url: '/tournament',
		title: 'Tournaments',
		Page: lazy(() => import('../pages/tournament/Tournament.jsx')),
		navConfig: {
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
			desktop: {
				position: 'left'
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
			desktop: {
				position: 'right',
				icon: ''
			},
			mobile: {
			}
		}
	},
};
