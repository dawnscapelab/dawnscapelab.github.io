---
title: 'Next.js로 정적 블로그 만들기: 시작부터 배포까지'
slug: creating-static-blog-with-nextjs
date: '2024-08-16 20:45:00'
category: "nextjs"
tags: ["nextjs", "react", "web development", "static site generation", "blogging"]
excerpt: 'Next.js를 사용하여 개인 정적 블로그를 만드는 과정을 처음부터 끝까지 알아봅니다. 초보자도 쉽게 따라할 수 있는 단계별 가이드입니다.'
---

Next.js를 사용하여 개인 정적 블로그를 만드는 방법에 대해 알아보겠습니다. 이 글은 React와 Next.js에 대한 기본적인 이해가 있는 분들을 대상으로 작성되었지만, 웹 개발 초보자분들도 차근차근 따라오실 수 있도록 최대한 쉽게 설명하겠습니다.

## 1. 왜 Next.js로 정적 블로그를 만들까요?

Next.js는 React 기반의 강력한 프레임워크로, 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원합니다. 정적 블로그를 만들 때 Next.js를 선택하는 이유는 다음과 같습니다.

- **빠른 페이지 로딩**: 정적으로 생성된 페이지는 매우 빠르게 로드됩니다.
- **SEO 최적화**: 검색 엔진이 콘텐츠를 쉽게 색인할 수 있습니다.
- **개발 경험**: React의 모든 이점을 누리면서도 추가적인 최적화를 제공합니다.
- **확장성**: 블로그를 넘어 더 복잡한 웹 애플리케이션으로 확장하기 쉽습니다.

## 2. 프로젝트 설정하기

먼저, 새로운 Next.js 프로젝트를 생성해봅시다.

```bash
npx create-next-app@latest my-blog
cd my-blog
```

프로젝트 생성 중 나오는 질문들에 대해 다음과 같이 답하세요.

- TypeScript를 사용하시겠습니까? → Yes
- ESLint를 사용하시겠습니까? → Yes
- Tailwind CSS를 사용하시겠습니까? → Yes (스타일링을 위해)
- `src/` 디렉토리를 사용하시겠습니까? → Yes
- App Router를 사용하시겠습니까? → Yes

## 3. 블로그 구조 만들기

블로그의 기본 구조를 만들어봅시다. `src/app` 디렉토리 안에 다음과 같은 구조를 만듭니다:

```
src/app/
├── page.tsx
├── layout.tsx
├── posts/
│   └── [slug]/
│       └── page.tsx
└── api/
    └── posts.ts
```

`page.tsx`는 홈페이지, `posts/[slug]/page.tsx`는 개별 블로그 포스트 페이지가 됩니다.

## 4. Markdown 파일로 블로그 포스트 작성하기

`posts` 디렉토리를 프로젝트 루트에 만들고, 그 안에 Markdown 파일로 블로그 포스트를 작성합니다.

```markdown
---
title: '첫 번째 블로그 포스트'
date: '2024-08-16'
---

안녕하세요, 이것은 제 첫 번째 블로그 포스트입니다!
```

## 5. Markdown 파일 파싱하기

Markdown 파일을 파싱하기 위해 `gray-matter`와 `remark`를 설치합니다.

```bash
npm install gray-matter remark remark-html
```

그리고 `src/lib/posts.ts` 파일을 만들어 Markdown 파일을 처리하는 함수를 작성합니다.

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      ...(matterResult.data as { date: string; title: string })
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}
```

## 6. 블로그 포스트 목록 표시하기

홈페이지에 블로그 포스트 목록을 표시해봅시다. `src/app/page.tsx`를 다음과 같이 수정합니다.

```tsx
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## 7. 개별 블로그 포스트 페이지 만들기

`src/app/posts/[slug]/page.tsx` 파일을 만들어 개별 블로그 포스트 페이지를 구현합니다.

```tsx
import { getPostData, getSortedPostsData } from '../../../lib/posts'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <article>
      <h1>{postData.title}</h1>
      <div>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  )
}
```

## 8. 스타일링

Tailwind CSS를 사용하여 블로그를 스타일링할 수 있습니다. `src/app/globals.css` 파일에 원하는 스타일을 추가하세요.

## 9. 배포하기

Next.js 애플리케이션을 배포하는 가장 쉬운 방법 중 하나는 Vercel을 사용하는 것입니다. Vercel은 Next.js를 만든 회사이기도 합니다.

1. [Vercel](https://vercel.com/)에 가입합니다.
2. GitHub 저장소에 프로젝트를 푸시합니다.
3. Vercel에서 "New Project"를 클릭하고 GitHub 저장소를 선택합니다.
4. 배포 설정을 확인하고 "Deploy"를 클릭합니다.

몇 분 후에 여러분의 블로그가 온라인에 공개됩니다!

## 마무리

이렇게 Next.js를 사용하여 정적 블로그를 만들어 보았습니다. 이 기본 구조를 바탕으로 카테고리, 태그, 검색 기능 등을 추가하여 더욱 풍성한 블로그를 만들 수 있습니다.

다음 단계로는 다음과 같은 기능을 추가해 볼 수 있습니다.

1. 댓글 시스템 통합 (예: Disqus)
2. 검색 기능 구현
3. SEO 최적화
4. 소셜 미디어 공유 버튼 추가

Next.js로 블로그를 만드는 과정이 어떠셨나요? 질문이나 피드백이 있다면 언제든 공유해주세요. 행운을 빕니다!
