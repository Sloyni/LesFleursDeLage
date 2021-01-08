import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const get = async function(url){
  try {
    let response = await axios.get(url,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(response.statusText == "OK"){
      return response.data
    }
  } catch (error) {
    localStorage.removeItem('accessToken')
    return {'message':'Unauthenticated.'}
  }
}
const post = async function(url,data){
  let response = await axios.post(url,data)
  try {
    if(response.statusText == "OK"){
      return response.data
    }
  } catch (error) {
    return error;
  }
}

export default new Vuex.Store({

  state: {
    user: null,
    loginError: null,
    classrooms: null,
    classroomsLoading: null,
    matters: null,
    mattersLoading: null,
    title: null,
    posts: null,
    postsLoading: null,
  },
  getters: {
    getLoginError: state => {
      if(state.loginError==null){
        return '';
      }
      return state.loginError
    },
    isAdmin: state => {
      if(state.user.role=="admin"){
        return true;
      }
      return false;
    },
    isTeacher: state => {
      if(state.user.role=="teacher"){
        return true;
      }
      return false;
    },
    getClassrooms: state => {
      return state.classrooms
    },
    getClassroomsLoading: state => {
      return state.classroomsLoading
    },
    getMatters: state => {
      return state.matters
    },
    getMattersLoading: state => {
      return state.mattersLoading
    },
    getTitle: state => {
      return state.title
    },
    getPosts: state => {
      return state.posts
    },
    getPostsLoading: state => {
      return state.postsLoading
    },
  },
  mutations: {
    setAccessToken: function(state,access_token){
      localStorage.setItem('accessToken',access_token)
    },
    setUser: function(state,user){
      state.user = user
    },
    setLoginError: function(state,text){
      state.loginError = text
    },
    setLogoutUser: function(state){
      localStorage.removeItem('accessToken')
    },
    setClassrooms: function(state,classrooms){
      state.classrooms = classrooms
    },
    setClassroomsLoading: function(state,value){
      state.classroomsLoading = value
    },
    setMatters: function(state,matters){
      state.matters = matters
    },
    setMattersLoading: function(state,value){
      state.mattersLoading = value
    },
    setTitle : function(state, text) {
      state.title = text
    },
    setPosts: function(state,posts){
      state.posts = posts
    },
    setPostsLoading: function(state,value){
      state.postsLoading = value
    },
  },
  actions: {
    getUser: async function(context){
      if(this.state.user===null){
        if(localStorage.getItem('accessToken')!==null){
          let response = await get('http://192.168.1.112/lesfleursdelage/public/api/user')
          if(response.message!=="Unauthenticated."){
            context.commit('setUser',response)
          }
          return response
        }
      }
    },
    loginUser: async function(context,{username,password}){
      const data = {
        name: username,
        password: password
      }
      let response = await post('http://192.168.1.112/lesfleursdelage/public/api/user/login',data)
      if(typeof response.user!=='undefined'){
        context.commit('setAccessToken',response.access_token)
        context.commit('setUser',response.user)
        context.commit('setLoginError','')
      } else {
        context.commit('setLoginError','Les identifiants sont incorrects')
      }
    },
    logoutUser: function(context){
      context.commit('setLogoutUser')
    },
    getClassrooms: async function(context){
      const data = {
        authorisation: localStorage.getItem('accessToken')
      }
      let response = await post('http://192.168.1.112/lesfleursdelage/public/api/classroom/index',data)
      if(!response.error){
        context.commit('setClassrooms',response)
      }
    },
    getMatters: async function(context,classroom){
      const data = {
        classroom: classroom,
        authorisation: localStorage.getItem('accessToken')
      }
      let response = await post('http://192.168.1.112/lesfleursdelage/public/api/matter/index',data)
      if(!response.error){
        context.commit('setMatters',response)
      }
    },
    getPosts: async function(context,{classroom,matter}){
      const data = {
        classroom: classroom,
        matter: matter,
        authorisation: localStorage.getItem('accessToken')
      }
      let response = await post('http://192.168.1.112/lesfleursdelage/public/api/post/index',data)
      if(!response.error){
        context.commit('setPosts',response)
      }
    },
    addPost: async function(context,fd){
      await post('http://192.168.1.112/lesfleursdelage/public/api/post/store',fd)
    }
  },

})
