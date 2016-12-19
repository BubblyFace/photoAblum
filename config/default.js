module.exports = {
  port: 3000,
  session: {
    secret: 'photoAblum',
    key: 'photoAblum',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/photoAblum'
};