(() => {
  "use strict";

  const depth = window.REVISION_DEPTH && window.REVISION_DEPTH.cs608;
  if (!depth) return;

  const clone = value => JSON.parse(JSON.stringify(value));
  const findExample = (unit, title) => {
    const lesson = depth.learn[unit];
    return [lesson.example, ...(lesson.extraExamples || [])]
      .find(example => example && example.title === title);
  };
  const state = (after, title, operation, headers, sourceRows, currentRow, doneThrough) => ({
    after,
    title,
    operation,
    headers,
    currentRow,
    rows: sourceRows.map((cells, index) => ({
      status: index <= doneThrough ? "done" : "pending",
      cells: index <= doneThrough
        ? clone(cells)
        : cells.map((cell, cellIndex) => cellIndex === 0 ? cell : "待处理")
    }))
  });

  /*
   * Q1(b): one fixed value-line/TCI table. The table never loses rows.
   * Each step changes only the rows named by the operation.
   */
  const q1b = depth.exam[0].parts[1];
  const partitionHeaders = ["对象", "TCI", "完整区间 / 输出", "切换点的含义", "Selected value", "状态"];
  const partitionRows = [
    ["battLevel", "自然域", "short: −32768..32767", "Java 类型给出可输入范围", "—", "已定义"],
    ["dischargeRate", "自然域", "short: −32768..32767", "Java 类型给出可输入范围", "—", "已定义"],
    ["battLevel", "B1*", "−32768..−1", "0 的左侧是非法区", "−1", "error TCI"],
    ["battLevel", "B2", "0..9", "0 合法；10 使 batt<10 变假", "9", "normal TCI"],
    ["battLevel", "B3", "10..49", "10 进入 SLOW 区；50 退出", "10", "normal TCI"],
    ["battLevel", "B4", "50..100", "50 不再 SLOW；100 仍合法", "50", "normal TCI"],
    ["battLevel", "B5*", "101..32767", "100 的右侧是非法区", "101", "error TCI"],
    ["dischargeRate", "R1*", "−32768..−1", "0 的左侧是非法区", "−1", "error TCI"],
    ["dischargeRate", "R2", "0..50", "50 仍不满足 rate>50", "50", "normal TCI"],
    ["dischargeRate", "R3", "51..255", "51 首次满足 rate>50；255 仍合法", "51", "normal TCI"],
    ["dischargeRate", "R4*", "256..32767", "255 的右侧是非法区", "256", "error TCI"],
    ["输出", "O1", "NONE", "合法，但不满足 FAST 或 SLOW", "—", "output TCI"],
    ["输出", "O2", "FAST_CHARGE", "合法且 batt<10 且 rate>50", "—", "output TCI"],
    ["输出", "O3", "SLOW_CHARGE", "合法且 batt<50，且未先返回 FAST", "—", "output TCI"],
    ["输出", "O4", "PARAM_ERROR", "任一参数超出规格合法范围", "—", "output TCI"]
  ];
  q1b.steps = [
    "先写两个参数的完整 Java short 自然域。自然域是 −32768..32767，不是规格合法区。",
    "沿 battLevel 的切换点 −1|0、9|10、49|50、100|101 切成 B1* 到 B5*。",
    "沿 dischargeRate 的切换点 −1|0、50|51、255|256 切成 R1* 到 R4*。",
    "给四种输出编号 O1 到 O4。输出也是 TCI，因为测试必须检查返回值。",
    "给每个输入 TCI 选一个具体值。边界值能同时检查区间归属和严格不等号。",
    "逐行检查区间。输入区间不能重叠，合并后必须覆盖完整 short 自然域。"
  ];
  q1b.states = [
    state(1, "Charging 完整 value line 与 TCI 表", "填自然域两行。此时所有 partition 行仍待处理。", partitionHeaders, partitionRows, 0, 1),
    state(2, "Charging 完整 value line 与 TCI 表", "按四个 battLevel 切换点填 B1* 至 B5*。星号表示非法输入。", partitionHeaders, partitionRows, 2, 6),
    state(3, "Charging 完整 value line 与 TCI 表", "按三个 dischargeRate 切换点填 R1* 至 R4*。", partitionHeaders, partitionRows, 7, 10),
    state(4, "Charging 完整 value line 与 TCI 表", "填 O1 至 O4。每个输出稍后都必须能反查到测试。", partitionHeaders, partitionRows, 11, 14),
    state(5, "Charging 完整 value line 与 TCI 表", "在同一张表中填 selected value。错误区选择最靠近合法区的值。", partitionHeaders, partitionRows, 3, 14),
    state(6, "Charging 完整 value line 与 TCI 表", "检查无空隙、无重叠和端点归属。整张表现在完成。", partitionHeaders, partitionRows, 14, 14)
  ];
  delete q1b.ledger;
  q1b.check = "B1*..B5* 完整覆盖 battLevel 的 short 自然域。R1*..R4* 完整覆盖 dischargeRate 的 short 自然域。每个端点只属于一个区间。";

  /*
   * Q1(c): tests and the inverse TCI lookup live in one fixed table.
   * Adding a test updates its row. The final step checks every TCI in reverse.
   */
  const q1c = depth.exam[0].parts[2];
  const tcHeaders = ["类型", "ID", "batt", "rate", "Expected / 被谁覆盖", "完整 mapping", "状态"];
  const tcRows = [
    ["测试", "T1", "9", "51", "FAST_CHARGE", "{B2,R3,O2}", "保留"],
    ["测试", "T2", "10", "51", "SLOW_CHARGE", "{B3,R3,O3}", "保留"],
    ["测试", "T3", "50", "50", "NONE", "{B4,R2,O1}", "保留"],
    ["测试", "T4", "−1", "50", "PARAM_ERROR", "{B1*,R2,O4}", "保留"],
    ["测试", "T5", "101", "50", "PARAM_ERROR", "{B5*,R2,O4}", "保留"],
    ["测试", "T6", "50", "−1", "PARAM_ERROR", "{B4,R1*,O4}", "保留"],
    ["测试", "T7", "50", "256", "PARAM_ERROR", "{B4,R4*,O4}", "保留"],
    ["TCI 反查", "B1*", "—", "—", "T4", "非法 batt 低区", "有证据"],
    ["TCI 反查", "B2", "—", "—", "T1", "正常 batt 低区", "有证据"],
    ["TCI 反查", "B3", "—", "—", "T2", "正常 batt 中区", "有证据"],
    ["TCI 反查", "B4", "—", "—", "T3,T6,T7", "正常 batt 高区", "有证据"],
    ["TCI 反查", "B5*", "—", "—", "T5", "非法 batt 高区", "有证据"],
    ["TCI 反查", "R1*", "—", "—", "T6", "非法 rate 低区", "有证据"],
    ["TCI 反查", "R2", "—", "—", "T3,T4,T5", "正常 rate 低区", "有证据"],
    ["TCI 反查", "R3", "—", "—", "T1,T2", "正常 rate 高区", "有证据"],
    ["TCI 反查", "R4*", "—", "—", "T7", "非法 rate 高区", "有证据"],
    ["TCI 反查", "O1", "—", "—", "T3", "NONE", "有证据"],
    ["TCI 反查", "O2", "—", "—", "T1", "FAST_CHARGE", "有证据"],
    ["TCI 反查", "O3", "—", "—", "T2", "SLOW_CHARGE", "有证据"],
    ["TCI 反查", "O4", "—", "—", "T4,T5,T6,T7", "PARAM_ERROR", "有证据"]
  ];
  q1c.steps = [
    "填 T1=(9,51)。它覆盖 B2、R3 和 O2。三个值都必须写在同一行。",
    "填 T2=(10,51)。它新增 B3 和 O3。R3 重复，但这次重复不可删除。",
    "填 T3=(50,50)。它新增 B4、R2 和 O1。",
    "填 T4=(−1,50)。只让 battLevel 的低区非法，因此独立覆盖 B1*。",
    "填 T5=(101,50)。只让 battLevel 的高区非法，因此独立覆盖 B5*。",
    "填 T6=(50,−1)。只让 dischargeRate 的低区非法，因此独立覆盖 R1*。",
    "填 T7=(50,256)。只让 dischargeRate 的高区非法，因此独立覆盖 R4*。",
    "从每个 TCI 反查测试。若某一反查行为空，测试集就不完整。"
  ];
  q1c.states = [
    state(1, "完整 TC→TCI 表与 TCI 反查区", "加入 T1。其余测试和全部反查行保留为待处理。", tcHeaders, tcRows, 0, 0),
    state(2, "完整 TC→TCI 表与 TCI 反查区", "加入 T2。比较整组 mapping，不因 R3 重复而删除 T2。", tcHeaders, tcRows, 1, 1),
    state(3, "完整 TC→TCI 表与 TCI 反查区", "加入 T3。正常输入和三个正常输出现已覆盖。", tcHeaders, tcRows, 2, 2),
    state(4, "完整 TC→TCI 表与 TCI 反查区", "加入单故障测试 T4。另一参数 rate=50 保持合法。", tcHeaders, tcRows, 3, 3),
    state(5, "完整 TC→TCI 表与 TCI 反查区", "加入单故障测试 T5。另一参数 rate=50 保持合法。", tcHeaders, tcRows, 4, 4),
    state(6, "完整 TC→TCI 表与 TCI 反查区", "加入单故障测试 T6。另一参数 batt=50 保持合法。", tcHeaders, tcRows, 5, 5),
    state(7, "完整 TC→TCI 表与 TCI 反查区", "加入单故障测试 T7。所有输入 TCI 现已出现。", tcHeaders, tcRows, 6, 6),
    state(8, "完整 TC→TCI 表与 TCI 反查区", "逐行反查 B、R、O。每个 TCI 至少指向一条测试。", tcHeaders, tcRows, 7, 19)
  ];
  delete q1c.ledger;
  q1c.final = "T1 至 T7 的每行都含输入、expected 和完整 mapping。反查区确认 B1*..B5*、R1*..R4*、O1..O4 全部有测试证据。";

  /*
   * Learning Decision Table: use the conventional fixed-column layout.
   * A step fills one rule column. No second summary table is added.
   */
  const decision = findExample(1, "从条件写出完整 Decision Table");
  if (decision) {
    const decisionHeaders = ["条件 / 动作", "R1", "R2", "R3", "R4", "R5", "R6"];
    const decisionRows = [
      ["M：会员？", "T", "T", "T", "F", "F", "F"],
      ["A：金额≥€50？", "T", "T", "F", "T", "T", "F"],
      ["B：金额≥€100？", "T", "F", "F", "T", "F", "F"],
      ["Free", "X", "X", "—", "X", "—", "—"],
      ["Charge", "—", "—", "X", "—", "X", "X"],
      ["代表输入", "会员,€120", "会员,€70", "会员,€30", "非会员,€120", "非会员,€70", "非会员,€30"]
    ];
    const matrixState = (after, title, operation, completedColumn) => ({
      after,
      title,
      operation,
      headers: decisionHeaders,
      currentRow: 5,
      rows: decisionRows.map(row => ({
        status: "done",
        cells: row.map((cell, index) => {
          if (index === 0) return cell;
          return index <= completedColumn ? cell : "待处理";
        })
      }))
    });
    decision.steps = [
      "定义 M、A、B。金额≥€100 时必然也满足金额≥€50，所以 A=F、B=T 不可行。",
      "填 R1：会员，金额≥€100。会员且金额≥€50，所以动作是 Free。",
      "填 R2：会员，€50≤金额<€100。会员门槛已满足，所以动作是 Free。",
      "填 R3：会员，金额<€50。会员门槛未满足，所以动作是 Charge。",
      "填 R4：非会员，金额≥€100。非会员门槛已满足，所以动作是 Free。",
      "填 R5：非会员，€50≤金额<€100。非会员门槛未满足，所以动作是 Charge。",
      "填 R6：非会员，金额<€50。两个免费条件都不成立，所以动作是 Charge。",
      "检查六列。每列只有一个动作 X，六列互斥，并覆盖所有可行输入。"
    ];
    decision.states = [
      matrixState(1, "固定 Decision Table：先定义行", "固定三条条件行、两条动作行和代表输入行。六个规则列都保留。", 0),
      matrixState(2, "固定 Decision Table：处理 R1", "只填 R1。检查 T,T,T 与 Free。", 1),
      matrixState(3, "固定 Decision Table：处理 R2", "只填 R2。B=F 表示金额尚未到 €100。", 2),
      matrixState(4, "固定 Decision Table：处理 R3", "只填 R3。A=F 时 B 必须为 F。", 3),
      matrixState(5, "固定 Decision Table：处理 R4", "只填 R4。非会员需要达到 €100。", 4),
      matrixState(6, "固定 Decision Table：处理 R5", "只填 R5。€70 对非会员仍收费。", 5),
      matrixState(7, "固定 Decision Table：处理 R6", "只填 R6。两个免费条件都不成立。", 6),
      matrixState(8, "固定 Decision Table：完整性检查", "逐列检查唯一动作。确认没有 A=F、B=T 的伪规则。", 6)
    ];
    delete decision.ledger;
    decision.result = "六个规则列构成完整 Decision Table。每列有条件、唯一动作和具体代表输入。";
  }

  /*
   * Q3(b): every method call has its own row and observable state transition.
   */
  const shipping = depth.exam[2].parts[1];
  const shippingHeaders = ["TC", "调用序号", "调用", "调用前状态", "调用后状态 / 返回值", "本行作用"];
  const shippingRows = [
    ["T1", "1", "new Shipping()", "对象不存在", "prime=false, free=false", "建立独立对象"],
    ["T1", "2", "setPrime(true)", "prime=false, free=false", "prime=true, free=false；void", "建立 P1"],
    ["T1", "3", "decide(−1)", "prime=true, free=false", "prime=true, free=true；void", "使用 V1"],
    ["T1", "4", "isFree()", "prime=true, free=true", "返回 true", "检查 O1；mapping={P1,V1,O1}"],
    ["T2", "1", "new Shipping()", "对象不存在", "prime=false, free=false", "清除 T1 状态"],
    ["T2", "2", "setPrime(false)", "prime=false, free=false", "prime=false, free=false；void", "建立 P2"],
    ["T2", "3", "decide(101)", "prime=false, free=false", "prime=false, free=true；void", "使用 V2"],
    ["T2", "4", "isFree()", "prime=false, free=true", "返回 true", "检查 O1；mapping={P2,V2,O1}"],
    ["T3", "1", "new Shipping()", "对象不存在", "prime=false, free=false", "清除 T2 状态"],
    ["T3", "2", "setPrime(false)", "prime=false, free=false", "prime=false, free=false；void", "建立 P2"],
    ["T3", "3", "decide(100)", "prime=false, free=false", "prime=false, free=false；void", "使用 V1；100 不满足 >100"],
    ["T3", "4", "isFree()", "prime=false, free=false", "返回 false", "检查 O2；mapping={P2,V1,O2}"]
  ];
  shipping.steps = [
    "定义 TCI。P1=prime true，P2=prime false，V1=value≤100，V2=value>100，O1=free，O2=not free。",
    "T1 调用 new Shipping()。新对象的初始状态是 prime=false、free=false。",
    "T1 调用 setPrime(true)。它返回 void，只把 prime 改为 true。",
    "T1 调用 decide(−1)。负数合法。prime=true 使 free 变为 true。",
    "T1 调用 isFree()。它返回 true，因此 T1 覆盖 {P1,V1,O1}。",
    "T2 调用 new Shipping()。必须新建对象，不能沿用 T1 的 free=true。",
    "T2 调用 setPrime(false)，再调用 decide(101)，最后调用 isFree()。三行分别记录状态变化和返回值。",
    "T3 调用 new Shipping()，再调用 setPrime(false)。它建立干净的 P2 状态。",
    "T3 调用 decide(100)。条件是 value>100，所以 100 仍使 free=false。",
    "T3 调用 isFree()。它返回 false，因此 T3 覆盖 {P2,V1,O2}。",
    "反查 P1、P2、V1、V2、O1、O2。六个 TCI 都至少出现在一条 mapping 中。"
  ];
  const shippingDone = [0,0,1,2,3,4,7,9,10,11,11];
  shipping.states = shipping.steps.map((_, index) =>
    state(
      index + 1,
      "Shipping 三条测试的完整调用状态表",
      index === 0
        ? "先固定 TCI。表中每个方法调用仍保留独立一行。"
        : `执行并记录当前调用。完成到表中第 ${shippingDone[index] + 1} 行。`,
      shippingHeaders,
      shippingRows,
      shippingDone[index],
      shippingDone[index]
    )
  );
  delete shipping.ledger;
  shipping.final = "T1、T2、T3 都从 new 开始。每个 setPrime、decide 和 isFree 调用都有独立状态行。最终 mapping 覆盖 P1、P2、V1、V2、O1、O2。";

  /*
   * Q4: fixed rule table plus a reproducible execution log.
   * The sample values are the first Java Random values for seed 2026L.
   */
  const randomRules = depth.exam[3].parts[0];
  const randomRuleHeaders = ["Rule", "grid", "lux 区间", "生成调用", "Expected", "固定边界检查", "状态"];
  const randomRuleRows = [
    ["R1", "true", "0..4999", "genRand(4999,0)", "false", "lux=4999→false", "可执行"],
    ["R2", "true", "5000..2147483647", "genRand(Integer.MAX_VALUE,5000)", "true", "lux=5000→true", "可执行"],
    ["R3", "false", "0..4999", "genRand(4999,0)", "false", "lux=4999→false", "可执行"],
    ["R4", "false", "5000..2147483647", "genRand(Integer.MAX_VALUE,5000)", "false", "lux=5000→false", "可执行"]
  ];
  randomRules.steps = [
    "固定完整四列规则。两种 grid 状态和两个 lux 区间产生 R1 到 R4。",
    "处理 R1。固定 grid=true，只从 0..4999 生成 lux，oracle 固定为 false。",
    "处理 R2。固定 grid=true，只从 5000..Integer.MAX_VALUE 生成 lux，oracle 固定为 true。",
    "处理 R3。固定 grid=false，只从 0..4999 生成 lux，oracle 固定为 false。",
    "处理 R4。固定 grid=false，只从 5000..Integer.MAX_VALUE 生成 lux，oracle 固定为 false。",
    "另跑固定边界 4999 和 5000。随机抽样不能保证命中切换点。"
  ];
  randomRules.states = randomRules.steps.map((_, index) =>
    state(
      index + 1,
      "SolarPanel 固定 Random Decision Table",
      index === 0 ? "建立四条规则行。" : index < 5 ? `只处理 R${index}。` : "检查每个区间的两侧边界。",
      randomRuleHeaders,
      randomRuleRows,
      Math.min(Math.max(index - 1, 0), 3),
      index === 0 ? -1 : index < 5 ? index - 1 : 3
    )
  );
  delete randomRules.ledger;

  const randomCode = depth.exam[3].parts[1];
  const logHeaders = ["迭代", "seed", "Rule", "grid", "lux", "Expected", "Actual", "结果"];
  const logRows = [
    ["1", "2026", "R1", "true", "3799", "false", "false", "PASS"],
    ["2", "2026", "R1", "true", "2050", "false", "false", "PASS"],
    ["3", "2026", "R1", "true", "3197", "false", "false", "PASS"],
    ["4", "2026", "R2", "true", "384297530", "true", "true", "PASS"],
    ["5", "2026", "R2", "true", "1697341649", "true", "true", "PASS"],
    ["6", "2026", "R2", "true", "426943038", "true", "true", "PASS"],
    ["7", "2026", "R3", "false", "3773", "false", "false", "PASS"],
    ["8", "2026", "R3", "false", "1636", "false", "false", "PASS"],
    ["9", "2026", "R3", "false", "834", "false", "false", "PASS"],
    ["10", "2026", "R4", "false", "9890978", "false", "false", "PASS"],
    ["11", "2026", "R4", "false", "318468239", "false", "false", "PASS"],
    ["12", "2026", "R4", "false", "1723684999", "false", "false", "PASS"]
  ];
  randomCode.steps = [
    "创建 Random random=new Random(2026L)。同一个 seed 会产生同一串值。",
    "实现 inclusive generator。先检查 max≥min，再返回 min+random.nextInt(max−min+1)。",
    "运行 R1 三次。日志保存 rule、grid、lux、expected、actual 和结果。",
    "继续使用同一个 Random 对象运行 R2 三次。不要在每次循环中重新设置 seed。",
    "运行 R3 三次。grid 固定为 false，lux 仍限制在 0..4999。",
    "运行 R4 三次。grid 固定为 false，lux 限制在 5000..Integer.MAX_VALUE。",
    "检查日志共 12 行。失败报告必须打印 seed、rule、grid 和 lux，才能重现失败。"
  ];
  const logDone = [-1,-1,2,5,8,11,11];
  randomCode.states = randomCode.steps.map((_, index) =>
    state(
      index + 1,
      "seed=2026L 的完整约束随机测试日志",
      index === 0
        ? "建立唯一 Random 对象。日志行暂不执行。"
        : index === 1
          ? "建立 inclusive generator。下一步才开始取样。"
          : `执行 ${["R1","R2","R3","R4"][index - 2] || "日志检查"} 的三次调用，并逐行比较 Actual 与 Expected。`,
      logHeaders,
      logRows,
      Math.max(logDone[index], 0),
      logDone[index]
    )
  );
  delete randomCode.ledger;
  randomCode.final = "固定 seed=2026L。四条规则各运行三次，完整日志保存 12 次调用。正式测试可把每条规则的次数 N 增大，但每次仍写同样的日志字段。";
  randomCode.check = "重新使用 Java Random(2026L) 能得到表中的 lux 顺序。每行 Actual 都与该 Rule 的 Expected 相同。";

  /*
   * Q2: the 2026 paper contains the complete implementation and JaCoCo view.
   * Keep one complete branch table on screen and fill the two missing outcomes.
   */
  const q2a = depth.exam[1].parts[0];
  q2a.given = "2026 试卷中的 Filestore.decideWrite 实现已经核对：enabled 为真后检查 exists；exists=true 时第 28 行检查 overwrite，true 执行 temp=true，没有 else；exists=false 时第 32 行检查 overwrite，true 执行 temp=false，false 执行 temp=true；enabled=false 时 temp=false。JaCoCo 中第 28、32 行为黄色，第 29、35 行为绿色，第 33 行为红色。";
  q2a.target = "从实际控制流和 JaCoCo 颜色确定两个未覆盖的 branch outcome，并给出能分别覆盖它们的最小新增测试。";
  const branchHeaders = ["行 / TCI", "判定结果", "JaCoCo / 源码证据", "到达该分支必须满足", "对应测试", "Expected", "覆盖状态"];
  const branchRows = [
    ["外层 if(enabled)", "true", "已进入内部判断", "enabled=true", "已有测试", "由后续路径决定", "已有覆盖"],
    ["外层 if(enabled)", "false", "执行外层 else：temp=false", "enabled=false", "已有测试", "false", "已有覆盖"],
    ["if(exists)", "true", "进入第 28 行", "enabled=true, exists=true", "已有测试", "由 line 28 决定", "已有覆盖"],
    ["if(exists)", "false", "进入第 32 行", "enabled=true, exists=false", "已有测试", "由 line 32 决定", "已有覆盖"],
    ["B28-T", "overwrite=true", "第 29 行 temp=true 为绿色", "enabled=true, exists=true, overwrite=true", "已有测试", "true", "已有覆盖"],
    ["B28-F", "overwrite=false", "第 28 行黄色；该 if 没有 else，所以这是 null-else", "enabled=true, exists=true, overwrite=false", "TC1=(T,T,F)", "false", "缺失→新增"],
    ["B32-T", "overwrite=true", "第 33 行 temp=false 为红色", "enabled=true, exists=false, overwrite=true", "TC2=(T,F,T)", "false", "缺失→新增"],
    ["B32-F", "overwrite=false", "第 35 行 temp=true 为绿色", "enabled=true, exists=false, overwrite=false", "已有测试", "true", "已有覆盖"],
    ["反查 B28-F", "TC1", "T→T→F：到达 line 28 后取 false 方向", "Filestore.decideWrite(true,true,false)", "TC1", "false", "已补"],
    ["反查 B32-T", "TC2", "T→F→T：到达 line 32 后取 true 方向并执行 line 33", "Filestore.decideWrite(true,false,true)", "TC2", "false", "已补"]
  ];
  q2a.steps = [
    "先把四个 implementation decisions 的两个方向全部放进同一张表：enabled 的 T/F、exists 的 T/F、line 28 overwrite 的 T/F、line 32 overwrite 的 T/F。这样不会只盯着红色 statement 而漏掉没有语句的 false branch。",
    "处理 line 28 并在同一行填测试。line 29 的 temp=true 是绿色，证明 overwrite=true 已执行；line 28 仍是黄色，证明缺 overwrite=false 的 null-else。要到达这里须 enabled=true、exists=true，所以填 TC1=decideWrite(true,true,false)，expected=false。",
    "处理 line 32 并在同一行填测试。line 35 的 temp=true 是绿色而 line 33 的 temp=false 是红色，所以缺 overwrite=true。要到达这里须 enabled=true、exists=false，所以填 TC2=decideWrite(true,false,true)，expected=false。",
    "最后反查 mapping：B28-F 只由 TC1 覆盖，B32-T 只由 TC2 覆盖。一条执行路径不能同时令 exists=true 和 exists=false，所以两个缺失 branch 不可能由同一条测试覆盖；两条是最小新增集。"
  ];
  q2a.states = [
    state(1, "Filestore 完整 branch TCI→TC 表", "先列外层 enabled 与 exists 的四个 outcome。未分析的 line 28/32 outcome 保留在同一表中等待填写。", branchHeaders, branchRows, 0, 3),
    state(2, "Filestore 完整 branch TCI→TC 表", "用 line 28 黄色和 line 29 绿色定位 B28-F；本步同时在这一行填入到达条件、TC1 与 expected。", branchHeaders, branchRows, 5, 5),
    state(3, "Filestore 完整 branch TCI→TC 表", "用 line 32 黄色、line 33 红色和 line 35 绿色定位 B32-T；本步同时填入 TC2。", branchHeaders, branchRows, 6, 7),
    state(4, "Filestore 完整 branch TCI→TC 表", "在同一张表底部加入双向反查。检查每个缺失 TCI 都指向一条具体 TC，且两条 TC 都指回其唯一目标。", branchHeaders, branchRows, 9, 9)
  ];
  delete q2a.ledger;
  q2a.final = "最小新增集是 TC1：decideWrite(true,true,false)→false，覆盖 line 28 的 false/null-else；TC2：decideWrite(true,false,true)→false，覆盖 line 32 的 true branch 并执行红色 line 33。";
  q2a.check = "TC1 的 exists=true 才能到 line 28；TC2 的 exists=false 才能到 line 32。二者互斥，所以至少需要两条测试。expected 均由规格 oracle enabled∧((¬exists∧¬overwrite)∨(exists∧overwrite)) 验算为 false。";

  const q2b = depth.exam[1].parts[1];
  q2b.steps = [
    "导入 org.testng.Assert 和 org.testng.annotations.Test。Assert 用来比较 actual 与 expected；@Test 让 TestNG 发现并运行方法。",
    "建立 public class FilestoreTest。这里测试的是题面给出的 Filestore.decideWrite(boolean enabled, boolean exists, boolean overwrite)。",
    "写第一条测试：调用 Filestore.decideWrite(true,true,false)，把返回值放入 actual，再断言 actual=false。它覆盖 line 28 的 false/null-else。",
    "写第二条测试：调用 Filestore.decideWrite(true,false,true)，再断言 actual=false。它覆盖 line 32 的 true branch，并使红色 line 33 执行。",
    "每条测试都保留 Arrange/Act/Assert 注释和独立方法名。若失败，报告会直接指出是哪一个缺失 branch 的补测失败，而不是只显示一组匿名参数。"
  ];
  q2b.code = `import org.testng.Assert;
import org.testng.annotations.Test;

public class FilestoreTest {

    @Test
    public void line28FalseNullElse() {
        // Arrange: enabled=true, exists=true 才能到达 line 28。
        // Act: overwrite=false 取得 line 28 的 false/null-else。
        boolean actual = Filestore.decideWrite(true, true, false);

        // Assert: 规格 oracle 的预期结果是 false。
        Assert.assertEquals(actual, false);
    }

    @Test
    public void line32TrueExecutesLine33() {
        // Arrange: enabled=true, exists=false 才能到达 line 32。
        // Act: overwrite=true 取得 line 32 的 true branch。
        boolean actual = Filestore.decideWrite(true, false, true);

        // Assert: line 33 把 temp 设为 false。
        Assert.assertEquals(actual, false);
    }
}`;
  delete q2b.ledger;
  q2b.final = "两条 TestNG 测试均直接调用 Filestore.decideWrite：第一条补 line 28 false/null-else，第二条补 line 32 true 并执行 line 33；两条都断言 expected=false。";
  q2b.check = "代码包含 TestNG imports、public test class、两个 @Test、真实方法调用和 expected assertion；参数顺序均为 enabled、exists、overwrite。";

  /*
   * revision-data.js supplies the page overview cards. Override only the Q2
   * summaries here so the overview and the detailed worked answer agree.
   */
  const summary = window.REVISION_DATA && window.REVISION_DATA.cs608;
  if (summary) {
    summary.learn[2].k = [
      "Statement coverage 不保证每个判定的 true/false；branch coverage 要每个 implementation decision outcome 都发生。",
      "2026 Filestore 的 JaCoCo 已确认：line 28 黄色且 line 29 绿色，缺 line 28 的 false/null-else；line 32 黄色、line 33 红色且 line 35 绿色，缺 line 32 的 true branch。",
      "TestNG 结构：imports、class、@Test、Arrange/Act/Assert、Assert.assertEquals(actual,expected)。"
    ];
    summary.learn[2].c = "能从 2026 源码和 JaCoCo 图推出 TC1=(true,true,false) 与 TC2=(true,false,true)，并写成调用 Filestore.decideWrite 的 TestNG 测试。";
    summary.exam[1].r = "先把 enabled、exists、line 28 overwrite、line 32 overwrite 的 T/F outcome 列全，再用颜色定位缺口：line 28 缺 false/null-else，line 32 缺 true。";
    summary.exam[1].d = "最小新增集：decideWrite(true,true,false)→false 覆盖 line 28 false/null-else；decideWrite(true,false,true)→false 覆盖 line 32 true 并执行红色 line 33。";
    summary.exam[1].w = "两条 branch TC 分别写 path constraint、actual call、expected 和 coverage mapping；TestNG 中用两个独立 @Test 调用 Filestore.decideWrite 并断言 false。";
    summary.exam[1].x = "只看红色 statement 而漏黄色 line 的 null-else；只给输入不写 expected；把规格真值表冒充 implementation branch map；试图用一条测试同时覆盖 exists=true 与 exists=false 的两条路径。";
  }

  /*
   * Q3(a): show what each call reads, changes, and returns.
   * Symbols stay symbolic because the question compares call structures.
   */
  const levelCalls = depth.exam[2].parts[0];
  const levelHeaders = ["方式", "调用序号", "语句", "调用前状态", "读取 / 改变", "返回或观察值"];
  const levelRows = [
    ["static", "1", "准备 x 与 expected", "x 未赋值", "写 x；写 expected", "没有被测结果"],
    ["static", "2", "actual=Level.checkLevel(x)", "x 已知；无 Level 对象", "读取 x；不保存对象状态", "返回 y；actual=y"],
    ["static", "3", "Assert.assertEquals(actual,expected)", "actual=y", "读取 actual 与 expected；不改变状态", "y=expected 时 PASS"],
    ["object", "1", "obj=new Level(x)", "对象不存在", "读取 x；建立 obj.input=x", "obj.result=尚未计算"],
    ["object", "2", "obj.isValid()", "input=x；result=尚未计算", "读取 input；写 obj.result=y", "void"],
    ["object", "3", "actual=obj.getResult()", "obj.result=y", "读取 result；不改变对象", "返回 y；actual=y"],
    ["object", "4", "Assert.assertEquals(actual,expected)", "actual=y；obj.result=y", "读取 actual 与 expected；不改变对象", "y=expected 时 PASS"]
  ];
  levelCalls.steps = [
    "先准备相同的 x 和 expected。两种测试必须比较同一个输入和同一个预期结果。",
    "static 测试调用 Level.checkLevel(x)。方法读取 x，并把返回值 y 直接交给 actual。",
    "static 测试立即比较 actual 与 expected。static 路线没有需要 getter 读取的对象状态。",
    "object 测试调用 new Level(x)。构造器建立 obj，并把 x 保存到对象状态。",
    "object 测试调用 obj.isValid()。它读取 input，写 result，并返回 void。",
    "object 测试调用 obj.getResult()。getter 读取 result，并把 y 返回给 actual。",
    "object 测试比较 actual 与 expected。oracle 在 getter 之后执行。"
  ];
  levelCalls.states = levelCalls.steps.map((_, index) =>
    state(
      index + 1,
      "Level 两种测试方式的完整调用状态表",
      index < 3
        ? `执行 static 路线的第 ${index + 1} 行。`
        : `执行 object 路线的第 ${index - 2} 行。`,
      levelHeaders,
      levelRows,
      index,
      index
    )
  );
  delete levelCalls.ledger;
  levelCalls.final = "static 路线在方法返回后直接比较。object 路线必须依次建立状态、调用 void 方法、用 getter 读取状态，再比较 expected。";
  levelCalls.check = "表中每个调用都说明读取项、状态改变和返回值。isValid() 的 void 结果没有被错误赋给 actual。";

  /*
   * Q4(d): provide a cumulative MTBF record and drawable risk coordinates.
   * Both tables are illustrative calculations, not measured course data.
   */
  const reliability = depth.exam[3].parts[2];
  const mtbfHeaders = ["记录点", "本段 uptime (h)", "累计 uptime (h)", "累计 failure 数", "当前累计 uptime / failures"];
  const mtbfRows = [
    ["Failure 1", "120", "120", "1", "120/1=120 h"],
    ["Failure 2", "190", "310", "2", "310/2=155 h"],
    ["Failure 3", "380", "690", "3", "690/3=230 h"],
    ["Failure 4", "210", "900", "4", "900/4=225 h"],
    ["观察结束", "100", "1000", "4", "1000/4=250 h"]
  ];
  const riskHeaders = ["投入级别 x", "Testing cost", "Pr(failure)", "Failure cost", "Expected failure cost", "Total cost"];
  const riskRows = [
    ["0", "0", "0.30", "1000", "0.30×1000=300", "300"],
    ["1", "25", "0.18", "1000", "0.18×1000=180", "205"],
    ["2", "50", "0.11", "1000", "0.11×1000=110", "160"],
    ["3", "75", "0.07", "1000", "0.07×1000=70", "145（最低）"],
    ["4", "100", "0.05", "1000", "0.05×1000=50", "150"],
    ["5", "125", "0.04", "1000", "0.04×1000=40", "165"]
  ];
  reliability.steps = [
    "先固定 operational profile、failure 定义和恢复规则。只有实际运行 uptime 进入分子。",
    "记录四次 failure。每次都保存本段 uptime、累计 uptime 和累计 failure 数。",
    "观察在 1000 小时结束。累计有 4 次 failure，所以简化 MTBF=1000/4=250 小时。",
    "若 failure 数为 0，不计算除法，也不写 MTBF=∞。只报告运行时长、profile 和零次观察。",
    "画风险图时设横轴为 testing expenditure。下表给出一组规范化示例坐标，不是实测数据。",
    "对每个投入点计算 Expected failure cost=Pr(failure)×Failure cost，再加 Testing cost。",
    "在同一坐标系画 Testing cost、Expected failure cost 和 Total cost。示例的 Total cost 在 x=3 最低。"
  ];
  reliability.states = [
    state(1, "MTBF 累计运行记录", "定义 profile、failure 和恢复规则。记录行暂待处理。", mtbfHeaders, mtbfRows, 0, -1),
    state(2, "MTBF 累计运行记录", "按发生顺序填四次 failure。累计 uptime 只加实际运行时间。", mtbfHeaders, mtbfRows, 0, 3),
    state(3, "MTBF 累计运行记录", "加入最后 100 小时无故障观察，并用 1000/4 得到 250 小时。", mtbfHeaders, mtbfRows, 4, 4),
    state(4, "MTBF 累计运行记录", "检查分母。若累计 failure 数为 0，停止计算并报告观察条件。", mtbfHeaders, mtbfRows, 4, 4),
    state(5, "风险投入图的可绘制坐标", "建立 x=0..5 的横轴。逐点给 Testing cost、概率和固定 Failure cost。", riskHeaders, riskRows, 0, -1),
    state(6, "风险投入图的可绘制坐标", "逐行计算 Expected failure cost 和 Total cost。", riskHeaders, riskRows, 0, 5),
    state(7, "风险投入图的可绘制坐标", "连接三组纵坐标。标出 Total cost 最低点 x=3。", riskHeaders, riskRows, 3, 5)
  ];
  delete reliability.ledger;
  reliability.final = "示例运行记录给出 MTBF=250 小时。风险坐标显示 Testing cost 上升、Expected failure cost 下降，Total cost 在 x=3 达到示例最低值 145。";
  reliability.check = "190+120=310，310+380=690，690+210=900，900+100=1000。风险表每行满足 Total cost=Testing cost+Expected failure cost。坐标只说明画法，不冒充实测数据。";
})();
