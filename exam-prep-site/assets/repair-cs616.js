(function () {
  "use strict";

  const course = window.REVISION_DEPTH && window.REVISION_DEPTH.cs616;
  if (!course) return;

  const pending = "待计算";

  function findExample(unitIndex, title) {
    const unit = course.learn[unitIndex];
    return [unit.example].concat(unit.extraExamples || []).find((item) => item && item.title === title);
  }

  function eeaRows(spec, filled, current) {
    const rows = [
      ["初始化 1", "—", String(spec.modulus), "0", "模数行：r=" + spec.modulus + "，d=0", current === -2 ? "← 当前行" : "已知"],
      ["初始化 2", "—", String(spec.value), "1", "待求逆数行：r=" + spec.value + "，d=1", current === -1 ? "← 当前行" : "已知"]
    ];
    spec.lines.forEach((line, index) => {
      if (index >= filled) {
        rows.push(["Step " + (index + 1), pending, pending, pending, pending, "未计算"]);
        return;
      }
      rows.push([
        "Step " + (index + 1),
        String(line.q),
        String(line.r),
        String(line.d),
        "q=⌊" + line.left + "÷" + line.right + "⌋=" + line.q +
          "。r=" + line.left + "−" + line.q + "×" + line.right + "=" + line.r +
          "。d=" + line.dCalc,
        current === index ? "← 当前行" : "已完成"
      ]);
    });
    return rows;
  }

  function eeaState(spec, after, filled, current, title, caption) {
    return {
      after,
      title,
      caption: caption || "d 记录当前余数中 " + spec.value + " 的系数。每一行同时更新余数 r 和系数 d。",
      headers: ["行", "商 q", "余数 r", "d（" + spec.value + " 的系数）", "本行操作", "状态"],
      rows: eeaRows(spec, filled, current)
    };
  }

  function eeaSequence(spec, startAfter) {
    const states = [
      eeaState(spec, startAfter, 0, -1, spec.label + "：写入两条初始化行")
    ];
    spec.lines.forEach((line, index) => {
      states.push(eeaState(
        spec,
        startAfter + index + 1,
        index + 1,
        index,
        spec.label + "：填入 Step " + (index + 1)
      ));
    });
    const lastAfter = startAfter + spec.lines.length;
    states.push(eeaState(
      spec,
      lastAfter + 1,
      spec.lines.length,
      spec.lines.length - 1,
      spec.label + "：从余数 1 的同行读取 d",
      "最后一行的余数是 1。同行的 d=" + spec.coefficient + " 满足 " + spec.value + "d≡1 mod " + spec.modulus + "。"
    ));
    states.push(eeaState(
      spec,
      lastAfter + 2,
      spec.lines.length,
      spec.lines.length - 1,
      spec.label + "：把 d 化为标准余数",
      spec.coefficient + " mod " + spec.modulus + "=" + spec.inverse + "。表不变，只把最后一行的 d 解释为模逆元。"
    ));
    states.push(eeaState(
      spec,
      lastAfter + 3,
      spec.lines.length,
      spec.lines.length - 1,
      spec.label + "：乘回检查",
      spec.check
    ));
    return states;
  }

  function eeaSteps(spec) {
    const steps = [
      "写两条初始化行。模数 " + spec.modulus + " 的余数列写 " + spec.modulus + "，d 列写 0。待求逆数 " + spec.value + " 的余数列写 " + spec.value + "，d 列写 1。"
    ];
    spec.lines.forEach((line, index) => {
      steps.push(
        "填 Step " + (index + 1) + "。先算 q=⌊" + line.left + "÷" + line.right + "⌋=" + line.q +
        "。再算 r=" + line.left + "−" + line.q + "×" + line.right + "=" + line.r +
        "。最后用上两行的 d 算 d=" + line.dCalc + "=" + line.d + "。"
      );
    });
    steps.push("最后一行的余数是 1。读取同一行的 d=" + spec.coefficient + "。这个系数满足 " + spec.value + "d≡1 mod " + spec.modulus + "。");
    steps.push("把 d 化为 0 到 " + (spec.modulus - 1) + " 的标准余数。" + spec.coefficient + " mod " + spec.modulus + "=" + spec.inverse + "。");
    steps.push("乘回检查。" + spec.check);
    return steps;
  }

  const inv7mod26 = {
    label: "7⁻¹ mod 26",
    modulus: 26,
    value: 7,
    coefficient: "−11",
    inverse: "15",
    check: "7×15=105=4×26+1，所以余数是 1。",
    lines: [
      {left: 26, right: 7, q: 3, r: 5, d: "−3", dCalc: "0−3×1"},
      {left: 7, right: 5, q: 1, r: 2, d: "4", dCalc: "1−1×(−3)"},
      {left: 5, right: 2, q: 2, r: 1, d: "−11", dCalc: "−3−2×4"}
    ]
  };

  const mainInverse = findExample(0, "用扩展欧几里得算法求 7⁻¹ mod 26");
  if (mainInverse) {
    mainInverse.steps = eeaSteps(inv7mod26);
    mainInverse.states = eeaSequence(inv7mod26, 1);
    delete mainInverse.ledger;
    mainInverse.result = "7⁻¹ mod 26=15。";
    mainInverse.check = inv7mod26.check;
  }

  const inv7mod370368 = {
    label: "7⁻¹ mod 370368",
    modulus: 370368,
    value: 7,
    coefficient: "−158729",
    inverse: "211639",
    check: "7×211639=1481473=4×370368+1，所以余数是 1。",
    lines: [
      {left: 370368, right: 7, q: 52909, r: 5, d: "−52909", dCalc: "0−52909×1"},
      {left: 7, right: 5, q: 1, r: 2, d: "52910", dCalc: "1−1×(−52909)"},
      {left: 5, right: 2, q: 2, r: 1, d: "−158729", dCalc: "−52909−2×52910"}
    ]
  };

  const personalInverse = findExample(0, "个人复习 PDF 例题：用系数表求 7⁻¹ mod 370368");
  if (personalInverse) {
    personalInverse.steps = eeaSteps(inv7mod370368);
    personalInverse.states = eeaSequence(inv7mod370368, 1);
    delete personalInverse.ledger;
    personalInverse.result = "7⁻¹ mod 370368=211639。";
    personalInverse.check = inv7mod370368.check;
  }

  const inv697 = {
    label: "697⁻¹ mod 991",
    modulus: 991,
    value: 697,
    coefficient: "−300",
    inverse: "691",
    check: "697×691=481627=486×991+1，所以余数是 1。",
    lines: [
      {left: 991, right: 697, q: 1, r: 294, d: "−1", dCalc: "0−1×1"},
      {left: 697, right: 294, q: 2, r: 109, d: "3", dCalc: "1−2×(−1)"},
      {left: 294, right: 109, q: 2, r: 76, d: "−7", dCalc: "−1−2×3"},
      {left: 109, right: 76, q: 1, r: 33, d: "10", dCalc: "3−1×(−7)"},
      {left: 76, right: 33, q: 2, r: 10, d: "−27", dCalc: "−7−2×10"},
      {left: 33, right: 10, q: 3, r: 3, d: "91", dCalc: "10−3×(−27)"},
      {left: 10, right: 3, q: 3, r: 1, d: "−300", dCalc: "−27−3×91"}
    ]
  };

  const zkPart = course.exam[0].parts[0];
  if (zkPart) {
    const oldSteps = zkPart.steps.slice();
    const oldStates = (zkPart.states || []).slice();
    zkPart.steps = oldSteps.slice(0, 8).concat(eeaSteps(inv697), oldSteps.slice(10));
    zkPart.states = oldStates.filter((state) => state.after < 9)
      .concat(eeaSequence(inv697, 9))
      .concat(oldStates.filter((state) => state.after > 10).map((state) => Object.assign({}, state, {after: state.after + 9})));
  }

  const inv523 = {
    label: "523⁻¹ mod 547",
    modulus: 547,
    value: 523,
    coefficient: "−114",
    inverse: "433",
    check: "523×433=226459=414×547+1，所以余数是 1。",
    lines: [
      {left: 547, right: 523, q: 1, r: 24, d: "−1", dCalc: "0−1×1"},
      {left: 523, right: 24, q: 21, r: 19, d: "22", dCalc: "1−21×(−1)"},
      {left: 24, right: 19, q: 1, r: 5, d: "−23", dCalc: "−1−1×22"},
      {left: 19, right: 5, q: 3, r: 4, d: "91", dCalc: "22−3×(−23)"},
      {left: 5, right: 4, q: 1, r: 1, d: "−114", dCalc: "−23−1×91"}
    ]
  };

  const rootsPart = course.exam[0].parts[2];
  if (rootsPart) {
    const oldSteps = rootsPart.steps.slice();
    const oldStates = (rootsPart.states || []).slice();
    rootsPart.steps = oldSteps.slice(0, 3).concat(eeaSteps(inv523), oldSteps.slice(4));
    rootsPart.states = oldStates.filter((state) => state.after < 4)
      .concat(eeaSequence(inv523, 4))
      .concat(oldStates.filter((state) => state.after > 4).map((state) => Object.assign({}, state, {after: state.after + 8})));
  }

  const invLarge = {
    label: "564387843⁻¹ mod 790142980",
    modulus: 790142980,
    value: 564387843,
    coefficient: "7",
    inverse: "7",
    check: "564387843×7=3950714901=5×790142980+1，所以余数是 1。",
    lines: [
      {left: 790142980, right: 564387843, q: 1, r: 225755137, d: "−1", dCalc: "0−1×1"},
      {left: 564387843, right: 225755137, q: 2, r: 112877569, d: "3", dCalc: "1−2×(−1)"},
      {left: 225755137, right: 112877569, q: 1, r: 112877568, d: "−4", dCalc: "−1−1×3"},
      {left: 112877569, right: 112877568, q: 1, r: 1, d: "7", dCalc: "3−1×(−4)"}
    ]
  };

  const rsaPart = course.exam[2].parts[0];
  if (rsaPart) {
    rsaPart.steps = rsaPart.steps.slice(0, 9).concat(eeaSteps(invLarge));
    rsaPart.states = [
      {
        after: 3,
        title: "Fermat 搜索：检查 s=28111",
        headers: ["s", "s²", "s²−n", "平方检查", "状态"],
        rows: [
          ["28111", "790228321", "29112", "不是平方", "← 当前行"],
          ["28112", pending, pending, pending, "未计算"],
          ["28113", pending, pending, pending, "未计算"],
          ["28114", pending, pending, pending, "未计算"],
          ["28115", pending, pending, pending, "未计算"]
        ]
      },
      {
        after: 4,
        title: "Fermat 搜索：检查 s=28112",
        headers: ["s", "s²", "s²−n", "平方检查", "状态"],
        rows: [
          ["28111", "790228321", "29112", "不是平方", "已完成"],
          ["28112", "790284544", "85335", "不是平方", "← 当前行"],
          ["28113", pending, pending, pending, "未计算"],
          ["28114", pending, pending, pending, "未计算"],
          ["28115", pending, pending, pending, "未计算"]
        ]
      },
      {
        after: 5,
        title: "Fermat 搜索：检查 s=28113",
        headers: ["s", "s²", "s²−n", "平方检查", "状态"],
        rows: [
          ["28111", "790228321", "29112", "不是平方", "已完成"],
          ["28112", "790284544", "85335", "不是平方", "已完成"],
          ["28113", "790340769", "141560", "不是平方", "← 当前行"],
          ["28114", pending, pending, pending, "未计算"],
          ["28115", pending, pending, pending, "未计算"]
        ]
      },
      {
        after: 6,
        title: "Fermat 搜索：检查 s=28114",
        headers: ["s", "s²", "s²−n", "平方检查", "状态"],
        rows: [
          ["28111", "790228321", "29112", "不是平方", "已完成"],
          ["28112", "790284544", "85335", "不是平方", "已完成"],
          ["28113", "790340769", "141560", "不是平方", "已完成"],
          ["28114", "790396996", "197787", "不是平方", "← 当前行"],
          ["28115", pending, pending, pending, "未计算"]
        ]
      },
      {
        after: 7,
        title: "Fermat 搜索：检查 s=28115",
        headers: ["s", "s²", "s²−n", "平方检查", "状态"],
        rows: [
          ["28111", "790228321", "29112", "不是平方", "已完成"],
          ["28112", "790284544", "85335", "不是平方", "已完成"],
          ["28113", "790340769", "141560", "不是平方", "已完成"],
          ["28114", "790396996", "197787", "不是平方", "已完成"],
          ["28115", "790453225", "254016", "504²，停止", "← 当前行"]
        ]
      },
      {
        after: 8,
        title: "由 s 和 t 计算两个因子",
        headers: ["量", "操作", "结果"],
        rows: [["p", "s−t=28115−504", "27611"], ["q", "s+t=28115+504", "28619"], ["检查", "27611×28619", "790199209"]]
      },
      {
        after: 9,
        title: "计算 φ(n)",
        headers: ["公式", "分块乘法", "结果"],
        rows: [["(p−1)(q−1)", "27610×28000 + 27610×618", "773080000+17062980=790142980"]]
      }
    ].concat(eeaSequence(invLarge, 10));
    delete rsaPart.ledger;
  }

  function compactEeaState(after, title, value, modulus, rows, coefficient, inverse, check) {
    const calculationRows = rows.map((row) => row.slice());
    const lastRow = calculationRows[calculationRows.length - 1];
    lastRow[4] += "。读出 d=" + coefficient + "。" + coefficient + " mod " + modulus + "=" + inverse + "。" + check;
    lastRow[5] = "← 当前行：逆元";
    return {
      after,
      title,
      caption: "从初始化行开始。每一行同时更新余数 r 和待求逆数的系数 d。最后一行的 r=1。",
      headers: ["行", "商 q", "余数 r", "d（" + value + " 的系数）", "本行操作", "状态"],
      rows: [
        ["初始化 1", "—", String(modulus), "0", "模数行", "已知"],
        ["初始化 2", "—", String(value), "1", "待求逆数行", "已知"]
      ].concat(calculationRows)
    };
  }

  const ecdsaPart = course.exam[2].parts[2];
  if (ecdsaPart) {
    const oldStates = (ecdsaPart.states || []).filter((state) => ![5, 6].includes(state.after));
    ecdsaPart.states = oldStates.concat([
      compactEeaState(2, "求 w=6⁻¹ mod 7", 6, 7, [
        ["Step 1", "1", "1", "−1", "r=7−1×6=1。d=0−1×1=−1", "← 当前行"]
      ], "−1", "6", "6×6=36=5×7+1"),
      compactEeaState(5, "求点加法中的 8⁻¹ mod 17", 8, 17, [
        ["Step 1", "2", "1", "−2", "r=17−2×8=1。d=0−2×1=−2", "← 当前行"]
      ], "−2", "15", "8×15=120=7×17+1"),
      compactEeaState(6, "求倍点中的 5⁻¹ mod 17", 5, 17, [
        ["Step 1", "3", "2", "−3", "r=17−3×5=2。d=0−3×1=−3", "已完成"],
        ["Step 2", "2", "1", "7", "r=5−2×2=1。d=1−2×(−3)=7", "← 当前行"]
      ], "7", "7", "5×7=35=2×17+1")
    ]).sort((a, b) => a.after - b.after);
  }

  const aesPart = course.exam[1].parts[0];
  if (aesPart) {
    aesPart.steps = [
      "把 16 个字节按 AES 的列优先顺序放进 4×4 state。每四个连续字节组成一列。先把 Before 和 After 两个矩阵完整写出。",
      "使用 K=Before XOR After。先算 key 的第 0 行。第 0 列是 12 XOR A9=BB。其余三列是 12 XOR 12=00。",
      "算 key 的第 1 行。四个位置都是 34 XOR 34=00。",
      "算 key 的第 2 行。四个位置都是 56 XOR 56=00。",
      "算 key 的第 3 行。前三列是 FF XOR FF=00。第 3 列是 FF XOR 44=BB。",
      "现在 Key 矩阵的 16 个位置都已填写。按列优先顺序读回字节串，得到 BB 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BB。",
      "逐格验证 After XOR Key=Before。变化的两个格为 A9 XOR BB=12 和 44 XOR BB=FF。其余格 XOR 00 后不变。"
    ];
    const before = [
      ["12", "12", "12", "12"],
      ["34", "34", "34", "34"],
      ["56", "56", "56", "56"],
      ["FF", "FF", "FF", "FF"]
    ];
    const after = [
      ["A9", "12", "12", "12"],
      ["34", "34", "34", "34"],
      ["56", "56", "56", "56"],
      ["FF", "FF", "FF", "44"]
    ];
    const key = [
      ["BB", "00", "00", "00"],
      ["00", "00", "00", "00"],
      ["00", "00", "00", "00"],
      ["00", "00", "00", "BB"]
    ];
    function aesRows(filledRows, currentRow) {
      const rows = [];
      before.forEach((row, index) => rows.push(["Before", "r" + index].concat(row, ["已知"])));
      key.forEach((row, index) => rows.push([
        "Key",
        "r" + index
      ].concat(index < filledRows ? row : [pending, pending, pending, pending], [
        index === currentRow ? "← 当前行：Before XOR After" : index < filledRows ? "已完成" : "未计算"
      ])));
      after.forEach((row, index) => rows.push(["After", "r" + index].concat(row, ["已知"])));
      return rows;
    }
    const aesHeaders = ["矩阵", "行", "第 0 列", "第 1 列", "第 2 列", "第 3 列", "本步操作"];
    aesPart.states = [
      {after: 1, title: "完整 4×4 Before／Key／After 矩阵", caption: "AES state 按列优先装入。Key 的所有格先保留为待计算。", headers: aesHeaders, rows: aesRows(0, -1)},
      {after: 2, title: "计算 Key 第 0 行", caption: "第 0 行逐格执行 Before XOR After。", headers: aesHeaders, rows: aesRows(1, 0)},
      {after: 3, title: "计算 Key 第 1 行", caption: "第 1 行逐格执行 Before XOR After。", headers: aesHeaders, rows: aesRows(2, 1)},
      {after: 4, title: "计算 Key 第 2 行", caption: "第 2 行逐格执行 Before XOR After。", headers: aesHeaders, rows: aesRows(3, 2)},
      {after: 5, title: "计算 Key 第 3 行", caption: "第 3 行逐格执行 Before XOR After。", headers: aesHeaders, rows: aesRows(4, 3)},
      {after: 6, title: "完整 4×4 Round Key", caption: "按列优先读回 Key 矩阵，得到 16 字节 round key。", headers: aesHeaders, rows: aesRows(4, -1)},
      {after: 7, title: "完整矩阵回代检查", caption: "每个位置都满足 After XOR Key=Before。", headers: aesHeaders, rows: aesRows(4, -1)}
    ];
  }

  const rlwePart = course.exam[0].parts[3];
  if (rlwePart) {
    const shift2 = [
      ["y⁰", "74y⁷", "2y×74y⁷=148y⁸", "y⁸=−1，所以变成 −148y⁰", "−148"],
      ["y¹", "57y⁰", "2y×57=114y¹", "次数未超过 7，不折回", "114"],
      ["y²", "18y¹", "2y×18y=36y²", "次数未超过 7，不折回", "36"],
      ["y³", "62y²", "2y×62y²=124y³", "次数未超过 7，不折回", "124"],
      ["y⁴", "48y³", "2y×48y³=96y⁴", "次数未超过 7，不折回", "96"],
      ["y⁵", "30y⁴", "2y×30y⁴=60y⁵", "次数未超过 7，不折回", "60"],
      ["y⁶", "57y⁵", "2y×57y⁵=114y⁶", "次数未超过 7，不折回", "114"],
      ["y⁷", "55y⁶", "2y×55y⁶=110y⁷", "次数未超过 7，不折回", "110"]
    ];
    const shift7 = [
      ["y⁰", "18y¹", "y⁷×18y=18y⁸", "y⁸=−1，所以变成 −18y⁰", "−18"],
      ["y¹", "62y²", "y⁷×62y²=62y⁹", "y⁹=−y，所以变成 −62y¹", "−62"],
      ["y²", "48y³", "y⁷×48y³=48y¹⁰", "y¹⁰=−y²，所以变成 −48y²", "−48"],
      ["y³", "30y⁴", "y⁷×30y⁴=30y¹¹", "y¹¹=−y³，所以变成 −30y³", "−30"],
      ["y⁴", "57y⁵", "y⁷×57y⁵=57y¹²", "y¹²=−y⁴，所以变成 −57y⁴", "−57"],
      ["y⁵", "55y⁶", "y⁷×55y⁶=55y¹³", "y¹³=−y⁵，所以变成 −55y⁵", "−55"],
      ["y⁶", "74y⁷", "y⁷×74y⁷=74y¹⁴", "y¹⁴=−y⁶，所以变成 −74y⁶", "−74"],
      ["y⁷", "57y⁰", "y⁷×57=57y⁷", "次数未超过 7，不折回", "57"]
    ];
    const productRows = [
      ["y⁰", "−148", "−18", "−148−18=−166", "−166+2×83", "0"],
      ["y¹", "114", "−62", "114−62=52", "52", "52"],
      ["y²", "36", "−48", "36−48=−12", "−12+83", "71"],
      ["y³", "124", "−30", "124−30=94", "94−83", "11"],
      ["y⁴", "96", "−57", "96−57=39", "39", "39"],
      ["y⁵", "60", "−55", "60−55=5", "5", "5"],
      ["y⁶", "114", "−74", "114−74=40", "40", "40"],
      ["y⁷", "110", "57", "110+57=167", "167−2×83", "1"]
    ];
    const subtractRows = [
      ["y⁰", "2", "0", "2−0=2", "2"],
      ["y¹", "12", "52", "12−52=−40。−40+83", "43"],
      ["y²", "65", "71", "65−71=−6。−6+83", "77"],
      ["y³", "50", "11", "50−11", "39"],
      ["y⁴", "1", "39", "1−39=−38。−38+83", "45"],
      ["y⁵", "50", "5", "50−5", "45"],
      ["y⁶", "2", "40", "2−40=−38。−38+83", "45"],
      ["y⁷", "39", "1", "39−1", "38"]
    ];
    const retained = (rlwePart.states || []).filter((state) => ![4, 5, 6, 7].includes(state.after));
    rlwePart.states = retained.concat([
      {
        after: 4,
        title: "2y×c_aux：每个输出格的来源、移位与折回",
        headers: ["输出位置", "取自 c_aux", "乘法与移位", "是否折回", "当前系数"],
        rows: shift2
      },
      {
        after: 5,
        title: "y⁷×c_aux：每个输出格的来源、移位与折回",
        headers: ["输出位置", "取自 c_aux", "乘法与移位", "折回操作", "当前系数"],
        rows: shift7
      },
      {
        after: 6,
        title: "逐列相加并取 mod 83",
        headers: ["位置", "来自 2y×c_aux", "来自 y⁷×c_aux", "先相加", "取模操作", "s×c_aux"],
        rows: productRows
      },
      {
        after: 7,
        title: "逐列计算 c_msg−s×c_aux",
        headers: ["位置", "c_msg", "s×c_aux", "减法与取模操作", "结果"],
        rows: subtractRows
      }
    ]).sort((a, b) => a.after - b.after);
  }

  function garnerRows(filled, current) {
    const data = [
      ["(415,62)", "62−415=−353", "−353+547=194", "194×433=84002", "84002=153×547+311", "311", "415+523×311=163068"],
      ["(415,485)", "485−415=70", "70", "70×433=30310", "30310=55×547+225", "225", "415+523×225=118090"],
      ["(108,62)", "62−108=−46", "−46+547=501", "501×433=216933", "216933=396×547+321", "321", "108+523×321=167991"],
      ["(108,485)", "485−108=377", "377", "377×433=163241", "163241=298×547+235", "235", "108+523×235=123013"]
    ];
    return data.map((row, index) => {
      if (index >= filled) {
        return [row[0], pending, pending, pending, pending, pending, pending, "未计算"];
      }
      return row.concat(index === current ? "← 当前行" : "已完成");
    });
  }

  if (rootsPart) {
    rootsPart.states = rootsPart.states.filter((state) => state.after < 13 || state.after > 17);
    const headers = ["(a_p,a_q)", "差值 a_q−a_p", "归一到 mod 547", "乘逆元 433", "整数除法", "余数 u", "x=a_p+523u", "状态"];
    rootsPart.states.push(
      {
        after: 13,
        title: "Garner 四根固定工作表：先写四组输入",
        caption: "每组都按差值、归一、乘逆元、取余数 u、计算 x 的顺序填写。未计算的格保留为待计算。",
        headers,
        rows: garnerRows(0, -1)
      },
      {
        after: 14,
        title: "Garner 四根固定工作表：填写第 1 组",
        headers,
        rows: garnerRows(1, 0)
      },
      {
        after: 15,
        title: "Garner 四根固定工作表：填写第 2 组",
        headers,
        rows: garnerRows(2, 1)
      },
      {
        after: 16,
        title: "Garner 四根固定工作表：填写第 3 组",
        headers,
        rows: garnerRows(3, 2)
      },
      {
        after: 17,
        title: "Garner 四根固定工作表：填写第 4 组",
        headers,
        rows: garnerRows(4, 3)
      }
    );
    rootsPart.states.sort((a, b) => a.after - b.after);
  }

  function gcdSteps(label, first, second, lines, gcd) {
    const steps = [
      "为 " + label + " 写完整 Euclid 工作表。第一轮的被除数是 " + first + "，除数是 " + second + "。其余行先保留为待计算。"
    ];
    lines.forEach((line, index) => {
      steps.push(
        "填 Step " + (index + 1) + "。q=⌊" + line.a + "÷" + line.b + "⌋=" + line.q +
        "。更新余数 r=" + line.a + "−" + line.q + "×" + line.b + "=" + line.r +
        "。下一行把 " + line.b + " 移到被除数列，把 " + line.r + " 移到除数列。"
      );
    });
    steps.push("最后一行的余数是 0。上一行的非零余数 " + gcd + " 是 " + label + "。");
    return steps;
  }

  function gcdRows(lines, filled, current) {
    return lines.map((line, index) => {
      if (index >= filled) {
        return ["Step " + (index + 1), pending, pending, pending, pending, pending, "未计算"];
      }
      return [
        "Step " + (index + 1),
        String(line.a),
        String(line.b),
        String(line.q),
        String(line.r),
        "r=" + line.a + "−" + line.q + "×" + line.b + "=" + line.r,
        index === current ? "← 当前行" : "已完成"
      ];
    });
  }

  function gcdStates(label, lines, gcd, startAfter) {
    const headers = ["行", "被除数 A", "除数 B", "商 q", "余数 r", "本行余数更新", "状态"];
    const states = [{
      after: startAfter,
      title: label + "：初始化完整工作表",
      caption: "每一轮只填一行。下一轮使用上一轮的 B 和 r。所有未计算行保留在表内。",
      headers,
      rows: gcdRows(lines, 0, -1)
    }];
    lines.forEach((line, index) => {
      states.push({
        after: startAfter + index + 1,
        title: label + "：填入 Step " + (index + 1),
        headers,
        rows: gcdRows(lines, index + 1, index)
      });
    });
    states.push({
      after: startAfter + lines.length + 1,
      title: label + "：从完整表读取 gcd",
      caption: "最后一行得到 r=0。上一行的非零余数是 " + gcd + "，所以 gcd=" + gcd + "。",
      headers,
      rows: gcdRows(lines, lines.length, lines.length - 1)
    });
    return states;
  }

  const gcdMinus = [
    {a: 47479253, b: 7654018, q: 6, r: 1555145},
    {a: 7654018, b: 1555145, q: 4, r: 1433438},
    {a: 1555145, b: 1433438, q: 1, r: 121707},
    {a: 1433438, b: 121707, q: 11, r: 94661},
    {a: 121707, b: 94661, q: 1, r: 27046},
    {a: 94661, b: 27046, q: 3, r: 13523},
    {a: 27046, b: 13523, q: 2, r: 0}
  ];
  const gcdPlus = [
    {a: 55192920, b: 47479253, q: 1, r: 7713667},
    {a: 47479253, b: 7713667, q: 6, r: 1197251},
    {a: 7713667, b: 1197251, q: 6, r: 530161},
    {a: 1197251, b: 530161, q: 2, r: 136929},
    {a: 530161, b: 136929, q: 3, r: 119374},
    {a: 136929, b: 119374, q: 1, r: 17555},
    {a: 119374, b: 17555, q: 6, r: 14044},
    {a: 17555, b: 14044, q: 1, r: 3511},
    {a: 14044, b: 3511, q: 4, r: 0}
  ];

  const rabinPart = course.exam[2].parts[1];
  if (rabinPart) {
    const oldSteps = rabinPart.steps.slice();
    rabinPart.steps = oldSteps.slice(0, 3)
      .concat(gcdSteps("gcd(|R−Y|,N)", 47479253, 7654018, gcdMinus, 13523))
      .concat(gcdSteps("gcd(R+Y,N)", 55192920, 47479253, gcdPlus, 3511))
      .concat(oldSteps.slice(5));
    rabinPart.states = gcdStates("gcd(|R−Y|,N)", gcdMinus, 13523, 4)
      .concat(gcdStates("gcd(R+Y,N)", gcdPlus, 3511, 13))
      .concat([{
        after: 24,
        title: "两个 gcd 给出的因子检查",
        headers: ["p", "q", "乘法操作", "N", "状态"],
        rows: [["13523", "3511", "13523×3511=47479253", "47479253", "相等"]]
      }]);
  }

  const smallRsa = findExample(3, "小型 RSA 从生成密钥到签名验证");
  if (smallRsa) {
    smallRsa.steps = [
      "计算 n=pq=5×11=55。计算 φ(n)=(p−1)(q−1)=4×10=40。公钥是 (n,e)=(55,3)。",
      "为 3⁻¹ mod 40 写两条初始化行。第一行是 r=40,d=0。第二行是 r=3,d=1。计算行先保留为待计算。",
      "填 Step 1。q=⌊40÷3⌋=13。r=40−13×3=1。d=0−13×1=−13。同行的 r=1，所以逆元是 −13 mod 40=27。检查 3×27=81=2×40+1。",
      "签名要算 9²⁷ mod 55。先把基数行写成 9¹ mod 55=9。其余平方行先保留为待计算。",
      "平方 9¹。9²=81=1×55+26，所以 9² mod 55=26。",
      "平方上一行余数 26。26²=676=12×55+16，所以 9⁴ mod 55=16。",
      "平方上一行余数 16。16²=256=4×55+36，所以 9⁸ mod 55=36。",
      "平方上一行余数 36。36²=1296=23×55+31，所以 9¹⁶ mod 55=31。",
      "把指数拆成 27=16+8+2+1。选择表中的 31、36、26 和 9。逐次乘模表先保留三行。",
      "第一次乘模。31×36=1116=20×55+16，所以累计余数是 16。",
      "第二次乘模。16×26=416=7×55+31，所以累计余数是 31。",
      "第三次乘模。31×9=279=5×55+4，所以签名 s=4。",
      "用公钥验证。s^e mod n=4³ mod 55=64 mod 55=9，等于消息 m。"
    ];
    const powerData = [
      ["9¹", "9", "9", "使用"],
      ["9²", "9²=81", "26", "使用"],
      ["9⁴", "26²=676", "16", "不使用"],
      ["9⁸", "16²=256", "36", "使用"],
      ["9¹⁶", "36²=1296", "31", "使用"]
    ];
    function powerRows(filled, current) {
      return powerData.map((row, index) => index < filled
        ? row.concat(index === current ? "← 当前行" : "已完成")
        : [row[0], pending, pending, row[3], "未计算"]);
    }
    const multiplyData = [
      ["1", "31", "36", "31×36=1116", "1116=20×55+16", "16"],
      ["2", "16", "26", "16×26=416", "416=7×55+31", "31"],
      ["3", "31", "9", "31×9=279", "279=5×55+4", "4"]
    ];
    function multiplyRows(filled, current) {
      return multiplyData.map((row, index) => index < filled
        ? row.concat(index === current ? "← 当前行" : "已完成")
        : [row[0], pending, pending, pending, pending, pending, "未计算"]);
    }
    smallRsa.states = [
      {
        after: 1,
        title: "RSA 参数工作表",
        headers: ["量", "操作", "结果"],
        rows: [["n", "5×11", "55"], ["φ(n)", "(5−1)(11−1)=4×10", "40"], ["公钥", "(n,e)", "(55,3)"]]
      },
      eeaState({
        label: "3⁻¹ mod 40",
        modulus: 40,
        value: 3,
        coefficient: "−13",
        inverse: "27",
        check: "3×27=81=2×40+1。",
        lines: [{left: 40, right: 3, q: 13, r: 1, d: "−13", dCalc: "0−13×1"}]
      }, 2, 0, -1, "3⁻¹ mod 40：初始化完整系数表"),
      eeaState({
        label: "3⁻¹ mod 40",
        modulus: 40,
        value: 3,
        coefficient: "−13",
        inverse: "27",
        check: "3×27=81=2×40+1。",
        lines: [{left: 40, right: 3, q: 13, r: 1, d: "−13", dCalc: "0−13×1"}]
      }, 3, 1, 0, "3⁻¹ mod 40：填行、读逆元并检查", "余数 1 和 d=−13 在同一行。标准逆元是 27。"),
      {after: 4, title: "快速平方固定工作表：写入基数行", headers: ["幂", "本行操作", "mod 55", "27 是否使用", "状态"], rows: powerRows(1, 0)},
      {after: 5, title: "快速平方固定工作表：计算 9²", headers: ["幂", "本行操作", "mod 55", "27 是否使用", "状态"], rows: powerRows(2, 1)},
      {after: 6, title: "快速平方固定工作表：计算 9⁴", headers: ["幂", "本行操作", "mod 55", "27 是否使用", "状态"], rows: powerRows(3, 2)},
      {after: 7, title: "快速平方固定工作表：计算 9⁸", headers: ["幂", "本行操作", "mod 55", "27 是否使用", "状态"], rows: powerRows(4, 3)},
      {after: 8, title: "快速平方固定工作表：计算 9¹⁶", headers: ["幂", "本行操作", "mod 55", "27 是否使用", "状态"], rows: powerRows(5, 4)},
      {after: 9, title: "逐次乘模固定工作表：选择 16、8、2、1 次幂", headers: ["轮", "累计值", "乘入余数", "乘法", "整数除法", "新余数", "状态"], rows: multiplyRows(0, -1)},
      {after: 10, title: "逐次乘模固定工作表：完成第 1 轮", headers: ["轮", "累计值", "乘入余数", "乘法", "整数除法", "新余数", "状态"], rows: multiplyRows(1, 0)},
      {after: 11, title: "逐次乘模固定工作表：完成第 2 轮", headers: ["轮", "累计值", "乘入余数", "乘法", "整数除法", "新余数", "状态"], rows: multiplyRows(2, 1)},
      {after: 12, title: "逐次乘模固定工作表：完成第 3 轮", headers: ["轮", "累计值", "乘入余数", "乘法", "整数除法", "新余数", "状态"], rows: multiplyRows(3, 2)},
      {
        after: 13,
        title: "签名回代检查",
        headers: ["签名 s", "公开指数 e", "验证操作", "结果"],
        rows: [["4", "3", "4³ mod 55=64 mod 55", "9=m"]]
      }
    ];
    delete smallRsa.ledger;
  }

  const eccExample = findExample(4, "有限域上的椭圆曲线点加法");
  if (eccExample) {
    eccExample.steps = [
      "倍点斜率是 λ=(3x₁²+a)(2y₁)⁻¹ mod 17。分子是 3×5²+2=77 mod 17=9。分母是 2×1=2。",
      "为 2⁻¹ mod 17 写两条初始化行。第一行是 r=17,d=0。第二行是 r=2,d=1。计算行先保留为待计算。",
      "填 Step 1。q=⌊17÷2⌋=8。r=17−8×2=1。d=0−8×1=−8。同行的 r=1，所以逆元是 −8 mod 17=9。检查 2×9=18=17+1。",
      "计算斜率。λ=9×9=81。81=4×17+13，所以 λ=13。",
      "计算 x₃。x₃=13²−2×5=169−10=159。159=9×17+6，所以 x₃=6。",
      "计算 y₃。y₃=13(5−6)−1=−14。−14+17=3，所以 y₃=3。",
      "检查点 (6,3)。左边 3²=9。右边 6³+2×6+2=230=13×17+9。两边余数相同。"
    ];
    const doublingData = [
      ["分子", "3×5²+2=77", "77 mod 17", "9"],
      ["分母", "2×1", "2 mod 17", "2"],
      ["分母逆元", "2⁻¹", "−8 mod 17", "9"],
      ["斜率 λ", "9×9=81", "81 mod 17", "13"],
      ["x₃", "13²−2×5=159", "159 mod 17", "6"],
      ["y₃", "13(5−6)−1=−14", "−14 mod 17", "3"]
    ];
    function doublingRows(filled, current) {
      return doublingData.map((row, index) => index < filled
        ? row.concat(index === current ? "← 当前行" : "已完成")
        : [row[0], pending, pending, pending, "未计算"]);
    }
    const inv2Spec = {
      label: "2⁻¹ mod 17",
      modulus: 17,
      value: 2,
      coefficient: "−8",
      inverse: "9",
      check: "2×9=18=17+1。",
      lines: [{left: 17, right: 2, q: 8, r: 1, d: "−8", dCalc: "0−8×1"}]
    };
    eccExample.states = [
      {after: 1, title: "ECC 倍点固定工作表：先算分子和分母", headers: ["量", "未约简操作", "取模操作", "结果", "状态"], rows: doublingRows(2, 1)},
      eeaState(inv2Spec, 2, 0, -1, "2⁻¹ mod 17：初始化完整系数表"),
      eeaState(inv2Spec, 3, 1, 0, "2⁻¹ mod 17：填行、读逆元并检查", "余数 1 和 d=−8 在同一行。标准逆元是 9。"),
      {after: 4, title: "ECC 倍点固定工作表：计算斜率", headers: ["量", "未约简操作", "取模操作", "结果", "状态"], rows: doublingRows(4, 3)},
      {after: 5, title: "ECC 倍点固定工作表：计算 x₃", headers: ["量", "未约简操作", "取模操作", "结果", "状态"], rows: doublingRows(5, 4)},
      {after: 6, title: "ECC 倍点固定工作表：计算 y₃", headers: ["量", "未约简操作", "取模操作", "结果", "状态"], rows: doublingRows(6, 5)},
      {
        after: 7,
        title: "ECC 倍点固定工作表：回代检查",
        headers: ["点", "左边 y²", "右边 x³+2x+2", "mod 17", "结果"],
        rows: [["(6,3)", "3²=9", "6³+2×6+2=230", "9=9", "在曲线上"]]
      }
    ];
    delete eccExample.ledger;
  }

  const classicalAndZk = course.learn[1];
  if (classicalAndZk) {
    classicalAndZk.plain = "本单元有两部分。第一部分恢复 affine digraph 密钥。第二部分分析零知识协议。两部分不共享公式。先学完 affine，再开始零知识协议。";
    classicalAndZk.choice = "题目给两组双字母明文和密文时，使用 affine digraph。题目给 commitment、challenge 和 response 时，使用零知识协议的消息顺序和验证等式。";
    classicalAndZk.flow = [
      "字母编码",
      "列两条同余式",
      "相减消去 b",
      "求逆得到 a",
      "回代得到 b",
      "检查两组映射",
      "定义 ZK 参与者和消息",
      "检查 challenge 的生成时机",
      "代入验证等式"
    ];
    classicalAndZk.steps = [
      "模同余：x≡y (mod n) 表示 x 和 y 除以 n 后余数相同。例如 29≡3 (mod 26)。",
      "字母编码：本课程使用 A=0、B=1、…、Z=25。编码时不区分大小写。",
      "双字母编码：把 xy 写成 26x+y。x 是第一个字母的数值。y 是第二个字母的数值。",
      "Affine digraph 加密：m 是双字母明文编号。c 是双字母密文编号。密钥是 a 和 b。公式为 c≡am+b (mod 676)。",
      "两组明文和密文给出两条同余式。两式相减会消去相同的 b。",
      "相减后得到 da≡e (mod 676)。只有 d 有模 676 的逆元时，才能在两边乘 d⁻¹。",
      "先求 a。再把 a 代回任一原式求 b。最后用两组原始映射检查 a 和 b。",
      "零知识协议的公开陈述是 prover 要证明的命题。verifier 可以看到这个命题。",
      "Witness 是让公开陈述成立的秘密。prover 知道 witness。verifier 不应从协议中得到 witness。",
      "Commitment 是 prover 的第一条消息。它固定 prover 本轮使用的随机选择。",
      "Challenge 是 verifier 在收到 commitment 后随机选择的问题。prover 在发送 commitment 时不能预知 challenge。",
      "Response 是 prover 根据 witness、随机选择和 challenge 算出的回答。verifier 把三条消息代入验证等式。",
      "Completeness 表示诚实 prover 有正确 witness 时可以通过。Soundness 表示没有 witness 的攻击者很难通过。",
      "Zero-knowledge 表示 verifier 除了“公开陈述成立”之外，不得到 witness 的信息。",
      "Challenge 必须在 commitment 后随机产生。固定 challenge 让攻击者先选 response，再反算 commitment。",
      "一条能通过的固定-challenge transcript 只证明一个等式成立。它不证明攻击者知道 witness。"
    ];

    const affineOperations = [
      "考试开头先写编码约定 A=0,…,Z=25 和 xy↦26x+y。随后直接列四行：ma=26×12+0=312；il=26×8+11=219；uw=26×20+22=542；ex=26×4+23=127。这里 ma 中字母 a 的编号是 0，不是密钥参数 a。",
      "把两组映射代入 c≡am+b (mod 676)：542≡312a+b (mod 676)；127≡219a+b (mod 676)。两条式子上下对齐，方便相减。",
      "第一式减第二式。左边 542−127=415；右边 (312−219)a+(b−b)=93a。因此 415≡93a (mod 676)。这一步的目的只是消去 b。",
      "题目给 93⁻¹≡189 (mod 676)。这里的模数不能省略，因为 189 只是在模 676 下才是 93 的逆元。使用前检查：93×189=17577=26×676+1，所以 93×189≡1 (mod 676)。",
      "在 415≡93a (mod 676) 两边同乘 189，得到 415×189≡(93×189)a≡a (mod 676)。计算 415×189=78435=116×676+19，所以 a≡19 (mod 676)。本题选标准代表元 a=19。",
      "把 a≡19 (mod 676) 代回第一式：542≡312×19+b (mod 676)。移项得 b≡542−5928≡−5386 (mod 676)。因为 −5386+8×676=22，所以 b≡22 (mod 676)。本题选标准代表元 b=22。",
      "检查 ma：19×312+22=5950=8×676+542，所以 19×312+22≡542 (mod 676)，对应密文 uw。",
      "检查 il：19×219+22=4183=6×676+127，所以 19×219+22≡127 (mod 676)，对应密文 ex。两组都通过后，标准代表元密钥为 (a,b)=(19,22)。"
    ];
    classicalAndZk.example = {
      title: "完整恢复 mail→uwex 的 affine digraph 密钥",
      prompt: "已知 ma 加密为 uw，il 加密为 ex。使用 c≡am+b (mod 676) 求 a 和 b。",
      given: "A=0,…,Z=25。双字母 xy 编为 26x+y。题目给出 93⁻¹≡189 (mod 676)。",
      target: "求密钥 (a,b)，并检查两组明文到密文的映射。",
      steps: affineOperations,
      result: "a≡19 (mod 676)，b≡22 (mod 676)；取标准代表元后，Affine digraph 密钥是 (a,b)=(19,22)。",
      check: "19×312+22≡542 (mod 676)，19×219+22≡127 (mod 676)。两组原始映射都成立。"
    };

    const smallZkOperations = [
      "先写 verifier 检查的式子 2ᴿ≡t×3ᶜ (mod 11)。本题永远给 c=1，所以实际检查变成 2ᴿ≡3t (mod 11)。",
      "固定 challenge 的漏洞是攻击者在发送 t 前已经知道 c=1。于是攻击者可以反过来做：先随便选一个好算的 response，例如 R=4，再配出能让等式成立的 t。",
      "计算等式左边：2⁴=16=1×11+5，所以左边余数是 5。现在只需让右边 3t 的余数也等于 5。",
      "要从 3t≡5 中单独留下 t，需要 3 的逆元。手写两条 Euclid 式：11=3×3+2；3=1×2+1。反代：1=3−2=3−(11−3×3)=4×3−11，所以 3⁻¹≡4 (mod 11)。",
      "两边乘 3⁻¹：t≡5×4=20≡9 (mod 11)。因此攻击者应发送 commitment t=9。",
      "按消息顺序写 transcript：先发送 t=9；verifier 发送固定的 c=1；攻击者回答 R=4。完整记录是 (t,c,R)=(9,1,4)。",
      "验算左右两边：2⁴ mod 11=5；9×3¹=27 mod 11=5。两边相同，所以 verifier 接受。",
      "最后解释为什么这不构成知识证明：整套计算从未使用秘密 witness x。攻击者只针对提前知道的 c=1 配出一条等式，不能回答另一个随机 challenge。"
    ];
    const smallZk = {
      title: "小模数例题：固定 challenge=1 时反算 commitment",
      prompt: "模数为 11。公开值 y=3，底数 g=2。verifier 永远发送 c=1。构造一条能通过的 transcript。",
      given: "验证等式为 2ᴿ≡t×3ᶜ (mod 11)。攻击者可以自由选择 response R。",
      target: "构造 commitment、challenge 和 response，并逐项验证等式。",
      steps: smallZkOperations,
      result: "伪造 transcript 是 (commitment=9, challenge=1, response=4)。",
      check: "2⁴ mod 11=5。9×3 mod 11=5。验证通过，但计算没有使用 witness。"
    };

    const realZkOperations = [
      "把题目改写成考试时真正要满足的一行：2ᴿ≡t×697 (mod 991)，因为 challenge 已固定为 c=1。攻击者先选 response R=333，再反算 t。",
      "拆指数：333=5×64+13，所以 2³³³=(2⁶⁴)⁵×2¹³。题目给 2⁶⁴≡827；另外 2¹³=8192=8×991+264，所以 2¹³≡264。",
      "连续平方只写需要的量：827²=683929=690×991+139，所以 827²≡139；827⁴≡139²=19321=19×991+492，所以 827⁴≡492。",
      "得到第五次幂并合并：827⁵≡492×827=406884=410×991+574；于是 2³³³≡574×264=151536=152×991+904。",
      "接下来从 904≡697t 中解出 t。需要 697⁻¹ mod 991。这里适合使用一张扩展 Euclid 系数表：从初始化行 (991,0)、(697,1) 开始，每行同时更新余数 r 和 697 的系数 d。",
      "系数表最后得到余数 1 与系数 d=−300。因此 1≡−300×697 (mod 991)，所以 697⁻¹≡−300≡691。乘回检查：697×691=486×991+1。",
      "两边乘逆元：t≡904×691=624664=630×991+334。因此 commitment 是 t=334。",
      "写出完整 transcript，而不是只写两个散落数字：(commitment,challenge,response)=(334,1,333)。",
      "最后验算 verifier 的等式。左边已经算得 2³³³≡904；右边 334×697=232798=234×991+904。两边余数相同，验证通过。",
      "安全结论单独写一句：攻击者没有使用 witness，只因 challenge 在 commitment 前已经可预测，才能先选 R 再反算 t；因此固定 challenge 破坏 soundness。"
    ];
    const realZk = {
      title: "2026 真题数字：用 R=333 构造固定 challenge transcript",
      prompt: "在 mod 991 下，verifier 固定发送 c=1，并检查 2ᴿ≡commitment×697。使用 R=333 构造 commitment。",
      given: "题给 2⁶⁴ mod 991=827。需要计算 2³³³、697⁻¹、commitment 和最终验证。",
      target: "写出完整 transcript，并证明验证等式两边都等于 904。",
      steps: realZkOperations,
      states: [{
        after: 5,
        title: "考试时只写一次：697⁻¹ mod 991 的扩展 Euclid 系数表",
        caption: "r 是当前余数；d 是当前余数中 697 的系数。每一行只使用上两行计算 q、r 和 d。",
        headers: ["行", "商 q", "余数 r", "d（697 的系数）", "本行计算"],
        rows: [
          ["初始化 1", "—", "991", "0", "模数行"],
          ["初始化 2", "—", "697", "1", "待求逆数行"],
          ["Step 1", "1", "294", "−1", "r=991−1×697；d=0−1×1"],
          ["Step 2", "2", "109", "3", "r=697−2×294；d=1−2×(−1)"],
          ["Step 3", "2", "76", "−7", "r=294−2×109；d=−1−2×3"],
          ["Step 4", "1", "33", "10", "r=109−1×76；d=3−1×(−7)"],
          ["Step 5", "2", "10", "−27", "r=76−2×33；d=−7−2×10"],
          ["Step 6", "3", "3", "91", "r=33−3×10；d=10−3×(−27)"],
          ["Step 7", "3", "1", "−300", "r=10−3×3；d=−27−3×91"]
        ]
      }],
      result: "伪造 transcript 是 (commitment=334, challenge=1, response=333)。",
      check: "2³³³≡904。697⁻¹≡691。904×691≡334。334×697≡904 (mod 991)。"
    };

    classicalAndZk.extraExamples = [smallZk, realZk];
    classicalAndZk.practice = {
      q: "为什么 verifier 不能在 prover 发送 commitment 前公布 challenge？",
      hint: "比较诚实顺序和两个伪造例题的计算顺序。",
      a: "攻击者知道 challenge 后，可以先选 response，再从验证等式反算 commitment。随机 challenge 必须在 commitment 后产生。这样，prover 在固定第一条消息时还不知道要回答哪个分支。"
    };
  }

  const cs616Overview = window.REVISION_DATA && window.REVISION_DATA.cs616;
  if (cs616Overview && cs616Overview.learn && cs616Overview.learn[1]) {
    Object.assign(cs616Overview.learn[1], {
      g: "先完整恢复 affine digraph 密钥，再按消息顺序分析零知识协议。能解释固定 challenge 为什么破坏 soundness。",
      k: [
        "Affine digraph 使用 A=0,…,Z=25，并把 xy 编为 26x+y。两组映射给出两条模 676 同余式。相减消去 b，乘逆元求 a，再回代求 b。",
        "零知识协议先定义公开陈述、witness、prover 和 verifier。消息顺序是 commitment、随机 challenge、response、verification。",
        "Challenge 必须在 commitment 后随机产生。固定 challenge 让攻击者先选 response，再反算 commitment。通过一条固定分支不等于知道 witness。",
        "Completeness 说明诚实证明可以通过。Soundness 限制无 witness 的攻击者。Zero-knowledge 限制 verifier 得到的秘密信息。"
      ],
      c: "按考试手写顺序完成 mail→uwex 的编码、消元、求逆、回代和检查，再完成 mod 11 与 2026 数字的固定 challenge 推导。只在扩展 Euclid 处使用系数表。"
    });
  }

  function putState(part, state) {
    if (!part) return;
    part.states = (part.states || []).filter(item => item.after !== state.after);
    part.states.push(state);
    part.states.sort((a, b) => a.after - b.after);
  }

  /* Final audit: every omitted numerical transition on the CS616 exam page
     receives its own worksheet state. Concept-only steps remain prose. */
  putState(zkPart, {
    after: 1,
    title: "先把固定 challenge 代入验证等式",
    headers: ["原验证式", "代入 c=1", "得到的本题等式", "下一步要求"],
    rows: [[
      "2ᴿ≡commitment×697ᶜ (mod 991)",
      "697¹=697",
      "2ᴿ≡commitment×697 (mod 991)",
      "先选 R，再反算 commitment"
    ]]
  });
  putState(zkPart, {
    after: 8,
    title: "把验证等式单独解出 commitment",
    headers: ["当前等式", "两边执行的同一操作", "改写后", "还缺什么"],
    rows: [[
      "904≡commitment×697 (mod 991)",
      "同乘 697⁻¹",
      "commitment≡904×697⁻¹ (mod 991)",
      "下一步求 697⁻¹"
    ]]
  });
  putState(zkPart, {
    after: 21,
    title: "按协议顺序写出完整 transcript",
    headers: ["发送次序", "发送者", "消息", "攻击者何时知道数值"],
    rows: [
      ["1", "攻击者", "commitment=334", "发送前已利用固定 c=1 配好"],
      ["2", "verifier", "challenge=1", "固定值，没有随机性"],
      ["3", "攻击者", "response R=333", "第一步前已经选好"]
    ]
  });

  const affineExamPart = course.exam[0].parts[1];
  putState(affineExamPart, {
    after: 6,
    title: "第一组映射回代检查",
    headers: ["映射", "明文编号", "代入 c=19m+22", "取模 676", "状态"],
    rows: [
      ["ma→uw", "312", "19×312+22=5950", "5950−8×676=542=uw", "← 当前行"],
      ["il→ex", "219", pending, pending, "下一步检查"]
    ]
  });

  putState(rootsPart, {
    after: 18,
    title: "四个平方根逐一平方回代",
    caption: "每一行都实际计算 x²=qN+r。四行余数都必须等于 radicand 229755。",
    headers: ["候选根 x", "x²", "除以 N=286081 的商", "x²−商×N", "检查"],
    rows: [
      ["163068", "26591172624", "92949", "229755", "通过"],
      ["118090", "13945248100", "48745", "229755", "通过"],
      ["167991", "28220976081", "98646", "229755", "通过"],
      ["123013", "15132198169", "52894", "229755", "通过"]
    ]
  });
  putState(rootsPart, {
    after: 19,
    title: "把点 P 代入曲线并单独留下 b",
    headers: ["曲线", "代入 P=(25,14)", "移项", "待计算式"],
    rows: [[
      "y²≡x³+13x+b (mod 37)",
      "14²≡25³+13×25+b",
      "b≡14²−25³−13×25",
      "b≡−15754 (mod 37)"
    ]]
  });
  putState(rootsPart, {
    after: 21,
    title: "2P 倍点斜率：先分别算分子和分母",
    headers: ["量", "公式", "未取模结果", "mod 37", "下一步"],
    rows: [
      ["分子", "3x²+a", "3×25²+13=1888", "1", "已完成"],
      ["分母", "2y", "2×14=28", "28", "需要求 28⁻¹"],
      ["λ", "分子×分母⁻¹", pending, pending, "待计算"]
    ]
  });
  putState(rootsPart, compactEeaState(22, "求倍点分母 28⁻¹ mod 37", 28, 37, [
    ["Step 1", "1", "9", "−1", "r=37−1×28=9。d=0−1×1=−1", "已完成"],
    ["Step 2", "3", "1", "4", "r=28−3×9=1。d=1−3×(−1)=4", "← 当前行"]
  ], "4", "4", "28×4=112=3×37+1"));
  putState(rootsPart, {
    after: 24,
    title: "3P 加点斜率：先写清使用哪两个点",
    headers: ["点 1", "点 2", "分子 y₂−y₁", "分母 x₂−x₁", "斜率"],
    rows: [[
      "2P=(3,0)",
      "P=(25,14)",
      "14−0=14",
      "25−3=22",
      "λ=14×22⁻¹ (mod 37)"
    ]]
  });
  putState(rootsPart, compactEeaState(25, "求加点分母 22⁻¹ mod 37", 22, 37, [
    ["Step 1", "1", "15", "−1", "r=37−1×22=15。d=0−1×1=−1", "已完成"],
    ["Step 2", "1", "7", "2", "r=22−1×15=7。d=1−1×(−1)=2", "已完成"],
    ["Step 3", "2", "1", "−5", "r=15−2×7=1。d=−1−2×2=−5", "← 当前行"]
  ], "−5", "32", "22×32=704=19×37+1"));
  putState(rootsPart, {
    after: 26,
    title: "用逆元算出 3P 的斜率",
    headers: ["当前式", "代入逆元", "乘积", "mod 37", "结果"],
    rows: [["λ=14×22⁻¹", "22⁻¹=32", "14×32=448", "448−12×37=4", "λ=4"]]
  });
  putState(rootsPart, {
    after: 28,
    title: "比较 3P 与 −P",
    headers: ["点", "x 坐标", "y 坐标的计算", "结果"],
    rows: [
      ["P", "25", "14", "(25,14)"],
      ["−P", "25", "−14 mod 37=23", "(25,23)"],
      ["3P", "25", "上一行加点得到 23", "(25,23)=−P"]
    ]
  });

  putState(rlwePart, {
    after: 1,
    title: "先固定 tuple、系数顺序和环关系",
    headers: ["项目", "本题约定", "后续影响"],
    rows: [
      ["ciphertext tuple", "第一项 c_aux；第二项 c_msg", "解密计算 c_msg−s·c_aux"],
      ["内部系数顺序", "y⁰→y⁷", "题面列表要先倒序"],
      ["系数模数", "mod 83", "负系数要加 83"],
      ["次数关系", "y⁸=−1", "越过 y⁷ 的项折回并变号"]
    ]
  });
  putState(rlwePart, {
    after: 9,
    title: "把阈值区间画成完整判定位",
    headers: ["系数范围", "离哪个编码中心近", "解码 bit", "本题整数边界"],
    rows: [
      ["靠近 0 或 83", "0", "0", "0..20 或 63..82"],
      ["中间区间", "q/2≈41.5", "1", "21..62"]
    ]
  });

  putState(rsaPart, {
    after: 2,
    title: "确定 Fermat 搜索的第一个 s",
    headers: ["候选整数", "平方", "与 n=790199209 比较", "结论"],
    rows: [
      ["28110", "790172100", "<n", "太小"],
      ["28111", "790228321", ">n", "ceil(√n)=28111，从这里开始"]
    ]
  });

  if (rabinPart) {
    rabinPart.steps[1] = "攻击者选 R=23769451。先平方：R²=564986800841401。再做带余除法：564986800841401=11899656×47479253+23004433。因此 C=R² mod N=23004433。";
    rabinPart.steps[2] = "Oracle 返回 Y=31423469。不能只接受这个数字；先平方检查：Y²=987434403993961=20797176×47479253+23004433，所以 Y² mod N 与 C 相同。再检查 Y 不是 R 或 −R 的同余类。";
    rabinPart.steps[23] = "验证两个 gcd 的乘积：13523×3511=13523×3500+13523×11=47330500+148753=47479253=N。";
  }
  putState(rabinPart, {
    after: 2,
    title: "完整计算 C=R² mod N",
    headers: ["R", "R²", "除以 N=47479253 的商", "R²−商×N", "C"],
    rows: [["23769451", "564986800841401", "11899656", "23004433", "23004433"]]
  });
  putState(rabinPart, {
    after: 3,
    title: "检查 oracle 返回值确实是同一密文的平方根",
    headers: ["Y", "Y²", "除以 N 的商", "Y² mod N", "与 C 比较"],
    rows: [["31423469", "987434403993961", "20797176", "23004433", "等于 C"]]
  });
  putState(rabinPart, {
    after: 24,
    title: "两个 gcd 重新乘回 N",
    headers: ["因子 1", "因子 2", "分块乘法", "结果"],
    rows: [["13523", "3511", "13523×3500 + 13523×11", "47330500+148753=47479253=N"]]
  });

  putState(ecdsaPart, {
    after: 1,
    title: "先把 hash 约简到标量模 q",
    headers: ["H(M)", "q", "除法", "余数 h"],
    rows: [["22", "7", "22=3×7+1", "1"]]
  });
  putState(ecdsaPart, {
    after: 3,
    title: "计算 u₁",
    headers: ["h", "w", "乘积", "mod q", "u₁"],
    rows: [["1", "6", "1×6=6", "6 mod 7=6", "6"]]
  });
  putState(ecdsaPart, {
    after: 7,
    title: "写出 X=6P+6Y 的加点输入",
    headers: ["点 1", "点 2", "分子", "分母", "斜率式"],
    rows: [["6P=(13,15)", "6Y=(1,14)", "14−15=−1", "1−13=−12", "λ=(−1)×(−12)⁻¹"]]
  });
  putState(ecdsaPart, {
    after: 9,
    title: "用斜率计算 X 的 x 坐标",
    headers: ["λ", "公式", "未取模结果", "mod 17", "x_X"],
    rows: [["10", "λ²−13−1", "100−13−1=86", "86−5×17=1", "1"]]
  });
  putState(ecdsaPart, {
    after: 11,
    title: "把点坐标约简为 ECDSA 比较值",
    headers: ["x_X", "q", "取模", "v"],
    rows: [["1", "7", "1 mod 7", "1"]]
  });

  const ecdsaLearning = findExample(4, "ECDSA 验证路线");
  if (ecdsaLearning && ecdsaPart) {
    ecdsaLearning.title = "ECDSA 完整数值验证：从 hash 到最终比较";
    ecdsaLearning.prompt = "在模 17 的椭圆曲线上，子群阶 q=7，P=(13,2)，H(M)=22，签名 (r,s)=(1,6)。题目还给出 5P=(4,6)、3Y=(4,11) 和 6Y=(1,14)。验证签名。";
    ecdsaLearning.given = "验证公式：w=s⁻¹ mod q；u₁=H(M)w mod q；u₂=rw mod q；X=u₁P+u₂Y；v=Xₓ mod q。";
    ecdsaLearning.target = "逐项算出 h、w、u₁、u₂、6P、6Y、X 和 v，并比较 v 与 r。";
    ecdsaLearning.steps = ecdsaPart.steps.slice();
    ecdsaLearning.states = (ecdsaPart.states || []).map(state => Object.assign({}, state, {
      headers: (state.headers || []).slice(),
      rows: (state.rows || []).map(row => Array.isArray(row) ? row.slice() : Object.assign({}, row))
    }));
    ecdsaLearning.result = "v=1，与 r=1 相等，所以签名 (1,6) 有效。";
    ecdsaLearning.check = "最终点 X=(1,3) 在曲线上；v=Xₓ mod 7=1；并且所有用到的逆元都已乘回检查。";
    delete ecdsaLearning.ledger;
  }

  const zkTerms = [
    ["Public Statement / 公开陈述", "Prover 要证明的公开命题。Verifier 在协议开始前已经知道它。"],
    ["Witness / 见证或秘密", "让公开陈述成立的秘密数据。Prover 知道它，Verifier 不应从协议中得到它。"],
    ["Prover / 证明者", "声称自己知道 witness，并发送 commitment 和 response 的一方。"],
    ["Verifier / 验证者", "在收到 commitment 后产生随机 challenge，并检查 verification equation 的一方。"],
    ["Commitment / 承诺消息", "Prover 的第一条消息。它先固定本轮随机选择，之后 challenge 才能产生。"],
    ["Challenge / 挑战", "Verifier 在收到 commitment 后随机选择的问题。攻击者在 commitment 前不应知道它。"],
    ["Response / 回答", "Prover 根据 witness、随机选择和 challenge 计算的回答。"],
    ["Completeness / 完备性", "诚实 Prover 持有正确 witness 时，Verifier 应接受。"],
    ["Soundness / 可靠性", "没有 witness 的攻击者只能以很低概率让 Verifier 接受。"],
    ["Zero-Knowledge / 零知识性", "Verifier 除了公开陈述成立之外，不应得到 witness 的额外信息。"]
  ];
  course.glossary = course.glossary || [];
  zkTerms.forEach(term => {
    if (!course.glossary.some(existing => existing[0] === term[0])) course.glossary.push(term);
  });

})();
