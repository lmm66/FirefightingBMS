// 准备state——用于存储公共数据
const state = {
    token: false
}
// 准备mutations——用于操作数据
const mutations = {
    changeToken(state) {
        state.token = !state.token
    }
}
export default {
    namespaced: true,
    state,
    mutations, 
}