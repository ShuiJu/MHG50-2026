(() => {
  "use strict";

  const depth = window.REVISION_DEPTH;
  if (!depth || !depth.cs603 || !depth.cs605) return;

  const findExample = (course, title) => {
    for (const unit of depth[course].learn || []) {
      const match = [unit.example, ...(unit.extraExamples || [])]
        .find(example => example && example.title === title);
      if (match) return match;
    }
    return null;
  };

  const findPart = (course, label, askText) => {
    for (const question of depth[course].exam || []) {
      const match = (question.parts || []).find(part =>
        part.label === label && (!askText || part.ask.includes(askText))
      );
      if (match) return match;
    }
    return null;
  };

  const statesFromRows = (title, headers, rows, operations) =>
    operations.map((operation, index) => ({
      after: index + 1,
      title,
      operation,
      headers,
      currentRow: index,
      rows: rows.map((cells, rowIndex) => ({
        cells,
        status: rowIndex <= index ? "done" : "pending"
      }))
    }));

  const applyProcess = (owner, config) => {
    if (!owner) return;
    owner.steps = config.steps;
    owner.stepLabel = "证明步骤";
    owner.states = statesFromRows(
      config.title,
      config.headers,
      config.rows,
      config.operations
    );
    delete owner.ledger;
    delete owner.showLedgerAfterStates;
    if (config.given) owner.given = config.given;
    if (config.target) owner.target = config.target;
    if (config.ask) owner.ask = config.ask;
    if (config.result) owner.result = config.result;
    if (config.final) owner.final = config.final;
    if (config.check) owner.check = config.check;
  };

  const truthConfig = {
    ask: "用真值表证明 p∨¬p ≡ ((p∧q)→p)。",
    title: "同一组 p、q 赋值下的完整真值表",
    headers: ["行", "p", "q", "¬p", "p∨¬p", "p∧q", "(p∧q)→p", "比较"],
    rows: [
      ["1", "T", "T", "F", "T", "T", "T", "T=T"],
      ["2", "T", "F", "F", "T", "F", "T", "T=T"],
      ["3", "F", "T", "T", "T", "F", "T", "T=T"],
      ["4", "F", "F", "T", "T", "F", "T", "T=T"]
    ],
    steps: [
      "第 1 行取 p=T、q=T。先算 ¬p=F，所以 p∨¬p=T；再算 p∧q=T，所以 (p∧q)→p 是 T→T=T。两式同为 T。",
      "第 2 行取 p=T、q=F。¬p=F，所以 p∨¬p=T；p∧q=F，所以 (p∧q)→p 是 F→T=T。两式同为 T。",
      "第 3 行取 p=F、q=T。¬p=T，所以 p∨¬p=T；p∧q=F，所以 (p∧q)→p 是 F→F=T。两式同为 T。",
      "第 4 行取 p=F、q=F。¬p=T，所以 p∨¬p=T；p∧q=F，所以 (p∧q)→p 是 F→F=T。两式同为 T。"
    ],
    operations: [
      "填第 1 行：在同一行依次计算 ¬p、析取、合取、蕴含，最后比较两条最终结果。",
      "填第 2 行：保持 p=T，只把 q 改为 F；重新计算所有依赖 q 的格，再比较。",
      "填第 3 行：把 p 改为 F、q 改回 T；重新计算 ¬p、两式和比较格。",
      "填第 4 行：取 p=F、q=F；完成最后一种赋值并逐行核对两条最终结果列。"
    ],
    result: "四种 p、q 赋值下，p∨¬p 与 (p∧q)→p 的结果都逐行相同，且都为 T。因此 p∨¬p ≡ ((p∧q)→p)。",
    final: "同一张四行表中，两条最终结果列逐行都是 T，所以 p∨¬p 与 ((p∧q)→p) 逻辑等价。",
    check: "表中恰好包含 p、q 的四种赋值；每一行都计算 ¬p、p∨¬p、p∧q 和 (p∧q)→p，并在最后一列直接比较。没有引入题目中不存在的变量 r。"
  };

  applyProcess(findExample("cs603", "逐行检查 (p∧q)→p"), truthConfig);
  applyProcess(findPart("cs603", "(b)", "真值表"), truthConfig);

  const copyLoopConfig = {
    title: "数组复制循环的完整 Hoare 证明表",
    headers: [
      "证明行",
      "程序位置或语句",
      "使用规则",
      "执行前断言",
      "本行怎样得到",
      "执行后断言"
    ],
    rows: [
      [
        "1",
        "选择循环不变量",
        "规格展开",
        "n=a.Length ∧ n≥0",
        "定义 I≜0≤i≤n ∧ b.Length=n ∧ ∀k(0≤k<i→b[k]=a[k])",
        "目标变成：初始化建立 I，循环体保持 I，退出推出后置条件"
      ],
      [
        "2",
        "b:=new int[n]",
        "Allocation",
        "n=a.Length ∧ n≥0",
        "新数组长度按分配大小设为 n",
        "b.Length=n ∧ n≥0"
      ],
      [
        "3",
        "i:=0",
        "Assignment",
        "b.Length=n ∧ n≥0",
        "把 I 中每个 i 换成 0。范围 0≤k<0 为空",
        "I[0/i]，即 0≤0≤n ∧ b.Length=n ∧ ∀k(0≤k<0→b[k]=a[k])"
      ],
      [
        "4",
        "while 入口，假设 i<n",
        "While",
        "I ∧ i<n",
        "由 0≤i 和 i<n 得 0≤i<n，所以 a[i]、b[i] 都可访问",
        "I ∧ 0≤i<n"
      ],
      [
        "5",
        "b[i]:=a[i]",
        "Array assignment",
        "I ∧ 0≤i<n",
        "旧前缀 0..i−1 不变。赋值使新位置 i 满足 b[i]=a[i]",
        "0≤i<n ∧ b.Length=n ∧ ∀k(0≤k<i+1→b[k]=a[k])"
      ],
      [
        "6",
        "i:=i+1",
        "Assignment + Sequence",
        "0≤i<n ∧ b.Length=n ∧ ∀k(0≤k<i+1→b[k]=a[k])",
        "把新 i 定义为旧 i+1。旧 i<n 给出新 i≤n",
        "I 对新 i 再次成立"
      ],
      [
        "7",
        "while 退出",
        "While + Consequence",
        "I ∧ ¬(i<n)",
        "I 给 i≤n。¬(i<n) 给 i≥n。因此 i=n。把 i=n 代入前缀条件",
        "∀k(0≤k<n→b[k]=a[k])"
      ],
      [
        "8",
        "终止性",
        "Variant",
        "I ∧ i<n，V=n−i",
        "guard 为真时 V≥1。每轮 i 加 1，所以 V' = V−1",
        "V 非负且严格减小，循环终止"
      ]
    ],
    steps: [
      "先写循环不变量 I。I 必须同时记录索引范围、数组长度和已经复制的前缀。",
      "执行数组分配。Allocation 规则只建立 b.Length=n，还没有建立 i 的信息。",
      "执行 i:=0。把不变量中的 i 换成 0，并逐项检查替换后的式子。",
      "进入循环体。把不变量 I 和 guard i<n 合并，证明本轮数组访问合法。",
      "执行 b[i]:=a[i]。保留旧前缀，并把位置 i 加入已经复制的前缀。",
      "执行 i:=i+1。用赋值规则把旧 i+1 读作新 i，恢复同一个不变量 I。",
      "循环退出。把 I 与 guard 的否定合并，推出 i=n，再得到完整复制。",
      "最后证明终止。variant n−i 在每轮减少 1，并且在 guard 为真时为正。"
    ],
    operations: [
      "新增证明行 1：只定义本次证明一直使用的 I，不执行程序。",
      "新增证明行 2：对 b 执行 Allocation，写出分配前后改变的事实。",
      "新增证明行 3：对 i:=0 做文字替换，并检查空前缀。",
      "新增证明行 4：把 I 与 guard 合并，得到合法索引范围。",
      "新增证明行 5：把位置 i 加入已复制前缀，其他位置不变。",
      "新增证明行 6：更新 i，并把 i<n 改写成更新后的 i≤n。",
      "新增证明行 7：用 ¬(i<n) 与 i≤n 得到 i=n，再代入 I。",
      "新增证明行 8：单独计算 V'=n−(i+1)=V−1。"
    ],
    given: "程序为 b:=new int[n]; i:=0; while i<n { b[i]:=a[i]; i:=i+1 }，其中 n=a.Length。",
    target: "逐条使用 Allocation、Assignment、Sequence、While 和 Consequence，并证明循环终止。",
    result: "初始化建立 I。循环体保持 I。退出时 I 推出 b 是 a 的完整副本。variant n−i 证明循环终止。",
    final: "表中逐行建立并保持不变量。退出时 i=n，所以所有下标都已复制。variant n−i 每轮减 1，因此程序完全正确。",
    check: "每条程序语句都有执行前断言、所用规则、具体操作和执行后断言。"
  };

  applyProcess(
    findExample("cs603", "数组复制循环：把每条 Hoare 规则真正用上来（题 1d 的解法骨架）"),
    copyLoopConfig
  );
  applyProcess(findPart("cs603", "(d)(e)", "复制循环"), copyLoopConfig);

  const reverseConfig = {
    title: "ReverseArray：同一张表逐步更新数组、指针和证明",
    headers: [
      "行",
      "当前语句",
      "执行前状态",
      "本行操作",
      "执行后状态",
      "不变量与 variant"
    ],
    rows: [
      ["1", "初始化", "a=[a,b,c,d,e]", "令 i=0，j=4", "a=[a,b,c,d,e], i=0, j=4", "已完成区为空；V=j−i=4"],
      ["2", "检查 i<j", "i=0, j=4", "比较 0<4，结果为真", "进入第 1 轮", "访问 0 和 4 合法；V=4"],
      ["3", "交换 a[i],a[j]", "[a,b,c,d,e], i=0, j=4", "保存 a[0]；a[0]←a[4]；a[4]←保存值", "[e,b,c,d,a], i=0, j=4", "索引 0 和 4 已等于旧数组的镜像"],
      ["4", "i:=i+1; j:=j−1", "i=0, j=4", "i 加 1；j 减 1", "i=1, j=3", "已完成区为 k<1 或 k>3；V=2"],
      ["5", "检查 i<j", "i=1, j=3", "比较 1<3，结果为真", "进入第 2 轮", "访问 1 和 3 合法；V=2"],
      ["6", "交换 a[i],a[j]", "[e,b,c,d,a], i=1, j=3", "保存 a[1]；a[1]←a[3]；a[3]←保存值", "[e,d,c,b,a], i=1, j=3", "索引 0、1、3、4 已等于旧数组的镜像"],
      ["7", "i:=i+1; j:=j−1", "i=1, j=3", "i 加 1；j 减 1", "i=2, j=2", "已完成区为 k<2 或 k>2；V=0"],
      ["8", "检查 i<j 并退出", "i=2, j=2", "比较 2<2，结果为假。中央位置 2 不需要交换", "[e,d,c,b,a]", "已完成区加中央点覆盖全部下标"]
    ],
    steps: [
      "初始化两个指针。i 指向左端，j 指向右端。此时还没有元素完成反转。",
      "检查第 1 轮 guard。0<4 为真，所以本轮可以访问 a[0] 和 a[4]。",
      "执行第一次交换。表中依次显示保存、写左端和写右端三个动作。",
      "更新两个指针。i 从 0 变成 1，j 从 4 变成 3，variant 从 4 变成 2。",
      "检查第 2 轮 guard。1<3 为真，所以本轮可以访问 a[1] 和 a[3]。",
      "执行第二次交换。数组变成 [e,d,c,b,a]。",
      "再次更新指针。i=2，j=2，variant 变成 0。",
      "最后检查 guard。2<2 为假，所以退出。中央元素已经在正确位置。"
    ],
    operations: [
      "填初始化行。只建立 i、j、数组和 V 的初始值。",
      "填 guard 行。明确写出比较式 0<4 及其结果。",
      "填交换行。记录交换的两个下标，并展示交换后的完整数组。",
      "填指针更新行。分别计算新 i、新 j 和新 V。",
      "填第二次 guard 行。明确写出比较式 1<3 及其结果。",
      "填第二次交换行。记录下标 1、3 的交换和完整数组。",
      "填第二次指针更新行。分别计算新 i、新 j 和新 V。",
      "填退出行。guard 为假，并说明中央下标为何无需交换。"
    ],
    given: "取 n=5，初始数组 [a,b,c,d,e]，i=0，j=4。",
    target: "展示每次 guard、交换和指针更新，并检查镜像不变量与终止性。",
    result: "数组最终为 [e,d,c,b,a]。每次交换都建立一对镜像位置。variant j−i 从 4 到 2，再到 0。",
    final: "表中显示了每次 guard、交换和指针更新。退出时全部下标满足 a[k]=old(a[n−1−k])。",
    check: "每个交换动作都给出具体下标和完整数组。每个指针更新都重新计算 variant。"
  };

  applyProcess(findExample("cs603", "ReverseArray 的不变量分别负责什么"), reverseConfig);
  applyProcess(findPart("cs603", "(b)", "ReverseArray"), reverseConfig);

  const cflClassicConfig = {
    title: "0ⁿ1ⁿ2ⁿ：完整分割情况表",
    headers: [
      "证明行",
      "v、y 的位置",
      "选择 i",
      "本步怎样改字符串",
      "pump 后的计数",
      "失败原因"
    ],
    rows: [
      ["1", "尚未分类", "—", "选 w=0ᵖ1ᵖ2ᵖ", "(#0,#1,#2)=(p,p,p)", "w∈L"],
      ["2", "窗口 vxy", "—", "|vxy|≤p，所以窗口不能同时跨过 0/1 和 1/2 两个边界", "仍为 (p,p,p)", "只需检查五类位置"],
      ["3", "v、y 只含 0", "0", "删除 v 和 y 中至少一个 0", "(p−s,p,p)，s>0", "三个计数不相等"],
      ["4", "v、y 只含 1", "0", "删除 v 和 y 中至少一个 1", "(p,p−s,p)，s>0", "三个计数不相等"],
      ["5", "v、y 只含 2", "0", "删除 v 和 y 中至少一个 2", "(p,p,p−s)，s>0", "三个计数不相等"],
      ["6", "v、y 位于 0/1 边界附近", "0", "删除 s₀ 个 0 和 s₁ 个 1，且 s₀+s₁>0", "(p−s₀,p−s₁,p)", "#2 不变，至少另一个计数改变"],
      ["7", "v、y 位于 1/2 边界附近", "0", "删除 s₁ 个 1 和 s₂ 个 2，且 s₁+s₂>0", "(p,p−s₁,p−s₂)", "#0 不变，至少另一个计数改变"]
    ],
    steps: [
      "反设 L={0ⁿ1ⁿ2ⁿ:n≥0} 是 CFL。取 pumping length p，并选 w=0ᵖ1ᵖ2ᵖ。",
      "使用 |vxy|≤p。窗口长度不够跨过两个边界，所以所有合法分割只属于表中的五类。",
      "处理 v、y 只含 0 的情况。取 i=0，删除的 0 总数记为 s>0。",
      "处理 v、y 只含 1 的情况。取 i=0，删除的 1 总数记为 s>0。",
      "处理 v、y 只含 2 的情况。取 i=0，删除的 2 总数记为 s>0。",
      "处理靠近 0/1 边界的情况。取 i=0，并分别记录删除的 0 和 1。",
      "处理靠近 1/2 边界的情况。取 i=0，并分别记录删除的 1 和 2。"
    ],
    operations: [
      "填设置行：写出 w 以及 pump 前的三个计数。",
      "填窗口限制行：用长度 p 排除同时跨两个边界。",
      "填“只含 0”行：删除 v、y，并写出新计数。",
      "填“只含 1”行：删除 v、y，并写出新计数。",
      "填“只含 2”行：删除 v、y，并写出新计数。",
      "填“0/1 边界”行：分别记录 s₀、s₁，不能只写“数量改变”。",
      "填“1/2 边界”行：分别记录 s₁、s₂，并与未变的 #0 比较。"
    ],
    given: "反设 L={0ⁿ1ⁿ2ⁿ:n≥0} 是 CFL。令 p 为 pumping length，选择 w=0ᵖ1ᵖ2ᵖ。",
    target: "覆盖每一个满足 |vxy|≤p、|vy|>0 的分割，并给出同一张完整情况表。",
    result: "五类位置覆盖全部合法分割。每类取 i=0 后至少一个计数改变，另一个计数保持 p，所以 pump 后不在 L。",
    check: "表中没有假定具体的 v 或 y。s、s₀、s₁、s₂ 表示对手分割产生的未知正计数。"
  };

  applyProcess(findExample("cs605", "用 CFL Pumping Lemma 处理 0ⁿ1ⁿ2ⁿ"), cflClassicConfig);

  const binaryCflConfig = {
    title: "2026 Q1(b)：完整分割分类与操作表",
    headers: [
      "证明行",
      "b、d 的位置",
      "选择 i",
      "本行对字符串做什么",
      "pump 后比较",
      "为什么不在语言"
    ],
    rows: [
      ["1", "设置", "—", "选 W=1ᵖ0ᵖ⁺¹<1ᵖ0ᵖ1", "左右同长，右边最后一位为 1", "W 中 left<right"],
      ["2", "任意合法分割", "—", "令 W=abcde，满足 |bcd|≤p、|bd|>0", "b、d 至少一个非空", "必须覆盖后续全部位置"],
      ["3", "b、d 都在 < 左侧", "2", "各复制一份 b、d，只增加左数长度", "左数更长，右数长度不变", "以 1 开头的更长左数大于右数"],
      ["4", "b、d 都在 < 右侧", "0", "删除 b、d，只减少右数长度", "左数长度不变，右数更短", "右数小于左数"],
      ["5", "b 或 d 含有 <", "0 或 2", "删除含 < 的段，或复制含 < 的段", "分隔符变成 0 个或至少 2 个", "格式不再是一个 left<right"],
      ["6", "< 位于 c；b=0ᵅ，d=1ᵝ；α>β", "2", "左边新增 α 位，右边新增 β 位", "左边增加更多，最终更长", "left<right 失败"],
      ["7", "< 位于 c；b=0ᵅ，d=1ᵝ；α<β", "0", "左边删除 α 位，右边删除 β 位", "右边减少更多，最终更短", "left<right 失败"],
      ["8", "< 位于 c；b=0ᵅ，d=1ᵝ；α=β>0", "0", "两边删除相同位数", "两边仍同长；第一处不同位变成左 1、右 0", "左数大于右数"]
    ],
    steps: [
      "反设语言是 CFL。令 p 为 pumping length，并选择 W=1ᵖ0ᵖ⁺¹<1ᵖ0ᵖ1。",
      "让对手任选 W=abcde。只使用 |bcd|≤p 和 |bd|>0，不指定 b、d 的具体长度。",
      "处理 b、d 都在分隔符左侧的情况。取 i=2，只让左数增加。",
      "处理 b、d 都在分隔符右侧的情况。取 i=0，只让右数缩短。",
      "处理 b 或 d 自己含分隔符的情况。删除或复制该段会破坏输入格式。",
      "处理分隔符在 c 中且 α>β 的情况。取 i=2，并比较两边新增的位数。",
      "处理分隔符在 c 中且 α<β 的情况。取 i=0，并比较两边删除的位数。",
      "处理分隔符在 c 中且 α=β>0 的情况。取 i=0，再比较同长二进制串的第一处不同位。"
    ],
    operations: [
      "填设置行：先验证 W 的左右长度和最后一位。",
      "填任意分割行：记录 lemma 给对手的两个限制。",
      "填左侧行：只复制左数中的 b、d，并比较 pump 后长度。",
      "填右侧行：只删除右数中的 b、d，并比较 pump 后长度。",
      "填分隔符行：明确计算分隔符个数怎样改变。",
      "填 α>β 行：把新增位数写成左 α、右 β。",
      "填 α<β 行：把删除位数写成左 α、右 β。",
      "填 α=β 行：长度相同不能结束证明，继续比较第一处不同位。"
    ],
    given: "语言由恰有一个分隔符的二进制串 left<right 构成，并要求 left 的数值严格小于 right。",
    target: "用 CFL pumping lemma 覆盖 b、d 的全部合法位置。每类必须显示选择 i 后对字符串做的操作。",
    final: "表中各行覆盖全部合法分割。每一类都有一个 i 使 pump 后字符串格式错误或不再满足 left<right。因此该语言不是 CFL。",
    check: "跨分隔符情况已分成 α>β、α<β、α=β 三行。相等情况没有只靠长度下结论。"
  };

  applyProcess(findPart("cs605", "1(b)", "非 CFL"), binaryCflConfig);

  const eventBConfig = {
    title: "Event-B：前态经过事件后怎样满足不变量",
    headers: [
      "证明行",
      "事件",
      "前态与已知条件",
      "Guard 检查",
      "Action",
      "后态",
      "Invariant PO"
    ],
    rows: [
      [
        "1",
        "INITIALISATION",
        "CAP=10；count 尚未初始化",
        "初始化事件没有业务 guard",
        "count:=0",
        "count'=0",
        "检查 0≤0≤10，成立"
      ],
      [
        "2",
        "Enter：检查 guard",
        "0≤count≤10",
        "count<CAP，即 count<10",
        "尚未执行",
        "仍是旧 count",
        "guard 给 count≤9，为上界证明准备条件"
      ],
      [
        "3",
        "Enter：执行 action",
        "0≤count≤10 ∧ count<10",
        "已通过",
        "count:=count+1",
        "count'=count+1",
        "下界：count≥0，所以 count'≥1≥0"
      ],
      [
        "4",
        "Enter：完成 PO",
        "count<10",
        "已通过",
        "使用 count'=count+1",
        "count'≤10",
        "上界：整数 count<10 给 count≤9，所以 count+1≤10"
      ],
      [
        "5",
        "Exit：检查 guard",
        "0≤count≤10",
        "count>0",
        "尚未执行",
        "仍是旧 count",
        "guard 给 count≥1，为下界证明准备条件"
      ],
      [
        "6",
        "Exit：执行 action",
        "0≤count≤10 ∧ count>0",
        "已通过",
        "count:=count−1",
        "count'=count−1",
        "下界：count≥1，所以 count'≥0"
      ],
      [
        "7",
        "Exit：完成 PO",
        "count≤10",
        "已通过",
        "使用 count'=count−1",
        "count'≤9≤10",
        "上下界都成立，所以 Exit 保持不变量"
      ],
      [
        "8",
        "边界检查",
        "count=10 或 count=0",
        "count=10 时 Enter guard 假；count=0 时 Exit guard 假",
        "禁用的事件不执行",
        "状态不变",
        "两个越界动作都被 guard 阻止"
      ]
    ],
    steps: [
      "先检查 INITIALISATION。把 count:=0 的后态代入不变量 0≤count≤10。",
      "检查 Enter 的 guard。只有 count<10 时，Enter 才能执行。",
      "执行 Enter action。把后态写成 count'=count+1，并先证明下界。",
      "继续证明 Enter 后态的上界。使用整数事实 count<10 推出 count≤9。",
      "检查 Exit 的 guard。只有 count>0 时，Exit 才能执行。",
      "执行 Exit action。把后态写成 count'=count−1，并先证明下界。",
      "继续证明 Exit 后态的上界。旧 count≤10，所以新 count≤9。",
      "最后检查两个边界。guard 会在 count=10 阻止 Enter，在 count=0 阻止 Exit。"
    ],
    operations: [
      "填初始化行：执行 count:=0，并把 0 代入不变量两边。",
      "填 Enter guard 行：保留前态，新增条件 count<10。",
      "填 Enter action 行：把旧 count 加 1，得到带撇号的后态 count'。",
      "填 Enter PO 行：用 guard 提供的严格上界证明 count'≤10。",
      "填 Exit guard 行：保留前态，新增条件 count>0。",
      "填 Exit action 行：把旧 count 减 1，得到后态 count'。",
      "填 Exit PO 行：分别检查 count' 的下界和上界。",
      "填边界行：不执行 action，只检查 guard 的真假。"
    ],
    given: "CAP=10。machine 变量 count 满足不变量 0≤count≤CAP。Enter 增加 count，Exit 减少 count。",
    target: "逐行显示前态、guard、action、后态，以及后态怎样满足同一个不变量。",
    result: "INITIALISATION 建立不变量。Enter 和 Exit 在各自 guard 下保持不变量。边界状态会禁用可能越界的事件。",
    final: "表中给出了 INITIALISATION、Enter 和 Exit 的前态、guard、action、后态和 invariant-preservation PO。",
    check: "撇号 count' 始终表示 action 后的值。证明没有把前态 count 与后态 count' 混在一起。"
  };

  applyProcess(findExample("cs603", "一个容量为 10 的房间计数器"), eventBConfig);
  applyProcess(findPart("cs603", "(a)", "Event-B"), eventBConfig);

  const dovetailLearnConfig = {
    title: "Dovetail：每轮新增输入并让所有活动模拟走一步",
    headers: [
      "轮次",
      "本轮新增输入",
      "本轮开始时的活动模拟",
      "本轮操作",
      "本轮结束时的累计步数",
      "本轮决定"
    ],
    rows: [
      [
        "1",
        "w₁=ε",
        "M(ε)",
        "让 M(ε) 执行第 1 步",
        "ε:1",
        "未接受，进入下一轮"
      ],
      [
        "2",
        "w₂=a",
        "M(ε), M(a)",
        "M(ε) 再走 1 步；M(a) 走第 1 步",
        "ε:2；a:1",
        "未接受，进入下一轮"
      ],
      [
        "3",
        "w₃=b",
        "M(ε), M(a), M(b)",
        "三个模拟各走 1 步；M(a) 在累计第 2 步接受",
        "ε:3；a:2；b:1",
        "立即接受 ⟨M⟩"
      ],
      [
        "4",
        "不会执行",
        "—",
        "第 3 轮已经接受，所以不再运行",
        "保持上一行",
        "recogniser 已停机"
      ]
    ],
    steps: [
      "第 1 轮加入输入 ε，并让 M(ε) 只执行一步。不要等待它停机。",
      "第 2 轮加入输入 a。让旧模拟 M(ε) 和新模拟 M(a) 各执行一步。",
      "第 3 轮加入输入 b。三个活动模拟各执行一步。此时 M(a) 累计执行两步并接受。",
      "M(a) 接受后，recogniser 立即接受 ⟨M⟩。后续轮次不再执行。"
    ],
    operations: [
      "新增第 1 个模拟，并把它的累计步数从 0 改成 1。",
      "新增第 2 个模拟。两个模拟各加 1 个执行步。",
      "新增第 3 个模拟。三个模拟各加 1 个执行步，并检查 accept 状态。",
      "记录停止条件。该行不再推进任何模拟。"
    ],
    given: "按 ε,a,b,… 枚举输入。示例中 M(ε) 一直运行，M(a) 在第 2 个执行步接受，M(b) 在第 1 步拒绝。",
    target: "显示 recogniser 的具体轮次。任何单个模拟都不能独占运行时间。",
    result: "第 3 轮检测到 M(a) 接受，所以 recogniser 接受。M(ε) 永不停止也不会阻塞其他模拟。",
    check: "第 t 轮只让每个活动模拟多走一步。输入 wⱼ 在第 t 轮后的累计步数为 t−j+1。"
  };

  applyProcess(findExample("cs605", "识别 TM 语言是否非空"), dovetailLearnConfig);

  const dovetailExamConfig = {
    title: "L2B recogniser：通用 dovetail 调度表",
    headers: [
      "轮次",
      "新增模拟",
      "本轮活动模拟",
      "本轮对每个模拟做什么",
      "轮末累计步数",
      "接受检查"
    ],
    rows: [
      ["1", "M(w₁)", "M(w₁)", "执行 1 步", "w₁:1", "若接受则接受；否则继续"],
      ["2", "M(w₂)", "M(w₁), M(w₂)", "每个执行 1 步", "w₁:2；w₂:1", "任一个接受就接受"],
      ["3", "M(w₃)", "M(w₁), M(w₂), M(w₃)", "每个执行 1 步", "w₁:3；w₂:2；w₃:1", "任一个接受就接受"],
      ["t", "M(wₜ)", "M(w₁),…,M(wₜ)", "每个尚未停机的模拟执行 1 步", "wⱼ:t−j+1 步", "任一个接受就接受"],
      ["no 情况", "持续新增", "持续调度", "没有模拟进入 accept", "轮次无限增加", "可以永远运行，这是 recogniser 允许的行为"]
    ],
    steps: [
      "按长度和字典序枚举所有输入 w₁,w₂,…。第 1 轮启动 M(w₁) 并执行一步。",
      "第 2 轮启动 M(w₂)。让 M(w₁) 和 M(w₂) 各执行一步。",
      "第 3 轮启动 M(w₃)。让三个活动模拟各执行一步。",
      "一般地，第 t 轮启动 M(wₜ)，再让每个尚未停机的模拟执行一步。",
      "每轮结束检查 accept。若 L(M) 为空，所有轮次都不接受，recogniser 可以一直运行。"
    ],
    operations: [
      "填第 1 轮：创建一个配置快照，并执行一次 TM transition。",
      "填第 2 轮：保留旧快照，新增 w₂ 的初始配置，然后各推进一步。",
      "填第 3 轮：新增 w₃，并把三个累计步数分别更新为 3、2、1。",
      "填一般轮：把第 j 个模拟的累计步数写成 t−j+1。",
      "填 no 情况：没有 accept 时继续调度，不错误地写 reject。"
    ],
    given: "输入是 TM 编码 ⟨M⟩。枚举其输入字母表上的所有字符串 w₁,w₂,…。",
    target: "构造一个且仅当存在某个 w 使 M(w) 接受时才接受的 recogniser。",
    final: "若 L(M) 非空，某个 M(wⱼ) 会在有限 s 步内接受。到第 j+s−1 轮，它已获得 s 步并被发现。若 L(M) 为空，recogniser 永不误接受。",
    check: "调度表没有先完整运行 M(w₁)。每个已启动且未停机的模拟在之后每轮都获得一步。"
  };

  applyProcess(findPart("cs605", "2(b)", "recogniser"), dovetailExamConfig);

  const productGraphConfig = {
    title: "Product graph：queue 与 visited 的逐轮变化",
    headers: [
      "轮次",
      "取出前 queue",
      "本轮取出",
      "本轮沿哪条边计算",
      "本轮加入 visited",
      "轮末 queue",
      "接受奇长度检查"
    ],
    rows: [
      [
        "建图",
        "—",
        "—",
        "把每个 q 复制为 (q,E)、(q,O)；读一个符号就翻转 E/O",
        "尚未搜索",
        "尚未搜索",
        "目标反例状态是 (q_accept,O)"
      ],
      [
        "初始化",
        "[]",
        "—",
        "建立初始 product state (q₀,E)",
        "{(q₀,E)}",
        "[(q₀,E)]",
        "q₀ 接受但 parity=E，不是反例"
      ],
      [
        "1",
        "[(q₀,E)]",
        "(q₀,E)",
        "读 a：δ(q₀,a)=q₁；E 翻成 O",
        "(q₁,O)",
        "[(q₁,O)]",
        "q₁ 不接受，不是反例"
      ],
      [
        "2",
        "[(q₁,O)]",
        "(q₁,O)",
        "读 a：δ(q₁,a)=q₀；O 翻成 E",
        "无；(q₀,E) 已访问",
        "[]",
        "没有发现 (q_accept,O)"
      ],
      [
        "结束",
        "[]",
        "—",
        "queue 为空，BFS 结束",
        "visited={(q₀,E),(q₁,O)}",
        "[]",
        "本示例的接受串全是偶长度"
      ]
    ],
    steps: [
      "建立 product state (q,parity)。示例 FA 有 q₀、q₁，字母表 {a}，q₀ 是唯一接受状态。",
      "初始化 queue 和 visited。两者先只含 (q₀,E)。",
      "第 1 轮取出 (q₀,E)。沿 a 边到 q₁，并把 parity 从 E 翻成 O。",
      "第 2 轮取出 (q₁,O)。沿 a 边回到 (q₀,E)。该状态已访问，所以不重复入队。",
      "queue 为空后结束。visited 中没有接受状态配 O，所以示例 FA 不接受奇长度串。"
    ],
    operations: [
      "定义 product graph。该步只给节点和边规则，不改 queue。",
      "把 (q₀,E) 同时加入 queue 与 visited。",
      "从 queue 删除队首，计算一个后继，并把新状态加入 queue 与 visited。",
      "从 queue 删除队首。后继已在 visited，所以本轮不入队。",
      "检查 queue 为空，再扫描是否访问过任何 (q_accept,O)。"
    ],
    given: "具体演示：Q={q₀,q₁}，Σ={a}，δ(q₀,a)=q₁，δ(q₁,a)=q₀，初态和唯一接受态都是 q₀。",
    target: "逐轮显示 BFS 怎样更新 queue 和 visited，再说明通用 decider 的接受条件。",
    result: "示例只访问 (q₀,E) 和 (q₁,O)。通用算法若访问到任一 (q_accept,O) 就 reject；queue 清空仍未发现则 accept。",
    check: "一个 product state 只在首次发现时入队。有限图最多有 2|Q| 个状态，所以 BFS 必定结束。"
  };

  const productUnit = depth.cs605.learn[0];
  if (productUnit && !findExample("cs605", "Product graph 的 queue 与 visited")) {
    const productExample = {
      title: "Product graph 的 queue 与 visited",
      prompt: "检查一个 FA 是否只接受偶长度字符串。",
      steps: [],
      result: ""
    };
    productUnit.extraExamples = [...(productUnit.extraExamples || []), productExample];
    applyProcess(productExample, productGraphConfig);
  }

  const productExamConfig = {
    ...productGraphConfig,
    steps: [
      "把 M 的每个状态 q 复制成 (q,E) 和 (q,O)。读真实输入符号时翻转 E/O；ε 边不翻转。",
      "用 (q₀,E) 初始化 queue 和 visited。表中的两状态 FA 用来展示真实的队列操作。",
      "第 1 轮弹出 (q₀,E)。沿 a 边生成 (q₁,O)，首次发现所以加入 queue 和 visited。",
      "第 2 轮弹出 (q₁,O)。后继 (q₀,E) 已访问，所以不重复入队。",
      "queue 清空时检查结果。通用算法发现 (q_accept,O) 就 reject，否则 accept。"
    ],
    operations: [
      "建立所有 (q,parity) 节点和 product edge 规则。",
      "把初始 product state 同时加入 queue 与 visited。",
      "弹出队首，计算后继，并只把未访问状态加入两个集合。",
      "再次弹出队首。识别重复状态，不重复入队。",
      "queue 为空时结束 BFS，并执行通用的奇长度接受状态检查。"
    ],
    final: "在至多 2|Q| 个 product states 上运行 BFS。若可达某个 (q_accept,O)，M 接受奇长度串，所以 reject。否则 accept。有限搜索保证 decider 停机。"
  };

  applyProcess(findPart("cs605", "2(a)", "decider"), productExamConfig);

  const cliqueLearningConfig = {
    title: "3-SAT→CLIQUE：图构造到 clique 检查的累计状态",
    headers: ["阶段", "本阶段加入图中的内容", "当前图状态", "为什么这样做"],
    rows: [
      [
        "抄公式",
        "C₁=(a∨¬b∨c)，C₂=(¬a∨b∨c)，C₃=(a∨b∨¬c)",
        "3 个 clause",
        "先固定具体输入，后面每个顶点才有来源"
      ],
      [
        "建 C₁ 顶点",
        "(1,a)，(1,¬b)，(1,c)",
        "3 个顶点",
        "同一个文字在不同 clause 出现时也必须是不同 occurrence vertex"
      ],
      [
        "建 C₂ 顶点",
        "(2,¬a)，(2,b)，(2,c)",
        "累计 6 个顶点",
        "保留 clause 编号，不能把两个 c 合并"
      ],
      [
        "建 C₃ 顶点",
        "(3,a)，(3,b)，(3,¬c)",
        "累计 9 个顶点",
        "三个 clause 各有一层"
      ],
      [
        "加边",
        "只连不同 clause 且不互补的两个顶点",
        "无同层边；无 a—¬a、b—¬b、c—¬c 边",
        "clique 因而不能同时选择矛盾文字"
      ],
      [
        "设目标大小",
        "k=3",
        "输出实例 ⟨G,3⟩",
        "三个 clause 要各贡献一个顶点"
      ],
      [
        "检查一组 clique",
        "{(1,a),(2,b),(3,a)}",
        "三点来自不同 clause，且没有互补对，所以三条边都存在",
        "它对应一致选择 a=true、b=true"
      ]
    ],
    steps: [
      "先写出实际公式 C=(a∨¬b∨c)∧(¬a∨b∨c)∧(a∨b∨¬c)。如果没有具体公式，就无法判断哪些 literal 互补，也无法画出具体图。",
      "为 C₁ 的三个 literal occurrence 各建一个顶点：(1,a)、(1,¬b)、(1,c)。括号中的 1 表示它来自第一个 clause。",
      "为 C₂ 建三个新顶点：(2,¬a)、(2,b)、(2,c)。即使 c 已在 C₁ 出现，也不能合并，因为 reduction 为每次出现建立独立顶点。",
      "为 C₃ 建三个新顶点：(3,a)、(3,b)、(3,¬c)。现在图共有 3×3=9 个顶点。",
      "开始加边。同一 clause 的顶点之间不连边。不同 clause 的顶点只有在文字不互补时才连边。例如 (1,a) 不连 (2,¬a)，但会连 (2,b)。",
      "令 k 等于 clause 数，所以 k=3。要形成 3-clique，三个点必须来自三个不同 clause；同层没有边会自动阻止从一层选两个点。",
      "检查 {(1,a),(2,b),(3,a)}。三点分属 C₁、C₂、C₃；a 与 b 不冲突，两个 a 也不冲突，因此三对之间都有边。这组 clique 对应满足选择 a=true、b=true。"
    ],
    operations: [
      "写下完整的三个 clause，并给它们编号 C₁、C₂、C₃。",
      "只加入 C₁ 的三个 occurrence vertices；后两层保持未完成。",
      "加入 C₂ 的三个新 occurrence vertices；保留重复出现的 c。",
      "加入 C₃ 的三个新 occurrence vertices，完成九点顶点集。",
      "对每一对跨层顶点应用同一规则：互补则删边，否则加边。",
      "把目标 clique 大小写成 clause 数 k=3。",
      "逐对检查所选三点的边，并把选择翻译成一致赋值。"
    ],
    given: "输入公式 C=(a∨¬b∨c)∧(¬a∨b∨c)∧(a∨b∨¬c)。",
    target: "构造 3-SAT→CLIQUE 的输出 ⟨G,k⟩，并展示一组 3-clique。",
    result: "输出有 9 个 occurrence vertices，k=3；{(1,a),(2,b),(3,a)} 是一组 3-clique。",
    final: "每个 clause 建一层顶点，只连跨 clause 且不互补的文字，并令 k=clause 数。示例 clique 对应一致的满足选择。",
    check: "选中三点的三对组合分别是 (1,a)—(2,b)、(1,a)—(3,a)、(2,b)—(3,a)；它们均跨 clause 且不互补。"
  };

  applyProcess(findExample("cs605", "3-SAT 到 CLIQUE 的三层图"), cliqueLearningConfig);
})();
