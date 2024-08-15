import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About DawnScapeLab</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Welcome to DawnScapeLab, a space where technology meets creativity.
                        This blog is dedicated to exploring the ever-evolving world of web development,
                        with a focus on Next.js, React, and other cutting-edge technologies.
                    </p>
                    <div className="mt-10 max-w-xl">
                        <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                            <Image
                                src="/images/profile.svg"
                                alt="Web Developer Profile"
                                width={80}
                                height={80}
                            />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">Jungmin Lee</h3>
                        <p className="mt-4 text-base leading-7 text-gray-600">
                            Hi there! I&apos;m a passionate web developer with a keen interest in creating
                            efficient and beautiful web applications. Through this blog, I share my
                            experiences, insights, and tutorials to help others in their coding journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
