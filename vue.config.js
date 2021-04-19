// module.exports = {
//     dev: {
//         proxyTable: {
//             '/api': { // 请求的代称，写在Axios里的BaseUrl
//                 target: 'http://122.112.253.28:8095/', // 真实请求URl
//                 changeOrigin: true, // 允许跨域
//                 pathRewrite: { // 替换，通配/api的替换成/
//                     '^/api': '/'
//                 }
//             }
//         }
//     }
// }