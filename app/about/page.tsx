import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <div className="text-center">
                        <Image
                            src="/images/profile.svg"
                            alt="DawnScapeLab Logo"
                            width={120}
                            height={120}
                            className="mx-auto mb-8"
                        />
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About DawnScapeLab</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Welcome to DawnScapeLab, where we sketch the future, one dawn at a time. We are a creative space
                        dedicated to exploring the intersection of technology and innovation, with a focus on solving
                        future problems and creating new value.
                    </p>
                    </div>

                    <div className="mt-16 space-y-12 text-gray-600">
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                            <p className="mt-2">
                                &quot;To create a world where every idea becomes reality.&quot;
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            <p className="mt-2">
                                &quot;We solve future problems and create new value through innovative
                                experimentation.&quot;
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900">Core Values</h3>
                            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <li className="bg-gray-50 rounded-lg p-4">
                                    <span className="font-semibold text-indigo-600">Innovation:</span> Continuous
                                    pursuit of new ideas and approaches
                                </li>
                                <li className="bg-gray-50 rounded-lg p-4">
                                    <span className="font-semibold text-indigo-600">Flexibility:</span> Adaptability
                                    across diverse fields
                                </li>
                                <li className="bg-gray-50 rounded-lg p-4">
                                    <span className="font-semibold text-indigo-600">Creativity:</span> Generation of
                                    original ideas
                                </li>
                                <li className="bg-gray-50 rounded-lg p-4">
                                    <span className="font-semibold text-indigo-600">Growth:</span> Commitment to
                                    continuous learning and development
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900">What We Do</h3>
                            <p className="mt-2">
                                At DawnScapeLab, we are passionate about pushing the boundaries of what&apos;s possible.
                                Our
                                work spans across various domains of technology and innovation, including:
                            </p>
                            <ul className="mt-4 list-disc list-inside space-y-2">
                                <li>Web Development with cutting-edge technologies</li>
                                <li>Exploration of emerging tech trends</li>
                                <li>Creative problem-solving for future challenges</li>
                                <li>Collaborative innovation projects</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900">Join Our Journey</h3>
                            <p className="mt-2">
                                We believe in the power of collaboration and shared knowledge. Through this blog, we aim
                                to share our experiences, insights, and learnings with the wider community. Join us on
                                this exciting journey as we work towards creating a future full of possibilities.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
