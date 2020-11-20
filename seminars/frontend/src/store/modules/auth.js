import axios from 'asios';
import jwtDecode from 'jwt-decode'

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
        const resp = await axios.post('/Sign_in', credentials)
        const token = resp.data.token
    // добавлю к axios header по умолчанию
    // чтобы все запросы к бэку отправлялись с токеном
    this._vm.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const user = jwtDecode(token)
    commit('setUser', user)
    }, 
        
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