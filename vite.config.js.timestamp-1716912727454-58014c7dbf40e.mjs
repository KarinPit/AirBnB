// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/karin/Dropbox/CaPreJan24-ExerciseSubmission/Karin%20Pitlik/AirBnB/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/karin/Dropbox/CaPreJan24-ExerciseSubmission/Karin%20Pitlik/AirBnB/node_modules/@vitejs/plugin-react-swc/index.mjs";
var cherryPickedKeys = ["GOOGLE_MAPS_API_KEY"];
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => processEnv[key] = env[key]);
  return {
    // base: '/vite-react-proj/',
    define: {
      "process.env": processEnv
    },
    plugins: [react()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrYXJpblxcXFxEcm9wYm94XFxcXENhUHJlSmFuMjQtRXhlcmNpc2VTdWJtaXNzaW9uXFxcXEthcmluIFBpdGxpa1xcXFxBaXJCbkJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGthcmluXFxcXERyb3Bib3hcXFxcQ2FQcmVKYW4yNC1FeGVyY2lzZVN1Ym1pc3Npb25cXFxcS2FyaW4gUGl0bGlrXFxcXEFpckJuQlxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMva2FyaW4vRHJvcGJveC9DYVByZUphbjI0LUV4ZXJjaXNlU3VibWlzc2lvbi9LYXJpbiUyMFBpdGxpay9BaXJCbkIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcblxyXG5jb25zdCBjaGVycnlQaWNrZWRLZXlzID0gWydHT09HTEVfTUFQU19BUElfS0VZJ107XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XHJcbiAgY29uc3QgcHJvY2Vzc0VudiA9IHt9O1xyXG4gIGNoZXJyeVBpY2tlZEtleXMuZm9yRWFjaCgoa2V5KSA9PiAocHJvY2Vzc0VudltrZXldID0gZW52W2tleV0pKTtcclxuICByZXR1cm4ge1xyXG4gICAgLy8gYmFzZTogJy92aXRlLXJlYWN0LXByb2ovJyxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAncHJvY2Vzcy5lbnYnOiBwcm9jZXNzRW52LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwWixTQUFTLGNBQWMsZUFBZTtBQUNoYyxPQUFPLFdBQVc7QUFFbEIsSUFBTSxtQkFBbUIsQ0FBQyxxQkFBcUI7QUFFL0MsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sYUFBYSxDQUFDO0FBQ3BCLG1CQUFpQixRQUFRLENBQUMsUUFBUyxXQUFXLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBRTtBQUM5RCxTQUFPO0FBQUE7QUFBQSxJQUVMLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ25CO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
