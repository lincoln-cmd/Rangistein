# Rangistein 데이터 시각화 V1 설계

## 목표

관리자 페이지에서 직접 표/차트 데이터를 입력하고,
게시물 본문 원하는 위치에 삽입할 수 있는 구조를 만든다.

## V1 지원 범위

- 표(table)
- 막대 차트(bar)
- 선 차트(line)

## 본문 삽입 방식

본문 markdown 안에 아래 형식의 마커를 넣는다.

{{viz:table-1}}
{{viz:chart-1}}

여기서 `table-1`, `chart-1`은 visualizations 배열 안의 `id`와 일치해야 한다.

## visualizations 필드 구조

### 공통

- id
- type
- title
- caption

### table

- headers
- rows

### bar / line

- labels
- datasets
- xLabel
- yLabel
- stacked

## dataset 구조

- label
- data
- borderColor
- backgroundColor

## 작성 예시

### 표 예시

- id: table-1
- type: table
- headers: [항목, 값]
- rows:
  - [질량, 3.2]
  - [속도, 12.4]

### 차트 예시

- id: chart-1
- type: bar
- labels: [1일차, 2일차, 3일차]
- datasets:
  - label: 측정값
    data: [10, 14, 18]

## 다음 구현 단계

1. 본문 내 {{viz:...}} 마커 탐지
2. 시각화 블록 렌더링 컴포넌트 구현
3. 표/막대/선 차트 렌더링
4. 캡션/제목/반응형 스타일 보강
