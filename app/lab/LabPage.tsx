import React from 'react'
import Link from 'next/link'

// 임시 데이터: 실제 서비스가 개발되면 이 부분을 동적으로 관리할 수 있습니다.
const services = [
    {
        id: 'future-service-1',
        name: '미래 서비스 1',
        description: '이곳에 미래 서비스 1에 대한 간단한 설명이 들어갑니다.',
        status: 'coming-soon'
    },
    {
        id: 'future-service-2',
        name: '미래 서비스 2',
        description: '이곳에 미래 서비스 2에 대한 간단한 설명이 들어갑니다.',
        status: 'in-development'
    },
    // 추가 서비스들...
]

export default function LabPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">DawnScapeLab 실험실</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        혁신적인 서비스의 탄생지
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        이곳은 DawnScapeLab의 실험실입니다. 우리의 최신 프로젝트와 개발 중인 서비스들을 만나보세요.
                        미래를 만들어가는 혁신의 현장에 여러분을 초대합니다.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {services.map((service) => (
                            <div key={service.id} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    {service.name}
                                    {service.status === 'coming-soon' && (
                                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                            Coming Soon
                                        </span>
                                    )}
                                    {service.status === 'in-development' && (
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                            In Development
                                        </span>
                                    )}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{service.description}</p>
                                    <p className="mt-6">
                                        <Link href={`/lab/${service.id}`} className="text-sm font-semibold leading-6 text-indigo-600">
                                            더 알아보기 <span aria-hidden="true">→</span>
                                        </Link>
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
