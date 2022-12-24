import {createPost, favorPost, likePost, loadPosts} from "../../api/post.js";

export const post = {
    state() {
        return {
            list: [],
            currentId: null,
            searchResult: []
        }
    },
    mutations: {
        //初始化帖子
        initializePosts(state, posts) {
            state.list = posts;
        },
        toggleLike(state, {id, isLike}) {
            const post = state.list.find((post) => post.id === id);
            if (isLike) {
                post.liked_bies = (post.liked_bies || 0) + 1;
            } else {
                post.liked_bies--;
            }
            post.likedByMe = isLike;
        },
        toggleFavor(state, {id, isFavor}) {
            const post = state.list.find((post) => post.id === id);
            if (isFavor) {
                post.favored_bies = (post.favored_bies || 0) + 1;
            } else {
                post.favored_bies--;
            }
            post.favoredByMe = isFavor;
        },
        setCurrentId(state, id) {
            state.currentId = id;
        },
        increaseCommentCount(state, id) {
            const post = state.list.find((post) => post.id === id);
            post.comments++;
        },
        setPostsSearchResult(state, posts) {
            state.searchResult = posts
        }
    },
    actions: {
        /**
         * 更新帖子
         */
        async uploadPost({commit, dispatch}, {image, description}) {
            await createPost(image, description);
            dispatch("loadAllPosts");
            // 关闭对话框并清空上传的图片
            commit("changeShowPostUpload", false);
        },
        /**
         * 加载所有帖子
         */
        async loadAllPosts({commit}) {
            await loadPosts().then(res => {
                const list = res.data.map((post) => ({
                    id: post?.id,
                    ...post?.attributes,
                    image: post?.attributes?.image?.data?.[0]?.attributes?.url,
                    user: {
                        id: post?.attributes?.user?.data?.id,
                        ...post?.attributes?.user?.data?.attributes,
                    },
                }));
                commit('initializePosts', list)
            });
        },

        async toggleLike({commit}, id) {
            await likePost(id).then(res => {
                const isLike = res.data
                commit('toggleLike', {id, isLike})
            })
        },

        async toggleFavor({commit}, id) {
            await favorPost(id).then(res => {
                const isFavor = res.data
                commit("toggleFavor", {id, isFavor});
            })

        },
        async showPostDetails({commit, dispatch}, id) {
            commit('setCurrentId', id)
            dispatch('loadAllComments', id)
            commit('changeShowPostDetails', true)
        },
        async hidePstDetails({commit}) {
            commit('setCurrentId', null)
            commit("changeShowPostDetails", false)
        },
        async searchPost({commit}, term) {
            const posts = await loadPosts(
                "filters[description][$contains]=" + term
            ).then(res => {
                const list = res.data.map((post) => ({
                    id: post?.id,
                    ...post?.attributes,
                    image: post?.attributes?.image?.data?.[0]?.attributes?.url,
                    user: {
                        id: post?.attributes?.user?.data?.id,
                        ...post?.attributes?.user?.data?.attributes,
                    },
                }));
                commit("setPostsSearchResult", list);
            })
        }
    },
    getters: {
        postDetails(state) {
            return state.list.find(post => {
                if (post.id === state.currentId) {
                    return post
                }
            })
        },
    }
}