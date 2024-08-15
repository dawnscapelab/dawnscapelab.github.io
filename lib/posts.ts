import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get all subdirectories
    const categories = fs.readdirSync(postsDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

    // Get posts from all categories
    const allPostsData = categories.flatMap(category => {
        const categoryPath = path.join(postsDirectory, category)
        const fileNames = fs.readdirSync(categoryPath)

        return fileNames.map(fileName => {
            const id = fileName.replace(/\.md$/, '')

            const fullPath = path.join(categoryPath, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')

            const matterResult = matter(fileContents)

            return {
                id,
                category,
                ...(matterResult.data as { date: string; title: string; excerpt: string })
            }
        })
    })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getPostData(category: string, slug: string) {
    const fullPath = path.join(postsDirectory, category, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
        slug,
        category,
        content: matterResult.content,
        ...(matterResult.data as { date: string; title: string; excerpt: string })
    }
}
