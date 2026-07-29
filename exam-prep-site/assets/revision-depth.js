// 整个网站的"白话教学"。目标：只用本站就能从零基础学完五门课并做完今年真题。
// 写作准则（参考 exam-prep-site/gemini.txt）：
//   1) 每一段都先用日常类比把概念说清，再给正式名字；
//   2) 页面上出现过的每个名词都要在网络内某处被解释过；
//   3) 每一步推导都写"中间值"和"这一步在做什么"；
//   4) 例题按"题面→一步步算→得到结论"展开，不留跳跃。
window.REVISION_DEPTH = {
  cs603: {
    start: {
      title: "逻辑、规格和验证工具",
      intro: "CS603 先用精确的逻辑公式写程序要求。然后，它使用证明规则或验证工具检查程序是否满足这些要求。Hoare Logic 和 Dafny 验证代码。Event-B 验证系统模型。Model Checking 和 LTL 验证状态与时间性质。",
      blocks: [
        {t:"程序状态和规格",p:"程序状态是某一时刻所有相关变量的值。前置条件限制初始状态。后置条件限制结束状态。不变量限制循环或对象的中间状态。"},
        {t:"可检查的要求",p:"“数组已经复制好”不是精确要求。应写出长度相等，并要求每个合法下标的元素都相等。验证器只能检查精确条件。"},
        {t:"循环证明",p:"先证明循环开始前不变量成立。再证明循环体保持不变量。最后用不变量和退出条件推出后置条件。"}
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
        ["Variant / 循环变体（减量）","一个整数表达式。循环条件为真时，它必须非负。循环体每次执行后，它必须严格减小。这两个条件证明循环终止。"],
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
        ["De Morgan's Laws / 德摩根定律","否定合取时，把 AND 改成 OR，并否定每个项。否定析取时，把 OR 改成 AND，并否定每个项。"],
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
        plain: "逻辑公式用固定符号表示精确条件。∀ 表示所有对象。∃ 表示至少一个对象。∧ 表示两个条件都成立。∨ 表示至少一个条件成立。¬ 表示否定。→ 表示前件成立时后件也必须成立。",
        steps: [
          "看到一个谓词 A(x)，把它想成一句带空格的话，比如“x 是员工”。空格填上具体 x 之后，这句话要么真要么假；未填之前它本身没有真假。",
          "合取 p∧q 只在 p 和 q 都为真时为真。析取 p∨q 在至少一个项为真时为真。",
          "蕴含 p→q 只在 p 为真且 q 为假时为假。蕴含不表示时间顺序。它表示 p 成立时 q 也必须成立。",
          "德摩根定律为 ¬(p∧q)=¬p∨¬q 和 ¬(p∨q)=¬p∧¬q。否定进入括号后，连接词必须改变。",
          "量词 ∀x 表示“对范围内每一个 x”；∃x 表示“至少找一个 x”。先说出 x 从哪一个论域挑选，再看点号和括号：∃x.(...) 的 (...) 都是 x 的作用域，里面每个 x 都已被这个 ∃ 绑定。",
          "真值表必须列齐 (p,q) 的四种组合 (T,T),(T,F),(F,T),(F,F)，然后逐列算。不要跳到“它显然永真”：阅卷人要看见中间列；两列最终结果四行全相同，才说明两式逻辑等价。",
          "复杂公式从最内层括号向外读。每一步先把谓词写回自然语言，再做 and/or，最后再量词。"
        ],
        example: {
          title: "2026 两条 ∃ 公式为什么完全不同（题 1a 的核心）",
          prompt: "比较 ∃x.(A(x) ∧ ¬(G(x) ∨ Y(x))) 与 ∃x.(A(x) → ¬(G(x) ∨ Y(x)))。",
          steps: [
            "按题面的点号作用域，把整个 body 加括号。这里的点相当于“从这里一直管到括号结束”：第一式是 ∃x.(A(x) ∧ ¬(G(x)∨Y(x)))；第二式是 ∃x.(A(x)→¬(G(x)∨Y(x)))。所以两式里的 x 都被 ∃ 绑定，不能凭感觉把第二式右边的 x 叫作自由变量。",
            "第一式要求同一对象同时是 A 并且不 G/Y。这“同时”两个字是关键。",
            "第二式是蕴含。如果你取的 x 根本不是 A，前件就假，整条蕴含自动为真。所以第二式很容易靠“取一个无关对象”成立。",
            "构造一个反例来感受差距：假设论域 {u, v}。A(u) 真、G(u) 真、A(v) 假、Y 都假。",
            "第一式在 u 处不成立（因为 G(u) 真）；v 也不是 A，所以也不成立；整体为假。",
            "第二式取 v：A(v) 假，前件假，蕴含自动真，所以整式为真。",
            "两式的真值不同。必须按题面的作用域解释 x。不要在没有语法依据时把 x 声明为自由变量。"
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
        plain: "Hoare Logic 用 {P} C {Q} 描述程序。P 是执行 C 前的条件。Q 是 C 结束后的条件。顺序规则为两条语句建立中间条件。循环规则使用不变量连接任意多次循环迭代。",
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
        plain: "Dafny 把规格写在代码旁。requires 声明调用前条件。ensures 声明方法返回后的条件。invariant 声明每次循环检查点都成立的条件。decreases 声明一个严格减小的终止度量。",
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
        plain: "Event-B 在编码前建立系统模型。context 声明集合、常量和公理。machine 声明变量和不变量。event 使用 guard 和 action 改变状态。Rodin 根据模型生成 Proof Obligation。Event-B 是形式建模和证明方法，不是 BDD 测试方法。",
        steps: [
          "在 context 里放不会被事件改变的东西：常量、类型集合、公理。",
          "在 machine 里声明变量，并写 invariant（每个可达状态都要满足的规则）。",
          "每个 event 写两个东西：guard 决定“什么时候能发生”；action/before-after predicate 决定“发生之后状态变成什么”。before-after predicate 可以读成“旧状态的 count 和新状态的 count' 必须满足 count'=count+1”——撇号表示动作之后的值，不是另一个变量。",
          "工具自动生成的 Proof Obligation 至少要会讲两类：① INITIALISATION 后 invariant 为真；② 若 invariant 和 guard 在动作前为真，action 后 invariant 仍真。还可提 well-definedness（表达式无越界/无未定义）和 feasibility（动作确实能产生允许的新状态）。",
          "FRET 是工具链的“自然语言入口”：用受限模板写 component/scope/condition/response/timing，生成可追踪的形式性质；FRET 可输出 CoCoSpec assume-guarantee contract，挂到 Simulink 组件后由 Kind2 模型检查，或输出 Copilot runtime monitor 监控实际 trace。",
          "Refinement 是在抽象模型上加细节：证明加细节之后的每一步都模拟抽象模型对应那一步。它不是“重新写”，而是“加层证明一致”。"
        ],
        example: {
          title: "一个容量为 10 的房间计数器",
          prompt: "变量 count 记录人数，进入和离开都不能让人数越界。",
          steps: [
            "context 给常量 CAP，并写公理 CAP=10。它不随 Enter/Exit 改变，所以放在 context，不放在变量里。",
            "machine 变量 count；invariant 写 0≤count∧count≤CAP（这就是所有可达状态都要满足的规则）。INITIALISATION 取 count:=0。",
            "Enter event：guard count<CAP；action count:=count+1。",
            "Exit event：guard count>0；action count:=count-1。",
            "第一项 PO（初始化）：count:=0 后，要证 0≤0≤10。第二项 PO（Enter 保持）：假设 0≤count≤10 且 count<10，动作后是 count'=count+1，于是 0≤count'≤10。Exit 同理：count>0 使 count'=count-1 仍在 0..10。这些才是“事件不会弄坏规则”的逐步证明。"
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
        plain: "Model Checking 检查模型中的所有可达状态。LTL 描述一条执行路径上的时间性质。G 表示 always。F 表示 eventually。X 表示 next。U 表示 until。红灯要求需要两个条件：车辆必须在越线前停止，且必须保持停止直到绿灯。",
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
          result: "使用两条性质。第一条要求车辆在越线前停止。第二条要求车辆保持停止，直到绿灯出现。还要声明环境是否保证绿灯最终出现。"
        },
        practice: {
          q: "F(response) 为什么不能表达“每个 request 最终都有 response”？",
          hint: "它要求几次 response？有把 request 和 response 配对吗？",
          a: "F(response) 只要求整条路径未来至少出现一次 response；一次响应可能根本不在任何请求之后。必须写 G(req→F resp) 才配对。"
        }
      },
      {
        plain: "AI 可以生成候选规格、不变量和测试。候选内容不是证明。SAT、SMT 和 Z3 检查约束是否有满足解。验证流程必须用独立的求解器检查 AI 输出。",
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
            ask: "用真值表证明 p∨¬p ≡ ((p∧q)→p)。",
            steps: [
              "画同一张六列真值表：p、q、¬p、p∨¬p、p∧q、(p∧q)→p。两式共享变量 p，右式还使用 q，所以必须列齐 p,q 的四种赋值。",
              "第 1 行 p=T,q=T：¬p=F，所以 p∨¬p=T。p∧q=T，所以 T→T=T。",
              "第 2 行 p=T,q=F：¬p=F，所以 p∨¬p=T。p∧q=F，所以 F→T=T。",
              "第 3 行 p=F,q=T：¬p=T，所以 p∨¬p=T。p∧q=F，所以 F→F=T。",
              "第 4 行 p=F,q=F：¬p=T，所以 p∨¬p=T。p∧q=F，所以 F→F=T。",
              "比较最后两列。p∨¬p 为 T,T,T,T；(p∧q)→p 也为 T,T,T,T。因此两式在每个 p,q 赋值下相同。"
            ],
            final: "同一张 p,q 四行表的两个最终列均为 T,T,T,T，因此 p∨¬p ≡ ((p∧q)→p)。"
          },
          {
            label:"(c)",
            ask: "解释 Behaviour Driven Formal Model Development、Model Checking、Deductive Verification。",
            steps: [
              "Behaviour Driven Formal Model Development：本课这里指 Event-B + Rodin 的系统级行为建模，不是一般的 BDD 测试。状态写成变量和 invariant，一次行为写成带 guard/action 的 event；Rodin 生成“初始状态是否安全、event 会不会破坏安全规则”的 proof obligations。例：房间人数 count 的 Enter 只有 count<CAP 时才发生。",
              "Model Checking：构造有限状态模型并系统探索所有可达状态/路径。例：把交通灯控制器写成 Promela，向 Spin 提交“红灯不能放行”；若不成立，Spin 给从初态到违例的一整条 counterexample path。",
              "Deductive Verification：从代码与 formal contract 生成 verification conditions 并用逻辑证明。例：Dafny 见到 ReverseArray 的 ensures 与 loop invariant，会检查初始化、每轮交换后不变量、退出时镜像结果；Z3 参与证明这些条件。",
              "每项都按四格写：输入/模型是什么、要保证的性质、工具怎样检查、最小例子。这样不会只留下抽象名词。"
            ],
            final: "每项按“定义—验证的性质—工具/例子”写一段，不要把第一项误写成普通 BDD 测试。"
          },
          {
            label:"(d)(e)",
            ask: "验证复制循环并扩展到总正确性。",
            steps: [
              "先逐句翻译题给 contract：a!=null 让读取 a.Length 安全；b.Length==a.Length 表示没有多格少格；∀k 的 ensures 表示每一个合法下标都复制同一值。令 n=a.Length 只为少写字，后置条件记作 Q≜b.Length==n ∧ ∀k(0≤k<n→b[k]==a[k])。",
              "找出循环 invariant I ≜ 0≤i≤n ∧ b.Length==n ∧ ∀k(0≤k<i → b[k]==a[k])。直观是：“下标 i 还在合法范围、新数组长度正确、已复制区 0..i-1 都对”。",
              "① 初始化（Allocation + Assignment）：先 b:=new int[n]。分配规则给 b.Length=n；数组值暂时不重要，因为 invariant 只承诺“已经复制的前缀”。再 i:=0。按赋值规则，把 I 中赋值后的 i 替成右边 0：0≤0≤n ∧ b.Length=n ∧ ∀k(0≤k<0→...)。没有 k 落在 0≤k<0，最后一项自动真；n=a.Length≥0，故 I 初始成立。",
              "② 保持性（Array assignment + Sequence + Assignment）。假设进入某轮时 I 成立且 guard i<n 成立，则 0≤i<n。",
              "步骤 1（Array assignment）：执行 b[i]:=a[i]。guard 给 i<n，所以访问合法；旧 0..i-1 未变，位置 i 现在也等于 a[i]，合并后得 ∀k(0≤k<i+1→b[k]==a[k])。把它记为中间断言 R。",
              "步骤 2（Assignment）：接着 i:=i+1。要证明赋值后 I，按赋值规则倒推，要在赋值前证明 I[i+1/i]：0≤i+1≤n ∧ b.Length=n ∧ ∀k(0≤k<i+1→b[k]==a[k])。这正是 R 加上 i<n 给出的边界。故 {R} i:=i+1 {I}；再用 Sequence Rule 连接两个步骤，得 {I∧i<n} body {I}。",
              "③ 退出（While + Consequence）。退出条件 I ∧ ¬(i<n)，即 0≤i≤n ∧ i≥n，得 i=n。代回 I 的前缀条件 ∀k(0≤k<n → b[k]==a[k])，与 postcondition 一致。",
              "(e) 总正确性在 partial 之上加终止证明。",
              "  选 Variant V ≡ n−i。它是整数而不是布尔值；guard 为真时 i<n，所以 V≥1，特别地非负。",
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
              "先决定“年龄从哪里来”。不要一边用 age 做 Valid、另一边又用 birthYear/currentYear 计算返回值却不把两者联系起来。这里保存 birthYear 和 currentYear，年龄就是 currentYear-birthYear。",
              "可按课程 slides 的 Dafny 风格写字段：class Employee { var birthYear:int; var currentYear:int; ... }。对象的状态就是这两个字段当前的值。",
              "把合法状态写成：predicate Valid() reads this { 0<=birthYear && birthYear<=currentYear && 15<currentYear-birthYear && currentYear-birthYear<65 }。reads this 的意思是这个谓词只查看当前对象；15 和 65 是严格不等号，因为题面是 older than 15、younger than 65。",
              "构造器可逐行写为：constructor(b:int,y:int) requires 0<=b && b<=y requires 15<y-b && y-b<65 ensures Valid() ensures birthYear==b && currentYear==y { birthYear,currentYear := b,y; }。前两条 requires 是调用者交来的合法资料；赋值后 Valid 的每一部分都能从 requires 得到，所以 constructor 的 ensures 可被验证器证明。",
              "年龄方法可写为：method CalculateAge() returns(age:int) requires Valid() ensures age==currentYear-birthYear ensures Valid() { age:=currentYear-birthYear; }。它没有改字段，因此进来时 Valid 为真，出去仍为真；ensures 精确说明返回的那个整数是什么。",
              "若另加会改年份的方法，必须显式写 modifies this，并在 requires 中限制新年份仍让年龄在 16..64；否则把 currentYear 改得太大就会破坏 Valid。",
              "继承部分不要只写“子类继承父类”。若 Person 有 PersonValid()，Employee 的有效性逻辑应是 PersonValid() ∧ EmployeeAgeValid()；constructor 要建立两者，任意 Employee 方法入口要求两者、出口恢复两者。课程版本的 extends/trait 写法可能不同，但这个 proof obligation 不变。"
            ],
            final: "卷面至少交付字段、把年龄算式写进 Valid、可读的 constructor、CalculateAge body/contract，以及“父类 Valid ∧ 子类 Valid 都需保持”的继承说明；这才同时回答 specify 和 implement。"
          },
          {
            label:"(b)",
            ask: "为 ReverseArray 写 contract、invariants 与 variant。",
            steps: [
              "先写框架：method ReverseArray(a:array<int>) requires a!=null modifies a ensures a.Length==old(a.Length) ensures forall k :: 0<=k<a.Length ==> a[k]==old(a[a.Length-1-k])。第一个 ensures 保留长度；第二个才是“位置 k 取旧镜像位置”的反转定义。",
              "令 n=a.Length，起点 i=0,j=n-1。边界/对称 invariant：0≤i≤j+1≤n ∧ i+j=n-1。它保证指针没有越界，也把两端位置配成镜像。",
              "左处理区 invariant：∀k(0≤k<i → a[k]=old(a[n-1-k]))。它说左边已经离开循环的格子，都拿到了旧数组右侧的镜像值。",
              "右处理区 invariant：∀k(j<k<n → a[k]=old(a[n-1-k]))。它说右边已经离开循环的格子，都拿到了旧数组左侧的镜像值。两个量词都要写，不能用一句“两端处理好了”代替。",
              "中间未处理区 invariant：∀k(i≤k≤j → a[k]=old(a[k]))。它记录尚未交换的位置没有被误写；长度为奇数时退出会有 i=j 的中央格，这一条正好解释中央格为什么仍满足镜像要求。",
              "初始化时 i=0,j=n-1：左右处理区都是空范围，量词自动真；整个数组都在中区，所以 a[k]=old(a[k]) 真。一次 swap 只改 i,j：temp 保存旧 a[i]，a[i] 得旧 a[j]，a[j] 得旧 a[i]，再 i:=i+1,j:=j-1，刚交换的两格分别进入左右处理区，其余三块不变，因此所有 invariant 保持。",
              "退出时 ¬(i<j) 给 i≥j；加上 i≤j+1，只可能 i=j（奇数长度）或 i=j+1（偶数长度）。左右处理区已覆盖所有非中央位置；若有中央位置，中区 invariant 给 a[i]=old(a[i])，而 n-1-i=i，所以也等于自己的镜像。于是 postcondition 对每个 k 成立。",
              "终止度量取 decreases j-i。guard i<j 时 j-i≥1；一轮后 (j-1)-(i+1)=j-i-2，严格下降。它是 guard 为真时的非负整数，所以循环不会无限跑。"
            ],
            final: "把 contract、边界/对称、左右已反转、中间未改四组 invariant 和 decreases j-i 都写出来，并分别说明初始化、交换保持、退出覆盖奇偶长度。"
          },
          {
            label:"(c)",
            ask: "为 AllEven 写 decreases、sequence 解释和 contract。",
            steps: [
              "先写完整头部：method AllEven(s:seq<int>) returns(res:bool) decreases |s| ensures res == (forall i :: 0<=i<|s| ==> s[i]%2==0)。这句的 == 是“当且仅当”：res 真时全部偶数，全部偶数时 res 也必须真。",
              "decreases |s| 的 |s| 是序列长度。空序列长度 0；非空时递归参数 s[1..] 删除第一个元素，长度恰为 |s|-1，因此每次调用离 0 更近。",
              "sequence 是不可变值：s[1..] 不会改掉原来的 s，而是得到一个表示后缀的新值。于是“原序列第 0 个元素”和“剩余序列所有元素”能安全分开推理。",
              "空序列时 forall i :: 0<=i<0 ==> ... 为真，因为根本没有合法 i 可以当反例；所以 res:=true 正好匹配 contract。",
              "非空时 body 是 (s[0]%2==0) && AllEven(s[1..])：第一个部分检查头，递归部分按归纳假设检查尾；头和尾都偶当且仅当整个序列每个位置都偶。"
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
              "先分静态和动态：context 放集合、常量、公理；例如 CAP=10 是世界设定，不应被事件改。machine 放会随时间变的变量和事件。",
              "variables 描述当前状态；invariant 描述每个可达状态必须永远满足的安全规则；例如 0≤count∧count≤CAP。它不是“希望如此”的注释，而是之后每个证明都要保持的条件。",
              "event 是一次状态变化。guard 是允许发生的门槛；action 是更新。Enter 可写 guard count<CAP，action count:=count+1。",
              "before-after predicate 用一个撇号表示动作后的值：count'=count+1。它把“加一”从程序写法改成旧状态/新状态的逻辑关系，便于证明。",
              "第一项具体 PO：INITIALISATION count:=0 后，证明 0≤0∧0≤CAP。第二项具体 PO：假设 invariant 和 count<CAP，Enter 后 count'=count+1，证明 0≤count'∧count'≤CAP。Exit 也可同样列一项。",
              "补充两类可得分 PO：well-definedness 问“公式有没有未定义，如除零或类型错误”；feasibility 问“guard 成立时 action 是否至少存在一个合法新状态”。它们和 invariant preservation 不是一回事。"
            ],
            final: "按 context、machine、variables/invariant、event、before-after predicate 逐个定义，再给出带前提和结论的 INITIALISATION 与 event-preservation 两项 PO。"
          },
          {
            label:"(b)(d)",
            ask: "AI verification 的机会/挑战及两种训练方法。",
            steps: [
              "机会 1：AI 可从代码或测试生成候选规格/循环不变量。例如它建议复制循环的前缀 invariant；这能减少人从空白开始写的时间。机会 2：AI 可帮助搜索反例、解释日志或排序证明策略。",
              "挑战 1：hallucination——候选公式看起来专业却可能不归纳，或干脆漏掉越界情形。挑战 2：训练分布外、不可解释、验证规模成本；模型在已见样本上好不等于对所有输入好。",
              "adversarial training：先有输入，再构造会诱使网络出错的微小攻击样本，把它们加入训练，使模型对这类扰动更稳。property-driven training：把“违反规定性质”的代价写进 loss/约束，使训练目标直接偏向满足该性质。",
              "共同点是都在训练阶段改变经验行为；差别是前者围绕攻击样本，后者围绕显式逻辑性质/约束。最后必须写结论：两者都不自动穷尽所有允许输入，因此不等于正式 verification；仍要用 sound verifier 复核。"
            ],
            final: "严格写两项机会、两项挑战、相同点、不同点和“不足以保证”。"
          },
          {
            label:"(c)",
            ask: "解释 FRET 的支持链。",
            steps: [
              "第一步是记录而非直接写符号：FRETish 受限模板把一句自然语言拆成 component、scope、condition、response、timing 等栏位，减少“最终”“期间”这类词的歧义。",
              "最小例子：写“当红灯被检测到时，控制器应在绿灯前保持 stopped”。先明确 component=controller、condition=red、response=stopped、timing=until green；这使每个词可追踪回原需求。",
              "第二步是 formalisation：FRET 从结构化输入生成可读的形式性质/时序表示，而不是让人手写后祈祷没有括号错误。人仍需核对生成结果是否表达原意。",
              "第三步是 verification：可把性质形成 CoCoSpec assume-guarantee contracts，绑定 Simulink 组件，由 Kind2 模型检查；若模型违反性质，反例 trace 会指出哪一时刻、哪一个假设/保证失败。也可生成 Copilot monitor 检查实际运行 trace。",
              "因此 FRET 的价值链是“记录与追踪 → 消歧并形式化 → 模型检查或运行时监控 → 反例/监控证据”，不是只把英文换成一个公式。"
            ],
            final: "答案形成“FRETish 字段化记录 → 形式性质/CoCoSpec → Kind2 反例或 Copilot monitor 证据”的连续链，并给一个真实需求例子。"
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
              "软件合约约束一个方法或一个类的局部状态。例 withdraw：requires amount≤balance；ensures balance==old(balance)-amount。它问的是“这个调用前后，字段有没有按承诺变化”。",
              "系统合约跨组件并常有时间/通信关系。例 controller 假设 sensor 每秒给合法读数（assumption），保证检测到危险后最终命令 brake（guarantee）。它问的是“组件连起来后，交互序列是否遵守承诺”。",
              "选择 FRET 作为一个工具并完整讲完：先用 FRETish 的 component/scope/condition/response/timing 记录 requirement；FRET 生成可追踪的形式性质和 CoCoSpec assume-guarantee contract。",
              "把 contract 接到 Simulink 组件模型，Kind2 穷举模型的可达行为检查 guarantee 是否在 assumption 下成立。若失败，它给 counterexample trace；人可回到 FRET requirement 修正文字、假设或模型。若部署期需要观察实际执行，可由 FRET 生成 Copilot monitor，但它检查的是实际 trace，不是替代模型检查。"
            ],
            final: "先给一个局部方法合约和一个跨组件、带时序的系统合约；再把 FRET→CoCoSpec→Simulink→Kind2→counterexample 的工具链讲完整。"
          },
          {
            label:"(b)",
            ask: "比较 Model Checking 与 Runtime Verification。",
            steps: [
              "Model Checking 的输入是一个有限状态模型和性质；它系统探索模型所有可达状态/路径。例如 Spin 检查交通灯模型是否存在“红灯却放行”的路径。",
              "若性质失败，model checker 返回 counterexample：一串具体状态/动作，说明从哪里开始、怎样走到违规。若成功，结论只覆盖“这个模型 + 明写的环境假设”，不自动覆盖遗漏的传感器故障或真实代码差异。",
              "Runtime Verification 的输入是同一类性质加一个 monitor；monitor 随部署中的实际 trace 一步步观察。例如日志出现 red 后尚未 green 却由 stopped 变 false，就立即报警。",
              "它的优势是能看真实运行；限制是只看已经发生的路径。十次运行都没有警报，不等于没有一条未运行路径会违规。"
            ],
            final: "一项是模型全空间，一项是实际轨迹；各配一个例子。"
          },
          {
            label:"(c)",
            ask: "写四条汽车性质的 LTL。",
            steps: [
              "第一行先给符号字典：destinationReached=已到目的地；progress=本步仍向目的地前进；resolved=紧急原因已解决；beforeIntersection=仍在停止线前；passedIntersection=已越线；safe=安全模式已启用。并声明状态按离散时刻观察，green/recovered 是否保证最终发生由环境决定。",
              "i：G(¬destinationReached → (progress U destinationReached))。G 是每一个时刻；只要还没到，就要求 progress 一直为真，且强 U 要求 destinationReached 最终真的发生。若系统允许中途停下来等待，这个题设的 progress 定义要相应细化。",
              "ii：G(emergency → ((emergency U resolved) ∧ F¬emergency))。前半的 U 保证 resolved 前不能退出 emergency；F¬emergency 另外保证总有一个未来时刻真正离开。只写 F¬emergency 会允许先退出、以后才 resolved。",
              "iii：写两条而不是一个松散 F：G((red∧¬green∧beforeIntersection) → (¬passedIntersection U (stopped∧beforeIntersection))) 使车在越线前停住；G((red∧stopped∧¬green) → (stopped W green)) 使停住后保持到绿灯。W 允许绿灯永不来仍一直停；若环境保证 green 最终到来，W 可加强为 U。",
              "iv：先是 G(monitorSensors)。故障链可写 G(sensorFail → (¬recovered U (safe∧¬recovered∧X(safe W recovered))))。U 强制本次 recovery 前先进入 safe；Q 中的 ¬recovered 排除“同一时刻已恢复才进入 safe”；X 从下一步开始要求持续 safe 直到 recovery。若环境保证 recovered 最终发生，把内部 W 改 U。"
            ],
            final: "公式后逐符号解释 G/F/U/W/X，并写清命题语义和绿灯/恢复的环境假设。单写 F(以后某次 stop/safe) 太弱，会允许先越线或先恢复。"
          }
        ]
      }
    ]
  },
  cs605: {
    start: {
      title: "语言、计算模型和问题归约",
      intro: "CS605 把一个计算问题表示为一组字符串。这组字符串称为语言。语言中的字符串是 yes-instance。自动机或图灵机检查输入是否属于语言。课程研究机器能力、停机性质和问题归约。",
      blocks: [
        {t:"输入编码",p:"明确输入是字符串、自动机编码、图还是程序源码。例如，⟨M⟩ 表示自动机 M 的字符串编码。"},
        {t:"Yes-instance 的证据",p:"说明机器怎样确认输入属于语言。NP 证明还要给出 polynomial-size certificate 和 polynomial-time verifier。"},
        {t:"证明方法",p:"非正则证明使用 pumping lemma。不可判定证明使用 reduction。NP membership 使用 verifier。NP-hardness 使用已知 NP-complete 问题的归约。"}
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
        plain: "FA 只有有限个状态。PDA 在有限状态之外还有一个栈。TM 使用可读写的无界带。额外存储能力使机器可以识别更多语言。机器类型也决定可使用的证明方法。",
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
        plain: "Pumping Lemma 给出 regular language 或 context-free language 必须满足的重复性质。非正则或非上下文无关证明使用反证法。先假设语言属于该类。再选择字符串 w。证明每个合法分割都存在一个 pumping 次数，使新字符串不在语言中。",
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
        plain: "Decider 对每个输入都必须停机。Recogniser 对 yes-instance 必须最终接受。它可以拒绝 no-instance，也可以永远运行。枚举有限 yes 见证通常可以得到 recogniser，但不一定得到 decider。",
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
        plain: "Mapping reduction 是一个总可计算函数 f。它满足 x∈A 当且仅当 f(x)∈B。函数 f 必须对每个输入停机。若 B 有 decider，则先计算 f(x)，再运行 B 的 decider，就可以决定 A。",
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
        plain: "语言属于 NP，表示每个 yes-instance 都有 polynomial-size certificate。确定性 verifier 可以在 polynomial time 内检查该证书。证明必须写出证书格式、长度界、检查步骤和运行时间。",
        steps: [
          "先写 certificate 的具体数据结构与最大长度。",
          "检查证书格式、成员范围和重复项。错误格式必须 reject。",
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
        plain: "证明一个语言 NP-complete 需要两部分。第一部分证明该语言属于 NP。第二部分从已知 NP-complete 语言归约到目标语言。正确性证明必须包含两个方向的 iff。",
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
            final: "L1A 不是 regular。选择边界字符串 w。覆盖所有合法分割。使用 i=2 破坏数量关系。"
          },
          {
            label:"1(b)",
            ask: "证明二进制 u<v 的语言非 CFL。",
            steps: [
              "先把语言读成人话：字符串形如 left<right，left、right 都是二进制写法，而且左边代表的整数严格小于右边。要证明它不是 CFL，我们必须击败 CFL pumping lemma 允许的每一种分割。",
              "反证假设该语言是 CFL，令 p 是 pumping length。选 W=1^p0^(p+1)<1^p0^p1。符号 1^p 表示连续 p 个 1。",
              "先核对 W 确实在语言里：左右两边长度都是 2p+1，前 2p 位完全相同；最后一位左边是 0、右边是 1，所以右边恰比左边大 1，故 left<right。",
              "CFL lemma 让对手任选 W=abcde，要求 |bcd|≤p、|bd|>0；a、c、e 不会被重复，b、d 会同时被重复 i 次。我们要根据 b、d 的位置选 i，使 ab^icd^ie 不在语言。因为窗口 bcd 至多 p 个字符，碰到分隔符附近时也不可能伸到左右两数的远端。",
              "情况 1：b、d 都在 < 左边。取 i=2。左数增加至少一位，右数长度不变；原左数以 1 开头，重复后仍以 1 开头。一个以 1 开头、位数更多的二进制数必更大，所以 left<right 失败。",
              "情况 2：b、d 都在 < 右边。取 i=0。右数至少少一位，左数长度不变。左数仍是 2p+1 位且以 1 开头，所以值至少为 2^(2p)；变短的右串值小于 2^(2p)，即使删掉了一些开头 1、产生前导 0 也不可能仍大于左数。",
              "情况 3：b 或 d 自己包含分隔符 <。取 i=0 会删除分隔符，或取 i=2 会复制分隔符；结果不再具有恰好一个 left<right 的合法格式。",
              "情况 4：< 落在中间段 c，b 是左侧末尾的 0^α，d 是右侧开头的 1^β，且 α+β>0。这是最容易漏掉的跨界情况。",
              "若 α>β，取 i=2：左边增加的位数多于右边，左数最终更长。若 α<β，取 i=0：右边删得更多，左数最终更长。两种都使 left<right 失败。",
              "若 α=β>0，取 i=0。两边仍同长，但在第一处不同的位置，左边下一位是 1，右边下一位是 0；同长二进制数第一处不同位为 1 的更大，所以失败。",
              "四类覆盖所有合法分割，且每类都找到 i 使 pumped string 不在语言。这与 pumping lemma 的“所有 i≥0 都仍在语言”矛盾。"
            ],
            final: "因此 L1B 不是 context-free。证据链：具体 W∈L → 任意 abcde → 四类位置穷尽 → 每类给 i 与失败理由。"
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
              "输入 ⟨M⟩，先验证 M 是题目允许的 FA 编码；若编码非法，按约定 reject。这里的目标不是测试几个输入串，而是一次性问‘是否存在一条奇长接受路径’。",
              "构造 product states (q, parity)：q 是 M 的原状态，parity 只记目前已读字符数是 even 还是 odd。初始为 (q₀,even)；每读一个真实输入符号就翻转 even/odd。若 M 是 ε-NFA，ε 边不读字符，所以 parity 不翻转。",
              "在有限 product graph 上从 (q₀, even) 做 BFS/DFS；同一个 (q,parity) 只需访问一次，因为之后可达的状态已经完全相同。",
              "若可达 (q_accept, odd)，说明存在奇长接受串，reject。",
              "搜索完成仍不可达，accept；图有限所以一定会停机。"
            ],
            final: "D 决定 L2A，因此 L2A decidable。"
          },
          {
            label:"2(b)",
            ask: "构造 L2B recogniser。",
            steps: [
              "输入 ⟨M⟩，先检查它是合法 TM 编码且输入字母表为题目要求的 {a,b}；不合法就 reject。然后按长度枚举 {a,b}*：ε, a, b, aa, ab, ba, bb, …。",
              "使用 dovetail 交错模拟 M 在所有已枚举串上的运行。",
              "任一模拟进入 accept 立刻 accept。",
              "若 L(M)=∅，没有模拟 accept，机器就继续运行而不误接受；这正是 recogniser 的允许行为，并不是程序写漏了 reject。"
            ],
            final: "T 在且仅在 L(M) 非空时接受，因此 L2B Turing-recognisable。"
          }
        ]
      },
      {
        question: "Q3 用 HALT 的 mapping reduction 证明“TM 只接受偶长串”这一性质不可判定。",
        parts: [
          {
            label:"Q3",
            ask: "给出完整 mapping reduction。",
            steps: [
              "定义 L3={⟨N⟩:N 接受的每个字符串长度都是偶数}。它的补集是“至少存在一个被 N 接受的奇长串”。固定奇长串 0 会让构造最简单。",
              "反证假设 complement(L3) 有 decider D。我们将用 D 决定已知不可判定的 HALT。",
              "归约函数 F 输入 ⟨M,w⟩，只把 M、w 写进一台新机器 N 的描述并输出 ⟨N⟩；这是有限的文本拼接/编码工作。F 不等待 M(w)，所以对每个输入都在有限步结束，是 total computable function。",
              "N 的伪代码：On input u：① 若 u≠0，reject；② 若 u=0，模拟 M on w；③ 只有该模拟停机后才 accept。",
              "正向：若 M(w) 停机，N 接受长度为 1 的串 0，因此 ⟨N⟩∈complement(L3)。",
              "反向：若 ⟨N⟩∈complement(L3)，N 必接受某个奇长串；但 N 唯一可能接受 0，接受它前 M(w) 必须停机。因此 ⟨M,w⟩∈HALT。",
              "于是 ⟨M,w⟩∈HALT iff F(⟨M,w⟩)∈complement(L3)。先运行 F 再运行 D 就能决定 HALT，矛盾。",
              "故 complement(L3) 不可判定。若 L3 可判定，交换其 decider 的 accept/reject 就可决定补集，所以 L3 也不可判定。"
            ],
            final: "HALT≤m complement(L3)，故 complement(L3) 与 L3 都 undecidable；F 只构造文本并总停机。"
          }
        ]
      },
      {
        question: "Q4 判断 L3 与 complement(L3) 哪一侧可识别；关键是寻找“有限见证”。",
        parts: [
          {
            label:"Q4",
            ask: "构造 recogniser 并推出另一侧不可识别。",
            steps: [
              "先找哪一侧有有限见证。complement(L3) 的 yes-instance 意味着“存在一个奇长串 u 被 M 接受”；这个 u 和一段有限接受运行就是可找到的见证。",
              "Recogniser R 输入 ⟨M⟩。若不是合法 TM 编码，直接 reject。",
              "按长度枚举所有奇长二进制串：0、1、000、001、010、…；不能把第一个串完整跑完再试下一个，因为它可能永久 loop。",
              "使用 dovetail：第 1 轮给第 1 个模拟一步；第 2 轮加入第 2 个模拟并各跑一步；第 t 轮让前 t 个模拟各多跑一步。",
              "只要任一 M(u) accept，R 就 accept。若确有奇长 u 被接受，它的有限运行终会被推进完成。",
              "若没有奇长串被接受，R 可以永远运行；recogniser 对 no-instance 本来就允许 reject 或 loop。",
              "所以 complement(L3) Turing-recognisable。若 L3 也有 recogniser S，可交错运行 R 与 S；输入必属于一侧，其中一个最终接受，因而得到 L3 decider。",
              "这与 Q3 的 L3 undecidable 矛盾，所以 L3 不是 Turing-recognisable。"
            ],
            final: "complement(L3) 是 Turing-recognisable。L3 不是 Turing-recognisable。dovetail 使一个无限循环不能阻止其他模拟执行。"
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
              "构造 reduction 函数 F：输入 ⟨M,w⟩，F 只做“写程序文本”这一件事——直接把 M 的描述与 w，以及一个有限的 universal-TM simulation 例程嵌进 Java 程序 J 的源代码。F 本身完全不运行 M(w)，所以无论 M(w) 是否停机，F 都会有限步内输出 J 的字符串。这里需要的只是‘Java 可以执行有限代码来模拟任意 TM 的一步’，不是要在考场实现完整模拟器。",
              "代码在 J 的运行阶段模拟 M(w)。若 simulate 不返回，J 不会执行 increment。若 simulate 返回，J 执行两个 increment。",
              "证明 iff 正向：若 M(w) 停机，J 中的 simulate 会返回，接着执行 a++ 与 b++，所以 ⟨J⟩∈L5。",
              "证明 iff 反向：若 ⟨J⟩∈L5，a、b 必须都执行到 increment；唯一能到达这两行的路径要求 simulate 返回，所以 M(w) 必停机。",
              "于是 ⟨M,w⟩∈HALT iff ⟨J⟩=F(⟨M,w⟩)∈L5。",
              "现在写 H(⟨M,w⟩)：调 F 把它变成 ⟨J⟩，再调假设的 D5(⟨J⟩)；返回 D5 的结果。由 iff，H 正确判定 HALT。",
              "但 HALT 已知不可判定，所以 D5 不存在，L5 undecidable。"
            ],
            code:"public static void main(String[] args) {\n    int a = 0, b = 0;  // 已初始化两个整数变量\n    simulate(M, w);    // M(w) 不停机，程序就永远停在这里\n    a++;\n    b++;               // 只有 M(w) 停机，两次 increment 才会发生\n}",
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
              "输入编码为 ⟨G=(V,E),k⟩。先拒绝 k<0 或 k>|V|；后者不可能选出 k 个互不相同的岛。",
              "yes-certificate c 是恰好 k 个顶点编号。每个编号需 O(log|V|) bits，所以总长 O(k log|V|)≤O(|V|log|V|)，相对输入规模是 polynomial。",
              "检查 c 恰有 k 项、每项属于 V，并用布尔数组或哈希集合检查没有重复。",
              "对 c 中每一对不同顶点检查是否有 boat edge，共 C(k,2)=k(k-1)/2 对。",
              "若输入给邻接矩阵，每次查边 O(1)，总计 O(k²+|V|)。若输入给 edge list，可先用 O(|V|²+|E|) 建矩阵，随后查边 O(k²)；或逐次扫描 edge list。无论采用哪种明确表示，整体都是相对输入编码长度的 polynomial。",
              "全部通过才 accept。有 k-clique 时那 k 点给出证书；若 verifier accept，所有点对有边，证书本身就是 k-clique。"
            ],
            final: "证书长度和验证时间都是 polynomial，且 verifier accept iff 存在 k-clique，所以 L6A∈NP。"
          },
          {
            label:"6(b)",
            ask: "证明 exact simple a-b path 在 NP。",
            steps: [
              "先拒绝 k<0；simple path 不能重复顶点，所以若 k>|V|-1，也立即 reject。",
              "证书是 v₀,…,vₖ，共 k+1 个顶点编号。k 条边恰好连接 k+1 个相邻顶点。",
              "证书长度 O((k+1)log|V|)，合法输入有 k≤|V|-1，因此是 polynomial-size。",
              "检查 v₀=a、vₖ=b，每个 vᵢ∈V；再用集合检查所有顶点互不重复，这保证 path 是 simple。",
              "对 i=0,…,k-1 检查 (vᵢ,vᵢ₊₁)∈E。邻接矩阵下总时间 O(k+|V|)（包含去重数组）；若给 edge list，先预处理为矩阵或用扫描，仍有相对输入长度的 polynomial 上界。",
              "全过才 accept。真实路径的顶点序列能通过；通过检查的序列反过来正是长度 k 的 simple a-b path。"
            ],
            final: "证书为 k+1 个顶点且长度 polynomial；verifier accept iff 存在恰好 k 条边的 simple a-b path。"
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
              "第一半已经在 Q6(a) 完成：L6A∈NP。现在只需证明它 NP-hard；选已知 NP-complete 的 3-SAT 作为源问题，方向必须写成 3-SAT≤pL6A。",
              "把一个有 r 个 clause 的 3-CNF 公式 C 输入构造 F。一个 literal 是变量 a 或它的否定 ¬a；即使两个位置都写 a，也仍是两个 occurrence（出现位置），各自需要一个 vertex。每个 clause 的 3 个 literal 各建一顶点，所以共 3r 顶点。",
              "只在不同 clauses 且不互相否定的两个 vertices 间加 edge。‘不互相否定’表示不能一个选 a、另一个选 ¬a；同一 clause 内故意完全不连边，这会强迫 clique 每层最多选一个。",
              "输出 (G,k)，设 k=r。构造只比较有限个跨 clause 顶点对，至多 O((3r)²) 次，所以 F 在 polynomial time 完成。",
              "正向：若 C 有满足赋值，每个 clause 至少有一个 true literal；每层选一个 true occurrence。两点来自不同 clause，且同一赋值不可能同时让 a 与 ¬a 为真，所以没有冲突边被删；选出的 r 点两两相连，是 r-clique。",
              "反向：若 G 有 r-clique，同一 clause 的顶点不连边，r 个点因而必须恰从 r 个 clauses 各取一个。任意两个所选 literal 都不互补；把每个出现的 literal 设为真（其余变量任意补全）不会矛盾，并使每个 clause 至少有一个真 literal，因此 C 可满足。",
              "于是 C 可满足 iff F(C) 有 r-clique，L6A 是 NP-hard。结合第一半 L6A∈NP，得到 L6A NP-complete。"
            ],
            final: "方向必须是 3-SAT ≤p L6A。"
          },
          {
            label:"7(b)",
            ask: "画给定四 clause 公式的 reduction 图。",
            steps: [
              "准确抄题面：C=(¬a∨b∨¬c)∧(¬a∨b∨c)∧(a∨b∨¬c)∧(a∨¬b∨¬c)。PDF 中否定是字母上方横线，普通文本抽取会把横线丢掉。",
              "建立 12 个 occurrence vertices，不能把同名字面量合并：C1={(1,¬a),(1,b),(1,¬c)}；C2={(2,¬a),(2,b),(2,c)}；C3={(3,a),(3,b),(3,¬c)}；C4={(4,a),(4,¬b),(4,¬c)}。",
              "同一 clause 内不连边，因为 clique 必须被迫每个 clause 只选一个。不同 clause 的两点一般连边；只有互为否定时删边。",
              "例如 (1,¬a) 不连 (3,a)、(4,a)；(1,b) 不连 (4,¬b)；(1,¬c) 不连 (2,c)。其余 clause 对按同一规则处理，完整结果见下图。",
              "输出实例是 ⟨G,k=4⟩。取赋值 a=false、b=true、c=false，四个 clause 都为真。",
              "可圈出的 4-clique 是 {(1,¬a),(2,¬a),(3,b),(4,¬c)}。它们来自四个不同 clause，且任意两者都不互补，所以两两有边。"
            ],
            figure:"assets/cs605-q7-clique.svg",
            figureAlt:"2026 CS605 Q7(b) 四个子句、十二个 literal occurrence 顶点及一组四点 clique 的分层图",
            figureCaption:"淡灰边表示允许的跨 clause 兼容选择；蓝色节点与粗边标出 clique {(1,¬a),(2,¬a),(3,b),(4,¬c)}。同层边与互补 literal 边不存在。",
            final: "具体输出为上述 12 顶点图与 k=4；示例 4-clique 对应满足赋值 a=false,b=true,c=false。"
          }
        ]
      }
    ]
  },
  cs608: {
    start: {
      title: "测试目标、输入和预期结果",
      intro: "CS608 要求每个测试对应一个明确的覆盖目标。先从规格或代码定义目标。然后选择输入并写出调用顺序。最后比较实际结果和预期结果。EP、Branch Coverage、class context 和随机测试使用不同的覆盖目标。",
      blocks: [
        {t:"规格条件",p:"列出输入范围、边界、条件组合、错误处理和所有输出。若 >100 与 ≤100 的行为不同，则 100 和 101 属于不同 partition。"},
        {t:"覆盖目标",p:"黑盒测试覆盖规格中的 partition 或 rule。白盒测试覆盖 statement 或 branch。对象测试还要定义调用前状态。"},
        {t:"测试表",p:"测试表必须连接 TCI、selected value、test case、expected result 和 coverage mapping。每个 TCI 至少由一个 test case 覆盖。"}
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
        plain: "软件测试不能证明程序没有缺陷。测试在有限时间内检查选定输入和行为。穷举测试通常不可行，因为多个输入域的大小相乘。TCI 定义必须覆盖的输入类、输出或代码结构。",
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
        plain: "Equivalence Partitioning 把输入分为预期行为相同的 partition。每个 partition 选择一个代表值。Value line 先标出类型范围，再标出规格范围和行为变化点。非法范围必须形成 error partition。",
        steps: [
          "先问一个幼儿园级问题：输入从小到大走时，程序在哪些点会“换一种处理”？只有这些换档点才会把一条线切成多个 partition。",
          "对每个输入先画类型自然范围（如 Java short 是 -32768..32767）。自然范围回答“语言能装什么”，规格范围回答“题目允许什么”，两者不要混为一谈。",
          "在自然范围上标规格允许范围和每个行为切换点。例如 <10、10..49、≥50 是三种处理，不是因为数字长得不同，而是因为代码/规格的结果会不同。",
          "给每个 input partition 编号；非法区也分别编号并加 *。星号的意思是：这是 error TCI，后面要单独用一个 TC 验证它。",
          "输出也要做 partition/TCI。输入覆盖过不代表输出覆盖过；例如一个测试可能从未得到 PARAM_ERROR，就不能说错误输出已被验证。",
          "normal TC 像拼拼图：尽量在一个合法 TC 中合并多个尚未覆盖的 normal TCI。error TC 则反过来，一次只让一个输入非法，其他输入保持合法，避免 error hiding。",
          "最后逐行写 TC→TCI mapping。若两行覆盖的 TCI 集合完全一样，后一行没有新增证据，删掉或明确标作“非 EP 必需的 robustness 例子”。"
        ],
        example: {
          title: "温度分类的 EP",
          prompt: "输入 int temp；<0 返回 COLD，0..30 返回 OK，>30 返回 HOT。",
          steps: [
            "自然范围是整个 int；规格在 0、30 两处改变行为。",
            "Partitions：P1 temp<0，P2 0≤temp≤30，P3 temp>30。",
            "选择 -1、15 和 31 作为代表。EP 每个分区只需要一个代表。边界相邻值属于 BVA。",
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
        plain: "白盒测试根据代码控制流选择输入。每个 decision 有 true branch 和 false branch。Branch Coverage 要求执行两个 branch。JaCoCo 的部分覆盖标记不能说明具体缺少哪个 branch。必须检查源码和短路求值顺序。",
        steps: [
          "列出每个 if 和 while 条件。给每个 true branch 和 false branch 编号。记录每个测试执行的 branch。",
          "结合现有测试和 JaCoCo 颜色找未走出口：绿色是已执行，黄色是同一行仍缺部分出口，红色是该行完全没执行。颜色是线索，不是完整答案。",
          "把“要走这条路”翻译成条件。例如要让 enabled && exists 的第二个条件被求值，第一项 enabled 必须先为 true；否则 Java 会短路，exists 连看都不看。",
          "解出一组最简单输入，再用规格算 expected result。这里有两份证据：实现分支为何被走到、规格为何说输出应是这个值。",
          "只添加真的带来新 branch 的测试。最后用 TestNG 把 Arrange（准备）、Act（调用）、Assert（比较）写完整。"
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
        plain: "对象方法可以修改字段而不返回值。测试必须先建立对象状态，再调用被测方法，最后通过 getter 或 observer 读取结果。Setter 修改对象状态，因此它是 mutator。",
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
        plain: "约束随机测试先选择一条 Decision Table rule。然后，它只在该 rule 的有效输入范围内随机生成值。Rule 决定预期结果。随机生成增加同一 rule 内的输入多样性。",
        steps: [
          "先为每条 rule 写清 causes（条件）和 expected effect（预期动作）。如果两条条件都没写清，机器生成一万次也不知道自己在验什么。",
          "把数值 cause 翻译成不重叠的随机区间，例如 lux<5000 就是 0..4999；5000 必须属于另一侧 ≥5000。",
          "boolean cause 直接固定 true/false，不要把它也随便随机，否则这一轮可能跑到另一条 rule，覆盖记录会失真。",
          "循环时保存 seed、rule 名、输入和失败日志。失败后用同一个 seed 才能把同一个输入重新找回来并修 bug。",
          "可靠性/MTBF 的随机数据还要像真实用户：真实用户若大多在低光照，测试也不能只均匀抽到极大 lux。这个输入比例叫 operational profile。"
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
        plain: "Agile 开发在每个迭代中执行测试。白盒测试依赖内部控制流，因此重构后可能需要修改。黑盒测试依赖外部规格。测试投入应根据故障概率、影响和测试成本决定。",
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
              "先写共同的自然范围：两个参数都是 short，所以都能取 -32768..32767。不要一上来把 0..100 当自然范围；那只是 battLevel 的规格合法范围。",
              "读题找 battLevel 的换档点：0（合法开始）、10（FAST 的 batt 条件结束）、50（SLOW 的 batt 条件结束）、100（合法结束）。因此 B1*=-32768..-1，B2=0..9，B3=10..49，B4=50..100，B5*=101..32767。B1/B5 带 *，因为它们是非法输入。",
              "读题找 dischargeRate 的换档点：0（合法开始）、50/51（FAST 的 rate 条件从 false 变 true）、255（合法结束）。因此 R1*=-32768..-1，R2=0..50，R3=51..255，R4*=256..32767。",
              "再列输出 TCI：O1=NONE，O2=FAST_CHARGE，O3=SLOW_CHARGE，O4=PARAM_ERROR。输出也要编号，因为阅卷人要看到每个可能结果至少被某个 TC 检查。",
              "把英文规则翻成可算的话：合法且 B2∧R3 时 FAST；合法且 battLevel<50、但不满足 FAST 时 SLOW；其余合法组合 NONE；任一输入非法时 PARAM_ERROR。",
              "小自检：batt=9, rate=51 落 B2/R3，所以 FAST；batt=10, rate=51 落 B3/R3，不再满足 batt<10，所以 SLOW；batt=50, rate=50 落 B4/R2，所以 NONE。"
            ],
            final: "卷面可直接交付：battLevel：B1*[-32768,-1]、B2[0,9]、B3[10,49]、B4[50,100]、B5*[101,32767]；rate：R1*[-32768,-1]、R2[0,50]、R3[51,255]、R4*[256,32767]；输出 O1..O4 如上。四个输入 error TCI 均加 *。"
          },
          {
            label:"1(c)",
            ask: "给最小、可追踪的 EP tests。",
            steps: [
            "先选择覆盖最多新 normal TCI 的代表。T1=(batt 9, rate 51)，预期 FAST_CHARGE，mapping={B2,R3,O2}。9 属于 B2。51 属于 R3。这个组合满足 FAST 条件。",
              "下一步必须得到 SLOW。T2=(10,51)，预期 SLOW_CHARGE，mapping={B3,R3,O3}。R3 与 T1 重复，但 B3/O3 是新项目；没有其他合法输入能让 B3 变成 FAST，所以这个重复是必要的。",
              "下一步得到 NONE。T3=(50,50)，预期 NONE，mapping={B4,R2,O1}。它同时带来最后一个正常 batt partition、最后一个正常 rate partition 和 NONE 输出。",
              "现在只剩四个 error input TCI。每次故意只弄坏一个参数，另一参数留在合法区：T4=(-1,50)→PARAM_ERROR={B1*,R2,O4}；T5=(101,50)→PARAM_ERROR={B5*,R2,O4}。",
              "继续：T6=(50,-1)→PARAM_ERROR={B4,R1*,O4}；T7=(50,256)→PARAM_ERROR={B4,R4*,O4}。虽然 O4 重复，但每个新 error TCI 都必须独立触发；这不是 duplicate coverage。",
              "最后从 TCI 反查：B1*→T4，B2→T1，B3→T2，B4→T3/T6/T7，B5*→T5；R1*→T6，R2→T3/T4/T5，R3→T1/T2，R4*→T7；O1→T3，O2→T1，O3→T2，O4→T4..T7。每项至少有一条证据。",
              "不要误删 T2 或错误 TC：删除标准是两条 TC 的整个 TCI 集合完全相同。这里每一条都有至少一个别人没有的新输入 TCI，故 7 条都保留。"
            ],
            final: "可交卷 TC 表：T1(9,51) FAST；T2(10,51) SLOW；T3(50,50) NONE；T4(-1,50) PARAM_ERROR；T5(101,50) PARAM_ERROR；T6(50,-1) PARAM_ERROR；T7(50,256) PARAM_ERROR。把上述 mapping 抄入 TCI/selected-value/TC 三表，并标出 B1/B5/R1/R4 为 error *。"
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
              "读取 2026 截图。第 28 行是 exists=true 路径内的 if(overwrite)。第 29 行 temp=true 为绿色，而第 28 行为黄色。因此 overwrite=true 已执行，缺少 overwrite=false 的 null-else branch。",
              "覆盖第 28 行缺口必须先满足 enabled=true、exists=true，再令 overwrite=false。调用 decideWrite(true,true,false)。该分支不执行赋值，temp 保持初值 false，所以 expected=false。",
              "第 32 行是 exists=false 路径内的 if(overwrite)。第 35 行 false 分支为绿色，第 33 行 true 分支 temp=false 为红色。因此缺少 overwrite=true。",
              "覆盖第 32/33 行必须满足 enabled=true、exists=false、overwrite=true。调用 decideWrite(true,false,true)，执行 temp=false，所以 expected=false。",
              "建立 TCI→TC mapping。BC1=第 28 行 false/null-else，由 TC_B1(T,T,F) 覆盖。BC2=第 32 行 true及第 33 行，由 TC_B2(T,F,T) 覆盖。exists 不可能在同一次调用中同时为 true 和 false，所以两条测试不能合并。"
            ],
            final: "新增 TC_B1=(true,true,false)→false，覆盖 line 28 false/null-else。新增 TC_B2=(true,false,true)→false，覆盖 line 32 true 和 line 33。"
          },
          {
            label:"2(b)",
            ask: "写 TestNG outline。",
            steps: [
              "导入 org.testng.Assert 和 org.testng.annotations.Test。",
              "建立 public class FilestoreTest。每条新增 branch TC 使用独立的 @Test 方法，方法名写明所覆盖的 line 和方向。",
              "第一条测试调用 Filestore.decideWrite(true,true,false)。Assert.assertEquals(actual,false) 检查第 28 行 false/null-else 的结果。",
              "第二条测试调用 Filestore.decideWrite(true,false,true)。Assert.assertEquals(actual,false) 检查第 32 行 true 和第 33 行。",
              "两条测试都使用 Arrange、Act、Assert。输入直接来自 Q2(a)，expected 来自 Javadoc 规格和源码路径。"
            ],
            code: "import org.testng.Assert;\nimport org.testng.annotations.Test;\n\npublic class FilestoreTest {\n  @Test\n  public void line28FalseNullElse() {\n    boolean actual = Filestore.decideWrite(true, true, false);\n    Assert.assertEquals(actual, false);\n  }\n\n  @Test\n  public void line32TrueExecutesLine33() {\n    boolean actual = Filestore.decideWrite(true, false, true);\n    Assert.assertEquals(actual, false);\n  }\n}",
            final: "两个真实 @Test 方法分别覆盖 line 28 false/null-else 与 line 32 true/line 33。"
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
              "先问：被测方法把答案交到哪里？若它 return 一个值，测试可立刻比较；若它把答案放进对象字段，测试还要有观察那块字段的 getter。",
              "conventional/static 顺序是：actual = Level.checkLevel(x) → assert actual==expected。这里 actual 就是 return value，oracle 紧跟在调用后。",
              "class-context 顺序是：obj = new Level(x) → obj.isValid() → actual = obj.getResult() → assert actual==expected。constructor 先把 x 放进对象的 attribute；isValid 计算并写 result；getResult 才把 result 拿给测试看。",
              "因此两个答案的差别不只是多写 new：第二个测试必须写出 state 的建立、void/状态改变的方法调用和最终观察点，否则你根本没有读到 isValid 的结果。",
              "一个容易漏的细节：若 isValid() 没有 return，不能写 actual=isValid()；应先调用它，再用 getResult() 取得 actual。"
            ],
            final: "卷面写成两条箭头即可：static：checkLevel(x)→actual→compare expected；object：new Level(x)→isValid()→getResult()→actual→compare expected。每一个箭头都是测试调用的一步。"
          },
          {
            label:"3(b)",
            ask: "完成 Shipping class-context EP。",
            steps: [
              "先把对象里的两块状态分开：primeCustomer 是 decide 前就存在的 pre-state；freeShipping 是 decide 后要观察的结果。isFree() 是读结果的 getter/observer；setPrime(boolean) 是改 pre-state 的 setter/mutator。primeCustomer 没有 getter，但这不妨碍测试：我们刚调用 setPrime，就知道自己建立了什么状态。",
              "按题意写判断表：prime=true 时，无论 value 是多少都 free；prime=false 时，只有 value>100 才 free。题目特别说负数合法，所以负数不是 error。",
              "寻找 value 的真正换档点：条件是严格 >100，故 V1=value≤100，V2=value>100。100 属 V1，101 才属 V2；-1 也属 V1。负数合法只是在 V1 内的一个有用代表，不会产生第三种处理。",
              "列 TCI：pre-state P1=prime true、P2=prime false；parameter V1/V2；output O1=free、O2=not free。现在要选最少 TC，让每个 TCI 至少被覆盖一次。",
              "T1：new Shipping() → setPrime(true) [void] → decide(-1) [void] → isFree()=true。mapping={P1,V1,O1}。它顺便证明“负数是合法输入且 Prime 仍免费”。",
              "T2：new Shipping() → setPrime(false) [void] → decide(101) [void] → isFree()=true。mapping={P2,V2,O1}。101 比 100 大 1，所以确实进入 >100 分支。",
              "T3：new Shipping() → setPrime(false) [void] → decide(100) [void] → isFree()=false。mapping={P2,V1,O2}。100 不是 >100，这正好检验严格不等号。",
              "检查重复：如果再写 prime=false,value=-1→false，它的集合仍是 {P2,V1,O2}，与 T3 完全相同；它可作为额外 robustness/example，但不是新的 EP 必需 TC。每条测试新建对象，避免上一条留下 freeShipping 状态干扰下一条。"
            ],
            final: "最小 normal EP 表为：T1 true/-1→true，T2 false/101→true，T3 false/100→false；每行都写 new→setPrime(void)→decide(void)→isFree() 的完整调用链及 P/V/O mapping。负数合法，但不另建行为 partition。"
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
              "先把 DT 读成四句人话：grid 能接收且 lux<5000 时 false；grid 能接收且 lux≥5000 时 true；grid 不能接收时，无论 lux 在哪边都 false。两条 boolean/数值 cause 组合成 2×2=4 条 rule。",
              "题面给 lux 为 int，DT 又把讨论域限定为 lux≥0；所以本题自然可用的 lux 域是 0..Integer.MAX_VALUE。5000 是切换点，左区间只能写 0..4999，右区间从 5000 开始。",
              "T1 / Rule1：固定 grid=true；只从 genRand(4999,0) 取 lux；expected=false。固定 grid 是为了保证每一次随机值都仍在 Rule1。",
              "T2 / Rule2：固定 grid=true；只从 genRand(Integer.MAX_VALUE,5000) 取 lux；expected=true。若随机到 5000，它仍必须为 true，因为 >= 包含等号。",
              "T3 / Rule3：固定 grid=false；从 genRand(4999,0) 取 lux；expected=false。T4 / Rule4：固定 grid=false；从 genRand(Integer.MAX_VALUE,5000) 取 lux；expected=false。",
              "如果实际运行不想抽到极大 int，可自定一个有限 operational/test cap U；但要在卷面写“U 是测试上限”，不能冒充题面给出的规格上界。"
            ],
            final: "可交卷随机 DT 表：R1 true/0..4999→false；R2 true/5000..Integer.MAX_VALUE→true；R3 false/0..4999→false；R4 false/5000..Integer.MAX_VALUE→false。每行均写随机 criteria、固定 boolean 和 oracle。"
          },
          {
            label:"4(b)(c)",
            ask: "写自动化框架和 genRand。",
            steps: [
              "先写可复现的开头：long seed=2026L; Random random=new Random(seed);。seed 不是为了让随机“不随机”，而是为了 failure 发生时别人能重新得到同一串输入。",
              "对 R1..R4 各循环 N 次。循环体只有五件事：按本 rule 生成 lux；固定 grid；调用 SolarPanel；用该 rule 的 expected 比较；失败时记录 seed、rule、grid、lux 和实际结果。N（例如 1000）或运行时长就是 completion criterion，必须写出来。",
              "伪代码可直接照写：for i=1..N { lux=genRand(4999,0); actual=panel.enable(true,lux); assertEquals(actual,false); }。其余三条只替换区间、grid 和 expected；不要用一个没有 rule 标签的大循环把四条证据混掉。",
              "题面签名的顺序不寻常，必须原样写 int genRand(int max, int min)，不是常见的 (min,max)。第一步检查 max<min；若成立，调用者给了倒置区间，抛 IllegalArgumentException。",
              "为什么公式是 min + random.nextInt(max-min+1)：nextInt(bound) 只给 0..bound-1。令 bound=max-min+1 后，0 加 min 得 min，bound-1 加 min 得 max，因此两端都包含。",
              "代码骨架：int genRand(int max,int min){ if(max<min) throw new IllegalArgumentException(); return min+random.nextInt(max-min+1); }。一般实现还要防 max-min+1 溢出；本题 0..4999 和 5000..Integer.MAX_VALUE 的 bound 都仍是正 int。"
            ],
            final: "交付物必须能回答五件事：怎么生成（genRand）、在验哪条 rule、预期是什么（oracle）、何时停止（N/时长）、失败怎样复现（seed+日志）。少一项就只是“写了循环”，不是完整随机测试。"
          },
          {
            label:"4(d)",
            ask: "解释 MTBF 与 risk investment。",
            steps: [
              "先区分“随机功能测试”和“可靠性估计”：前者问某条 rule 对不对；后者问真实使用一段时间后平均多久才遇到一次 failure。第二个问题的输入比例必须像真实用户，这就是 operational profile。",
              "长时间运行，记录每次 failure 的时刻、输入和恢复。若每次 failure 后都按同一规则修复/重置，且用实际 operational uptime 计时，可用简化估计 MTBF≈累计 uptime / failure 数。例：运行 1000 小时、观察到 4 次 failure，则估计约 250 小时/次。",
              "若 failure 数为 0，分母不能当成 0 后说 MTBF=∞。正确说法是：在本次时长和 profile 下未观察到 failure；还应报告运行时长、样本数/置信信息和 profile。",
              "画课程风险图时先定横轴 testing expenditure。随着投入增加，Pr(failure) 通常下降；expected failure cost=Pr(failure)×cost(failure) 通常下降；testing cost 却上升。",
              "把 expected failure cost 和 testing cost 相加，得到 total cost。曲线最低点是理性测试投入：左边测得太少，故障风险高；右边继续测试的收益小于新增成本。",
              "若收入固定，profit=固定收入-total cost，所以 total cost 最低同样是 profit 最高。avoided-loss/net-profit 可作为你从成本图推出的解释，但不要说那就是课程原图的标签。"
            ],
            final: "可靠性答案要写 profile、运行/恢复规则、uptime、failure count 和谨慎的 MTBF 解释；风险图要标 expenditure、Pr(failure)、expected failure cost、testing cost、total cost 和最低点。这样既有公式，也说明公式什么时候能用。"
          }
        ]
      }
    ]
  },
  cs616: {
    start: {
      title: "密码计算的基本设置",
      intro: "每道计算题必须指定数字表示、模数和公式。先确认数字使用十进制还是十六进制。再确认每一步使用哪个模数。计算后，把结果代回原公式。",
      blocks: [
        {t:"写数字表示",p:"标出十进制、十六进制和字符编码。不要在同一算式中混用不同表示。"},
        {t:"写模数",p:"在每个模运算旁写 mod p、mod q、mod n 或 mod q²。"},
        {t:"检查结果",p:"把密钥、平方根或签名代回原公式。确认等式成立。"}
      ]
    },
    glossary: [
      ["Mod n / 模 n","两个整数相差 n 的倍数时视为同一余数类。x mod n 就是 x 除以 n 的余数。"],
      ["Modulus / 模数","表达式 x mod n 中的 n。它规定允许的余数范围为 0 到 n−1。"],
      ["Inverse / 逆元","a 的逆元是一个整数 x。它满足 ax≡1 (mod n)。这表示 n 可以整除 ax−1。逆元只在 gcd(a,n)=1 时存在。"],
      ["GCD / 最大公约数","gcd(a,n)=1 表示 a 与 n 互素。互素才有乘法逆元。"],
      ["Coprime / 互素","两个整数除了 1 没有其它公共因子。"],
      ["Extended Euclid Algorithm / 扩展欧几里得算法","普通 Euclid 算法用连续除法求 gcd。扩展算法把每个余数反向代回。它最终得到 ax+ny=gcd(a,n)。当 gcd=1 时，对等式取 mod n 可得 ax≡1 (mod n)。因此 x 是 a 的逆元。单元 1 的第一个例题展示全部除法和反向代入。"],
      ["Modular Exponentiation / 模幂运算","算 a^e mod n，通常用 repeated squaring 提高效率。"],
      ["Repeated Squaring / 快速平方","先计算 a、a²、a⁴、a⁸ 等平方。每次计算后立即取模。把指数写成这些二的幂之和。只相乘需要的项。"],
      ["CRT / 中国剩余定理","CRT 把多个余数条件合成一个条件。如果模数两两互素，答案在模数乘积范围内唯一。例如 mod 3 和 mod 5 的条件可合成 mod 15 的一个答案。"],
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
      ["Affine Cipher / 仿射密码","古典密码，加密 c≡am+b (mod n)；解密需 a 的逆元。"],
      ["Affine Digraph / 仿射双字母密码","对两位字符组做仿射，组合数常为 26²=676。"],
      ["ETM / Encrypt-then-MAC","先加密再对密文计算 MAC 的认证加密方式，比 E&M 和 MTE 安全。"],
      ["E&M / Encrypt-and-MAC","对明文同时加密和 MAC，常见漏洞是 deterministic tag 泄漏相同明文。"],
      ["MTE / MAC-then-Encrypt","先 MAC 再加密，常被 padding oracle 攻击。"],
      ["CCA / 选择密文攻击","攻击者可解密任意密文并观察结果；要求加密方案对 adaptive 密文鲁棒。"],
      ["Quadratic Residue / 二次剩余","模 n 下存在 x 使 x²≡a (mod n)，则 a 是二次剩余。"],
      ["Jacobi Symbol","Legendre 符号的推广；Jacobi=1 不能单独保证是二次剩余。"],
      ["Legendre Symbol","判断模素数 p 的二次剩余：a^((p−1)/2) mod p 为 +1 表示剩余，−1 不剩余。"],
      ["Blum Integer","n=pq 且 p、q 都是模 4 余 3 的素数，常用于 Rabin 密码。"],
      ["Scalar Multiplication / 标量乘","nP = P + P + … + P（n 次）；椭圆曲线密码的核心运算。"],
      ["Point Order / 点阶","最小 n>0 使 nP=O（无穷远点）。"],
      ["Jacobian Determinant","可逆映射的体积变换因子；normalizing flow 用它算 likelihood。"],
      ["Legendre Symbol / 勒让德符号","判一个数 a 是否是素数 p 的二次剩余：(a/p)≡a^((p−1)/2) (mod p)，取 +1 表示是剩余，−1 表示不是。"],
      ["Jacobi Symbol / 雅可比符号","Legendre 符号推广到合数模 n=pq…：(a/n)=(a/p)(a/q)…；Jacobi=1 不等于一定可开平方。"],
      ["Quadratic Residue / QR","模 n 下存在平方根的数，即存在 x 使 x²≡a (mod n)。"],
      ["AddRoundKey","AES 一轮中“当前 state 与 round key 逐字节 XOR”的步骤；因为 XOR 自反，key=S_before⊕S_after。"],
      ["SubBytes","AES 一轮中按 S-box 对每个字节做非线性替换的步骤。"],
      ["ShiftRows","AES 一轮中把每行字节循环移位的步骤。"],
      ["MixColumns","AES 一轮中把 4 字节列看作 GF(2^8) 上多项式并乘固定矩阵的步骤。"],
      ["Round Key / 轮密钥","AES 每轮 XOR 用的子密钥；由主密钥经 Key Schedule 派生。"],
      ["IND-CPA / 选择明文攻击下的不可区分性","对手可任意问加密 oracle 两次 m0、m1，挑战 cipher 在二者上必须无法分辨；加密方案的“基本保密”标准。"],
      ["CCA-secure / 选择密文攻击安全","对手还能问解密 oracle 时仍无法学到明文信息的更强安全标准。"],
      ["Encryption / Encryption (Enc)","用密钥把明文变成密文的操作。"],
      ["Decryption / Decryption (Dec)","用密钥把密文还原为明文的操作。"],
      ["Euler's Theorem / 欧拉定理","若 gcd(a,n)=1，则 a^φ(n)≡1 (mod n)；RSA 求逆元的理论基础。"],
      ["Fermat Factorisation / 费马分解法","当 n=pq 且 p、q 接近时，找 x²−n=y² 让 n=(x−y)(x+y) 来分解；今年卷用此分解 790199209。"],
      ["Fermat's Little Theorem","对素数 p，a^(p−1)≡1 (mod p)；用来降大指数。"],
      ["Garner's Formula","CRT 的高效恢复形式：x=a+p((b−a)·p⁻¹ mod q)，把 x≡a (mod p)、x≡b (mod q) 合成模 pq 的解。"],
      ["Hash Function / 散列函数","把任意长度输入映射为固定长度摘要的函数。安全 hash 必须抵抗 preimage、second-preimage 和 collision 攻击。"],
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
      ["Survivalguide / 速查讲义","课程提供的数论和群论摘要。它列出考试计算使用的定义和公式。"],
      ["Lsb / 最低有效位","一个二进制数的最后一位；Textbook Rabin 的修复版用 lsb(x) XOR m 作冗余位消歧 square root。"],
      ["Rabin Private Key / Rabin 私钥","Rabin 系统的私钥就是 N 的因子 p、q；解密时分别模 p 与模 q 开平方根，再用 CRT 组合。"]
    ],
    learn: [
      {
        plain: "模运算只保留除法的余数。17 mod 5=2，因为 17=3×5+2。写 a≡b (mod n) 表示 n 可以整除 a−b。模逆、模幂和 CRT 都使用这个定义。",
        steps: [
          "先确定目标。求 a⁻¹ mod n，就是找整数 x，使 ax≡1 (mod n)。这也表示 ax−1 是 n 的倍数。",
          "先用普通 Euclid 算法求 gcd(a,n)。若 n=qa+r，则 gcd(n,a)=gcd(a,r)。两边的公共因子相同，所以可以用较小的余数继续计算。",
          "重复除法，直到余数为 0。最后一个非零余数就是 gcd(a,n)。若 gcd 不是 1，则 a 没有模 n 逆元。",
          "若 gcd=1，从等式 1 开始反向代入前面的余数公式。反向代入会得到 ax+ny=1。这个等式称为 Bézout 等式。",
          "对 ax+ny=1 取 mod n。项 ny 是 n 的倍数，所以 ny≡0 (mod n)。剩下 ax≡1 (mod n)。因此系数 x 就是逆元。",
          "x 可以是负数。把 x 加上或减去 n 的倍数，可得到 0 到 n−1 之间的标准余数。",
          "计算 a^e mod n 时，先算 a、a²、a⁴、a⁸。每次平方后立即取 mod n。把 e 写成二进制幂之和，然后相乘对应项。",
          "CRT 处理多个余数条件。若 gcd(p,q)=1，则 x mod pq 由 x mod p 和 x mod q 唯一确定。RSA 和 Rabin 用 CRT 合并模 p 与模 q 的结果。"
        ],
        example: {
          title: "用扩展欧几里得算法求 7⁻¹ mod 26",
          prompt: "找 x 使 7x≡1 (mod 26)。",
          steps: [
            "执行第一次除法。26=3×7+5。余数是 5，所以 gcd(26,7)=gcd(7,5)。",
            "执行第二次除法。7=1×5+2。余数是 2，所以 gcd(7,5)=gcd(5,2)。",
            "执行第三次除法。5=2×2+1。余数是 1，所以 gcd(5,2)=1。",
            "下一次除法得到 2=2×1+0。最后一个非零余数是 1。因此 gcd(7,26)=1，逆元存在。",
            "由 5=2×2+1 的两边同时减去 2×2，得到 1=5−2×2。",
            "由 7=1×5+2 的两边同时减去 5，得到 2=7−5。把表达式中的 2 替换为 7−5，再用分配律展开，得到 1=3×5−2×7。",
            "第一次除法给出 5=26−3×7。再次代入，得到 1=3×(26−3×7)−2×7。",
            "展开并合并 7 的系数。1=3×26−9×7−2×7=3×26−11×7。",
            "现在对等式取 mod 26。3×26≡0 (mod 26)，所以 −11×7≡1 (mod 26)。系数 −11 是一个逆元。",
            "把 −11 加 26，得到标准余数 15。因此 7⁻¹≡15 (mod 26)。",
            "检查结果。7×15=105，且 105=4×26+1。因此 105 mod 26=1。"
          ],
          result: "7⁻¹ mod 26 = 15。"
        },
        extraExamples: [
          {
            title:"用快速平方计算 5¹³ mod 23",
            prompt:"计算 5¹³ mod 23，不直接计算 5¹³。",
            steps:[
              "把指数写成二的幂之和。13=8+4+1，所以 5¹³=5⁸×5⁴×5。",
              "计算 5² mod 23。5²=25，25 mod 23=2。",
              "计算 5⁴ mod 23。5⁴≡2²≡4 (mod 23)。",
              "计算 5⁸ mod 23。5⁸≡4²≡16 (mod 23)。",
              "只相乘指数 8、4 和 1 对应的项。5¹³≡16×4×5≡320≡21 (mod 23)。",
              "计算最后余数。320=13×23+21，所以 320 mod 23=21。"
            ],
            result:"5¹³ mod 23=21。每次平方后取模，可避免产生大整数。"
          },
          {
            title:"用 CRT 合并两个余数条件",
            prompt:"求 0≤x<15，使 x≡2 (mod 3) 且 x≡3 (mod 5)。",
            steps:[
              "两个模数互素，因为 gcd(3,5)=1。因此答案在 mod 15 下唯一。",
              "先写满足第一个条件的数。x=2+3k，其中 k 是整数。",
              "把 x=2+3k 代入第二个条件。2+3k≡3 (mod 5)，所以 3k≡1 (mod 5)。",
              "3 在 mod 5 下的逆元是 2，因为 3×2=6≡1 (mod 5)。两边乘 2，得到 k≡2 (mod 5)。",
              "取最小的 k=2。于是 x=2+3×2=8。",
              "检查两个条件。8 mod 3=2，8 mod 5=3。"
            ],
            result:"x≡8 (mod 15)。范围 0≤x<15 内的标准代表元是 8。"
          }
        ],
        practice: {
          q: "6 在 mod 26 下有逆元吗？",
          hint: "计算 gcd(6,26)。",
          a: "没有；gcd=2≠1。只有与 modulus 互素的元素才有乘法逆元。"
        }
      },
      {
        plain: "Affine digraph 使用 A=0、B=1、…、Z=25。字符对 xy 编码为 26x+y。例如 ma 编码为 26×12+0=312。加密公式是 c≡am+b (mod 676)。零知识协议要求 verifier 在收到 commitment 后随机选择 challenge。固定 challenge 允许攻击者根据验证公式构造 commitment。",
        steps: [
          "digraph 先写字符到 0..25 的映射和组合规则 26x+y；这里 x 是第一字母、y 是第二字母，不能调换。",
          "加密写 c ≡ am+b (mod 676)。两组明文→密文给两条式子；相减会消掉 b，先求 a，再代回求 b。解密才需要 a 的逆元。",
          "ZK transcript 分四步：commitment（先封住选择）、random challenge（验证者随机提问）、response（回答）、verification equation（核对）。",
          "攻击者在 challenge 已知时，先随便选 response R，再由 verification 方程反算 commitment；这只是让固定分支成立，不代表他会回答另一分支。",
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
        plain: "AES 使用密钥把一个 128-bit block 映射为另一个 128-bit block。Mode of operation 定义如何处理多个 block 或较小单位。ETM 先加密明文，再对 IV 和密文计算 MAC。接收端只在 tag 有效时返回明文。",
        steps: [
          "AddRoundKey 是逐 byte XOR，所以 roundKey = before XOR after。",
          "CTR/OFB/CFB 可把 block cipher 输出变成流；具体 mode 决定取 MSB/LSB、反馈什么，必须依课程讲义。本题的 CFB 用 S_8，S_8 是输出最左边（最高有效）的 8 bits，即 hex 串的首 byte。",
          "ETM 用独立 Ke、Km：先 C=Enc(Ke, M)，再 T=MAC(Km, C)。",
          "接收端重算并比较 T；invalid 永远只返回统一 null。为符合课程 timing 防护，可让 valid/invalid 走等成本或 dummy decryption，但 invalid 时绝不释放 plaintext；“做了 dummy decrypt”不等于“可以交还 dummy plaintext”。",
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
        plain: "RSA 的私钥指数是 e 在 mod φ(n) 下的逆元。Rabin 解密计算合数模平方根。Rabin 不是使用 e=2 的标准 RSA，因为 gcd(2,φ(N))≠1。Rabin 密文通常有四个平方根。若 oracle 对 R² 返回 Y≠±R，则 gcd(R−Y,N) 或 gcd(R+Y,N) 可得到 N 的非平凡因子。",
        steps: [
          "RSA 先 factor n=pq，再 φ=(p−1)(q−1)，最后 d=e⁻¹ mod φ。注意求逆在模 φ 不是模 n；Fermat 分解的想法是找 s²−n=t²，于是 n=(s−t)(s+t)。",
          "验证 ed≡1 (mod φ)（这里的模数是 φ，不是 n）。",
          "Rabin 的 c=m² mod N 形式像 RSA e=2，但 2 与 φ(N) 不互素，不能当合法 RSA 指数；所以“形式相像”不等于“Rabin 就是 RSA 的一个正常参数选择”。",
          "Rabin 解密有 4 个根，必须消歧。",
          "若 oracle 对 c=R² 返回 Y≠±R，则 gcd(R−Y, N) 或 gcd(R+Y, N) 给非平凡因子。",
          "课程修复：QR_N 指模 N 的平方集合；在其中按课程规则选唯一 QR square root。密文写成 ⟨x² mod N, lsb(x) XOR m⟩，第二项帮助消歧；解密接口只返消息 bit、不返 root。通用实现仍配 CCA-secure encoding，绝不裸用 textbook Rabin。"
        ],
        example: {
          title: "不同平方根为何泄漏因子",
          prompt: "R²≡Y² (mod N)。",
          steps: [
            "移项得到 R²−Y²≡0 (mod N)。",
            "因式分解 (R−Y)(R+Y) 是 N 的倍数。",
            "当 Y 不是 ±R mod N 时，N 的两个素因子通常分别整除两个因子。",
            "计算 gcd(R−Y,N) 和 gcd(R+Y,N)。其中一个 gcd 会等于 p 或 q。"
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
        plain: "椭圆曲线点满足曲线方程。点加法用经过 P 和 Q 的直线计算第三个交点，然后对 x 轴反射。P=Q 时使用切线。有限域中的除法使用模逆。每个坐标计算都取 mod p。",
        steps: [
          "先检查点在曲线上；未知 b 用 b≡y²−x³−ax (mod p)。",
          "所有坐标和逆元都在 mod p 下计算。P≠Q 时 λ≡(y2−y1)(x2−x1)⁻¹ (mod p)；P=Q 时 λ≡(3x²+a)(2y)⁻¹ (mod p)。",
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
        plain: "RLWE 把数字列表表示为多项式系数。环关系 y⁸=−1 用于约简高次项。解密计算 c_msg−s·c_aux。结果包含编码消息和小噪声。阈值解码把系数转换为 bit。卷积使用 y⁰→y⁷ 顺序，题面 bit 使用 y⁷→y⁰ 顺序。",
        steps: [
          "第一行写 Rq = Z_q[y]/(y^n+1)，所以系数 mod q 且 y^n = −1。",
          "算 s·c_aux，用普通多项式卷积。",
          "高次项用 y^n = −1 降次，例如 y^(n+r) = −y^r。",
          "逐系数算 c_msg − s·c_aux mod q。",
          "按课程编码将靠近 0 的系数还原 0、靠近 q/2 的系数还原 1；最后把 y⁰→y⁷ 列表反转成题面 y⁷→y⁰，再连成 bit/hex。"
        ],
        example: {
          title: "约简 y^10",
          prompt: "在 Z_83[y]/(y^8+1) 中化简 5y^10。",
          steps: [
            "在商环 Z_83[y]/(y^8+1) 中，y^8≡−1 (mod y^8+1)。",
            "因此 y^10=y^8·y²≡−y² (mod y^8+1)。",
            "两边乘 5，得到 5y^10≡−5y² (mod y^8+1)。",
            "系数再模 83 归一化：−5≡78 (mod 83)。"
          ],
          result: "5y^10≡78y² (mod y^8+1)，且系数按 mod 83 计算。"
        },
        practice: {
          q: "在同一 ring 中 y^16 等于什么？",
          hint: "(y^8)^2。",
          a: "y^16=(y^8)^2≡(−1)^2≡1 (mod y^8+1)。不能把所有高次项都直接删掉。"
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
              "Schnorr/shift 型检查 g^R≡commitment·f(secret)^c (mod p)；本题 c 恒为 1，验证等式即 2^R≡commitment·697 (mod 991)。",
              "攻击者先选 R=333。把 R 拆成二进制位写小步：333 = 5×64 + 13，所以 2^333 = (2^64)^5 · 2^13 mod 991。",
              "代入题给 2^64 mod 991 = 827：先算 2^13 mod 991 = 8192 mod 991；991×8 = 7928；8192 − 7928 = 264。",
              "算 827^2 mod 991 = 683929 mod 991：991×689 = 682799；683929 − 682799 = 1130；1130 − 991 = 139。",
              "算 827^4≡139^2≡492 (mod 991)：139²=19321；991×19=18829；19321−18829=492。",
              "算 827^5≡492·827≡574 (mod 991)：492·827=406884；991×410=406310；406884−406310=574。",
              "于是 2^333≡574·264≡904 (mod 991)：574·264=151536；991×152=150632；151536−150632=904 ✓",
              "由 2^R≡commitment·697 (mod 991)，两边同乘 697⁻¹，得到 commitment≡2^R·697⁻¹≡904·697⁻¹ (mod 991)。",
              "用扩展 Euclid 求 697⁻¹ mod 991：991=1×697+294；697=2×294+109；294=2×109+76；109=1×76+33；76=2×33+10；33=3×10+3；10=3×3+1。逐行反代：1=10−3×3=10−3×(33−3×10)=10×10−3×33=10×(76−2×33)−3×33=10×76−23×33=10×76−23×(109−76)=33×76−23×109=33×(294−2×109)−23×109=33×294−89×109=33×294−89×(697−2×294)=211×294−89×697=211×(991−697)−89×697=211×991−300×697。所以 697⁻¹≡−300≡691 (mod 991)。",
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
              "先声明本解的编码约定：A=0,…,Z=25；双字母 xy 编成 26·x+y（第一字母是 26 的位，第二字母是个位）。故 ma = 26·12+0 =312；il=26·8+11=219；uw=26·20+22=542；ex=26·4+23=127。模数是 26²=676。",
              "已知 ma→uw、il→ex，列出方程：542 ≡ 312a + b (mod 676)；127 ≡ 219a + b (mod 676)。",
              "两式相减消 b：542−127 ≡ (312−219)a，因此 415 ≡93a (mod 676)。这是普通方程的模版本：要“除以 93”，须乘 93 的逆元。",
              "题目给 93⁻¹≡189 (mod 676)。按逆元定义，这表示 93×189≡1 (mod 676)。",
              "先乘回检查：93×189=17577=26×676+1，所以余数确实是 1。",
              "在 415≡93a (mod 676) 两边同乘 189，得到 189×415≡189×93a (mod 676)。",
              "右边按乘法结合律写成 (93×189)a。因为 93×189≡1 (mod 676)，所以 (93×189)a≡a (mod 676)。因此 189×415≡a (mod 676)。",
              "计算左边：189×415=78435=116×676+19，所以 189×415≡19 (mod 676)。与上一行合并，得到 a≡19 (mod 676)，取标准代表元 a=19。",
              "回代 b：b≡542−19·312 (mod 676)。算 19·312=5928；542−5928=−5386；又有 −5386+8·676=22，所以 b≡22 (mod 676)，取标准代表元 b=22。",
              "验证第一组：19·312+22=5950=8·676+542，所以 19·312+22≡542 (mod 676)，对应 uw ✓",
              "验证第二组：19·219+22=4183=6·676+127，所以 19·219+22≡127 (mod 676)，对应 ex ✓"
            ],
            final: "a≡19 (mod 676)，b≡22 (mod 676)；取标准代表元后，Affine digraph private key 是 (a,b)=(19,22)。"
          },
          {
            label:"1(c)(d)",
            ask: "求平方根和椭圆曲线点。",
            steps: [
              "(c) 平方根。先把 hex 转 dec：p=0x20b = 2·256 + 0·16 + 11 = 523；n=0x45d81 = 4·65536+5·4096+13·256+8·16+1 = 262144+20480+3328+128+1 = 286081。",
              "算 q=n/p：286081÷523。先估 523×500=261500；286081−261500=24581；523×47=24581 ✓ 所以 q=547（hex 0x223）。",
              "题给 residues：mod p 根 ±415 即 415 与 523−415=108；mod q 根 ±62 即 62 与 547−62=485。",
              "算 Garner 需要的 p⁻¹ mod q。用扩展 Euclid：547=1·523+24；523=21·24+19；24=1·19+5；19=3·5+4；5=1·4+1。反代：1=5−4=5−(19−3·5)=4·5−19=4·(24−19)−19=4·24−5·19=4·24−5·(523−21·24)=109·24−5·523=109·(547−523)−5·523=109·547−114·523。所以 523⁻¹≡−114≡433 (mod 547) ✓",
              "Garner 公式 x = a + p·((b−a)·433 mod 547)。四个根逐一算：",
              "根 (a_p=415, a_q=62)：u = (62−415)·433 mod 547 = (−353)·433 mod 547。先算 −353 mod 547 = 194；194·433 = 84002；84002 mod 547：547×153 = 83691；84002−83691 = 311。x = 415+523×311 = 415+162653 = 163068。",
              "根 (a_p=415, a_q=485)：u = (485−415)·433 mod 547 = 70·433 = 30310 mod 547；547×55 = 30085；30310−30085 = 225。x = 415+523×225 = 415+117675 = 118090。",
              "根 (a_p=108, a_q=62)：u = (62−108)·433 mod 547 = (−46)·433 mod 547。先算 −46 mod 547 = 501；501·433 = 216933 mod 547；547×396 = 216612；216933−216612 = 321。x = 108+523×321 = 108+167883 = 167991。",
              "根 (a_p=108, a_q=485)：u = (485−108)·433 mod 547 = 377·433 = 163241 mod 547；547×298 = 163006；163241−163006 = 235。x = 108+523×235 = 108+122905 = 123013。",
              "验算每个 x² mod 286081 = radicand 0x3817b = 229755：163068²、118090²、167991²、123013² 四个 mod 286081 均得 229755 ✓",
              "(d) ECC。先求曲线参数 b：把 P=(25,14) 代入 y²=x³+13x+b mod 37，得 b = y²−x³−13x mod 37。",
              "算 14² = 196；25³ = 15625；13·25 = 325。196−15625−325 = −15754。−15754 mod 37：15754÷37 = 425 余 15754−425×37 = 15754−15725 = 29；−15754 mod 37 = −29 mod 37 = 37−29 = 8。所以 b = 8 ✓ 曲线 y² = x³+13x+8 mod 37。",
              "算 2P（point doubling）。λ = (3x_P²+a)/(2y_P) mod p。分子 3·25²+13 = 3·625+13 = 1875+13 = 1888；1888 mod 37：37×51 = 1887；1888−1887 = 1。分母 2·14 = 28。",
              "求 28⁻¹ mod 37：Euclid 37=1·28+9；28=3·9+1。反代 1=28−3·9=28−3·(37−28)=4·28−3·37。所以 28⁻¹≡4 (mod 37)。",
              "λ = 1·4 mod 37 = 4。x_{2P}=λ²−2x_P = 16−50 = −34 mod 37 = 3。y_{2P}=λ(x_P−x_{2P})−y_P = 4·(25−3)−14 = 4·22−14 = 88−14 = 74；74 mod 37 = 0。所以 2P = (3, 0)。",
              "算 3P = 2P+P（不同点加法）。λ = (y_P−y_{2P})/(x_P−x_{2P}) = (14−0)/(25−3) = 14/22 mod 37。",
              "求 22⁻¹ mod 37：Euclid 37=1·22+15；22=1·15+7；15=2·7+1。反代 1=15−2·7=15−2·(22−15)=3·15−2·22=3·(37−22)−2·22=3·37−5·22。所以 22⁻¹≡−5≡32 (mod 37)。",
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
              "约定先置顶：ciphertext tuple 第一项是 c_aux、第二项是 c_msg。ring R_q=Z_83[y]/(y^8+1)：每个系数都 mod 83，而 y^8=−1。这里“−1”表示超过 y^7 的项折回时要变号，不能直接丢掉。",
              "题面从左到右写 y^7→y^0；但我们做卷积时用 y^0→y^7 列表。于是把题面两列倒过来：c_aux=[57,18,62,48,30,57,55,74]；c_msg=[2,12,65,50,1,50,2,39]。方括号第 0 项就是常数项 y^0。",
              "s = y^7 + 2y，按 y^0→y^7 也写成系数 [0, 2, 0, 0, 0, 0, 0, 1]。",
              "算 s·c_aux = 2y·c_aux + y^7·c_aux。先算 2y·c_aux：把 c_aux 整体右移 1 位并乘 2；y^8 = −1 让超出 y^7 的项折回：y^0 系数 = −2·c_aux[y^7] = −2·74 = −148；y^1 = 2·57 = 114；y^2 = 2·18 = 36；y^3 = 2·62 = 124；y^4 = 2·48 = 96；y^5 = 2·30 = 60；y^6 = 2·57 = 114；y^7 = 2·55 = 110。",
              "再算 y^7·c_aux：把 c_aux 右移 7 位；超过 y^7 的项也折回为负：y^0 = −c_aux[y^1] = −18；y^1 = −c_aux[y^2] = −62；y^2 = −c_aux[y^3] = −48；y^3 = −c_aux[y^4] = −30；y^4 = −c_aux[y^5] = −57；y^5 = −c_aux[y^6] = −55；y^6 = −c_aux[y^7] = −74；y^7 = c_aux[y^0] = 57。",
              "两项相加逐系数 mod 83：y^0 = (−148)+(−18) = −166 mod 83 = −166+2·83 = 0；y^1 = 114+(−62) = 52；y^2 = 36+(−48) = −12 mod 83 = 71；y^3 = 124+(−30) = 94 mod 83 = 11；y^4 = 96+(−57) = 39；y^5 = 60+(−55) = 5；y^6 = 114+(−74) = 40；y^7 = 110+57 = 167 mod 83 = 167−2·83 = 1。所以 s·c_aux = [0, 52, 71, 11, 39, 5, 40, 1]。",
              "算 c_msg − s·c_aux 逐系数 mod 83：y^0 = 2−0 = 2；y^1 = 12−52 = −40 mod 83 = 43；y^2 = 65−71 = −6 mod 83 = 77；y^3 = 50−11 = 39；y^4 = 1−39 = −38 mod 83 = 45；y^5 = 50−5 = 45；y^6 = 2−40 = −38 mod 83 = 45；y^7 = 39−1 = 38。结果 [2, 43, 77, 39, 45, 45, 45, 38]。",
              "转回题面 y^7→y^0 顺序倒着读：[38, 45, 45, 45, 39, 77, 43, 2]。",
              "为什么阈值这样设：编码 0 的中心在 0（mod 83），编码 1 的中心在 q/2≈41.5。噪声不太大时，离 41.5 较近的中间区间 [q/4,3q/4] 读作 1；靠近 0 或 83 的两端读作 0。故 q=83 时用约 [21,62]。",
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
              "先画数据流：128-bit IV/register → AES encryption → S_8 → XOR with C1。S_8 不是随手截一个 byte，而是讲义定义的“取最高有效 8 bits”。",
              "最高有效（MSB）就是通常书写的 hex 串最左边/开头的 byte。题给 E_k(IV) 开头是 EA，所以 K1=0xEA=1110 1010；末尾的 DF 不参与这一步。",
              "题给 C1 = 0x20 = 0010 0000。",
              "CFB 此处像流密码：加密是 C1=P1 XOR K1。因为 XOR 同一把 K1 两次会抵消（K1 XOR K1=0），解密可用同一式 P1=C1 XOR K1。逐位算：0010 0000 XOR 1110 1010=1100 1010=0xCA。",
              "注意：课程定义 S_8 取 MSB（首 byte），所以 K1 = 0xEA 不是末 byte 0xDF。如果取末 byte，会得到 0x20 XOR 0xDF = 0xFF，答案是错的。"
            ],
            final: "plaintext byte = 0xCA。关键约定：S_8 取 E_k(IV) 的 MSB 8 bits（首 byte），不能改成末 byte DF。"
          },
          {
            label:"2(c)",
            ask: "完整解释 ETM，并与 E&M/MTE 分开比较。",
            steps: [
              "ETM = Encrypt Then MAC。发送：C=Enc_Ke(M;IV)，T=MAC_Km(IV||C)，发送 IV, C, T。",
              "E&M 的 equality leak 用一个两消息游戏就能看见：攻击者选不同 m0,m1，并预先得到 m0 的 deterministic plaintext tag。challenge 返回 m_b 的 tag；若它等于已存的 m0 tag，就猜 b=0，否则猜 b=1。故 tag 本身已经泄漏哪条明文被选中。",
              "MTE/decrypt-before-auth 是另一问题，可能暴露 padding/格式 oracle，不要与 E&M 的 deterministic-tag 泄漏混。",
              "接收端用 Km 重算 MAC(Km,IV||C) 并比较 tag；课程要求 invalid/valid 路径的可观察时间尽量相同，所以实现可做等成本或 dummy decrypt。但 invalid 永远只返回统一 null；valid 才释放真正 plaintext。",
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
              "先解释 Fermat 为什么可用：若 n=pq 且 p,q 接近，令 s=(p+q)/2、t=(q−p)/2，就有 n=s²−t²=(s−t)(s+t)。所以从 ceil(√n) 往上找一个使 s²−n 成平方数的 s。",
              "n=790199209；28110²=790172100<n，而 28111²=790228321>n，所以起点 s=ceil(√n)=28111。",
              "从 s=28111 开始逐个试：算 s²−n 是否为完全平方。28111²−n = 790228321−790199209 = 29112；√29112 ≈ 170.6，不整。",
              "s=28112：28112² = 28111²+2×28111+1 = 790228321+56223 = 790284544；减 n = 85335；√85335 ≈ 292.1，不整。",
              "s=28113：28113² = 28112²+2×28112+1 = 790284544+56225 = 790340769；减 n = 141560；√141560 ≈ 376.2，不整。",
              "s=28114：28114² = 28113²+56227 = 790340769+56227 = 790396996；减 n = 197787；√197787 ≈ 444.7，不整。",
              "s=28115：28115² = 28114²+56229 = 790396996+56229 = 790453225；减 n = 254016；√254016 = 504 ✓ 完全平方！",
              "所以 p = s−t = 28115−504 = 27611；q = s+t = 28115+504 = 28619。",
              "算 φ(n) = (p−1)(q−1) = 27610×28618。先算 27610×28000 = 773080000；27610×618 = 27610×600+27610×18 = 16566000+496980 = 17062980；合 773080000+17062980 = 790142980。所以 φ = 790142980。",
              "求 d=e⁻¹ mod φ，即求 564387843⁻¹ mod 790142980。先做 Euclid 除法：790142980=1×564387843+225755137；564387843=2×225755137+112877569；225755137=1×112877569+112877568；112877569=1×112877568+1。再反代：1=112877569−112877568=2×112877569−225755137=2×(564387843−2×225755137)−225755137=2×564387843−5×225755137=2×564387843−5×(790142980−564387843)=7×564387843−5×790142980。因此 d=7。最后验证：564387843×7=3950714901=5×790142980+1。"
            ],
            final: "RSA private exponent d=7；n 的因数为 p=27611、q=28619。"
          },
          {
            label:"3(b)",
            ask: "讨论 Rabin 与 RSA 关系，完成攻击并给课程版防御。",
            steps: [
              "i) Rabin c=m² mod N 形式像 RSA 把指数写成 e=2。这只是一句代数外形的类比：标准 RSA 要 gcd(e,φ(N))=1 才有 d=e⁻¹ mod φ(N)。Blum integer 的 φ(N) 为偶数，故 gcd(2,φ(N))≠1，e=2 不可逆；Rabin 又有 4 个平方根。因此它不是普通 RSA 的合法参数特例。",
              "ii) 攻击者选 R=23769451，先算 C = R² mod N = 23769451² mod 47479253。23769451² 太大不必全展开——用计算器算 23769451² mod 47479253 = 23004433。攻击者把 C = 23004433 提交给 Rabin oracle。",
              "oracle 返回 Y = 31423469（C 的一个平方根，且 Y ≠ ±R mod N）。",
              "计算 gcd(|R−Y|,N)，其中 |R−Y|=7654018。完整 Euclid 表的最后非零余数是 13523。",
              "计算 gcd(R+Y,N)，其中 R+Y=55192920。完整 Euclid 表的最后非零余数是 3511。",
              "验证 13523 × 3511 = ?：先 13523×3000 = 40569000；13523×500 = 6761500；13523×11 = 148753；合 40569000+6761500+148753 = 47478253。差 1000——重算 13523 × 3511 = 13523×3500 + 13523×11 = 47330500 + 148753 = 47479253 = N ✓",
              "iii) 攻击使用 composite modulus 下的不同平方根。由 R²≡Y² (mod N)，可得 N 整除 (R−Y)(R+Y)。若 Y≢R (mod N) 且 Y≢−R (mod N)，计算 gcd(R−Y,N) 或 gcd(R+Y,N) 可以得到非平凡因子。",
              "课程防御：QR_N 是模 N 的平方集合；在其中按规则选唯一 QR square root。密文用 ⟨x² mod N,lsb(x) XOR m⟩，第二项帮助从根恢复消息 bit；解密 oracle 只返消息、不返 root。通用系统还要 CCA-secure padding。"
            ],
            final: "Rabin 形式像 e=2，但不是合法 RSA 特例；用 R²→不同根 Y 的 gcd 可分解 N，得 p=13523、q=3511。"
          },
          {
            label:"3(c)",
            ask: "验证 ECDSA signature (1, 6)。",
            steps: [
              "先算 h = H(M) mod q = 22 mod 7。22÷7 = 3 余 1，所以 h = 1。",
              "算 w=s⁻¹ mod q=6⁻¹ mod 7。Euclid 除法只有一行：7=1×6+1。改写得 1=7−6=1×7+(−1)×6。6 的系数是 −1，取模 7 后是 6，所以 w=6。验证：6×6=36=5×7+1。",
              "算 u1 = h·w mod q = 1×6 mod 7 = 6。",
              "算 u2 = r·w mod q = 1×6 mod 7 = 6。",
              "题目给 5P=(4,6)、P=(13,2)，所以 6P=5P+P。用同一顺序相减，斜率分子是 6−2=4，分母是 4−13=−9≡8 (mod 17)。求 8⁻¹ mod 17：17=2×8+1，所以 1=17−2×8，故 8⁻¹≡−2≡15 (mod 17)。验证 8×15=120=7×17+1。于是 λ≡4×15≡9 (mod 17)。再算 x≡9²−4−13≡13 (mod 17)，y≡9×(4−13)−6≡15 (mod 17)。因此 6P=(13,15)。",
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
      title: "神经网络的输入、parameter 和 loss",
      intro: "神经网络根据输入计算输出。Weight 和 bias 是可训练 parameter。Loss 衡量输出与目标的差。Backpropagation 计算每个 parameter 对 loss 的影响。Optimizer 根据这些导数更新 parameter。",
      blocks: [
        {t:"输入、输出和目标",p:"x 是模型输入。prediction 是模型输出。target 是训练目标。Loss 比较 prediction 和 target。"},
        {t:"Tensor shape",p:"H×W×C 表示高度、宽度和通道数。224×224×3 表示高 224、宽 224、通道数 3。"},
        {t:"Parameter sharing",p:"全连接层通常为每条连接保存 weight。卷积层在所有空间位置共享同一个 filter。输出 activation 不是新的 parameter。"},
        {t:"数据集用途",p:"Training data 更新 weight 和 bias。Validation data 选择 hyperparameter。Test data 只评估已经确定的方案。"}
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
      ["Encoder / 编码器","把输入 x 映射为 latent vector z 的网络部分。z 可以比 x 维度低。"],
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
      ["Self-attention","每个 token 用 query 与所有 key 计算匹配分数，再对 value 作加权求和。"],
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
      ["Attention / 注意力","用 query 与所有 key 计算匹配分数，再对相应 value 作加权求和，得到每个 token 的上下文表示。"],
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
        plain: "一个 neuron 计算 z=w·x+b。x 是输入向量。w 是权重向量。b 是偏置。activation function 把 z 转换为输出。loss 衡量输出与目标的差。backprop 计算 loss 对每个 parameter 的导数。",
        steps: [
          "先给每个符号一个工作：x=(x₁,x₂,…) 是数据；w=(w₁,w₂,…) 是每项输入的音量旋钮；b 是在任何输入进来前统一加上的常数。w·x 是 w₁x₁+w₂x₂+…。",
          "算完 z 后过 activation。例如 ReLU(z)=max(0,z)：z 是正数就保留，z 是负数就变 0。为什么要它？没有 activation 时，多层“乘加”合起来仍只是一层乘加，画不出弯曲的边界。",
          "这一次从输入走到输出叫 forward pass。把输出 y 和正确目标 target 比较，得到 loss；loss 越小，表示这一次答得越接近目标。",
          "backprop 不需要你先会整套微积分：它是沿着刚才的计算倒着问“改动这个旋钮会让 loss 怎样变”。gradient 给方向；optimizer 以 learning rate 控制步子大小。"
        ],
        example: {
          title: "手算一个 ReLU neuron",
          prompt: "x=(2, −1)，w=(3, 4)，b=−1。",
          steps: [
            "点积 w·x = 3×2 + 4×(−1) = 6 − 4 = 2。",
            "加 bias：z = 2 + (−1) = 1。",
            "ReLU(z) = max(0, 1) = 1。",
            "若 target=3，先算误差 y−target=1−3=−2。用单样本平方误差 loss=(y−target)²，所以 loss=(−2)²=4；平方让正负错误都算作错。",
            "若这一步发现 loss 太大，训练会利用梯度分别微调 3、4、−1；不是一次把输出直接改成 3。"
          ],
          result: "输出 1，loss 4；每个数都有清楚来源。"
        },
        practice: {
          q: "若同一 neuron 的 z = −2，ReLU 输出多少？",
          hint: "ReLU = max(0, z)。",
          a: "输出 0，因为 max(0,−2)=0。补充理解：负区间导数为 0，所以如果一个 unit 长期落在这里，它收到的更新可能为 0，称 dead ReLU；本题先记“负数截成 0”即可。"
        }
      },
      {
        plain: "Autoencoder 使用输入 x 作为训练目标。Encoder 把 x 映射为 latent vector z。Decoder 把 z 映射为 reconstruction x̂。x̂ 必须与 x 具有相同维度，才能逐项计算 reconstruction loss。",
        steps: [
          "x∈R^D 的意思不是高深符号：x 是有 D 个数的一列/一行数据。例如一张小灰度图有 4 个像素，就可把它看作 D=4。encoder 把这 D 个数变成 z∈R^d。",
          "本课首先使用 bottleneck d<D。latent vector 的维度少于输入维度。overcomplete autoencoder 使用 d≥D。它需要 sparsity 或 denoising 等限制，以减少学习 identity mapping 的风险。",
          "decoder 再把 z 变为 x̂∈R^D。这里帽子 x̂ 读作“x-hat”，表示模型对 x 的猜测/重建，不是一个新的真实标签。D 对 D 才能做第 1 格减第 1 格、第 2 格减第 2 格。",
          "课程主损失是 reconstruction MSE：L_recon=(1/N)Σ_n||x_n−x̂_n||²。Σ_n 是把 N 个训练样本的错误加起来；||…||² 是同一条样本内每个格子差值平方后相加。平方避免正误差和负误差互相抵消，也更重罚大错。",
          "可选 L_total=L_recon+λ||z||₁。||z||₁ 是 z 各分量绝对值之和；λ 是你手动设的强度。加它是为了鼓励多数 latent 单元安静（稀疏），并非说普通 autoencoder 必须有 KL。",
          "训练结束后常把 decoder 暂时拿掉：只算 z=encoder(x)。z 比原始输入短小又包含训练学到的模式，可作分类特征、聚类坐标、可视化坐标或异常分数的输入。"
        ],
        example: {
          title: "4 维输入的压缩 autoencoder",
          prompt: "结构 4→2→4。",
          steps: [
            "输入是 4 个数，所以 D=4。",
            "encoder 输出 2 个数，所以 embedding dimension d=2。",
            "decoder 输出必须为 4 个数才能逐维与输入比较。",
            "假设 x=(2,0,1,3)，decoder 给 x̂=(1,0,2,3)。逐格误差是 (1,0,−1,0)；平方是 (1,0,1,0)。MSE=(1+0+1+0)/4=0.5。",
            "这 0.5 不是 z 的维度，也不是参数数；它只是“这一次重建错多少”的分数。训练会尝试改 encoder/decoder 的 weights，让以后这个数更小。"
          ],
          result: "embedding 是 2 维；最终 reconstruction 是 4 维；不要混淆两者。"
        },
        practice: {
          q: "今年卷问 embedding 相对 D 的维度，最稳的作答顺序？",
          hint: "先写讲义典型设计，再写例外。",
          a: "课程的主要设计使用 d<D。encoder 把输入映射为较低维表示。d≥D 的设计也存在，但必须加入 sparsity 或 denoising 等限制。否则模型可能只学习 identity mapping。"
        }
      },
      {
        plain: "CNN 使用同一个 filter 扫描输入的不同位置。每个位置产生一个 activation。所有位置共享同一组 filter weights。parameter 数量取决于 filter shape 和输出通道数。activation 数量取决于输出 tensor shape。",
        steps: [
          "先读 H×W×C：H/ W 是图的高/宽；C 是每个像素有几层数字。彩色 RGB 图的 C_in=3，不是说图里只有 3 个像素。",
          "一个 3×3 filter 每个空间格都要看 RGB 三层，所以 weight 数=3×3×3=27。一般公式是 k_h×k_w×C_in；它只数模板格子，不数模板放了多少次。",
          "一个 filter 产生一个 output channel，并有一个 bias。若需要 C_out=64 个不同的模式探测器，就有 64 个不同 filter：总参数=(k_h×k_w×C_in+1)×C_out。",
          "H×W×C_out 是 output activation 的个数：它告诉你模型这层算出了多少个分数，不是有多少独立旋钮。写答案时可以在数字后直接标 ‘activations’ 或 ‘learnable parameters’。",
          "same padding 是边缘补 0；stride 1 是每次挪 1 格，所以卷积后 H/W 不变。2×2 stride 2 max pooling 每 2×2 小窗只留下最大的一个，高宽各减半、通道 C 不变，而且它没有 weight/bias。",
          "FC 与卷积相反：每个输出 neuron 都连到所有 n_in 输入，通常不共享，因此 parameters=(n_in+1)×n_out。+1 仍是每个输出 neuron 的 bias。"
        ],
        example: {
          title: "VGG 第一层完整计算",
          prompt: "224×224×3，64 个 3×3 filters。",
          steps: [
            "每个 filter 权重数 = 3×3×3 = 27。",
            "每个 filter 加 1 bias，共 28 parameters。",
            "64 filters 共 28×64 = 1,792。",
            "same/stride1 后，每一张 filter 都在 224×224 个位置给一个分数；64 张 filter 叠起来，所以 output shape=224×224×64。这是 3,211,264 个 activation，不是 3,211,264 个 parameter。",
            "随后 2×2/stride2 pool 把每张 224×224 feature map 分成不重叠的 2×2 小窗，每窗留最大值，所以得到 112×112×64；通道 64 不变，pool 本身仍是 0 个 learnable parameter。"
          ],
          result: "1,792 parameters；卷积输出 224×224×64；池化输出 112×112×64。"
        },
        practice: {
          q: "为什么不把 224×224 乘进参数数目？",
          hint: "同一 filter 在不同位置是否被重复使用？",
          a: "因为同一组 3×3×3 weights 被从左上到右下反复使用。224×224 只决定它会产生多少个 output activation，不会给每一个位置发一套新 weights。相反，FC 层才是每条连接各有独立 weight。"
        }
      },
      {
        plain: "Transformer 是 CS636 扩展。Attention 为每个 token 计算 query、key 和 value。Query 与所有 key 的点积产生 score。Softmax 把 score 转换为权重。输出是 value 的加权和。",
        steps: [
          "先写 shape：若有 T 个 token，每个 head 的 query/key 宽度是 d_k、value 宽度是 d_v，则 Q,K 的 shape 是 T×d_k，V 是 T×d_v。第 i 行就是第 i 个 token 的向量。",
          "QKᵀ 的 shape 是 T×T。第 i 行第 j 列是 token i 的 query 和 token j 的 key 的点积：它是 ‘i 觉得 j 多相关’ 的原始分数。转置 Kᵀ 只是为了让每一个 Q 都能和每一个 K 相乘。",
          "scores=QKᵀ/√d_k。d_k 大时，许多乘积相加会让 score 绝对值偏大；除以 √d_k 把数值拉回温和范围，softmax 才不会过早变成几乎 100%/0%。",
          "softmax 按每一行做：把 score 变成非负、总和为 1 的 weights。然后 weights×V；第 i 行输出就是所有 V 的加权平均，权重大者贡献更多。",
          "causal mask 会让未来位置的 score 在 softmax 前变成极小值，所以生成第 i 个词时不能访问后面的位置。padding mask 忽略补齐空格。multi-head 在不同投影空间分别计算 Q/K/V 和 attention，再把各组结果 concat。",
          "attention 单独不携带先后顺序，所以加 positional encoding。residual 把旧 x 加回新 F(x)，避免有用信息被层层冲掉；normalisation 让各层数值尺度更稳定。"
        ],
        example: {
          title: "2 个 token、1 维 value 的最小 attention 算例",
          prompt: "对 token A，已算出两个 scaled score 是 [0, ln 3]，两个 value 分别是 V_A=2、V_B=10。这里 d_k=1，所以不用再除 √d_k。",
          steps: [
            "softmax([0,ln 3]) 的未归一化数是 [e⁰,e^(ln3)]=[1,3]。",
            "归一化：总数 1+3=4，所以 weights=[1/4,3/4]。它们相加刚好为 1。",
            "A 的 attention output=(1/4)×2+(3/4)×10=0.5+7.5=8。",
            "第二个 token B 的 weight 更大，所以 A 的新表示更接近 B 携带的 value=10。高 weight 表示当前层中 B 的 value 对加权和贡献更大，不等于人类因果解释。"
          ],
          result: "attention weight 决定各 value 在加权和中的比例，不自动等于人类可解释的因果重要性。"
        },
        practice: {
          q: "为什么要除以 √dk？",
          hint: "维度变大时点积方差怎样改变？",
          a: "d_k 个乘积相加后，score 的典型大小随维度增加。若直接把大 score 输入 softmax，最大输出会接近 1。其余输出会接近 0。这是 softmax 饱和。饱和会减小梯度。除以 √d_k 可控制 score 的大小。"
        }
      },
      {
        plain: "Training data 用于更新 parameter。Validation data 用于选择 hyperparameter 和模型结构。Test data 用于最终评估。若 test 结果影响模型选择，test data 已发生泄漏，不能再提供独立评估。",
        steps: [
          "先分数据，并只用 train 算预处理统计量。例如像素均值、标准差只能从 train 算；若先看所有数据的均值，就已让未来/测试资料泄漏进训练流程。",
          "parameters 是模型内部会被梯度直接改的 w/b。固定一套方案后，用 train 的 loss 做 forward→loss→backprop→SGD/Adam，反复更新它们。",
          "hyperparameters 是训练规则本身，例如 learning rate、batch size、层数、dropout、L2 强度；它们不会在一次 backprop 中自动从数据直接求出。针对每一套候选方案训练后，看 validation metric 决定哪套更好，也可据 validation early stopping。",
          "本地讲义的说法是：test 用来 benchmark several optimized machines。考场最稳可写：先以 train/validation 得到已优化且选择规则冻结的模型，再在 test 做 benchmark/final evaluation。",
          "如果 test 分数出来后你又改模型、换超参数或挑其中一个，test 实际参与了选择。此时要再保留一个从未参与选择的 final hold-out，才能声称最后结果无偏。"
        ],
        example: {
          title: "选择 learning rate",
          prompt: "候选 0.1、0.01、0.001。",
          steps: [
            "为 0.1、0.01、0.001 各建一份相同结构的模型；它们只能在 training set 上更新 w/b。这里变的是 learning rate，不是 data split。",
            "用同一份 validation set 计算 accuracy/loss。假设三者 validation accuracy 是 80%、88%、85%，选择 0.01；选择依据必须写清，不是挑 test 看起来最好的一项。",
            "冻结这个决定（也不再因 test 结果换层数），再在 test 上 benchmark。test 得 86% 时，86% 才可作为这套已冻结流程的最终估计。",
            "若看到 86% 后再改回 0.001 并比较两者，就把原 test 当作挑方案的依据了；它失去独立性，需要另留 final hold-out。"
          ],
          result: "train 学参数，validation 选超参数；test benchmark 冻结方案。用 test 做了选择就另留 hold-out。"
        },
        practice: {
          q: "反复查看 test accuracy 再改模型，有什么问题？",
          hint: "test 是否还代表未见数据？",
          a: "这是 test leakage：你虽然没有把 test 样本拿去更新 weight，却把它的分数当作了模型选择线索。于是模型/流程间接迎合这份 test，分数会偏乐观；它不再代表未知未来数据。"
        }
      },
      {
        plain: "可逆映射为每个输出提供唯一输入。ReLU、max pooling 和降维通常不可逆，因为多个输入可以产生同一输出。Normalizing Flow 组合多个可逆层。它可以从 z 计算 x，也可以从 x 计算 z。",
        steps: [
          "一一对应表示：没有两个不同的 x 会得到同一个 y；并且每个 y 都能找到对应 x。存在逆函数 f⁻¹，写作 x=f⁻¹(y)。这是‘可逆’的定义，不只是‘能大概 reconstruct’。",
          "flow 通常要求 z 和 x 具有相同维度。从 4 维映射到 2 维通常会丢失信息。普通 bottleneck autoencoder 的 decoder 计算近似重构。它不是 encoder 的严格数学逆函数。",
          "方向一（生成）：先从简单分布采 z，例如 z∼N(0,I)，再 x=f(z) 造出样本。方向二（评估）：给真实 x，倒算 z=f⁻¹(x)，看看它在简单分布下有多合理。",
          "change of variables 不要死背：一个映射把小区域拉宽时，同样的概率质量要铺到更大面积，密度就要变小；压窄时密度变大。Jacobian J 记录局部拉伸，|det J| 记录体积倍率。",
          "因此 log p_X(x)=log p_Z(f⁻¹(x))−log|det J_f(f⁻¹(x))|。‘exact likelihood’ 这句必须带条件：f 可逆、可微，而且 determinant 能高效算；不是任意可逆神经网络都便宜。",
          "VAE、GAN、diffusion 都是生成模型扩展，但训练目标不同：VAE 用 ELBO，GAN 分辨真假，diffusion 学去噪；不要仅因它们会生成就把它们写成 normalizing flow。"
        ],
        example: {
          title: "线性层何时可逆",
          prompt: "先看一维 y=2x+1，再把条件推广到 y=Wx+b。",
          steps: [
            "给 y=7，先消掉 +1：7−1=6；再除以 2，x=3。所以逆函数是 x=(y−1)/2，每个 y 都只有一个 x。",
            "这层的导数/Jacobian 是 2，表示小长度被放大 2 倍。若 z 的密度在对应位置是 0.4，那么 x 的密度是 0.4/|2|=0.2：同一质量摊到两倍长度上。",
            "多维 y=Wx+b 时，先做 y−b，再看 W。W 必须是方阵且 det(W)≠0；这样 x=W⁻¹(y−b) 才存在且唯一。",
            "若 W 把高维压到低维，或 det(W)=0，就有多个 x 得到同一 y；例如 y=x₁+x₂，(1,0) 和 (0,1) 都得到 1，不能唯一倒回。"
          ],
          result: "可逆线性层需非奇异方阵 W。"
        },
        practice: {
          q: "普通 bottleneck autoencoder 的 encoder 通常可逆吗？",
          hint: "D 维压到 d<D。",
          a: "通常不可逆。D 维压到 d<D 维时，多个不同输入可能得到同一个 z，信息已丢；decoder 只是从常见训练模式猜一个近似 x̂，不是保证唯一倒回原 x 的严格逆函数。"
        }
      },
      {
        plain: "伦理答案必须说明具体系统、风险机制、受影响者和实际伤害。然后，答案必须给出测量方法、审计方法和缓解措施。只列出 bias 或 privacy 不能说明风险如何产生。",
        steps: [
          "第一句选具体系统和 stakeholder：例如警务场景的人脸识别，stakeholder 可以是被识别的公众、误报的个人、使用系统的机构。不要只写‘用户’。",
          "第二句写机制：数据可能对某些群体较少/标错；优化目标可能只追 overall accuracy；部署者可能在高风险场景把自动分数当最终决定。具体机制才解释了风险从哪里来。",
          "第三句写看得见的伤害：某群体 false positive 更高会带来错误盘查、拒绝机会或名誉损失；抓取私密资料可能带来暴露、再识别、版权侵害。",
          "第四句让方案可检查：按群体报告 false-positive/false-negative rates、审计数据来源和 licence、做人工复核与申诉渠道、限制用途/保存期限、持续监控漂移。",
          "最后别过度承诺：删除姓名不等于无法再识别；一个 explanation 也不等于模型因果正确或公平。技术措施通常要和政策/治理一起用。"
        ],
        example: {
          title: "招聘模型的偏差",
          prompt: "历史招聘数据中某群体录取率低。",
          steps: [
            "场景/受影响者：公司用模型筛简历，候选人尤其是过去录取率较低的群体会被系统影响。",
            "机制：模型把历史招聘决定当 label；若历史中存在结构性偏见，训练会把相关代理特征当成‘好员工’信号。",
            "伤害：能力相近的候选人可能因群体关联而被系统性低估，失去面试机会；公司也会错过人才。",
            "测量：按群体报告选择率、TPR/FPR，检查训练资料覆盖和特征是否是受保护属性的代理；不是只报告一个总 accuracy。",
            "缓解：审计和重整数据/标签，限制高风险特征，使用公平约束或阈值复核，保留人工审查和申诉，并持续监控。"
          ],
          result: "完整伦理答案含场景、机制、伤害、测量、缓解五部分。"
        },
        practice: {
          q: "“删除姓名就没有隐私风险”对吗？",
          hint: "其他特征能否重新识别个人？",
          a: "不对。位置、年龄、时间、行为等组合常可重新识别一个人；模型还可能记住训练中的罕见内容。合理回答要同时写数据最小化、用途/访问控制、来源与同意审计、隐私风险评估，必要时使用合适的隐私保护方法。"
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
              "两种方法都给模型输入并用训练目标计算 loss，再通过 gradient descent 或 Adam 更新 parameters。最先要写清的差别是监督信号来源：supervised 的 target 来自外部标注，self-supervised 的 target 由未标注数据本身构造；它们常用的预训练任务、数据规模和下游使用方式也可能不同。",
              "Supervised learning 的 target 来自人工/外部 label。例：给一张图，人提前打标签“这是猫”；模型学的是输入→标签的映射。",
              "Self-supervised learning 的 target 由数据自身构造，不需要人打标签。例：① 把图片遮住一块，让模型预测被遮部分；② 把句子挖一个词，让模型预测那个词；③ 让 autoencoder 重建整张输入图。",
              "再看差异：supervised 学到的通常就是最终任务（如直接分类）；self-supervised 常先只学 general representation（怎么把数据编码成有用向量），再把这个 encoder 拿去做下游任务（分类、检测、检索等）。",
              "Self-supervised learning 仍有 target。系统从数据生成 target，例如原输入或被遮盖部分。它仍使用 loss 和梯度更新 parameter。"
            ],
            final: "Supervised 的监督信号来自人工或外部标签；self-supervised 从数据本身构造监督信号。两者都仍有 target、loss 和梯度优化，但训练任务与下游使用方式也可能不同，不能说二者“只有标签来源不同”。"
          },
          {
            label:"1(b)(c)",
            ask: "定义 autoencoder 并说明输出维度。",
            steps: [
              "先给它一句定义：autoencoder 是由 encoder 和 decoder 组成的网络，训练任务是把输入本身重构回来。这里不是给图贴猫/狗标签，而是‘输入是什么，就尽量输出什么’。",
              "把计算链写全：x --encoder f--> z --decoder g--> x̂。等价地，z=f(x)，x̂=g(z)。x 是原始输入；z 是中间 embedding/latent；x̂（x-hat）是模型重建出的输入。",
              "为什么 x̂ 必须与 x 同维？例如 x 有 D=4 格 [x₁,x₂,x₃,x₄]，loss 要逐格做 xᵢ−x̂ᵢ；若 x̂ 只有 2 格，连第 3、4 格都没有对应对象，不能作完整 reconstruction comparison。",
              "因此若 x∈R^D，最终 x̂∈R^D。千万不要把中间 z∈R^d 当成最终输出；d 是 encoder 的中间空间宽度，典型 bottleneck 才会取 d<D。",
              "考场两句模板：‘An autoencoder learns x̂=g(f(x)) to reconstruct x. Hence, for x∈R^D, the reconstruction x̂ is also in R^D; z∈R^d is the latent embedding, not the final output.’"
            ],
            final: "Autoencoder：z=f(x)，x̂=g(z)，训练令 x̂≈x。若 x∈R^D，则最终 reconstruction x̂∈R^D；z∈R^d 只是中间 embedding，绝不能把 d 当最终输出维度。"
          },
          {
            label:"1(d)(e)",
            ask: "解释 embedding 与 loss。",
            steps: [
              "embedding space 是所有 z 向量构成的空间。若 encoder 把每张图片变成 2 个数，那么每张图片对应一个平面坐标 z=(z₁,z₂)。相似样本可能在这个坐标空间中距离较近。",
              "先按本课主线答维度：经典 bottleneck 取 d<D。原因不是数学规定，而是格子更少会迫使 encoder 选择什么信息要保留。题目问典型结构时，这一句要放在最前面。",
              "loss 先逐字拆开：x_n 是第 n 个输入，x̂_n 是它的重建；x_n−x̂_n 是误差；||…||² 是同一样本内各维误差平方和；Σ_n 把 N 个样本加起来；1/N 取平均。",
              "所以最稳课程公式是 L_recon=(1/N)Σ_n||x_n−x̂_n||²。最小例：x=(2,0)，x̂=(1,2)，平方误差=(2−1)²+(0−2)²=1+4=5；若按维度平均则是 5/2。只要说明你采用的平均约定即可。",
              "可再写 L_total=L_recon+λ||z||₁：λ 是人为设置的权衡强度，L1 项让很多 z 分量接近 0（sparsity）。这贴合讲义；BCE 只在明确的伯努利/归一化输出建模下再提，KL 不是普通 autoencoder 默认必需项。"
            ],
            final: "Embedding 是 encoder 的中间 z 空间；今年先写典型 d<D。loss 主答案是 L_recon=(1/N)Σ||x−x̂||²，可加 λ||z||₁ 促 sparsity；重建 target 永远是输入 x 本身。"
          },
          {
            label:"1(f)",
            ask: "训练后怎样用 encoder？",
            steps: [
              "训练好后先做的事很简单：把 decoder 暂时不用，只保留 z=encoder(x)。每个新输入现在都有一串较紧凑的 feature 数字 z。",
              "为什么有用：原始图片/文本往往很长，z 经过重构训练后可能保留形状、主题等共性，丢掉噪声和重复；下游模型面对更小、较有组织的输入会更方便。",
              "写出至少两个用途。可以把 z 输入分类器。可以对 z 做 clustering。可以把低维 z 用于 visualisation。也可以用 z 做检索或异常检测。",
              "下游开始时可 freeze encoder（不改旧 weights，只训练新分类头）；若有足够目标任务数据，也可 fine-tune（连 encoder 一起小步调整）。说明这点会比只列用途更完整。"
            ],
            final: "保留 encoder，令每个新 x 变为 z。z 可作分类特征、聚类/可视化坐标、检索表示或异常检测依据；可先 freeze，再按数据量 fine-tune。"
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
              "从题图给的输入开始写：224×224×64。前两个数是每一张 feature map 的高和宽，64 表示有 64 张不同 filter 产生的 feature map。",
              "max pooling 的 2×2 window 不带可学 weight；它只看一个 2×2 小格里的四个 activation，留下其中最大的那个。例如 [1,7;3,2] 会留下 7。",
              "stride=2 表示窗口每次横/竖跳两格，所以这些 2×2 窗口不重叠。高方向一共有 224/2=112 个窗口，宽方向同理 112 个。",
              "pooling 是在每一个 channel 内分别做同样的缩小；它不会把 64 张 map 合成一张。因此最后一维仍是 64。",
              "因此 output shape=112×112×64。该层产生 112×112×64 个 activation。Pooling 层没有 learnable parameter。activation 数量和 parameter 数量是不同的量。"
            ],
            final: "2×2、stride 2 max pooling：每个 2×2 窗留最大值，高宽各减半、channel 不变，所以 224×224×64→112×112×64；它没有 learnable parameters。"
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
              "梯度要分三种情况：x>0 时 ReLU'(x)=1；x<0 时 ReLU'(x)=0；x=0 时数学上不可导。深度学习实现必须为 x=0 选一个反传约定，常见实现取 0。正区间导数为 1，不像 sigmoid 的饱和区那样继续缩小梯度，但这不保证整网永远没有梯度消失。",
              "副作用：负区间梯度恒 0 可能导致“dead ReLU”——某些 unit 一旦被推到负区域就再也不更新，输出恒 0。常见缓解手段：合适的初始化、较小学习率、或用 Leaky ReLU / PReLU 等变体。",
              "VGG-16 选用 ReLU 是因为它的非线性够强、计算只需一次比较、梯度形式简单、训练稳定。"
            ],
            final: "公式 ReLU(x)=max(0,x)：正值透传，负值截为 0。导数在 x>0 为 1、x<0 为 0，在 x=0 数学上不存在；实现通常约定反传值为 0。它引入非线性，但负区间可能产生 dead ReLU。"
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
              "先在草稿上写六个小标题：场景、机制、受影响者、伤害、测量、缓解。每个案例填一小句，最后再连成段；这比想到什么写什么可靠。",
              "案例 1（人脸/情绪识别）：场景是公共场所或招聘中的自动识别。机制是训练数据对某些群体覆盖少/标注差，或部署把不确定分数当确定结论。受影响者是被识别者，尤其误差较高的群体。伤害是误报、错误盘查、机会被拒和隐私/权利损失。",
              "案例 1 的测量/缓解：按群体统计 false-positive、false-negative、TPR/FPR，审计数据覆盖；设置人工复核和申诉，限制高风险用途，持续监控，而不是只说‘去 bias’。",
              "案例 2（web-scraped training data）：场景是从网页/平台抓资料训练模型。机制是资料可能没有同意、含私人或可重新识别内容、带 licence/copyright 限制。受影响者是原作者、数据主体和后来被模型输出其内容的人。伤害是隐私泄露、版权/报酬损失和敏感资料暴露。",
              "案例 2 的测量/缓解：做 source/consent/licence audit，数据最小化和用途限制，保护访问与删除/申诉流程，并在发布前测试 memorisation/泄露风险。也可把耗电、耗水、碳足迹写成第三个完整案例。"
            ],
            final: "每例都写完整因果链：场景→机制→受影响者→伤害→测量/审计→缓解。本地 Ethics 讲义直接支持偏差、隐私、版权与环境影响；只列名词拿不到完整分。"
          },
          {
            label:"3(b)(c)",
            ask: "解释 invertible layer 及使用它的网络。",
            steps: [
              "先给定义：一层 y=f(x) 可逆，当且仅当拿到每一个输出 y 都能找到唯一的 x=f⁻¹(y)。‘能训练 decoder 大概还原’不够；必须是数学上的唯一反推。",
              "用反例说明你理解：ReLU(−1)=ReLU(−2)=0，拿到 0 不知道原来是 −1 还是 −2，所以普通 ReLU 不可逆；max pooling、降维 bottleneck 也会丢信息。",
              "点名本题网络：Normalizing Flow。它把 x=f(z) 看成多层可逆变换的组合，z 来自简单分布；反向 x→z 也能做，所以既可 sampling，也可评估数据对应的 latent。",
              "若题目追问 why/use：用于 density 的 flow 还要求映射可微、通常维度相同，且 Jacobian determinant 可高效算。change of variables 用 determinant 补偿空间拉伸，才给 exact likelihood。",
              "考场收束句：‘Normalizing flows compose invertible, differentiable transformations with tractable Jacobian determinants; this permits bidirectional mapping and exact likelihood by change of variables.’"
            ],
            final: "可逆=每个 y 唯一倒回 x=f⁻¹(y)。本题答案是 normalizing flow；要做 exact likelihood 还需可微、通常同维、Jacobian determinant 可高效算。ReLU、pooling、bottleneck encoder 一般不可逆。"
          },
          {
            label:"3(d)",
            ask: "怎样找最佳 parameters 与 hyperparameters。",
            steps: [
              "先区分两类量。parameter 是 weight/bias，例如卷积 filter 中的数值。hyperparameter 是学习率、batch size、层数、dropout/L2 强度等训练设置。梯度直接更新 parameter。模型选择过程比较不同 hyperparameter 设置。",
              "对一套固定 hyperparameter，用 training set 做前向预测→算 loss→backprop→SGD/Adam 更新 weight/bias。训练过程的目标是让 train loss 降下来；这一步是在‘找 parameters’。",
              "重复上述训练，给 learning rate/层数/regularisation 等几套候选。用同一 validation set 比较它们的 metric，选最好的一套，并可用 validation early stopping 决定何时停止；这一步是在‘找 hyperparameters’。",
              "搜索名称可以举 grid、random、Bayesian optimization，数据少可用 cross-validation；但考场最关键的主干是 ‘validation + search’，不要只报算法名。",
              "按课程讲义，test set 用于 benchmark 已优化模型。写得更严谨：模型结构、超参数和选择规则冻结后，再用 test 做 final evaluation。若依据 test 再挑/改模型，原 test 已参与选择，必须另留 final hold-out。",
              "加分细节：normalisation 的均值/方差等预处理统计量也只能从 train 拟合，再同样应用给 validation/test；否则是数据泄漏。"
            ],
            final: "parameters（w/b）—train—loss/backprop/SGD或Adam；hyperparameters（learning rate 等）—validation—search/early stopping；test—模型冻结后 benchmark。若 test 参与选择，另留 independent final hold-out。"
          }
        ]
      }
    ]
  }
};

// Additional worked examples keep the course pages self-contained. Each example
// states the target, exposes the intermediate state, and checks the result.
(() => {
  const depth = window.REVISION_DEPTH;
  const add = (course, unit, examples) => {
    const lesson = depth[course].learn[unit];
    lesson.extraExamples = [...(lesson.extraExamples || []), ...examples];
  };

  add("cs603", 0, [{
    title: "逐行检查 (p∧q)→p",
    prompt: "用真值表判断 (p∧q)→p 是否永真。",
    steps: [
      "先列 p、q 的全部组合。两个布尔变量共有 2²=4 行：TT、TF、FT、FF。少一行就没有检查全部输入。",
      "计算中间列 p∧q。只有 p=T 且 q=T 时该列为 T，所以四行依次为 T、F、F、F。",
      "蕴含 A→B 只在 A=T 且 B=F 时为 F。这里令 A=p∧q，B=p。",
      "第一行 A=T，同时 p=T，所以蕴含为 T。其余三行 A=F。前件为 F 时蕴含均为 T。",
      "最后一列为 T、T、T、T。因此没有反例，公式是 tautology。"
    ],
    result: "(p∧q)→p 在四种赋值下都为真，所以它是永真式。"
  }]);

  add("cs603", 2, [{
    title: "ReverseArray 的不变量分别负责什么",
    prompt: "原地反转长度为 5 的数组 [a,b,c,d,e]。解释 i、j 和三段不变量。",
    steps: [
      "初始化 i=0、j=4。待处理区间是 i..j，即整个数组。关系 i+j=n−1 给出 0+4=4。",
      "交换位置 0 和 4，数组成为 [e,b,c,d,a]。再令 i=1、j=3。左侧 k<1 已满足 a[k]=old(a[n−1−k])，右侧 k>3 也满足镜像关系。",
      "交换位置 1 和 3，数组成为 [e,d,c,b,a]。再令 i=2、j=2。左右两段已经反转，中间位置仍等于 old(a[2])。",
      "当 i=j 时，中间元素与自己交换或直接退出都不会改变结果。若循环 guard 是 i<j，退出后 i≥j。",
      "decreases j−i 在每轮后减少 2。guard 为真时 j−i>0，所以它非负并严格下降。这证明循环终止。",
      "把左段、右段和最多一个中央位置合并，得到所有 0≤k<n 都满足 a[k]=old(a[n−1−k])。"
    ],
    result: "三个区域不变量证明内容正确，i+j=n−1 证明索引配对正确，decreases j−i 证明终止。"
  }]);

  add("cs603", 4, [{
    title: "区分 strong until 与 weak until",
    prompt: "系统发生 fault 后必须保持 safe，直到 recovered。比较 safe U recovered 与 safe W recovered。",
    steps: [
      "先固定当前位置为 fault 发生后的第一个状态。公式只讨论从这个状态开始的后缀。",
      "safe U recovered 要求未来某个状态 recovered 为真，并要求在它之前的每个状态 safe 为真。它同时包含安全保持和最终恢复。",
      "safe W recovered 允许两种情况。第一种与 U 相同。第二种是 recovered 永远不发生，但 safe 永远保持。",
      "若环境保证修复一定完成，可用 U。若系统只负责恢复前保持安全，而恢复可能永远不来，应使用 W。",
      "检查反例：轨迹 safe,safe,safe,… 满足 W，但不满足 U，因为 recovered 从未发生。"
    ],
    result: "U 强制右侧事件最终发生。W 允许右侧永不发生，但此时左侧必须永远成立。"
  }]);

  add("cs603", 5, [{
    title: "SMT 求解器怎样证明一个分支不可达",
    prompt: "路径条件为 x>5 且 x<3。说明 Z3 返回 unsat 为什么构成不可达证明。",
    steps: [
      "把路径条件原样写成约束 x>5 ∧ x<3，并声明 x 是整数。不要先凭直觉删除其中一项。",
      "求解器尝试寻找一个整数 model，使两个不等式同时为真。x>5 要求 x≥6，x<3 要求 x≤2。",
      "两个允许集合没有交集，所以不存在 model。求解器返回 unsat。",
      "unsat 的含义只针对送入求解器的公式。若编码漏掉约束，结论不能自动扩展到原程序。",
      "若改成 x>5 ∧ x<8，求解器可返回 x=6。把 6 代回两个不等式可检查 sat model。"
    ],
    result: "完整路径条件为 unsat 时，该路径不可执行。结论依赖约束编码与程序语义一致。"
  }]);

  add("cs605", 1, [{
    title: "用 CFL Pumping Lemma 处理 0ⁿ1ⁿ2ⁿ",
    prompt: "证明 L={0ⁿ1ⁿ2ⁿ:n≥0} 不是 context-free language。",
    steps: [
      "反设 L 是 CFL，并令 p 为 pumping length。选择 w=0ᵖ1ᵖ2ᵖ。它属于 L，且长度至少为 p。",
      "对任意分割 w=uvxyz，条件是 |vxy|≤p 且 |vy|>0。长度不超过 p 的窗口不可能同时跨过 0/1 和 1/2 两个边界。",
      "因此 v 和 y 最多涉及两类相邻符号。至少有一类符号的数量在 pumping 时完全不变。",
      "取 i=0 或 i=2。若 v、y 只含一种符号，只改变一个计数。若跨一个边界，至多改变两个计数。三类数量不再全部相等。",
      "无论合法分割如何选择，都存在 i 使 uvⁱxyⁱz 不属于 L。这与 CFL Pumping Lemma 矛盾。"
    ],
    result: "L={0ⁿ1ⁿ2ⁿ} 不是 CFL。关键是覆盖所有合法分割，而不是自行选择 v、y。"
  }]);

  add("cs605", 2, [{
    title: "两个 recogniser 怎样组成 decider",
    prompt: "已知 L 和 complement(L) 都 Turing-recognisable。构造 L 的 decider。",
    steps: [
      "设 M 识别 L，N 识别 complement(L)。输入任意字符串 w。",
      "不能先把 M 一直运行到结束。若 w 不在 L，M 可能永远循环，N 将永远没有机会运行。",
      "使用 dovetail。第 1 轮让 M、N 各执行一步，第 2 轮再各执行一步，以此交错推进。",
      "若 M 接受 w，就接受。若 N 接受 w，就拒绝。因为每个 w 必在 L 或 complement(L) 中，至少一个机器最终接受。",
      "所以该组合过程对每个输入都会停止，并给出正确的 accept/reject 结果。"
    ],
    result: "L 与其补集都可识别，当且仅当 L 可判定。交错模拟负责保证停止。"
  }]);

  add("cs605", 3, [{
    title: "为什么归约方向不能写反",
    prompt: "已知 HALT 不可判定。要证明目标语言 B 不可判定，应构造哪一个方向？",
    steps: [
      "目标是利用一个假想的 B-decider 解决 HALT。因此转换器必须先接收 HALT 实例 x。",
      "构造总可计算函数 f，使 x∈HALT 当且仅当 f(x)∈B。这个关系写作 HALT≤ₘB。",
      "假设 B 有 decider D_B。对 x 先计算 f(x)，再运行 D_B(f(x))。iff 保证它正确判断 x 是否属于 HALT。",
      "这与 HALT 不可判定矛盾，所以 B 不可判定。",
      "若只证明 B≤ₘHALT，得到的是 B 不比 HALT 更难。它不能把 HALT 的不可判定性传给 B。"
    ],
    result: "证明 B 困难时，从已知困难语言归约到 B：HALT≤ₘB。"
  }]);

  add("cs605", 4, [{
    title: "Exact Simple Path 的 certificate 为什么是多项式长度",
    prompt: "验证图 G 中是否存在从 s 到 t、恰有 k 条边的 simple path。",
    steps: [
      "certificate 写成顶点序列 v₀,…,v_k。它声称 v₀=s、v_k=t，并且每对相邻顶点都有边。",
      "先检查 k≤|V|−1。simple path 不能重复顶点，所以超过该界的 yes-certificate 不可能存在。",
      "检查序列长度恰为 k+1，首尾正确，每个顶点属于 V，并且所有顶点互不相同。",
      "对每个 i=0,…,k−1 检查 (v_i,v_{i+1})∈E。使用邻接矩阵时每次查边为 O(1)。",
      "序列至多含 |V| 个顶点编号，每个编号使用 O(log|V|) bit。因此 certificate 长度和验证时间都是输入大小的多项式。"
    ],
    result: "验证器接受当且仅当序列是从 s 到 t、长度恰为 k 且不重复顶点的路径。"
  }]);

  add("cs608", 1, [{
    title: "从条件写出完整 Decision Table",
    prompt: "规则：会员且订单不少于 €50 时免运费；非会员订单不少于 €100 时免运费；其余收费。",
    steps: [
      "先定义三个布尔条件。M 表示会员，A 表示金额≥€50，B 表示金额≥€100。因为 B 为真必然使 A 为真，A=F、B=T 是不可能组合。",
      "会员规则可写 M∧A。非会员规则可写 ¬M∧B。动作只有 Free 和 Charge，两者必须互斥。",
      "列可行规则：M,T,T→Free；M,T,F→Free；M,F,F→Charge；¬M,T,T→Free；¬M,T,F→Charge；¬M,F,F→Charge。",
      "为每列选择一个具体值。金额分别使用 120、70、30。测试输入必须同时满足该列的所有条件。",
      "检查表的 completeness：每个可行输入组合落入一列。检查 consistency：没有一列同时要求 Free 和 Charge。"
    ],
    result: "Decision Table 先列条件组合和动作，再从每条可行规则派生测试。逻辑上不可能的组合要明确排除。"
  }]);

  add("cs608", 2, [{
    title: "Branch Coverage 不等于 Condition Coverage",
    prompt: "代码为 if (A && B) approve(); else reject();。比较两种覆盖。",
    steps: [
      "decision 是整个表达式 A&&B。Branch Coverage 要让它至少一次为 true、一次为 false。",
      "测试 (A=T,B=T) 走 true branch。测试 (A=F,B=T) 走 false branch。这已经达到 100% branch coverage。",
      "但在这两条测试中 B 始终为 T，所以原子条件 B 没有取过 F。Condition Coverage 尚未达到 100%。",
      "加入 (A=T,B=F)。现在 A 和 B 都至少取过一次 T 和 F，且两个 branch 也都执行过。",
      "若语言使用短路求值，A=F 时 B 可能根本不被求值。报告工具的 condition 计数必须按实际执行语义解释。"
    ],
    result: "TT 与 FT 足够覆盖两个 branch。要同时覆盖两个原子条件的真假，还需 TF。"
  }]);

  add("cs608", 3, [{
    title: "状态相关方法为什么必须测试调用序列",
    prompt: "账户初始余额为 0。deposit(x) 增加余额，withdraw(x) 在余额足够时扣款。测试 withdraw(30)。",
    steps: [
      "只写输入 30 不足以确定 expected result。withdraw 的行为还取决于调用前余额。",
      "序列一：new Account()→withdraw(30)。前置状态余额为 0，预期拒绝，余额仍为 0。",
      "序列二：new Account()→deposit(50)→withdraw(30)。前置状态余额为 50，预期成功，余额变为 20。",
      "序列三：new Account()→deposit(30)→withdraw(30)。这是边界状态，预期成功，余额变为 0。",
      "每条测试都要记录 setup、调用、返回值和调用后可观察状态。测试后重新建立对象，避免前一条测试污染下一条。"
    ],
    result: "class-context test case 的输入包括对象状态和调用历史，不只是当前方法参数。"
  }]);

  add("cs608", 4, [{
    title: "约束随机测试怎样保持正确 oracle",
    prompt: "规则：lux<100 时灯开启，否则关闭。生成 1,000 个随机测试。",
    steps: [
      "先分别定义两个输入域。R1 为 0≤lux≤99，expected=true。R2 为 100≤lux≤4999，expected=false。",
      "选择 R1 时，只从 0..99 生成值，并固定 expected=true。选择 R2 时，只从 100..4999 生成值，并固定 expected=false。",
      "每次调用都记录 seed、rule、lux、actual 和 expected。失败时 seed 可重现同一随机序列。",
      "随机生成器不能自己决定 expected。oracle 来自规格规则，否则错误实现可能与错误 oracle 同时一致。",
      "另外固定测试 99 和 100。随机抽样不保证命中边界，所以边界测试不能交给概率。"
    ],
    result: "约束负责生成合法输入，规格负责 oracle，seed 负责重现，固定用例负责边界。"
  }]);

  add("cs616", 1, [{
    title: "恢复 Affine cipher 的解密公式",
    prompt: "加密为 E(x)=5x+8 mod 26。解密密文值 y=3。",
    steps: [
      "解密先解同余式 y≡5x+8 (mod 26)。移项得到 y−8≡5x (mod 26)。",
      "求 5 在 mod 26 下的逆元。因为 26=5×5+1，所以 1=26−5×5，故 5⁻¹≡−5≡21 (mod 26)。",
      "两边乘 21，得到 x≡21(y−8) (mod 26)。这就是 D(y)=21(y−8) mod 26。",
      "代入 y=3，得到 x≡21×(−5)≡−105≡25 (mod 26)，因为 −105+5×26=25。",
      "用 A=0,…,Z=25，数值 25 对应 Z。再验算 E(25)=5×25+8=133，133 mod 26=3。"
    ],
    result: "D(3)=25，即明文字母 Z。代回加密式后得到原密文值 3。"
  }]);

  add("cs616", 2, [{
    title: "CFB 单字节解密为什么反馈密文",
    prompt: "已知当前寄存器经 block cipher 后，本段使用的输出字节为 0x9A。收到密文字节 C=0x50。求明文并说明下一次反馈。",
    steps: [
      "CFB 先加密当前 IV/shift register，得到 keystream segment S。题目已经给出所需字节 S=0x9A。",
      "解密使用 XOR：P=C⊕S。把十六进制写成二进制：0x50=01010000，0x9A=10011010。",
      "逐位 XOR 得 11001010，即 0xCA。因此当前明文字节是 0xCA。",
      "CFB 的反馈值是收到的密文 C=0x50，不是刚恢复的明文 0xCA。发送端和接收端都能取得同一密文，所以寄存器保持同步。",
      "检查：重新加密时 P⊕S=0xCA⊕0x9A=0x50，确实恢复原密文。"
    ],
    result: "P=0xCA，下一段反馈 C=0x50。XOR 回代得到 0x50。"
  }]);

  add("cs616", 3, [{
    title: "小型 RSA 从生成密钥到签名验证",
    prompt: "取 p=5、q=11、e=3。求私钥 d，并对消息 m=9 签名。",
    steps: [
      "计算 n=pq=55，φ(n)=(p−1)(q−1)=4×10=40。公钥为 (n,e)=(55,3)。",
      "求 d≡e⁻¹ (mod 40)。先算 40=13×3+1。改写得 1=40−13×3，所以 3 的 Bézout 系数是 −13。于是 d≡−13≡27 (mod 40)，取标准代表元 d=27。验证：3×27=81=2×40+1。",
      "签名为 s=m^d mod n=9²⁷ mod 55。快速平方：9²≡26 (mod 55)，9⁴≡16 (mod 55)，9⁸≡36 (mod 55)，9¹⁶≡31 (mod 55)。",
      "27=16+8+2+1，所以 s≡31×36×26×9 (mod 55)。逐次取模：31×36≡16 (mod 55)，16×26≡31 (mod 55)，31×9≡4 (mod 55)。",
      "验证计算 s^e mod n=4³=64 mod 55=9，等于消息 m。"
    ],
    result: "私钥指数 d=27，签名 s=4，验证值 4³ mod 55=9。"
  }, {
    title: "Rabin 的两个不同平方根怎样给出因子",
    prompt: "模 n=77 有 x=13、y=20，且 x²≡y² (mod 77)，但 x≢y (mod 77) 且 x≢−y (mod 77)。恢复因子。",
    steps: [
      "由 x²≡y² (mod n) 得 n 整除 x²−y²=(x−y)(x+y)。这说明两个乘积因子合起来含有 n 的全部质因子。",
      "计算 x−y=−7。gcd(|x−y|,77)=gcd(7,77)=7。",
      "计算 x+y=33。gcd(33,77)=11。",
      "得到两个非平凡因子 7 和 11，并检查 7×11=77。",
      "条件 x≢y (mod n) 且 x≢−y (mod n) 很重要。若 x≡y (mod n)，第一项 gcd 可能是 n；若 x≡−y (mod n)，第二项 gcd 可能是 n，不能得到非平凡分解。"
    ],
    result: "gcd(x−y,n)=7，gcd(x+y,n)=11，因此 77=7×11。"
  }]);

  add("cs616", 4, [{
    title: "有限域上的椭圆曲线点加法",
    prompt: "在 y²=x³+2x+2 mod 17 上计算 P=(5,1) 的 2P。",
    steps: [
      "倍点斜率为 λ=(3x₁²+a)(2y₁)⁻¹ mod p。代入得分子 3×25+2=77≡9 (mod 17)，分母是 2。",
      "求 2⁻¹ mod 17。先算 17=8×2+1。改写得 1=17−8×2，所以 2 的 Bézout 系数是 −8。因此 2⁻¹≡−8≡9 (mod 17)。验证：2×9=18=1×17+1。故 λ≡9×9≡13 (mod 17)。",
      "计算 x₃≡λ²−2x₁≡13²−10≡6 (mod 17)。",
      "计算 y₃≡λ(x₁−x₃)−y₁≡13(5−6)−1≡3 (mod 17)。",
      "检查点 (6,3)：左边 3²=9。右边 6³+2×6+2=230，230 mod 17=9。"
    ],
    result: "2P=(6,3)。新点代回曲线方程后左右均为 9 mod 17。"
  }]);

  add("cs616", 5, [{
    title: "在 Rq 中约简一次多项式乘法",
    prompt: "在 R₅=Z₅[y]/(y³+1) 中计算 (1+2y²)(2+y)。",
    steps: [
      "先在普通多项式环展开：(1+2y²)(2+y)=2+y+4y²+2y³。",
      "商环关系 y³+1=0 给出 y³=−1。因此 2y³ 可替换为 −2。",
      "代入后常数项为 2−2=0，剩下 y+4y²。",
      "系数再取 mod 5。0、1、4 已在 0..4 范围内，所以结果不变。",
      "检查顺序：先处理 y³ 的次数约简，再对所有系数取 mod 5。两个模运算作用在不同对象上。"
    ],
    result: "在 Z₅[y]/(y³+1) 中，(1+2y²)(2+y)≡y+4y² (mod y³+1)，且系数按 mod 5 计算。"
  }]);

  add("cs618", 0, [{
    title: "一层网络的 backprop 全过程",
    prompt: "模型 ŷ=wx+b，损失 L=(ŷ−t)²。取 x=2、t=5、w=1、b=0、学习率 η=0.1，完成一次更新。",
    steps: [
      "前向计算 z=wx+b=1×2+0=2。此处输出层没有额外 activation，所以 ŷ=2。",
      "计算误差 ŷ−t=2−5=−3，损失 L=(−3)²=9。",
      "从损失向后求导。∂L/∂ŷ=2(ŷ−t)=−6。又有 ∂ŷ/∂w=x=2，∂ŷ/∂b=1。",
      "链式法则给 ∂L/∂w=(−6)×2=−12，∂L/∂b=(−6)×1=−6。",
      "梯度下降更新 w←w−η∂L/∂w=1−0.1(−12)=2.2，b←0−0.1(−6)=0.6。",
      "检查新预测为 2.2×2+0.6=5，新损失为 0。这个特例一步到达目标，但一般训练需要多次更新。"
    ],
    result: "梯度为 (−12,−6)，更新后 w=2.2、b=0.6，新预测为 5。"
  }]);

  add("cs618", 1, [{
    title: "逐维计算 reconstruction MSE",
    prompt: "输入 x=(2,0,1)，重建 x̂=(1,2,1)。计算每样本的 mean squared error。",
    steps: [
      "先确认 x 与 x̂ 都有 3 维。重建损失需要每个输入维度都有对应输出。",
      "逐维误差为 x−x̂=(1,−2,0)。符号在平方后消失，但不能在平方前把分量相加。",
      "逐维平方得到 (1,4,0)，平方和为 1+4+0=5。",
      "按维度取平均，MSE=5/3。若课程公式只对样本求和而不除维度，应明确采用的是 squared-error sum。",
      "训练对多个样本再求平均。梯度会推动 decoder 输出 x̂ 向输入 x 靠近。"
    ],
    result: "该样本的 squared-error sum 为 5，按 3 个维度平均的 MSE 为 5/3。"
  }]);

  add("cs618", 2, [{
    title: "卷积输出尺寸、参数量和 pooling 连续计算",
    prompt: "输入 32×32×3，使用 16 个 3×3 filter、stride 1、padding 1，再做 2×2 stride 2 max pooling。",
    steps: [
      "卷积输出高宽公式为 floor((N+2P−K)/S)+1。代入 N=32、P=1、K=3、S=1，得到 32。",
      "filter 数决定输出 channel，所以卷积输出 shape 是 32×32×16。",
      "每个 filter 跨越全部 3 个输入 channel，含 3×3×3=27 个 weight 和 1 个 bias，共 28 个 parameter。",
      "16 个 filter 的总 parameter 为 28×16=448。空间位置数量不会乘进 parameter 数，因为所有位置共享同一个 filter。",
      "2×2、stride 2 pooling 把高宽各减半，不合并 channel，所以输出为 16×16×16。pooling 没有可学习 parameter。"
    ],
    result: "卷积输出 32×32×16，参数量 448。pooling 后为 16×16×16。"
  }]);

  add("cs618", 3, [{
    title: "Causal mask 在 softmax 前做什么",
    prompt: "token 2 对三个位置的原始 score 为 [1,2,4]，但它不能访问未来的第 3 个位置。",
    steps: [
      "causal mask 在 softmax 前把禁止位置的 score 设为 −∞。因此 masked scores 为 [1,2,−∞]。",
      "softmax 先取指数，得到 [e¹,e²,0]。未来位置的 e^(−∞)=0。",
      "归一化后权重为 [e/(e+e²), e²/(e+e²), 0]，约为 [0.269,0.731,0]。",
      "输出是 0.269V₁+0.731V₂+0V₃。无论 V₃ 是什么，它都不能影响 token 2 的新表示。",
      "若在 softmax 之后才把第三个权重改为 0，还必须重新归一化。标准做法是在 softmax 前 mask。"
    ],
    result: "mask 后第三个 attention weight 精确为 0，前两个可访问位置的权重重新归一化为约 0.269 和 0.731。"
  }]);

  add("cs618", 4, [{
    title: "为什么不能用 test set 选择 learning rate",
    prompt: "学习率 0.1 和 0.01 的 test accuracy 分别为 88% 和 91%。选择 0.01 后还能把 91% 当最终无偏成绩吗？",
    steps: [
      "不能。比较两个 test 分数已经让 test 参与 hyperparameter 选择。选择过程利用了 test 中的随机特征。",
      "正确流程是在 training set 上分别训练两个候选，在 validation set 上比较并选择 learning rate。",
      "选择完成后，固定 preprocessing、模型结构、parameter 和所有选择规则。只运行一次 test evaluation。",
      "若已经依据原 test 选择了 0.01，需要另取未参与任何选择的 independent hold-out，才能估计最终泛化表现。",
      "同一规则也适用于 early stopping、阈值选择和特征选择。只要依据某数据集的分数修改模型，该数据集就不再是独立 test。"
    ],
    result: "91% 已是模型选择信息，不能再当作独立最终评估。必须使用 validation 选择，并保留未触碰的 test。"
  }]);

  add("cs618", 5, [{
    title: "一维 change of variables 的密度计算",
    prompt: "令 z 服从标准正态分布，使用可逆变换 x=2z+1。写出 x 的密度关系。",
    steps: [
      "先求逆映射 z=(x−1)/2。给定任意 x，可以找到唯一 z，所以该线性层可逆。",
      "逆映射导数为 dz/dx=1/2。绝对 Jacobian determinant 在一维就是 |1/2|。",
      "change of variables 给 p_X(x)=p_Z((x−1)/2)×1/2。乘 1/2 用于补偿坐标被放大两倍。",
      "等价地，x 的均值为 1，标准差为 2。密度积分仍为 1。",
      "normalizing flow 把多层这种可逆变换组合起来。训练需要同时计算逆映射和 log|det J|。"
    ],
    result: "p_X(x)=p_Z((x−1)/2)/2。Jacobian 项保证变换后的密度仍正确归一化。"
  }]);
})();

// 学习页只在“题目特征 → 方法”关系明确时才给出选择提示。
// 这些提示不是口诀替代品，而是让学生先判断为什么要调用某个算法或证明工具。
(()=>{
  const choices={
    cs603:[
      "题目要求把自然语言条件写成精确公式，或判断量词、蕴含与否定时，先用命题逻辑或谓词逻辑。",
      "题目给出程序的前置条件和后置条件，并要求证明循环正确时，用 Hoare triple 和 loop invariant。",
      "题目要求写出可由工具检查的 precondition、postcondition、invariant 或 decreases 时，用 Dafny 合约。",
      "题目描述会改变系统状态的事件，并要求逐层加入细节且保持不变量时，用 Event-B refinement。",
      "题目问所有可达执行是否满足 safety 或 liveness，或给出 LTL/CTL 性质时，用 model checking。",
      "题目能表示成有限逻辑约束，并要求找模型、找反例或判定可满足性时，用 SAT/SMT；涉及整数、数组等理论时优先 SMT。"
    ],
    cs605:[
      "先看识别语言需要多少记忆：有限状态选 FA；需要栈式嵌套选 PDA；需要任意读写工作带选 Turing machine。",
      "题目要求证明语言不是 regular 或不是 context-free，且直接构造机器很困难时，才考虑对应的 pumping lemma。",
      "题目问算法是否必须对所有输入停机时讨论 decider；只要求成员最终接受、非成员可以不停机时讨论 recogniser。",
      "已知一个问题不可判定，并要证明另一个问题也不可判定时，用 mapping reduction 把已知难题实例变换到目标问题。",
      "题目问某问题是否属于 NP 时，寻找长度为多项式的 certificate，并写出能在多项式时间检查它的 verifier。",
      "题目要求证明目标问题 NP-complete 时，需要“属于 NP”和“NP-hard”两部分；图上的 clique 结构与子句选真文字匹配时使用 3-SAT→CLIQUE。"
    ],
    cs608:[
      "任何测试题先确认输入、预期输出和 oracle；如果这三项不清楚，暂时不要急着选覆盖技术。",
      "输入可按相同行为分组时用 equivalence partition；错误常在边界时加 BVA；多个条件组合决定动作时用 decision table。",
      "题目给出代码并要求结构覆盖时，用 statement/branch coverage；它不能替代需求层面的输入分区。",
      "方法结果依赖对象字段、构造顺序或前一次调用时，用 class-context test，并把前置状态和后置状态都写出来。",
      "输入空间很大且可自动生成时用 constrained random testing；故障率与运行时间有关时计算 MTBF；时间有限时按风险优先。",
      "题目来自数值、AI 或具体应用时，先识别专属 oracle、容差和失败代价，再把通用测试技术接上去。"
    ],
    cs616:[
      "看到“模 n 下的逆”先检查 gcd 并用扩展欧几里得；看到多个两两互素模数的同余式用 CRT；只做幂模运算时用重复平方。",
      "字母到字母的线性替换提示 affine cipher；题目要求证明知道秘密却不泄露秘密时，按 commitment–challenge–response 分析零知识协议。",
      "固定 128-bit block 的轮变换提示 AES；题目还要求长消息、IV/nonce 或完整性时，必须继续判断 mode 与 authenticated encryption。",
      "给出 n、e、φ(n) 或分解问题时分析 RSA；平方加密和四个平方根提示 Rabin；出现接近平方的因子时检查 Fermat factorisation。",
      "题目给出曲线点、点加倍、标量乘或椭圆曲线签名时用 ECC 公式；每次求逆前都先写清模数。",
      "完整性摘要与碰撞性质用 hash；多项式环、短噪声和格困难假设出现时，用 RLWE 的环运算和误差模型。"
    ],
    cs618:[
      "题目给出输入、权重、bias 和 activation 时做 forward pass；给出 loss 并要求更新参数时才进入 backpropagation。",
      "输入同时也是重建目标，且中间层被压缩时选 autoencoder；异常检测则比较 reconstruction error。",
      "图像局部模式、共享 filter、feature map shape 或卷积参数量出现时使用 CNN 的局部连接与权重共享规则。",
      "序列中不同位置需要按相关性互相取信息时用 attention；先算相似度，再归一化权重，最后加权 value。",
      "题目比较训练表现和未见数据表现，或要求选择超参数时，用 train/validation/test 分工与泛化诊断。",
      "题目要求显式 likelihood 且变换可逆时考虑 normalizing flow；只要求生成样本时还需与 VAE/GAN 等目标区分。",
      "数据天然由节点和边组成时选 GNN；题目问公平、解释或伤害时，用利益相关者、机制、后果、缓解措施四项作答。"
    ]
  };
  Object.entries(choices).forEach(([course,items])=>(window.REVISION_DEPTH[course].learn||[]).forEach((unit,i)=>unit.choice=items[i]));
  const flows={
    cs603:{1:["前置条件 P","初始化不变量 I","循环保持 I","I 且循环结束","后置条件 Q"]},
    cs605:{3:["已知不可判定问题实例 x","构造 f(x)","假设目标问题有 decider","借它判定原问题","得到矛盾"]},
    cs608:{1:["读规格与输入域","划分条件或边界","选测试输入","写 expected result","检查覆盖"]},
    cs616:{0:["欧几里得除法行","确认 gcd=1","反向更新系数","把系数模 n 归一化","乘回去检查余数 1"]},
    cs618:{0:["输入与参数","前向计算","计算 loss","反向求梯度","更新参数","再次前向检查 loss"]}
  };
  Object.entries(flows).forEach(([course,map])=>Object.entries(map).forEach(([index,flow])=>window.REVISION_DEPTH[course].learn[Number(index)].flow=flow));
})();

// Expand every multi-state CS616 exam calculation at the point where its state changes.
(() => {
  const exam = window.REVISION_DEPTH.cs616.exam;

  exam[0].parts[0].steps[8] = "用扩展 Euclid 求 697⁻¹ mod 991。先做连续除法：991=1×697+294；697=2×294+109；294=2×109+76；109=1×76+33；76=2×33+10；33=3×10+3；10=3×3+1。再逐行反代：1=10−3×3=10×10−3×33=10×76−23×33=33×76−23×109=33×294−89×109=211×294−89×697=211×991−300×697。697 的系数是 −300。把它加 991，得到标准余数 691。";
  exam[0].parts[0].states = [
    {after:2,title:"指数拆分状态",headers:["R","拆分","要计算的两部分"],rows:[["333","5×64+13","(2⁶⁴)⁵ 与 2¹³"]]},
    {after:3,title:"步骤 3 后的幂表",headers:["量","未取模值","mod 991"],rows:[["2¹³","8192","264"]]},
    {after:4,title:"步骤 4 后的幂表",headers:["量","计算","mod 991"],rows:[["2¹³","8192","264"],["827²","683929","139"]]},
    {after:5,title:"步骤 5 后的幂表",headers:["量","计算","mod 991"],rows:[["2¹³","8192","264"],["827²","683929","139"],["827⁴","139²=19321","492"]]},
    {after:6,title:"步骤 6 后的幂表",headers:["量","计算","mod 991"],rows:[["2¹³","8192","264"],["827²","683929","139"],["827⁴","19321","492"],["827⁵","492×827=406884","574"]]},
    {after:7,title:"步骤 7 后的幂表",headers:["量","计算","mod 991"],rows:[["2³³³","574×264=151536","904"]]},
    {after:9,title:"697 的逆元计算表",headers:["行","被除数","除数","q","r"],rows:[["1","991","697","1","294"],["2","697","294","2","109"],["3","294","109","2","76"],["4","109","76","1","33"],["5","76","33","2","10"],["6","33","10","3","3"],["7","10","3","3","1"],["结果","—","—","—","1=211×991−300×697"]]},
    {after:10,title:"逆元检查",headers:["候选逆元","乘积","除以 991","余数"],rows:[["691","697×691=481627","991×486=481626","1"]]},
    {after:11,title:"commitment 当前状态",headers:["2ᴿ mod 991","697⁻¹ mod 991","乘积","commitment"],rows:[["904","691","624664","334"]]},
    {after:13,title:"验证端状态",headers:["commitment×697","mod 991","2³³³ mod 991","比较"],rows:[["334×697=232798","904","904","相等，验证通过"]]}
  ];

  exam[0].parts[1].states = [
    {after:1,title:"digraph 编码表",headers:["文字","计算","十进制值"],rows:[["ma","26×12+0","312"],["il","26×8+11","219"],["uw","26×20+22","542"],["ex","26×4+23","127"]]},
    {after:2,title:"当前方程组",headers:["明文值 m","密文值 c","完整同余式"],rows:[["312","542","542≡312a+b (mod 676)"],["219","127","127≡219a+b (mod 676)"]]},
    {after:3,title:"消去 b 后的状态",headers:["左边相减","右边相减","完整同余式"],rows:[["542−127=415","(312−219)a=93a","415≡93a (mod 676)"]]},
    {after:8,title:"用题给逆元求 a",headers:["题给逆元的含义","两边同乘 189","右边怎样消去 93","左边取余","结论"],rows:[["93×189≡1 (mod 676)","189×415≡189×93a (mod 676)","189×93a=(93×189)a≡a (mod 676)","189×415=78435=116×676+19","a≡19 (mod 676)"]]},
    {after:9,title:"回代求 b",headers:["完整回代式","整数值","归一化","结论"],rows:[["b≡542−19×312 (mod 676)","−5386","−5386+8×676=22","b≡22 (mod 676)"]]},
    {after:11,title:"两组明密文回代",headers:["输入 m","整数计算","完整模检查","应得密文"],rows:[["312","19×312+22=5950","5950≡542 (mod 676)","uw=542"],["219","19×219+22=4183","4183≡127 (mod 676)","ex=127"]]}
  ];

  exam[0].parts[2].steps[3] = "求 Garner 公式所需的 523⁻¹ mod 547。先做连续除法：547=1×523+24；523=21×24+19；24=1×19+5；19=3×5+4；5=1×4+1。再逐行反代：1=5−4=4×5−19=4×24−5×19=109×24−5×523=109×547−114×523。523 的系数是 −114。把它加 547，得到标准余数 433。";
  exam[0].parts[2].states = [
    {after:1,title:"十六进制转换状态",headers:["量","hex 展开","decimal"],rows:[["p=0x20b","2×256+0×16+11","523"],["n=0x45d81","4×65536+5×4096+13×256+8×16+1","286081"]]},
    {after:2,title:"分解 n 后的状态",headers:["n","p","q=n/p","检查"],rows:[["286081","523","547","523×547=286081"]]},
    {after:3,title:"两个素数模下的根",headers:["模数","一个根","相反根"],rows:[["523","415","108"],["547","62","485"]]},
    {after:4,title:"523⁻¹ mod 547 的计算表",headers:["行","被除数","除数","q","r"],rows:[["1","547","523","1","24"],["2","523","24","21","19"],["3","24","19","1","5"],["4","19","5","3","4"],["5","5","4","1","1"],["结果","—","—","—","1=109×547−114×523"]]},
    {after:6,title:"CRT 根表：完成第 1 组",headers:["a_p","a_q","u=(a_q−a_p)×433 mod 547","x=a_p+523u"],rows:[["415","62","311","163068"]]},
    {after:7,title:"CRT 根表：完成第 2 组",headers:["a_p","a_q","u","x"],rows:[["415","62","311","163068"],["415","485","225","118090"]]},
    {after:8,title:"CRT 根表：完成第 3 组",headers:["a_p","a_q","u","x"],rows:[["415","62","311","163068"],["415","485","225","118090"],["108","62","321","167991"]]},
    {after:9,title:"CRT 根表：四组完成",headers:["a_p","a_q","u","x"],rows:[["415","62","311","163068"],["415","485","225","118090"],["108","62","321","167991"],["108","485","235","123013"]]},
    {after:12,title:"曲线参数状态",headers:["P","a","p","b=y²−x³−ax mod p","曲线"],rows:[["(25,14)","13","37","8","y²=x³+13x+8 mod 37"]]},
    {after:15,title:"ECC 倍点状态",headers:["点","斜率 λ","x","y"],rows:[["P","—","25","14"],["2P","4","3","0"]]},
    {after:19,title:"ECC 加点状态",headers:["点","计算方式","λ","结果"],rows:[["2P","P doubling","4","(3,0)"],["3P","2P+P","4","(25,23)=−P"]]},
    {after:21,title:"点阶检查",headers:["倍数","点","是否为 O"],rows:[["P","(25,14)","否"],["2P","(3,0)","否"],["3P","(25,23)","否"],["4P","O","是，阶为 4"]]}
  ];

  exam[0].parts[3].states = [
    {after:2,title:"输入系数状态（y⁰→y⁷）",headers:["多项式","y⁰","y¹","y²","y³","y⁴","y⁵","y⁶","y⁷"],rows:[["c_aux","57","18","62","48","30","57","55","74"],["c_msg","2","12","65","50","1","50","2","39"]]},
    {after:3,title:"secret 系数状态",headers:["多项式","y⁰","y¹","y²","y³","y⁴","y⁵","y⁶","y⁷"],rows:[["s=y⁷+2y","0","2","0","0","0","0","0","1"]]},
    {after:4,title:"2y×c_aux 当前状态（约简前）",headers:["项","y⁰","y¹","y²","y³","y⁴","y⁵","y⁶","y⁷"],rows:[["2y×c_aux","−148","114","36","124","96","60","114","110"]]},
    {after:5,title:"y⁷×c_aux 当前状态（约简前）",headers:["项","y⁰","y¹","y²","y³","y⁴","y⁵","y⁶","y⁷"],rows:[["2y×c_aux","−148","114","36","124","96","60","114","110"],["y⁷×c_aux","−18","−62","−48","−30","−57","−55","−74","57"]]},
    {after:6,title:"s×c_aux mod 83",headers:["项","y⁰","y¹","y²","y³","y⁴","y⁵","y⁶","y⁷"],rows:[["两项相加并 mod 83","0","52","71","11","39","5","40","1"]]},
    {after:7,title:"c_msg−s×c_aux mod 83",headers:["项","y⁰","y¹","y²","y³","y⁴","y⁵","y⁶","y⁷"],rows:[["c_msg","2","12","65","50","1","50","2","39"],["s×c_aux","0","52","71","11","39","5","40","1"],["差 mod 83","2","43","77","39","45","45","45","38"]]},
    {after:8,title:"转回题面顺序",headers:["顺序","第 1 位","第 2 位","第 3 位","第 4 位","第 5 位","第 6 位","第 7 位","第 8 位"],rows:[["y⁷→y⁰","38","45","45","45","39","77","43","2"]]},
    {after:10,title:"逐系数解码状态",headers:["系数","38","45","45","45","39","77","43","2"],rows:[["bit","1","1","1","1","1","0","1","0"]]},
    {after:11,title:"最终字节",headers:["binary","decimal","hex"],rows:[["11111010","250","0xFA"]]}
  ];

  exam[1].parts[0].states = [
    {after:1,title:"ARK 前后 state",headers:["位置","Before","After"],rows:[["byte 0","0x12","0xA9"],["byte 1..14","相同","相同"],["byte 15","0xFF","0x44"]]},
    {after:3,title:"byte 0 的 XOR 状态",headers:["Before","After","XOR key byte"],rows:[["00010010","10101001","10111011=0xBB"]]},
    {after:8,title:"byte 15 的 XOR 状态",headers:["Before","After","XOR key byte"],rows:[["11111111","01000100","10111011=0xBB"]]},
    {after:9,title:"完整 round key",headers:["byte 0","byte 1..14","byte 15"],rows:[["BB","全部 00","BB"]]},
    {after:10,title:"ARK 回代检查",headers:["位置","After XOR Key","恢复 Before"],rows:[["0","A9 XOR BB","12"],["1..14","原值 XOR 00","原值"],["15","44 XOR BB","FF"]]}
  ];

  exam[1].parts[1].states = [
    {after:2,title:"CFB keystream byte",headers:["E_k(IV) 的首 byte","binary","K₁"],rows:[["EA","11101010","0xEA"]]},
    {after:3,title:"收到的密文字节",headers:["C₁ hex","C₁ binary"],rows:[["0x20","00100000"]]},
    {after:4,title:"逐位 XOR 状态",headers:["bit","7","6","5","4","3","2","1","0"],rows:[["C₁","0","0","1","0","0","0","0","0"],["K₁","1","1","1","0","1","0","1","0"],["P₁=C₁ XOR K₁","1","1","0","0","1","0","1","0"]]},
    {after:5,title:"CFB 结果检查",headers:["binary","hex","使用的 keystream 位置"],rows:[["11001010","0xCA","MSB byte EA"]]}
  ];

  exam[2].parts[1].steps[3] = "计算 gcd(|R−Y|,N)，其中 |R−Y|=7654018。每次 Euclid 除法见本步表格，最后非零余数是 13523。";
  exam[2].parts[1].steps[4] = "计算 gcd(R+Y,N)，其中 R+Y=55192920。每次 Euclid 除法见本步表格，最后非零余数是 3511。";
  exam[2].parts[1].states = [
    {after:4,title:"gcd(|R−Y|,N) 的完整 Euclid 表",headers:["被除数","除数","q","r"],rows:[["47479253","7654018","6","1555145"],["7654018","1555145","4","1433438"],["1555145","1433438","1","121707"],["1433438","121707","11","94661"],["121707","94661","1","27046"],["94661","27046","3","13523"],["27046","13523","2","0"]]},
    {after:5,title:"gcd(R+Y,N) 的完整 Euclid 表",headers:["被除数","除数","q","r"],rows:[["55192920","47479253","1","7713667"],["47479253","7713667","6","1197251"],["7713667","1197251","6","530161"],["1197251","530161","2","136929"],["530161","136929","3","119374"],["136929","119374","1","17555"],["119374","17555","6","14044"],["17555","14044","1","3511"],["14044","3511","4","0"]]},
    {after:6,title:"因子回代检查",headers:["p","q","p×q","N"],rows:[["13523","3511","47479253","47479253"]]}
  ];

  exam[2].parts[2].states = [
    {after:4,title:"ECDSA 标量状态",headers:["量","计算","结果"],rows:[["h","22 mod 7","1"],["w","6⁻¹ mod 7","6"],["u₁","h×w mod 7","6"],["u₂","r×w mod 7","6"]]},
    {after:5,title:"6P 的点加法状态",headers:["项目","计算","mod 17 结果"],rows:[["输入点","5P=(4,6)，P=(13,2)","—"],["斜率分子","6−2","4"],["斜率分母","4−13=−9","8"],["分母逆元","8⁻¹","15"],["λ","4×15","9"],["x","9²−4−13=64","13"],["y","9(4−13)−6=−87","15"],["结果","—","6P=(13,15)"]]},
    {after:6,title:"6Y 的倍点状态",headers:["项目","计算","mod 17 结果"],rows:[["输入点","3Y=(4,11)","—"],["分子","3×4²+5=53","2"],["分母","2×11=22","5"],["分母逆元","5⁻¹","7"],["λ","2×7","14"],["x","14²−2×4=188","1"],["y","14(4−1)−11=31","14"],["结果","—","6Y=(1,14)"]]},
    {after:8,title:"X=6P+6Y 的斜率状态",headers:["分子","分母","分母逆元","λ"],rows:[["14−15≡16 (mod 17)","1−13≡5 (mod 17)","5⁻¹≡7 (mod 17)","16×7≡10 (mod 17)"]]},
    {after:10,title:"X 的坐标状态",headers:["量","计算","mod 17"],rows:[["x_X","10²−13−1=86","1"],["y_X","10(13−1)−15=105","3"],["X","—","(1,3)"]]},
    {after:12,title:"ECDSA 最终比较",headers:["v=x_X mod q","signature r","结果"],rows:[["1","1","相等，签名有效"]]}
  ];
})();

// The audited personal CS616 workbook uses hand-written calculation tables.
// Apply the corrected table pattern to representative topics in every course.
(() => {
  const depth = window.REVISION_DEPTH;
  const findExample = (course, unit, title) => {
    const lesson = depth[course].learn[unit];
    return [lesson.example, ...(lesson.extraExamples || [])].find(x => x && x.title === title);
  };

  depth.cs616.start.intro = "先统一数字表示、模数和目标，再把每次余数、系数、矩阵状态或点坐标写进计算台账。最后把结果代回原公式。个人复习 PDF 只提供这种详细讲解模式，公式和答案已经按今年真题与课程资料重新核对。";

  Object.assign(findExample("cs603", 2, "ReverseArray 的不变量分别负责什么"), {
    given: "n=5，初始数组 [a,b,c,d,e]，i=0，j=4。",
    target: "证明循环结束后 a[k]=old(a[n−1−k])，并证明循环终止。",
    ledger: {
      title: "循环状态台账",
      caption: "每行记录交换后的程序状态，以及不变量已经覆盖的数组区域。",
      revealAfter: [1,2,3,4],
      headers: ["检查点", "i", "j", "数组", "已经证明的区域"],
      rows: [
        ["初始化", "0", "4", "[a,b,c,d,e]", "左右区域为空"],
        ["交换 0,4 后", "1", "3", "[e,b,c,d,a]", "k<1 与 k>3"],
        ["交换 1,3 后", "2", "2", "[e,d,c,b,a]", "k<2 与 k>2"],
        ["退出", "2", "2", "[e,d,c,b,a]", "左右区域加中央点覆盖全部索引"]
      ]
    },
    check: "最终数组逐项等于 old 数组的镜像。j−i 从 4 变为 2，再变为 0，guard 为真时非负且每轮严格下降。"
  });

  Object.assign(findExample("cs605", 1, "用 CFL Pumping Lemma 处理 0ⁿ1ⁿ2ⁿ"), {
    given: "反设 L={0ⁿ1ⁿ2ⁿ:n≥0} 是 CFL。令 p 为 pumping length，选择 w=0ᵖ1ᵖ2ᵖ。",
    target: "对每一个满足 |vxy|≤p、|vy|>0 的分割，找到 pumping 后的反例。",
    ledger: {
      title: "分割情况台账",
      caption: "窗口长度至多 p，因此不可能同时跨过两个边界。",
      revealAfter: [4,4,4,4,4],
      headers: ["v、y 所在区域", "取 i", "改变的计数", "为什么离开 L"],
      rows: [
        ["只在 0 区", "0 或 2", "只改变 #0", "#0、#1、#2 不再相等"],
        ["只在 1 区", "0 或 2", "只改变 #1", "#0、#1、#2 不再相等"],
        ["只在 2 区", "0 或 2", "只改变 #2", "#0、#1、#2 不再相等"],
        ["跨 0/1 边界", "0 或 2", "改变 #0、#1，#2 不变", "至少一个改变，所以三者不全相等"],
        ["跨 1/2 边界", "0 或 2", "改变 #1、#2，#0 不变", "至少一个改变，所以三者不全相等"]
      ]
    },
    check: "台账覆盖所有合法分割位置。每种情况都能选择 i 使 pumped string 不在 L，因此与 CFL Pumping Lemma 矛盾。"
  });

  Object.assign(findExample("cs608", 1, "从条件写出完整 Decision Table"), {
    given: "M=会员，A=金额≥€50，B=金额≥€100。B=T 必然蕴含 A=T。",
    target: "列出全部可行规则，并为每条规则给出输入和唯一 expected result。",
    ledger: {
      title: "Decision Table 台账",
      caption: "金额 120、70、30 分别代表 B=T、A=T且B=F、A=F且B=F。",
      revealAfter: [3,3,3,3,3,3],
      headers: ["规则", "M", "A", "B", "代表金额", "Expected"],
      rows: [
        ["R1", "T", "T", "T", "€120", "Free"],
        ["R2", "T", "T", "F", "€70", "Free"],
        ["R3", "T", "F", "F", "€30", "Charge"],
        ["R4", "F", "T", "T", "€120", "Free"],
        ["R5", "F", "T", "F", "€70", "Charge"],
        ["R6", "F", "F", "F", "€30", "Charge"]
      ]
    },
    check: "不存在 A=F、B=T 的行。六条可行规则互斥并覆盖全部合法输入，每行只有一个 expected action。"
  });

  Object.assign(findExample("cs616", 0, "用扩展欧几里得算法求 7⁻¹ mod 26"), {
    given: "a=7，n=26。所有计算都在整数中进行，最后才取 mod 26。",
    target: "找标准余数 x∈{0,…,25}，使 7x≡1 (mod 26)。",
    steps: [
      "把目标改写成整数等式。7x≡1 (mod 26) 表示 7x−1 是 26 的倍数，因此要找整数 x、y，使 7x+26y=1。",
      "第一次除法：26=3×7+5。它把较大的数 26 换成较小余数 5，但 gcd 不变。",
      "第二次除法：7=1×5+2。现在继续计算 gcd(5,2)。",
      "第三次除法：5=2×2+1。最后非零余数是 1，所以 gcd(7,26)=1，逆元存在。",
      "从最后一条等式解出 1。5=2×2+1 的两边同时减去 2×2，得到 1=5−2×2。这里没有代入，只做了移项。",
      "上一条除法给出 7=1×5+2。两边减去 5，得到 2=7−5。把当前表达式中的 2 全部替换为 7−5，得到 1=5−2×(7−5)。",
      "展开括号：−2×(7−5)=−2×7+2×5。再加上原来的一个 5，得到 1=3×5−2×7。",
      "第一次除法给出 26=3×7+5，所以 5=26−3×7。把 3×5 替换为 3×(26−3×7)，得到 1=3×26−11×7。",
      "式子 1=3×26−11×7 已经是 7x+26y=1 的形式。对两边取 mod 26 后，3×26 的余数是 0，因此 −11×7≡1 (mod 26)。",
      "7 的系数是 −11。标准余数要求落在 0 到 25，所以加一个 26，得到 −11+26=15。最后检查 7×15=105=4×26+1。"
    ],
    states: [
      {after:2,title:"步骤 2 后的除法表",headers:["行","被除数","除数","商 q","余数 r"],rows:[["1","26","7","3","5"]]},
      {after:3,title:"步骤 3 后的除法表",headers:["行","被除数","除数","商 q","余数 r"],rows:[["1","26","7","3","5"],["2","7","5","1","2"]]},
      {after:4,title:"步骤 4 后的除法表",headers:["行","被除数","除数","商 q","余数 r"],rows:[["1","26","7","3","5"],["2","7","5","1","2"],["3","5","2","2","1"]]},
      {after:5,title:"步骤 5 后的表达式状态",headers:["来源等式","对等式做什么","当前的 1"],rows:[["5=2×2+1","两边减去 2×2","1=5−2×2"]]},
      {after:6,title:"步骤 6 后的表达式状态",headers:["可替换的等式","替换位置","当前的 1"],rows:[["2=7−5","把 1=5−2×2 中的 2 替换掉","1=5−2×(7−5)"]]},
      {after:7,title:"步骤 7 后的表达式状态",headers:["展开前","分配律","合并后"],rows:[["1=5−2×(7−5)","1=5−2×7+2×5","1=3×5−2×7"]]},
      {after:8,title:"步骤 8 后的表达式状态",headers:["可替换的等式","替换后","合并后"],rows:[["5=26−3×7","1=3×(26−3×7)−2×7","1=3×26−11×7"]]},
      {after:9,title:"步骤 9 后的模运算状态",headers:["整数等式","mod 26 后消失的项","剩余同余式"],rows:[["1=3×26−11×7","3×26≡0 (mod 26)","−11×7≡1 (mod 26)"]]}
    ],
    ledger: {
      title: "扩展欧几里得系数台账",
      caption: "x 列记录当前余数 r 写成 7x+26y 时 7 的系数。初始化两行不能省略。",
      headers: ["行", "除法 / 余数", "q", "r", "x：7 的系数"],
      rows: [
        ["初始化 1", "26", "—", "26", "0"],
        ["初始化 2", "7", "—", "7", "1"],
        ["1", "26=3×7+5", "3", "5", "0−3×1=−3"],
        ["2", "7=1×5+2", "1", "2", "1−1×(−3)=4"],
        ["3", "5=2×2+1", "2", "1", "−3−2×4=−11"]
      ]
    },
    check: "−11 是逆元系数。−11 mod 26=15，并且 7×15=105=4×26+1。"
  });

  Object.assign(findExample("cs616", 0, "用 CRT 合并两个余数条件"), {
    given: "x≡2 (mod 3)，x≡3 (mod 5)。模数 3 和 5 互素。",
    target: "求 0≤x<15 的唯一解，并保留每个部分模数和逆元。",
    steps: [
      "计算总模数 M=3×5=15。因为 gcd(3,5)=1，答案在 0 到 14 中唯一。",
      "对第一条同余，去掉模数 3 后得到 M₁=M/3=5。对第二条同余，得到 M₂=M/5=3。",
      "求逆元 y₁，使 5y₁≡1 (mod 3)。因为 5≡2 (mod 3) 且 2×2≡1 (mod 3)，所以 y₁≡2 (mod 3)，取标准代表元 y₁=2。",
      "求逆元 y₂，使 3y₂≡1 (mod 5)。因为 3×2=6≡1 (mod 5)，所以 y₂≡2 (mod 5)，取标准代表元 y₂=2。此时两行 CRT 表已经完整。",
      "计算加权和 S=a₁M₁y₁+a₂M₂y₂=2×5×2+3×3×2=20+18=38。取 mod 15 得 8。",
      "回代检查。8 mod 3=2，8 mod 5=3，所以两个原条件都成立。"
    ],
    ledger: {
      title: "CRT 计算台账",
      caption: "M=3×5=15，M_i=M/m_i，y_i=M_i⁻¹ mod m_i。",
      revealAfter: [4,4,5],
      headers: ["i", "m_i", "a_i", "M_i", "M_i mod m_i", "y_i", "a_iM_iy_i"],
      rows: [
        ["1", "3", "2", "5", "2", "2", "20"],
        ["2", "5", "3", "3", "3", "2", "18"],
        ["合计", "—", "—", "—", "—", "—", "38 mod 15=8"]
      ]
    },
    check: "8 mod 3=2，8 mod 5=3。两个原条件都成立。"
  });

  Object.assign(findExample("cs616", 3, "小型 RSA 从生成密钥到签名验证"), {
    given: "p=5，q=11，e=3，消息 m=9。",
    target: "求 n、φ(n)、d、签名 s，并用公钥验证。",
    ledger: {
      title: "RSA 快速平方台账",
      caption: "每次平方后立即 mod 55，避免先计算 9²⁷。",
      revealAfter: [3,3,3,3,3,4],
      headers: ["幂", "计算", "mod 55 的余数", "27 是否使用"],
      rows: [
        ["9¹", "9", "9", "是"],
        ["9²", "9²=81", "26", "是"],
        ["9⁴", "26²=676", "16", "否"],
        ["9⁸", "16²=256", "36", "是"],
        ["9¹⁶", "36²=1296", "31", "是"],
        ["9²⁷", "31×36×26×9", "4", "签名 s"]
      ]
    },
    check: "d=27，因为 3×27=81≡1 (mod 40)。验证 4³ mod 55=9，等于原消息。"
  });

  Object.assign(findExample("cs616", 4, "有限域上的椭圆曲线点加法"), {
    given: "E:y²=x³+2x+2 mod 17，P=(5,1)。",
    target: "计算 2P，并把结果代回曲线方程。",
    ledger: {
      title: "ECC 倍点台账",
      caption: "所有除法都改写成 mod 17 下乘逆元。",
      revealAfter: [1,1,2,3,4],
      headers: ["量", "未约简计算", "mod 17 结果"],
      rows: [
        ["分子 3x₁²+a", "3×25+2=77", "9"],
        ["分母逆元 (2y₁)⁻¹", "2⁻¹≡9 (mod 17)", "9"],
        ["斜率 λ", "9×9=81", "13"],
        ["x₃", "13²−2×5=159", "6"],
        ["y₃", "13(5−6)−1=−14", "3"]
      ]
    },
    check: "3²≡9 (mod 17)；6³+2×6+2=230≡9 (mod 17)。故 (6,3) 在曲线上。"
  });

  Object.assign(findExample("cs618", 0, "一层网络的 backprop 全过程"), {
    given: "ŷ=wx+b，L=(ŷ−t)²，x=2，t=5，w=1，b=0，η=0.1。",
    target: "完成一次前向计算、反向求导和 gradient descent 更新。",
    ledger: {
      title: "前向与反向传播台账",
      caption: "每行保存一个中间变量，反向阶段直接引用前向值。",
      revealAfter: [1,2,3,4,4,5,5],
      headers: ["阶段", "变量", "计算", "数值"],
      rows: [
        ["前向", "ŷ", "1×2+0", "2"],
        ["前向", "L", "(2−5)²", "9"],
        ["反向", "∂L/∂ŷ", "2(2−5)", "−6"],
        ["反向", "∂L/∂w", "(−6)×2", "−12"],
        ["反向", "∂L/∂b", "(−6)×1", "−6"],
        ["更新", "w", "1−0.1(−12)", "2.2"],
        ["更新", "b", "0−0.1(−6)", "0.6"]
      ]
    },
    check: "更新后预测为 2.2×2+0.6=5，新损失为 0。"
  });

  depth.cs616.learn[0].extraExamples.push({
    title: "个人复习 PDF 例题：用系数表求 7⁻¹ mod 370368",
    prompt: "求 d，使 7d≡1 (mod 370368)。保留初始化行、商、余数和 7 的系数。",
    given: "e=7，模数 λ=370368。先检查 gcd(7,370368)=1。",
    target: "求 0≤d<370368 的逆元，并验证 7d mod 370368=1。",
    steps: [
      "先写两条初始化行。余数 370368 写成 370368×1+7×0，所以 7 的系数是 0。余数 7 写成 370368×0+7×1，所以 7 的系数是 1。",
      "计算 370368=52909×7+5。新余数 5 的系数等于 0−52909×1=−52909。",
      "计算 7=1×5+2。新余数 2 的系数等于 1−1×(−52909)=52910。",
      "计算 5=2×2+1。新余数 1 的系数等于 −52909−2×52910=−158729。",
      "最后余数 1 对应等式 1=370368×3+7×(−158729)。因此 −158729 是 7 的一个模逆系数。",
      "把负系数加一个模数：−158729+370368=211639。检查 7×211639=4×370368+1。"
    ],
    states: [
      {after:1,title:"步骤 1 后的系数表",headers:["行","q","r","7 的系数 x","当前含义"],rows:[["初始化 1","—","370368","0","370368=370368×1+7×0"],["初始化 2","—","7","1","7=370368×0+7×1"]]},
      {after:2,title:"步骤 2 后的系数表",headers:["行","q","r","7 的系数 x","递推"],rows:[["初始化 1","—","370368","0","—"],["初始化 2","—","7","1","—"],["1","52909","5","−52909","0−52909×1"]]},
      {after:3,title:"步骤 3 后的系数表",headers:["行","q","r","7 的系数 x","递推"],rows:[["初始化 1","—","370368","0","—"],["初始化 2","—","7","1","—"],["1","52909","5","−52909","0−52909×1"],["2","1","2","52910","1−1×(−52909)"]]},
      {after:4,title:"步骤 4 后的系数表",headers:["行","q","r","7 的系数 x","递推"],rows:[["初始化 1","—","370368","0","—"],["初始化 2","—","7","1","—"],["1","52909","5","−52909","0−52909×1"],["2","1","2","52910","1−1×(−52909)"],["3","2","1","−158729","−52909−2×52910"]]},
      {after:5,title:"步骤 5 后的等式状态",headers:["最后余数","370368 的系数","7 的系数","Bézout 等式"],rows:[["1","3","−158729","1=370368×3+7×(−158729)"]]},
      {after:6,title:"步骤 6 后的标准逆元",headers:["原系数","加一个模数","标准余数 d","回代"],rows:[["−158729","+370368","211639","7×211639=4×370368+1"]]}
    ],
    ledger: {
      title: "个人教材手写表的核对版",
      caption: "原表的递推方法正确。网站补全了省略的中间系数和最终等式。",
      headers: ["行", "q", "r", "7 的系数 x", "递推"],
      rows: [
        ["初始化 1", "—", "370368", "0", "—"],
        ["初始化 2", "—", "7", "1", "—"],
        ["1", "52909", "5", "−52909", "0−52909×1"],
        ["2", "1", "2", "52910", "1−1×(−52909)"],
        ["3", "2", "1", "−158729", "−52909−2×52910"]
      ]
    },
    result: "7⁻¹ mod 370368=211639。",
    check: "7×211639=1481473=4×370368+1。余数为 1。"
  }, {
    title: "个人复习 PDF 例题：三模数 CRT 完整台账",
    prompt: "解 x≡216 (mod 233)，x≡50 (mod 181)，x≡179 (mod 241)。",
    given: "三个模数 233、181、241 两两互素。余数分别为 216、50、179。",
    target: "求 0≤x<M 的唯一解，M=233×181×241。",
    steps: [
      "计算总模数 M=233×181×241=10163693。",
      "计算部分模数 M₁=181×241=43621，M₂=233×241=56153，M₃=233×181=42173。",
      "分别约简。M₁≡50 (mod 233)，M₂≡43 (mod 181)，M₃≡239≡−2 (mod 241)。",
      "用 PDF 的系数表求 50⁻¹ mod 233。先写两行初始化。第一行放模数 233，系数 d=0。第二行放待求逆数 50，系数 d=1。d 表示当前余数中 50 的系数。",
      "填第 1 行。q=⌊233÷50⌋=4。新余数 r=233−4×50=33。新系数 d=0−4×1=−4。这里的 0 和 1 来自两行初始化。",
      "填第 2 行。q=⌊50÷33⌋=1。新余数 r=50−1×33=17。新系数 d=1−1×(−4)=5。",
      "填第 3 行。q=⌊33÷17⌋=1。新余数 r=33−1×17=16。新系数 d=−4−1×5=−9。",
      "填第 4 行。q=⌊17÷16⌋=1。新余数 r=17−1×16=1。新系数 d=5−1×(−9)=14。余数为 1 时停止。同行的 d=14 就是 50⁻¹ mod 233。",
      "用同一张系数表求 43⁻¹ mod 181。初始化两行是 r=181,d=0 和 r=43,d=1。d 表示当前余数中 43 的系数。",
      "填第 1 行。q=⌊181÷43⌋=4。新余数 r=181−4×43=9。新系数 d=0−4×1=−4。",
      "填第 2 行。q=⌊43÷9⌋=4。新余数 r=43−4×9=7。新系数 d=1−4×(−4)=17。",
      "填第 3 行。q=⌊9÷7⌋=1。新余数 r=9−1×7=2。新系数 d=−4−1×17=−21。",
      "填第 4 行。q=⌊7÷2⌋=3。新余数 r=7−3×2=1。新系数 d=17−3×(−21)=80。余数为 1 时停止。同行的 d=80 就是 43⁻¹ mod 181。",
      "用同一张系数表求 239⁻¹ mod 241。初始化两行是 r=241,d=0 和 r=239,d=1。d 表示当前余数中 239 的系数。",
      "填第 1 行。q=⌊241÷239⌋=1。新余数 r=241−1×239=2。新系数 d=0−1×1=−1。",
      "填第 2 行。q=⌊239÷2⌋=119。新余数 r=239−119×2=1。新系数 d=1−119×(−1)=120。余数为 1 时停止。同行的 d=120 就是 239⁻¹ mod 241。",
      "分别验证三个逆元。50×14=700=3×233+1。43×80=3440=19×181+1。239×120=28680=119×241+1。三个乘积除以对应模数后，余数都是 1。",
      "计算三项：216×43621×14=131909904，50×56153×80=224612000，179×42173×120=905876040。",
      "先求和 S=131909904+224612000+905876040=1262397944。再计算 1262397944=124×10163693+2100012，所以 S mod 10163693=2100012。",
      "回代检查最终答案。2100012 mod 233=216，2100012 mod 181=50，2100012 mod 241=179。三个余数都与题目相同。"
    ],
    states: [
      {after:1,title:"步骤 1 后的总模数",headers:["m₁","m₂","m₃","M=m₁m₂m₃"],rows:[["233","181","241","10163693"]]},
      {after:2,title:"步骤 2 后的 CRT 表",headers:["i","m_i","a_i","M_i=M/m_i"],rows:[["1","233","216","43621"],["2","181","50","56153"],["3","241","179","42173"]]},
      {after:3,title:"步骤 3 后的 CRT 表",headers:["i","m_i","a_i","M_i","M_i mod m_i"],rows:[["1","233","216","43621","50"],["2","181","50","56153","43"],["3","241","179","42173","239≡−2 (mod 241)"]]},
      {after:4,title:"50⁻¹ mod 233：初始化完整系数表",caption:"规则：新 d=上两行的 d−当前 q×上一行的 d。尚未计算的格保留为“待计算”。",headers:["Steps","商 q","余数 r","d（50 的系数）","本行怎样计算"],rows:[["初始化 1","—","233","0","模数行，d 固定为 0"],["初始化 2","—","50","1","待求逆数行，d 固定为 1"],["Step 1","待计算","待计算","待计算","待计算"],["Step 2","待计算","待计算","待计算","待计算"],["Step 3","待计算","待计算","待计算","待计算"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:5,title:"50⁻¹ mod 233：填入 Step 1",headers:["Steps","商 q","余数 r","d（50 的系数）","本行怎样计算"],rows:[["初始化 1","—","233","0","—"],["初始化 2","—","50","1","—"],["Step 1","4","33","−4","q=⌊233÷50⌋=4；r=233−4×50=33；d=0−4×1=−4"],["Step 2","待计算","待计算","待计算","待计算"],["Step 3","待计算","待计算","待计算","待计算"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:6,title:"50⁻¹ mod 233：填入 Step 2",headers:["Steps","商 q","余数 r","d（50 的系数）","本行怎样计算"],rows:[["初始化 1","—","233","0","—"],["初始化 2","—","50","1","—"],["Step 1","4","33","−4","0−4×1=−4"],["Step 2","1","17","5","q=⌊50÷33⌋=1；r=50−1×33=17；d=1−1×(−4)=5"],["Step 3","待计算","待计算","待计算","待计算"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:7,title:"50⁻¹ mod 233：填入 Step 3",headers:["Steps","商 q","余数 r","d（50 的系数）","本行怎样计算"],rows:[["初始化 1","—","233","0","—"],["初始化 2","—","50","1","—"],["Step 1","4","33","−4","0−4×1=−4"],["Step 2","1","17","5","1−1×(−4)=5"],["Step 3","1","16","−9","q=⌊33÷17⌋=1；r=33−1×17=16；d=−4−1×5=−9"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:8,title:"50⁻¹ mod 233：完整系数表",headers:["Steps","商 q","余数 r","d（50 的系数）","本行怎样计算"],rows:[["初始化 1","—","233","0","—"],["初始化 2","—","50","1","—"],["Step 1","4","33","−4","0−4×1=−4"],["Step 2","1","17","5","1−1×(−4)=5"],["Step 3","1","16","−9","−4−1×5=−9"],["Step 4","1","1","14","q=⌊17÷16⌋=1；r=17−1×16=1；d=5−1×(−9)=14。余数为 1，读出逆元 14"]]},
      {after:9,title:"43⁻¹ mod 181：初始化完整系数表",caption:"使用同一条更新规则。",headers:["Steps","商 q","余数 r","d（43 的系数）","本行怎样计算"],rows:[["初始化 1","—","181","0","模数行"],["初始化 2","—","43","1","待求逆数行"],["Step 1","待计算","待计算","待计算","待计算"],["Step 2","待计算","待计算","待计算","待计算"],["Step 3","待计算","待计算","待计算","待计算"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:10,title:"43⁻¹ mod 181：填入 Step 1",headers:["Steps","商 q","余数 r","d（43 的系数）","本行怎样计算"],rows:[["初始化 1","—","181","0","—"],["初始化 2","—","43","1","—"],["Step 1","4","9","−4","q=⌊181÷43⌋=4；r=181−4×43=9；d=0−4×1=−4"],["Step 2","待计算","待计算","待计算","待计算"],["Step 3","待计算","待计算","待计算","待计算"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:11,title:"43⁻¹ mod 181：填入 Step 2",headers:["Steps","商 q","余数 r","d（43 的系数）","本行怎样计算"],rows:[["初始化 1","—","181","0","—"],["初始化 2","—","43","1","—"],["Step 1","4","9","−4","0−4×1=−4"],["Step 2","4","7","17","q=⌊43÷9⌋=4；r=43−4×9=7；d=1−4×(−4)=17"],["Step 3","待计算","待计算","待计算","待计算"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:12,title:"43⁻¹ mod 181：填入 Step 3",headers:["Steps","商 q","余数 r","d（43 的系数）","本行怎样计算"],rows:[["初始化 1","—","181","0","—"],["初始化 2","—","43","1","—"],["Step 1","4","9","−4","0−4×1=−4"],["Step 2","4","7","17","1−4×(−4)=17"],["Step 3","1","2","−21","q=⌊9÷7⌋=1；r=9−1×7=2；d=−4−1×17=−21"],["Step 4","待计算","待计算","待计算","待计算"]]},
      {after:13,title:"43⁻¹ mod 181：完整系数表",headers:["Steps","商 q","余数 r","d（43 的系数）","本行怎样计算"],rows:[["初始化 1","—","181","0","—"],["初始化 2","—","43","1","—"],["Step 1","4","9","−4","0−4×1=−4"],["Step 2","4","7","17","1−4×(−4)=17"],["Step 3","1","2","−21","−4−1×17=−21"],["Step 4","3","1","80","q=⌊7÷2⌋=3；r=7−3×2=1；d=17−3×(−21)=80。余数为 1，读出逆元 80"]]},
      {after:14,title:"239⁻¹ mod 241：初始化完整系数表",caption:"这个例子只需要两次更新。",headers:["Steps","商 q","余数 r","d（239 的系数）","本行怎样计算"],rows:[["初始化 1","—","241","0","模数行"],["初始化 2","—","239","1","待求逆数行"],["Step 1","待计算","待计算","待计算","待计算"],["Step 2","待计算","待计算","待计算","待计算"]]},
      {after:15,title:"239⁻¹ mod 241：填入 Step 1",headers:["Steps","商 q","余数 r","d（239 的系数）","本行怎样计算"],rows:[["初始化 1","—","241","0","—"],["初始化 2","—","239","1","—"],["Step 1","1","2","−1","q=⌊241÷239⌋=1；r=241−1×239=2；d=0−1×1=−1"],["Step 2","待计算","待计算","待计算","待计算"]]},
      {after:16,title:"239⁻¹ mod 241：完整系数表",headers:["Steps","商 q","余数 r","d（239 的系数）","本行怎样计算"],rows:[["初始化 1","—","241","0","—"],["初始化 2","—","239","1","—"],["Step 1","1","2","−1","0−1×1=−1"],["Step 2","119","1","120","q=⌊239÷2⌋=119；r=239−119×2=1；d=1−119×(−1)=120。余数为 1，读出逆元 120"]]},
      {after:17,title:"三个逆元的独立验证",headers:["数 a","模数 n","逆元 y","整数等式","模验证"],rows:[["50","233","14","50×14=3×233+1","余数 1"],["43","181","80","43×80=19×181+1","余数 1"],["239","241","120","239×120=119×241+1","余数 1"]]},
      {after:18,title:"加入逆元后的 CRT 加权项",headers:["i","a_i","M_i","y_i","a_iM_iy_i"],rows:[["1","216","43621","14","131909904"],["2","50","56153","80","224612000"],["3","179","42173","120","905876040"]]},
      {after:19,title:"求和与取模",headers:["计算","结果"],rows:[["第一项+第二项","131909904+224612000=356521904"],["再加第三项 S","356521904+905876040=1262397944"],["把 S 除以 M","1262397944=124×10163693+2100012"],["取余数","S mod M=2100012"]]},
      {after:20,title:"最终答案回代表",headers:["检查项","计算结果","是否符合题目"],rows:[["2100012 mod 233","216","是"],["2100012 mod 181","50","是"],["2100012 mod 241","179","是"]]}
    ],
    ledger: {
      title: "CRT 计算台账",
      caption: "每行独立算 M_i、逆元和加权项。最后统一求和取模。",
      headers: ["i", "m_i", "a_i", "M_i", "M_i mod m_i", "y_i", "a_iM_iy_i"],
      rows: [
        ["1", "233", "216", "43621", "50", "14", "131909904"],
        ["2", "181", "50", "56153", "43", "80", "224612000"],
        ["3", "241", "179", "42173", "239", "120", "905876040"],
        ["合计", "—", "—", "M=10163693", "—", "—", "1262397944 mod M=2100012"]
      ]
    },
    result: "x≡2100012 (mod 10163693)。",
    check: "2100012 mod 233=216，mod 181=50，mod 241=179。三个原条件全部成立。"
  });

  Object.assign(depth.cs603.exam[0].parts[1], {
    given: "两个公式共享变量 p。右式还使用 q。p 和 q 都取 T 或 F。",
    target: "在同一张 p,q 四行真值表中比较 p∨¬p 与 (p∧q)→p。",
    ledger: {
      title: "真值表台账",
      revealAfter: [2,3,4,5],
      headers: ["p", "q", "¬p", "p∨¬p", "p∧q", "(p∧q)→p"],
      rows: [
        ["T", "T", "F", "T", "T", "T"],
        ["T", "F", "F", "T", "F", "T"],
        ["F", "T", "T", "T", "F", "T"],
        ["F", "F", "T", "T", "F", "T"]
      ]
    },
    check: "p∨¬p 四行全为 T。(p∧q)→p 四行也全为 T。因此两式在所有 p,q 赋值下等价。"
  });

  Object.assign(depth.cs605.exam[6].parts[0], {
    given: "输入为含 r 个 clauses 的 3-CNF 公式。每个 literal occurrence 建一个顶点。",
    target: "构造 (G,k)，证明公式可满足 iff G 有 k-clique，并证明构造是 polynomial time。",
    ledger: {
      title: "NP-completeness 证明台账",
      headers: ["交付项", "必须写出的内容", "检查"],
      rows: [
        ["in NP", "引用 Q6 verifier", "certificate 和时间都是 polynomial"],
        ["归约方向", "3-SAT≤pL6A", "从已知难题指向目标题"],
        ["顶点", "每个 clause 的每个 occurrence 一个顶点", "r clauses 产生 3r 顶点"],
        ["边", "不同 clause 且 literals 不互补时连边", "同 clause 不连边"],
        ["参数", "k=r", "clique 必须每层恰选一个"],
        ["正向", "满足赋值→每层选一个 true literal", "所选点两两相连"],
        ["反向", "r-clique→无互补 literals", "可合成一致满足赋值"],
        ["时间", "检查 O((3r)²) 个点对", "polynomial"]
      ]
    },
    check: "两方向证明使用同一个构造，且最后同时写出 in NP 与 NP-hard，才能得 NP-complete。"
  });

  Object.assign(depth.cs608.exam[0].parts[2], {
    given: "需要覆盖 batt 的 B1–B5、rate 的 R1–R4 和输出 O1–O4。错误 partition 必须单独触发。",
    target: "用最少且可追踪的测试覆盖全部 TCI，并为每条测试写 expected output。",
    ledger: {
      title: "EP 测试台账",
      revealAfter: [1,2,3,4,4,5,5],
      headers: ["TC", "batt", "rate", "Expected", "新增覆盖"],
      rows: [
        ["T1", "9", "51", "FAST_CHARGE", "B2,R3,O2"],
        ["T2", "10", "51", "SLOW_CHARGE", "B3,O3"],
        ["T3", "50", "50", "NONE", "B4,R2,O1"],
        ["T4", "−1", "50", "PARAM_ERROR", "B1*"],
        ["T5", "101", "50", "PARAM_ERROR", "B5*"],
        ["T6", "50", "−1", "PARAM_ERROR", "R1*"],
        ["T7", "50", "256", "PARAM_ERROR", "R4*"]
      ]
    },
    check: "从每个 B、R、O 标识反查，至少能找到一条测试。每条测试都有至少一个其它测试没有覆盖的新输入 TCI。"
  });

  Object.assign(depth.cs616.exam[2].parts[0], {
    given: "n=790199209，e=564387843。题目中的两个质因子接近。",
    target: "用 Fermat factorisation 求 p、q，再计算 φ(n) 和 d=e⁻¹ mod φ(n)。",
    ledger: {
      title: "Fermat 逐次搜索台账",
      caption: "从 ceil(√n)=28111 开始。只在 s²−n 是完全平方时停止。",
      revealAfter: [3,4,5,6,7],
      headers: ["s", "s²", "s²−n", "平方检查"],
      rows: [
        ["28111", "790228321", "29112", "不是平方"],
        ["28112", "790284544", "85335", "不是平方"],
        ["28113", "790340769", "141560", "不是平方"],
        ["28114", "790396996", "197787", "不是平方"],
        ["28115", "790453225", "254016", "504²，停止"]
      ]
    },
    check: "p=28115−504=27611，q=28115+504=28619，pq=790199209。φ=790142980，且 564387843×7=5φ+1，所以 d=7。"
  });

  Object.assign(depth.cs618.exam[1].parts[1], {
    given: "filter 为 3×3，输入 channel=3，输出 channel=64。每个 filter 有一个 bias。",
    target: "计算首卷积层的 learnable parameter 数，不把 activation 数算进去。",
    ledger: {
      title: "卷积参数台账",
      revealAfter: [1,1,2,3],
      headers: ["项目", "计算", "数量"],
      rows: [
        ["一个 filter 的空间位置", "3×3", "9"],
        ["一个 filter 的 weights", "9×3 input channels", "27"],
        ["一个 filter 加 bias", "27+1", "28"],
        ["64 个 filters", "28×64", "1792"]
      ]
    },
    check: "改变输入高宽不会改变参数数，因为同一 filter 在所有空间位置共享。"
  });
})();
