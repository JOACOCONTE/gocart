module.exports = {
  apps: [
    {
      name: 'gocart',
      script: 'node_modules/.bin/next',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1,
      },
      max_memory_restart: '1G',
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', '.next', '.git'],
      merge_logs: true,
      output: '/home/tu_usuario/.pm2/logs/gocart-out.log',
      error: '/home/tu_usuario/.pm2/logs/gocart-err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
