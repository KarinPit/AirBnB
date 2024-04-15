import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

const cherryPickedKeys = ['GOOGLE_MAPS_API_KEY'];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));
  return {
    // base: '/vite-react-proj/',
    define: {
      'process.env': processEnv,
    },
    plugins: [react()],
  };
});
