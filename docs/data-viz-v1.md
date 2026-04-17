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

여기서 `table-1`, `chart-1`은 visualizations 배열 안의 `id`와 정확히 일치해야 한다.

## 현재 입력 방식

### 공통

- id
- type
- title
- caption

### table

- headersText
- rowsText[].row

### bar / line

- labelsText
- datasetsText[].label
- datasetsText[].dataText
- xLabel
- yLabel
- stacked

## 입력 규칙

### 표 헤더

쉼표로 구분한 한 줄 문자열로 입력한다.

예:
항목, 값

### 표 행

각 행을 하나의 문자열로 입력하고, 쉼표로 열을 구분한다.

예:
질량, 3.2
속도, 12.4

### 차트 라벨

쉼표로 구분한 한 줄 문자열로 입력한다.

예:
1일차, 2일차, 3일차

### 차트 데이터셋 값

숫자를 쉼표로 구분한 한 줄 문자열로 입력한다.

예:
10, 14, 18

## 작성 예시

### 표 예시

- id: table-1
- type: table
- title: 실험 데이터 표
- caption: 간단한 표 예시
- headersText: 항목, 값
- rowsText:
  - row: 질량, 3.2
  - row: 속도, 12.4

본문:
{{viz:table-1}}

### 차트 예시

- id: chart-1
- type: bar
- title: 막대 차트 예시
- caption: 일자별 측정값
- labelsText: 1일차, 2일차, 3일차
- datasetsText:
  - label: 측정값
    dataText: 10, 14, 18
    borderColor: "#285ea8"
    backgroundColor: "rgba(40, 94, 168, 0.2)"
- xLabel: 일자
- yLabel: 값
- stacked: false

본문:
{{viz:chart-1}}

## 운영 시 주의 사항

- 본문 마커 ID와 블록 ID가 다르면 렌더링되지 않는다.
- 표와 차트 모두 쉼표 입력 규칙을 지켜야 한다.
- 숫자 데이터에 불필요한 문자나 괄호를 넣지 않는다.
- line 차트도 bar 차트와 같은 방식으로 입력하되 type만 line으로 바꾼다.

## V1 완료 기준

1. 표 렌더링 정상
2. 막대 차트 렌더링 정상
3. 선 차트 렌더링 정상
4. 제목 / 캡션 / 축 이름 표시 정상
5. 본문 마커 치환 정상

## 다음 단계

- 수식 입력 기능 추가
- 화학식 입력 기능 추가
- 시각화 입력 UX 개선
