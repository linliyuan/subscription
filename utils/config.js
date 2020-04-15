// 配置信息(随环境可能变换的)
const config = {
    adminHost: "http://subscriptionAdmin.com", // 后端地址
    env: "local", // 环境
}

const getConfig = function(){
    return config;
}


module.exports = {
    getConfig: getConfig,
}
