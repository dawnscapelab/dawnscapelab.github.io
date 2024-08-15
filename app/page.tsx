import Link from 'next/link'
import Image from 'next/image'
import {getAllCategories, getSortedPostsData} from '@/lib/posts'

// 카테고리별 아이콘 매핑
const categoryIcons: { [key: string]: JSX.Element } = {
    default: (
        <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    ),
    nextjs: (
        <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    react: (
        <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
    ),
}

export default function Home() {
    const recentPosts = getSortedPostsData().slice(0, 3)  // Get the 3 most recent posts
    const categories = getAllCategories()

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Welcome to</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">DawnScapeLab</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Explore the intersection of technology and creativity. Dive into web development insights, tutorials, and more.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link href="/blog" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                            Read Blog
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link href="/about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                                            About Me
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <Image
                        className="h-56 w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="/images/hero-image.svg"
                        alt="Web Development Hero Image"
                        width={800}
                        height={600}
                    />
                </div>
            </div>

            {/* Recent Posts Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Recent Posts
                </h2>
                <div className="mt-6 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    {recentPosts.map((post) => (
                        <div key={post.id}>
                            <Link href={`/blog/${post.id}`}>
                                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                    {post.title}
                                </h3>
                                <p className="mt-3 text-base text-gray-500">
                                    {post.excerpt}
                                </p>
                                <p className="mt-3 text-sm font-medium text-indigo-600">
                                    Read full story
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Explore Categories
                    </h2>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Link key={category} href={`/blog/category/${category}`} className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <div className="flex-shrink-0">
                                    {categoryIcons[category] || categoryIcons.default}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Explore posts in {category}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
