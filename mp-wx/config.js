const DEV_BASE_URL = `http://localhost:3000/`, //本地
  PRO_BASE_URL = `https://dev.csstrobot.com/turing-test/`, //线上
  //手动控制后端api对接地址 'd':dev 't':test '':pro
  ENV_URL = (() => {
    switch ('d') {
      case 'd':
        return DEV_BASE_URL
      default:
        return PRO_BASE_URL
    }
  })()
export const appConfig = {
  wx: {
    appid: 'wx3852736e03cedc83',
    authorize: false, //个人信息授权
    location: false //位置信息授权
  },
  apiUrl: `${ENV_URL}api`
}
