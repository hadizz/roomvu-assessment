import axios from "axios";
import {GetPostServiceResponse, Post} from "@/types";
import {addDateToPostsResponse} from "@/util/post";

const baseUrl = 'https://jsonplaceholder.typicode.com/'

const postUrls: { [key in 'getPosts']: string } = {
    getPosts: baseUrl + 'posts'
}

export default postUrls

export const getPostsService = async (): Promise<Post[]> => {
    const res = await axios.get<GetPostServiceResponse>(postUrls.getPosts);
    const posts = addDateToPostsResponse(res.data);
    // @ts-ignore
    posts.sort((a, b) => b.date - a.date)
    return posts;
}
