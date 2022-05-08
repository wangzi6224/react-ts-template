
const PROXYS = {
  dev: {
    '*': {
      headers: {
        'X-Frame-Options': 'SAMEORIGIN'
      }
    },
    '/api': {
      changeOrigin: true,
      target: 'http://localhost:3000/',
      pathRewrite: {
        "/api": ""
      }
    },
  },
  online: {
    '/api': {
      changeOrigin: true,
      target: ''
    }
  },
  mock: {
    '/api': {
      changeOrigin: true,
      target: 'https://www.easy-mock.com/mock/5b4839a7d078f153e7c12b0d'
    }
  }
};

// 根据 npm start --[参数] 进行环境切换
let proxy = PROXYS.dev;
for (const key in PROXYS) {
  if (process.env[`npm_config_${key}`]) {
    proxy = { ...proxy, ...PROXYS[key] };
  }
}

module.exports = proxy;
