// 이 파일만 고치면 사이트 내용이 바뀝니다.
// 주소를 비워 두면("") 그 링크는 화면에 나오지 않습니다.

const STM32 = "https://github.com/Gigwangwakeup/STM32-Clang/tree/main/";
const HDL = "https://github.com/Gigwangwakeup/HDL/tree/main/";
const AXI = "https://github.com/Gigwangwakeup/Verilog-HDL/tree/main/basys3/AXI/";

const profile = {
  name: "이기광",
  email: "lmop624@naver.com",
  github: "https://github.com/Gigwangwakeup",
  linkedin: "https://www.linkedin.com/in/%EA%B8%B0%EA%B4%91-%EC%9D%B4-538212345/",
  youtube: "https://www.youtube.com/@gigwangwakeup",
  updated: "2026-11-24",
};

// 첫 화면의 특징 목록
const features = [
  "전력설비 부분방전 진단 장비의 FPGA 로직 설계와 검증 2년 7개월",
  "RV32I 멀티사이클 CPU와 APB 버스, 100MHz에서 WNS +1.676ns (4인 팀)",
  "SystemVerilog와 UVM 1.2 테스트벤치, Synopsys VCS와 Verdi",
  "MicroBlaze AXI4-Lite 주변장치, STM32 펌웨어와 FreeRTOS",
];

const interests = "차량용 반도체, NPU";

// 경력
const career = {
  company: "유호전기공업(주) 연구소",
  role: "FPGA 로직 설계와 검증",
  period: "2023.11 ~ 2026.06",
  rows: [
    ["PD 검출 비교 간격 단축", "실시간 비교 구조에 남아 있던 1MHz 고정 다운샘플링을 가변 구조로 바꿔, 비교 간격을 1us에서 200ns로 줄임"],
    ["32채널 확장", "FPGA 2개 마스터 슬레이브 구성. 보드 사이 핀 12개 제약에서 12비트 원시값 대신 MCU 교정 후의 8비트 값을 넘겨 클럭, 동기, 윈도우 펄스, 게이팅까지 12핀 안에 배치"],
    ["FPGA 원격 업데이트", "JTAG 대신 QSPI 멀티부트(STARTUPE2, ICAPE2, 골든 이미지 복귀)를 제안하고 FPGA 쪽을 구현. 랙 한 대 기준 업데이트 시간 약 20분에서 약 6분"],
    ["IEC 61850-9-2 이더넷 송신", "레퍼런스의 MAC 송신 모듈을 가져와 수정하고 Wireshark로 패킷 검증"],
    ["ADS5295 LVDS ADC 수신", "외주 설계(ISERDESE2, IDELAYE2)를 분석하고 Vivado 시뮬레이션과 보드 동작으로 검증"],
  ],
};

// 타이밍도. 달은 "YYYY-MM", to는 그 달까지 포함합니다.
const timeline = {
  start: "2023-11",
  end: "2027-02",
  now: "2026-11",
  rows: [
    // signal은 파형 뷰어의 신호 이름, short는 값 열과 파형 안에 찍히는 짧은 값입니다.
    { name: "경력", signal: "career", segs: [{ from: "2023-11", to: "2026-06", label: "유호전기공업 연구소, FPGA 로직 설계와 검증", short: "FPGA 로직 설계·검증" }] },
    { name: "교육", signal: "education", segs: [{ from: "2026-06", to: "2027-02", label: "AI 시스템반도체 설계 교육과정", short: "AI 시스템반도체 과정" }] },
    {
      name: "HDL 실습",
      signal: "hdl_lab",
      segs: [
        { from: "2026-07", to: "2026-08", label: "Verilog RTL", short: "Verilog" },
        { from: "2026-09", to: "2026-10", label: "SystemVerilog, UVM, RISC-V CPU", short: "SV·UVM·RV32I" },
        { from: "2026-11", to: "2026-11", label: "MicroBlaze, AXI", short: "AXI" },
      ],
    },
    { name: "임베디드 실습", signal: "embedded_lab", segs: [{ from: "2026-10", to: "2026-11", label: "STM32, FreeRTOS", short: "STM32" }] },
  ],
};

