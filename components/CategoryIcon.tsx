import { FaAndroid, FaReact, FaFolder, FaInfinity, FaCode, FaUsers, FaClipboardCheck, FaLaptopCode, FaDesktop, FaRobot,
    FaNodeJs, FaAtom, FaShieldAlt, FaIndustry, FaTasks, FaCheckCircle } from 'react-icons/fa';
import { SiGradle } from 'react-icons/si';

const categoryIcons: { [key: string]: JSX.Element } = {
    android: <FaAndroid className="h-10 w-10 text-indigo-600" />,
    gradle: <SiGradle className="h-10 w-10 text-indigo-600" />,
    nextjs: <FaReact className="h-10 w-10 text-indigo-600" />,
    devops: <FaInfinity className="h-10 w-10 text-indigo-600" />,
    'software-development': <FaCode className="h-10 w-10 text-indigo-600" />,
    leadership: <FaUsers className="h-10 w-10 text-indigo-600" />,
    'software-testing': <FaClipboardCheck className="h-10 w-10 text-indigo-600" />,
    programming: <FaLaptopCode className="h-10 w-10 text-indigo-600" />,
    desktop: <FaDesktop className="h-10 w-10 text-indigo-600" />,
    'web-automation': <FaRobot className="h-10 w-10 text-indigo-600" />,
    nodejs: <FaNodeJs className="h-10 w-10 text-indigo-600" />,
    electron: <FaAtom className="h-10 w-10 text-indigo-600" />,
    security: <FaShieldAlt className="h-10 w-10 text-indigo-600" />,
    industry: <FaIndustry className="h-10 w-10 text-indigo-600" />,
    'project-management': <FaTasks className="h-10 w-10 text-indigo-600" />,
    'quality-assurance': <FaCheckCircle className="h-10 w-10 text-indigo-600" />,
};

export default function CategoryIcon({ category }: { category: string }) {
    return categoryIcons[category] || <FaFolder className="h-10 w-10 text-indigo-600" />;
}
