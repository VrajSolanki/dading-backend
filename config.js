/* eslint-disable no-unused-vars */
//import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3008,
    ip: process.env.IP || 'localhost',
    apiRoot: process.env.API_ROOT || '',
    pg: {
          host : 'ec2-50-19-109-120.compute-1.amazonaws.com',
          user : 'xrhdtsmhgnzflr',
          password : '2a9fa91a06278a222b1886640966497e40fd237e649017eaf1a2b90d74478152',
          database : 'da08574caricrn',
          port : '5432',
          ssl : true
    }
  },
  test: { },
  development: {

    database : {
      host : ['ec2-50-19-109-120.compute-1.amazonaws.com'],
      password : '2a9fa91a06278a222b1886640966497e40fd237e649017eaf1a2b90d74478152'
    },
    pg : {
      host : 'ec2-50-19-109-120.compute-1.amazonaws.com',
      userName : 'xrhdtsmhgnzflr',
      password : '2a9fa91a06278a222b1886640966497e40fd237e649017eaf1a2b90d74478152',
      databaseName : 'da08574caricrn',
      multipleStatements : true
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    pg: {
      database : {
        host : ['hb-1-001.mbzq1s.0001.apse1.cache.amazonaws.com'],
        password : 'voot$redis@123'
      },
      databasePg : {
        host : 'localhost',
        userName : 'xrhdtsmhgnzflr',
        password : '2a9fa91a06278a222b1886640966497e40fd237e649017eaf1a2b90d74478152',
        databaseName : 'da08574caricrn'
      }
    }
  }
}

module.exports = config.all
//export default module.exports
