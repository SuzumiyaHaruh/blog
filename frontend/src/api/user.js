import {request} from "../utils/request";
import {getUser} from "./auth";

export async function changeUser(user) {
    return await request(`/api/users/${getUser().id}`, {
        method: "PUT",
        body: user,
    });
}
