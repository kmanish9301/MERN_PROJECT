import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  const port = env.PORT ? parseInt(env.PORT, 10) : 5174;

  return defineConfig({
    test: {
      global: true,
      environment: "jsdom",
    },
    plugins: [react()],
    server: {
      host: "0.0.0.0", // Expose on network for deployment
      port,
    },
    build: {
      target: "esnext",
      chunkSizeWarningLimit: 500,
    },
  });
};
