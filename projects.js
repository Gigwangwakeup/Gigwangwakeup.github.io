// 이 파일만 고치면 사이트 내용이 바뀝니다.
// youtube, linkedin에 주소를 넣으면 영상과 링크가 나타나고, 비워 두면("") 보이지 않습니다.

const STM32 = "https://github.com/Gigwangwakeup/STM32-Clang/tree/main/";
const HDL = "https://github.com/Gigwangwakeup/AI_system_semiconductor/tree/main/";

const profile = {
  github: "https://github.com/Gigwangwakeup",
  linkedin: "",
  youtube: "",
};

// 크게 보여주는 프로젝트. visual은 영상이 없을 때 대신 보이는 그림입니다.
const works = [
  {
    title: "RV32I Multi-Cycle CPU + APB Bus",
    summary:
      "RISC-V CPU와 AMBA APB 버스를 설계해 RAM·GPI·GPO·GPIO를 연결하고 Basys-3 보드에서 동작을 확인한 4인 팀 프로젝트입니다.",
    role: "맡은 일: CPU 구조와 명령어, APB 연결, AI 검증과 결함 수정",
    points: [
      "싱글사이클에서 타이밍 위반(10.31 ns)이 나서 멀티사이클로 전환",
      "C로 작성한 0~10 누적합 프로그램을 CPU에서 실행해 sum = 55 확인",
      "AI 에이전트로 엣지 케이스를 검증해 결함 8건을 찾아 수정",
    ],
    stats: [
      ["+1.676 ns", "100 MHz 타이밍 여유(WNS)"],
      ["14 / 15", "엣지 케이스 통과"],
      ["50 → 81", "AI 검증 점수"],
    ],
    tags: "SystemVerilog · RISC-V · AMBA APB · UVM · Verilator · Vivado",
    github: HDL + "SystemVerilogHDL/RV32I_MultiCycle_APB",
    youtube: "",
    linkedin: "",
    visual: {
      type: "image",
      src: "assets/apb-schematic.png",
      width: 1850,
      height: 830,
      alt: "Vivado 스케매틱. rv32i_cpu가 APB requester를 거쳐 BRAM, GPI, GPO, GPIO에 연결된다.",
    },
  },
  {
    title: "FIFO UVM 검증",
    summary:
      "Synopsys VCS와 Verdi 환경에서 UVM 1.2 테스트벤치를 만들어 FIFO를 검증했습니다. 레퍼런스 모델과 비교하는 scoreboard가 설계 버그를 잡아냈습니다.",
    points: [
      "리셋 직후 empty가 0으로 나오는 DUT 버그를 발견해 empty <= 1로 수정",
      "모델이 full을 먼저 판단하던 문제의 원인이 모델 쪽임을 구분해 수정",
      "full, empty, data를 항목별로 나눠 어디서 틀렸는지 바로 보이게 구성",
    ],
    tags: "SystemVerilog · UVM 1.2 · Synopsys VCS · Verdi",
    github: HDL + "SystemVerilogHDL/UVM_Verification",
    youtube: "",
    linkedin: "",
    tone: "dark",
    visual: {
      type: "image",
      src: "assets/fifo-uvm-log.png",
      width: 830,
      height: 195,
      alt: "UVM 로그. empty mismatch: expected = 1, dut = 0 오류가 반복해서 찍혀 있다.",
      caption: "수정 전 시뮬레이션 로그. scoreboard가 잡아낸 empty 불일치",
    },
  },
  {
    title: "스텝모터 아날로그 시계",
    summary:
      "28BYJ-48 스텝모터 3개로 시침·분침·초침을 움직이는 시계입니다. 시계와 스톱워치 모드를 오갈 때 바늘이 새 시간을 빠르게 따라갑니다.",
    points: [
      "목표까지 반 바퀴보다 멀면 반대로 돌려 이동 거리를 항상 반 바퀴 이하로 제한",
      "4096스텝이 60으로 나누어 떨어지지 않아, 누적 시간 전체를 스텝으로 환산해 오차 누적을 제거",
      "초침은 10ms, 분침은 초 단위까지 반영해 끊기지 않게 구동",
    ],
    tags: "STM32 · C · 스텝모터 · DS3231 RTC · I2C",
    github: STM32 + "06.%20analogClock_motor",
    youtube: "",
    linkedin: "",
    tone: "green",
    visual: { type: "clock" },
  },
  {
    title: "STM32 스마트워치",
    summary:
      "NUCLEO-F411RE로 만든 스마트워치입니다. 버튼 하나로 달력, 온습도, 거리 측정, 스톱워치 화면을 차례로 바꿉니다.",
    points: [
      "버튼 입력을 링 버퍼 큐에 이벤트로 넣었다가 꺼내 쓰는 구조로 설계",
      "RTC, DHT11, HC-SR04를 드라이버와 서비스 계층으로 나눠 통합",
    ],
    tags: "STM32 · C · 이벤트 큐 · 상태 머신 · I2C · EXTI",
    github: STM32 + "09.smartWatch",
    youtube: "",
    linkedin: "",
    visual: { type: "lcd" },
  },
  {
    title: "UART 제어 시계·스톱워치",
    summary:
      "FPGA 시계와 스톱워치를 버튼뿐 아니라 PC에서 보낸 문자로도 제어합니다. 테스트벤치에서 생긴 race condition의 원인을 파형으로 찾아 해결했습니다.",
    points: [
      "16× 오버샘플링 UART RX/TX FSM과 ASCII 명령 디코더 구현",
      "#delay 종료 시점과 @(posedge clk)가 겹쳐 rx_done이 사라지는 현상을 분석",
    ],
    tags: "Verilog · UART · FSM · Basys-3 · Vivado",
    github: HDL + "VerilogHDL/UART_Stopwatch_Watch",
    youtube: "",
    linkedin: "",
    tone: "dark",
    visual: {
      type: "image",
      src: "assets/uart-waveform.png",
      width: 1693,
      height: 388,
      alt: "시뮬레이션 파형. rx_data는 72, 73, 44, 55로 바뀌지만 sw_run만 한 번 올라간다.",
      caption: "수신 데이터는 들어오는데 첫 명령만 인식되던 파형",
    },
  },
];

