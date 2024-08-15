import {getPostData, getSortedPostsData} from '@/lib/posts'

type Props = {
    params: { category: string, slug: string }
}

export default function BlogPost({ params }: Props) {
    const { category, slug } = params;
    const post = getPostData(category, slug)

    return (
        <article className="prose lg:prose-xl mx-auto">
            <h1>{post.title}</h1>
            <p className="text-gray-500">{post.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    )
}

export async function generateStaticParams() {
    const posts = getSortedPostsData()
    return posts.map((post) => ({
        category: post.category,
        slug: post.id,
    }))
}
