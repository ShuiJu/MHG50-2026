(function () {
  const depth = window.REVISION_DEPTH && window.REVISION_DEPTH.cs618;
  if (!depth) return;

  const findExample = (unit, title) => {
    const lesson = depth.learn[unit];
    return [lesson.example, ...(lesson.extraExamples || [])].find(x => x && x.title === title);
  };
  const fullRows = (rows, filled) => rows.map((row, index) => ({
    cells: index < filled ? row : [row[0], ...row.slice(1).map(() => "待计算")],
    status: index < filled ? "done" : "pending"
  }));
  const makeStates = (title, headers, rows, fills, operations) =>
    fills.map((filled, index) => ({
      after: index + 1,
      title,
      operation: operations[index],
      headers,
      rows: fullRows(rows, filled),
      currentRow: Math.max(0, filled - 1)
    }));

  const linear = findExample(0, "一层网络的 backprop 全过程");
  if (linear) {
    const rows = [
      ["前向 1", "ŷ", "w×x+b", "1×2+0", "2"],
      ["前向 2", "L", "(ŷ−t)²", "(2−5)²", "9"],
      ["反向 1", "∂L/∂ŷ", "2(ŷ−t)", "2(2−5)", "−6"],
      ["反向 2", "∂L/∂w", "(∂L/∂ŷ)×x", "−6×2", "−12"],
      ["反向 3", "∂L/∂b", "(∂L/∂ŷ)×1", "−6×1", "−6"],
      ["更新 1", "w", "w−η∂L/∂w", "1−0.1×(−12)", "2.2"],
      ["更新 2", "b", "b−η∂L/∂b", "0−0.1×(−6)", "0.6"],
      ["检查", "新 ŷ / 新 L", "w_new×x+b_new", "2.2×2+0.6=5；(5−5)²", "5 / 0"]
    ];
    linear.states = [
      {after:1,title:"一层网络：同一张前向与反向表",operation:"使用旧参数计算预测 ŷ。",headers:["阶段","变量","公式","代入","结果"],rows:fullRows(rows,1),currentRow:0},
      {after:2,title:"一层网络：同一张前向与反向表",operation:"把预测和目标代入平方误差。",headers:["阶段","变量","公式","代入","结果"],rows:fullRows(rows,2),currentRow:1},
      {after:3,title:"一层网络：同一张前向与反向表",operation:"先求 loss 对网络输出的上游梯度。",headers:["阶段","变量","公式","代入","结果"],rows:fullRows(rows,3),currentRow:2},
      {after:4,title:"一层网络：同一张前向与反向表",operation:"把上游梯度分别乘以 w 和 b 的局部导数。",headers:["阶段","变量","公式","代入","结果"],rows:fullRows(rows,5),currentRow:4},
      {after:5,title:"一层网络：同一张前向与反向表",operation:"用 parameter_new=parameter_old−η×gradient 更新两个参数。",headers:["阶段","变量","公式","代入","结果"],rows:fullRows(rows,7),currentRow:6},
      {after:6,title:"一层网络：同一张前向与反向表",operation:"必须用新参数再次前向计算，检查 loss 是否改变。",headers:["阶段","变量","公式","代入","结果"],rows:fullRows(rows,8),currentRow:7}
    ];
    linear.showLedgerAfterStates = false;
  }

  depth.learn[0].extraExamples = depth.learn[0].extraExamples || [];
  if (!findExample(0, "两层 ReLU 网络：梯度怎样逐层传回")) {
    const example = {
      title: "两层 ReLU 网络：梯度怎样逐层传回",
      prompt: "x=2，t=1。z₁=w₁x+b₁，h=ReLU(z₁)，ŷ=w₂h+b₂，L=(ŷ−t)²。初值 w₁=1、b₁=0、w₂=2、b₂=0，η=0.01。",
      given: "ReLU'(z)=1 当 z>0；ReLU'(z)=0 当 z<0。本题前向得到 z₁>0。",
      target: "计算全部四个梯度，更新四个参数，再次前向检查。",
      stepLabel: "传播步骤",
      steps: [
        "计算隐藏层线性输入 z₁=w₁x+b₁=1×2+0=2。",
        "通过 ReLU。h=max(0,2)=2。因为 z₁>0，本点的 ReLU 局部导数为 1。",
        "计算输出 ŷ=w₂h+b₂=2×2+0=4，再算 L=(4−1)²=9。",
        "从 loss 开始反向。∂L/∂ŷ=2(ŷ−t)=2(4−1)=6。",
        "输出层参数梯度为 ∂L/∂w₂=6×h=12，∂L/∂b₂=6×1=6。",
        "梯度传到隐藏输出。∂L/∂h=(∂L/∂ŷ)×w₂=6×2=12。",
        "穿过 ReLU。∂L/∂z₁=(∂L/∂h)×ReLU'(2)=12×1=12。",
        "输入层参数梯度为 ∂L/∂w₁=12×x=24，∂L/∂b₁=12×1=12。",
        "更新参数：w₁=0.76，b₁=−0.12，w₂=1.88，b₂=−0.06。",
        "用新参数重新前向。z₁=1.4，h=1.4，ŷ=2.572，新 loss=(2.572−1)²≈2.471。"
      ],
      result: "梯度按 loss→输出层→ReLU→输入层的反方向传递。新 loss 约为 2.471，小于旧 loss 9。",
      check: "每个参数都使用自己的 gradient。更新后的参数没有在同一次反向传播中提前参与旧梯度计算。"
    };
    const rows = [
      ["z₁","前向","w₁x+b₁","—","1×2+0","2"],
      ["h","前向","ReLU(z₁)","—","max(0,2)","2"],
      ["ŷ 与 L","前向","w₂h+b₂；(ŷ−t)²","—","2×2+0；(4−1)²","4；9"],
      ["∂L/∂ŷ","反向","2(ŷ−t)","1","2(4−1)","6"],
      ["∂L/∂w₂, ∂L/∂b₂","反向","上游×局部导数","6","6×h；6×1","12；6"],
      ["∂L/∂h","反向","上游×w₂","6","6×2","12"],
      ["∂L/∂z₁","反向","上游×ReLU'(z₁)","12","12×1","12"],
      ["∂L/∂w₁, ∂L/∂b₁","反向","上游×局部导数","12","12×x；12×1","24；12"],
      ["四个参数","更新","θ_new=θ_old−0.01∇θ","—","逐项更新","0.76；−0.12；1.88；−0.06"],
      ["新前向","检查","使用全部新参数","—","z₁=1.4；h=1.4；ŷ=2.572","L≈2.471"]
    ];
    example.states = makeStates(
      "两层网络计算图：前向填值，反向填梯度",
      ["节点或参数","方向","本地公式","上游梯度","本步代入","结果"],
      rows,
      [1,2,3,4,5,6,7,8,9,10],
      [
        "从输入向右计算 z₁。","把 z₁ 送入 ReLU。","完成预测和 loss，保存前向值。","从 loss 产生第一个上游梯度。",
        "用同一个上游梯度计算输出层两个参数梯度。","沿 w₂ 把梯度传回 h。","乘 ReLU 的局部导数。",
        "用传到 z₁ 的梯度计算输入层参数梯度。","所有旧梯度算完后再统一更新参数。","用新参数重新前向检查。"
      ]
    );
    depth.learn[0].extraExamples.push(example);
  }

  const vgg = findExample(2, "VGG 第一层完整计算");
  if (vgg) {
    const rows = [
      ["输入","Input","224","224","3","—","0","输入 shape"],
      ["卷积","3×3 same, S=1, 64 filters","224","224","64","(3×3×3+1)×64","1792","同一 filter 在所有位置共享"],
      ["卷积输出","activation count","224","224","64","224×224×64","3211264","这是 activation，不是 parameter"],
      ["池化","2×2, S=2","112","112","64","⌊(224−2)/2⌋+1","0","每个 channel 独立取最大值"],
      ["池化输出","交给下一层","112","112","64","112×112×64","802816","本行 shape 是下一层输入"]
    ];
    vgg.states = makeStates(
      "VGG 第一层：shape 与 parameter 使用同一张层级表",
      ["阶段","操作","H","W","C","公式或 activation","learnable parameters","本行怎样成为下一行"],
      rows,
      [1,2,3,4,5],
      [
        "先登记输入 H、W、C。","计算一个 filter 的参数，再乘输出 channel 数。","保持卷积输出 shape，单独计算 activation 数。",
        "把卷积输出作为 pooling 输入，高宽各除以 2，通道不变。","把 pooling 输出登记为下一层输入。"
      ]
    );
  }

  depth.learn[2].extraExamples = depth.learn[2].extraExamples || [];
  if (!findExample(2, "4×4 activation 的 2×2 max pooling")) {
    const pool = {
      title: "4×4 activation 的 2×2 max pooling",
      prompt: "输入矩阵为 [[1,7,2,4],[3,2,9,0],[5,1,6,8],[4,3,2,7]]。使用 2×2 window、stride 2。",
      given: "四个窗口互不重叠。输出是 2×2 矩阵。",
      target: "逐窗口填出输出矩阵。",
      steps: [
        "窗口 W₁ 取第 1–2 行、第 1–2 列。四个值为 1,7,3,2，最大值是 7，写入输出位置 (1,1)。",
        "窗口 W₂ 取第 1–2 行、第 3–4 列。四个值为 2,4,9,0，最大值是 9，写入输出位置 (1,2)。",
        "窗口 W₃ 取第 3–4 行、第 1–2 列。四个值为 5,1,4,3，最大值是 5，写入输出位置 (2,1)。",
        "窗口 W₄ 取第 3–4 行、第 3–4 列。四个值为 6,8,2,7，最大值是 8，写入输出位置 (2,2)。"
      ],
      result: "pooling 输出矩阵为 [[7,9],[5,8]]。",
      check: "四个输入窗口各贡献一个输出格。没有跨 channel 混合，也没有 learnable parameter。"
    };
    const rows = [
      ["W₁","行1–2，列1–2","1,7,3,2","7","out(1,1)","7"],
      ["W₂","行1–2，列3–4","2,4,9,0","9","out(1,2)","9"],
      ["W₃","行3–4，列1–2","5,1,4,3","5","out(2,1)","5"],
      ["W₄","行3–4，列3–4","6,8,2,7","8","out(2,2)","8"]
    ];
    pool.states = makeStates(
      "Max pooling：同一张窗口与输出表",
      ["窗口","输入范围","窗口四个值","max","写入位置","当前输出值"],
      rows,[1,2,3,4],
      ["读取第一个 2×2 窗口并写 out(1,1)。","横向移动 stride 2 并写 out(1,2)。","回到左边并向下移动 stride 2。","处理最后一个窗口，完成 2×2 输出。"]
    );
    depth.learn[2].extraExamples.push(pool);
  }

  const attention = findExample(3, "2 个 token、1 维 value 的最小 attention 算例");
  if (attention) {
    const rows = [
      ["原始 score","A→A / A→B","0 / ln 3","—","—","—"],
      ["指数","A→A / A→B","0 / ln 3","1 / 3","—","—"],
      ["归一化","row sum","—","1+3=4","1/4 / 3/4","权重和=1"],
      ["乘 Value","V_A=2 / V_B=10","—","—","(1/4)×2 / (3/4)×10","0.5 / 7.5"],
      ["相加","A 的 output","—","—","0.5+7.5","8"]
    ];
    attention.states = [
      {after:1,title:"Attention：score 到 output 的固定流水表",operation:"对两个 score 分别计算指数。",headers:["阶段","对象","输入","exp 或行和","权重或乘积","输出"],rows:fullRows(rows,2),currentRow:1},
      {after:2,title:"Attention：score 到 output 的固定流水表",operation:"用同一行的指数和 4 归一化，得到权重。",headers:["阶段","对象","输入","exp 或行和","权重或乘积","输出"],rows:fullRows(rows,3),currentRow:2},
      {after:3,title:"Attention：score 到 output 的固定流水表",operation:"每个权重只乘对应的 Value。",headers:["阶段","对象","输入","exp 或行和","权重或乘积","输出"],rows:fullRows(rows,5),currentRow:4},
      {after:4,title:"Attention：score 到 output 的固定流水表",operation:"解释数值结果，不把 attention weight 当作因果解释。",headers:["阶段","对象","输入","exp 或行和","权重或乘积","输出"],rows:fullRows(rows,5),currentRow:4}
    ];
  }

  const mse = findExample(1, "逐维计算 reconstruction MSE");
  if (mse) {
    const rows = [
      ["维度 1","2","1","2−1=1","1²=1","1"],
      ["维度 2","0","2","0−2=−2","(−2)²=4","1+4=5"],
      ["维度 3","1","1","1−1=0","0²=0","5+0=5"],
      ["汇总","—","—","—","平方和=5","MSE=5÷3"]
    ];
    mse.states = [
      {after:1,title:"Reconstruction MSE：固定逐维表",operation:"先确认输入和重建都有三个对应维度。",headers:["维度","x_i","x̂_i","差 x_i−x̂_i","平方","累计平方和"],rows:fullRows(rows,0),currentRow:0},
      {after:2,title:"Reconstruction MSE：固定逐维表",operation:"逐维相减。保留负号，不在平方前把误差相加。",headers:["维度","x_i","x̂_i","差 x_i−x̂_i","平方","累计平方和"],rows:fullRows(rows,1),currentRow:0},
      {after:3,title:"Reconstruction MSE：固定逐维表",operation:"依次平方并更新累计和。",headers:["维度","x_i","x̂_i","差 x_i−x̂_i","平方","累计平方和"],rows:fullRows(rows,3),currentRow:2},
      {after:4,title:"Reconstruction MSE：固定逐维表",operation:"平方和除以维度数 3。若题目使用 sum convention，必须另行说明。",headers:["维度","x_i","x̂_i","差 x_i−x̂_i","平方","累计平方和"],rows:fullRows(rows,4),currentRow:3},
      {after:5,title:"Reconstruction MSE：固定逐维表",operation:"解释训练方向，不把 MSE 当作 embedding 维度。",headers:["维度","x_i","x̂_i","差 x_i−x̂_i","平方","累计平方和"],rows:fullRows(rows,4),currentRow:3}
    ];
  }

  const mask = findExample(3, "Causal mask 在 softmax 前做什么");
  if (mask) {
    const rows = [
      ["位置 1","可访问","1","1","e¹","e/(e+e²)≈0.269","0.269V₁"],
      ["位置 2","可访问","2","2","e²","e²/(e+e²)≈0.731","0.731V₂"],
      ["位置 3","未来，禁止","4","−∞","0","0","0V₃"],
      ["行汇总","—","—","—","e+e²","权重和=1","0.269V₁+0.731V₂"]
    ];
    mask.states = [
      {after:1,title:"Causal mask：同一行 attention 工作表",operation:"先根据 token 2 的可见范围，把未来位置 3 的 score 改为 −∞。",headers:["key 位置","是否可见","原 score","mask 后 score","exp","softmax weight","对输出的贡献"],rows:fullRows(rows,3),currentRow:2},
      {after:2,title:"Causal mask：同一行 attention 工作表",operation:"对 mask 后的三个 score 取指数。e^(−∞)=0。",headers:["key 位置","是否可见","原 score","mask 后 score","exp","softmax weight","对输出的贡献"],rows:fullRows(rows,3),currentRow:2},
      {after:3,title:"Causal mask：同一行 attention 工作表",operation:"只用可访问位置的指数和 e+e² 归一化。",headers:["key 位置","是否可见","原 score","mask 后 score","exp","softmax weight","对输出的贡献"],rows:fullRows(rows,4),currentRow:3},
      {after:4,title:"Causal mask：同一行 attention 工作表",operation:"每个 weight 乘对应 Value，再相加。未来位置的贡献严格为 0。",headers:["key 位置","是否可见","原 score","mask 后 score","exp","softmax weight","对输出的贡献"],rows:fullRows(rows,4),currentRow:3},
      {after:5,title:"Causal mask：同一行 attention 工作表",operation:"检查 mask 必须发生在 softmax 前，保证剩余权重自动重新归一化。",headers:["key 位置","是否可见","原 score","mask 后 score","exp","softmax weight","对输出的贡献"],rows:fullRows(rows,4),currentRow:3}
    ];
  }

  const convPart = depth.exam[1] && depth.exam[1].parts && depth.exam[1].parts[1];
  if (convPart) {
    const rows = [
      ["输入 channel","C_in","RGB","3"],
      ["一个 filter 的空间格","3×3","9","9"],
      ["一个 filter 的 weights","3×3×C_in","3×3×3","27"],
      ["一个 filter 加 bias","27+1","—","28"],
      ["全部 filters","28×C_out","28×64","1792"]
    ];
    convPart.states = [
      {after:1,title:"首卷积层参数：固定完整计算表",operation:"先写公式和输入 channel，不使用 224×224。",headers:["项目","符号或公式","代入","数量"],rows:fullRows(rows,3),currentRow:2},
      {after:2,title:"首卷积层参数：固定完整计算表",operation:"每一个 filter 只加一个 bias。",headers:["项目","符号或公式","代入","数量"],rows:fullRows(rows,4),currentRow:3},
      {after:3,title:"首卷积层参数：固定完整计算表",operation:"把每个 filter 的 28 个参数乘 64。",headers:["项目","符号或公式","代入","数量"],rows:fullRows(rows,5),currentRow:4},
      {after:4,title:"首卷积层参数：固定完整计算表",operation:"检查 224×224 没有进入 parameter 公式。",headers:["项目","符号或公式","代入","数量"],rows:fullRows(rows,5),currentRow:4},
      {after:5,title:"首卷积层参数：固定完整计算表",operation:"用 weight sharing 的定义验证结果。",headers:["项目","符号或公式","代入","数量"],rows:fullRows(rows,5),currentRow:4}
    ];
    convPart.showLedgerAfterStates = false;
  }
})();
