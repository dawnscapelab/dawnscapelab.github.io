import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import {formatDate} from "@/lib/utils";

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const allPosts = await getSortedPostsData()
    const categoryPosts = allPosts.filter((post) => post.category === params.category)

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Posts in category: {params.category}
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Explore the latest articles in the {params.category} category.
                    </p>
                    <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                        {categoryPosts.map((post) => (
                            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-gray-500">
                                        {formatDate(post.date)}
                                    </time>
                                    <span
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {post.category}
                  </span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <Link href={`/knowledge-base/${post.id}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const allPosts = await getSortedPostsData()
    const categories = Array.from(new Set(allPosts.map(post => post.category)))

    return categories.map((category) => ({
        category: category,
    }))
}
