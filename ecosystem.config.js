module.exports = {
  apps: [
    {
      name: "GKC-Client v4.0.0",
      cwd: "/opt/gkcloud.ai/client/",
      script: 'npm',
      args: 'start',
      instances: 1, 
      exec_mode: "cluster", 
      watch: ["pages", "components", "lib"],
      ignore_watch: ["node_modules", ".next", "logs"],
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3003
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
