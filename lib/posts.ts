import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type PostListData = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    slug: string;
}

export type PostData = PostListData & {
    content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts')

function getAllMarkdownFiles(dir: string): string[] {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    let markdownFiles: string[] = []

    for (const file of files) {
        if (file.isDirectory()) {
            markdownFiles = [...markdownFiles, ...getAllMarkdownFiles(path.join(dir, file.name))]
        } else if (file.name.endsWith('.md')) {
            markdownFiles.push(path.join(dir, file.name))
        }
    }

    return markdownFiles
}

export function getSortedPostsData(): PostListData[] {
    const markdownFiles = getAllMarkdownFiles(postsDirectory)
    const allPostsData = markdownFiles.map(filePath => {
        // 파일 경로에서 postsDirectory를 제거하고 .md 확장자를 제거하여 id로 사용
        const relativePath = path.relative(postsDirectory, filePath)
        const parts = relativePath.split(path.sep)

        const category = parts.length > 1 ? parts[0] : 'uncategorized'
        const slug = path.basename(parts[parts.length - 1], '.md')

        const fileContents = fs.readFileSync(filePath, 'utf8')

        // gray-matter를 사용하여 포스트 메타데이터 파싱
        const matterResult = matter(fileContents)

        // 데이터와 id 결합
        return {
            id: `${category}/${slug}`,
            slug: slug,
            title: matterResult.data.title,
            date: matterResult.data.date,
            excerpt: matterResult.data.excerpt,
            category: category,
        } as PostListData
    })

    // 날짜순으로 정렬
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export async function getPostData(category: string, slug: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, category, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // gray-matter를 사용하여 포스트 메타데이터와 내용 파싱
    const matterResult = matter(fileContents)

    // remark를 사용하여 Markdown을 HTML 문자열로 변환
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // 데이터와 id, content 결합
    return {
        id: `${category}/${slug}`,
        slug: slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        category: category,
        content: contentHtml,
    }
}

export function getAllCategories(): string[] {
    const posts = getSortedPostsData()
    const categories = new Set(posts.map(post => post.category))
    return Array.from(categories)
}
