export default {
  actions: {
  },
  mutations: {
    updatePosts (state, posts) {
      state.posts = posts
    },
    createPost (state, newPost) {
      state.posts.unshift(newPost)
    },
    deletePost (state, postId) {
      let index = state.posts.findIndex(post => post.id == postId);
      state.posts.splice(index, 1)

      const comments = state.comments.filter(comment => comment.postId === postId)
      for (let i=0; i < comments.length; i++) {
        index = state.comments.findIndex(comment => comment.postId == postId);
        state.comments.splice(index, 1)
      }
    },

    updateComments (state, comments) {
      state.comments = comments
    },
    createComment (state, newComment) {
      state.comments.unshift(newComment)
    },
    deleteComment (state, commentId) {
      const index = state.comments.findIndex(comment => comment.id == commentId);
      state.comments.splice(index, 1)
    },

    createAccount (state, newAccount) {
      state.accounts.unshift(newAccount)
    },
    loginAccount (state, info) {
      state.user.token = state.accounts.find(
        account => account.mail === info.mail && account.password === info.password
      ).token
      state.user.isLogin = true;
    },
    logoutAccount (state) {
      state.user.token = '';
      state.user.isLogin = false;
    }
  },
  state: {
    posts: [],
    comments: [],
    accounts: [],
    user: {
      token: '',
      isLogin: null,
    },
  },
  getters: {
    allPosts: (state) => {
      return state.posts
    },
    onePost: (state) => (postId) => {
      return state.posts.find(post => post.id === postId)
    },

    neededComments: (state) => (postId) => {
      return state.comments.filter(comment => comment.postId === postId)
    },

    getAccount: (state) => (mail, password) => {
      return state.accounts.filter(
        account => account.mail === mail && account.password === password
      )
    },
    getUserNick: (state) => {
      return state.accounts.find(
        account => account.token === state.user.token
      ).nickname
    },
    checkUser: (state) => {
      return state.user.isLogin
    }
  }
}
