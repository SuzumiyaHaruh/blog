import {getJwtToken} from "../api/auth";

export async function request(
    url,
    { method = "GET", body, headers, auth = true } = {}
) {
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
            ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
    });
    // if (res.status < 300) {
    return await res.json();
    // }
    // } catch (error) {
    //   throw error;
    // }
}
