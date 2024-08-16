import { FaAndroid, FaReact, FaFolder } from 'react-icons/fa';
import { SiGradle } from 'react-icons/si';

const categoryIcons: { [key: string]: JSX.Element } = {
    android: <FaAndroid className="h-10 w-10 text-indigo-600" />,
    gradle: <SiGradle className="h-10 w-10 text-indigo-600" />,
    nextjs: <FaReact className="h-10 w-10 text-indigo-600" />, // Next.js 카테고리를 위한 React 아이콘 추가
};

export default function CategoryIcon({ category }: { category: string }) {
    return categoryIcons[category] || <FaFolder className="h-10 w-10 text-indigo-600" />;
}
