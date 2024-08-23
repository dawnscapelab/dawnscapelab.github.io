---
title: 'ROOM 데이터베이스 기본 개념'
slug: room-database-basics
date: "2024-08-17 23:44:00"
category: "android"
tags: ["android", "room", "database", "kotlin"]
excerpt: '이 포스트에서는 Android의 ROOM 데이터베이스에 대한 기본 개념과 설정 방법을 설명합니다.'
---

Android 애플리케이션에서 ROOM 데이터베이스의 기본 개념에 대해 알아보겠습니다. ROOM은 SQLite를 더 쉽게 사용할 수 있도록 돕는 라이브러리입니다. 초보자도 이해할 수 있도록 간단하게 설명드릴게요.

## ROOM 데이터베이스란?

ROOM은 Android의 데이터베이스 라이브러리로, SQLite를 보다 쉽게 사용할 수 있도록 돕는 추상화 계층입니다. 데이터베이스 작업을 더 안전하고 간편하게 처리할 수 있도록 도와줍니다. ROOM은 다음과 같은 주요 구성 요소로 이루어져 있습니다.

1. **Entity**: 데이터베이스의 테이블을 정의하는 클래스입니다. 각 Entity는 데이터베이스의 테이블과 매핑됩니다.
2. **DAO (Data Access Object)**: 데이터베이스에 접근하는 메서드를 정의하는 인터페이스입니다. CRUD (Create, Read, Update, Delete) 작업을 수행합니다.
3. **Database**: ROOM 데이터베이스의 주 클래스입니다. Entity와 DAO를 연결하고, 데이터베이스 인스턴스를 관리합니다.

## ROOM 데이터베이스의 핵심 구성 요소

### 1. Entity

Entity는 데이터베이스 테이블을 나타내는 클래스입니다. 각 Entity는 `@Entity` 어노테이션을 사용하여 정의합니다.

```kotlin
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "users")
data class User(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val name: String,
    val age: Int
)
```

위의 코드에서 `User` 클래스는 `users` 테이블을 정의합니다. `@PrimaryKey` 어노테이션은 기본 키를 설정합니다.

### 2. DAO (Data Access Object)

DAO는 데이터베이스에 접근하는 메서드를 정의합니다. `@Dao` 어노테이션을 사용하여 DAO 인터페이스를 정의합니다.

```kotlin
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface UserDao {
    @Insert
    suspend fun insert(user: User)

    @Query("SELECT * FROM users")
    suspend fun getAllUsers(): List<User>

    @Query("DELETE FROM users WHERE id = :userId")
    suspend fun deleteUserById(userId: Int)
}
```

여기서 `UserDao` 인터페이스는 `User` 객체를 삽입하고, 모든 사용자를 조회하며, 특정 사용자를 삭제하는 메서드를 정의합니다.

### 3. Database

Database 클래스는 `@Database` 어노테이션을 사용하여 정의합니다. Entity와 DAO를 연결하며 데이터베이스 인스턴스를 관리합니다.

```kotlin
import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [User::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "app_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
```

이 클래스는 `User` Entity와 `UserDao`를 연결하며, 싱글턴 패턴을 사용하여 데이터베이스 인스턴스를 관리합니다.

## ROOM 데이터베이스 사용 시 이점

1. **타입 안전성**: SQL 쿼리에서 컴파일 타임에 오류를 발견할 수 있습니다.
2. **간편한 데이터베이스 작업**: DAO를 통해 간편하게 데이터베이스 작업을 수행할 수 있습니다.
3. **비동기 작업 지원**: Coroutines와 LiveData를 사용하여 비동기 작업을 쉽게 처리할 수 있습니다.

## 주의사항

1. **스키마 버전 관리**: 데이터베이스 버전을 관리하여 데이터베이스 스키마를 변경할 때 적절한 마이그레이션을 수행해야 합니다.
2. **성능 고려**: 복잡한 쿼리나 대량의 데이터 처리 시 성능에 유의해야 합니다.

## 요약 및 다음 단계 제안

이 포스트에서는 ROOM 데이터베이스의 기본 개념과 구성 요소를 살펴보았습니다. ROOM은 SQLite를 더 쉽게 사용할 수 있도록 도와주며, 타입 안전성 및 간편한 데이터베이스 작업을 제공합니다.

다음 단계로는 ROOM 데이터베이스를 실제 프로젝트에 적용해 보세요. 다양한 쿼리 및 데이터베이스 마이그레이션 작업을 경험해 보는 것도 좋습니다.

Happy coding!