// 설계와 검증 프로젝트. 그림은 assets 폴더에 둡니다.
const designWorks = [
  {
    title: "RV32I 멀티사이클 CPU와 APB 버스",
    team: "4인 팀 프로젝트. 맡은 일: CPU 구조와 명령어, APB 연결, AI 검증과 결함 수정",
    summary: "RISC-V CPU와 AMBA APB 버스를 설계해 RAM, GPI, GPO, GPIO를 연결하고 Basys3 보드에서 동작을 확인했습니다.",
    points: [
      "싱글사이클에서 타이밍 위반(10.31ns)이 나서 멀티사이클로 전환",
      "C로 작성한 0~10 누적합 프로그램을 CPU에서 실행해 sum = 55 확인",
      "AI 에이전트로 엣지 케이스를 검증해 결함 8건을 찾아 수정",
    ],
    stats: [["100MHz 타이밍 여유", "WNS +1.676ns"], ["엣지 케이스", "14 / 15 통과"], ["AI 검증 점수", "50에서 81"]],
    tags: "SystemVerilog, RISC-V, AMBA APB, Vivado, Verilator",
    image: { src: "assets/cpu-sum-waveform.png", width: 1920, height: 900, alt: "누적합 프로그램의 스택 프레임, 어셈블리, 시뮬레이션 파형. 최종 sum = 55가 표시되어 있다." },
    caption: "누적합 프로그램 실행 결과. Dmem의 sum이 55가 된다",
    github: HDL + "SystemVerilogHDL/RV32I_MultiCycle_APB",
    youtube: "",
  },
  {
    title: "FIFO UVM 검증",
    team: "개인 실습",
    summary: "Synopsys VCS와 Verdi 환경에서 UVM 1.2 테스트벤치를 만들어 FIFO를 검증했습니다. 레퍼런스 모델과 비교하는 scoreboard가 설계 버그를 잡았습니다.",
    points: [
      "리셋 직후 empty가 0으로 나오는 DUT 버그를 찾아 empty <= 1로 수정",
      "모델이 full을 먼저 판단하던 문제가 모델 쪽 원인임을 구분해 수정",
      "full, empty, data를 항목별로 나눠 어디서 틀렸는지 바로 보이게 구성",
    ],
    stats: [],
    tags: "SystemVerilog, UVM 1.2, Synopsys VCS, Verdi",
    image: { src: "assets/fifo-uvm-log.png", width: 830, height: 195, alt: "UVM 로그. empty mismatch: expected = 1, dut = 0 오류가 반복해서 찍혀 있다." },
    caption: "수정 전 시뮬레이션 로그. scoreboard가 잡아낸 empty 불일치",
    github: HDL + "SystemVerilogHDL/UVM_Verification",
    youtube: "",
  },
  {
    title: "MicroBlaze AXI 주변장치",
    team: "개인 실습",
    summary: "Basys3에 MicroBlaze를 올리고 수업에서 만든 AXI4-Lite GPIO, UART IP를 붙였습니다. C에서는 레지스터 배치에 맞춘 구조체 포인터로 접근합니다.",
    points: [
      "GPIO IP를 5개로 늘려 LED 16개와 버튼 4개에 연결, LED 파도타기 방향을 버튼으로 전환",
      "UART IP의 SR, TDR, RDR, CR 레지스터를 C 구조체로 감싼 송수신 드라이버 작성",
    ],
    stats: [],
    tags: "MicroBlaze, AXI4-Lite, Vivado IP Integrator, Vitis",
    image: { src: "https://img.youtube.com/vi/6P4IyXeRwGo/hqdefault.jpg", width: 480, height: 360, alt: "Basys3 보드의 LED 파도타기 동작 영상 첫 화면" },
    caption: "GPIO IP로 만든 LED 파도타기 동작 영상",
    github: AXI,
    youtube: "https://youtu.be/6P4IyXeRwGo",
  },
  {
    title: "UART로 제어하는 시계와 스톱워치",
    team: "개인 실습",
    summary: "FPGA 시계와 스톱워치를 버튼뿐 아니라 PC에서 보낸 문자로도 제어합니다. 테스트벤치에서 생긴 race condition의 원인을 파형으로 찾아 해결했습니다.",
    points: [
      "16배 오버샘플링 UART RX, TX FSM과 ASCII 명령 디코더 구현",
      "#delay 종료 시점과 @(posedge clk)가 겹쳐 rx_done이 사라지는 현상을 분석",
    ],
    stats: [],
    tags: "Verilog, UART, FSM, Basys3, Vivado",
    image: { src: "assets/uart-waveform.png", width: 1693, height: 388, alt: "시뮬레이션 파형. rx_data는 72, 73, 44, 55로 바뀌지만 sw_run만 한 번 올라간다." },
    caption: "수신 데이터는 들어오는데 첫 명령만 인식되던 파형",
    github: HDL + "VerilogHDL/UART_Stopwatch_Watch",
    youtube: "",
  },
];

