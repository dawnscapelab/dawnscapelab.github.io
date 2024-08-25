---
title: '안드로이드 Jetpack Compose: 컴포저블 함수 이해하기'
slug: understanding-composable-functions-in-android-jetpack-compose
date: "2024-08-24 09:07:00"
category: "android"
tags: ["android", "jetpack compose", "ui development", "kotlin"]
excerpt: 'Jetpack Compose의 핵심인 컴포저블 함수에 대해 알아보고, 안드로이드 UI 개발의 새로운 패러다임을 이해해봅시다.'
---

안드로이드 UI 개발의 혁신적인 변화를 가져온 Jetpack Compose의 핵심 개념인 '컴포저블 함수(Composable Function)'에 대해 알아보겠습니다.

## 들어가며: 누구를 위한 글인가요?

이 글은 안드로이드 개발에 대한 기본적인 이해가 있고, Kotlin 프로그래밍 언어에 익숙한 개발자들을 대상으로 합니다. 하지만 초보자분들도 이해할 수 있도록 최대한 쉽게 설명하려고 노력했습니다.

## Jetpack Compose란?

Jetpack Compose는 안드로이드의 최신 UI 개발 툴킷입니다. 2018년에 구글이 발표하고 2021년에 정식 버전을 출시한 이 프레임워크는 안드로이드 UI 개발 방식을 완전히 새롭게 바꾸었습니다.

주요 특징
1. **선언적 UI**: XML 대신 Kotlin 코드로 UI를 직접 생성합니다.
2. **반응형 프로그래밍**: 데이터 변경에 따라 UI가 자동으로 업데이트됩니다.
3. **컴포넌트 기반**: 재사용 가능한 UI 요소를 쉽게 만들 수 있습니다.
4. **Kotlin 기반**: Kotlin의 강력한 기능을 활용하여 간결하고 표현력 있는 UI 코드를 작성할 수 있습니다.
5. **미리보기 지원**: Android Studio에서 실시간으로 UI를 미리 볼 수 있습니다.

Jetpack Compose는 기존의 View 시스템을 완전히 대체하는 것을 목표로 하며, 더 효율적이고 직관적인 UI 개발 경험을 제공합니다.

## 컴포저블 함수란?

컴포저블 함수는 Jetpack Compose의 기본 구성 요소입니다. 이 함수들은 UI 요소를 생성하고 설명하는 역할을 합니다. `@Composable` 어노테이션으로 표시되며, 화면에 표시될 내용을 Kotlin 코드로 직접 정의합니다.

## 컴포저블 함수의 특징

1. **선언적**: UI가 어떻게 보여야 하는지를 직접 코드로 작성합니다.
2. **재사용 가능**: 작은 UI 컴포넌트를 만들어 조합할 수 있습니다.
3. **반응형**: 데이터 변경에 자동으로 반응하여 UI를 업데이트합니다.

## 간단한 컴포저블 함수 예제

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
```

이 간단한 예제에서 `Greeting`은 컴포저블 함수입니다. 이 함수는 문자열 파라미터를 받아 화면에 텍스트를 표시합니다.

## 컴포저블 함수 사용하기

컴포저블 함수는 다른 컴포저블 함수 내에서 호출될 수 있습니다.

```kotlin
@Composable
fun WelcomeScreen() {
    Column {
        Greeting("Android Developer")
        Button(onClick = { /* 버튼 클릭 시 동작 */ }) {
            Text("Click me!")
        }
    }
}
```

여기서 `WelcomeScreen`은 `Greeting`과 `Button`을 포함하는 더 큰 UI 구조를 생성합니다.

## 컴포저블 함수의 이점

1. **코드 간소화**: XML 레이아웃 파일과 Java/Kotlin 코드를 오가며 작업할 필요가 없습니다.
2. **유지보수 용이성**: UI 로직과 비즈니스 로직을 더 쉽게 분리할 수 있습니다.
3. **성능 최적화**: Compose는 필요한 UI 요소만 다시 그리도록 최적화되어 있습니다.

## 주의할 점

1. **상태 관리**: 컴포저블 함수는 상태를 직접 변경하지 않습니다. 대신 상태 호이스팅을 사용해야 합니다.
2. **부수 효과 관리**: 컴포저블 함수 내에서 직접적인 부수 효과를 피해야 합니다.

### 상태 호이스팅 (State Hoisting)

상태 호이스팅은 상태를 컴포저블 함수의 호출자로 "끌어올리는" 패턴입니다. 이를 통해 상태 관리를 더 예측 가능하고 재사용 가능하게 만듭니다.

예시
```kotlin
@Composable
fun Counter(count: Int, onIncrement: () -> Unit) {
    Button(onClick = onIncrement) {
        Text("Count: $count")
    }
}

@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }
    Counter(count = count, onIncrement = { count++ })
}
```

여기서 `count` 상태와 그를 변경하는 로직은 `CounterScreen`에 있고, `Counter` 컴포저블은 단순히 이 상태를 표시만 합니다.

### 부수 효과 관리

부수 효과란 함수의 주요 목적(UI 렌더링) 외에 발생하는 모든 동작을 말합니다. 예를 들어 네트워크 요청, 데이터베이스 조작, 로깅 등이 있습니다.

컴포저블 함수에서는 이러한 부수 효과를 직접 수행하는 것을 피해야 합니다. 대신 Compose는 부수 효과를 관리하기 위한 특별한 API를 제공합니다.

예시
```kotlin
@Composable
fun MyScreen() {
    var data by remember { mutableStateOf("") }
    
    LaunchedEffect(Unit) {
        data = fetchDataFromNetwork() // 부수 효과를 LaunchedEffect 내에서 관리
    }
    
    Text(data)
}
```

이 예시에서 네트워크 요청은 `LaunchedEffect` 내에서 수행됩니다. 이렇게 하면 컴포지션 사이클과 부수 효과를 명확히 분리할 수 있습니다.

## 결론

Jetpack Compose와 컴포저블 함수는 안드로이드 UI 개발의 새로운 패러다임을 제시합니다. 이를 통해 개발자는 더 직관적이고 효율적으로 UI를 구성할 수 있게 되었습니다. 상태 관리와 부수 효과 처리에 주의를 기울이면, 더욱 강력하고 유지보수가 쉬운 앱을 개발할 수 있습니다.

## 다음 단계

- Jetpack Compose의 기본 레이아웃 요소들(Row, Column, Box 등)에 대해 학습해보세요.
- 상태 관리와 ViewModel과의 통합에 대해 더 깊이 알아보세요.
- 애니메이션과 테마 적용 방법을 탐구해보세요.

Jetpack Compose로 안드로이드 앱 개발의 새로운 세계를 경험해보세요!
