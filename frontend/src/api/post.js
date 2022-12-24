import {getJwtToken, getUser} from "./auth.js";
import {request} from "../utils/request.js";

// 添加文章
export async function createPost(image, description) {
    const formData = new FormData();
    formData.append("files.image", image);
    formData.append("data", JSON.stringify({description}));

    await fetch("/api/posts", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${getJwtToken()}`,
        },
    });
}

// 加载文章列表
export async function loadPosts(filters = "") {
    return await request(
        "/api/posts?populate=*" + (filters && `&${filters}`)
    );
}

//点赞
export async function likePost(id) {
    return await request(`/api/posts/${id}/like`, {
        method: 'PUT',
    })
}

//收藏
export async function favorPost(id) {
    return await request(`/api/posts/${id}/favor`, {
        method: "PUT",
    });
}

//我的文章列表
export async function loadPostsByMe() {
  return  loadPosts(`filters[user][id][$eq]=${getUser().id}`)
}

/**
 *
 * @param {"likes" | "favors"} type
 * @returns
 */
export async function loadPostsLikedOrFavoredByMe(type = "likes") {
    const response = await request(
        `/api/users/me?populate[${type}][populate][0]=image`
    );
    return response[type].map((post) => ({
        ...post,
        image: post?.image?.[0].url,
    }));
}