// 임베디드 프로젝트. 사진은 직접 찍은 것입니다.
const boardWorks = [
  {
    title: "카드 권한 엘리베이터",
    team: "2인 팀 프로젝트",
    text: "카드에 등록된 층으로만 가는 3층 엘리베이터. 스텝모터로 움직이고 포토인터럽터로 층을 감지하며, PC의 Python 모델이 보드의 UART 응답을 자동으로 비교합니다.",
    tags: "STM32, 2-process FSM, UART 프레임",
    image: { src: "assets/photo-elevator.jpg", width: 629, height: 571, alt: "나무로 만든 엘리베이터 모형과 NUCLEO 보드, LCD가 연결된 브레드보드" },
    github: STM32 + "11.elevator_teamproject",
  },
  {
    title: "FreeRTOS RC카",
    team: "2인 팀 프로젝트. 맡은 일: 초음파 3개 순차 측정, 자율 주행 적용",
    text: "앱 조이스틱으로 조종하는 수동 주행과 초음파 센서 3개로 벽 사이를 따라가는 자율 주행. 통신, 모터, 거리 측정을 Task로 나누고 Queue와 Mutex로 연결했습니다.",
    tags: "STM32, FreeRTOS, HC-SR04, BLE",
    image: { src: "assets/photo-minicar.jpg", width: 426, height: 688, alt: "바퀴 4개, 배터리, NUCLEO 보드, LCD, 초음파 센서가 달린 RC카를 위에서 찍은 사진" },
    github: STM32 + "12.minicar",
  },
  {
    title: "스텝모터 아날로그 시계",
    team: "개인 실습",
    text: "28BYJ-48 스텝모터 3개로 시침, 분침, 초침을 움직입니다. 4096스텝이 60으로 나누어 떨어지지 않아 누적 시간 전체를 스텝으로 환산해 오차가 쌓이지 않게 했습니다.",
    tags: "STM32, 스텝모터, DS3231 RTC",
    image: { src: "assets/photo-clock.jpg", width: 1080, height: 1134, alt: "스텝모터 3개와 시간이 표시된 LCD, NUCLEO 보드가 연결된 브레드보드" },
    github: STM32 + "06.%20analogClock_motor",
  },
  {
    title: "STM32 스마트워치",
    team: "개인 실습",
    text: "버튼 하나로 달력, 온습도, 거리, 스톱워치 화면을 바꿉니다. 버튼 입력을 링 버퍼 큐에 이벤트로 넣었다가 꺼내 쓰는 구조로 만들었습니다.",
    tags: "STM32, 이벤트 큐, I2C, EXTI",
    image: { src: "assets/photo-smartwatch.jpg", width: 1095, height: 908, alt: "시간과 온습도가 표시된 LCD, 버튼 3개, NUCLEO 보드가 연결된 브레드보드" },
    github: STM32 + "09.smartWatch",
  },
];

// 실습 기록 표
const labs = [
  {
    group: "STM32, NUCLEO-F411RE",
    items: [
      ["LedButton", "버튼 3개로 LED 켜기, 끄기, 깜빡이기", "GPIO", STM32 + "01.%20LedButton"],
      ["fnd_upcount", "4자리 FND에 0000~9999 카운트", "FND 다이나믹 구동", STM32 + "02.%20fnd_upcount"],
      ["upcount_btn", "버튼으로 Run, Stop, Clear 하는 카운터", "상태 머신, 디바운싱", STM32 + "03.%20upcount_btn"],
      ["watch_stopwatch", "FND 시계와 스톱워치 모드 전환", "타이머 인터럽트, 계층 구조", STM32 + "04.%20watch_stopwatch"],
      ["LCD_RTC_I2C", "RTC 시계와 스톱워치를 LCD와 FND에 표시", "I2C, DS3231, LCD", STM32 + "05.%20LCD_RTC_I2C"],
      ["dist_temp_humid_sensor", "거리와 온습도를 LCD에 표시", "HC-SR04, DHT11, EXTI", STM32 + "07.dist_temp_humid_sensor"],
      ["PWM", "버튼으로 주파수와 듀티비를 바꾸고 로직 애널라이저로 확인", "타이머 PWM, ARR, CCR", STM32 + "08.PWM"],
      ["joystick_count", "조이스틱 기울기에 따라 X, Y 카운트 증감", "ADC, DMA, I2C LCD", STM32 + "10.joystick_count"],
    ],
  },
  {
    group: "FPGA, Basys3",
    items: [
      ["UART_FIFO_Loopback", "FIFO를 설계, 검증한 뒤 UART와 연결한 루프백", "FIFO, self-checking TB", HDL + "VerilogHDL/UART_FIFO_Loopback"],
      ["Sensor_Smartwatch", "시계, 스톱워치, 초음파, 온습도를 하나로 통합", "센서 프로토콜, UART 명령", HDL + "VerilogHDL/Sensor_Smartwatch_MiniProject"],
      ["RV32I_SingleCycle", "RV32I 싱글사이클 CPU의 datapath와 제어 신호 구현", "SystemVerilog, Harvard 구조", HDL + "SystemVerilogHDL/RV32I_SingleCycle"],
      ["AXI_GPIO_led_button", "커스텀 GPIO IP 5개로 LED 16개 파도타기", "AXI4-Lite, MicroBlaze, Vitis", AXI + "01.Microblaze_AXI_GPIO_led_button"],
      ["AXI_GPIO_UART", "커스텀 UART IP로 송수신하고 받은 글자를 콘솔에 출력", "AXI4-Lite, UART FSM", AXI + "02.Microblaze_AXI_GPIO_UART"],
    ],
  },
];
