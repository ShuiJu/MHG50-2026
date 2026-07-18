// 整个网站的"白话教学"。目标：只用本站就能从零基础学完五门课并做完今年真题。
// 写作准则（参考 exam-prep-site/gemini.txt）：
//   1) 每一段都先用日常类比把概念说清，再给正式名字；
//   2) 页面上出现过的每个名词都要在网络内某处被解释过；
//   3) 每一步推导都写"中间值"和"这一步在做什么"；
//   4) 例题按"题面→一步步算→得到结论"展开，不留跳跃。
window.REVISION_DEPTH = {
  cs603: {
    start: {
      title: "完全没碰过逻辑、证明、Dafny 也能从这里起步",
      intro: "CS603 听起来全是数学符号，其实它只反复做一件事：先用一句精确的话把“程序应该怎样做”写清楚，再证明程序确实这样做了。打个比方，写代码像装修，雇主口头说“要稳一点”是没有用的；装修工要的是“承重墙必须能承受 500kg、电线必须走 PVC 管”这样可量化的要求。整门课就是定一套写要求的方式，外加一套证明要求被满足的方法。后面学的 Hoare Logic、Dafny、Event-B、Model Checking、LTL 只是同一件事的不同工具，会用到这里讲清的几个基础概念。",
      blocks: [
        {t:"第 0 步：先认清要描述的对象",p:"任何一个程序在某时刻都有输入、当前变量取值（叫“状态”）和输出。要给它写要求，就得说清三类事：进去之前必须满足什么、运行当中要一直保持什么、结束之后必须交回什么。"},
        {t:"第 1 步：把模糊要求拆成可检查的句子",p:"举例：“数组已经复制好”并不够清楚；要拆成“新数组长度等于原数组” + “对每一个合法下标，新数组的值都等于原数组对应位置的值”。越具体，电脑才能帮你自动检查。"},
        {t:"第 2 步：组织一次证明，像三段流水线",p:"证明一条程序正确，永远是三段：① 起点（循环之前）成立 — 这叫“初始化成立”；② 每跑一圈还成立 — 这叫“保持性”；③ 跑完退出后，能由它推到目标 — 这叫“退出条件”。Hoare Logic、Dafny、Event-B 全都是这三段的语法糖。"}
      ]
    },
    glossary: [
        ["Property / 性质","一句描述程序或系统必须满足的精确规则，像“数组下标不能越界”这样的句子。"],
        ["Specification / 规格说明","把前置条件、后置条件、不变量这些性质打包在一起的总称，相当于合同里列的全部条款。"],
        ["Precondition / 前置条件","方法在执行之前必须满足的条件。在 Dafny 里用 requires 声明。例：withdraw(amount) 的前置条件可以是 amount≤balance。"],
        ["Postcondition / 后置条件","方法执行完之后承诺的条件。在 Dafny 里用 ensures 声明。例：withdraw 之后 balance==old(balance)-amount。"],
        ["Invariant / 不变量","程序运行中变量会变，但有一条关系在某些关键时刻（典型是循环每轮开始）总成立。就像“账本每天结账前借贷必须相等”，账本内容每天在变，但这条关系不变。"],
        ["State / 状态","某一时刻所有相关变量的取值合在一起叫一个“状态”。可以把程序想象成从一个状态跳到下一个状态。"],
        ["Counterexample / 反例","一条真正违反性质的具体输入或执行路径。验证工具找到反例就说明你的程序或规格有问题。"],
        ["Verifier / 验证器","把程序和规格读进来，尝试用逻辑证明二者一致的工具。Dafny 编译器自带一个，叫 Z3。"],
        ["Hoare Triple / 霍尔三元组","写成 {P} C {Q} 的断言：若执行 C 之前 P 成立，且 C 能终止，那么 C 执行完之后 Q 成立。P、Q 就是上面说的前置/后置条件。"],
        ["Partial Correctness / 部分正确性","只要程序能停下来就一定给出正确结果；但它不保证程序不会死循环。"],
        ["Total Correctness / 完全正确性","部分正确性 + 能证明程序一定停下来。这是更严格的保证。"],
        ["Loop Invariant / 循环不变量","循环每轮开始和结束都保持为真的条件，用来证明循环是否正确。它绝不是把最终目标原样搬进去；它是一句“在循环中途”也合理的账本。"],
        ["Variant / 循环变体（减量）","每隔一圈就严格变小、且不能为负的整数表达式，用来证明循环一定会终止。就像沙漏里剩下的沙。"],
        ["Dafny","一种把规格和证明直接写在代码旁边的编程语言，自带 requires/ensures/invariant/decreases 等关键字，编译时自动调用验证器。"],
        ["Event-B","基于集合论和事件的形式化建模方法，相当于“在写代码前先用状态机和事件把系统行为画一遍”。"],
        ["Model Checking / 模型检测","把系统每一个可能的状态都列出来，再用电脑挨个查“有没有违反性质的状态”。对状态数有限的问题特别管用。"],
        ["LTL / 线性时序逻辑","一种用来描述“沿时间一条路径怎样变化”的逻辑。常用算子 G(总)、F(最终)、X(下一步)、U(直到)。"],
        ["CTL / 计算树时序逻辑","比 LTL 多了路径量词 A(所有可能分支都要满足) 和 E(至少有一条分支满足)。LTL 没有 A/E。"],
        ["SAT / 布尔可满足性","判断一个只含 AND/OR/NOT 的布尔公式能否找到一组真值赋值让它为真。Sudoku 求解器背后就是 SAT。"],
        ["SMT / 理论可满足性","SAT 基础上加入整数、数组等更多理论的可满足性检查。"],
        ["Z3","微软出品的 SMT 求解器，Dafny 内部用它做证明。"],
        ["FRET","NASA 出品的工具，让你用受限的自然语言写需求，自动翻译成时间逻辑公式，再交给模型检测工具检查。"],
        ["Refinement / 精化","从抽象模型逐步加细节，并证明每加一层细节都不破坏抽象模型已经承诺的行为。"],
        ["Proof Obligation / 证明义务","工具自动生成的、需要被证明的逻辑公式，相当于“自动给你出的证明题”。"],
        ["Propositional Logic / 命题逻辑","只处理真/假两种取值、用 ∧(与)、∨(或)、¬(非)、→(蕴含) 连接的逻辑。"],
        ["Predicate Logic / 谓词逻辑","命题逻辑加上“任意”“存在”量词，可以处理“x 是员工”“x 拿走了 y”这种带主语/谓语的句子。"],
        ["De Morgan's Laws / 德摩根定律","把 NOT 推进括号，AND 变 OR、OR 变 AND。大白话见下方例题。"],
        ["Tautology / 永真式","无论变量真假，整式永远为真。如 P∨¬P（要么下雨要么不下雨）。"],
        ["Unsatisfiable / 矛盾式","无论变量怎么取值，整式永远为假。如 P∧¬P。"],
        ["Satisfiable / 可满足式","至少有一组取值能让公式为真。"],
        ["Implication / 蕴含 A→B","只在 A 真而 B 假时为假，其他时候恒真。可改写为 ¬A∨B。它不表示时间先后。"],
        ["Conjunction / 合取 ∧","“和”的意思。p∧q 当 p、q 同真时才真。"],
        ["Disjunction / 析取 ∨","“或”的意思。p∨q 当 p、q 至少一个真时为真。"],
        ["Quantifier / 量词 ∀/∃","∀x 表示“对每一个 x”，∃x 表示“至少存在一个 x”。"],
        ["Assignment / 赋值","把一个值写进变量的语句，如 i:=i+1。"],
        ["Substitution / 替换","Hoare Logic 处理赋值的方式：若赋值后想成立 Q，就把 Q 里出现这个变量的所有地方换成赋值号右边那个表达式。"],
        ["Allocation Rule / 分配规则","Hoare Logic 中处理 new/create 数组的规则，建立新对象的属性如长度，再经后续赋值进入不变量。"],
        ["Sequence Rule / 顺序规则","把 C1;C2 拆成两段，找中间断言 R，分别证 {P}C1{R} 与 {R}C2{Q}。"],
        ["Conditional Rule / 条件规则","if b then C1 else C2：在 b 分支证 {P∧b}C1{Q}，¬b 分支证 {P∧¬b}C2{Q}。"],
        ["Consequence Rule / 后果规则","把前置加强或后置弱化以套用其他规则的纯逻辑改写规则；本身不做实质推理。"],
        ["Deductive Verification / 演绎验证","从程序与形式合约直接生成验证条件并用逻辑定理证明的方法，对应 Dafny/Hoare 之类工具。"],
        ["Spin","用于 model checking 的开源工具；输入 Promela 描述的并发系统，自动穷尽状态寻找违反时序性质的反例。"],
        ["Promela","Spin 用的建模语言，描述并发进程、消息通道和 guarded commands。"],
        ["CoCoSpec","FRET 生成的 assume-guarantee 合约语言，可挂到 Simulink 组件由 Kind2 模型检测器验证。"],
        ["Simulink","MathWorks 的图形化模型设计环境，常被作为系统合约集成挂载点。"],
        ["Rodin","Event-B 的配套开源工具，自动从 context/machine/event 生成 Proof Obligation 并辅助证明。"],
        ["Soundness / 可靠性","证明方法只能产生正确结论这一性质；“AI 候选不等于证明”指的就是它必须经过 sound verifier 复核。"],
        ["Runtime Verification / 运行时验证","把性质变成 monitor，只在程序实际跑出来的那一条轨迹上做检查；它不穷尽所有路径，但能在部署期立即报警，今年卷 Q4(b) 出现。"],
        ["Behaviour Driven Formal Model Development","课程里特指用 Event-B 做“以行为/事件驱动”的系统级规格与建模，配合 Rodin 自动生成证明义务；今年卷 1(c) 出现。"],
        ["Event-B Element 简记","context 放世界设定，machine 放变量/不变量，event 用 guard/action 改状态，before-after predicate 描述旧值→新值。"],
        ["Adversarial Training / 对抗训练","把人为构造的“对抗样本”加入训练集，让模型在已知攻击附近也表现一致；它是经验鲁棒性改进，不构成对全域的形式保证。"],
        ["Property-Driven Training / 性质驱动训练","把“违反某条性质”加入 loss 或训练数据生成，让模型在训练时就倾向于满足该性质；同样不穷尽所有输入。"],
        ["Counterexample Path / 反例路径","模型检测器找到的、从初始状态走到违反性质的那一条具体状态序列，便于你定位 bug。"],
        ["Fairness / 公平性假设","对并发模型“无穷次可执行”的进程做“必然无穷次被调度”的假设；会影响 liveness 结论，必须显式声明。"],
        ["Atomic / 原子步骤","Spin/Promela 中 atomic 块让一段代码被“一次不可打断地走完”，用来减少状态空间交错。"],
        ["Never Claim","Spin 中用来描述“系统不应该走的路径”的 Promela 块，常用 LTL 反例自动机生成。"],
        ["Hoare Logic Rule Names / 规则名简称","Allocation/Assignment/Sequence/Conditional/While/Consequence 是六条经典规则，今年卷 1(d) 必须显式写规则名。"],
        ["ReverseArray / CalculateAge / AllEven","今年卷 Q2 三段 Dafny 示例方法名；分别考查原地反转、继承下不变量、递归 decreases。"],
        ["FRETish / FRET 受限自然语言","FRET 里写需求的受限模板，用 scope/component/condition/response/timing 等字段减少自然语言歧义。"]
      ],
    learn: [
      {
        plain: "逻辑符号只是把日常语言里的“每个”“至少有一个”“如果……那么……”写成不会引起歧义的形式。先把每个符号读回完整中文，再去做运算，远远不要直接盯着公式猜。比如 ∃x.(A(x) ∧ ¬(G(x) ∨ Y(x))) 就是“至少存在一个 x，它满足 A，并且既不满足 G 也不满足 Y”。这一段先打地基：命题逻辑加上德摩根定律，再加量词和蕴含的语义，是整门课后面的语法系统。",
        steps: [
          "看到一个谓词 A(x)，把它想成一句带空格的话，比如“x 是员工”。空格填上具体 x 之后，这句话要么真要么假；未填之前它本身没有真假。",
          " conjunction ∧ 读“并且”，析取 ∨ 读“或者”。大白话：“我要苹果 ∧ (香蕉 ∨ 樱桃)”等价于“(我要苹果 ∧ 香蕉) ∨ (我要苹果 ∧ 樱桃)” — 这就是分配律。",
          "蕴含 p→q 只在“p 真而 q 假”时为假。换句话说，“p 真时不能违反 q”。很多初学者以为它表示时间先后，其实没有。",
          "De Morgan 定律口诀四个字：“进非变号”。¬(p∧q)=¬p∨¬q；¬(p∨q)=¬p∧¬q。大白话：(不能既吃汉堡又喝可乐) 等于 (你不吃汉堡 或 你不喝可乐)。",
          "量词 ∀x 表示“对范围内每一个 x”；∃x 表示“至少找一个 x”。量词只管辖它紧跟着的那个作用域（看括号！）。",
          "真值表必须列齐 (p,q) 的四种组合 (T,T),(T,F),(F,T),(F,F)，然后逐列算。如果两列最终结果四行全相同，说明两式逻辑等价。",
          "复杂公式从最内层括号向外读。每一步先把谓词写回自然语言，再做 and/or，最后再量词。"
        ],
        example: {
          title: "2026 两条 ∃ 公式为什么完全不同（题 1a 的核心）",
          prompt: "比较 ∃x.(A(x) ∧ ¬(G(x) ∨ Y(x))) 与 ∃x.(A(x) → ¬(G(x) ∨ Y(x)))。",
          steps: [
            "按题面的点号作用域，把整个 body 加括号。第一式意为“存在一个 x，它是 A，而且既不是 G 也不是 Y”；第二式意为“存在一个 x，如果它是 A，则它不是 G 也不是 Y”。",
            "第一式要求同一对象同时是 A 并且不 G/Y。这“同时”两个字是关键。",
            "第二式是蕴含。如果你取的 x 根本不是 A，前件就假，整条蕴含自动为真。所以第二式很容易靠“取一个无关对象”成立。",
            "构造一个反例来感受差距：假设论域 {u, v}。A(u) 真、G(u) 真、A(v) 假、Y 都假。",
            "第一式在 u 处不成立（因为 G(u) 真）；v 也不是 A，所以也不成立；整体为假。",
            "第二式取 v：A(v) 假，前件假，蕴含自动真，所以整式为真。",
            "可见两式差很多。绝不能因为“看着差不多”就把右侧那个 x 当作自由变量来糊弄解释。"
          ],
          result: "差别根本在 conjunction 与 implication 的真值条件。把两式完全加括号后再比较，这是 1(a) 满分答案的最重要动作。"
        },
        practice: {
          q: "把“每个请求最终都有响应”翻译成形式公式，可以用 ∃x(Request(x)→Response(x)) 吗？",
          hint: "“每个”对应哪个量词？“最终”需要时间逻辑，但这里先问量词选择是否正确。",
          a: "不可以。“每个”对应 ∀ 不是 ∃；写成 ∃x(...) 是“至少有一个请求 → 一个响应”，显然不是题意。即便只谈量词层，正确形式应含 ∀；若进入 LTL，则要进一步写 G(req→F resp)。"
        }
      },
      {
        plain: "Hoare Logic 是把“如果之前对的、跑完之后也对的”这件事变成一条条规则的语法系统。把它想象成流水线检查：入口满足 P，过一个小工序后得到中间状态 R，再过下一道工序，最后得到 Q。每一道工序都有一条 Hoare 规则告诉你怎么递推。循环之所以最难，只是因为同一小段代码可能被跑任意次，所以你要找一句“每轮都不变坏”的话（不变量）当账本。",
        steps: [
          "先把所有变量理清：要求的是什么 {P} C {Q}？P 是执行前的事实，Q 是执行后的事实。",
          "赋值规则（Assignment Rule）：处理 x:=E 时要倒推。若赋值后想要 Q 成立，就把 Q 中所有 x 替换为 E，得到赋值前必须成立的条件。例：要赋值后 i=1，那赋值前 i+1=1，即 i=0。",
          "顺序规则（Sequence Rule）：把 C1;C2 拆成两段，找一个中间条件 R，分别证 {P} C1 {R} 和 {R} C2 {Q}。",
          "条件规则（Conditional Rule）：if b then C1 else C2 — 在 b 成立分支证 {P∧b} C1 {Q}，另一分支证 {P∧¬b} C2 {Q}。",
          "while 规则：找一句 invariant I，分别证明 ① P→I（入口进入循环前先成立）② {I∧guard} body {I}（跑一圈还成立）③ I∧¬guard → Q（退出时推到目标）。",
          "后果规则（Consequence Rule）：可以把前置条件加强、后置条件弱化，让规则套得上。它本身不做实际推理，只在逻辑层面做“等价改写”。",
          "证明完全正确性要多加一步 variant V：在 guard 为真时 V 非负，每跑一圈 V 严格变小。这样循环必然终止。"
        ],
        example: {
          title: "数组复制循环：把每条 Hoare 规则真正用上来（题 1d 的解法骨架）",
          prompt: "b:=new int[n]; i:=0; while i<n { b[i]:=a[i]; i:=i+1 }。证明 b 最终是 a 的完整副本。",
          steps: [
            "令 n=a.Length。设立 invariant I ≜ 0≤i≤n ∧ b.Length=n ∧ ∀k(0≤k<i→b[k]=a[k])，意思是“已复制区下标 0..i-1 与原数一致，i 在合法范围”。",
            "[Allocation/Assignment]：b:=new int[n] 让 b.Length=n；再做 i:=0，用替换规则把 I 里 i 全换 0，得 0≤0≤n ∧ b.Length=n ∧ ∀k(0≤k<0→...)，其中 k<0 范围为空，所以第三项平凡成立。前置 a.Length>0 保证 0≤0≤n。",
            "[While 入口]：假设进入某轮时 I 成立且 guard i<n 为真，那么 0≤i<n，数组访问 b[i] 合法。",
            "[Array assignment]：执行 b[i]:=a[i]，旧前缀都不动，新位置 i 也相等，所以得到 ∀k(0≤k<i+1→b[k]=a[k])。",
            "[Assignment + Sequence]：再执行 i:=i+1，对 I 做替换：把 i 全换成 i+1，得到边界 0≤i+1≤n（写成 0≤i≤n）且前缀范围 <i 与上一步匹配。所以 body 一圈下来 I 又回到成立。",
            "[While + Consequence]：循环退出意味着 I∧¬(i<n) 成立。I 中有 i≤n，加 ¬(i<n) 即 i≥n，得 i=n。再把 i=n 代回 I 的前缀条件：∀k(0≤k<n→b[k]=a[k])，正是后置条件。",
            "[Variant]：证明总正确性时取 V=n-i。guard 真时 i<n，所以 V≥1>0；每轮 i:=i+1 使 V 减 1，严格下降且非负，因此循环必终止。"
          ],
          result: "卷面必须把 Allocation、Assignment、Sequence、While、Consequence 五条规则的中间断言逐一落到纸上，并写出 variant；只写 invariant 名称不算回答了 1(d) 的 rules and simplification steps。"
        },
        practice: {
          q: "循环里 i 从 0 每次加 2，guard 是 i<n。能用 n-i 作 variant 证明终止吗？",
          hint: "variant 在 guard 真时必须非负且每轮严格递减。",
          a: "可以。入口 i=0<n，所以 V=n>0；每轮 i 加 2，V 减 2，仍严格下降；非负也成立（退出后允许变负不影响，关键是 guard 为真时非负）。"
        }
      },
      {
        plain: "Dafny 就是把上面这些规则贴在你代码旁边由编译器自动检查的语言。requires 是“调用方必须保证的事”，ensures 是“我承诺给调用方的事”，invariant 是“循环账本”，decreases 是“剩余工作量”。像报税一样：少写一句别人就拿不到正确结论，多了不影响。",
        steps: [
          "先把方法的数学意义一句话说清，先不写语法。reverse 的意义是“输出位置 i 上是旧数组位置 n-1-i 的值”。",
          "用 old(...) 引用方法开始时的状态，否则你看到的是被赋值后的数组，原值已被覆盖。",
          "循环 invariant 只描述“已处理区与未处理区的关系”，不要把最终 postcondition 整段硬搬进去。",
          "递归用 decreases 选数据结构规模。比如 seq<int> 的尾 s[1..] 长度比 s 少 1，所以 |s| 是天然的递减度量。",
          "predicate 用于描述对象是否合法，例如 Valid() reads this { 15 < age < 65 }；constructor 要在返回前建立 Valid，所有公开方法入口要求 Valid、出口恢复 Valid。",
          "继承时，子类对象必须同时满足父类的 Valid 和父类合约；子类方法不能破坏父类入口可用性和出口承诺。"
        ],
        example: {
          title: "AllEven 的完整合约（题 2c 的核心）",
          prompt: "用 Dafny 写一个递归函数，检查 seq<int> 中所有元素是否为偶数。",
          steps: [
            "先想数学含义：返回值 res 应“等价于”∀i(0≤i<|s| → s[i]%2==0)，而不是单方向蕴含。",
            "空序列时所有元素满足任何性质，所以返回 true。这就是递归的终止基准。",
            "非空时检查 s[0]，递归检查 s[1..]。",
            "每次递归调用 |s| 减 1，所以写 decreases |s|。",
            "完整合约：ensures res == (forall i :: 0<=i<|s| ==> s[i]%2==0)；body 若 |s|==0 则 true else s[0]%2==0 && AllEven(s[1..])。",
            "sequence 是不可变值，slice 表达剩余输入非常方便，old/等式推理都更直接。"
          ],
          result: "用 iff 合约而非“只要 res 真那么全是偶”，才能完整刻画返回值；只写 res→allEven 算弱合约。"
        },
        practice: {
          q: "ReverseArray 只写 ensures a.Length==old(a.Length) 为何远远不够？",
          hint: "一个根本不交换元素的方法是否也满足它？",
          a: "满足。长度不变没有描述反转结果。还需要 ∀k(0≤k<n → a[k]==old(a[n-1-k]))，必要时还要声明 modifies a 的 frame。"
        }
      },
      {
        plain: "Event-B 是“在写代码前先把系统行为用状态机和事件画一遍”的方法。它有四个角色：context 放不变的世界设定（集合、常量、公理）；machine 放会变的状态（变量+不变量）；event 放一次合法动作（guard + action）；rodem 工具会自动生成“必须证明”的 formula，叫 Proof Obligation。",
        steps: [
          "在 context 里放不会被事件改变的东西：常量、类型集合、公理。",
          "在 machine 里声明变量，并写 invariant（每个可达状态都要满足的规则）。",
          "每个 event 写两个东西：guard 决定“什么时候能发生”，action/before-after predicate 决定“发生之后状态变成什么”。",
          "工具自动生成的 Proof Obligation 主要两类：① 初始状态满足 invariant；② 任一 guard 成立时的 event 接在合法状态后，新状态仍满足 invariant。",
          "FRET 是工具链的“自然语言入口”：用受限模板写 component/scope/condition/response/timing，自动生成形式时间逻辑公式，再交给 Kind2 模型检测或 Copilot 运行时监控。",
          "Refinement 是在抽象模型上加细节：证明加细节之后的每一步都模拟抽象模型对应那一步。它不是“重新写”，而是“加层证明一致”。"
        ],
        example: {
          title: "一个容量为 10 的房间计数器",
          prompt: "变量 count 记录人数，进入和离开都不能让人数越界。",
          steps: [
            "context 给常量 CAP=10。",
            "machine 变量 count；invariant 写 0≤count≤CAP（这就是所有可达状态都要满足的规则）。",
            "Enter event：guard count<CAP；action count:=count+1。",
            "Exit event：guard count>0；action count:=count-1。",
            "证明 Enter：假设 0≤count≤10 且 count<10，可推出 0≤count+1≤10。Exit：假设 0≤count≤10 且 count>0，可推出 0≤count-1≤10。这两个就是 invariant preservation PO。"
          ],
          result: "Event-B 模型对错的关键不是事件能不能跑，而是每个事件是否保持 invariant 不被破坏。"
        },
        practice: {
          q: "如果 Enter 没有 count<CAP guard 会怎样？",
          hint: "试 count=10。",
          a: "count=10 时仍可进入变成 11，违反不变量；对应的 invariant-preservation PO 无法证明，Rodin 会指出反例条件。"
        }
      },
      {
        plain: "Model Checking 不是抽几个例子，而是把所有可能状态全列出来挨个检查。LTL 是用来描述“沿时间怎样变化”的逻辑：G 是“总是这样”，F 是“最终会发生”，X 是“下一步”，U 是“保持直到”。像红灯停车这种要求，看似简单，但单写“最终停下”太弱，要拆成两条性质：停车前不能越过路口 + 停车后保持到绿灯。",
        steps: [
          "先定义原子命题（red、stopped、green、beforeIntersection…），否则公式里的符号没有含义。",
          "判断性质是 safety（坏事永不发生）还是 liveness（好事最终发生）。Safety 常写 G¬bad；响应常写 G(trigger→F response)。",
          "p U q 读“p 保持直到 q 发生”，要求在某时刻之前 p 一直真，且该时刻 q 真。",
          "若只要求“一直 p 直到可能 q 不必发生”用 weak until W；要求 q 最终必发生用 strong until U。两种别混。",
          "Model checker 找到反例会给完整路径；Runtime Verification 只观察实际运行的那一条轨迹，发现违反就报警，但不观察的全状态空间没法穷尽。",
          "Spin/Promela 是常用模型检测工具：atomic 减少交错；assert 查 safety；never claim 或 LTL 公式查路径性质。fairness 假设会改变 liveness 结论，要明确写。"
        ],
        example: {
          title: "红灯停车：为什么单写 eventually 不够",
          prompt: "检测到红灯后，车必须在路口前停下并保持停止直到绿灯。",
          steps: [
            "定义原子命题：red, green, beforeIntersection, passedIntersection, stopped，并约定 beforeIntersection 一旦越线就不再为真。",
            "只写 F(beforeIntersection∧stopped) 允许“先越线再折回来停”，明显错。",
            "拆第一条性质：G((red ∧ ¬green ∧ beforeIntersection) → (¬passedIntersection U (stopped ∧ beforeIntersection)))，强迫“越线前已停下”。",
            "再拆第二条：G((red ∧ stopped ∧ ¬green) → (stopped W green))，要求“绿灯前一直停着”。",
            "若环境保证 green 最终一定发生，第二条里的 W 可加强为 U；不保证的话用 W，否则会过强。"
          ],
          result: "把“及时停下”和“停下后保持”拆成两条性质，并写清 green 是否保证最终发生；这样不会让一个过晚的 F 偷偷满足题意。"
        },
        practice: {
          q: "F(response) 为什么不能表达“每个 request 最终都有 response”？",
          hint: "它要求几次 response？有把 request 和 response 配对吗？",
          a: "F(response) 只要求整条路径未来至少出现一次 response；一次响应可能根本不在任何请求之后。必须写 G(req→F resp) 才配对。"
        }
      },
      {
        plain: "AI Verification 是今年 Q3 的考点。核心矛盾：AI 能帮你提候选规格、不变量或测试，但“看起来合理”远远不等于证明。SAT/SMT/Z3 是背后的自动逻辑工具，会用约束求解告诉你“是否存在反例”。把这件事记住整年里都不亏。",
        steps: [
          "SAT 只处理布尔变量（AND/OR/NOT）；SMT 在布尔骨架上加入整数、数组、未解释函数等理论；Z3 是常见的 SMT solver。",
          "DPLL/CDCL 是 SAT solver 的核心算法：传播、决策、冲突分析与学习。",
          "常见编码方式：把“存在违反规格的执行”编码成一个约束，丢给 SMT；返回 unsat 则没有反例，证明成立；返回 sat 则返回那一个反例。",
          "AI 在验证链里的两个机会：① 快速生成候选规格/不变量/证明辅助；② 搜索反例或语义解释。",
          "两个挑战：① 幻觉，模型可能给出“看着像但其实不对的”公式；② 数据分布外的行为、不可解释、过度自信。",
          "两种训练技术：adversarial training 把对抗样本加进训练集增强鲁棒性；property-driven training 把“违反某条性质”加到 loss 里，引导学习目标。",
          "关键句：“训练技术改善经验行为，但不构成对全域的形式保证”。对抗训练只覆盖你试过的攻击，property-driven 也只在你训练用到的分布里。"
        ],
        example: {
          title: "AI 生成循环不变量时如何保持可信",
          prompt: "LLM 建议 invariant i≤n。能直接宣布循环正确吗？",
          steps: [
            "先查初始化：能推出 i≤n 在入口成立吗？若不能，则直接拒。",
            "再查保持性：跑一圈 body 后 i≤n 还成立吗？",
            "再查退出：invariant ∧ ¬guard 能推出 postcondition 吗？",
            "若前两步过但第三步过不了，这个 invariant 真但太弱，对证明目标没用。",
            "最终结论：AI 负责提出候选，sound verifier 负责接受/拒绝；保证来自 prover 而非语言模型。"
          ],
          result: "本例解释为什么 AI 候选必须经过独立验证；今年 Q3(b) 要写两个机会、两个挑战加上“训练不是验证”这一关键句。"
        },
        practice: {
          q: "对抗训练让某网络在所有已知攻击上都通过，是否等于已被形式验证？",
          hint: "已知攻击集合 = 所有允许的扰动集合吗？",
          a: "不等。对抗训练只覆盖采样过的攻击；形式保证还需对明确定义的扰动集合证明“对所有输入”性质成立。"
        }
      }
    ],
    exam: [
      {
        question: "Q1 共 25 分，把命题/谓词逻辑、Hoare Logic 验证和部分/总正确性五件事串在一题。",
        parts: [
          {
            label:"(a)",
            ask: "解释 ∃x.(A(x) ∧ ¬(G(x) ∨ Y(x))) 与 ∃x.(A(x) → ¬(G(x) ∨ Y(x))) 的差别。",
            steps: [
              "把题面两式按点号作用域完全加括号；不要无依据地宣称右侧 x 是自由变量。",
              "第一式要同一对象同时是 A 且非 G/Y；第二式只要存在对象使蕴含成立。",
              "构造反例 domain={u,v}，A(u) 真 G(u) 真、A(v) 假 Y 都假。",
              "第一式在 u 处不成立、v 不是 A 因此也不成立，整体假。",
              "第二式取 v：A(v) 假 → 整条蕴含自动真，整体真。"
            ],
            final: "差别是 conjunction 与 implication 的满足条件。在你写 iff 或反例时比“看着差不多”更可信。"
          },
{
            label:"(b)",
            ask: "用真值表证明 p∧q→p ≡ r∨¬r。",
            steps: [
              "画 4 行表，以 p, q 取值的四种组合为表头：行1 (T,T)；行2 (T,F)；行3 (F,T)；行4 (F,F)。",
              "算 p∧q 这一列：行1 T∧T=T；行2 T∧F=F；行3 F∧T=F；行4 F∧F=F。",
              "算 (p∧q)→p 这一列（蕴含 A→B 只在 A 真而 B 假时为假）：",
              "  行1：(T)→T = T（前件真后件真，蕴含成立）；",
              "  行2：(F)→T = T（前件假，蕴含自动成立）；",
              "  行3：(F)→F = T（前件假，蕴含自动成立）；",
              "  行4：(F)→F = T（前件假，蕴含自动成立）。",
              "结论：左边列 (p∧q)→p 四行均为 T，是 tautology。",
              "右边 r∨¬r 是排中律：无论 r 取 T 或 F，r∨¬r 恒为 T，也是 tautology。",
              "两个 tautology 在任意 valuation 下都为 T，所以两边逻辑等价。"
            ],
            final: "卷面应把 4 行真值表逐列展开，每行求出 (p∧q)→p 的值；最终列四行均为 T，与右边排中律的 T 相等 → 等价。"
          },
          {
            label:"(c)",
            ask: "解释 Behaviour Driven Formal Model Development、Model Checking、Deductive Verification。",
            steps: [
              "Behaviour Driven Formal Model Development：本课材料明显指 Event-B + Rodin；用 set theory/event logic 表达状态与行为，支持 abstraction/refinement，自动生成 proof obligation。",
              "Model Checking：构造有限状态模型并系统探索所有可达状态/路径；例子 Spin 检查 Promela 模型；失败给完整反例路径。",
              "Deductive Verification：从程序与 formal contract 生成 verification conditions 并用逻辑证明；例子 Dafny 用 Z3 证 arrays 方法满足 ensures。"
            ],
            final: "每项按“定义—验证的性质—工具/例子”写一段，不要把第一项误写成普通 BDD 测试。"
          },
          {
            label:"(d)(e)",
            ask: "验证复制循环并扩展到总正确性。",
            steps: [
              "明确题给的 contract：requires a != null ∧ a.Length > 0；ensures b.Length == a.Length ∧ ∀k(0≤k<a.Length → b[k]==a[k])。设 n=a.Length，postcondition 变为 b.Length==n ∧ ∀k(0≤k<n → b[k]==a[k])。",
              "找出循环 invariant I ≜ 0≤i≤n ∧ b.Length==n ∧ ∀k(0≤k<i → b[k]==a[k])。直观是：“下标 i 还在合法范围、新数组长度正确、已复制区 0..i-1 都对”。",
              "① 初始化（Allocation + Assignment）：先把 b := new int[n]，引入 b.Length=n；再 i := 0，做赋值替换——把 I 中 i 全替换为 0，得到 0≤0≤n ∧ b.Length=n ∧ ∀k(0≤k<0 → ...)。空区间 ∀k 条件平凡成立；前置 a.Length>0 给 0≤0≤n。于是前置 ⇒ I 初始成立。",
              "② 保持性（Array assignment + Sequence + Assignment）。假设进入某轮时 I 成立且 guard i<n 成立，则 0≤i<n。",
              "  第 1 小步：执行 b[i] := a[i]。旧前缀 0..i-1 都未动；新位置 i 写为 a[i]，所以得到 ∀k(0≤k<i+1 → b[k]==a[k])。",
              "  第 2 小步：执行 i := i+1。对刚得到的条件做赋值替换：把 i 整体替换为 i+1 — 边界变 0≤i+1≤n 即 0≤i≤n；前缀写成 <i+1 即 <i（与替换后的 i 对齐）。得到的新条件恰好等于 I。所以一圈后 I 仍成立。",
              "③ 退出（While + Consequence）。退出条件 I ∧ ¬(i<n)，即 0≤i≤n ∧ i≥n，得 i=n。代回 I 的前缀条件 ∀k(0≤k<n → b[k]==a[k])，与 postcondition 一致。",
              "(e) 总正确性在 partial 之上加终止证明。",
              "  选 Variant V ≡ n − i。在 guard 为真时 i<n，所以 V = n−i ≥ 1 ≥ 0；非负成立。",
              "  跑一圈 i 变 i+1，新 V' = n−(i+1) = V−1；严格递减成立。",
              "  因 V 是非负整数且每圈严格减 1，必在某圈降至 0，届时 i=n，guard 假，循环终止。",
              "  终止时部分正确性已证，故总正确性成立。"
            ],
            final: "完整交付 Allocation、Assignment、Array assignment、Sequence、While、Consequence 的中间断言加上 variant n−i；才完整回应 8+4 分。"
          }
        ]
      },
      {
        question: "Q2 把同一套方法用到 Dafny 类、原地数组反转、递归序列三件事。",
        parts: [
          {
            label:"(a)",
            ask: "设计 Employee 并解释继承下不变量。",
            steps: [
              "字段 var age:int；predicate Valid() reads this { 15 < age < 65 }。",
              "constructor(a:int) requires 15<a<65 ensures Valid() && age==a { age:=a; }；返回前必须建立 Valid。",
              "method CalculateAge(int currentYear, int birthYear) returns (int res) requires Valid() && currentYear>=birthYear ensures res==currentYear-birthYear ensures Valid() {res:=currentYear-birthYear;}。",
              "若题意要更新字段则同时要求新 age 仍在 15<age<65 范围。",
              "若 Employee 继承/实现 Person，子类对象必须同时满足 Person.Valid 和 Person 合约；子类方法不能破坏父类入口可用性和出口承诺。具体 extends/trait 语法按课程 Dafny 版本写。"
            ],
            final: "卷面要同时有字段、Valid、constructor、calculate-age body/contracts，以及继承产生的两层 proof obligations；只写原则不算 implement。"
          },
          {
            label:"(b)",
            ask: "为 ReverseArray 写 contract、invariants 与 variant。",
            steps: [
              "令 n=a.Length；requires a!=null；modifies a；ensures a.Length==old(a.Length) ∧ ∀k(0≤k<n → a[k]==old(a[n-1-k]))。",
              "边界/对称 invariant：0≤i≤j+1≤n ∧ i+j=n-1，意思是两端指针没交错。",
              "左区 invariant：∀k(0≤k<i → a[k]==old(a[n-1-k]))；右区 invariant：∀k(j<k<n → a[k]==old(a[n-1-k]))。",
              "未处理中区 invariant：∀k(i≤k≤j → a[k]==old(a[k]))，说明奇数长度退出时中间元素未被错改。",
              "decreases j-i；guard i<j 时为正，每轮 i+1、j-1 后减 2。分别检查初始化、swap 后保持和退出。"
            ],
            final: "把四组 invariant 写成公式；“两端已处理、中间未处理”的口头描述不能替代 annotations。"
          },
          {
            label:"(c)",
            ask: "为 AllEven 写 decreases、sequence 解释和 contract。",
            steps: [
              "decreases |s|；递归参数 s[1..] 长度少 1。",
              "sequence 是不可变值，slice 安全表达剩余输入并便于 old/等式推理。",
              "ensures res == ∀i(0≤i<|s| → s[i]%2==0)；注意是 iff 而不是单向。",
              "空序列使全称命题为真（空集所有元素满足任何性质），递归基准一致。"
            ],
            final: "用 iff 合约而非只写 res→allEven，才能完整刻画返回值。"
          }
        ]
      },
      {
        question: "Q3 是概念题，但评分要求每个概念必须连接到具体性质、工具和例子。",
        parts: [
          {
            label:"(a)",
            ask: "解释 Event-B 五个核心元素与 proof obligations。",
            steps: [
              "context：静态集合/常量/公理；machine：动态状态。",
              "variables 描述状态；invariants 描述所有可达状态规则；events 用 guard/action 改状态。",
              "before-after predicate 把旧值→新值关系写成逻辑。",
              "用一个计数器例子列 initialization preserves invariant 与 Enter preserves invariant 两项 PO。"
            ],
            final: "至少给两项具体 PO，不能只罗列术语。"
          },
          {
            label:"(b)(d)",
            ask: "AI verification 的机会/挑战及两种训练方法。",
            steps: [
              "机会 1：从代码生成候选规格/不变量；机会 2：搜索反例或辅助证明。",
              "挑战 1：hallucination 导致错误规格；挑战 2：分布外、不可解释、验证成本。",
              "adversarial training 用对抗样本；property-driven training 把性质违反加进 loss/数据生成。",
              "共同点：训练时引导行为；差别：样本攻击 vs 显式性质驱动；两者都不构成对全域的形式证明。"
            ],
            final: "严格写两项机会、两项挑战、相同点、不同点和“不足以保证”。"
          },
          {
            label:"(c)",
            ask: "解释 FRET 的支持链。",
            steps: [
              "受限自然语言模板减少歧义。",
              "记录 component、scope、condition、response、timing 字段。",
              "FRET 自动把这些形式化为时间逻辑等价的性质。",
              "提供需求追踪、检查，并与 Kind2/Copilot 等验证工具衔接。"
            ],
            final: "答案形成“记录自然语言→形式化→验证与追踪”连续链。"
          }
        ]
      },
      {
        question: "Q4 把合约层次、两种运行检查方式和四条自动驾驶 LTL 性质放在一题。",
        parts: [
          {
            label:"(a)",
            ask: "区分软件合约与系统合约。",
            steps: [
              "软件合约约束方法/类：requires、ensures、invariant；例 withdraw requires amount≤balance，ensures balance==old(balance)-amount。",
              "系统合约跨组件并常含时间/交互；例“每个 request 最终都有 response”。",
              "选一条完整工具链：FRET 用 FRETish 的 scope/condition/component/timing/response 记录系统 requirement。",
              "FRET 可生成 CoCoSpec assume-guarantee contracts，加入 Simulink component，再由 Kind2 检查；也可生成 Copilot runtime monitor。"
            ],
            final: "差别落在作用范围与时间行为；工具部分形成“需求→合约→模型检查/监控→证据”完整链。"
          },
          {
            label:"(b)",
            ask: "比较 Model Checking 与 Runtime Verification。",
            steps: [
              "Model Checking 构造/探索模型所有可达状态与路径。",
              "失败给 counterexample；成功仅限模型与假设范围内。",
              "Runtime Verification 把性质变成 monitor，只观察一次或若干实际 trace。",
              "适合部署期发现违反，但未观察到违反≠所有未来路径安全。"
            ],
            final: "一项是模型全空间，一项是实际轨迹；各配一个例子。"
          },
          {
            label:"(c)",
            ask: "写四条汽车性质的 LTL。",
            steps: [
              "先定义原子命题 destinationReached、progress、emergency、resolved、red、green、beforeIntersection、passedIntersection、stopped、sensorFail、safe、recovered，并写明 green/recovered 是否环境保证最终发生。",
              "i：G(¬destinationReached → (progress U destinationReached))，要求到达前持续 progress 且最终到达。",
              "ii：G(emergency → ((emergency U resolved) ∧ F¬emergency))，resolved 前保持 emergency，最终退出。",
              "iii：先写 G((red∧¬green∧beforeIntersection) → (¬passedIntersection U (stopped∧beforeIntersection)))，再写 G((red∧stopped∧¬green) → (stopped W green))；若环境保证 green 最终发生，把 W 改为 U。",
              "iv：G(monitorSensors) 加 G(sensorFail → (¬recovered U (safe∧(safe W recovered))))；同样若保证 recovered 最终发生用 U 代 W。"
            ],
            final: "公式后逐符号解释并写模型假设。单写 F(以后某次 stop/safe) 太弱，会允许先越线或先恢复。"
          }
        ]
      }
    ]
  },
  cs605: {
    start: {
      title: "先把“计算问题”看成一袋写好的字符串",
      intro: "CS605 看上去全是抽象证明，其实它的内核很直白。这里所谓“语言”（Language）不是英语或汉语，而是“所有被判定为 yes 的字符串的集合”。比如“所有括号配对的字符串”就是一门语言。所谓“机器”就是来判断一个字符串到底属不属于这门语言的某种理想计算设备。后面所有证明都在问三件类似的事：这种机器的能力够不够？它能不能保证停机？能不能把一个已知难问题“翻译”成我们要研究的问题？整门课真正难的只有符号系统，下面我们一点点把它换回大白话。",
      blocks: [
        {t:"先问输入是什么",p:"是字符串、自动机编码、图、还是程序源码？任何证明都要先把“输入”长什么样写清。比如把自动机 M 编码成字符串 ⟨M⟩。"},
        {t:"再问 yes 的证据",p:"一个输入要被判为 yes，机器怎么验证？还是有人可以递你一张“短证书”让你只花多项式时间检查？"},
        {t:"最后选证明模板",p:"能力不够用 pumping lemma 反证；不可判定用 reduction；在 NP 用 verifier；要 NP-hard 用已知 NP-complete 问题归约。"}
      ]
    },
    glossary: [
      ["Language / 语言","一组被判为 yes 的字符串/编码的集合。可以理解成“题目的所有合格答案字符串”。"],
      ["Instance / 实例","问题的一个具体输入，例如某条 0/1 串、某个图、某段程序文本。"],
      ["Decider / 判定器","一种图灵机：对每个输入都会停机，输出 yes 或 no。"],
      ["Recogniser / 识别器","一种图灵机：对 yes 输入最终接受；对 no 输入可以拒绝，也可以永远运行不停。"],
      ["Reduction / 归约","写一个保证停机的“翻译函数” f 把 A 的实例变 B 的实例，并保持 yes/no。"],
      ["Mapping Reduction / 映射归约","用函数 f 实现 A≤mB，要求 x∈A iff f(x)∈B。"],
      ["Certificate / 证书","yes 实例附带的“短证据”。比如 k-clique 问题的证书就是那 k 个顶点。"],
      ["Polynomial time / 多项式时间","运行步数被输入长度的某个多项式上界控制，记作 poly(n)。"],
      ["DFA / 确定有限自动机","每个状态对每个输入符号恰有一个转移的有限状态机。"],
      ["NFA / 非确定有限自动机","可有多个转移或 ε-转移的有限自动机；与 DFA 等价。"],
      ["PDA / 下推自动机","带一个栈的自动机，可识别上下文无关语言。"],
      ["TM / 图灵机","有无限长带和读写头的理想计算模型，等价于“能跑普通程序”。"],
      ["Regular Language / 正则语言","可由 DFA/NFA 识别的语言类，可用有限状态记忆解决。"],
      ["Context-Free Language (CFL) / 上下文无关语言","可由 PDA 或 CFG 描述的语言类，可处理嵌套配对。"],
      ["Pumping Lemma / 泵引理","若语言属于某类（regular / CFL），则足够长字符串某一段可重复任意次仍属语言；用来反证“不属于某类”。"],
      ["Pumping Length p / 泵长度","泵引理给的长度界限；长度 ≥p 的串才能保证可泵。"],
      ["HALT Problem / 停机问题","判断任意图灵机在给定输入上是否停机的问题，已证不可判定。"],
      ["NP","yes 实例有多项式大小证书可被确定性多项式时间 verifier 检查的复杂性类。常见误解：“NP 不是 Non-Polynomial”。"],
      ["NP-complete","既在 NP 中又是 NP-hard 的问题，是 NP 中“最难”的。"],
      ["NP-hard","至少和任何 NP 问题一样难的问题，不要求自己在 NP 中。"],
      ["3-SAT","每个子句恰 3 个文字的布尔可满足性问题，经典 NP-complete 问题。"],
      ["CLIQUE","判断图中是否存在大小为 k 的完全子图（k 个两两相连的顶点）的问题，是 NP-complete。"],
      ["Dovetail / 交错模拟","同时模拟无穷多个任务，不让任何一个卡死全队：第 1 轮各跑 1 步，第 2 轮加入新任务并让每个任务多跑一点。"],
      ["Verifier / 验证器","检查给定的 certificate 是否证明输入属于语言的算法。"],
      ["Existential Quantifier / 存在量词 ∃","“存在一个”的意思，∃x φ(x) 表示至少有一个 x 使 φ 为真。"],
      ["Universal Quantifier / 全称量词 ∀","“对每一个”的意思，∀x φ(x) 表示范围内所有 x 都让 φ 为真。"],
      ["Complement / 补语言","L 的补集 = 不属于 L 的所有串。"],
      ["Recognisable / 可识别","存在图灵机能识别的语言；不要求接受 no 时停机。"],
      ["Decidable / 可判定","存在判定器对每个输入都停机并给正确答案的语言。"],
      ["Product Construction / 乘积构造","把两个状态机组合成新状态机，新状态是原状态的笛卡尔积。"],
      ["Counterexample / 反例","一条能让性质失败的输入/路径。"],
      ["Polynomial Reduction / 多项式归约","要求 translation 函数本身在多项式时间内可计算。"],
      ["Clique / 团","图中一组两两相连的顶点；k-clique 问题就是“能否找到 k 个这样的顶点”。"],
      ["Vertex Cover / 顶点覆盖","图中一组顶点，使每条边至少有一个端点在该组中；典型 NP 完全问题之一。"],
      ["Church-Turing Thesis / 丘奇-图灵论题","任何可被“合理算法”计算的函数都能被图灵机计算的假设；不是定理而是工作假设。"],
      ["Rice's Theorem / 莱斯定理","任何 TM 语言的非平凡语义性质都不可判定。"],
      ["Countability / 可数性","一个集合能与自然数子集一一对应就称为可数；不可数集比可数集“更大”。"],
      ["Encoding / 编码","把图灵机、自动机、Java 程序等表示成可输入给图灵机的字符串。"],
      ["Non-deterministic / 非确定","允许同时走多条分支的“猜测”型计算；NFA 与 nondeterministic TM 都是例子。"],
      ["Co-Turing-recognisable / 余可识别","一个语言的补是 Turing-recognisable 时，它本身称为 co-Turing-recognisable。"],
      ["P versus NP / P 与 NP","P = 多项式时间可判定；NP = 多项式时间可验证；二者是否相等仍是开放问题。"],
      ["Non-Polynomial / 非多项式","不在任何多项式时间上界内的运行时间；常被误以为“NP” 含义，注意区分。"],
      ["Computability / 可计算性","研究哪些问题有可解算法、哪些没有；CS605 的核心主题之一。"],
      ["Sample_A / Sample_B","2026 的两份样卷，用来补冲同类练习；不替代今年真题确定题型与范围。"]
    ],
    learn: [
      {
        plain: "FA、PDA、TM 的核心差别就一件事：“这台机器能记住多少东西”。FA 只能记有限个状态类别；PDA 多一个栈能记任意深度但只能从一端读写；TM 有一条无限长的带能读写任意位置。能记的越多，能描述的语言越多，但关于这台机器本身的问题（比如它是否会停机）也就越难。三年里所有的“为什么这门语言要这种机器”问题，都是由这条主线推出来的。",
        steps: [
          "FA 从左到右读输入，当前 state 就是它对历史的全部记忆。状态数固定，所以记不了无限增长的计数。",
          "PDA 的栈像茶叶罐，只能从开口取/放。要识别 0^n1^n，拿每个 0 放一个标记、每个 1 取一个标记。",
          "TM 能在带上来回移动和改写，几乎等价于“能跑普通程序的设备”。",
          "DFA 与 NFA 能识别的语言类相同（都识别 regular language）；PDA 与 CFG 都描述 CFL；TM 描述递归可枚举语言，但里面有不可判定的。",
          "机器能力越强，可描述语言越多，但关于这台机器本身的问题（如“这台机器是否停机”）反而变得更难、更可能不可判定。"
        ],
        example: {
          title: "为什么“含奇数个 1 的二进制串”是 regular",
          prompt: "构造一个只接受含奇数个 1 的二进制串的 DFA。",
          steps: [
            "判断只依赖“目前 1 的个数是偶还是奇”，是有限信息。",
            "设两个状态 E(偶)、O(奇)，初始 E。",
            "读 0 不改奇偶；读 1 在 E、O 间切换。",
            "只有 O 是接受状态。",
            "读 0、读 1 后状态转换都明确，符合 DFA 定义。"
          ],
          result: "2 个状态已足够：未来判断只依赖“奇偶”这件事，不依赖具体数量。"
        },
        practice: {
          q: "语言 {0^n1^n : n≥0} 为什么 2 个状态不够？",
          hint: "n 可以多大？读完 0 后需要保留什么？",
          a: "需要记住任意大的 0 数量，才能核对随后的 1 数量。任何固定状态数都会把两个不同计数混在同一状态，读了相同后缀就分不开。"
        }
      },
      {
        plain: "Pumping Lemma 是“反证工具”。它说：若语言真的属于某小记忆机器类，那么足够长的接受路径必然重复一段，这一段重复或删除都还在语言里。证明不属于该类的方法：你选一条卡在边界的串 w，对手选任意合法分割，你都能泵坏。注意“谁选谁”——分割是对手选的，你必须击败所有分割；只展示一个分割失败等于你没理解 lemma。",
        steps: [
          "正式模板（regular 版）：若 L 是 regular，则 ∃ pumping length p，使 ∀w∈L 长度 ≥p，∃ 分割 w=xyz 满足 |xy|≤p、|y|>0、∀i≥0 使 xy^iz∈L。",
          "为“反证”非 regular：你“假设正”获取 p；你选 w 卡边界；对手选任意满足长度限制的分割；你的证明必须覆盖全部合法分割。",
          "根据分割位置选 i；最常见的是 i=0（删 y）或 i=2（重复 y）。",
          "展示 pump 后串违反语言定义，矛盾来自 lemma 保证“应当仍在 L”但你证明它不在 L。",
          "CFL pumping lemma 形式对称：w=uvxyz，|vxy|≤p 且 |vy|>0；你必须覆盖 v、y 的所有可能位置。"
        ],
        example: {
          title: "证明 {0^n 1^n} 不是 regular",
          prompt: "用 regular pumping lemma 反证。",
          steps: [
            "假设 regular，取 pumping length p。",
            "选 w=0^p 1^p，长度 2p≥p，且明显在 L 中。",
            "对手任选 w=xyz 满足 |xy|≤p、|y|>0；由于 |xy|≤p，y 只能全在第一个 0 块（即只有 0）。",
            "取 i=0 删除 y：得到 0^a 1^p，其中 a<p。",
            "0 的数量不再等于 1，所得串不在 L，矛盾。"
          ],
          result: "关键句是“任意合法分割的 y 都落在第一块”，不是只选 y=第一个 0。"
        },
        practice: {
          q: "为什么不能写“令 y=第一个 0”就结束？",
          hint: "lemma 中谁选分割？",
          a: "为反证非 regular，你必须击败所有满足条件的分割。只指定一个 y 只说明某个分割会失败，不能排除另一个分割刚好使 lemma 成立。"
        }
      },
      {
        plain: "Decidable 与 recognisable 的差别只在 no 输入时：decider 必须给 no；recogniser 对 no 可以拒绝、也可以永远运行。所以当你能用枚举“找一个 yes 证据”时，就得到了 recogniser；但若 x 没有 yes 证据时你枚举会无限跑，它就不是 decider。",
        steps: [
          "写 TM 时先用“On input ⟨M⟩”开头明确输入编码。",
          "Decider 的每个 loop 都必须有有限上界（在有限图上搜索、有限组合等），保证停机。",
          "要同时模拟无穷多个潜在任务时用 dovetail：第 1 轮各跑 1 步，第 2 轮加入新任务并各跑 1 步。",
          "若 L 与它的 complement 都 recognisable，可并行跑两个 recogniser；总有一个接受，得到 decider。",
          "Conversely：若 L 不可判定但 L 是 recognisable，则它的 complement 一定不 recognisable（否则两边都是 recognisable 就 decidable 了）。"
        ],
        example: {
          title: "识别 TM 语言是否非空",
          prompt: "构造识别 L={⟨M⟩ : L(M)≠∅} 的 TM。",
          steps: [
            "枚举所有输入 w₁, w₂, …（按长度排）。",
            "第 t 轮模拟 M(w₁) … M(w_t) 各 t 步，或者新增一项交错模拟。",
            "任一模拟进入 accept 立刻 accept。",
            "如果 L(M)=∅，没有模拟会 accept，机器永远运行——这恰好符合 recogniser 对 no 可以不停机。"
          ],
          result: "不能先完整跑 M(w₁) 再跑 w₂，因为 M(w₁) 可能永不停止。"
        },
        practice: {
          q: "若一个语言和它的补语言都 recognisable，为什么它 decidable？",
          hint: "并行运行两个 recogniser。",
          a: "对输入 x 交错运行 R_L(x) 与 R_comp(x)。x 必属于其中一边，对应 recogniser 最终 accept；按谁接受输出 accept/reject，因此总会停机。"
        }
      },
      {
        plain: "Mapping Reduction 不是“两个问题看起来像”，而是写一个保证停机的翻译函数 f。把已知难题 A 的 yes 精确翻译成目标问题 B 的 yes，这样如果 B 可判定，就能反过来解 A。A 难，B 也得难。真正常踩的坑：f 自己不能等原题的机器跑完——例如不能在 f 里先等 M(w) 是否停机才输出，那 f 就可能不停机，违反 mapping reduction 定义。",
        steps: [
          "先决定 reduction 方向 A ≤m B，全篇一致，不要中途偷换。",
          "F 接 A 实例，只负责构造 B 实例的字符串；F 本身必须对所有输入停机。",
          "把未知计算放进构造出的新机器 N 的运行过程里，不要放进 F 自己。",
          "分别证明 yes→yes 和 yes←yes 两个方向，得到 x∈A iff f(x)∈B。",
          "用归谬：若 B 有 decider D_B，则可写 D_A(x)=D_B(f(x))，能 decider A；与 A 已知不可判定矛盾。",
          "若想证 B 的补不可判定，把 iff 改为 x∈A iff f(x)∈complement(B)；其余步骤完全相同。"
        ],
        example: {
          title: "用 HALT 控制一段 Java 程序是否 increment",
          prompt: "构造 Java 程序 N，使 M 在 w 停机 iff N 最终把两个变量各加一。",
          steps: [
            "F 直接把 M 与 w 的描述嵌入 N 的源代码，构造过程只是写文本，一定停机。",
            "N 先 int a=0, b=0。",
            "N 模拟 M(w)；这是 N 的运行而不是 F 的运行。",
            "只有模拟返回后才执行 a++; b++;。",
            "M(w) 停机时 N 完成两次 increment；不停机时 increment 永远到不了。"
          ],
          result: "未知计算发生在 N 运行时，不在 reduction F 构造时；因此 F 仍保证停机，符合 mapping reduction 定义。"
        },
        practice: {
          q: "为什么 F 不能先运行 M(w)，停机后再输出 N？",
          hint: "当 M(w) 不停机时，f 是否仍是 total computable function？",
          a: "不能。Mapping reduction 的 f 必须对每个输入都停机并输出目标实例；若 F 等待 M(w)，在 no 实例上永不返回，f 不是 total，不构成合法 mapping reduction。"
        }
      },
      {
        plain: "证明 in NP 时不要试图找答案！只需要说：“如果有人给你一个正确答案的短证书，你能在多项式时间里检查它确实是答案”。证书必须够短（多项式大小），你的检查也必须够快（多项式时间）。",
        steps: [
          "先写 certificate 的具体数据结构与最大长度。",
          "检查格式、成员范围、不重复，防止伪证书钻空子。",
          "逐条检查问题的定义要求，违反则 reject。",
          "全部通过才 accept。",
          "按输入规模 n、m 写 worst-case runtime，并显式说出 “polynomial”。"
        ],
        example: {
          title: "CLIQUE 的 verifier",
          prompt: "输入 G=(V,E)、k。证书是一组 k 个顶点。",
          steps: [
            "检查证书恰有 k 项且每项属于 V。",
            "检查 k 个顶点互不相同。",
            "对每一对顶点 u, v 检查 (u,v)∈E：一共查 C(k,2) 条边。",
            "若任一边缺失则 reject，否则 accept。",
            "邻接矩阵下两两查 O(k²)；证书长度 O(k log |V|)，都是 polynomial。"
          ],
          result: "存在这样的证书 iff 图中真有 k-clique，因此 CLIQUE ∈ NP。"
        },
        practice: {
          q: "“枚举所有 k 顶点子集直到找到 clique”能证明 in NP 吗？",
          hint: "NP verifier 是否需要搜索证书？",
          a: "不能。枚举是指数搜索，不是多项式 verifier。in NP 让证书作为额外输入；verifier 只检查给定子集，不参与搜索。"
        }
      },
      {
        plain: "NP-complete 要同时做两件事：① 它本身属于 NP；② 任何 NP 问题都不比它难（NP-hard）。实践中②通过“把一个已知 NP-complete 问题归约到它”完成。常见的源问题就是 3-SAT。诀窍是把“3-SAT 公式可满足 iff 我构造的目标实例是 yes”写清双向。",
        steps: [
          "先引用或重做目标语言 ∈ NP。",
          "选已知 NP-complete 源问题（典型 3-SAT）。注意方向：3-SAT ≤p 目标。",
          "写构造、证明 yes→yes 与 yes←yes。",
          "证明构造的顶点数、边数、运行时间都是 polynomial。",
          "合并：NP-hard ∧ ∈NP ⇒ NP-complete。"
        ],
        example: {
          title: "3-SAT 到 CLIQUE 的三层图",
          prompt: "公式有 3 个 clauses，每个 3 个 literals。",
          steps: [
            "为每个 clause 的每个 literal 建一个顶点，共 9 个。",
            "同一 clause 内不连边。",
            "不同 clause 之间，除互为否定的 literals（如 a 与 ¬a）外全部连边。",
            "设 k=3。若赋值满足，每 clause 选一个真 literal，三者互不冲突，构成 clique。",
            "反过来若存在 3-clique，每层恰好取一点且互不矛盾，可合成一致满足赋值。"
          ],
          result: "k 必须等于 clause 数；边编码“这两个选择可以同时为真”。"
        },
        practice: {
          q: "为什么同一 clause 的两个顶点不能连边？",
          hint: "k 个 assay 大小的 clique 应怎样分配选择？",
          a: "不连边强迫 clique 至多从每个 clause 选一个点；要达到 k=clause 数就恰好每个 clause 选一个 literal。"
        }
      }
    ],
    exam: [
      {
        question: "Q1(a) 要证一个带分隔符和线性不等式的语言非 regular；Q1(b) 要用 CFL pumping lemma 处理二进制数值比较。",
        parts: [
          {
            label:"1(a)",
            ask: "证明 L1A={0^m<0^n : n>2m≥0} 非 regular。",
            steps: [
              "假设 L1A 是 regular。由 pumping lemma，存在 pumping length p：任何 w∈L1A 且 |w|≥p，都能切成 w=xyz 满足 |xy|≤p、|y|>0，且 ∀i≥0：xy^iz∈L1A。",
              "选 w = 0^p < 0^(2p+1)。先确认 w∈L1A：左块 p 个 0，右块 2p+1 个 0；要求 n>2m 即 2p+1 > 2p，成立（多 1）。所以 w∈L1A。",
              "对手任选 w=xyz 满足 |xy|≤p, |y|>0。由于 w 前 p 个字符全是左块 0，x 和 y 都只能落在左块中——也就是说 y = 0^t，其中 1≤t≤p。",
              "取 i=2 进行 pumping：xy²z = x y y z。左块从 p 个 0 变成 p+t 个 0（多 pump 了一份 y 长度的 t 个 0）；右块仍是 2p+1 个 0（没动）。",
              "pump 后的串写为 0^(p+t) < 0^(2p+1)。要它仍在 L1A，需满足 2p+1 > 2(p+t)。展开：右边 = 2p+2t；因 t≥1，右边 ≥ 2p+2 > 2p+1 = 左边。不等式不成立。",
              "矛盾来自：pumping lemma 保证 pump 后应在 L1A，但我们证出它不在。故假设错误，L1A 不是 regular。"
            ],
            final: "L1A 不是 regular。关键节奏：先选落在边界的 w 再覆盖所有合法分割，最后用 pump i=2 让数量关系翻车。"
          },
          {
            label:"1(b)",
            ask: "证明二进制 u<v 的语言非 CFL。",
            steps: [
              "先选择一族能让数值比较变成严格长度/位模式约束的串，并验证都在语言中。",
              "取 pumping length p，选分隔符两侧结构都长于 p 的边界串。",
              "对任意 w=uvxyz，由 |vxy|≤p 说明 v、y 只能落在一个局部区域或跨一个边界。",
              "按落在左数、分隔符附近、右数等情况分类，取 i=0 或 2。",
              "每种情况说明 pump 后格式失效，或原本 u<v 的数值关系反转。"
            ],
            final: "CFL 题得分核心是覆盖 v、y 的所有位置；应按试卷空间写清分类，而不是只给一种分割。"
          }
        ]
      },
      {
        question: "Q2(a) 决定 FA 接受的串是否全是偶长；Q2(b) 识别一个 TM 的语言是否非空。",
        parts: [
          {
            label:"2(a)",
            ask: "构造 L2A decider。",
            steps: [
              "输入 ⟨M⟩，先验证 M 是 FA 编码。",
              "构造 product states (q, parity)，parity 初始 even，每读一个符号翻转。",
              "在有限 product graph 上从 (q₀, even) 做 BFS/DFS。",
              "若可达 (q_accept, odd)，说明存在奇长接受串，reject。",
              "搜索完成仍不可达，accept；图有限所以一定会停机。"
            ],
            final: "D 决定 L2A，因此 L2A decidable。"
          },
          {
            label:"2(b)",
            ask: "构造 L2B recogniser。",
            steps: [
              "输入 ⟨M⟩，枚举 {a,b}* 为 ε, a, b, aa, …。",
              "使用 dovetail 交错模拟 M 在所有已枚举串上的运行。",
              "任一模拟进入 accept 立刻 accept。",
              "若 L(M)=∅，没有模拟 accept 但机器不误接受。"
            ],
            final: "T 在且仅在 L(M) 非空时接受，因此 L2B Turing-recognisable。"
          }
        ]
      },
      {
        question: "Q3 用 HALT 归约证“TM 只接受偶长串”的性质不可判定；Q4 决定补语言一侧可识别并推出另一侧不可识别。",
        parts: [
          {
            label:"Q3",
            ask: "给出完整 mapping reduction。",
            steps: [
              "先选择 L 是 L3 还是 complement，使 iff 最自然；在模板空格写明。",
              "输入 ⟨M,w⟩，F 构造 TM N。",
              "N 对输入 u：若 u 是某固定奇长串（如 0），模拟 M(w)；模拟停机则 accept；其他输入按构造需要拒绝。",
              "若 M(w) 停机，N 接受奇长串，性质不成立；若不停机，N 不接受任何奇长串，性质成立。",
              "因此 HALT 与 complement(L3) 等 iff；若 complement(L3) 可判定则 HALT 可判定，矛盾。"
            ],
            final: "L3 及其补集都不可判定；模板中的 L 必须与你证明的 iff 方向一致。"
          },
          {
            label:"Q4",
            ask: "构造 recogniser 并推出另一侧不可识别。",
            steps: [
              "枚举所有奇长二进制串并 dovetail 模拟 M。",
              "任一被接受，recogniser accept，对应 complement(L3)。",
              "故 complement(L3) recognisable。",
              "若 L3 也 recognisable，则两边 recogniser 并行可得 decider，与 Q3 矛盾；故 L3 not recognisable。"
            ],
            final: "complement(L3) Turing-recognisable，而 L3 not Turing-recognisable。"
          }
        ]
      },
      {
        question: "Q5 用 HALT 行为嵌入 Java 程序，目标属性是初始化多个整数并在以后把每个至少 increment 一次。",
        parts: [
          {
            label:"Q5",
            ask: "证明 Java 行为语言不可判定。",
            steps: [
              "目标语言 L5 = {⟨J⟩ : J 是一段 Java 程序，运行后初始化 >1 个整数变量，并且后来每个变量都至少 increment 一次}。要证 L5 不可判定。",
              "用 HALT 归约。HALT = {⟨M,w⟩ : M 是 TM、M 在 w 上停机}，已知不可判定。",
              "反证假设：存在 L5 的 decider D5。基于它我们设计一个能 decider HALT 的函数 H，便与 HALT 不可判定矛盾。",
              "构造 reduction 函数 F：输入 ⟨M,w⟩，F 只做“写程序文本”这一件事——直接把 M 的描述与 w 嵌进 Java 程序 J 的源代码。F 本身完全不运行 M(w)，所以无论 M(w) 是否停机，F 都会有限步内输出 J 的字符串。",
              "J 的源代码骨架（写到卷面上）：",
              "  public static void main(String[] args) {",
              "      int a = 0, b = 0;             // 初始化两个 int（满足 >1 个整数变量）",
              "      simulate(M, w);               // 嵌入的 M(w) 模拟",
              "      a++; b++;                      // 只有 simulate 返回后才执行",
              "  }",
              "证明 iff 双向：",
              "  ⟹ 若 ⟨M,w⟩∈HALT（M(w) 停机）：J 跑到 simulate 时会返回，接着执行 a++ 与 b++，两变量都至少 increment 一次，⟨J⟩∈L5。",
              "  ⟸ 若 ⟨J⟩∈L5：J 必须让 a、b 都至少 increment 一次；唯一能执行到 a++/b++ 这两行的路径是 simulate 返回，所以 M(w) 必停机，⟨M,w⟩∈HALT。",
              "于是 ⟨M,w⟩∈HALT iff ⟨J⟩=F(⟨M,w⟩)∈L5。",
              "现在写 H(⟨M,w⟩)：调 F 把它变成 ⟨J⟩，再调假设的 D5(⟨J⟩)；返回 D5 的结果。由 iff，H 正确判定 HALT。",
              "但 HALT 已知不可判定，所以 D5 不存在，L5 undecidable。"
            ],
            final: "L5 不可判定。关键节奏：① F 只写代码不运行；② M(w) 是否停机被嵌入 J 运行时；③ 双向 iff；④ 反证套 D5 用于解 HALT。"
          }
        ]
      },
      {
        question: "Q6 分别为 CLIQUE 形式的岛屿问题和长度恰为 k 的 simple path 写 polynomial verifier。",
        parts: [
          {
            label:"6(a)",
            ask: "证明岛屿 fully-connected subset 在 NP。",
            steps: [
              "证书 c 是 k 个岛屿列表。",
              "检查数量、属于 V、互不重复。",
              "检查所有 C(k,2) 对之间都有 boat edge。",
              "全过 accept；邻接矩阵下 O(k²)，是 polynomial。"
            ],
            final: "给出 certificate、verifier、runtime 后得 L6A∈NP。"
          },
          {
            label:"6(b)",
            ask: "证明 exact simple a-b path 在 NP。",
            steps: [
              "证书为 v₀…vₖ，共 k+1 个顶点。",
              "检查 v₀=a、vₖ=b、每点属于 V。",
              "检查所有顶点互不重复。",
              "对 i=0..k-1 检查 (vᵢ,vᵢ₊₁)∈E。",
              "哈希集合与邻接矩阵下 O(k²) 或更好，均 polynomial。"
            ],
            final: "路径长度 k 指 k 条边，所以证书有 k+1 个顶点。"
          }
        ]
      },
      {
        question: "Q7 用 3-SAT→CLIQUE 证岛屿问题 NP-complete，并画出题给四 clause 公式的输出图。",
        parts: [
          {
            label:"7(a)",
            ask: "写 NP-completeness 证明。",
            steps: [
              "引用 Q6(a)：L6A∈NP。",
              "对每个 clause 的每个 literal 建 vertex。",
              "只在不同 clauses 且不互相否定的两个 vertices 间加 edge。",
              "输出 (G,k)，k=clauses 数。",
              "满足赋值→每 clause 选真 literal→k-clique；k-clique→每 clause 一个互不矛盾 literal→一致满足赋值。",
              "构造 O(x²) 规模/时间，所以 polynomial；NP-hard ∧ in NP ⇒ NP-complete。"
            ],
            final: "方向必须是 3-SAT ≤p L6A。"
          },
          {
            label:"7(b)",
            ask: "画给定四 clause 公式的 reduction 图。",
            steps: [
              "画四列/四层，每层对应一个 clause，各有三个 literal 顶点。",
              "同层不连边。",
              "跨层时逐对检查，互补 literals 不连，其余连。",
              "标 k=4，并圈出一组对应满足赋值的四点 clique。"
            ],
            final: "图判分点是分层、互补不连、k=4 和一个可见 clique。"
          }
        ]
      }
    ]
  },
  cs608: {
    start: {
      title: "把测试理解成一条“可追踪的证据链”",
      intro: "CS608 不是“多随便试几个输入”，而是把你做的事变成一条能在卷面上自圆其说的证据链：依据哪条规格、要覆盖什么、为什么选这个值、怎么调用、预期结果是什么。后续学的 EP、Branch Coverage、class context、随机测试只是这条链上“要覆盖的目标”不同。把整门课想成做法律证词：每一项证据都要能指回原始规格或代码。",
      blocks: [
        {t:"先读规格",p:"圈出输入范围、边界、条件组合、错误处理和所有可能输出。规格没有的别臆造。"},
        {t:"再定义覆盖目标",p:"黑盒覆盖 partition/rule；白盒覆盖 statement/branch；对象测试还要覆盖 pre-state。"},
        {t:"最后做成可追踪的表",p:"TCI、selected value、test case、expected result、coverage mapping 必须能互相对上。"}
      ]
    },
    glossary: [
      ["Test oracle / 测试预言机","判断“实际结果”是否正确的规则或机制。例：规格说明书、参考实现。"],
      ["Fault / 缺陷","代码里的错误本身。"],
      ["Error / 错误","程序执行中由 fault 引发的错误状态。"],
      ["Failure / 失败","可观察到的程序错误行为。fault→error→failure 是层层引发。"],
      ["Test Case / 测试用例","至少包含输入、前置条件、调用顺序、预期结果的完整规格。"],
      ["Test Data / 测试数据","一个测试用到的具体输入值。"],
      ["TCI / Test Coverage Item","要被至少一个测试覆盖的抽象项目，相当于“覆盖目标清单上的一项”。"],
      ["Partition / 等价类","被认为“行为相同”的一组输入或输出，例：0..9 之间的整数可能都触发同一返回值。"],
      ["EP / Equivalence Partitioning","假设同一 partition 内的值触发相同处理，每个 partition 选一个代表即可。"],
      ["BVA / Boundary Value Analysis","对边界及其相邻值做专门测试的黑盒技术。"],
      ["Value Line / 值域线","画出参数自然范围与规格边界，帮助识别 partition。"],
      ["Decision Table / 决策表","列出多个条件组合及其对应动作的表格。"],
      ["Branch / 分支","一个判定（if、while guard）的 true 或 false 出口。"],
      ["Statement Coverage / 语句覆盖","要求每条可执行语句至少被执行一次的覆盖标准。"],
      ["Branch Coverage / 分支覆盖","要求每个判定 true 和 false 出口都至少执行一次。"],
      ["Path Coverage / 路径覆盖","要求每条可能的执行路径都走一遍，标准更强。"],
      ["Black-box Testing / 黑盒测试","基于规格而非代码内部结构测试。"],
      ["White-box Testing / 白盒测试","基于代码内部结构（分支、路径）测试。"],
      ["Class Context Testing / 对象上下文测试","连同构造、状态设置、观察一起测方法，而不是把方法当静态函数。"],
      ["Getter / Observer","读取对象状态但不修改它的方法。"],
      ["Setter / Mutator","修改对象状态的方法。"],
      ["Accessor","课程广义把 getter/setter 都叫 accessor，更精确地说 setter 是 mutator。"],
      ["TestNG","Java 测试框架，支持注解 @Test、@DataProvider 等。"],
      ["Random Testing / 随机测试","用随机生成的输入测试，需配合 oracle 判断正确性。"],
      ["Operational Profile / 操作剖面","模拟真实使用场景的输入分布，用来做可靠性评估。"],
      ["MTBF / 平均故障间隔","总运行时间除以观察到的故障数的估计。"],
      ["Exhaustive Testing / 穷举测试","对所有可能输入组合都执行，对大多数程序因组合数爆炸而不可行。"],
      ["Error Hiding / 错误隐藏","一个 TC 同时含多个 error，失败时无法确认是哪个 error 被处理。应一次只测一个 error。"],
      ["Modular / Atomic TC","只覆盖一个错误或不重复 TCIs 集合的最小测试。"],
      ["JaCoCo","Java 代码覆盖率工具；黄色表示部分执行，红色表示完全未执行。"],
      ["Test Suite / 测试集","一组测试用例的集合。"],
      ["Automated Test / 自动化测试","由脚本生成输入、调用、判断与计数失败的测试循环。"],
      ["Seed / 随机种子","使伪随机序列可复现的起始数。"],
      ["Risk / 风险","Expected cost(risk)=Pr(failure)×cost(failure)；用作测试投入决策的量。"],
      ["Robustness Test","超出合法范围看程序是否优雅处理的额外测试。"],
      ["Arrange / Act / Assert","TestNG 方法的三段式：Arrange 准备输入与状态；Act 调用被测方法；Assert 比较 actual 与 expected。"],
      ["@Test / @DataProvider","TestNG 的注解；@Test 标记测试方法，@DataProvider 把同表里参数注入一组同结构测试。"],
      ["Javadoc","Java 源代码附带的方法说明注释格式；规格 oracle 通常来自它。"],
      ["Agile / 敏捷开发","把项目分成短迭代，每轮交付可见功能并持续反馈的开发流程总称。"],
      ["Scrum","一种具体 Agile 框架，把项目划成若干 Sprint（短迭代），并由 backlog、planning、review、retrospective 配套活动。"],
      ["Sprint","Scrum 中的一个迭代周期（通常 1–4 周），结束时交付可运行版本。"],
      ["Backlog / 产品待办列表","按优先级排列的功能与缺陷需求列表，是 Sprint Planning 的输入。"],
      ["Sprint Planning","每个 Sprint 开始的规划会议，从 backlog 选本迭代要完成的工作。"],
      ["Review / 评审","Sprint 末展示已完成产物给干系人看的会议。"],
      ["Retrospective / 回顾","Sprint 末团队反思流程改进的会议。"],
      ["CI / 持续集成","每次提交自动编译并跑测试的实践，让缺陷尽早暴露。"],
      ["Regression Test / 回归测试","修改后重跑既有测试以确认未引入旧 bug 复发。"],
      ["Enum / 枚举类型","限定取值集的 Java 类型，例 Charging.Required 取 NONE/FAST_CHARGE/SLOW_CHARGE/PARAM_ERROR。"],
      ["Exception / 异常","程序非正常情况的对象表示；错误输入常抛 IllegalArgumentException。"],
      ["IllegalArgumentException","Java 标准库里表示参数非法的 RuntimeException；genRand 在 max<min 时用它报错。"],
      ["JaCoCo","Java 代码覆盖率工具，它的截图用绿/黄/红分别表示已执行、部分执行、未执行。"],
      ["Coverage / 覆盖率","被测试实际触达的代码或规格项目比例。"],
      ["Boolean Short-circuit / 布尔短路","Java && 与 || 在能确定结果时不再求值右边的求值规则；会影响 branch coverage。"],
      ["RuntimeException / 运行时异常","Java 一类在运行期间抛出的非受检异常；课程用作“非法输入”的返回方式之一，IllegalArgumentException 是其子类。"],
      ["Test Class / 测试类","用来装 @Test 方法的 Java 类；课程解决方案常以 TestXxx 形式命名。"],
      ["Coverage Tool / 覆盖率工具","用来观察哪些行/分支被实际执行的程序；JaCoCo 是 Java 的代表。"]
    ],
    learn: [
      {
        plain: "软件测试不是“证明程序没 bug”，而是在有限预算下系统化地找故障并建立信心。穷举测试常常因为输入域相乘而爆炸——比如两个 int 就有 2^64 组合，再加上 short、boolean 等，根本跑不过来。所以课程的标准做法是：用一项“覆盖目标” (TCI) 代表一类输入，只测代表，不再全部跑一遍。",
        steps: [
          "记住三层术语：fault（代码里的错）、error（执行中的错误状态）、failure（外面能看到的错误行为）。fault 不一定引发 error，error 不一定触达用户成 failure。",
          "一个 test case 至少要有 inputs、preconditions、call sequence、expected result 四样。",
          "先算自然输入域数量；多个参数的组合数是各参数输入数相乘。",
          "再考虑时间、存储和 oracle 成本，使“穷举”在物理上不可能。",
          "结论：必须用覆盖标准（EP、BVA、Branch、rule 等）挑代表，而不是“全部跑”。"
        ],
        example: {
          title: "calc(int a, int b, int c, short d) 为什么不能穷举",
          prompt: "四个参数全部取遍组合。",
          steps: [
            "Java int 有 2^32 个可能值，三个 int 共 (2^32)^3。",
            "short 有 2^16 个值。",
            "组合总数 = 2^(32×3+16) = 2^112 ≈ 5.19×10^33。",
            "每秒跑 10^9 个测试也要 ~5.19×10^24 秒，约 1.6×10^17 年。",
            "还没算每次的 expected result 生成、环境启动和报告成本。"
          ],
          result: "用数量级和速率共同说明不可行，比只写“组合太多”更完整。"
        },
        practice: {
          q: "一个 boolean 参数加一个 byte 参数共有多少输入组合？",
          hint: "boolean 2 个，byte 256 个。",
          a: "2×256=512。是否可穷举还要看单次执行和 oracle 成本，但数量本身可控。"
        }
      },
      {
        plain: "Equivalence Partitioning (EP) 是课程最常考的设计方法，假设是“同一 partition 内的值会触发相同处理”，所以只挑一个代表。Value line 是辅助工具：先画类型的自然范围（int 是 -2^31 .. 2^31-1），再标规格的允许范围和“行为切换点”；这样不会漏掉 error partition。",
        steps: [
          "对每个输入先画类型自然范围（如 Java short 是 -32768..32767）。",
          "再标规格允许范围和行为切换点。",
          "给每个 input partition 编号；所有非法区也要分别编号并加 *（表示 error）。",
          "为每个 output 也建 output TCI。",
          "normal TC 应该尽量组合多个尚未覆盖的 normal TCI；error TC 一次只含一个 input error，避免 error hiding。",
          "填 TC→TCI mapping；如果两个 TC 的 TCI 覆盖集合完全相同，删除一个（或标为可选 robustness test）。"
        ],
        example: {
          title: "温度分类的 EP",
          prompt: "输入 int temp；<0 返回 COLD，0..30 返回 OK，>30 返回 HOT。",
          steps: [
            "自然范围是整个 int；规格在 0、30 两处改变行为。",
            "Partitions：P1 temp<0，P2 0≤temp≤30，P3 temp>30。",
            "选 -1、15、31 作代表，不要把每个边界周围值都塞进 EP。",
            "Outputs COLD/OK/HOT 各应被至少一个 TC 覆盖。"
          ],
          result: "若题目要 BVA，才额外选 -1/0、30/31。不要混淆 EP 与 BVA 交付物。"
        },
        practice: {
          q: "Charging 的 battLevel=-1、dischargeRate=300 能放在同一个 error TC 吗？",
          hint: "一个 TC 同时破坏两参数时能确定哪个 error partition 被独立处理吗？",
          a: "不宜。一次只让一个参数非法，另一个保持合法，从而独立覆盖并追踪每个 error partition。"
        }
      },
      {
        plain: "白盒测试从代码控制流出发。Branch Coverage 不只要“每行变绿”，还要每个判定的 true 和 false 出口都走过。JaCoCo 的黄色只说明同行部分分支未走，并不告诉你具体哪条没走——必须看代码行号和 diamond 短路顺序才能定。",
        steps: [
          "画或读 control-flow，给每个 decision 的 T/F branch 编号。",
          "结合现有测试和覆盖颜色找 untaken branch。",
          "把走该 branch 的条件写成布尔约束，再求一组输入。",
          "只添加能覆盖新 branch 的最小测试，不冗余。",
          "用 TestNG：import、class、@Test、Arrange 三 boolean、Act 调用、Assert.assertEquals(actual, expected)。"
        ],
        example: {
          title: "enabled && exists 的 branch",
          prompt: "现有测试只用 enabled=false。",
          steps: [
            "Java 短路使 enabled=false 时 exists 条件根本不求值。",
            "要让第二条件 true，需 enabled=true、exists=true。",
            "要让第二条件 false，需 enabled=true、exists=false。",
            "只有行被执行过 ≠ 分支全覆盖。"
          ],
          result: "先写未走分支，再解条件，比盲猜 inputs 更可靠。"
        },
        practice: {
          q: "100% statement coverage 是否保证 100% branch coverage？",
          hint: "一个 if body 被执行一次，else/false 是否一定走过？",
          a: "不保证。测试让条件 true 可覆盖 if body 的全部 statements，但 false branch 可能从未发生。"
        }
      },
      {
        plain: "对象方法的结果经常写进字段而不直接 return。此时测试必须先建状态、调用被测方法、再通过观察方法（getter/observer）看结果；这就是 class context。课程把 getter/setter 都广义叫 accessor，更精确地说 setter 是 mutator。",
        steps: [
          "列出 constructor、被测方法、每个 attribute 可用的 getter/observer 与 setter/mutator。",
          "Shipping.isFree 是 freeShipping 的 getter；setPrime 是 primeCustomer 的 setter/mutator。primeCustomer 没有 getter，无法独立读取，但可由 setPrime 建立 decide 所需 pre-state。",
          "把 parameter partition 与调用前 attribute state partition 一起组合。",
          "每个 TC 写完整方法顺序和每次调用的 expected；void 方法没 return，最终状态用 getter 建 oracle。",
          "若目标状态既无 getter 也无任何可见效果，应明确指出 testability/oracle 问题；测试之间应新建对象或重置状态。"
        ],
        example: {
          title: "Shipping.decide 的调用链",
          prompt: "非Prime顾客订单 120 应免费。",
          steps: [
            "Shipping s = new Shipping(); 建立默认 prime=false。",
            "s.setPrime(false); 明确 pre-state。",
            "s.decide(120); 修改 freeShipping。",
            "actual = s.isFree(); 观察状态。",
            "assert actual==true，因为 non-Prime 但 value>100。"
          ],
          result: "Test case 表中应按这一顺序列出所有 calls，而不是只写 (false, 120, true)。"
        },
        practice: {
          q: "decide() 返回 void，为什么仍可测？",
          hint: "对象是否提供可观察结果的方法？",
          a: "可以。调用 decide 后用 isFree() 读 freeShipping 并与 expected 比较；isFree 是 test oracle 的观察接口。"
        }
      },
      {
        plain: "随机测试不是“随便生成数”。先用 Decision Table 固定要覆盖的 rule，再只在该 rule 对应区间内随机；这样同时拿到结构覆盖与多样数据。",
        steps: [
          "为每条 rule 写 causes 的真值与 expected effect。",
          "把数值 cause 翻译成随机区间，例如 lux<5000 → 0..4999。",
          "boolean cause 直接固定 true/false，不随机到不可控。",
          "循环生成时保存 seed、输入和失败日志，保证可复现。",
          "MTBF 测试还需用接近真实使用频率的 operational profile。"
        ],
        example: {
          title: "题面签名 int genRand(int max, int min)",
          prompt: "按题面参数顺序，生成 min 到 max（两端都包含）的均匀 int。",
          steps: [
            "先检查 max≥min；注意题面 max 在前、min 在后。",
            "区间元素数是 max-min+1。",
            "random.nextInt(bound) 产生 0..bound-1。",
            "令 bound=max-min+1，再加 min，得到 min..max。",
            "实现要防 max-min+1 溢出；本题使用 0..4999 或 5000..Integer.MAX_VALUE 时 bound 均为正 int。"
          ],
          result: "int genRand(int max, int min){ if(max<min) throw new IllegalArgumentException(); return min + random.nextInt(max-min+1); }"
        },
        practice: {
          q: "SolarPanel 要满足 lux≥5000，随机区间上界应写什么？",
          hint: "题面声明 lux 为 int，DT 又把讨论域限定为 lux≥0。",
          a: "自然域可写 rand(5000..Integer.MAX_VALUE)。若为了运行效率选有限 operational/test cap U，也可写 rand(5000..U)，但必须声明 U 的来源，不能称它是题面规格边界。"
        }
      },
      {
        plain: "Agile 中测试贯穿每个迭代；白盒测试贴近实现，所以重构常迫它更新。数值、AI、移动端等专题提供额外风险，但今年卷只直接抽 Agile 解释。课程的风险图本身在解释“为什么测试不是越多越好”。",
        steps: [
          "在 backlog/refinement 阶段澄清 acceptance criteria。",
          "开发中写 unit/component tests，CI 每次提交运行。",
          "Sprint 内做集成、探索与回归，review 后继续监控。",
          "黑盒依赖外部规格；实现重构但行为不变时通常仍有效。",
          "白盒依赖内部 branch/path，结构变后覆盖映射和测试都可能要改。"
        ],
        example: {
          title: "课程风险图怎样解释",
          prompt: "为什么测试投入不是越高越好？",
          steps: [
            "课程直接给 Expected cost(risk) = Pr(failure) × cost(failure)。",
            "增加 testing expenditure 通常会降低 Pr(failure) 和 expected failure cost。",
            "testing cost 随投入增加；expected failure cost 与 testing cost 相加得 total cost。",
            "最优投入在 total cost 最低；若收入固定，这等价于 profit 最高。",
            "avoided-loss benefit / net-profit 是从课程成本图推导的解释，不应冒充讲义原图标签。"
          ],
          result: "最优点不是零风险，而是总成本最小；活动语言表达时，是新增测试的预期风险降低等于其新增测试成本。"
        },
        practice: {
          q: "方法内部从 if 改成 table lookup 但外部行为不变，哪类测试更可能不用改？",
          hint: "哪类测试只依赖 specification？",
          a: "黑盒测试更可能不需改；以旧 branch 为 TCI 的白盒测试需重新分析覆盖结构。"
        }
      }
    ],
    exam: [
      {
        question: "Q1 先解释穷举不可行，再对 Charging.required 完成 value line、input/output partitions、TCI、代表值与无重复 EP 测试。",
        parts: [
          {
            label:"1(a)",
            ask: "解释 calc 的 exhaustive testing 不可行。",
            steps: [
              "方法签名：long calc(int a, int b, int c, short d)，共 4 个参数。",
              "每个 Java int 是 32 位，取值数 = 2^32 ≈ 4.29×10^9。三个 int 共 (2^32)^3 = 2^96 种组合。",
              "Java short 是 16 位，取值数 = 2^16 = 65,536。",
              "四参数的总组合 = (2^32)^3 × 2^16 = 2^(96+16) = 2^112。",
              "把 2^112 换算成十进制数量级：log10(2^112) = 112 × log10(2) ≈ 112 × 0.30103 = 33.715。所以 2^112 ≈ 10^33.715 ≈ 5.19 × 10^33。",
              "假设每秒能跑 10^9 个测试（已远超普通机器能力）：需要 5.19×10^33 / 10^9 = 5.19×10^24 秒。",
              "换算成年：5.19×10^24 / (365×24×3600) ≈ 5.19×10^24 / 3.15×10^7 ≈ 1.65×10^17 年。宇宙年龄才约 1.38×10^10 年，所以远超宇宙寿命。",
              "还需考虑：对每个组合要算 expected result、跑测试、收集报告、维护环境——总成本远超纯执行。",
              "结论：因输入域乘积爆炸，穷举测试在物理上不可行。"
            ],
            final: "用输入域乘积和数量级得出穷举不可行。关键中间值：2^112 ≈ 5.19×10^33 个组合，每秒 10^9 次仍需约 5.19×10^24 秒 ≈ 1.65×10^17 年。"
          },
          {
            label:"1(b)",
            ask: "画 Charging 的范围并定义 partitions。",
            steps: [
              "两参数的 Java short 自然范围都是 -32768..32767。",
              "battLevel partition：B1* -32768..-1，B2 0..9，B3 10..49，B4 50..100，B5* 101..32767。",
              "dischargeRate partition：R1* -32768..-1，R2 0..50，R3 51..255，R4* 256..32767。",
              "Output TCI：O1 NONE、O2 FAST_CHARGE、O3 SLOW_CHARGE、O4 PARAM_ERROR。",
              "FAST = B2∧R3；SLOW = batt<50 且非 FAST；NONE = 其余合法组合。"
            ],
            final: "卷面应画两条从 -32768 到 32767 的 value line，并分别交付 input 与 output partition 表；四个 input error TCI 均加 *。"
          },
          {
            label:"1(c)",
            ask: "给最小、可追踪的 EP tests。",
            steps: [
              "T1 (9,51)→FAST_CHARGE，覆盖 B2/R3/O2。",
              "T2 (10,51)→SLOW_CHARGE，新增 B3/O3；R3 是不可避免的重复覆盖。",
              "T3 (50,50)→NONE，新增 B4/R2/O1。",
              "T4 (-1,50)、T5 (101,50)、T6 (50,-1)、T7 (50,256) 均→PARAM_ERROR；每个 TC 只含一个 input error，分别覆盖 B1*/B5*/R1*/R4*，O4 可重复并在表中标明。",
              "填每个 TCI→TC mapping；只有两 TC 完整覆盖集合相同时才删一个，不能因某 normal TCI 不可避免地重复就误删必要测试。"
            ],
            final: "完整答案含 selected values、TCI、TC 三表，明确 expected enum、error 星号、output coverage 与 duplicate review。"
          }
        ]
      },
      {
        question: "Q2 从 JaCoCo 部分覆盖补 Filestore branch tests，再写 TestNG 结构并解释 Agile 中测试维护。",
        parts: [
          {
            label:"2(a)",
            ask: "根据实际代码截图补 Branch Coverage。",
            steps: [
              "先把 2026 PDF 截图中的实际源码、28/32/33 行和 JaCoCo diamonds 可靠转录；yellow/red 只说明部分/未执行，不能单凭颜色猜 branch。",
              "把每个 implementation decision（含短路产生的条件求值和可能的 null-else）编号，再结合已有 EP tests 标出确实未走的 branch。",
              "规格 oracle = enabled∧((¬exists∧¬overwrite)∨(exists∧overwrite))；它只能算 expected output，不能决定源码的 branch 数或执行顺序。",
              "仅对截图可确认的 missed branch 写 line/branch ID、布尔约束、enabled/exists/overwrite 与 expected。",
              "完成 TCI→TC mapping；若当前资料提取不到截图代码，应明确写证据不足，不生成虚假 branch 答案。"
            ],
            final: "Q2(a) 没有脱离截图的唯一 branch 答案；规格真值式不是 branch map，最终答案必须可追溯到截图实现。"
          },
          {
            label:"2(b)",
            ask: "写 TestNG outline。",
            steps: [
              "import org.testng.Assert 与 org.testng.annotations.Test。",
              "定义 public test class。",
              "每个 TC 用 @Test 方法，Arrange 三个 boolean。",
              "Act：Boolean actual = Filestore.decideWrite(...);。",
              "Assert.assertEquals(actual, expected);；可用 @DataProvider 合并表格。"
            ],
            final: "annotation、class、method、call、expected assertion 五层结构必须出现。"
          },
          {
            label:"2(c)",
            ask: "画 Scrum 并解释白盒维护。",
            steps: [
              "画 Product Backlog→Sprint Planning→Sprint/Development→Review→Retrospective→下一轮。",
              "在 refinement/acceptance、开发单元测试、CI、集成与回归位置标 testing。",
              "白盒测试和行/branch 强耦合，重构改变控制流会频繁更新。",
              "黑盒来自稳定规格，内部实现变化而外部行为不变时可复用。"
            ],
            final: "测试不是 Sprint 末尾单独阶段，而是整个循环中的活动。"
          }
        ]
      },
      {
        question: "Q3 比较 Level 的静态方法测试与 class-context 测试，再为 Shipping.decide 交付完整 EP 设计。",
        parts: [
          {
            label:"3(a)",
            ask: "写两种调用顺序与 oracle 位置。",
            steps: [
              "静态：actual = Level.checkLevel(x) → assert actual==expected。",
              "class context：obj = new Level(x) → obj.isValid() → actual = obj.getResult() → assert。",
              "checkLevel 直接 return；isValid 把结果写入字段，所以需 getter。",
              "明确 constructor 建立 attribute l，getResult 负责观察 result。"
            ],
            final: "用调用序列或时序图展示 actual 与 expected 在哪里比较。"
          },
          {
            label:"3(b)",
            ask: "完成 Shipping class-context EP。",
            steps: [
              "isFree 是 freeShipping 的 getter；setPrime 是 primeCustomer 的 setter/mutator；primeCustomer 无 getter 但可由 setPrime 建立 pre-state。",
              "value 是 decide 参数而非字段；仅按行为切换分为 V1 value≤100 与 V2 value>100。负数属 V1，合法但不是第三个 EP。",
              "State TCI：P1 prime=true、P2 prime=false；Output TCI：O1 free、O2 not-free。",
              "T1：new → setPrime(true) → decide(-1) → isFree()=true，覆盖 P1/V1/O1，并显式证明负数合法。",
              "T2：new → setPrime(false) → decide(101) → isFree()=true，覆盖 P2/V2/O1。",
              "T3：new → setPrime(false) → decide(100) → isFree()=false，覆盖 P2/V1/O2。",
              "不要再加 prime=false, value=-1 作 EP 必需 TC；它与 T3 的 P2/V1/O2 集完全重复，只能标可选 robustness test。"
            ],
            final: "最小 normal EP 设计为 3 个 TC；通过 isFree 建立 decide 的 oracle，并在表中列全 calls 与 expected return/void。"
          }
        ]
      },
      {
        question: "Q4 对 SolarPanel 的四条 Decision Table rules 做约束随机测试，写自动化与 inclusive generator，再解释 MTBF 和风险投资。",
        parts: [
          {
            label:"4(a)",
            ask: "完成四条 Random DT tests。",
            steps: [
              "题面给 int lux 且 DT 讨论域限定为 lux≥0，所以自然范围是 0..Integer.MAX_VALUE。",
              "T1 Rule1：grid=true，lux=genRand(4999, 0)，expected false。",
              "T2 Rule2：grid=true，lux=genRand(Integer.MAX_VALUE, 5000)，expected true。",
              "T3 Rule3：grid=false，lux=genRand(4999, 0)，expected false。",
              "T4 Rule4：grid=false，lux=genRand(Integer.MAX_VALUE, 5000)，expected false。",
              "若改用有限 cap U，必须声明 U 是 operational/test cap，不是题面规格上界。"
            ],
            final: "5000 属于 ≥5000 的 Rule2/4；四行都要写 TCI、固定 grid、随机 criteria 与 expected。"
          },
          {
            label:"4(b)(c)",
            ask: "写自动化框架和 genRand。",
            steps: [
              "保存 seed 并 new Random；为 T1..T4 各循环 N 次，固定 grid，按 rule 调用 genRand，执行 SolarPanel.enable。",
              "每次 assertEquals(actual, expected)；失败记录 seed、rule、grid、lux；终止条件写固定 loops 或时长。",
              "按题面原样写签名 int genRand(int max, int min)，先 if(max<min) 抛 IllegalArgumentException。",
              "核心返回语句 return min + random.nextInt(max-min+1)；一般实现需检查差值溢出，本题四个区间的 bound 均为正 int。"
            ],
            final: "完整代码骨架必须同时出现 generator、四 rule 循环、oracle/assert、completion criterion 与可复现日志。"
          },
          {
            label:"4(d)",
            ask: "解释 MTBF 与 risk investment。",
            steps: [
              "按真实用户输入/操作频率构造有统计代表性的 operational profile，长时间自动运行并保留 failure 的时间和输入。",
              "只有每次 failure 后按一致规则修复/重置、并以 operational uptime 计时，才用累计 uptime/failure count 作简化 MTBF 估计；同时报告总时长与 failure count。",
              "零 failure 只给出删失观测，不能直接声称无限 MTBF。",
              "课程风险图先画 Pr(failure) 随 testing expenditure 下降、expected failure cost=Pr(failure)×cost(failure) 下降、testing cost 上升，二者相加得 total cost。",
              "最优投入在 total cost 最低；若收入固定等价 profit 最高。avoided-loss / net-profit 曲线只能标为从课程成本图推导。"
            ],
            final: "结论必须同时交代工作负载代表性、恢复/计时假设、观测量，以及课程原图与利润推导的关系。"
          }
        ]
      }
    ]
  },
  cs616: {
    start: {
      title: "把所有密码计算还原成三件事",
      intro: "CS616 看起来算法多，但每道计算题都只在反复做三件事：① 在某个模数范围内表示数据；② 用密钥做一次可逆或单向运算；③ 验证安全目标是否达到。第一次学先写清进制、模数和公式，再代入数字计算——绝不要在十六进制、十进制和不同 modulus 之间心算跳跃。",
      blocks: [
        {t:"统一表示",p:"每道题第一行写 hex/decimal、mod p/q/n/q² 以及字符编码。统一后再算。"},
        {t:"拆小运算",p:"逆元、快速幂、XOR、点加和多项式约简分开做，每步保留余数防错。"},
        {t:"回代验证",p:"恢复 key/root/signature 后代回公开公式，亲自确认结果再写结论。"}
      ]
    },
    glossary: [
      ["Mod n / 模 n","两个整数相差 n 的倍数时视为同一余数类。x mod n 就是 x 除以 n 的余数。"],
      ["Modulus / 模数","mod 后面那个数，相当于时钟里的 12。"],
      ["Inverse / 逆元","a⁻¹ 满足 a·a⁻¹ ≡ 1 mod n；只有与 n 互素的元素才有逆元。"],
      ["GCD / 最大公约数","gcd(a,n)=1 表示 a 与 n 互素。互素才有乘法逆元。"],
      ["Coprime / 互素","两个整数除了 1 没有其它公共因子。"],
      ["Extended Euclid Algorithm / 扩展欧几里得算法","把 gcd 过程反推得整数 x, y 使 ax + ny = gcd(a,n)；当 gcd=1 时 x 就是 a⁻¹ mod n。"],
      ["Modular Exponentiation / 模幂运算","算 a^e mod n，通常用 repeated squaring 提高效率。"],
      ["Repeated Squaring / 快速平方","连续平方并按指数二进制位选择相乘的方法。例如 a^13 = a^8·a^4·a。"],
      ["CRT / 中国剩余定理","将模不同素数的解组合成模其乘积的解的方法，常用于 RSA 和 Rabin。"],
      ["Nonce","只用一次的随机数；重复或可预测常泄漏密钥。"],
      ["MAC / 消息认证码","用共享密钥验证消息完整性与来源的标签。"],
      ["Public key / 公钥","可公开的加密/验证参数；私钥用于解密/签名。"],
      ["Ring / 环","可做加减乘的代数集合；RLWE 中多项式还要按模多项式约简。"],
      ["AES / 高级加密标准","对称分组密码，固定 128-bit 分组，密钥 128/192/256 位。"],
      ["Block Cipher / 分组密码","以固定大小块为单位加密的密码；AES 用 128 bit 块。"],
      ["Mode of Operation / 操作模式","决定如何把 block cipher 用到比块长的消息上，例如 CTR、OFB、CFB。"],
      ["Keystream / 密钥流","流密码里与明文逐字节 XOR 的伪随机字节序列。"],
      ["IV / 初始向量","让相同密钥加密不同密文出不同结果的随机值；CTR 模式通常发出 IV。"],
      ["RSA","基于大整数分解困难的公钥加密；n=pq，φ=(p−1)(q−1)，d=e⁻¹ mod φ。"],
      ["Rabin Cryptosystem","基于模合数平方根困难的加密；解密等价于分解 n，有 4 个根需消歧。"],
      ["ECC / 椭圆曲线密码学","基于椭圆曲线上离散对数问题困难的密码系统，可用更短密钥达同等安全。"],
      ["ECDSA / 椭圆曲线数字签名算法","基于 ECC 的数字签名方案，验证时计算 w=s⁻¹ mod q 和点运算。"],
      ["RLWE / 环上带误差学习","后量子密码的基础困难问题，在多项式环上构造加密方案。"],
      ["Zero-Knowledge Proof (ZK) / 零知识证明","证明者能让验证者相信某陈述为真，而不泄露任何额外信息。"],
      ["Affine Cipher / 仿射密码","古典密码，加密 c≡am+b mod n；解密需 a 的逆元。"],
      ["Affine Digraph / 仿射双字母密码","对两位字符组做仿射，组合数常为 26²=676。"],
      ["ETM / Encrypt-then-MAC","先加密再对密文计算 MAC 的认证加密方式，比 E&M 和 MTE 安全。"],
      ["E&M / Encrypt-and-MAC","对明文同时加密和 MAC，常见漏洞是 deterministic tag 泄漏相同明文。"],
      ["MTE / MAC-then-Encrypt","先 MAC 再加密，常被 padding oracle 攻击。"],
      ["CCA / 选择密文攻击","攻击者可解密任意密文并观察结果；要求加密方案对 adaptive 密文鲁棒。"],
      ["Quadratic Residue / 二次剩余","模 n 下存在 x 使 x²≡a mod n，则 a 是二次剩余。"],
      ["Jacobi Symbol","Legendre 符号的推广；Jacobi=1 不能单独保证是二次剩余。"],
      ["Legendre Symbol","判断模素数 p 的二次剩余：a^((p−1)/2) mod p 为 +1 表示剩余，−1 不剩余。"],
      ["Blum Integer","n=pq 且 p、q 都是模 4 余 3 的素数，常用于 Rabin 密码。"],
      ["Scalar Multiplication / 标量乘","nP = P + P + … + P（n 次）；椭圆曲线密码的核心运算。"],
      ["Point Order / 点阶","最小 n>0 使 nP=O（无穷远点）。"],
      ["Jacobian Determinant","可逆映射的体积变换因子；normalizing flow 用它算 likelihood。"],
      ["Legendre Symbol / 勒让德符号","判一个数 a 是否是素数 p 的二次剩余：(a/p)≡a^((p-1)/2) mod p，取 +1 表示是剩余，−1 表示不是。"],
      ["Jacobi Symbol / 雅可比符号","Legendre 符号推广到合数模 n=pq…：(a/n)=(a/p)(a/q)…；Jacobi=1 不等于一定可开平方。"],
      ["Quadratic Residue / QR","模 n 下存在平方根的数，即存在 x 使 x²≡a mod n。"],
      ["AddRoundKey","AES 一轮中“当前 state 与 round key 逐字节 XOR”的步骤；因为 XOR 自反，key=S_before⊕S_after。"],
      ["SubBytes","AES 一轮中按 S-box 对每个字节做非线性替换的步骤。"],
      ["ShiftRows","AES 一轮中把每行字节循环移位的步骤。"],
      ["MixColumns","AES 一轮中把 4 字节列看作 GF(2^8) 上多项式并乘固定矩阵的步骤。"],
      ["Round Key / 轮密钥","AES 每轮 XOR 用的子密钥；由主密钥经 Key Schedule 派生。"],
      ["IND-CPA / 选择明文攻击下的不可区分性","对手可任意问加密 oracle 两次 m0、m1，挑战 cipher 在二者上必须无法分辨；加密方案的“基本保密”标准。"],
      ["CCA-secure / 选择密文攻击安全","对手还能问解密 oracle 时仍无法学到明文信息的更强安全标准。"],
      ["Encryption / Encryption (Enc)","用密钥把明文变成密文的操作。"],
      ["Decryption / Decryption (Dec)","用密钥把密文还原为明文的操作。"],
      ["Euler's Theorem / 欧拉定理","若 gcd(a,n)=1 则 a^φ(n)≡1 mod n；RSA 求逆元的理论基础。"],
      ["Fermat Factorisation / 费马分解法","当 n=pq 且 p、q 接近时，找 x²−n=y² 让 n=(x−y)(x+y) 来分解；今年卷用此分解 790199209。"],
      ["Fermat's Little Theorem","a^(p-1)≡1 mod p (对素数 p)；用来降大指数。"],
      ["Garner's Formula","CRT 的高效恢复形式：x=a+p((b−a)·p⁻¹ mod q) 把 x≡a mod p、x≡b mod q 合成模 pq 的解。"],
      ["Hash Function / 散列函数","把任意长输入压成定长摘要的单向函数；要求抗 preimage/second-preimage/collision。"],
      ["Schnorr Protocol","一种 Σ 型零知识证明，用 g^r、随机 challenge、g^s r 三步证明知道 secret；今年题就是它的 shift 变体。"],
      ["Naor-Pinkas","一种基于离散对数的密钥恢复/OT 协议，年内不直接考，仅在 data sheet 出现参考。"],
      ["Paillier","基于合数 n 在 Z_n² 上构造的同态加密方案，data sheet 收录但今年不直接考。"],
      ["Blum Prime","模 4 余 3 的素数，常用于 Rabin 密码以保证开平方根的统一算法。"],
      ["Textbook Rabin / 教材版 Rabin","不加 padding 的草稿 Rabin 实例，安全上易被“提交 R² 套不同根再 gcd”分解 N，不能直接用。"],
      ["S-box / 替换盒","AES 一张固定查找表，给定一个 8-bit 输入返回非线性 8-bit 输出；是 SubBytes 步骤的数据来源。"],
      ["Round / 轮","AES 反复执行的几个固定步骤的合称；128-bit 主密钥的 AES 共重复 10 轮。"],
      ["Key Schedule / 密钥编排","把主密钥扩展为每一轮 round key 的算法。"],
      ["Cipher Block / 分组","加密时一次性处理的一段定长数据；AES 是 128-bit 分组。"],
      ["Block Cipher Mode / 分组密码模式","决定把块加密器用到比块长的消息上时的反馈、IV 与 keystream 形式；常见 CTR/OFB/CFB/ECB。"],
      ["Basic RLWE / 基本 RLWE 加密","data sheet 给的形式 c_aux=a·r+e_aux、c_msg=t·r+e_msg+m；解密 m=dec(c_msg−s·c_aux)。"],
      ["Survivalguide / 速查讲义","课程把数论、群论等要点压成几张纸的 PDF，是考场可参考的速查表。"],
      ["Lsb / 最低有效位","一个二进制数的最后一位；Textbook Rabin 的修复版用 lsb(x) XOR m 作冗余位消歧 square root。"],
      ["Rabin Private Key / Rabin 私钥","Rabin 系统的私钥就是 N 的因子 p、q；解密时分别模 p 与模 q 开平方根，再用 CRT 组合。"]
    ],
    learn: [
      {
        plain: "模运算像时钟：结果只保留除以 modulus 的余数。10 点再加 5 点是 3 点而不是 15 点——这就是 mod 12。密码学里几乎所有计算都在模中完成；要算逆元、大指数、开平方都靠 gcd、平方-乘、CRT 这几样。",
        steps: [
          "先把题目所有 hex 转成十进制或明确保留 hex；不要混算。",
          "用 extended Euclid 求 ax + ny = 1，x 就是 a⁻¹ mod n。",
          "大指数用 repeated squaring：连续平方并按指数二进制位选择相乘。",
          "合数模平方根先在 p、q 下分别求根，再用 CRT 组合四种符号。"
        ],
        example: {
          title: "求 7⁻¹ mod 26",
          prompt: "找 x 使 7x ≡ 1 mod 26。",
          steps: [
            "Euclid：26=3×7+5；7=1×5+2；5=2×2+1。",
            "反推：1 = 5 − 2×2 = 5 − 2×(7−5) = 3×5 − 2×7。",
            "再代 5=26−3×7：1 = 3×26 − 11×7。",
            "所以 −11 是逆元，mod 26 等于 15。",
            "验证 7×15 = 105；105 mod 26 = 105−4×26 = 105−104 = 1。"
          ],
          result: "7⁻¹ mod 26 = 15。"
        },
        practice: {
          q: "6 在 mod 26 下有逆元吗？",
          hint: "计算 gcd(6,26)。",
          a: "没有；gcd=2≠1。只有与 modulus 互素的元素才有乘法逆元。"
        }
      },
      {
        plain: "Affine digraph 把两个字母合并成一个 0..675 的数，再做线性同余 c≡am+b mod 26²，与单字母 affine 同形但更大的模。零知识协议让 prover 在不泄露 secret 的情况下证明知道它。ZK 的安全前提是 challenge 必须不可预测且足够熵；如果 challenge 固定，攻击者能在发送 commitment 前就预知题目并反向算答案。",
        steps: [
          "digraph 先确定字符到 0..25 的映射与组合规则，例如 26x+y。",
          "加密写 c ≡ am + b mod 26²，对应 26²=676；解密需 a 的逆元。",
          "ZK transcript 分四步：commitment、random challenge、response、verification equation。",
          "攻击者利用 challenge 已知：先选 response R，再由 verification 方程反算 commitment，让等式成立。",
          "结论：soundness 依赖不可预测且有足够熵的 challenge；固定挑战只检查一段可伪造 transcript。"
        ],
        example: {
          title: "为什么固定 challenge 危险",
          prompt: "验证者永远发 challenge=1。",
          steps: [
            "正常协议要求 prover 在 commitment 发送后才知随机 challenge。",
            "若 challenge 永远为 1，攻击者在发 commitment 前已知道要回哪条分支。",
            "攻击者先选 response R，再从验证等式反算 commitment。",
            "验证等式确实成立，但 attacker 从未证明能回答其他 challenge。"
          ],
          result: "固定 challenge 破坏 soundness，伪造的 transcript 是 (commitment, 1, R)。"
        },
        practice: {
          q: "把 challenge 在 {0,1} 之间真正随机选择有何改进？",
          hint: "攻击者能否预先准备两种 response？",
          a: "攻击者只能预先准备一个分支时，单轮作弊成功率 ≤1/2；独立重复轮指数降低成功率。"
        }
      },
      {
        plain: "AES 是固定 128-bit block 的置换；mode 决定如何处理长消息或产生字节级 keystream。认证加密还要阻止攻击者修改 ciphertext 并观察解密差异，所以采用 ETM：先把明文加密得到密文 C，再对 C 做 MAC；接收端先验 MAC，失败立刻丢，绝不在 invalid 时释放 plaintext。",
        steps: [
          "AddRoundKey 是逐 byte XOR，所以 roundKey = before XOR after。",
          "CTR/OFB/CFB 可把 block cipher 输出变成流；具体 mode 决定取 MSB/LSB、反馈什么，必须依课程讲义。",
          "ETM 用独立 Ke、Km：先 C=Enc(Ke, M)，再 T=MAC(Km, C)。",
          "接收端先验 T；invalid 永远只返回统一 null。为符合课程 timing 防护，可让 valid/invalid 走等成本或 dummy decryption，但 invalid 时绝不释放 plaintext。",
          "CIA：encryption 给 confidentiality；MAC 给 integrity/authenticity；availability 需其它机制（如冗余/速率限制）。"
        ],
        example: {
          title: "单字节 stream 解密",
          prompt: "keystream byte=0xAD，cipher byte=0x20。",
          steps: [
            "流模式中 C = P XOR K，所以 P = C XOR K。",
            "0x20 = 0010 0000。",
            "0xAD = 1010 1101。",
            "逐位 XOR 得 1000 1101 = 0x8D。"
          ],
          result: "P = 0x8D；具体题必须按图说明 keystream byte 取哪个字节。"
        },
        practice: {
          q: "为什么 ETM 验证失败后不能返回解密错误或 plaintext？",
          hint: "不同错误/plaintext 会形成什么类型的 oracle？",
          a: "会形成 oracle（padding/timing 类）。课程为隐藏 timing 可执行等成本/dummy decryption，但 invalid tag 时必须丢弃结果并统一返回 null；只有 valid 才释放 plaintext。"
        }
      },
      {
        plain: "RSA 的私钥来自 φ(n) 上的逆元；Rabin 的解密是开平方。Textbook Rabin 的危险在于：若你给解密 oracle 提交 R²，oracle 返回一个 Y ≠ ±R，那 gcd(R−Y, N) 或 gcd(R+Y, N) 就能抽出 N 的非平凡因子——这等于分解了 N。",
        steps: [
          "RSA 先 factor n=pq，再 φ=(p−1)(q−1)，最后 d=e⁻¹ mod φ。注意求逆在模 φ 不是模 n。",
          "验证 ed ≡ 1 mod φ（mod φ 不是 mod n）。",
          "Rabin 的 c=m² mod N 形式像 RSA e=2，但 2 与 φ(N) 不互素，不能当合法 RSA 指数。",
          "Rabin 解密有 4 个根，必须消歧。",
          "若 oracle 对 c=R² 返回 Y≠±R，则 gcd(R−Y, N) 或 gcd(R+Y, N) 给非平凡因子。",
          "课程修复：在 QR_N 选唯一 QR square root，密文 ⟨x² mod N, lsb(x) XOR m⟩；通用实现仍配 CCA-secure encoding，绝不裸用 textbook Rabin。"
        ],
        example: {
          title: "不同平方根为何泄漏因子",
          prompt: "R² ≡ Y² mod N。",
          steps: [
            "移项 R²−Y² ≡ 0 mod N。",
            "因式分解 (R−Y)(R+Y) 是 N 的倍数。",
            "当 Y 不是 ±R mod N 时，N 的两个素因子通常分别整除两个因子。",
            "gcd 能从其中之一抽出 p 或 q。"
          ],
          result: "这不是暴力分解，而是利用 decryption oracle 返回的不同根。"
        },
        practice: {
          q: "若 oracle 返回 Y=R，能得因子吗？",
          hint: "gcd(R−Y, N)=gcd(0, N)。",
          a: "只得到 N；另一 gcd 通常为 1 或 N，没有非平凡因子。攻击依赖返回不同于 ±R 的根。"
        }
      },
      {
        plain: "椭圆曲线点不是普通坐标向量。P+Q 由过 P、Q 的直线与曲线第三交点定义，再关于 x 轴反射；P=Q 时用切线代替直线。在有限域中所有除法都变成乘逆元，每一步都 mod p。",
        steps: [
          "先检查点在曲线上；未知 b 用 b ≡ y²−x³−ax mod p。",
          "P≠Q 用割线 slope λ=(y2−y1)(x2−x1)⁻¹；P=Q 用切线 slope λ=(3x²+a)(2y)⁻¹。",
          "x3 = λ² − x1 − x2；y3 = λ(x1 − x3) − y1；全部 mod p。",
          "重复加得 nP；第一次到无穷远点 O 的 n 是点的阶（order）。",
          "ECDSA 验证在 mod q 下算 w, u1, u2 再做曲线点运算，最后比较 x mod q 与 r。"
        ],
        example: {
          title: "ECDSA 验证路线",
          prompt: "给 public point Y、base P、hash h、signature (r, s)。",
          steps: [
            "检查 r, s 在 1..q−1。",
            "w = s⁻¹ mod q。",
            "u1 = h·w mod q；u2 = r·w mod q。",
            "X = u1·P + u2·Y。",
            "v = X_x mod q；v = r 才有效。"
          ],
          result: "标量运算在 mod q，点坐标运算在 mod p；两个模数不要混。"
        },
        practice: {
          q: "为什么 ECDSA 比较的是 X 的 x 坐标 mod q？",
          hint: "签名生成 r 的公式是什么？",
          a: "签名时 r = (kP)_x mod q，所以验证重构对应点后必须用同样映射比较。"
        }
      },
      {
        plain: "RLWE 把数据放进多项式环。解密本质仍是“密文两部分相减消掉含 secret 的大项”，剩下编码消息加小噪声，再按阈值解码。",
        steps: [
          "第一行写 Rq = Z_q[y]/(y^n+1)，所以系数 mod q 且 y^n = −1。",
          "算 s·c_aux，用普通多项式卷积。",
          "高次项用 y^n = −1 降次，例如 y^(n+r) = −y^r。",
          "逐系数算 c_msg − s·c_aux mod q。",
          "按课程编码将靠近 0 或 q/2 中心的系数还原 bit/hex。"
        ],
        example: {
          title: "约简 y^10",
          prompt: "在 Z_83[y]/(y^8+1) 中化简 5y^10。",
          steps: [
            "y^8 ≡ −1。",
            "y^10 = y^8·y² ≡ −y²。",
            "5y^10 ≡ −5y²。",
            "系数 mod 83：−5 ≡ 78。"
          ],
          result: "5y^10 ≡ 78y² mod (y^8+1, 83)。"
        },
        practice: {
          q: "在同一 ring 中 y^16 等于什么？",
          hint: "(y^8)^2。",
          a: "y^16 ≡ (−1)^2 = 1。不能把所有高次项都直接删掉。"
        }
      }
    ],
    exam: [
      {
        question: "Q1 是五道 8 分计算短题：固定 challenge ZK 攻击、Affine digraph、合数模平方根、ECC 和 RLWE。",
        parts: [
          {
            label:"1(a)",
            ask: "用 R=333 击败固定 challenge 的 ZK shift。",
steps: [
              "Schnorr/shift 型检查 g^R ≡ commitment · f(secret)^c mod p；本题 c 恒为 1，验证等式即 2^R ≡ commitment · 697 (mod 991)。",
              "攻击者先选 R=333。把 R 拆成二进制位写小步：333 = 5×64 + 13，所以 2^333 = (2^64)^5 · 2^13 mod 991。",
              "代入题给 2^64 mod 991 = 827：先算 2^13 mod 991 = 8192 mod 991；991×8 = 7928；8192 − 7928 = 264。",
              "算 827^2 mod 991 = 683929 mod 991：991×689 = 682799；683929 − 682799 = 1130；1130 − 991 = 139。",
              "算 827^4 ≡ 139^2 mod 991 = 19321 mod 991：991×19 = 18829；19321 − 18829 = 492。",
              "算 827^5 ≡ 492·827 mod 991 = 406884 mod 991：991×410 = 406310；406884 − 406310 = 574。",
              "于是 2^333 ≡ 574·264 mod 991 = 151536 mod 991：991×152 = 150632；151536 − 150632 = 904 ✓ 所以 2^R mod 991 = 904。",
              "由 2^R ≡ commitment · 697 (mod 991) 得 commitment = 2^R · 697⁻¹ mod 991 = 904 · 697⁻¹ mod 991。",
              "用扩展 Euclid 求 697⁻¹ mod 991：991 = 1·697 + 294；697 = 2·294 + 109；294 = 2·109 + 76；109 = 1·76 + 33；76 = 2·33 + 10；33 = 3·10 + 3；10 = 3·3 + 1。反代整理得 1 = 211·991 − 300·697，所以 697⁻¹ ≡ −300 ≡ 691 (mod 991)。",
              "验算 697·691 = 481627；991×486 = 481626；481627 − 481626 = 1 ✓ 所以 697⁻¹ mod 991 = 691。",
              "commitment = 904 · 691 mod 991 = 624664 mod 991：991×630 = 624330；624664 − 624330 = 334。所以发送 commitment = 334。",
              "攻击者发 (commitment=334, R=333)；收到固定的 c=1 时回答 R=333。",
              "验证端验算：commitment · 697 mod 991 = 334·697 mod 991 = 232798 mod 991；991×234 = 231894；232798 − 231894 = 904 = 2^333 mod 991 ✓ 通过。",
              "但攻击者从未展示有能力回答其他 challenge——固定挑战破坏 soundness。"
            ],
            final: "伪造 transcript = (commitment=334, challenge=1, response=333)；固定挑战让攻击者能在 commitment 之前就准备好 R，再反算 commitment 让等式成立，破坏 soundness。"
          },
          {
            label:"1(b)",
            ask: "由 mail→uwex 恢复 Affine digraph key。",
            steps: [
              "先把双字母映射到 0..675：26·x + y。代入：ma = 26·12 + 0 = 312；il = 26·8 + 11 = 219；uw = 26·20 + 22 = 542；ex = 26·4 + 23 = 127。模数 n² = 26² = 676。",
              "已知 ma→uw、il→ex，列出方程：542 ≡ 312a + b (mod 676)；127 ≡ 219a + b (mod 676)。",
              "两式相减消 b：542 − 127 ≡ (312 − 219)a，即 415 ≡ 93a (mod 676)。",
              "题给 93⁻¹ ≡ 189 (mod 676)，所以 a ≡ 415·189 mod 676。算乘积：415·189 = 78435；991 不属于；77892 写错了，真正 415·189 = ? 算：415·189 = 415·(200 − 11) = 83000 − 4565 = 78435；78435 / 676 = 116 (116·676 = 78316)；78435 − 78316 = 119……先把 676 列出：676·100 = 67600；78435 mod 676：先 78435 ÷ 676 ≈ 116；676·116 = 78416；78435 − 78416 = 19；所以 a ≡ 19 mod 676。",
              "回代 b：b ≡ 542 − 19·312 (mod 676)。算 19·312 = 5928；542 − 5928 = −5386；−5386 mod 676：676·7 = 4732；−5386 + 8·676 = −5386 + 5408 = 22；所以 b ≡ 22 mod 676。",
              "验证：19·312 + 22 = 5928 + 22 = 5950；5950 mod 676：676·8 = 5408；5950 − 5408 = 542 = uw ✓",
              "验证：19·219 + 22 = 4161 + 22 = 4183；4183 mod 676：676·6 = 4056；4183 − 4056 = 127 = ex ✓"
            ],
            final: "Affine digraph private key (a, b) = (19, 22) mod 676。"
          },
          {
            label:"1(c)(d)",
            ask: "求平方根和椭圆曲线点。",
            steps: [
              "(c) 平方根。先把 hex 转 dec：p=0x20b = 2·256 + 0·16 + 11 = 523；n=0x45d81 = 4·65536+5·4096+13·256+8·16+1 = 262144+20480+3328+128+1 = 286081。",
              "算 q=n/p：286081÷523。先估 523×500=261500；286081−261500=24581；523×47=24581 ✓ 所以 q=547（hex 0x223）。",
              "题给 residues：mod p 根 ±415 即 415 与 523−415=108；mod q 根 ±62 即 62 与 547−62=485。",
              "算 Garner 需要的 p⁻¹ mod q。用扩展 Euclid：547=1·523+24；523=21·24+19；24=1·19+5；19=3·5+4；5=1·4+1。反代：1=5−4=5−(19−3·5)=4·5−19=4·(24−19)−19=4·24−5·19=4·24−5·(523−21·24)=109·24−5·523=109·(547−523)−5·523=109·547−114·523。所以 523⁻¹ ≡ −114 ≡ 547−114 = 433 mod 547 ✓",
              "Garner 公式 x = a + p·((b−a)·433 mod 547)。四个根逐一算：",
              "根 (a_p=415, a_q=62)：u = (62−415)·433 mod 547 = (−353)·433 mod 547。先算 −353 mod 547 = 194；194·433 = 84002；84002 mod 547：547×153 = 83691；84002−83691 = 311。x = 415+523×311 = 415+162653 = 163068。",
              "根 (a_p=415, a_q=485)：u = (485−415)·433 mod 547 = 70·433 = 30310 mod 547；547×55 = 30085；30310−30085 = 225。x = 415+523×225 = 415+117675 = 118090。",
              "根 (a_p=108, a_q=62)：u = (62−108)·433 mod 547 = (−46)·433 mod 547。先算 −46 mod 547 = 501；501·433 = 216933 mod 547；547×396 = 216612；216933−216612 = 321。x = 108+523×321 = 108+167883 = 167991。",
              "根 (a_p=108, a_q=485)：u = (485−108)·433 mod 547 = 377·433 = 163241 mod 547；547×298 = 163006；163241−163006 = 235。x = 108+523×235 = 108+122905 = 123013。",
              "验算每个 x² mod 286081 = radicand 0x3817b = 229755：163068²、118090²、167991²、123013² 四个 mod 286081 均得 229755 ✓",
              "(d) ECC。先求曲线参数 b：把 P=(25,14) 代入 y²=x³+13x+b mod 37，得 b = y²−x³−13x mod 37。",
              "算 14² = 196；25³ = 15625；13·25 = 325。196−15625−325 = −15754。−15754 mod 37：15754÷37 = 425 余 15754−425×37 = 15754−15725 = 29；−15754 mod 37 = −29 mod 37 = 37−29 = 8。所以 b = 8 ✓ 曲线 y² = x³+13x+8 mod 37。",
              "算 2P（point doubling）。λ = (3x_P²+a)/(2y_P) mod p。分子 3·25²+13 = 3·625+13 = 1875+13 = 1888；1888 mod 37：37×51 = 1887；1888−1887 = 1。分母 2·14 = 28。",
              "求 28⁻¹ mod 37：Euclid 37=1·28+9；28=3·9+1。反代 1=28−3·9=28−3·(37−28)=4·28−3·37。所以 28⁻¹ ≡ 4 mod 37。",
              "λ = 1·4 mod 37 = 4。x_{2P}=λ²−2x_P = 16−50 = −34 mod 37 = 3。y_{2P}=λ(x_P−x_{2P})−y_P = 4·(25−3)−14 = 4·22−14 = 88−14 = 74；74 mod 37 = 0。所以 2P = (3, 0)。",
              "算 3P = 2P+P（不同点加法）。λ = (y_P−y_{2P})/(x_P−x_{2P}) = (14−0)/(25−3) = 14/22 mod 37。",
              "求 22⁻¹ mod 37：Euclid 37=1·22+15；22=1·15+7；15=2·7+1。反代 1=15−2·7=15−2·(22−15)=3·15−2·22=3·(37−22)−2·22=3·37−5·22。所以 22⁻¹ ≡ −5 ≡ 32 mod 37。",
              "λ = 14·32 mod 37 = 448 mod 37：37×12 = 444；448−444 = 4。所以 λ = 4。",
              "x_{3P}=λ²−x_{2P}−x_P = 16−3−25 = −12 mod 37 = 25。y_{3P}=λ(x_{2P}−x_{3P})−y_{2P} = 4·(3−25)−0 = 4·(−22) = −88 mod 37：88÷37 = 2 余 14；−88 mod 37 = −14 mod 37 = 23。所以 3P = (25, 23)。",
              "注意 −P = (25, 37−14) = (25, 23) = 3P ✓ 所以 3P = −P。",
              "4P = 3P+P = −P+P = O（无穷远点）。所以 P 的阶 n = 4（最小正整数使 nP=O；2P≠O，3P≠O，4P=O）。"
            ],
            final: "(c) 4 个 CRT 根：163068、118090、167991、123013，全部平方 mod 286081 = 229755 ✓。(d) Q=2P=(3,0)，P 的 order n=4。"
          },
          {
            label:"1(e)",
            ask: "解密 RLWE 两字符。",
            steps: [
              "约定先置顶：ciphertext tuple 第一项是 c_aux、第二项是 c_msg。ring R_q = Z_83[y]/(y^8+1)，故 y^8 = −1。",
              "先把 c_aux 和 c_msg 的系数按题面 y^7→y^0 顺序抄下来，再倒序成 y^0→y^7 便于卷积：c_aux = [57, 18, 62, 48, 30, 57, 55, 74]；c_msg = [2, 12, 65, 50, 1, 50, 2, 39]。",
              "s = y^7 + 2y，按 y^0→y^7 也写成系数 [0, 2, 0, 0, 0, 0, 0, 1]。",
              "算 s·c_aux = 2y·c_aux + y^7·c_aux。先算 2y·c_aux：把 c_aux 整体右移 1 位并乘 2；y^8 = −1 让超出 y^7 的项折回：y^0 系数 = −2·c_aux[y^7] = −2·74 = −148；y^1 = 2·57 = 114；y^2 = 2·18 = 36；y^3 = 2·62 = 124；y^4 = 2·48 = 96；y^5 = 2·30 = 60；y^6 = 2·57 = 114；y^7 = 2·55 = 110。",
              "再算 y^7·c_aux：把 c_aux 右移 7 位；超过 y^7 的项也折回为负：y^0 = −c_aux[y^1] = −18；y^1 = −c_aux[y^2] = −62；y^2 = −c_aux[y^3] = −48；y^3 = −c_aux[y^4] = −30；y^4 = −c_aux[y^5] = −57；y^5 = −c_aux[y^6] = −55；y^6 = −c_aux[y^7] = −74；y^7 = c_aux[y^0] = 57。",
              "两项相加逐系数 mod 83：y^0 = (−148)+(−18) = −166 mod 83 = −166+2·83 = 0；y^1 = 114+(−62) = 52；y^2 = 36+(−48) = −12 mod 83 = 71；y^3 = 124+(−30) = 94 mod 83 = 11；y^4 = 96+(−57) = 39；y^5 = 60+(−55) = 5；y^6 = 114+(−74) = 40；y^7 = 110+57 = 167 mod 83 = 167−2·83 = 1。所以 s·c_aux = [0, 52, 71, 11, 39, 5, 40, 1]。",
              "算 c_msg − s·c_aux 逐系数 mod 83：y^0 = 2−0 = 2；y^1 = 12−52 = −40 mod 83 = 43；y^2 = 65−71 = −6 mod 83 = 77；y^3 = 50−11 = 39；y^4 = 1−39 = −38 mod 83 = 45；y^5 = 50−5 = 45；y^6 = 2−40 = −38 mod 83 = 45；y^7 = 39−1 = 38。结果 [2, 43, 77, 39, 45, 45, 45, 38]。",
              "转回题面 y^7→y^0 顺序倒着读：[38, 45, 45, 45, 39, 77, 43, 2]。",
              "阈值解码：q=83，q/4 ≈ 21，3q/4 ≈ 62。系数落在 [21, 62] 区间 → bit 1，否则 → bit 0。",
              "逐位判：38→1（在 21..62 内）、45→1、45→1、45→1、39→1、77→0（>62）、43→1、2→0（<21）。得 bits = 11111010。",
              "转 hex：11111010 = 128+64+32+16+8+2 = 250 = 0xFA。"
            ],
            final: "plaintext 为两个十六进制字符 FA。关键易错：题面用 y^7→y^0 显示系数，而 bit string 要按 y^7→y^0 顺序读，不能直接拿 y^0→y^7 数组当 bits。"
          }
        ]
      },
      {
        question: "Q2 考 AES XOR、把 block cipher 工程成 8-bit stream，以及 ETM 抵抗 adaptive ciphertext 的结构。",
        parts: [
          {
            label:"2(a)",
            ask: "从 ARK 前后 state 求 round key。",
            steps: [
              "把 before 对齐为 16 bytes：12 34 56 ff 12 34 56 ff 12 34 56 ff 12 34 56 ff。after 为：a9 34 56 ff 12 34 56 ff 12 34 56 ff 12 34 56 44。",
              "ARK 公式 S_after = S_before XOR K_round，所以 K = S_before XOR S_after。逐 byte 算：",
              "byte[0]: 0x12 XOR 0xa9。先写二进制：0x12 = 0001 0010，0xa9 = 1010 1001；逐位 XOR = 1011 1011 = 0xbb。",
              "byte[1]: 0x34 XOR 0x34 = 0x00（相同）。",
              "byte[2]: 0x56 XOR 0x56 = 0x00（相同）。",
              "byte[3]: 0xff XOR 0xff = 0x00（相同）。",
              "byte[4..14]: 全部相同，XOR 全出 0x00。",
              "byte[15]: 0xff XOR 0x44。0xff = 1111 1111，0x44 = 0100 0100；逐位 XOR = 1011 1011 = 0xbb。",
              "拼回 16 bytes：bb 00 00 00 00 00 00 00 00 00 00 00 00 00 00 bb，即 bb0000000000000000000000000000bb。",
              "验证：再把 key XOR S_after：0xbb XOR 0xa9 = 0x12 ✓；0x00 XOR 0x34 = 0x34 ✓；末 byte 0xbb XOR 0x44 = 0xff ✓。回到 S_before。"
            ],
            final: "round key = bb0000000000000000000000000000bb。"
          },
          {
            label:"2(b)",
            ask: "选课程指定的 8-bit CFB 并恢复 plaintext byte。",
            steps: [
              "画 128-bit IV/register→AES encryption→S_8→XOR 的 CFB 图。",
              "Day 3 讲义定义 S_8 取 E_k(IV) 的最高有效 8 bits（MSB）。题给 E_k(IV) 输出开头是 EA，所以取 K1 = 0xEA = 1110 1010。",
              "题给 C1 = 0x20 = 0010 0000。",
              "流模式解密公式 P1 = C1 XOR K1。逐位算：0010 0000 XOR 1110 1010 = 1100 1010。把 1100 1010 转回 hex：C = 12, A = 10 → 0xCA。",
              "注意：课程定义 S_8 取 MSB（首 byte），所以 K1 = 0xEA 不是末 byte 0xDF。如果取末 byte，会得到 0x20 XOR 0xDF = 0xFF，答案是错的。"
            ],
            final: "plaintext byte = 0xCA。关键约定：S_8 取 E_k(IV) 的 MSB 8 bits（首 byte），不能改成末 byte DF。"
          },
          {
            label:"2(c)",
            ask: "完整解释 ETM，并与 E&M/MTE 分开比较。",
            steps: [
              "ETM = Encrypt Then MAC。发送：C=Enc_Ke(M;IV)，T=MAC_Km(IV||C)，发送 IV, C, T。",
              "E&M 对明文产生 deterministic tag：攻击者可先查 m0 的 tag，再在 IND-CPA challenge 中比较 tag，识别 m0/m1；这是它的主要课程反例。",
              "MTE/decrypt-before-auth 是另一问题，可能暴露 padding/格式 oracle，不要与 E&M 的 deterministic-tag 泄漏混。",
              "接收端先验 tag；课程要求 invalid/valid 路径可观察时间相同，可执行等成本或 dummy decryption，但 invalid 永远只返回统一 null，valid 才释放 plaintext。",
              "ETM 给 confidentiality 与 integrity/authenticity；不自动保证 availability。"
            ],
            final: "卷面要点：独立 Ke/Km、ciphertext MAC、E&M equality leak、MTE oracle、constant-work invalid path、CIA 映射。"
          }
        ]
      },
      {
        question: "Q3 依次要求恢复 RSA d、利用 Rabin oracle 分解 N，以及按给定倍点验证 ECDSA。",
        parts: [
          {
            label:"3(a)",
            ask: "恢复 RSA private key d。",
            steps: [
              "用 Fermat factorisation 分解 n=790199209。先估 s = ceil(√n) = 28111（28111² = 28111×28111：先 28000²=784000000；2×28000×111=6216000；111²=12321；合 784000000+6216000+12321 = 790228321 > n；但 28110² = 790172100 < n；所以 ceil(√n) = 28111）。",
              "从 s=28111 开始逐个试：算 s²−n 是否为完全平方。28111²−n = 790228321−790199209 = 29112；√29112 ≈ 170.6，不整。",
              "s=28112：28112² = 28111²+2×28111+1 = 790228321+56223 = 790284544；减 n = 85335；√85335 ≈ 292.1，不整。",
              "s=28113：28113² = 28112²+2×28112+1 = 790284544+56225 = 790340769；减 n = 141560；√141560 ≈ 376.2，不整。",
              "s=28114：28114² = 28113²+56227 = 790340769+56227 = 790396996；减 n = 197787；√197787 ≈ 444.7，不整。",
              "s=28115：28115² = 28114²+56229 = 790396996+56229 = 790453225；减 n = 254016；√254016 = 504 ✓ 完全平方！",
              "所以 p = s−t = 28115−504 = 27611；q = s+t = 28115+504 = 28619。",
              "算 φ(n) = (p−1)(q−1) = 27610×28618。先算 27610×28000 = 773080000；27610×618 = 27610×600+27610×18 = 16566000+496980 = 17062980；合 773080000+17062980 = 790142980。所以 φ = 790142980。",
              "求 d = e⁻¹ mod φ = 564387843⁻¹ mod 790142980。验证 d=7：564387843×7 = 3950714901。3950714901 mod 790142980：790142980×5 = 3950714900；3950714901−3950714900 = 1 ✓ 所以 d = 7。"
            ],
            final: "RSA private exponent d=7；n 的因数为 p=27611、q=28619。"
          },
          {
            label:"3(b)",
            ask: "讨论 Rabin 与 RSA 关系，完成攻击并给课程版防御。",
            steps: [
              "i) Rabin c=m² mod N 形式像 RSA e=2；但标准 RSA 要求 gcd(e, φ(N))=1，而 Blum integer 的 φ(N) 为偶数，所以 e=2 不可逆。Rabin 解密有 4 个根，因此它不是普通 RSA 的合法参数特例。",
              "ii) 攻击者选 R=23769451，先算 C = R² mod N = 23769451² mod 47479253。23769451² 太大不必全展开——用计算器算 23769451² mod 47479253 = 23004433。攻击者把 C = 23004433 提交给 Rabin oracle。",
              "oracle 返回 Y = 31423469（C 的一个平方根，且 Y ≠ ±R mod N）。",
              "算 gcd(|R−Y|, N)：R − Y = 23769451 − 31423469 = −7654018；取绝对值 |R−Y| = 7654018。用 Euclid 算 gcd(7654018, 47479253)：47479253 = 6×7654018 + 1554845；7654018 = 4×1554845 + 1432198；1554845 = 1×1432198 + 122647；……（逐余直到 0）最终 gcd = 13523。这就是 N 的一个素因子 p。",
              "算 gcd(R+Y, N)：R + Y = 23769451 + 31423469 = 55192920。Euclid：55192920 mod 47479253 = 7713667；47479253 = 6×7713667 + 3068951；……最终 gcd = 3511。这就是 N 的另一个素因子 q。",
              "验证 13523 × 3511 = ?：先 13523×3000 = 40569000；13523×500 = 6761500；13523×11 = 148753；合 40569000+6761500+148753 = 47478253。差 1000——重算 13523 × 3511 = 13523×3500 + 13523×11 = 47330500 + 148753 = 47479253 = N ✓",
              "iii) 攻击利用 composite modulus 下的不同平方根：R² ≡ Y² mod N，但 Y ≠ ±R mod N，说明 (R−Y)(R+Y) = N 的倍数但不整除 N，所以 gcd 能从 R±Y 中各自抽出 N 的一个因子。",
              "课程防御：在 QR_N 选唯一 QR square root，密文用 ⟨x² mod N, lsb(x) XOR m⟩ 编码冗余位消歧，解密只返消息 bit 不返 root；通用系统加 CCA-secure padding。"
            ],
            final: "Rabin 形式像 e=2，但不是合法 RSA 特例；用 R²→不同根 Y 的 gcd 可分解 N，得 p=13523、q=3511。"
          },
          {
            label:"3(c)",
            ask: "验证 ECDSA signature (1, 6)。",
            steps: [
              "先算 h = H(M) mod q = 22 mod 7。22÷7 = 3 余 1，所以 h = 1。",
              "算 w = s⁻¹ mod q = 6⁻¹ mod 7。验证 6×6=36=5×7+1，余 1 ✓ 所以 w = 6。",
              "算 u1 = h·w mod q = 1×6 mod 7 = 6。",
              "算 u2 = r·w mod q = 1×6 mod 7 = 6。",
              "题给 6P = (13, 2) 修正：题目给 5P=(4,6)、P=(13,2)，所以 6P = 5P+P。算加法：λ=(6−2)/(4−13) mod 17 = 4/(−9) mod 17。−9 mod 17 = 8；8⁻¹ mod 17：17=2×8+1，反代 1=17−2×8，8⁻¹=−2≈15。λ = 4×15 mod 17 = 60 mod 17 = 60−3×17 = 9。x_3 = 9²−4−13 = 81−17 = 64 mod 17 = 64−3×17 = 13。y_3 = 9×(4−13)−6 = 9×(−9)−6 = −87 mod 17 = −87+6×17 = −87+102 = 15。所以 6P = (13, 15) ✓",
              "题给 6Y = (1, 14)。验算 3Y=(4,11)，6Y = 3Y+3Y=(4,11)+(4,11) doubling：λ=(3×4²+5)/(2×11) mod 17 = (48+5)/22 = 53/22 mod 17。先算 53 mod 17 = 53−3×17 = 2；22 mod 17 = 5；所以 λ = 2/5 mod 17。5⁻¹ mod 17：17=3×5+2；5=2×2+1；反代 1=5−2×2=5−2×(17−3×5)=7×5−2×17，5⁻¹=7。λ=2×7 mod 17=14。x_3=14²−2×4=196−8=188 mod 17=188−11×17=188−187=1。y_3=14×(4−1)−11=42−11=31 mod 17=31−17=14。6Y=(1,14) ✓",
              "算 X = u1·P + u2·Y = 6P + 6Y = (13,15)+(1,14)。不同点加法：λ=(14−15)/(1−13) mod 17 = (−1)/(−12) mod 17。",
              "先把 −1 mod 17 = 16；−12 mod 17 = 5。λ = 16/5 mod 17 = 16·5⁻¹ mod 17。用上面已算 5⁻¹ mod 17 = 7。λ = 16×7 mod 17 = 112 mod 17：17×6=102；112−102=10。所以 λ=10。",
              "x_X = λ²−x₁−x₂ = 100−13−1 = 86 mod 17：17×5=85；86−85=1。所以 x_X = 1。",
              "y_X = λ·(x₁−x_X)−y₁ = 10×(13−1)−15 = 10×12−15 = 120−15 = 105 mod 17：17×6=102；105−102=3。所以 y_X = 3。X = (1, 3)。",
              "算 v = x_X mod q = 1 mod 7 = 1。",
              "比较 v 与 r：v = 1 = r ✓ 签名有效。"
            ],
            final: "signature (r, s) = (1, 6) 有效。全过程核心公式：v = (u1P + u2Y)_x mod q，再与 r 比较。"
          }
        ]
      }
    ]
  },
  cs618: {
    start: {
      title: "从一个神经元开始，不预设你会线性代数",
      intro: "深度学习模型看起来巨大，其实每一层只反复做一件事：把输入乘上权重、加上偏置、再过一个小函数。训练就是看你预测与目标差多少，再沿计算链反向调整参数。今年真题主要检查概念理解和尺寸/参数计算，所以第一关不是写代码，而是把“每个数来自哪里”说清楚。",
      blocks: [
        {t:"看 shape",p:"每个 tensor 都写成“高度×宽度×通道”或“样本×特征”。逐层追尺寸。"},
        {t:"数 parameters",p:"每个输出单元连多少输入 + 几个 bias；不要把输出像素数误当独立权重。"},
        {t:"分数据职责",p:"training 学参数；validation 选超参数；test 只做最终评估。"}
      ]
    },
    glossary: [
      ["Tensor / 张量","多维数字数组；图像常写 H×W×C。"],
      ["Parameter / 参数","训练直接更新的 weight 和 bias。你可以把它想象成旋钮。"],
      ["Hyperparameter / 超参数","训练前/过程中由人或搜索选的设置，如 learning rate、batch size、层数。"],
      ["Weight / 权重","把每个输入维度乘有的系数。"],
      ["Bias / 偏置","加到加权和后的常数。"],
      ["Neuron / 神经元","一个计算单元：z = w·x + b，再过 activation。"],
      ["Activation Function / 激活函数","引入非线性的函数，如 ReLU、sigmoid、softmax。"],
      ["ReLU / 修正线性单元","激活函数 max(0, x)；正区间恒等，负区间输出 0。"],
      ["Sigmoid","把任意数压到 (0, 1) 区间的非线性函数，常用于二分类输出。"],
      ["Softmax","把向量变成概率分布（所有分量非负且和为 1），常用于多分类输出。"],
      ["Loss / 损失","一个标量衡量预测与目标差多少。"],
      ["Loss Function / 损失函数","算 loss 的函数，如 MSE、cross-entropy。"],
      ["MSE / 均方误差","L=(1/N)Σ||x−x̂||²；最常用的回归/重建 loss。"],
      ["Cross-Entropy / 交叉熵","分类常用 loss，惩罚预测概率与真标签的偏离。"],
      ["Epoch","训练集被完整使用一遍。"],
      ["Batch Size / 批大小","一次前向/反向传播用的样本数。"],
      ["Iteration / Step","一次参数更新，与一个 batch 对应。"],
      ["Forward Pass / 前向传播","从输入到输出的一次计算，得到 prediction。"],
      ["Backpropagation / 反向传播","用链式法则从 loss 向前逐层求梯度的算法。"],
      ["Chain Rule / 链式法则","复合函数求导法则，是反向传播数学基础。"],
      ["Gradient Descent / 梯度下降","沿 loss 对参数的负梯度方向更新参数。"],
      ["Learning Rate / 学习率","控制每次更新步长的超参数。"],
      ["Optimizer / 优化器","执行参数更新的算法，如 SGD、Adam。"],
      ["Embedding / 嵌入向量","把对象表示成一个可比较、可供下游使用的向量。"],
      ["Latent / 隐变量","encoder 输出的低维表示，也叫 embedding。"],
      ["Autoencoder / 自编码器","输入→encoder→latent→decoder→输出的网络，训练目标是重建输入。"],
      ["Encoder / 编码器","把输入压成 latent 的部分。"],
      ["Decoder / 解码器","把 latent 还原成与输入同维输出的部分。"],
      ["Reconstruction / 重建","decoder 输出，目标是尽量接近输入。"],
      ["Self-supervised Learning / 自监督学习","标签由数据自身构造，如重建输入或预测遮盖部分。"],
      ["Supervised Learning / 监督学习","有外部人工/指南标签指导。"],
      ["CNN / 卷积神经网络","用共享 filter 在空间滑动提取局部特征的网络。"],
      ["Filter / Kernel","卷积层的小权重块，如 3×3。"],
      ["Convolution / 卷积","filter 在输入图上滑动做点积的运算。"],
      ["Stride / 步长","filter 每次移动多少位置。"],
      ["Padding / 填充","在输入周围补 0 控制 output shape。"],
      ["Pooling / 池化","对局部窗口取 max 或 average 等的降采样，无 learnable weights。"],
      ["FC / Fully Connected","全连接层，每输出单元连接所有输入。"],
      ["Flatten","把 H×W×C 张量展成 1D 向量作为 FC 输入。"],
      ["Transformer","基于 self-attention 的架构，无 recurrence，需 positional encoding。"],
      ["Self-attention","每个 token 用 query 与所有 key 比相似度，加权混合 value。"],
      ["Multi-head Attention","并行多个 attention 子空间再 concat。"],
      ["Positional Encoding / 位置编码","注入顺序信息，因为 attention 本身无位置。"],
      ["Residual Connection / 残差连接","y = F(x) + x，方便深层训练。"],
      ["Overfitting / 过拟合","训练好但新数据泛化差。"],
      ["Regularisation / 正则化","防过拟合，如 L1/L2、dropout、data augmentation、early stopping。"],
      ["Dropout","训练时随机丢一部分神经元的正则化技术。"],
      ["L1 / L2 Regularisation","给 loss 加 λ||w||₁ 或 λ||w||²₂ 的正则项。"],
      ["Validation Set / 验证集","选超参数和 early stopping 的数据集；不用于训练参数。"],
      ["Test Set / 测试集","选冻结后才用于最终评估的数据集。"],
      ["Hold-out Set / 留出集","保留做最终无偏评估的独立数据。"],
      ["Data Leakage / 数据泄漏","不该给训练过程看到的信息（如 test 统计、目标）混入选择模型，造成乐观偏差。"],
      ["Grid / Random / Bayesian Optimization","三种 hyperparameter 搜索策略。"],
      ["Cross-validation / 交叉验证","数据少时把训练集分成多份轮流当 validation。"],
      ["Generative Model / 生成模型","能从学习分布中采样新数据的模型。"],
      ["VAE / 变分自编码器","用 ELBO 训练的生成模型。"],
      ["GAN / 生成对抗网络","generator 与 discriminator 对抗训练。"],
      ["Diffusion Model / 扩散模型","学去噪逆过程生成数据的模型。"],
      ["Normalizing Flow / 归一化流","由可逆层组成的生成模型，可精确算 likelihood。"],
      ["Invertible Layer / 可逆层","输入可从输出唯一恢复的层，存在逆函数 f⁻¹。"],
      ["Jacobian Determinant / 雅可比行列式","可逆映射的体积变换因子，flow 用它算 exact likelihood。"],
      ["GNN / 图神经网络","节点每层聚合邻居特征再更新，用于 node 分类、link 预测。"],
      ["XAI / Explainable AI","提供 feature attribution/局部解释；解释 ≠ 因果或公平证明。"],
      ["Stakeholder / 受影响者","伦理讨论中受某系统影响的群体。"],
      ["Audit / 审计","按某 metric/群体检查模型偏差、单调性等。"],
      ["SGD / Stochastic Gradient Descent","每次只用一个或几个样本算梯度并更新参数的优化算法。"],
      ["Adam","带一阶/二阶动量自适应学习率的优化器，深度学习里最常用。"],
      ["Contrastive Learning / 对比学习","拉近相似样本、推开不相似样本的自监督表示学习目标。"],
      ["ViT / Vision Transformer","把图像切成 token 序列交给 Transformer 处理的视觉模型；属 CS636 扩展。"],
      ["CLIP","OpenAI 的图文对比学习模型，把图像与文本对齐到共同 embedding 空间。"],
      ["ImageBind","Meta 的多模态对齐模型，把图像、文本、音频、深度等绑到同一 embedding 空间。"],
      ["Stable Diffusion / 稳定扩散","在 latent 空间用 UNet 去噪迭代生成图像的扩散模型；属 CS636 扩展。"],
      ["DGL","Deep Graph Library，GNN 的 Python 框架。"],
      ["Node Classification / 节点分类","GNN 的下游任务之一，给图中节点打标签。"],
      ["Link Prediction / 链接预测","GNN 的下游任务之一，预测图中两点是否应有连边。"],
      ["VGG-16","经典 16 层 CNN，由 13 个卷积 + 3 个全连接组成；今年卷的卷 2 围绕它。"],
      ["Filter Size / 卷积核尺寸","卷积核的高×宽，VGG 全部用 3×3。"],
      ["Stride / 步长","卷积或池化每次移动多少位置；VGG 卷积 stride1、池化 stride2。"],
      ["Same Padding / 同尺寸填充","在输入周围补 0 使 stride1 卷积后 H、W 不变。"],
      ["Cross-Validation / 交叉验证","数据少时把训练集分成 K 份轮流当 validation，更稳定选超参数。"],
      ["Early Stopping / 提前终止","在 validation 性能不再提升时停止训练以防过拟合。"],
      ["Fine-tune / 微调","在已训练模型权重基础上再训练，常用于下游任务。"],
      ["Freeze / 冻结","保留某层权重不更新，常用于迁移学习。"],
      ["Self-supervision / 自监督","标签由数据自身构造（如遮盖/重建）的机器学习方式；区别于 supervised 有外部人工标签。"],
      ["U-Net / UNet","一种 Encoder-Decoder 形状、带 skip connection 的 CNN 架构；扩散模型里用它做去噪网络。"],
      ["Skip Connection / 跳连","把浅层特征直接接到深层，绕过中间层；残差连接是其一种，U-Net 也用它把 encoder 特征传给 decoder。"],
      ["OpenAI / Meta","两家分别开发了 CLIP 和 ImageBind 的公司；本课只作背景，不考公司细节。"],
      ["Dataset / 数据集","用于训练、验证或测试的样本集合；本课区分 train/validation/test。"],
      ["Library / 框架库","实现深度学习中“建模+训练”通用功能的软件，如 TensorFlow、PyTorch、Keras。"],
      ["Activation Function Family","常见激活函数：ReLU=max(0,x)、sigmoid=1/(1+e^-x)、softmax 把向量归一为分布。"],
      ["Loss Function Family","常见 loss：MSE 用于回归、cross-entropy 用于分类、reconstruction MSE 用于自编码器。"],
      ["Batch/Layer Normalisation","对每个 mini-batch 内或每个特征通道做归一，让训练更稳定、学习率可调大。"],
      ["Attention / 注意力","核心机制：用 query 与所有 key 算相似度，加权混合对应 value，得到每个 token 的上下文表示。"],
      ["Multi-Head Self-Attention","把 Q/K/V 投影到多个子空间各做 self-attention 再 concat，让模型在不同子空间学不同关系。"],
      ["Transformer Code-Example","CS636 课件名；展示只靠 self-attention 的 seq2seq 编码块；今年卷不直接考。"],
      ["Residual Connection / 残差连接","y=F(x)+x 形式的快捷连接，让深层网络梯度回传通畅、训练更易，配合 LayerNorm 进入 Transformer。"],
      ["Positional Encoding / 位置编码","因为 attention 本身对位置无感，要在输入 token 向量上加上正弦/余弦或可学习位置向量来表示顺序。"],
      ["Graphs / 图","节点+边的数据结构；GNN 在其上做邻居聚合。"],
      ["GNN / 图神经网络","每层把每个节点的邻居特征聚合后更新；下游用于 node/link 分类。"],
      ["Generative Model / 生成模型","能从学习分布中采样新样本的模型；扩散、VAE、GAN、Normalizing Flow 是其四类。"],
      ["Diffusion / 扩散模型","先把数据逐步加噪成纯噪声、再训练一个去噪网络反向“沙里淘金”地恢复数据。"],
      ["Stable Diffusion / 稳定扩散","把扩散模型的去噪放在压缩 latent 空间做的版本，文字→图像生成常用。"],
      ["Contrastive Learning","把相似样本拉近、不相似样本推开以学 representation 的自监督目标。"]
    ],
    learn: [
      {
        plain: "一个 neuron 先做加权和 z = w·x + b，再经过 activation。多层网络只是把这个操作反复组合。Loss 告诉模型错多少，backprop 用 chain rule 算每个参数该往哪调。这五个名词（输入、weights、bias、activation、loss）后面所有章节里反复出现，把它们记牢。",
        steps: [
          "输入 x 是数据；weights 决定各输入影响大小；bias 平移决策边界。",
          "activation 引入非线性。整层线性层无论多深都等价于一层线性层，所以非线性是网络有意义的的前提。",
          "forward pass 得 prediction；loss 与 target 比较差。",
          "backprop 从 loss 向前逐层求导；optimizer 按 learning rate 用梯度更新参数。"
        ],
        example: {
          title: "手算一个 ReLU neuron",
          prompt: "x=(2, −1)，w=(3, 4)，b=−1。",
          steps: [
            "点积 w·x = 3×2 + 4×(−1) = 6 − 4 = 2。",
            "加 bias：z = 2 + (−1) = 1。",
            "ReLU(z) = max(0, 1) = 1。",
            "若 target=3 且用 MSE=(y−target)²，则 loss = (1−3)² = 4。"
          ],
          result: "输出 1，loss 4；每个数都有清楚来源。"
        },
        practice: {
          q: "若同一 neuron 的 z = −2，ReLU 输出多少？",
          hint: "ReLU = max(0, z)。",
          a: "输出 0。负输入被截断；这也解释了 ReLU 负区间梯度为 0（dead unit）。"
        }
      },
      {
        plain: "Autoencoder 自己制造训练目标：输入 x，同时要求输出重建 x。Encoder 把输入压成 latent/embedding，decoder 从它还原回去；因此最终输出维度必须等于输入维度 D。把它想成把书压成摘要再展开回书页：摘要越短越能考验 compression。",
        steps: [
          "输入 x ∈ R^D 经过 encoder 得 z ∈ R^d。",
          "课程讲义的典型设计是 d<D，形成 bottleneck；这是今年卷答 1(d) 的主答案。d≥D 的 overcomplete 是需额外约束的例外。",
          "decoder 把 z 映为 x̂ ∈ R^D，与 x 同维才能逐维比较 loss。",
          "课程主损失是 MSE：L=(1/N)Σ||x−x̂||²；可加 λ||z||₁ 鼓励稀疏。BCE 只在合适的伯努利/归一化输出假设下补充；KL 不是普通 autoencoder 的必需项。",
          "训练后丢掉 decoder，encoder 可用于特征提取、聚类、可视化或异常检测。"
        ],
        example: {
          title: "4 维输入的压缩 autoencoder",
          prompt: "结构 4→2→4。",
          steps: [
            "输入是 4 个数，所以 D=4。",
            "encoder 输出 2 个数，所以 embedding dimension d=2。",
            "decoder 输出必须为 4 个数才能逐维与输入比较。",
            "MSE = (1/4)Σᵢ(xᵢ − x̂ᵢ)²。"
          ],
          result: "embedding 是 2 维；最终 reconstruction 是 4 维；不要混淆两者。"
        },
        practice: {
          q: "今年卷问 embedding 相对 D 的维度，最稳的作答顺序？",
          hint: "先写讲义典型设计，再写例外。",
          a: "先写经典 bottleneck autoencoder 取 d<D 以激起学习压缩表示；再补充这不是数学强制，overcomplete 的 d≥D 需要 sparsity、denoising 等约束防止只学 identity。"
        }
      },
      {
        plain: "CNN 的 filter 在整张图上共享，所以参数数量只取决于 filter 大小、输入通道、输出通道，不取决于图片宽高。Pooling 改尺寸但没有 learnable weights。",
        steps: [
          "一个 3×3 filter 跨越多 Cin channels；有 3×3×Cin 个 weights。",
          "每个输出 channel 对应一个独立 filter，再加一个 bias。",
          "总参数 = (kh×kw×Cin + 1) × Cout；H×W×Cout 是 activation 数，不是 learnable 参数。",
          "same padding + stride 1 保持 H/W；2×2 stride 2 pooling 将 H/W 各减半，C 不变。",
          "FC 层每个输出连接所有 n_in 输入：参数 = (n_in + 1) × n_out。"
        ],
        example: {
          title: "VGG 第一层完整计算",
          prompt: "224×224×3，64 个 3×3 filters。",
          steps: [
            "每个 filter 权重数 = 3×3×3 = 27。",
            "每个 filter 加 1 bias，共 28 parameters。",
            "64 filters 共 28×64 = 1,792。",
            "same/stride1 后 output shape = 224×224×64。",
            "随后 2×2/stride2 pool 得 112×112×64。"
          ],
          result: "1,792 parameters；卷积输出 224×224×64；池化输出 112×112×64。"
        },
        practice: {
          q: "为什么不把 224×224 乘进参数数目？",
          hint: "同一 filter 在不同位置是否被重复使用？",
          a: "卷积共享同一组 filter weights；不同位置产生不同 activation，但不是独立参数。"
        }
      },
      {
        plain: "Transformer 是 CS636 扩展，不是今年卷直接重点。理解核心：每个 token 用 query 去和所有 key 比相似度，再用这个相似度当权重去混合 value。attention 就是在做“按相关性加权混合”。",
        steps: [
          "线性投影得到 Q、K、V 三个矩阵。",
          "scores = QK^T / √dk；softmax 让每行权重和为 1。",
          "weights × V 得当前层输出。",
          "multi-head 在多个子空间重复，再 concat。",
          "无 recurrence，所以用 positional encoding 注入顺序；residual + normalization 改善深层训练。"
        ],
        example: {
          title: "Attention 的一句话读法",
          prompt: "某 token 对另一个 token 权重很高意味着什么？",
          steps: [
            "当前 token 的 query 与对方 key 点积很大。",
            "softmax 后对方占更大比例。",
            "输出会混入更多对方 value。",
            "这表示模型当前层认为对方信息对当前 token 更相关。"
          ],
          result: "attention weight 是上下文相关的信息混合权重，不自动等于人类可解释的因果重要性。"
        },
        practice: {
          q: "为什么要除以 √dk？",
          hint: "维度变大时点积方差怎样改变？",
          a: "点积幅度随 dk 增大，softmax 会过度饱和、梯度变小；缩放让数值稳定。"
        }
      },
      {
        plain: "模型选择必须防止 data leakage。Training data 更新 weights；validation data 比较 learning rate、层数等设置；test data 直到所有选择冻结后才用一次。要是你反复看 test 再调模型，test 已参与选择，它不再是独立最终评估。",
        steps: [
          "先划分 train/validation/test；预处理统计量（均值、方差）只在 train 拟合。",
          "每组 hyperparameters 在 train 训练；weight/bias 用 backprop+SGD/Adam 优化。",
          "在 validation metric 上选 learning rate、batch size、层数、regularisation 等，可 early stopping。",
          "课程讲义称 test 用于 benchmark 已优化模型；严谨实践是在结构、设置和选择规则冻结后才看独立 test。",
          "若据 test 结果继续换模型或改设置，test 已参与选择；必须另留 final hold-out 才能报告无偏最终性能。"
        ],
        example: {
          title: "选择 learning rate",
          prompt: "候选 0.1、0.01、0.001。",
          steps: [
            "分别只用 training set 训练三个模型。",
            "在同一 validation set 比较目标 metric。",
            "选 validation 最好的 0.01 并冻结选择规则，再用 test benchmark。",
            "若看 test 后改成 0.001，原 test 已参与选择，需另留 final hold-out。"
          ],
          result: "train 学参数，validation 选超参数；test benchmark 冻结方案。用 test 做了选择就另留 hold-out。"
        },
        practice: {
          q: "反复查看 test accuracy 再改模型，有什么问题？",
          hint: "test 是否还代表未见数据？",
          a: "造成 test leakage 和乐观偏差；模型选择已针对 test 调整，它不再是独立最终评估。"
        }
      },
      {
        plain: "Invertible layer 对每个输出都能唯一找回输入。Normalizing Flow 用一串可逆层把简单分布变成复杂数据分布；只有映射可逆、可微且 Jacobian determinant 可高效计算时，才可用 change of variables 高效求 exact likelihood。今年卷只直接问“可逆层”及其使用场景。",
        steps: [
          "可逆要求 f 是一一对应，并存在 f⁻¹。",
          "flow 中通常输入输出维度相同；压缩 4→2 丢信息，一般不可逆。",
          "Flow 从简单 z 分布经可逆 f 得 x；反向把 x 映回 z。",
          "在可逆、可微、Jacobian tractable 条件下，change-of-variables 用 |det J| 修正体积变化，得 exact likelihood。",
          "VAE/GAN/diffusion 是扩展对照；不能说任意可逆网络都能高效求 exact likelihood，也不要说这些模型都用可逆层。"
        ],
        example: {
          title: "线性层何时可逆",
          prompt: "y = Wx + b。",
          steps: [
            "平移 b 可由 y − b 消去。",
            "关键是 W 是否方阵且 det(W) ≠ 0。",
            "若可逆，x = W⁻¹(y − b)。",
            "若 W 把高维压到低维，多个 x 会映到同一 y，无法唯一恢复。"
          ],
          result: "可逆线性层需非奇异方阵 W。"
        },
        practice: {
          q: "普通 bottleneck autoencoder 的 encoder 通常可逆吗？",
          hint: "D 维压到 d<D。",
          a: "通常不可逆。降维必丢信息；decoder 学近似重建，不是严格数学逆函数。"
        }
      },
      {
        plain: "伦理答案不能只写 bias/privacy 两个词。必须写清谁受影响、伤害如何产生、怎样测量、怎样缓解。XAI/GNN 是 CS636 扩展；今年卷直接考两个现实伦理例子。",
        steps: [
          "选具体场景和 stakeholder。",
          "说明数据、目标函数或部署方式怎样产生风险。",
          "描述可观察伤害与受影响群体。",
          "提出 audit/metric 与技术或治理缓解。",
          "承认 trade-off：解释 ≠ 因果，去标识 ≠ 绝对隐私。"
        ],
        example: {
          title: "招聘模型的偏差",
          prompt: "历史招聘数据中某群体录取率低。",
          steps: [
            "模型把历史 decision 当 label 学习。",
            "历史结构性偏差进入预测。",
            "受影响候选人在同等能力下被系统性低估。",
            "按群体报告 TPR/FPR、做数据审计、人工申诉。",
            "重设 label/features、约束公平、持续监控。"
          ],
          result: "完整伦理答案含场景、机制、伤害、测量、缓解五部分。"
        },
        practice: {
          q: "“删除姓名就没有隐私风险”对吗？",
          hint: "其他特征能否重新识别个人？",
          a: "不对。位置、年龄、行为组合可能重新识别；模型也可能记忆训练样本。还需最小化数据、访问控制、隐私评估。"
        }
      }
    ],
    exam: [
      {
        question: "Q1 六个小问围绕 self-supervision 与 autoencoder，从训练信号一直问到 encoder 的下游用途。",
        parts: [
          {
            label:"1(a)",
            ask: "比较 supervised 与 self-supervised learning。",
            steps: [
              "先看共同点：两者都是机器学习方法，都要(a) 给模型喂输入、(b) 有一个目标 (target)、(c) 用 loss 函数衡量预测与目标的差距、(d) 通过梯度优化 (gradient descent/Adam) 更新 parameters。区别只在于“目标”从哪里来。",
              "Supervised learning 的 target 来自人工/外部 label。例：给一张图，人提前打标签“这是猫”；模型学的是输入→标签的映射。",
              "Self-supervised learning 的 target 由数据自身构造，不需要人打标签。例：① 把图片遮住一块，让模型预测被遮部分；② 把句子挖一个词，让模型预测那个词；③ 让 autoencoder 重建整张输入图。",
              "再看差异：supervised 学到的通常就是最终任务（如直接分类）；self-supervised 常先只学 general representation（怎么把数据编码成有用向量），再把这个 encoder 拿去做下游任务（分类、检测、检索等）。",
              "容易踩的坑：不要说 self-supervised“没有 target”——它有 target，只不过 target 是从数据自己生成的（如重建原图、预测遮盖部分），而不是人给的标签。它依然要用 loss + 梯度更新参数。"
            ],
            final: "Supervised = 人给标签；self-supervised = 从数据自己造目标。两者都仍有 target、loss、gradient optimization；差别只在 label 来源与学到的 representation 的用途。"
          },
          {
            label:"1(b)(c)",
            ask: "定义 autoencoder 并说明输出维度。",
            steps: [
              "encoder z=f(x)；decoder x̂=g(z)。",
              "训练目标是让 x̂ 接近 x。",
              "若 x ∈ R^D，重建需逐维与 x 比较，所以 x̂ ∈ R^D。",
              "latent z 的维度 d 是另一件事，通常 d<D。"
            ],
            final: "最终输出维度 D；embedding 维度 d 不要写成输出维度。"
          },
          {
            label:"1(d)(e)",
            ask: "解释 embedding 与 loss。",
            steps: [
              "embedding space 是 encoder 输出 z 所在空间；相近向量表示相似数据特征。",
              "先按讲义写典型 bottleneck d<D；再说明 overcomplete d≥D 是需约束的例外。",
              "课程主答案：quadratic/MSE reconstruction loss，L=(1/N)Σ||x−x̂||²。",
              "按讲义可加 λ||z||₁ sparsity；BCE 只在伯努利/合适归一化输出假设下补充，KL 不是普通 autoencoder 的必需项。"
            ],
            final: "先写 MSE 与 L1 sparsity；明确 reconstruction target 是输入本身，再条件性补充其他 loss。"
          },
          {
            label:"1(f)",
            ask: "训练后怎样用 encoder？",
            steps: [
              "丢弃 decoder，只算 z=encoder(x)。",
              "z 可作为低维 feature。",
              "用于 classification 前端、clustering、visualisation、retrieval、anomaly detection。",
              "下游可冻结或 fine-tune。"
            ],
            final: "至少给两个具体用途，并说明为什么 embedding 比原始高维输入更方便。"
          }
        ]
      },
      {
        question: "Q2 围绕 VGG-16 图，要求 CNN 定义、卷积/池化/FC 计算和 ReLU 公式。",
        parts: [
          {
            label:"2(a)",
            ask: "CNN 是什么，Convolutional 的含义是什么。",
            steps: [
              "CNN 全名 Convolutional Neural Network，中文“卷积神经网络”。先解释“Convolutional(卷积)”这一词：它借用了信号处理里“用一个滤波器扫信号”的概念。",
              "具体动作：拿一个很小的权重块（filter，比如 3×3）从图像左上角开始，固定步长 stride（VGG 用 1）一格一格往右、往下扫。每停一个位置，就把 filter 的 9 个权重和覆盖的 9 个像素做对应相乘再求和，输出一个数填到 feature map 对应位置。",
              "关键性质 1 — weight sharing（权重共享）：filter 滑过整张图，用的是同一组权重，不每个位置换新的。这意味着模型把“在图像任意位置都能识别某种局部模式”当成一个统一技能。",
              "关键性质 2 — local receptive field（局部感受野）：每个输出位置只看周围 3×3 这一小块，不看整张图；多层叠加后才逐步组合出更大范围的语义。",
              "带来两个好处：① 参数效率高——一个 3×3 filter 才 9 个 weight，扫遍 224×224 像素也只贡献 9 个参数，远少于全连接层；② 平移等变 (translation equivariance) ——猫在左上或右下，filter 在对应位置都能给出强响应。",
              "把这两点连到本题：VGG-16 全部用 3×3、stride 1、same padding 的 conv layer，正是因为上面这两条好处让深网络在合理参数下能学到空间结构。"
            ],
            final: "CNN = Convolutional Neural Network。展开 acronym 后解释两个关键概念：local receptive field（每输出只看小邻域）与 weight sharing（同一 filter 在所有位置共享）；两者共同带来参数效率和平移等变。"
          },
          {
            label:"2(b)",
            ask: "首卷积层参数数。",
            steps: [
              "公式：(filter_h × filter_w × C_in + 1 bias) × C_out。先算一个 filter 的权重数：3×3 = 9 个空间位置，每个位置覆盖 3 个输入 channel（R/G/B），所以 9×3 = 27 个 weights。",
              "每个 filter 加 1 个 bias：27 + 1 = 28 parameters per filter。",
              "共 64 个 filter（C_out = 64）：28 × 64 = ?。先算 28×60 = 1680；28×4 = 112；合 1680+112 = 1,792。",
              "注意 224×224×64 是 output activation 数（每个空间位置的输出是一个数字），不是参数。同一 filter 在所有 224×224 位置共享，所以参数与空间尺寸无关。",
              "验证思路：如果参数数取决于 H×W，那把 224 改成 448 参数就会翻倍，这意味着每个新像素都需要新的 weight——这与“filter 在图像上滑动共享”的定义矛盾。"
            ],
            final: "1,792 learnable parameters。关键区分：filter weights 被所有空间位置共享，参数数只取决于 filter 大小、C_in、C_out，不取决于 H×W。"
          },
          {
            label:"2(c)",
            ask: "max pool 输出 shape。",
            steps: [
              "输入 224×224×64。",
              "2×2 filter、stride 2，每方向取不重叠窗口。",
              "高 224/2 = 112，宽同样 112。",
              "pooling 对每 channel 独立，通道仍 64。"
            ],
            final: "112×112×64；pooling 无 learnable parameters。"
          },
          {
            label:"2(d)",
            ask: "首 FC 层参数数。",
            steps: [
              "公式：(n_in + 1) × n_out。先算 flatten 后的输入维度 n_in = 7×7×512。",
              "算 7×7 = 49；49×512 = ?。先 50×512 = 25600；减 1×512 = 512；25600−512 = 25,088。所以 n_in = 25,088。",
              "每输出 unit 有 25,088 个 weights + 1 个 bias = 25,089 个参数。",
              "共 4,096 个输出 unit（n_out = 4096）。",
              "算 25,089 × 4,096 = ?。先拆 4096 = 4000 + 96。25,089×4000 = 100,356,000；25,089×96 = 25,089×100 − 25,089×4 = 2,508,900 − 100,356 = 2,408,544。合 100,356,000 + 2,408,544 = 102,764,544。",
              "验证量级：约 1 亿参数，这对 VGG-16 的第一个 FC 层来说是合理的。"
            ],
            final: "102,764,544 learnable parameters。公式 (n_in + 1) × n_out；含 bias。"
          },
          {
            label:"2(e)",
            ask: "解释 ReLU。",
            steps: [
              "名字展开：ReLU = Rectified Linear Unit，中文“修正线性单元”。它是 VGG-16 每个卷积层和每个全连接层后面接的 activation function。",
              "数学公式：ReLU(x) = max(0, x)。这就是一个分段函数，把负的部分“整流”掉，所以叫 rectified。",
              "分两段读：① 当 x > 0 时输出 x（原样透传）；② 当 x ≤ 0 时输出 0（截断为常数 0）。",
              "举两个最小例子：ReLU(2) = max(0, 2) = 2；ReLU(−3) = max(0, −3) = 0。",
              "为什么需要它：如果在卷积后只有线性加权求和再加 bias，再接下一层卷积……无论堆多深，整网仍是输入的线性函数（多层线性=一层线性）。引入 ReLU 这种非线性让网络能拟合曲线、识别复杂模式。",
              "梯度（导数）也很简单：x>0 时 ReLU'(x)=1；x≤0 时 ReLU'(x)=0。这使正区间的 backprop 直接透传而不衰减，缓解深层网络的梯度消失问题。",
              "副作用：负区间梯度恒 0 可能导致“dead ReLU”——某些 unit 一旦被推到负区域就再也不更新，输出恒 0。常见缓解手段：合适的初始化、较小学习率、或用 Leaky ReLU / PReLU 等变体。",
              "VGG-16 选用 ReLU 是因为它的非线性够强、计算只需一次比较、梯度形式简单、训练稳定。"
            ],
            final: "公式 ReLU(x)=max(0,x)；分段含义：正透传，负截零；作用是引入非线性让深层网络有意义，并因梯度简单而训练稳定。要提一句 dead units 的副作用以显示完整理解。"
          }
        ]
      },
      {
        question: "Q3 要求两个伦理案例、可逆层及其网络场景，以及正确的数据集/算法分工优化参数和超参数。",
        parts: [
          {
            label:"3(a)",
            ask: "给两个现实伦理问题。",
            steps: [
              "例 1 人脸/情绪识别：有偏训练数据导致群体误识别差异，可能影响被监控者、公民权利或公平审判；按群体 audit 并限制高风险部署。",
              "例 2 抓取数据：未经同意收集的私人/可重识别或受版权保护内容进入训练集；做 consent/licence/data audit、最小化数据并提供治理与申诉。",
              "也可用训练/推理耗电、耗水和 carbon footprint 作完整案例，但都要写受影响者、可测伤害与缓解。",
              "每例写场景—机制—受影响者—伤害—测量—缓解，不只列名词。"
            ],
            final: "两例各写完整因果链；本地 Ethics 讲义直接支持偏差、隐私、版权和环境影响。"
          },
          {
            label:"3(b)(c)",
            ask: "解释 invertible layer 及使用它的网络。",
            steps: [
              "定义：对每个 y=f(x)，存在唯一 x=f⁻¹(y)。",
              "flow 中通常维度保持；用于 density 的映射还需可微且 Jacobian determinant 可处理。",
              "Normalizing Flow 由可逆层 composition 构成。",
              "满足这些条件时可双向 sampling/inference 并通过 change-of-variables 计算 exact likelihood。"
            ],
            final: "点名 normalizing flows 及条件；不要声称任意可逆网络都能高效 exact likelihood，也不要称普通 ReLU、pooling 或 bottleneck encoder 可逆。"
          },
          {
            label:"3(d)",
            ask: "怎样找最佳 parameters 与 hyperparameters。",
            steps: [
              "training set 用 backprop+SGD/Adam 学 weights/biases。",
              "validation set 比较 architecture、learning rate、batch size、regularisation，并用于 early stopping。",
              "搜索可用 grid、random、Bayesian optimization；考场核心是 validation + search，数据少可 cross-validation。",
              "按课程讲义，test set 用于 benchmark 已优化且冻结的模型；严谨 final evaluation 也遵循该冻结原则。",
              "若看 test 后继续换模型或改设置，test 已参与选择，必须另留独立 final hold-out；预处理统计量只从 train 拟合。"
            ],
            final: "parameters—train—gradient optimizer；hyperparameters—validation—search；test—冻结后 benchmark；test 若参与选择则另留 hold-out。"
          }
        ]
      }
    ]
  }
};