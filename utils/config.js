var config = {
  database: 'regen',
  username: 'test',
  password: 'test',
  host: '212.64.17.49',
  port: 3306,
  dialect: 'mysql',
  ACCESS_KEY: '3ZUTdXYFVHSP3i1xr0b28YiT5zpPr2J7XGtAnNUa',
  SECRET_KEY: 'EjeAdfnjLX6Ij9TT7eVQoDpvxpAuz6lYHtFACNzH',
  bucket: 'infotest',
  filePath: '../img/',
  // download: 'http://oq7eluo6z.bkt.clouddn.com/'
  download: 'http://pc0bksa0g.bkt.clouddn.com/',


  ARTIST_PRODUCT_TYPES: {
    UPDATE: 0,
    ACHIEVEMENT: 1
  },

  // FRONTEND_URLS: ['http://localhost:9092', 'http://121.42.169.109:9092']
  // FRONTEND_URL: 'http://regen.org.cn/'
  FRONTEND_URLS: ['http://localhost:9092', 'http://212.64.17.49:9092']
};

module.exports = config;
