---
title: 'Tailwind CSS로 Next.js 프로젝트 스타일링하기'
slug: tailwind-css-nextjs-styling
date: "2024-08-17 23:48:00"
category: "nextjs"
tags: ["tailwindcss", "nextjs", "web development", "css"]
excerpt: '이 포스트에서는 Tailwind CSS를 사용하여 Next.js 프로젝트를 스타일링하는 방법을 자세히 설명합니다.'
---

Tailwind CSS를 사용하여 Next.js 프로젝트를 스타일링하는 방법에 대해 알아보겠습니다. Tailwind CSS는 유틸리티 퍼스트 CSS 프레임워크로, 빠르고 효율적인 스타일링을 가능하게 합니다. 초보자도 쉽게 따라할 수 있도록 단계별로 설명드릴게요.

## Tailwind CSS란?

Tailwind CSS는 CSS 클래스를 조합하여 UI를 구성하는 유틸리티 퍼스트 프레임워크입니다. 기존의 CSS 프레임워크와는 달리, 미리 정의된 컴포넌트보다는 다양한 유틸리티 클래스를 제공하여 스타일을 직접 조합하는 방식입니다. 이를 통해 보다 빠르고 유연한 스타일링이 가능합니다.

## Tailwind CSS 설치 및 설정

### 1단계: Next.js 프로젝트 생성

먼저, Next.js 프로젝트를 생성합니다.

```bash
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
```

### 2단계: Tailwind CSS와 필요한 패키지 설치

Tailwind CSS와 PostCSS, Autoprefixer를 설치합니다.

```bash
npm install tailwindcss postcss autoprefixer
```

### 3단계: Tailwind CSS 설정 파일 생성

Tailwind CSS 설정 파일을 생성합니다.

```bash
npx tailwindcss init -p
```

이 명령어를 실행하면, 프로젝트 루트에 `tailwind.config.js`와 `postcss.config.js` 파일이 생성됩니다.

### 4단계: Tailwind CSS 설정 파일 수정

`tailwind.config.js` 파일을 열고, `content` 배열에 Next.js 페이지와 컴포넌트 파일의 경로를 추가합니다.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 5단계: Tailwind CSS를 글로벌 CSS에 포함

`styles/globals.css` 파일을 열고, Tailwind의 기본 스타일을 포함합니다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6단계: 프로젝트 실행

모든 설정이 완료되면, 프로젝트를 실행하여 Tailwind CSS가 제대로 적용되었는지 확인합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어보세요. Tailwind CSS 스타일이 적용된 페이지를 확인할 수 있습니다.

## Tailwind CSS 사용 예제

이제 Tailwind CSS를 사용하여 Next.js 페이지를 스타일링해봅시다. `pages/index.tsx` 파일을 다음과 같이 수정합니다.

```tsx
// pages/index.tsx
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Hello, Tailwind CSS!</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is a simple example of using Tailwind CSS with Next.js.
      </p>
    </div>
  );
};

export default Home;
```

위의 코드에서 Tailwind의 유틸리티 클래스를 사용하여 레이아웃과 스타일을 간단하게 적용하였습니다.

## Tailwind CSS 사용 시 이점

1. **효율적인 스타일링**: 미리 정의된 클래스들을 조합하여 빠르게 스타일링할 수 있습니다.
2. **유연한 디자인**: 다양한 유틸리티 클래스를 제공하여 필요한 스타일을 세밀하게 조정할 수 있습니다.
3. **반응형 디자인 지원**: 모바일 및 데스크톱 뷰포트에 맞춰 손쉽게 스타일을 조정할 수 있습니다.

## 주의사항

1. **클래스 이름 관리**: Tailwind의 클래스 이름이 많아지면 클래스가 길어질 수 있습니다. 이를 관리하기 위해 [JIT 모드](https://tailwindcss.com/docs/just-in-time-mode) 등을 고려해 보세요.
2. **기본 스타일과의 충돌**: Tailwind CSS는 기본 스타일과 충돌할 수 있으니, 필요에 따라 커스터마이즈하거나 추가 스타일을 적용해야 할 수 있습니다.

## 요약 및 다음 단계 제안

이 포스트에서는 Tailwind CSS를 사용하여 Next.js 프로젝트를 스타일링하는 방법을 단계별로 설명하였습니다. Tailwind의 기본 설정부터 실제 페이지 스타일링까지 다루었습니다.

다음 단계로는 Tailwind CSS의 다양한 유틸리티 클래스를 활용해보고, 커스터마이즈 및 테마 확장을 통해 더 복잡한 디자인을 적용해 보세요.

Happy styling!