// 표로 모아 보여주는 실습. 비워 둔 영상, 링크드인은 표에 나오지 않습니다.
const labs = [
  {
    group: "STM32 · NUCLEO-F411RE",
    items: [
      { title: "LedButton", text: "버튼 3개로 LED 켜기, 끄기, 깜빡이기", tech: "GPIO", github: STM32 + "01.%20LedButton", youtube: "", linkedin: "" },
      { title: "fnd_upcount", text: "4자리 FND에 0000~9999 카운트", tech: "FND 다이나믹 구동", github: STM32 + "02.%20fnd_upcount", youtube: "", linkedin: "" },
      { title: "upcount_btn", text: "버튼으로 Run, Stop, Clear 하는 카운터", tech: "상태 머신, 디바운싱", github: STM32 + "03.%20upcount_btn", youtube: "", linkedin: "" },
      { title: "watch_stopwatch", text: "FND 시계와 스톱워치 모드 전환", tech: "타이머 인터럽트, 계층 구조", github: STM32 + "04.%20watch_stopwatch", youtube: "", linkedin: "" },
      { title: "LCD_RTC_I2C", text: "RTC 시계와 스톱워치를 LCD와 FND에 표시", tech: "I2C, DS3231, LCD", github: STM32 + "05.%20LCD_RTC_I2C", youtube: "", linkedin: "" },
      { title: "dist_temp_humid_sensor", text: "거리와 온습도를 LCD에 표시", tech: "HC-SR04, DHT11, EXTI", github: STM32 + "07.dist_temp_humid_sensor", youtube: "", linkedin: "" },
      { title: "PWM", text: "버튼으로 주파수와 듀티비를 바꾸고 로직 애널라이저로 확인", tech: "타이머 PWM, ARR, CCR", github: STM32 + "08.PWM", youtube: "", linkedin: "" },
      { title: "joystick_count", text: "조이스틱 기울기에 따라 X·Y 카운트 증감", tech: "ADC, DMA, I2C LCD", github: STM32 + "10.joystick_count", youtube: "", linkedin: "" },
    ],
  },
  {
    group: "FPGA · Basys-3",
    items: [
      { title: "UART_FIFO_Loopback", text: "FIFO를 설계·검증한 뒤 UART와 연결한 루프백", tech: "FIFO, self-checking TB", github: HDL + "VerilogHDL/UART_FIFO_Loopback", youtube: "", linkedin: "" },
      { title: "Sensor_Smartwatch", text: "시계, 스톱워치, 초음파, 온습도를 하나로 통합", tech: "센서 프로토콜, UART 명령", github: HDL + "VerilogHDL/Sensor_Smartwatch_MiniProject", youtube: "", linkedin: "" },
      { title: "RV32I_SingleCycle", text: "RV32I 싱글사이클 CPU의 datapath와 제어 신호 구현", tech: "SystemVerilog, Harvard 구조", github: HDL + "SystemVerilogHDL/RV32I_SingleCycle", youtube: "", linkedin: "" },
    ],
  },
];
