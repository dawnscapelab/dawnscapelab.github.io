import Link from 'next/link'
import { getSortedPostsData } from "@/lib/posts";

export default function BlogList() {
    const blogPosts = getSortedPostsData()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <div className="space-y-8">
                {blogPosts.map((post) => (
                    <div key={`${post.category}-${post.id}`} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link href={`/blog/${post.category}/${post.id}`}
                                  className="text-blue-600 hover:text-blue-800">
                                {post.title}
                            </Link>
                        </h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <p className="text-sm text-gray-500">{post.date}</p>
                        <p className="text-sm text-gray-500">Category: {post.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
