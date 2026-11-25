# Gigwangwakeup.github.io

프로젝트와 실습 기록을 한 페이지에서 볼 수 있게 모아 둔 포트폴리오 사이트입니다.

사이트 주소: https://gigwangwakeup.github.io

## 사이트에서 볼 수 있는 것

- 이력 한눈에 보기: FPGA 연구원으로 일한 2년 7개월과, 그 뒤 교육과정에서 거친 단계(Verilog, SystemVerilog와 UVM, STM32, SoC)
- 경력: 전력설비 부분방전(PD) 진단 장비의 FPGA 로직 설계와 검증
- 설계와 검증 프로젝트: RV32I 멀티사이클 CPU와 APB 버스(4인 팀), FIFO UVM 검증, MicroBlaze AXI 주변장치, UART로 제어하는 시계와 스톱워치
- 보드 프로젝트: 카드 권한 엘리베이터, FreeRTOS RC카, 스텝모터 아날로그 시계, STM32 스마트워치. 사진은 직접 찍은 실물이고, 영상이 있는 프로젝트는 그 자리에서 재생됩니다.
- 실습 기록: STM32와 Basys3 실습별 코드와 영상 링크
- 연락처: 이메일, GitHub, LinkedIn, YouTube

팀 프로젝트는 사이트에 팀 인원과 제가 맡은 부분을 따로 적었습니다.

## 만든 방법

사이트 코드(HTML, CSS, JS)는 AI(Claude)로 만들었습니다. 프로젝트 내용과 사진, 영상, 각 저장소의 코드는 제가 진행한 실습과 팀 프로젝트입니다. 프레임워크와 빌드 과정 없이 GitHub Pages에서 바로 열립니다.

## 그림 출처

- 배경 칩 이미지(`assets/bg-chip-stack.webp`): 원본 출처와 사용 조건을 확인하고 있습니다.
- 연락처의 칩 다이 사진: Piotr433, "Hitachi HD61700 microprocessor top metal die shot", CC0, Wikimedia Commons. 흑백으로 바꿔 썼습니다.

나머지 사진과 그림은 제 프로젝트에서 직접 찍거나 만든 것입니다.

## 내용 고치는 법

내용은 모두 `projects.js`에 있습니다.

| 항목 | 내용 |
| --- | --- |
| `profile` | 연락처 주소와 최종 업데이트 날짜(`updated`) |
| `features`, `interests` | 첫 화면 아래 특징 목록과 관심 분야 |
| `career` | 경력 표 |
| `history` | 이력 칸. 기간(`when`), 분류(`tag`), 제목, 설명. 지금 하는 칸에 `now: true` |
| `designWorks` | 설계와 검증 프로젝트. `youtube`에 주소를 넣으면 영상 버튼이 나옵니다 |
| `boardWorks` | 보드 프로젝트 |
| `labs` | 실습 기록 표 |

주소를 비워 두면(`""`) 그 링크는 나오지 않습니다. 새 그림은 `assets` 폴더에 넣습니다.
