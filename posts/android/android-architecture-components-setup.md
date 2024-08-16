---
title: '안드로이드 아키텍처 컴포넌트 설정: ViewModel, LiveData, Room, 그리고 Retrofit'
slug: android-architecture-components-setup
date: '2024-08-16'
category: "android"
tags: ["android", "architecture", "viewmodel", "livedata", "room", "retrofit"]
excerpt: '안드로이드 개발의 핵심 아키텍처 컴포넌트인 ViewModel, LiveData, Room, 그리고 Retrofit의 설정 및 사용법을 알아봅니다.'
---

안드로이드 앱 개발에서 핵심적인 역할을 하는 아키텍처 컴포넌트들에 대해 알아보겠습니다. ViewModel, LiveData, Room, 그리고 Retrofit을 어떻게 설정하고 사용하는지 단계별로 살펴보겠습니다.

## 읽기 전 알아두면 좋은 점

이 글은 안드로이드 개발 경험이 있는 초급에서 중급 수준의 개발자를 대상으로 합니다. Kotlin 언어에 대한 기본적인 이해와 안드로이드 스튜디오 사용 경험이 있으면 좋습니다. 완전 초보자라면 먼저 Kotlin과 안드로이드 기초에 대해 학습하시는 것을 추천드립니다.

## 주제의 중요성과 배경

현대 안드로이드 앱 개발에서 아키텍처 컴포넌트의 사용은 선택이 아닌 필수가 되었습니다. 이 컴포넌트들은 앱의 구조를 개선하고, 유지보수성을 높이며, 테스트를 용이하게 만듭니다. Google이 공식적으로 권장하는 이 아키텍처 패턴을 사용함으로써, 우리는 더 견고하고 확장 가능한 앱을 만들 수 있습니다.

## 핵심 개념

1. **ViewModel**: UI 관련 데이터를 저장하고 관리합니다. 화면 회전과 같은 구성 변경에도 데이터를 유지합니다.
2. **LiveData**: 관찰 가능한 데이터 홀더 클래스로, 생명주기를 인식합니다.
3. **Room**: SQLite 데이터베이스를 쉽게 사용할 수 있게 해주는 ORM(Object-Relational Mapping) 라이브러리입니다.
4. **Retrofit**: 타입-안전한 HTTP 클라이언트로, API 호출을 쉽게 만들어줍니다.

## 설정 방법

### 1. 의존성 추가

먼저 `build.gradle` (app 수준) 파일에 다음 의존성들을 추가합니다.

```gradle
dependencies {
    def lifecycle_version = "2.6.1"
    def room_version = "2.5.2"
    def retrofit_version = "2.9.0"

    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"
    // LiveData
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle_version"
    // Room
    implementation "androidx.room:room-runtime:$room_version"
    kapt "androidx.room:room-compiler:$room_version"
    implementation "androidx.room:room-ktx:$room_version"
    // Retrofit
    implementation "com.squareup.retrofit2:retrofit:$retrofit_version"
    implementation "com.squareup.retrofit2:converter-gson:$retrofit_version"
}
```

### 2. ViewModel 설정

```kotlin
class MainViewModel : ViewModel() {
    private val _data = MutableLiveData<String>()
    val data: LiveData<String> = _data

    fun setData(newData: String) {
        _data.value = newData
    }
}
```

### 3. LiveData 사용

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewModel = ViewModelProvider(this).get(MainViewModel::class.java)

        viewModel.data.observe(this, Observer { newData ->
            // UI 업데이트
        })
    }
}
```

### 4. Room 데이터베이스 설정

```kotlin
@Entity
data class User(
    @PrimaryKey val id: Int,
    @ColumnInfo(name = "name") val name: String
)

@Dao
interface UserDao {
    @Query("SELECT * FROM user")
    fun getAll(): List<User>

    @Insert
    fun insert(user: User)
}

@Database(entities = [User::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao

    companion object {
        private var instance: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return instance ?: synchronized(this) {
                instance ?: buildDatabase(context).also { instance = it }
            }
        }

        private fun buildDatabase(context: Context) =
            Room.databaseBuilder(context, AppDatabase::class.java, "app-database").build()
    }
}
```

### 5. Retrofit 설정

```kotlin
interface ApiService {
    @GET("users")
    suspend fun getUsers(): List<User>
}

object RetrofitClient {
    private const val BASE_URL = "https://api.example.com/"

    val instance: ApiService by lazy {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        retrofit.create(ApiService::class.java)
    }
}
```

## 이점과 주의점

### 이점
1. **코드 구조화**: 각 컴포넌트의 역할이 명확하게 분리되어 코드 관리가 용이합니다.
2. **생명주기 관리**: LiveData와 ViewModel이 안드로이드 생명주기를 자동으로 처리해줍니다.
3. **데이터 일관성**: Room을 통해 로컬 데이터베이스 관리가 간편해집니다.
4. **네트워크 통신 간소화**: Retrofit으로 API 호출이 간단해집니다.

### 주의점
1. **학습 곡선**: 처음에는 개념 이해와 설정에 시간이 걸릴 수 있습니다.
2. **과도한 보일러플레이트**: 작은 프로젝트의 경우 오버엔지니어링이 될 수 있습니다.
3. **버전 호환성**: 라이브러리 버전 간 호환성에 주의해야 합니다.

## 요약 및 다음 단계

안드로이드 아키텍처 컴포넌트는 앱 개발을 더욱 체계적이고 효율적으로 만들어줍니다. ViewModel과 LiveData로 UI 관련 데이터를 관리하고, Room으로 로컬 데이터베이스를 다루며, Retrofit으로 네트워크 통신을 처리할 수 있습니다.

다음 단계로는 이러한 컴포넌트들을 실제 프로젝트에 적용해보는 것을 추천합니다. 또한, Dependency Injection(예: Hilt)이나 Coroutines와 같은 고급 기술을 학습하여 아키텍처를 더욱 견고하게 만들어보세요.

안드로이드 아키텍처 컴포넌트의 세계에 오신 것을 환영합니다. 이제 여러분은 더 나은 안드로이드 앱을 만들 준비가 되었습니다!
