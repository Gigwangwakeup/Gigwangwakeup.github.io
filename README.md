# Gigwangwakeup.github.io

이기광의 프로젝트를 한 페이지에서 볼 수 있게 모아 둔 소개 사이트입니다. 주소는 https://gigwangwakeup.github.io 입니다.

사이트 코드(HTML, CSS, JS)는 AI(Claude)가 만들었습니다. 소개된 프로젝트 내용과 각 저장소의 코드는 제가 진행한 실습과 팀 프로젝트를 바탕으로 합니다. 프레임워크와 빌드 과정은 없습니다.

## 내용 수정

`projects.js`만 고치면 됩니다.

- `profile`: 이메일, GitHub, LinkedIn, YouTube 주소와 최종 업데이트 날짜(`updated`). 연락처 표와 맨 아래 날짜에 쓰입니다.
- `features`, `interests`: 첫 화면 아래 특징 목록과 관심 분야.
- `career`: 경력 표.
- `history`: 이력 한눈에 보기. 칸마다 기간(`when`), 분류(`tag`), 제목, 한 줄 설명을 넣고, 지금 하는 칸에 `now: true`를 붙입니다.
- `designWorks`: 설계와 검증 프로젝트(그림과 함께 크게 표시). `youtube`에 영상 주소를 넣으면 그림 대신 영상 재생 버튼이 나옵니다.
- `boardWorks`: 사진으로 보여 주는 임베디드 프로젝트.
- `labs`: 실습 기록 표.

주소를 비워 두면(`""`) 그 링크는 화면에 나오지 않습니다. 새 그림은 `assets` 폴더에 넣습니다.

## 그림 출처

- 배경 그림 `assets/bg-chip-stack.webp`: 사이트 주인이 골라서 준 칩 이미지입니다. 원본 출처와 사용 조건은 따로 확인이 필요합니다.
- 연락처의 칩 다이 사진: Piotr433, "Hitachi HD61700 microprocessor top metal die shot", CC0, Wikimedia Commons. 흑백으로 바꿔 썼습니다.

나머지 사진과 그림은 본인 프로젝트에서 직접 찍거나 만든 것입니다.

## 움직임

스크롤하면 내용 패널이 배경 위로 밀려 올라옵니다. 운영체제에서 애니메이션 효과를 꺼 두면(움직임 줄이기) 크기 변화 없이 짧게만 올라옵니다.
