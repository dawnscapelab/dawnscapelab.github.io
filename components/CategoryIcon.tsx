import { FaAndroid } from 'react-icons/fa';
import { SiGradle } from 'react-icons/si';
import { FaFolder } from 'react-icons/fa';

const categoryIcons: { [key: string]: JSX.Element } = {
    android: <FaAndroid className="h-10 w-10 text-indigo-600" />,
    gradle: <SiGradle className="h-10 w-10 text-indigo-600" />,
};

export default function CategoryIcon({ category }: { category: string }) {
    return categoryIcons[category] || <FaFolder className="h-10 w-10 text-indigo-600" />;
}
