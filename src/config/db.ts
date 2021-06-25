const productConfig = {
  mysql: {
    port: 3306,
    host: 'rm-wz9e84866tf01de7u4o.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'rootroot@123',
    database: 'mysql_blog', // 库名
    connectionLimit: 10, // 连接限制
  },
};
const localConfig = {
  mysql: {
    port: 3306,
    host: 'rm-wz9e84866tf01de7u4o.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'rootroot@123',
    database: 'mysql_blog', // 库名
    connectionLimit: 10, // 连接限制
  },
};
// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
// npm run lint --fix
const config = process.env.NODE_ENV ? productConfig : localConfig;
export default config;
