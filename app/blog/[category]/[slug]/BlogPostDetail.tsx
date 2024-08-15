import { PostData } from '@/lib/posts'

type Props = {
    post: PostData
}

export default function BlogPostDetail({ post }: Props) {
    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <article className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <p className="text-base font-semibold leading-7 text-indigo-600">{post.category}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
                <p className="mt-6 text-xl leading-8">
                    {post.excerpt}
                </p>
                <div className="mt-10 max-w-2xl">
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        className="prose prose-indigo max-w-none"
                    />

                    <div className="mt-10 text-sm">
                        <p>Published on: {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
            </article>
        </div>
    )
}
