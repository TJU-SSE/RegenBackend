var config = {
  database: 'regeneration',
  username: 'root',
  password: 'qianyu123',
  host: '123.207.243.143',
  port: 3306,
  dialect: 'mysql',
  ACCESS_KEY: '3ZUTdXYFVHSP3i1xr0b28YiT5zpPr2J7XGtAnNUa',
  SECRET_KEY: 'EjeAdfnjLX6Ij9TT7eVQoDpvxpAuz6lYHtFACNzH',
  bucket: 'regenerationpub',
  filePath: '../img/',
  // download: 'http://oq7eluo6z.bkt.clouddn.com/'
  download: 'http://orbctx8xa.bkt.clouddn.com/',

  ARTIST_PRODUCT_TYPES: {
    UPDATE: 0,
    ACHIEVEMENT: 1
  },

  // FRONTEND_URLS: ['http://localhost:9092', 'http://121.42.169.109:9092']
  FRONTEND_URL: 'http://regen.org.cn/'
};

module.exports = config;
