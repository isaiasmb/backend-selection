module.exports = {
  apps : [{
    name   : 'bandyer-api',
    script : './dist/main.js',
    instances: 4,
    exec_mode: 'cluster',
    watch: true,
    merge_logs: true
  }]
}
