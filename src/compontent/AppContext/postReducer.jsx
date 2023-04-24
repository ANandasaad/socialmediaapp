export const postActions = {
    SUBMIT_POST: "SUBMIT_POST",
    HANDLE_ERROR: "HANDLE_ERROR",
    ADD_LIKE: "ADD_LIKE",
    
  };
  
  export const postsStates = {
    error: false,
    posts: [],
    likes: [],
   
  };
  
  export const PostsReducer = (state, action) => {
    switch (action.type) {
      case postActions.SUBMIT_POST:
        return {
          ...state,
          error: false,
          posts: action.posts,
        };
      case postActions.ADD_LIKE:
        return {
          ...state,
          error: false,
          likes: action.likes,
        };
     
      case postActions.HANDLE_ERROR:
        return {
          ...state,
          error: true,
          posts: [],
        };
      default:
        return state;
    }
  };
  