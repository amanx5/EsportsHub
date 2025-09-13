/**
 * Vite Configuration File
 *
 * This is a Node.js file used by Vite.
 * Vite imports the default export from this file, which provides:
 * - server configurations (host, proxy)
 * - plugins (React, TailwindCSS)
 * - path aliasing for cleaner imports
 */

import { defineConfig, loadEnv } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

/**
 * Export the Vite configuration using defineConfig.
 *
 * `defineConfig` is a helper function provided by Vite to:
 * - enable type inference for IDEs (auto-completion and validation)
 * - allow dynamic configuration via a function that receives the current environment context
 */
export default defineConfig(getViteConfig);

/**
 * getViteConfig generates the actual Vite configuration object.
 *
 * @param {Object} configEnv - The environment context provided by Vite
 *   - configEnv.mode: 'development' | 'production' | 'test'
 *   - configEnv.command: 'serve' | 'build'
 * @returns {Object} Vite configuration object
 */
function getViteConfig(configEnv) {
	/**
	 * Load environment variables for the current mode.
	 *
	 * loadEnv returns only variables prefixed with `VITE_` from .env.development/.env.production by default.
	 * To get all variables from .env.development/.env.production and system variables, pass '' as 3rd argument
	 * To access only system environment variables, use process.env
	 */
	const env = loadEnv(configEnv.mode, process.cwd());

	return {
		server: {
			host: true, // Allow access from LAN
			proxy: {
				'/api': env.VITE_API_URL,
				'/resource': env.VITE_RESOURCE_URL,
			},
		},
		plugins: [reactPlugin(), tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'), // Shortcut to the src directory
			},
		},
	};
}
