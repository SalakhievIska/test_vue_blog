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

      let comments = state.comments.filter(comment => comment.postId === postId)
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
      let index = state.comments.findIndex(comment => comment.id == commentId);
      state.comments.splice(index, 1)
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
