---
title: 'Java에서 큐(Queue) 구현하기: 언제 필요하고 어떻게 구현할까?'
slug: implementing-queue-in-java
date: "2024-09-08 21:16:00"
category: "java"
tags: ["java", "data structures", "queue", "algorithms"]
excerpt: 'Java에서 큐(Queue)를 언제 사용해야 하는지, 그리고 효과적으로 구현하는 방법에 대해 알아봅니다.'
---

Java 개발을 하다 보면 데이터를 특정한 순서로 처리해야 할 때가 있습니다. 이럴 때 가장 유용한 자료구조 중 하나가 바로 큐(Queue)입니다. 이 글에서는 Java에서 큐가 필요한 상황과 구현 방법에 대해 알아보겠습니다.

## 이 글을 읽기 위해 필요한 사전 지식
- Java 기본 문법에 대한 이해
- 객체 지향 프로그래밍의 기본 개념
- 자료구조에 대한 기초적인 이해

## 큐(Queue)란 무엇인가?

큐는 "선입선출"(FIFO: First-In-First-Out) 원칙을 따르는 자료구조입니다. 쉽게 말해, 먼저 들어온 데이터가 먼저 나가는 구조입니다. 실생활에서 줄을 서는 것과 비슷하다고 생각하면 됩니다.

## 언제 큐를 사용해야 할까?

1. **작업 스케줄링**: 프린터 대기열이나 CPU 작업 스케줄링에서 사용됩니다.
2. **너비 우선 탐색(BFS)**: 그래프나 트리 구조에서 BFS 알고리즘을 구현할 때 필요합니다.
3. **버퍼링**: 데이터 스트림을 처리할 때 임시 저장소로 사용됩니다.
4. **비동기 데이터 전송**: 여러 스레드 간 안전한 데이터 전달에 사용됩니다.

## Java에서 큐 구현하기

Java에서 큐를 구현하는 방법은 크게 두 가지가 있습니다.

1. `java.util.Queue` 인터페이스 사용
2. 직접 구현하기

### 1. java.util.Queue 인터페이스 사용

Java에서 제공하는 `Queue` 인터페이스를 사용하는 것이 가장 간단하고 효율적인 방법입니다.

```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        
        // 요소 추가
        queue.offer("첫 번째");
        queue.offer("두 번째");
        queue.offer("세 번째");
        
        // 요소 제거 및 출력
        while (!queue.isEmpty()) {
            System.out.println(queue.poll());
        }
    }
}
```

이 방법의 장점은 이미 최적화된 구현을 사용할 수 있다는 것입니다.

### 2. 직접 구현하기

때로는 특별한 요구사항이 있거나 학습 목적으로 큐를 직접 구현해야 할 수도 있습니다.

```java
public class CustomQueue<T> {
    private Node<T> front;
    private Node<T> rear;
    
    private static class Node<T> {
        T data;
        Node<T> next;
        
        Node(T data) {
            this.data = data;
        }
    }
    
    public void enqueue(T item) {
        Node<T> newNode = new Node<>(item);
        if (rear == null) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
    }
    
    public T dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        T item = front.data;
        front = front.next;
        if (front == null) {
            rear = null;
        }
        return item;
    }
    
    public boolean isEmpty() {
        return front == null;
    }
}
```

## 큐 사용의 이점과 주의점

### 이점
- 데이터의 순서를 보장합니다.
- 멀티스레딩 환경에서 안전하게 데이터를 전달할 수 있습니다.
- 메모리를 효율적으로 사용할 수 있습니다.

### 주의점
- 큐의 크기가 제한되어 있다면 오버플로우에 주의해야 합니다.
- 잘못 구현하면 메모리 누수가 발생할 수 있습니다.
- 큐의 모든 요소를 순회해야 할 때는 비효율적일 수 있습니다.

## 요약

큐는 데이터를 순서대로 처리해야 할 때 매우 유용한 자료구조입니다. Java에서는 `Queue` 인터페이스를 사용하거나 직접 구현하여 사용할 수 있습니다. 적절한 상황에서 큐를 사용하면 코드의 가독성과 효율성을 크게 향상시킬 수 있습니다.

## 다음 단계
- 우선순위 큐(Priority Queue)에 대해 학습해보세요.
- 큐를 사용한 실제 알고리즘 문제를 풀어보세요.
- 멀티스레딩 환경에서의 큐 사용에 대해 더 깊이 알아보세요.
