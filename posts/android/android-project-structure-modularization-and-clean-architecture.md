---
title: '안드로이드 프로젝트 구조화: 모듈화와 클린 아키텍처 적용'
slug: android-project-structure-modularization-and-clean-architecture
date: '2024-08-16'
category: "android"
tags: ["android", "architecture", "clean-architecture", "modularization"]
excerpt: '안드로이드 프로젝트를 효율적으로 구조화하는 방법을 알아봅니다. 모듈화와 클린 아키텍처를 적용하여 확장 가능하고 유지보수가 쉬운 앱을 만드는 과정을 단계별로 설명합니다.'
---

안드로이드 개발자라면 프로젝트가 커질수록 코드 관리와 유지보수가 어려워지는 경험을 해보셨을 것입니다. 이번 포스트에서는 이러한 문제를 해결하기 위한 프로젝트 구조화 방법을 알아보겠습니다. 특히 모듈화와 클린 아키텍처 적용에 중점을 두어 설명하겠습니다.

## 필요한 사전 지식

이 글을 읽기 위해서는 다음과 같은 지식이 필요합니다.
- 안드로이드 개발 기초 (Java 또는 Kotlin)
- Gradle 빌드 시스템에 대한 기본적인 이해
- MVVM 패턴에 대한 기본 지식

## 주제의 중요성과 배경

대규모 안드로이드 프로젝트를 개발하고 유지보수하는 것은 쉽지 않은 일입니다. 코드베이스가 커질수록 다음과 같은 문제가 발생할 수 있습니다.

1. 코드 중복
2. 긴 빌드 시간
3. 기능 간 의존성 관리의 어려움
4. 테스트의 복잡성 증가

이러한 문제를 해결하기 위해 모듈화와 클린 아키텍처를 적용할 수 있습니다. 이를 통해 코드의 재사용성을 높이고, 유지보수를 쉽게 만들며, 팀 협업을 원활하게 할 수 있습니다.

## 핵심 개념

### 모듈화 (Modularization)

모듈화는 애플리케이션을 여러 개의 독립적인 모듈로 나누는 것을 의미합니다. 각 모듈은 특정 기능이나 레이어를 담당하며, 다른 모듈과의 의존성을 최소화합니다.

### 클린 아키텍처 (Clean Architecture)

클린 아키텍처는 로버트 C. 마틴이 제안한 소프트웨어 디자인 철학으로, 비즈니스 로직을 외부 요소(UI, 데이터베이스 등)로부터 분리하여 테스트와 유지보수를 용이하게 만듭니다.

## 단계별 설정 방법

### 1. 프로젝트 구조 설계

먼저 프로젝트를 다음과 같은 모듈로 나눕니다.

- `app`: 메인 애플리케이션 모듈
- `core`: 공통 유틸리티와 확장 함수
- `data`: 데이터 소스와 리포지토리 구현
- `domain`: 비즈니스 로직과 유스케이스
- `presentation`: UI 관련 코드 (액티비티, 프래그먼트, 뷰모델)

### 2. 모듈 생성

Android Studio에서 각 모듈을 생성합니다. 예를 들어, `core` 모듈을 생성하는 방법은 다음과 같습니다.

1. File -> New -> New Module 선택
2. Android Library 선택
3. 모듈 이름을 'core'로 설정하고 생성

다른 모듈도 같은 방식으로 생성합니다.

### 3. 의존성 설정

각 모듈의 `build.gradle.kts` 파일에 필요한 의존성을 추가합니다.

```kotlin
// app/build.gradle.kts
dependencies {
    implementation(project(":core"))
    implementation(project(":data"))
    implementation(project(":domain"))
    implementation(project(":presentation"))
}

// data/build.gradle.kts
dependencies {
    implementation(project(":core"))
    implementation(project(":domain"))
}

// domain/build.gradle.kts
dependencies {
    implementation(project(":core"))
}

// presentation/build.gradle.kts
dependencies {
    implementation(project(":core"))
    implementation(project(":domain"))
}
```

### 4. 클린 아키텍처 적용

각 모듈 내부를 클린 아키텍처 원칙에 따라 구성합니다. 예를 들어, `domain` 모듈은 다음과 같이 구성할 수 있습니다.

```
domain
├── model
│   └── User.kt
├── repository
│   └── UserRepository.kt
└── usecase
    └── GetUserUseCase.kt
```

`User.kt`:
```kotlin
data class User(
    val id: String,
    val name: String,
    val email: String
)
```

`UserRepository.kt`:
```kotlin
interface UserRepository {
    suspend fun getUser(id: String): User
}
```

`GetUserUseCase.kt`:
```kotlin
class GetUserUseCase(private val userRepository: UserRepository) {
    suspend operator fun invoke(id: String): User {
        return userRepository.getUser(id)
    }
}
```

### 5. 데이터 레이어 구현

`data` 모듈에서 리포지토리를 구현합니다.

```kotlin
class UserRepositoryImpl(private val api: UserApi) : UserRepository {
    override suspend fun getUser(id: String): User {
        return api.getUser(id).toDomain()
    }
}
```

### 6. 프레젠테이션 레이어 구현

`presentation` 모듈에서 ViewModel을 구현합니다.

```kotlin
class UserViewModel(private val getUserUseCase: GetUserUseCase) : ViewModel() {
    private val _user = MutableLiveData<User>()
    val user: LiveData<User> = _user

    fun loadUser(id: String) {
        viewModelScope.launch {
            _user.value = getUserUseCase(id)
        }
    }
}
```

## 이점과 주의점

### 이점
- 코드의 재사용성 향상
- 빌드 시간 단축 (병렬 빌드 가능)
- 테스트 용이성 증가
- 팀 협업 효율성 향상

### 주의점
- 초기 설정에 시간이 소요됨
- 모듈 간 의존성 관리에 주의 필요
- 과도한 모듈화는 오히려 복잡성을 증가시킬 수 있음

## 요약 및 다음 단계

이 포스트에서는 안드로이드 프로젝트를 모듈화하고 클린 아키텍처를 적용하는 방법을 살펴보았습니다. 이를 통해 더 유지보수가 쉽고 확장 가능한 앱을 개발할 수 있습니다.

다음 단계로는 다음과 같은 주제를 고려해볼 수 있습니다.
- 의존성 주입 (Dependency Injection) 프레임워크 적용 (예: Hilt)
- 멀티 모듈 프로젝트에서의 네비게이션 처리
- CI/CD 파이프라인 구축

모듈화와 클린 아키텍처는 프로젝트의 복잡성을 관리하는 강력한 도구입니다. 하지만 프로젝트의 규모와 요구사항에 맞게 적절히 적용하는 것이 중요합니다. 작은 프로젝트에서는 과도한 모듈화가 오히려 부담이 될 수 있으므로, 팀의 상황과 프로젝트의 특성을 고려하여 적용해보세요.
