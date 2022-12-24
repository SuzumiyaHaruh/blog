import {createComment, loadComments} from "../../routes/comment.js";

export const comment = {
    state() {
        return {
            list: []
        }
    },
    mutations: {
        initializeComments(state, comments) {
            state.list = comments
        }
    },
    actions: {
        //发布评论
        async addComment({commit, dispatch}, {content, postId}) {
            await createComment(content, postId)
            dispatch('loadAllComments', postId)
            commit('increaseCommentCount', postId)
        },
        //加载评论
        async loadAllComments({commit}, postId) {
            await loadComments(postId).then(res => {
                const list = res.data.map((comment) => {
                    const result = comment?.attributes;
                    return {
                        id: comment?.id,
                        content: result?.content,
                        pubDate: result?.publishedAt,
                        user: {
                            id: result?.user?.data?.id,
                            ...result?.user?.data?.attributes,
                        },
                    };
                });

                console.log(list)
                commit('initializeComments', list)
            })
        }
    }
}