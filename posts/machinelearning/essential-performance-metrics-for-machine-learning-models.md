---
title: '머신러닝 모델 평가를 위한 핵심 성능 지표'
slug: essential-performance-metrics-for-machine-learning-models
date: "2024-09-12 10:51:00"
category: "machinelearning"
tags: ["machine learning", "evaluation metrics", "model performance", "data science"]
excerpt: '머신러닝 모델의 성능을 정확히 평가하기 위한 주요 지표들을 알아봅니다. 분류, 회귀, 랭킹 문제에 적용되는 다양한 평가 지표의 개념과 계산 방법을 이해해 봅시다.'
---

머신러닝(Machine Learning, ML) 모델을 개발하고 배포하는 과정에서 가장 중요한 단계 중 하나는 모델의 성능을 정확하게 평가하는 것입니다. 적절한 평가 지표를 선택하고 이해하는 것은 모델의 실제 성능을 파악하고, 개선할 점을 찾아내는 데 필수적입니다. 이 글에서는 ML 실무에서 자주 사용되는 주요 성능 평가 지표들을 살펴보겠습니다.

## 이 글을 읽기 위해 필요한 사전 지식
- 기본적인 통계 개념 (평균, 분산 등)
- 머신러닝의 기초 개념 (지도 학습, 비지도 학습의 차이 등)
- Python 프로그래밍 언어의 기본 문법

## 주요 평가 지표

### 1. 분류(Classification) 문제의 평가 지표

#### 1.1 정확도(Accuracy)
정확도는 가장 직관적이고 간단한 평가 지표입니다. 전체 예측 중 올바르게 분류된 비율을 나타냅니다.

```python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_true, y_pred)
```

정확도는 이해하기 쉽지만, 클래스 불균형 문제가 있을 때 misleading할 수 있습니다.

#### 1.2 정밀도(Precision)와 재현율(Recall)
정밀도는 모델이 Positive로 예측한 것 중 실제 Positive의 비율이고, 재현율은 실제 Positive 중 모델이 Positive로 예측한 비율입니다.

```python
from sklearn.metrics import precision_score, recall_score

precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
```

#### 1.3 F1 Score
F1 Score는 정밀도와 재현율의 조화평균으로, 두 지표 간의 균형을 나타냅니다.

```python
from sklearn.metrics import f1_score

f1 = f1_score(y_true, y_pred)
```

#### 1.4 ROC AUC
Receiver Operating Characteristic (ROC) 곡선 아래 면적(Area Under Curve, AUC)을 나타냅니다. 이진 분류기의 성능을 종합적으로 평가하는 데 유용합니다.

```python
from sklearn.metrics import roc_auc_score

roc_auc = roc_auc_score(y_true, y_pred_proba)
```

### 2. 회귀(Regression) 문제의 평가 지표

#### 2.1 평균 제곱 오차(Mean Squared Error, MSE)
예측값과 실제값 차이의 제곱 평균입니다. 오차를 제곱하므로 큰 오차에 더 민감합니다.

```python
from sklearn.metrics import mean_squared_error

mse = mean_squared_error(y_true, y_pred)
```

#### 2.2 평균 절대 오차(Mean Absolute Error, MAE)
예측값과 실제값 차이의 절대값 평균입니다. MSE에 비해 이상치의 영향을 덜 받습니다.

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_true, y_pred)
```

#### 2.3 결정 계수(R-squared)
모델이 설명하는 분산의 비율을 나타냅니다. 1에 가까울수록 좋은 모델입니다.

```python
from sklearn.metrics import r2_score

r2 = r2_score(y_true, y_pred)
```

### 3. 랭킹(Ranking) 문제의 평가 지표

#### 3.1 평균 정밀도(Mean Average Precision, MAP)
각 쿼리에 대한 평균 정밀도의 평균값입니다. 검색 및 추천 시스템에서 자주 사용됩니다.

```python
from sklearn.metrics import average_precision_score

ap = average_precision_score(y_true, y_score)
```

#### 3.2 정규화된 할인 누적 이득(Normalized Discounted Cumulative Gain, NDCG)
랭킹의 품질을 측정하는 지표로, 상위 랭크의 아이템에 더 높은 가중치를 부여합니다.

```python
from sklearn.metrics import ndcg_score

ndcg = ndcg_score(y_true, y_score)
```

## 주의할 점

- 데이터셋의 특성과 문제의 맥락을 고려하여 적절한 평가 지표를 선택해야 합니다.
- 단일 지표에만 의존하지 말고, 여러 지표를 종합적으로 고려하세요.
- 교차 검증(Cross-validation)을 통해 모델의 일반화 성능을 평가하는 것이 중요합니다.
- 클래스 불균형 문제가 있는 경우, 정확도보다는 F1 Score나 ROC AUC를 사용하는 것이 좋습니다.

## 결론

머신러닝 모델의 성능을 정확히 평가하는 것은 모델 개발 과정에서 매우 중요합니다. 이 글에서 소개한 다양한 평가 지표들을 이해하고 적절히 활용한다면, 더 나은 모델을 개발하고 실제 문제에 효과적으로 적용할 수 있을 것입니다.

## 다음 단계
- 각 평가 지표의 수학적 정의와 계산 방법에 대해 더 깊이 있게 학습해보세요.
- 실제 데이터셋으로 다양한 모델을 훈련시키고, 여러 평가 지표를 적용해보며 그 차이를 분석해보세요.
- 비지도 학습 모델의 평가 방법에 대해서도 알아보세요.

