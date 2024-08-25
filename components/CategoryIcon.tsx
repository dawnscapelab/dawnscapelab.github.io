import { FaAndroid, FaReact, FaFolder, FaInfinity, FaCode } from 'react-icons/fa';
import { SiGradle } from 'react-icons/si';

const categoryIcons: { [key: string]: JSX.Element } = {
    android: <FaAndroid className="h-10 w-10 text-indigo-600" />,
    gradle: <SiGradle className="h-10 w-10 text-indigo-600" />,
    nextjs: <FaReact className="h-10 w-10 text-indigo-600" />, // Next.js 카테고리를 위한 React 아이콘 추가
    devops: <FaInfinity className="h-10 w-10 text-indigo-600" />, // DevOps 카테고리를 위한 무한대 아이콘 추가
    'software-development': <FaCode className="h-10 w-10 text-indigo-600" />, // 소프트웨어 개발 카테고리를 위한 코드 아이콘 추가
};

export default function CategoryIcon({ category }: { category: string }) {
    return categoryIcons[category] || <FaFolder className="h-10 w-10 text-indigo-600" />;
}
