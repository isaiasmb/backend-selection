module.exports = {
  apps : [{
    name   : 'bandyer-api',
    script : './dist/main.js',
    instances: 4,
    exec_mode: 'cluster',
    watch: true,
    merge_logs: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
