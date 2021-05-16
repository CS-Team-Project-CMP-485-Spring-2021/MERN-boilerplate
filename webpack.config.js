switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;

  case 'dev':
  case 'development':
  default:

    module.exports = require('./config/webpack.dev');
    //var path = require('./config/webpack.dev');

    // module.exports = {
    //   entry: './index.js',
    //   output: {
    //     filename: 'Appointment.js',
    //     path: path.resolve(_dirname, 'dist')
    //   },
    //   module: {
    //     rules:[
    //       {
    //         test:/\.css$/,
    //         loaders: ['style-loader', 'css-loader'],
    //       }
    //     ]
    //   }
    // }
}
