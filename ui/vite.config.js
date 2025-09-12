import { defineConfig, loadEnv } from 'vite';
import vite_react_plugin from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

/**
 * @param mode (development/production)
 */
export default defineConfig(({ mode }) => {
	// console.log(process.env); // contains system environment variables
	// const env = loadEnv(mode, process.cwd(), '' );	// Loads all variables from .env.development / .env.production   and   system environment variables
	const vite_env = loadEnv(mode, process.cwd()); // Loads only VITE_ prefixed vars from .env.development / .env.production

	return {
		server: {
			proxy: {
				'/api': vite_env.VITE_API_URL,
				'/resource': vite_env.VITE_RESOURCE_URL,
			},
		},
		plugins: [vite_react_plugin(), tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});
