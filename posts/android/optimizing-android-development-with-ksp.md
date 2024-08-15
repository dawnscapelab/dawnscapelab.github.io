---
title: 'Android 개발 최적화: KSP(Kotlin Symbol Processing) 도입하기'
slug: optimizing-android-development-with-ksp
date: '2024-08-16'
category: "android"
tags: ["android", "kotlin", "ksp", "optimization"]
excerpt: 'KSP(Kotlin Symbol Processing)를 안드로이드 프로젝트에 도입하여 빌드 성능을 향상시키는 방법을 알아봅니다.'
---

프로젝트의 빌드 성능을 크게 향상시킬 수 있는 KSP(Kotlin Symbol Processing)에 대해 알아보고, 이를 프로젝트에 도입하는 방법을 상세히 살펴보겠습니다.

## 필요한 사전 지식

이 글을 읽기 전에 다음과 같은 기본적인 지식이 있으면 좋습니다.
- Kotlin 프로그래밍 언어 기초
- Android 개발 경험 (1년 이상 권장)
- Gradle 빌드 시스템에 대한 기본적인 이해

## 1. 소개: KSP의 중요성과 배경

안드로이드 개발에서 빌드 속도는 개발자의 생산성에 직접적인 영향을 미치는 중요한 요소입니다. 특히 프로젝트의 규모가 커질수록 빌드 시간은 기하급수적으로 증가하곤 합니다. 이러한 문제를 해결하기 위해 Google은 Kotlin Symbol Processing(KSP)을 도입했습니다.

KSP는 기존의 kapt(Kotlin Annotation Processing Tool)를 대체하기 위해 설계된 새로운 주석 처리 도구입니다. kapt가 Java 컴파일러를 기반으로 하여 Kotlin 코드를 처리하는 데 비해, KSP는 Kotlin 컴파일러를 직접 활용하여 훨씬 더 빠른 처리 속도를 제공합니다.

## 2. 개념 설명: KSP vs kapt

### KSP (Kotlin Symbol Processing)
- Kotlin 컴파일러를 직접 사용
- Kotlin 언어에 최적화된 API 제공
- 증분 컴파일 지원으로 빠른 재빌드

### kapt (Kotlin Annotation Processing Tool)
- Java 컴파일러를 기반으로 동작
- Kotlin 코드를 Java로 변환 후 처리
- 전체 소스 코드 재컴파일 필요

KSP는 kapt에 비해 다음과 같은 장점을 제공합니다:
1. 빠른 처리 속도 (kapt 대비 최대 2배 이상 빠름)
2. Kotlin 언어 특성에 맞는 API 제공
3. 증분 컴파일을 통한 효율적인 재빌드

## 3. 실제 구현: KSP 설정 방법

이제 실제로 안드로이드 프로젝트에 KSP를 도입하는 방법을 살펴보겠습니다.

### 3.1 프로젝트 수준의 build.gradle 수정

```kotlin
buildscript {
    dependencies {
        classpath("com.google.devtools.ksp:com.google.devtools.ksp.gradle.plugin:1.9.0-1.0.13")
    }
}
```

### 3.2 앱 모듈의 build.gradle.kts 수정

```kotlin
plugins {
    id("com.android.application")
    id("kotlin-android")
    id("com.google.devtools.ksp") version "1.9.0-1.0.13"
}

dependencies {
    // Room 라이브러리를 예로 들면
    implementation("androidx.room:room-runtime:2.5.2")
    implementation("androidx.room:room-ktx:2.5.2")
    ksp("androidx.room:room-compiler:2.5.2")  // kapt 대신 ksp 사용
}
```

### 3.3 KSP 사용 예시 (Room 데이터베이스)

```kotlin
@Entity
data class User(
    @PrimaryKey val id: Int,
    @ColumnInfo(name = "name") val name: String,
    @ColumnInfo(name = "email") val email: String
)

@Dao
interface UserDao {
    @Query("SELECT * FROM user")
    fun getAll(): List<User>

    @Insert
    fun insertAll(vararg users: User)
}

@Database(entities = [User::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

이 코드에서 KSP는 Room 어노테이션을 처리하여 필요한 코드를 생성합니다. kapt를 사용할 때와 동일한 방식으로 코드를 작성할 수 있지만, 처리 속도가 훨씬 빠릅니다.

## 4. 장점과 주의점

### 장점
1. 빌드 속도 향상: 프로젝트 규모가 클수록 그 효과가 더욱 두드러집니다.
2. Kotlin 친화적: Kotlin의 특성을 더 잘 활용할 수 있는 API를 제공합니다.
3. 메모리 사용량 감소: Java 컴파일러를 거치지 않아 메모리 사용이 효율적입니다.

### 주의점
1. 라이브러리 호환성: 모든 라이브러리가 KSP를 지원하는 것은 아닙니다. 사용 전 확인이 필요합니다.
2. 학습 곡선: kapt와는 다른 API를 사용하므로 초기에는 적응 시간이 필요할 수 있습니다.
3. 버전 관리: Kotlin 컴파일러 버전과 KSP 버전을 일치시켜야 합니다.

## 5. 결론

KSP는 안드로이드 개발에서 빌드 성능을 크게 향상시킬 수 있는 강력한 도구입니다. 특히 대규모 프로젝트에서 그 효과가 두드러지며, Kotlin의 특성을 더 잘 활용할 수 있게 해줍니다.

다음 단계로는 다음과 같은 작업을 추천합니다.
1. 기존 프로젝트에 KSP 도입 시도
2. KSP를 지원하는 다른 라이브러리 탐색 (예: Dagger, Moshi 등)
3. KSP API를 활용한 커스텀 코드 생성기 개발 고려

KSP를 도입함으로써 개발 생산성을 높이고, 더 나은 안드로이드 앱을 만들어 나가시기 바랍니다!
