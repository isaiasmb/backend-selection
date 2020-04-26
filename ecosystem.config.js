module.exports = {
  apps : [{
    name   : 'bandyer-api',
    script : './dist/main.js',
    instances: 4,
    exec_mode: 'cluster',
    watch: true,
    merge_logs: true,
    env: {
      SERVER_PORT: 5000,
      DB_URL: 'mongodb://localhost/bandyer',
      NODE_ENV: 'development'
    },
    env_production: {
      SERVER_PORT: 5001,
      NODE_ENV: "production"
    }
  }]
}
