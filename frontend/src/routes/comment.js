import {request} from "../utils/request";

//发布评论
export async function createComment(content, postId) {
    await request("/api/comments", {
        method: "POST",
        body: {
            data: {
                content,
                post: postId,
            },
        },
    });
}
//加载评论
export async function loadComments(postId) {
    if (!postId) return [];
    return await request(
        "/api/comments?populate=*&filters[post][id][$eq]=" + postId
    )
}
