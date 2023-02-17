export interface Post {
    body: string,
    id: number,
    title: string,
    userId: number,
    date: string;
}

export type GetPostServiceResponse = Omit<Post, 'date'>[]
