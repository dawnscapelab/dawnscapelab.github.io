import { getPostData, getSortedPostsData } from '@/lib/posts'
import BlogPostDetail from './BlogPostDetail'

type Props = {
    params: { category: string; slug: string }
}

export default async function BlogPostPage({ params }: Props) {
    const { category, slug } = params
    const postData = await getPostData(category, slug)

    return <BlogPostDetail post={postData} />
}

export async function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        category: post.category,
        slug: post.slug,
    }))
}
