// 准备state——用于存储公共数据
const state = {
    isCollapse: false
}
// 准备mutations——用于操作数据
const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    }
}
export default {
    namespaced: true,
    state,
    mutations, 
}
