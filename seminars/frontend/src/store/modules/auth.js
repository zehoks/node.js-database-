import axios from 'asios';


// initial state
const state = () => ({
    user: {},
    is_auth: false,
})

// getters
const getters = {}


// actions
const actions = {
    async signIn({ commit }, credentials) {
    // запрос к /sign_in API
        const resp = await axios.post('http://localhost:80/sign_in', credentials)
            commit('setUser', res.data[0])
        } , 
        
    // shop.getProducts(products => {
    //   commit('setProducts', products)
    // })
}

// mutations
const mutations = {
setUser(state, user) {
    state.user = user
    state.is_auth = true
},
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}