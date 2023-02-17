const baseUrl = 'https://jsonplaceholder.typicode.com/'

const postUrls: { [key in 'getPosts']: string } = {
    getPosts: baseUrl + 'posts'
}

export default postUrls
