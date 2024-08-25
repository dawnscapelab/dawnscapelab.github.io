---
title: '안드로이드 ViewModel 개념 이해하기'
slug: understanding-android-viewmodel-concept
date: "2024-08-24 10:53:00"
category: "android"
tags: ["android", "viewmodel", "architecture components", "kotlin"]
excerpt: '안드로이드 앱 개발에서 ViewModel의 개념과 중요성, 그리고 기본적인 사용법을 알아봅니다.'
---

안드로이드 개발에서 중요한 개념 중 하나인 ViewModel에 대해 알아보겠습니다. 이 글은 안드로이드 개발을 막 시작한 초보자부터 중급 개발자까지를 대상으로 합니다. 기본적인 Kotlin 문법과 안드로이드 앱 구조에 대한 이해가 있다면 더 쉽게 따라올 수 있을 것입니다.

## ViewModel이란 무엇인가?

ViewModel은 안드로이드 아키텍처 컴포넌트의 일부로 UI 관련 데이터를 저장하고 관리하기 위한 클래스입니다. 주요 목적은 화면 회전과 같은 구성 변경에도 데이터를 유지하고, UI 컨트롤러(Activity나 Fragment)의 생명주기와 독립적으로 데이터를 관리하는 것입니다.

## ViewModel의 중요성과 배경

안드로이드 앱 개발에서 화면 회전이나 다크 모드 전환 같은 구성 변경은 흔한 일입니다. 이런 변경이 일어날 때마다 Activity나 Fragment가 재생성되면서 메모리에 있던 데이터가 모두 사라집니다. 이는 사용자 경험을 해치고 불필요한 네트워크 요청을 유발할 수 있습니다.

ViewModel은 이러한 문제를 해결하기 위해 도입되었습니다. ViewModel은 구성 변경과 무관하게 데이터를 보존하며, UI 로직과 비즈니스 로직을 분리하여 코드의 구조와 테스트 용이성을 개선합니다.

## ViewModel의 핵심 개념

1. **생명주기 인식**: ViewModel은 자신이 연결된 UI 컨트롤러(Activity/Fragment)의 생명주기를 인식합니다.
2. **데이터 유지**: 구성 변경 시에도 데이터를 유지합니다.
3. **UI와 로직의 분리**: UI 관련 데이터 처리를 ViewModel에서 담당하여 관심사를 분리합니다.
4. **공유 가능**: 여러 Fragment 간에 데이터를 쉽게 공유할 수 있습니다.

## ViewModel 사용하기

### 1. 의존성 추가

먼저 `build.gradle` 파일에 ViewModel 의존성을 추가합니다.

```kotlin
dependencies {
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2")
}
```

### 2. ViewModel 클래스 생성

간단한 ViewModel 클래스를 만들어 보겠습니다.

```kotlin
import androidx.lifecycle.ViewModel

class MainViewModel : ViewModel() {
    private var count = 0

    fun incrementCount() {
        count++
    }

    fun getCount() = count
}
```

### 3. Activity에서 ViewModel 사용

Activity에서 ViewModel을 사용하는 방법입니다.

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider

class MainActivity : AppCompatActivity() {
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewModel = ViewModelProvider(this).get(MainViewModel::class.java)

        // ViewModel 사용 예
        viewModel.incrementCount()
        val currentCount = viewModel.getCount()
    }
}
```

## ViewModel 사용의 이점

1. **구성 변경 대응**: 화면 회전 시에도 데이터가 유지됩니다.
2. **메모리 누수 방지**: ViewModel은 자동으로 생명주기를 관리하여 메모리 누수를 방지합니다.
3. **테스트 용이성**: UI와 비즈니스 로직이 분리되어 단위 테스트가 쉬워집니다.
4. **코드 구조화**: 관심사 분리를 통해 코드를 더 깔끔하게 구조화할 수 있습니다.

## 주의할 점

- ViewModel에서 Context나 View에 대한 참조를 직접 유지하지 마세요. 메모리 누수의 원인이 될 수 있습니다.
- ViewModel은 데이터를 일시적으로 저장하는 용도입니다. 영구 데이터 저장에는 Room 데이터베이스나 DataStore를 사용하세요.

## 요약 및 다음 단계

ViewModel은 안드로이드 앱의 데이터 관리와 UI 로직 분리에 큰 도움을 주는 컴포넌트입니다. 구성 변경에 강건한 앱을 만들고 코드의 구조를 개선하는 데 중요한 역할을 합니다.

다음 단계로는 다음과 같은 주제를 학습해 보시는 것을 추천합니다.
- LiveData와 ViewModel 함께 사용하기
- Coroutines와 ViewModel 통합
- DataBinding과 ViewModel 연동

ViewModel은 안드로이드 앱 개발에서 필수적인 요소이므로, 실제 프로젝트에 적용해 보면서 그 장점을 직접 경험해 보시기 바랍니다.
