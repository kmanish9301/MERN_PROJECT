import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  // Set base name for the project (can come from env)
  const base = env.VITE_BASE_NAME || "/main";

  // Use Render's PORT env variable, or fallback to 5174 for local dev
  const port = env.PORT ? parseInt(env.VITE_PORT, 10) : 5174;

  return defineConfig({
    base,
    test: {
      global: true,
      environment: "jsdom",
    },
    plugins: [react()],
    server: {
      host: "0.0.0.0", // Expose on network for deployment
      port, // Use Render's PORT or fallback to 5174
    },
    build: {
      target: "esnext",
      chunkSizeWarningLimit: 500,
    },
  });
};
