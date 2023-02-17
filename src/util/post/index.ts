import {GetPostServiceResponse, Post} from "@/types";
import {decreaseDaysOfDate} from "@/util/date";

export const addDateToPostsResponse = (posts: GetPostServiceResponse): Post[] => {
    return posts.map(post => ({
        ...post, date: decreaseDaysOfDate(post.id).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }))
}
