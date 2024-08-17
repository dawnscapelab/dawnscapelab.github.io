---
title: 'GitHub Pages와 Actions를 활용한 자동 배포 파이프라인 구축'
slug: github-pages-actions-auto-deploy-pipeline
date: "2024-08-17 11:19:00"
category: "devops"
tags: ["github", "ci/cd", "automation", "web development"]
excerpt: 'GitHub Pages와 GitHub Actions를 활용하여 웹 프로젝트의 자동 배포 파이프라인을 구축하는 방법을 단계별로 알아봅니다.'
---

## 소개

GitHub Pages와 GitHub Actions를 사용하여 자동 배포 파이프라인을 구축하는 방법에 대해 알아보겠습니다. 이 글은 Git과 GitHub에 대한 기본적인 이해가 있는 개발자를 대상으로 합니다. CI/CD에 대한 경험이 없어도 괜찮습니다. 이 글을 통해 자동화된 배포 프로세스의 기본을 배우게 될 것입니다.

## 왜 자동 배포 파이프라인이 필요한가?

개발 프로세스에서 배포는 종종 시간 소모적이고 오류가 발생하기 쉬운 작업입니다. 자동 배포 파이프라인을 구축함으로써 다음과 같은 이점을 얻을 수 있습니다.

1. 시간 절약: 수동 배포 과정을 자동화하여 개발에 더 집중할 수 있습니다.
2. 일관성: 모든 배포가 동일한 단계를 거치므로 환경 간 불일치를 줄일 수 있습니다.
3. 신뢰성: 자동화된 테스트를 통해 배포 전 버그를 잡아낼 수 있습니다.
4. 빠른 피드백: 변경사항을 즉시 프로덕션에 반영하여 빠른 이터레이션이 가능합니다.

## GitHub Pages와 Actions 소개

### GitHub Pages

GitHub Pages는 GitHub 저장소에서 직접 정적 웹사이트를 호스팅할 수 있는 서비스입니다. HTML, CSS, JavaScript 파일을 저장소에 푸시하면 자동으로 웹사이트로 제공됩니다.

### GitHub Actions

GitHub Actions는 GitHub에 내장된 CI/CD 도구입니다. 코드 저장소에서 직접 워크플로우를 정의하고 실행할 수 있어, 빌드, 테스트, 배포 등의 작업을 자동화할 수 있습니다.

## 자동 배포 파이프라인 구축하기

이제 GitHub Pages와 Actions를 사용하여 자동 배포 파이프라인을 구축하는 단계를 살펴보겠습니다.

### 1. GitHub 저장소 설정

1. GitHub에 새 저장소를 생성합니다.
2. 로컬에 프로젝트를 클론합니다.

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. 프로젝트 구조 설정

간단한 정적 웹사이트를 위한 기본 구조를 만듭니다.

```
your-repo-name/
│
├── src/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
└── .github/
    └── workflows/
        └── deploy.yml
```

### 3. GitHub Actions 워크플로우 정의

`.github/workflows/deploy.yml` 파일을 생성하고 다음 내용을 추가합니다.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

이 워크플로우는 main 브랜치에 푸시가 발생할 때마다 실행됩니다. Node.js를 설정하고, 의존성을 설치하고, 프로젝트를 빌드한 다음 GitHub Pages에 배포합니다.

### 4. package.json 설정

프로젝트 루트에 `package.json` 파일을 생성하고 다음과 같이 설정합니다.

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "build": "mkdir -p dist && cp -R src/* dist/"
  }
}
```

이 스크립트는 `src` 디렉토리의 내용을 `dist` 디렉토리로 복사합니다.

### 5. GitHub Pages 활성화

1. GitHub 저장소 설정으로 이동합니다.
2. "Pages" 섹션을 찾습니다.
3. "Source" 드롭다운에서 "gh-pages" 브랜치를 선택합니다.

### 6. 변경사항 푸시 및 배포 확인

변경사항을 커밋하고 main 브랜치에 푸시합니다.

```bash
git add .
git commit -m "Set up GitHub Pages with Actions"
git push origin main
```

GitHub 저장소의 "Actions" 탭에서 워크플로우 실행을 확인할 수 있습니다. 성공적으로 완료되면, `https://yourusername.github.io/your-repo-name`에서 배포된 사이트를 볼 수 있습니다.

## 이점 및 주의사항

### 이점
- 코드 변경 시 자동 배포로 시간 절약
- 버전 관리와 배포 프로세스의 통합
- 무료로 사용 가능한 호스팅 및 CI/CD 도구

### 주의사항
- 민감한 정보는 저장소에 직접 포함하지 말고 GitHub Secrets를 사용하세요.
- 큰 파일이나 데이터베이스는 GitHub Pages에 적합하지 않습니다.
- 복잡한 서버 로직이 필요한 경우 다른 호스팅 솔루션을 고려하세요.

## 요약 및 다음 단계

이제 GitHub Pages와 Actions를 사용하여 기본적인 자동 배포 파이프라인을 구축했습니다. 이를 통해 코드 변경사항을 쉽고 빠르게 프로덕션에 반영할 수 있게 되었습니다.

다음 단계로 고려해볼 만한 것들
1. 테스트 자동화 추가
2. 스테이징 환경 구성
3. 성능 모니터링 도구 통합

자동 배포 파이프라인은 개발 워크플로우를 크게 개선할 수 있습니다. 이 기초를 바탕으로 여러분의 프로젝트에 맞는 고급 CI/CD 전략을 구축해 보세요!
