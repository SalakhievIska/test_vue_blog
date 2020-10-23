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

    updateComments (state, comments) {
      state.comments = comments
    },
    createComment (state, newComment) {
      state.comments.unshift(newComment)
    }
  },
  state: {
    posts: [],
    comments: []
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
    }
  }
}
