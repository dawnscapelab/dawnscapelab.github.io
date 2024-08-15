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
            <div className="relative bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                        <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
                        >
                            <polygon points="0,0 90,0 50,100 0,100" />
                        </svg>
                        <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    <span className="block">미래를 그리다,</span>{' '}
                                    <span className="block text-indigo-600">새로운 아침과 함께</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    혁신과 창의성이 만나는 곳, DawnScapeLab에 오신 것을 환영합니다. 우리는 혁신적인 실험을 통해 미래의 문제를 해결하고 새로운 가치를 창출하는 사명을 가지고 있습니다.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Link href="/knowledge-base" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        지식 저장소 둘러보기
                                    </Link>
                                    <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                                        우리의 비전 <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <Image
                        src="/images/hero-image.svg"
                        alt="DawnScapeLab Hero Image"
                        className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
                        width={800}
                        height={600}
                    />
                </div>
            </div>

            {/* Recent Posts Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    최근 실험 결과
                </h2>
                <div className="mt-6 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    {recentPosts.map((post) => (
                        <div key={post.id}>
                            <Link href={`/knowledge-base/${post.id}`}>
                                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                    {post.title}
                                </h3>
                                <p className="mt-3 text-base text-gray-500">
                                    {post.excerpt}
                                </p>
                                <p className="mt-3 text-sm font-medium text-indigo-600">
                                    자세히 알아보기
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
                        혁신의 영역
                    </h2>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Link key={category} href={`/knowledge-base/category/${category}`} className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <div className="flex-shrink-0">
                                    {categoryIcons[category] || categoryIcons.default}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {category} 분야의 혁신 탐험하기
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
