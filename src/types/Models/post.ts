export interface Post {
    body: string,
    id: number,
    title: string,
    userId: number
}

export type GetPostServiceResponse = Post[]
