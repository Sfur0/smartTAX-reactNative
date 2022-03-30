module.exports = {
	EasyTAX_nativeApp_db_dbUrl: (process.env.DB_HOST || 'localhost') + ':27017/EasyTAX_nativeApp_db',
    publicPath: '../client/build',
	port: process.env.NODE_PORT || 3000,
    tokenSecret: 'Insert Your Secret Token',
    api: process.env.NODE_API != null ? process.env.NODE_API : '/api'
}