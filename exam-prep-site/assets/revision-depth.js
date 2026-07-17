window.REVISION_DEPTH = {
  cs603: {
    start: {
      title: "没有学过逻辑、证明或 Dafny，也可以从这里起步",
      intro: "CS603 不是要求你一开始就会写复杂数学证明。整门课只是在反复做一件事：先把“程序应该怎样”说准确，再证明程序确实这样做。先学会读一句性质，之后的 Hoare Logic、Dafny、Event-B 和 LTL 都只是用不同方式表达与检查性质。",
      blocks: [
        {t:"先认清对象",p:"程序有输入、状态和输出。规格说明允许什么输入、执行期间必须保持什么、结束时必须得到什么。"},
        {t:"再写可检查的句子",p:"把“数组已经复制好”拆成长度相同、每个合法下标的元素相同。越具体，工具越能检查。"},
        {t:"最后组织证明",p:"证明不是灵感跳跃，而是初始化成立、每一步保持、结束时推出目标这三段固定台阶。"}
      ]
    },
    glossary: [
      ["Property / 性质","希望程序或系统满足的一条精确规则。"],
      ["Specification / 规格","把前置条件、后置条件、不变量等性质放在一起。"],
      ["Invariant / 不变量","执行会变化，但某条关系在关键位置始终保持。"],
      ["Verifier / 验证器","读取程序与规格，尝试用逻辑证明二者一致的工具。"],
      ["State / 状态","某一时刻全部相关变量的取值。"],
      ["Counterexample / 反例","一条真正违反性质的输入或执行路径。"]
    ],
    learn: [
      {
        plain:"逻辑符号只是把“所有”“至少一个”“如果……那么……”写得没有歧义。先把每个符号读成完整中文，再做运算，不要直接盯着公式猜。",
        steps:["把 A(x) 看作一句带空格的句子，例如“x 是员工”。给定 x 后它才有真假。","∀x 表示范围内每一个 x；∃x 表示至少找到一个 x。量词只管理它后面的作用域。","p→q 只在 p 真而 q 假时为假；它不表示时间先后，而表示“满足 p 的情况不能违反 q”。","复杂公式从最内层括号向外读，并先把每个谓词写回自然语言。"],
        example:{title:"量词位置为什么会改变意思",prompt:"比较 ∃x(A(x) ∧ ¬G(x)) 与 (∃x A(x)) ∧ ¬G(x)。",steps:["第一式中 x 同时出现在 A 与 G 中：要找到同一个既是 A 又不是 G 的对象。","第二式的 ∃x 只约束 A(x)；后面的 G(x) 中 x 没有被量词约束，是自由变量。","所以第二式不是“有一个 A 不是 G”，甚至可能不是一个封闭、可直接判真的命题。"],result:"量词的作用域必须用括号写清；考试解释差异时要说“是否是同一个对象”，不能只说符号不同。"},
        practice:{q:"“每个请求最终都有响应”可否写成 ∃x(Request(x)→Response(x))？",hint:"先看“每个”对应哪个量词，再看“最终”是否需要时间算子。",a:"不可以。“每个”需要 ∀；“最终”不是普通蕴含能表达的，进入 LTL 后应写 G(request→F response)。"}
      },
      {
        plain:"Hoare Logic 像检查一条流水线：入口满足 P，执行一小步后得到中间条件，再执行下一步，最终得到 Q。循环之所以难，只是因为同一段代码可能重复任意次，所以要找一句每轮都不坏的话。",
        steps:["先写目标 {P} C {Q}，确认 P 是执行前已知事实，Q 是执行后要保证的事实。","赋值 x:=E 用倒推：若之后想要 Q，就把 Q 中的 x 替换为 E，得到赋值前必须满足的条件。","顺序 C1;C2 先寻找中间断言 R，分别证明 {P}C1{R} 与 {R}C2{Q}。","while 用 invariant I：证明 P⇒I、I∧guard 执行 body 后仍为 I、I∧¬guard⇒Q；总正确性再加严格下降且非负的 variant。"],
        example:{title:"数组复制循环的 invariant 从哪里来",prompt:"i 从 0 开始，每轮执行 b[i]:=a[i]; i:=i+1，目标是全部元素相同。",steps:["刚开始 i=0，还没复制任何元素，所以“0 到 i-1 已复制”为空命题，自动成立。","假设前 i 个已复制，执行 b[i]:=a[i] 后，前 i+1 个已复制。","同时保持 0≤i≤a.Length，确保访问合法。","退出条件是 i≥a.Length；结合 i≤a.Length 得 i=a.Length，于是“前 i 个”就是整个数组。"],result:"I ≜ 0≤i≤a.Length ∧ b.Length=a.Length ∧ ∀k(0≤k<i→b[k]=a[k])；variant 为 a.Length-i。"},
        practice:{q:"循环 i 从 0 每次加 2，直到 i≥n。能否用 n-i 作 variant？",hint:"variant 在循环继续时必须非负并严格下降。",a:"若 guard 是 i<n，n-i 在入口为正，每轮减少 2，因此可以；退出后可以变负并不影响，关键是每次进入循环时非负。"}
      },
      {
        plain:"Dafny 把刚才的证明线索写在代码旁边。requires 告诉调用者要保证什么，ensures 是方法承诺，invariant 是循环每轮的“账本”，decreases 是剩余工作量。",
        steps:["先写方法的数学意义，不急着写语法。例如 reverse 的意义是输出位置 i 等于旧数组位置 n-1-i。","用 old(...) 明确引用方法开始时的状态；不写 old 时，赋值后的数组会覆盖你要比较的原值。","循环 invariant 只描述已经处理区与未处理区的关系，不要直接把最终 postcondition 生搬进去。","递归 decreases 选结构大小；序列尾 s[1..] 的长度比 s 少 1，所以 |s| 是自然度量。"],
        example:{title:"AllEven 的完整合约",prompt:"递归检查 seq<int> 中所有元素是否为偶数。",steps:["空序列返回 true，对应“空集合中所有元素都满足性质”。","非空时检查 s[0]，并递归检查 s[1..]。","返回值不是单向保证，而应与全称性质等价。","每次递归长度减少 1，因此终止。"],result:"ensures res == (forall i :: 0<=i<|s| ==> s[i]%2==0)，decreases |s|。"},
        practice:{q:"ReverseArray 只写 ensures a.Length==old(a.Length) 为什么远远不够？",hint:"一个完全不交换元素的方法是否也满足它？",a:"满足。长度不变没有描述反转结果。还需要对每个合法 i 写 a[i]==old(a[a.Length-1-i])，必要时说明数组引用或 frame。"}
      },
      {
        plain:"Event-B 在写代码前先画“系统允许怎样改变状态”。Context 是世界设定，Machine 是会变化的系统，Event 是一次合法动作，Invariant 是所有可达状态都必须满足的安全规则。",
        steps:["在 context 中放不会由事件改变的集合、常量和公理。","在 machine 中声明变量，并用 invariant 限制合法状态。","每个 event 先用 guard 判断能否发生，再用 action/before-after predicate 描述新状态。","工具为初始化和每个事件产生 proof obligation：若之前合法且 guard 成立，动作后仍必须合法。","FRET 则从受限自然语言出发，把 component、condition、response、timing 变成可追踪的形式性质。"],
        example:{title:"容量为 10 的计数器模型",prompt:"变量 count 记录人数，进入和离开不能使人数越界。",steps:["context 给常量 CAP=10。","machine 变量 count，不变量 0≤count≤CAP。","Enter guard count<CAP，action count:=count+1。","Exit guard count>0，action count:=count-1。","证明 Enter：0≤count≤CAP 且 count<CAP 推出 0≤count+1≤CAP；Exit 同理。"],result:"模型正确的关键不是事件能运行，而是每个事件都保持 invariant。"},
        practice:{q:"如果 Enter 没有 count<CAP guard，会发生什么？",hint:"尝试 count=10。",a:"count=10 时仍可进入并变成 11，违反 count≤CAP；对应的 invariant-preservation proof obligation 无法证明，工具会指出反例条件。"}
      },
      {
        plain:"模型检测不是抽几个例子，而是把有限状态系统的所有可能路径系统地展开。LTL 是用来描述“沿时间怎样变化”的语言：G 是一直，F 是最终，U 是保持到某事发生。",
        steps:["先定义原子命题，例如 red、stopped、safe；否则公式中的符号没有语义。","判断性质是 safety（坏事永不发生）还是 liveness（好事最终发生）。","Safety 常写 G¬bad；响应常写 G(trigger→F response)。","“p 保持直到 q”写 p U q；strong until 同时要求 q 最终发生。","Model checker 若失败会给完整反例路径；Runtime Verification 只检查实际运行时看到的那一条路径。"],
        example:{title:"红灯停车",prompt:"检测到红灯后，车必须在路口前停下并保持停止直到绿灯。",steps:["原子命题：red、beforeIntersection、stopped、green。","检测是触发，所以外层用 G(red→...)。","先要求 eventually stopped∧beforeIntersection。","一旦停止，要保持 stopped 直到 green，可写 stopped U green；若题意要求绿灯最终到来，strong U 合适。"],result:"可组织为 G(red → F(beforeIntersection ∧ stopped ∧ (stopped U green)))，并在答案中解释所作时序假设。"},
        practice:{q:"F(response) 为什么不能表达“每个 request 最终都有 response”？",hint:"它要求几次 response？有没有把 request 与 response 配对？",a:"F(response) 只要求整条路径未来至少出现一次 response；一次响应可以在所有请求之前。必须写 G(request→F response)。"}
      },
      {
        plain:"AI verification 是今年考点：AI 可以提出候选规格、测试或不变量，但“看起来合理”不是证明。SAT/SMT/Z3 是背后的自动逻辑工具，作为补充理解它们怎样检查候选。",
        steps:["SAT 只处理布尔变量；SMT 在布尔骨架上加入整数、数组等理论；Z3 是常见 SMT solver。","验证器常把“程序违反规格”编码为约束；若 unsat，说明不存在这类反例。","AI 的机会是快速生成候选、解释失败、搜索证明；挑战是幻觉、不完备数据、不可解释与错误自信。","adversarial training 加入攻击样本；property-driven training 把性质加入训练目标；两者改善经验行为，但不穷尽所有输入。"],
        example:{title:"AI 生成循环不变量时怎样保持可信",prompt:"LLM 建议 invariant i≤n。是否可以直接宣布循环正确？",steps:["先检查 invariant 是否初始化成立。","再检查循环 body 后是否保持。","最后检查 invariant 与退出条件是否能推出 postcondition。","若只满足前两项但不能推出目标，它只是一个真但太弱的 invariant。"],result:"AI 负责提出候选，sound verifier 负责接受或拒绝；最终保证来自证明器而非语言模型。"},
        practice:{q:"adversarial training 后网络在测试攻击上全通过，是否等于已形式化验证？",hint:"测试攻击集合是否等于所有允许扰动？",a:"不等于。它只提供采样分布和已尝试攻击下的经验鲁棒性；形式保证还需对明确定义的扰动集合证明性质对所有输入成立。"}
      }
    ],
    exam: [
      {
        question:"Q1 由五部分组成：量词公式差异、真值表等价、三种 rigorous process 方法、数组复制的 Hoare Logic 验证，以及部分/总正确性的差别。",
        parts:[
          {label:"(a)",ask:"解释两个量词公式为何不同。",steps:["给每个谓词一个中文含义，并为量词作用域加括号。","指出第一式要求同一个 x 同时满足 A 且不满足 G∨Y。","第二式若按 ∃x.A(x)→... 解析，蕴含在存在式外；若 x 在右侧自由，还要指出公式绑定不完整。","用一个只有两个对象的小反例说明两式可有不同真值。"],final:"结论必须落在量词作用域和“是否同一个对象”，不能只翻译符号。"},
          {label:"(b)",ask:"用真值表证明等价。",steps:["列出 p、q 的四种组合。","分别计算 ¬p、p∨¬p、p∧q、(p∧q)→p。","p∨¬p 一列恒真；(p∧q)→p 也恒真，因为前件真时 p 必真。","最终两列逐行相同，因此逻辑等价。"],final:"完整表格加一句“最终列在所有 valuation 下相同”。"},
          {label:"(c)",ask:"解释 Behaviour Driven Formal Model Development、Model Checking、Deductive Verification。",steps:["每项先给一句定义。","再指出验证的性质类型。","最后给一个工具或小例子：行为场景到模型、Spin 穷举状态、Dafny/Hoare 从规格演绎证明。"],final:"三项均用“定义—验证什么—例子”三句结构。"},
          {label:"(d)(e)",ask:"验证复制循环并扩展到总正确性。",steps:["写 contract 的含义：非空引用、长度相同、对应元素相同。","提出 I：边界、长度、已复制前缀。","证明初始化 i=0；保持时先写 b[i]:=a[i] 再 i+1；退出得 i=n。","部分正确性只说若终止则 postcondition；总正确性加 variant n-i，并证进入循环时非负且每轮减 1。"],final:"用三项循环义务加 variant 构成一份完整可判分证明。"}
        ]
      },
      {
        question:"Q2 要你把同一套“规格—保持—终止”方法应用到类不变量、原地数组反转和递归序列。",
        parts:[
          {label:"(a)",ask:"设计 Employee 并解释继承下的不变量。",steps:["定义 birthYear/currentYear 或 age，并明确 age 的计算前提。","class invariant 写 15<Age()<65。","constructor 的 ensures 建立对象合法；普通方法假设入口合法并在出口恢复。","Employee 继承 Person 时必须同时满足 Person 的 invariant；子类不能弱化父类已经承诺的后置条件。"],final:"代码之外必须解释 verifier 在 constructor、方法边界和继承处检查什么。"},
          {label:"(b)",ask:"为 ReverseArray 写 contract、invariants 与 variant。",steps:["requires a!=null；modifies a。","ensures 长度不变，并对每个 i 写 a[i]==old(a[n-1-i])。","invariant 保存 i/j 边界、两端已反转、中间尚待处理。","variant 选 j-i 或 j-i+1，并证明每轮 i+1、j-1 后严格下降。"],final:"old 数组、两端已处理区和终止度量缺一不可。"},
          {label:"(c)",ask:"为 AllEven 写 decreases、sequence 解释和 contract。",steps:["decreases |s|；递归参数 s[1..] 长度少 1。","sequence 是不可变值，slice 安全表达剩余输入并便于 old/等式推理。","ensures res 等价于所有合法下标元素为偶数。","说明空序列使全称命题为真，递归分支与定义一致。"],final:"用 iff 合约而非只写 res→allEven，才能完整刻画返回值。"}
        ]
      },
      {
        question:"Q3 是概念题，但评分要求概念必须连接到具体性质、工具工作方式和例子。",
        parts:[
          {label:"(a)",ask:"解释 Event-B 五个核心元素与 proof obligations。",steps:["context：静态集合/常量/公理；machine：动态状态。","variables 描述状态；invariants 描述所有可达状态规则；events 用 guard/action 改状态。","before-after predicate 把旧值与新值关系写成逻辑。","用一个计数器例子列 initialization preserves invariant 与 Enter preserves invariant 两项 PO。"],final:"至少给两项具体 PO，不能只罗列术语。"},
          {label:"(b)(d)",ask:"AI verification 的机会/挑战及两种训练方法。",steps:["机会 1：从代码生成候选规格/不变量；机会 2：搜索反例或辅助证明。","挑战 1：hallucination 导致错误规格；挑战 2：分布外行为、不可解释或验证成本。","adversarial training 用对抗样本；property-driven training 将性质违反加入 loss/数据生成。","共同点是训练时引导行为；差别是样本攻击与显式性质驱动；两者都不是对全域的形式证明。"],final:"严格写两项机会、两项挑战、相同点、不同点和“不足以保证”。"},
          {label:"(c)",ask:"解释 FRET 的支持链。",steps:["受限自然语言模板减少歧义。","记录 component、scope、condition、response、timing 等字段。","将需求自动形式化为时间逻辑等性质。","提供需求追踪、检查和与验证工具衔接。"],final:"答案要形成“记录自然语言→形式化→验证与追踪”的连续链。"}
        ]
      },
      {
        question:"Q4 将合约层次、两种运行行为检查方式和四条自动驾驶 LTL 性质放在同一题中。",
        parts:[
          {label:"(a)",ask:"区分软件合约与系统合约。",steps:["软件合约约束方法/类：requires、ensures、invariant。","系统合约跨组件并常含时间/交互性质。","软件例：withdraw requires amount≤balance；系统例：每个 request 最终 response。","给工具：Dafny 检软件合约，Spin/FRET/monitor 可支持系统性质。"],final:"差别要落在作用范围与时间行为，不只是工具名称。"},
          {label:"(b)",ask:"比较 Model Checking 与 Runtime Verification。",steps:["Model Checking 构造/探索模型所有可达状态与路径。","失败给 counterexample；成功是在模型与假设范围内的全局结论。","Runtime Verification 把性质变成 monitor，只观察一次或若干实际 trace。","它适合部署期发现违反，但未观察到违反不证明所有未来路径安全。"],final:"一项是模型全空间，一项是实际轨迹；都配一个例子。"},
          {label:"(c)",ask:"写四条汽车性质的 LTL。",steps:["先逐条定义 destinationReached、progress、emergency、resolved、red、stopped、green、sensorFail、safe、recovered。","i 可写 G(¬destinationReached→(progress U destinationReached))，并说明强 U 要求最终到达。","ii 写 G(emergency→(emergency U resolved)∧F¬emergency)。","iii 写 G(red→F(beforeIntersection∧stopped∧(stopped U green)))。","iv 写 G(sensorFail→F(safe∧(safe U recovered)))，另写 G monitorSensors 表示持续监控。"],final:"公式之后逐符号解释，并说明采用的原子命题和 strong-until 假设。"}
        ]
      }
    ]
  },
  cs605: {
    start:{
      title:"先把“计算问题”看成一袋字符串",
      intro:"CS605 最容易卡住的地方是符号太多。实际上，一门语言就是所有 yes-instance 的集合；机器只是判断一个输入是否属于这个集合。之后每种证明都在问：这类机器够不够、能不能保证停机、能不能有效地把一个难题翻译成另一个。",
      blocks:[{t:"先问输入是什么",p:"是字符串、自动机编码、图还是程序编码？先写清 instance。"}, {t:"再问 yes 的证据",p:"属于语言需要满足什么？机器怎样检查或证书怎样证明？"}, {t:"最后选择证明模板",p:"能力不够用 pumping；不可判定用 reduction；在 NP 用 verifier；NP-hard 用已知 NP-complete 问题归约。"}]
    },
    glossary:[["Language","一组被判为 yes 的字符串或编码。"],["Decider","对每个输入都停机并给正确 yes/no 的 TM。"],["Recogniser","yes 必须最终接受；no 可以拒绝或永远运行。"],["Reduction","把 A 的实例有效翻译成 B 的实例并保持 yes/no。"],["Certificate","yes-instance 随附的短证据。"],["Polynomial time","运行步数由输入长度的某个多项式上界控制。"]],
    learn:[
      {
        plain:"FA、PDA、TM 的核心差别是“可用记忆”。有限状态只记有限类别；栈能记任意深度但只从一端访问；图灵带能读写任意位置，足以表达一般算法。",
        steps:["把输入串从左到右读，DFA 当前 state 就是它对过去的全部记忆。","要比较 0^n1^n，必须记住任意大的 n；有限状态不够，但 PDA 可为每个 0 push、每个 1 pop。","TM 可以在带上来回移动和改写，能执行普通程序。","机器能力越强，可描述语言越多，但关于机器本身的问题也更容易不可判定。"],
        example:{title:"为什么奇数个 1 是 regular",prompt:"构造只接受包含奇数个 1 的二进制串的 DFA。",steps:["只需记目前 1 的个数是偶还是奇。","设 E 为偶状态、O 为奇状态，初态 E。","读 0 不改变奇偶；读 1 在 E/O 间切换。","接受状态只有 O。"],result:"两个状态已足够，因为未来判断只依赖奇偶，不依赖具体个数。"},
        practice:{q:"语言 {0^n1^n:n≥0} 为什么两个状态不够？",hint:"n 可以多大？读完 0 后需要保留什么？",a:"需要记任意大的 0 数量，才能核对随后 1 的数量。任何固定数量状态都会把两个不同计数混在同一状态，最终无法区分。"}
      },
      {
        plain:"Pumping Lemma 是反证工具：若语言可由小记忆机器识别，足够长的接受路径必然重复，于是某一段可以重复或删除。证明非regular/CFL，就是选一条串让“无论对手选哪段可泵”，你都能泵坏。",
        steps:["先假设语言属于目标类，并取得 pumping length p。","你选择一条专门卡在边界的 w∈L。","对手选择任意满足长度限制的分割；你的证明必须覆盖全部分割。","你根据分割位置选择 i，展示 pump 后违反语言定义。","矛盾来自 lemma 保证 pump 后仍应在语言，而你证明它不在。"],
        example:{title:"证明 {0^n1^n} 非regular",prompt:"使用 regular pumping lemma。",steps:["假设 regular，取 pumping length p。","选 w=0^p1^p。","任意 w=xyz 且 |xy|≤p、|y|>0，y 只能由至少一个 0 构成。","取 i=0 删除 y，0 的数量少于 p，1 仍为 p。","所得串不再是相同数量的 0 后接 1，矛盾。"],result:"关键句是“任意合法分割的 y 都落在第一块”，不是只选 y=0。"},
        practice:{q:"为什么不能写“令 y=第一个 0”就结束？",hint:"lemma 中谁选择分割？",a:"为证明非regular，你必须击败所有满足条件的分割。只指定一个 y 只说明某个分割会失败，不能排除另一个分割满足 lemma。"}
      },
      {
        plain:"Decidable 与 recognisable 的差别只在 no-instance。若你能系统枚举证据并在找到时接受，就可能得到 recogniser；若无证据时搜索永不结束，它就不是 decider。",
        steps:["写机器时先声明 On input 的编码。","Decider 的每个 loop 都必须有有限上界，或在有限图上完成。","同时模拟无限多个任务用 dovetail：第 1 轮各跑 1 步，第 2 轮加入新任务并各跑 1 步。","若 L 与 complement 都 recognisable，可并行跑两个 recogniser；总有一个接受，因此得到 decider。"],
        example:{title:"识别 TM 语言非空",prompt:"L={⟨M⟩:L(M)≠∅}。",steps:["按长度枚举所有输入 w1,w2,...。","第 t 轮模拟 M(w1)...M(wt) 各 t 或新增一步。","若任何模拟接受，立即 accept。","若语言为空，没有模拟接受，机器永远继续；这符合 recogniser 对 no 可循环。"],result:"不能先完整运行 M(w1) 再试 w2，因为 M(w1) 可能永不停止。"},
        practice:{q:"若一个语言及其补语言都 recognisable，为什么它 decidable？",hint:"并行运行两个 recogniser。",a:"对输入 x 交错运行 R_L(x) 与 R_complement(x)。x 必属于其中一侧，对应 recogniser 最终接受；据接受哪一侧输出 accept/reject，因此总会停机。"}
      },
      {
        plain:"Mapping reduction 不是“两个问题很像”，而是写一个保证停机的翻译器 f。它把已知难题的 yes 精确送到目标语言 yes（或目标补集 yes），这样目标若可判定，就能反过来解决已知难题。",
        steps:["先决定 reduction 方向 A≤mB，并在全文保持一致。","F 接收 A-instance，只负责构造 B-instance；F 本身不能等待原机器是否停机。","把未知事件放进构造出的新机器/程序 N 的运行过程。","分 yes 与 no 两个方向证明 x∈A iff f(x)∈B。","说明构造有效且 F 总停机，再用“假设 B decider”导出 A decider 矛盾。"],
        example:{title:"用 HALT 控制一个程序是否 increment",prompt:"构造 Java 程序 N，使 M 在 w 停机 iff N 最终把两个变量各加一。",steps:["F 把 M 和 w 的描述直接嵌入 N 的源码，因此构造文本有限且会停机。","N 先 int a=0,b=0。","N 模拟 M(w)。","只有模拟返回后才执行 a++;b++;。","M(w) 停机时属性成立；不停机时 increment 永不可达。"],result:"未知计算发生在 N 运行时，不发生在 reduction F 构造时。"},
        practice:{q:"为什么 F 不能先运行 M(w)，停机后再输出 N？",hint:"当 M(w) 不停机时 f 是否仍是 total computable function？",a:"不能。Mapping reduction 的 f 必须对每个输入都停机并输出目标实例；若 F 等待 M(w)，在 no-instance 上可能永不返回。"}
      },
      {
        plain:"证明 in NP 不需要找到答案，只需说明：如果有人递给你一个正确答案的短证书，你可以在多项式时间内检查它。",
        steps:["先写 certificate 的具体数据结构和最大长度。","检查格式、成员范围和不重复，防止伪证书钻空子。","逐条检查问题要求，并在失败时 reject。","所有检查通过才 accept。","按输入规模 n、m 写 worst-case runtime，说明是 polynomial。"],
        example:{title:"CLIQUE 的 verifier",prompt:"给定 G=(V,E)、k，证书是一组 k 个顶点。",steps:["检查证书恰有 k 项且每项属于 V。","检查 k 个顶点互不相同。","对每一对顶点 u,v 检查 (u,v)∈E。","若任一边缺失 reject，否则 accept。","邻接矩阵下两两检查 O(k²)，证书长度 O(k log|V|)。"],result:"存在这样的证书 iff 图中存在 k-clique，因此语言在 NP。"},
        practice:{q:"“枚举所有 k 顶点子集直到找到 clique”能证明 in NP 吗？",hint:"NP verifier 是否需要搜索证书？",a:"这通常是指数搜索，不能作为多项式 verifier。in NP 证明让证书作为额外输入，只检查给定子集。"}
      },
      {
        plain:"NP-complete 要完成两件事：它自己在 NP；任何 NP 问题至少不会比它更难，实践中从一个已知 NP-complete 问题归约到它来证明 NP-hard。",
        steps:["先引用或重做目标语言 ∈NP。","选择已知 NP-complete 源问题，例如 3-SAT。方向必须是 3-SAT≤p目标。","写构造、证明 yes→yes 与 yes←yes。","证明构造顶点、边和运行时间都是 polynomial。","最后合并 NP-hard 与 in NP 得 NP-complete。"],
        example:{title:"3-SAT 到 CLIQUE 的三层图",prompt:"公式有 3 个 clauses，每个 3 个 literals。",steps:["每个 clause 的每个 literal 建一个顶点，共 9 个。","同一 clause 内不连边。","不同 clause 之间，除互为否定的 literals 外全部连边。","设 k=3。满足赋值每 clause 选一个真 literal，三者不冲突，构成 clique。","反过来 3-clique 必须每层取一点且不矛盾，可给出一致满足赋值。"],result:"k 必须等于 clause 数；边编码“这两个选择可以同时为真”。"},
        practice:{q:"为什么同一 clause 的两个顶点不能连边？",hint:"一个大小为 clause 数的 clique 应怎样分配选择？",a:"不连边强迫 clique 至多从每个 clause 选一个点；要达到 k=clause 数，就恰好每个 clause 选一个 literal。"}
      }
    ],
    exam:[
      {
        question:"Q1(a) 要证明一个带分隔符和线性不等式的语言非regular；Q1(b) 要用 CFL pumping lemma 处理二进制数值比较。",
        parts:[
          {label:"1(a)",ask:"证明 L1A={0^m<0^n:n>2m≥0} 非regular。",steps:["假设 L1A regular，令 p 为 pumping length。","选 w=0^p<0^(2p+1)，它满足 2p+1>2p。","任意 w=xyz，|xy|≤p 且 |y|>0；所以 y=0^t，1≤t≤p，完全位于左块。","取 i=2，得到左块长度 p+t，右块仍 2p+1。","要求 2p+1>2(p+t)，但右侧至少 2p+2，不成立；pump 后不在语言，矛盾。"],final:"因此 L1A 不是 regular。"},
          {label:"1(b)",ask:"证明二进制 u<v 的语言非CFL。",steps:["先明确选择一族能把数值比较变成严格长度/位模式约束的串，并验证在语言中。","设 pumping length p，选择分隔符两侧结构都长于 p 的边界串。","对任意 uvxyz，利用 |vxy|≤p 说明 v、y 只能落在一个局部区域或跨一个边界。","按落在左数、分隔符附近、右数等情况分类，取 i=0 或 2。","每种情况说明 pump 后格式失效或原本 u<v 的数值关系反转/不再成立。"],final:"CFL 题得分核心是覆盖 v、y 的所有位置；应按试卷空间写清分类，而不是只给一种分割。"}
        ]
      },
      {
        question:"Q2(a) 要决定 FA 接受串是否全为偶长；Q2(b) 要识别一个 TM 的语言是否非空。",
        parts:[
          {label:"2(a)",ask:"构造 L2A decider。",steps:["输入 ⟨M⟩，验证它是 FA 编码。","构造 product states (q,parity)，parity 初始 even，每读一个符号翻转。","在有限 product graph 中从 (q0,even) 做 BFS/DFS。","若可达 (q_accept,odd)，说明存在奇长接受串，reject。","若搜索完成仍不可达，accept；图有限所以总停机。"],final:"D 决定 L2A，因此 L2A decidable。"},
          {label:"2(b)",ask:"构造 L2B recogniser。",steps:["输入 ⟨M⟩，枚举 {a,b}* 为 ε,a,b,aa,...。","使用 dovetail 交错模拟 M 在所有已枚举串上的运行。","任何一次模拟进入 accept 就 accept。","若 L(M)=∅，机器持续模拟但不错误接受。"],final:"T 在且仅在 L(M) 非空时接受，因此 L2B Turing-recognisable。"}
        ]
      },
      {
        question:"Q3 要从 HALT 归约，证明“TM 只接受偶长串”这一性质不可判定。",
        parts:[
          {label:"Q3",ask:"给出完整 mapping reduction。",steps:["先选择 L 为 L3 或 complement，使构造的 iff 最自然；在模板空格明确填写。","输入 ⟨M,w⟩，F 构造 TM N。","N 对输入 u：若 u 是某个固定奇长串（如 0），模拟 M(w)；若模拟停机则 accept；其他输入按构造需要拒绝。","若 M(w) 停机，N 接受奇长串，故 N 不属于“只接受偶长串”；若不停机，N 不接受任何奇长串，性质成立。","因此得到 HALT 到 complement(L3) 的 iff；若 complement(L3) 可判定则 HALT 可判定，矛盾。"],final:"L3 及其补集都不可判定；模板中的 L 必须与你证明的 iff 方向一致。"},
          {label:"Q4",ask:"构造 recogniser 并推出另一侧不可识别。",steps:["“存在一个被 M 接受的奇长串”有有限见证，因此对应 complement(L3)。","枚举所有奇长二进制串并 dovetail 模拟 M。","若任何一个被接受，recogniser accept。","所以 complement(L3) recognisable。","若 L3 也 recognisable，则 L3 与补集两 recogniser 可并行组成 decider，与 Q3 矛盾；故 L3 not recognisable。"],final:"complement(L3) Turing-recognisable，而 L3 not Turing-recognisable。"}
        ]
      },
      {
        question:"Q5 把 HALT 行为嵌入 Java 程序，目标属性是初始化多个整数并在以后把每个至少 increment 一次。",
        parts:[
          {label:"Q5",ask:"证明 Java 行为语言不可判定。",steps:["假设目标语言 L5 decidable。","F 输入 ⟨M,w⟩，输出 Java 程序 J 的文本。","J 初始化 int a=0,b=0；随后模拟 M(w)；模拟若返回则执行 a++;b++;。","F 只写出代码，不运行模拟，所以 F 总停机。","M(w) 停机 iff J 最终 increment 两变量 iff ⟨J⟩∈L5。","用假设的 L5 decider 可决定 HALT，矛盾。"],final:"因此 L5 undecidable；若选择补语言，必须同步调整 iff 与模板。"}
        ]
      },
      {
        question:"Q6 分别为 CLIQUE 形式的岛屿问题和长度恰为 k 的 simple path 写 polynomial verifier。",
        parts:[
          {label:"6(a)",ask:"证明岛屿 fully-connected subset 在 NP。",steps:["证书 c 是 k 个岛屿的列表。","检查数量、属于 V、互不重复。","检查所有 C(k,2) 对之间都有 boat edge。","全部通过 accept；邻接矩阵下 O(k²)，是 polynomial。"],final:"给出 certificate、verifier、runtime 三项后得 L6A∈NP。"},
          {label:"6(b)",ask:"证明 exact simple a-b path 在 NP。",steps:["证书为 v0...vk，共 k+1 个顶点。","检查 v0=a、vk=b、每点属于 V。","检查所有顶点互不重复。","对 i=0..k-1 检查 (vi,vi+1)∈E。","哈希集合与邻接矩阵下 O(k²) 或更好，均为 polynomial。"],final:"路径长度 k 指 k 条边，所以证书有 k+1 个顶点。"}
        ]
      },
      {
        question:"Q7 用 3-SAT→CLIQUE 证明岛屿问题 NP-complete，并画出题给四 clause 公式的输出图。",
        parts:[
          {label:"7(a)",ask:"写 NP-completeness 证明。",steps:["引用 Q6(a)：L6A∈NP。","对每个 clause 的每个 literal 建 vertex。","只在不同 clauses 且不互相否定的两个 vertices 间加 edge。","输出 (G,k)，k=clauses 数。","满足赋值→每 clause 选真 literal→k-clique；k-clique→每 clause 一个互不矛盾 literal→一致满足赋值。","构造 O(x²) 规模/时间，因此 polynomial，L6A NP-hard；结合 in NP 得 NP-complete。"],final:"方向必须是 3-SAT≤pL6A。"},
          {label:"7(b)",ask:"画给定四 clause 公式的 reduction 图。",steps:["画四列/四层，每层对应一个 clause，各有三个 literal 顶点。","同层不连边。","跨层时逐对检查，互补 literals 不连，其余连。","标 k=4，并圈出一组对应满足赋值的四点 clique。"],final:"图的判分点是分层、互补不连、k=4 和一个可见 clique。"}
        ]
      }
    ]
  },
  cs608: {
    start:{
      title:"把测试理解成一条可追踪的证据链",
      intro:"CS608 不是“多试几个输入”。每道设计题都要回答五件事：依据哪条规格、要覆盖什么、为什么选这个值、怎样调用、预期结果是什么。只要沿着这条链走，EP、Branch Coverage、class context 和随机测试只是覆盖目标不同。",
      blocks:[{t:"先读规格",p:"圈出输入范围、边界、条件组合、错误处理和所有可能输出。"}, {t:"再定义覆盖目标",p:"黑盒覆盖 partition/rule；白盒覆盖 statement/branch；对象测试还覆盖 pre-state。"}, {t:"最后做成表",p:"TCI、selected value、test case、expected result 和 coverage mapping 必须能互相追踪。"}]
    },
    glossary:[["Test oracle","判断 actual result 是否正确的规则或机制。"],["TCI","Test Coverage Item，要被至少一个测试覆盖的抽象项目。"],["Partition","被认为行为相同的一组输入或输出。"],["Branch","一个 decision 的 true 或 false 出口。"],["Class context","连同对象构造、状态设置和观察一起测试方法。"],["MTBF","平均故障间隔；总运行时间除以观察到的故障数的估计。"]],
    learn:[
      {
        plain:"测试不是证明没有 bug，而是在有限预算下有系统地寻找故障并建立信心。穷举测试常因输入域相乘而爆炸，所以要用覆盖标准挑少量代表。",
        steps:["区分 fault（代码缺陷）、error（内部错误状态）、failure（外部可观察错误）。","一个 test case 至少写 inputs、preconditions/call sequence、expected result。","先算自然输入域的数量；多个参数组合数相乘。","再说明时间、存储和 oracle 成本，使 exhaustive testing 不现实。"],
        example:{title:"calc(int a,int b,int c,short d) 为什么不能穷举",prompt:"四个整数类型参数全部取遍。",steps:["Java int 有 2^32 个可能值，三个 int 共 (2^32)^3。","short 有 2^16 个值。","组合总数 2^(32×3+16)=2^112。","即使每秒执行十亿个测试，也远超可用时间；还未计算 expected result 和环境成本。"],result:"用数量级和实际速率共同说明不可行，比只写“组合太多”更完整。"},
        practice:{q:"一个 boolean 和一个 byte 参数共有多少输入组合？",hint:"boolean 有 2 个，byte 有 256 个。",a:"2×256=512。是否可穷举还取决于单次执行和 oracle 成本，但数量本身可控。"}
      },
      {
        plain:"Equivalence Partitioning 假设同一 partition 内的值会触发相同处理，因此选一个代表。Value line 帮你先看清自然范围和规格边界，避免漏掉 error partition。",
        steps:["为每个输入先画类型自然范围，再标规格允许范围和行为切换点。","给每个 input partition 编号；所有非法区也要独立编号并加 *。","为每个 output 建 output TCI。","选 representative 时先做一个全合法 base case，再一次改变一个条件。","填写 TC→TCI mapping，删除没有新增覆盖的重复测试。"],
        example:{title:"温度分类的 EP",prompt:"输入 int temp；<0 返回 COLD，0..30 OK，>30 HOT。",steps:["自然范围是整个 int；规格行为在 0、30 两处改变。","Partitions：P1 temp<0，P2 0≤temp≤30，P3 temp>30。","选 -1、15、31 为代表，而不是把每个边界周围值都塞进 EP。","Outputs COLD/OK/HOT 各应由至少一个 TC 覆盖。"],result:"若题目要求 BVA，才额外选 -1/0、30/31；不要混淆 EP 与 BVA 交付物。"},
        practice:{q:"Charging 的 battLevel=-1、dischargeRate=300 能否放在同一个 error TC？",hint:"一个 TC 同时破坏两个参数时，能确定哪个 error partition 被独立处理吗？",a:"不宜。应一次只让一个参数非法，另一个保持合法，从而独立覆盖并追踪每个 error partition。"}
      },
      {
        plain:"白盒测试从代码控制流出发。Branch Coverage 不只要求每行变绿，还要求每个判定的 true 和 false 出口都走过。JaCoCo 黄色通常表示同一行的部分分支未走。",
        steps:["画或阅读 control-flow，给每个 decision 的 T/F branch 编号。","根据现有测试和覆盖颜色找 untaken branch。","把走该 branch 的条件写成布尔约束，再求一组输入。","只添加能覆盖新 branch 的最小测试。","用 TestNG 把 Arrange、Act、Assert 和 expected result 写完整。"],
        example:{title:"enabled && exists 的 branch",prompt:"现有测试只用 enabled=false。",steps:["Java 短路使 enabled=false 时 exists 条件可能根本不求值。","要让第二条件 true，需 enabled=true、exists=true。","要让第二条件 false，需 enabled=true、exists=false。","两个测试才能覆盖 exists decision 的 T/F；只有行执行过不等于分支全覆盖。"],result:"先写未走分支，再解条件，比盲猜 inputs 更可靠。"},
        practice:{q:"100% statement coverage 是否保证 100% branch coverage？",hint:"一个 if 的 body 被执行过一次，else/false 是否一定走过？",a:"不保证。测试让条件 true 可执行 if body 并覆盖所有 statements，但 false branch 仍可能从未发生。"}
      },
      {
        plain:"实例方法的结果可能写入对象字段而不直接 return。此时测试必须先建立对象状态，调用被测方法，再通过 accessor 观察结果；这就是 class context。",
        steps:["列出 constructor、被测方法、每个 attribute 的 setter/getter。","把 parameter partition 与调用前 attribute state partition 一起组合。","每个 TC 写完整方法顺序，而非只写一个输入值。","对有返回值的每次调用写 expected；对 void 方法通过 getter 建 oracle。","测试间新建对象或重置状态，避免前一 TC 污染后一 TC。"],
        example:{title:"Shipping.decide 的调用链",prompt:"非Prime顾客订单 €120 应免费。",steps:["Shipping s=new Shipping() 建立默认 prime=false。","s.setPrime(false) 明确 pre-state。","s.decide(120) 修改 freeShipping。","actual=s.isFree() 观察状态。","assert actual==true，因为非Prime但 value>100。"],result:"Test case 表中应按这一顺序列出所有 calls，而不只是写 (false,120,true)。"},
        practice:{q:"decide() 返回 void，为什么仍可测试？",hint:"对象是否提供可观察结果的方法？",a:"可以。调用 decide 后用 isFree() 读取 freeShipping，并与 expected 比较；isFree 是 test oracle 的观察接口。"}
      },
      {
        plain:"随机测试不是随便生成数。先用 Decision Table 固定要覆盖的 rule，再只在该 rule 对应区间内随机；这样同时得到结构覆盖与多样数据。",
        steps:["为每条 rule 写 causes 的真值与 expected effect。","把数值 cause 翻译成随机区间，例如 lux<5000→0..4999。","boolean cause 直接固定 true/false，不随机到不可控。","循环生成时保存 seed、输入和失败日志，确保可复现。","MTBF 测试还需使用接近真实使用频率的 operational profile。"],
        example:{title:"inclusive genRand",prompt:"生成 min 到 max（两端都含）的均匀 int。",steps:["区间元素数是 max-min+1。","random.nextInt(bound) 产生 0..bound-1。","令 bound=max-min+1。","最后加 min，得到 min..max。","先验证 max≥min，并注意 max-min+1 的整数溢出。"],result:"return min + random.nextInt(max-min+1)。"},
        practice:{q:"要满足 lux≥5000，写 rand(5000..4999) 对吗？",hint:"下界是否小于上界？题目是否给出有效最大值？",a:"不对。应使用规格或测试设定的合法上界，例如 rand(5000..100000)，并说明上界来源；若完整 int 域，生成方法需避免溢出。"}
      },
      {
        plain:"Agile 中测试贯穿每个迭代；白盒测试贴近实现，所以重构常迫使它更新。数值、AI、移动端等专题提供额外风险，但今年卷只直接抽取 Agile 解释。",
        steps:["在 backlog/refinement 阶段澄清 acceptance criteria。","开发中写 unit/component tests，CI 每次提交运行。","Sprint 内做集成、探索与回归，review 后继续监控。","黑盒测试依赖外部规格；实现重构但行为不变时通常仍有效。","白盒测试依赖内部 branch/path，结构改变后覆盖映射与测试可能要改。"],
        example:{title:"风险投入曲线怎样解释",prompt:"为什么测试投入不是越高越好？",steps:["测试投入增加，发现/避免故障带来的预期收益先快速上升。","边际上越来越难找到新问题，收益曲线逐渐变平。","测试成本随投入持续增加。","净利润=避免损失的收益-测试成本，在两曲线边际差为零附近最大。"],result:"最优点不是零风险，而是新增一单位测试的预期收益等于新增成本。"},
        practice:{q:"方法内部从 if 改成 table lookup，但外部行为不变，哪类测试更可能无需修改？",hint:"哪类测试只依赖 specification？",a:"黑盒测试更可能无需修改；以旧 branch 为 TCI 的白盒测试需要重新分析覆盖结构。"}
      }
    ],
    exam:[
      {
        question:"Q1 先解释穷举不可行，再对 Charging.required 完成 value line、input/output partitions、TCI、代表值与无重复 EP 测试。",
        parts:[
          {label:"1(a)",ask:"解释 calc 的 exhaustive testing 不可行。",steps:["三个 int 各 2^32，short 为 2^16。","组合数为 2^112≈5.19×10^33。","即使每秒 10^9 次也需约 5.19×10^24 秒。","还未包括 expected result、测试启动和报告成本。"],final:"用输入域乘积和数量级得出穷举不可行。"},
          {label:"1(b)",ask:"画 Charging 的范围并定义 partitions。",steps:["battLevel 自然 short 范围；规格合法 0..100，非法 <0、>100。","dischargeRate 自然 short；规格合法 0..255，非法 <0、>255。","合法组合内：FAST 当 batt<10 且 rate>50；SLOW 当 batt<50 且非FAST；NONE 其余。","Input TCIs 要能区分 batt 行为段与 rate 行为段；Output TCIs 为四个 enum。"],final:"两条 value line、输入表、输出表全部列 error partitions 并加 *。"},
          {label:"1(c)",ask:"给最小、可追踪的 EP tests。",steps:["先选合法代表：FAST (9,51)→FAST。","SLOW 可选 (10,51) 或 (49,50)→SLOW。","NONE 选 (50,50)→NONE。","四个错误区各单独测试：(-1,合法)、(101,合法)、(合法,-1)、(合法,256)→PARAM_ERROR。","在 TCI 表写每个 TCI 被哪个 TC 覆盖；若两个 TC 覆盖集合完全重复，删除一个。"],final:"卷面至少包含 TCI、selected values、TC 三表及 output coverage。"}
        ]
      },
      {
        question:"Q2 从 JaCoCo 部分覆盖补 Filestore branch tests，再写 TestNG 结构并解释 Agile 中测试维护。",
        parts:[
          {label:"2(a)",ask:"根据实际代码截图补 Branch Coverage。",steps:["把黄色行的每个 compound decision 拆成可观察的 T/F branch。","结合现有 EP tests 标出未走 branch。","由逻辑 enabled∧((¬exists∧¬overwrite)∨(exists∧overwrite)) 解输入。","为每个未走 branch 给 enabled/exists/overwrite 和 expected。","完成 TCI 表与 TC 表，并说明短路条件是否被求值。"],final:"由于试卷截图决定具体未走分支，作答时必须以图中的行号和现有覆盖为准，不能只抄通用四组合。"},
          {label:"2(b)",ask:"写 TestNG outline。",steps:["import org.testng.Assert 与 org.testng.annotations.Test。","定义 public test class。","每个 TC 用 @Test 方法，Arrange 三个 boolean。","Act：Boolean actual=Filestore.decideWrite(...);。","Assert.assertEquals(actual, expected);；可用 @DataProvider 合并表格。"],final:"annotation、class、method、call、expected assertion 五层结构必须出现。"},
          {label:"2(c)",ask:"画 Scrum 并解释白盒维护。",steps:["画 Product Backlog→Sprint Planning→Sprint/Development→Review→Retrospective→下一轮。","在 refinement/acceptance、开发单元测试、CI、集成与回归位置标 testing。","白盒测试和行/branch 强耦合，重构改变控制流会频繁更新。","黑盒测试来自稳定规格，内部实现变化而外部行为不变时可复用。"],final:"测试不是 Sprint 末尾单独阶段，而是整个循环中的活动。"}
        ]
      },
      {
        question:"Q3 比较 Level 的静态方法测试与 class-context 测试，再为 Shipping.decide 交付完整 EP 设计。",
        parts:[
          {label:"3(a)",ask:"写两种调用顺序与 oracle 位置。",steps:["静态：actual=Level.checkLevel(x)→assert actual==expected。","class context：obj=new Level(x)→obj.isValid()→actual=obj.getResult()→assert。","checkLevel 直接 return；isValid 把结果写入字段，所以需 getter。","明确 constructor 建立 attribute l，getResult 负责观察 result。"],final:"用调用序列或时序图展示 actual 与 expected 在哪里比较。"},
          {label:"3(b)",ask:"完成 Shipping class-context EP。",steps:["accessors：isFree 观察 freeShipping；setPrime 控制 primeCustomer；题面没有 value 字段，value 是 decide 参数。","value line：负数合法；≤100 与 >100 分区，100 不免费、101 免费（非Prime）。","pre-state prime=true/false；outputs free/not free。","核心 TCs：prime T+任意 value→free；prime F+101→free；prime F+100→not free；prime F+negative→not free/覆盖负数合法段。","每个 TC 写 new→setPrime→decide→isFree→expected，并补 TCI mapping。"],final:"不要把负 value 标 error；必须通过 isFree 建立 oracle。"}
        ]
      },
      {
        question:"Q4 对 SolarPanel 的四条 Decision Table rules 做约束随机测试，写自动化与 inclusive generator，再解释 MTBF 和风险投资。",
        parts:[
          {label:"4(a)",ask:"完成四条 Random DT tests。",steps:["Rule1 grid=true,lux<5000：lux rand(0..4999)，expected false。","Rule2 grid=true,lux≥5000：lux rand(5000..合法上界)，expected true。","Rule3 grid=false,lux<5000：rand(0..4999)，expected false。","Rule4 grid=false,lux≥5000：rand(5000..上界)，expected false。","表中每行写 rule、固定 boolean、随机 criteria、expected。"],final:"5000 属于 ≥5000 的 Rule2/4，不属于 <5000。"},
          {label:"4(b)(c)",ask:"写自动化框架和 genRand。",steps:["为每条 rule 循环 N 次，生成 lux，调用 enable。","用 assertEquals(actual,expected)，失败记录 seed/rule/input。","genRand 检查 max≥min。","返回 min+random.nextInt(max-min+1)。"],final:"代码需包含 generator、循环、oracle/assert、日志或可复现 seed。"},
          {label:"4(d)",ask:"解释 MTBF 与 risk investment。",steps:["按代表真实使用的 operational profile 长时间自动运行。","记录每次 failure 的时间和输入，并在修复/重置规则一致的前提下计算总运行时间/failure count。","用 risk=probability×impact 优先测试高风险功能。","画 avoided-loss benefit 上升后趋平、testing cost 上升、net profit 先升后降。","最优投入在净利润最高或边际收益等于边际成本处。"],final:"MTBF 估计依赖工作负载代表性；零 failure 不能直接声称无限 MTBF。"}
        ]
      }
    ]
  },
  cs616: {
    start:{
      title:"先把所有密码计算还原成三件事",
      intro:"CS616 看起来算法很多，但计算主线很稳定：在指定模数中表示数据、用密钥执行可逆或单向运算、最后验证安全目标。第一次学习先写清进制、模数和公式，再代数；不要在十六进制、十进制和不同 modulus 之间心算跳跃。",
      blocks:[{t:"统一表示",p:"每道题第一行写 hex/decimal、mod p/q/n/q² 和字符编码。"}, {t:"拆小运算",p:"逆元、快速幂、XOR、点加和多项式约简分别计算，每步保留余数。"}, {t:"回代验证",p:"恢复 key/root/signature 后代回公开公式，确认结果而不是只报数字。"}]
    },
    glossary:[["Mod n","两个整数相差 n 的倍数时视为同一个余数类。"],["Inverse","a⁻¹ 满足 aa⁻¹≡1 mod n。"],["Nonce","只用一次的随机数；重复或可预测常泄漏密钥。"],["MAC","用共享密钥验证消息完整性与来源。"],["Public key","可公开的加密/验证参数；私钥用于解密/签名。"],["Ring","可做加减乘的代数集合；RLWE 中多项式还要按模多项式约简。"]],
    learn:[
      {
        plain:"模运算像时钟：结果只保留除以 modulus 的余数。密码学的大数字计算靠 gcd、逆元、平方-乘和 CRT 拆解。",
        steps:["先把题目所有十六进制数转换或明确保留 hex，禁止混算。","用 extended Euclid 求 ax+ny=1，其中 x 就是 a⁻¹ mod n。","大指数用 repeated squaring：连续平方并按指数二进制位相乘。","合数模平方根先在 p、q 下分别求根，再用 CRT 组合四种符号。"],
        example:{title:"求 7⁻¹ mod 26",prompt:"找到 x 使 7x≡1 mod26。",steps:["Euclid：26=3×7+5；7=1×5+2；5=2×2+1。","倒代：1=5-2×2=5-2(7-5)=3×5-2×7。","再代 5=26-3×7：1=3×26-11×7。","所以 -11 是逆元，mod26 为 15。"],result:"7×15=105≡1 mod26。"},
        practice:{q:"6 在 mod 26 下有逆元吗？",hint:"计算 gcd(6,26)。",a:"没有，gcd=2≠1。只有与 modulus 互素的元素才有乘法逆元。"}
      },
      {
        plain:"Affine digraph 把两个字符先变成一个 0..675 的数，再做线性同余。零知识协议则让 prover 在不泄露 secret 的情况下证明知道它；challenge 固定会破坏“不能提前准备答案”的安全基础。",
        steps:["digraph 先确定字符到 0..25 的映射和组合规则，例如 26x+y。","加密写 c≡am+b mod26²；解密需要 a 的逆元。","ZK transcript 分 commitment、random challenge、response、verification。","攻击分析要展示 attacker 如何利用已知 challenge 反向挑 commitment/response 使验证等式成立。"],
        example:{title:"为什么固定 challenge 危险",prompt:"验证者永远发送 challenge=1。",steps:["正常协议要求 prover 在 commitment 发送后才知道随机 challenge。","若 challenge 永远为 1，攻击者在发送 commitment 前已经知道要回答哪条分支。","攻击者可先选 response R，再由 verification equation 反算 commitment。","验证等式会成立，但 attacker 从未展示能回答其他 challenge。"],result:"soundness 依赖不可预测且有足够熵的 challenge；固定挑战只检查一段可伪造 transcript。"},
        practice:{q:"把 challenge 在 0 和 1 之间真正随机选择有何改进？",hint:"攻击者在 commitment 前能否确定准备哪一种 response？",a:"攻击者只能预先准备一个分支时，单轮作弊成功率至多约 1/2；重复独立轮次可指数降低成功率。"}
      },
      {
        plain:"AES 是固定 128-bit block 的置换；mode 决定怎样处理长消息或产生字节级 keystream。认证加密还要阻止攻击者修改 ciphertext 并观察解密差异。",
        steps:["AddRoundKey 是逐 byte XOR，因此 roundKey=before XOR after。","CTR/OFB/CFB 可把 block cipher 输出变成流；明确 IV/counter 和取哪个 byte。","ETM 使用独立 Ke、Km：先 C=Enc(Ke,M)，再 T=MAC(Km,C)。","接收者必须先验证 T，失败立即丢弃，成功才 decrypt。","CIA：encryption 给 confidentiality，MAC 给 integrity/authenticity；availability 需其他机制。"],
        example:{title:"单字节 stream 解密",prompt:"keystream byte=0xAD，cipher byte=0x20。",steps:["流模式中 C=P XOR K，所以 P=C XOR K。","0x20=0010 0000。","0xAD=1010 1101。","逐位 XOR 得 1000 1101=0x8D。"],result:"P=0x20 XOR 0xAD=0x8D；具体题必须按图说明 keystream byte 的选取。"},
        practice:{q:"为什么 ETM 验证失败后不能仍尝试解密并返回不同错误？",hint:"攻击者能从错误差异学到什么？",a:"这会形成 decryption/padding oracle。先统一验证 MAC 并在失败时不解密、不泄露细节，可阻断 adaptive ciphertext 查询。"}
      },
      {
        plain:"RSA 的私钥来自 φ(n) 上的逆元；Rabin 解密是开平方。Textbook Rabin 的危险在于：若解密 oracle 返回攻击者所提交平方的另一个根，两个根的差会暴露 n 的因子。",
        steps:["RSA 先 factor n=pq，再 φ=(p-1)(q-1)，最后 d=e⁻¹ modφ。","验证 ed≡1 modφ，不要在 mod n 下求 inverse。","Rabin 对 c=R² modN 返回根 Y。若 Y≠±R modN，R 与 Y 是不同平方根。","计算 gcd(R-Y,N) 与 gcd(R+Y,N)，其中一个给非平凡因子。","防御使用 redundancy/CCA-secure padding、ciphertext validity check，不能裸用 textbook Rabin。"],
        example:{title:"不同平方根为何泄漏因子",prompt:"R²≡Y² mod N。",steps:["移项得 R²-Y²≡0 modN。","因式分解：(R-Y)(R+Y) 是 N 的倍数。","当 Y 不是 ±R modN 时，N 的两个素因子通常分别整除两个因子。","gcd 能从其中抽出 p 或 q。"],result:"这不是暴力分解，而是利用 decryption oracle 暴露的不同根。"},
        practice:{q:"若 oracle 返回 Y=R，会得到因子吗？",hint:"gcd(R-Y,N)=gcd(0,N)。",a:"只得到 N；另一个 gcd 通常为 1 或 N，没有非平凡因子。攻击依赖返回不同于 ±R 的根。"}
      },
      {
        plain:"椭圆曲线点不是普通坐标向量。加法由穿过两点的直线与曲线第三交点定义，再关于 x 轴反射；在有限域中所有除法都变成乘逆元。",
        steps:["先检查点在曲线上；未知 b 用 b≡y²-x³-ax modp。","P≠Q 用割线 slope；P=Q 用 tangent slope (3x²+a)(2y)⁻¹。","算 x3=λ²-x1-x2，y3=λ(x1-x3)-y1，全部 modp。","重复加得到 nP；第一次到 infinity O 的 n 是点阶。","ECDSA 验证在 mod q 下算 w,u1,u2，再做曲线点运算，最后比较 x modq 与 r。"],
        example:{title:"ECDSA 验证的路线",prompt:"给 public point Y、base P、hash h、signature(r,s)。",steps:["检查 r,s 在 1..q-1。","w=s⁻¹ modq。","u1=h·w modq，u2=r·w modq。","X=u1P+u2Y。","v=X_x modq；v=r 才有效。"],result:"标量运算 mod q，点坐标运算 mod p；两个模数不要混淆。"},
        practice:{q:"为什么 ECDSA 最后比较 X 的 x 坐标 mod q？",hint:"签名 r 的生成公式是什么？",a:"签名时 r=(kP)_x mod q，因此验证重构出对应点后必须用同样的映射比较。"}
      },
      {
        plain:"RLWE 把数据放进多项式 ring。解密的本质仍是“ciphertext 两部分相减消掉含 secret 的大项”，剩下编码消息加小噪声，再按阈值解码。",
        steps:["第一行写 Rq=Zq[y]/(y^n+1)，所以系数 modq 且 y^n=-1。","计算 s·c_aux，用普通多项式卷积。","所有 y^k(k≥n) 用 y^n=-1 降次，例如 y^(n+r)=-y^r。","逐系数算 c_msg-s·c_aux modq。","根据课程编码将靠近 0 或 q/2 等中心的系数还原 bit/hex。"],
        example:{title:"约简 y^10",prompt:"在 Z_83[y]/(y^8+1) 中化简 5y^10。",steps:["y^8≡-1。","y^10=y^8·y²≡-y²。","5y^10≡-5y²。","系数 mod83，-5≡78。"],result:"5y^10≡78y² mod(y^8+1,83)。"},
        practice:{q:"在同一 ring 中 y^16 等于什么？",hint:"(y^8)^2。",a:"y^16≡(-1)^2=1。不能把所有高次项都直接删掉。"}
      }
    ],
    exam:[
      {
        question:"Q1 是五个 8 分计算题，分别考固定 challenge ZK 攻击、Affine digraph、合数模平方根、ECC 和 RLWE。",
        parts:[
          {label:"1(a)",ask:"用 R=333 击败固定 challenge 的 ZK shift。",steps:["Schnorr/shift 型检查为 g^R≡commitment·f(secret)^c modp；这里 c 永远为 1。","攻击者先选 response R=333。由 333=5×64+13 和题给 2^64 mod991=827，可算 2^333 mod991=904。","697⁻¹ mod991=691，因此反向选择 commitment=904×691 mod991=334。","发送 commitment=334；收到必然的 c=1 后回答 R=333。","验证端算 334×697 mod991=904，恰等于 2^333 mod991，所以接受；攻击者却没有证明能回答其他 challenge。"],final:"伪造 transcript 为 (commitment,c,response)=(334,1,333)；固定挑战破坏 soundness。"},
          {label:"1(b)",ask:"由 mail→uwex 恢复 Affine digraph key。",steps:["用 A=0 映射和 26x+y：ma=312，il=219，uw=542，ex=127，modulus=26²=676。","建立 542≡312a+b、127≡219a+b (mod676)。","相减得 415≡93a；题给 93⁻¹=189，所以 a≡415×189≡19 mod676。","回代 b≡542-19×312≡22 mod676。","验证 19×312+22≡542，19×219+22≡127。"],final:"Affine digraph private key 为 (a,b)=(19,22) mod676。"},
          {label:"1(c)(d)",ask:"求平方根和椭圆曲线点。",steps:["平方根：p=0x20b=523，n=0x45d81=286081，所以 q=547=0x223。题给 residues 给出 mod p 根 ±415，即 415/108；mod q 根 ±62，即 62/485。","用 p⁻¹ modq=433 和 x=a+p((b-a)433 modq) 组合四对根。","四个十进制根为 163068、118090、167991、123013；平方 mod286081 均回到题给 radicand 0x3817b。","ECC：b≡14²-25³-13×25≡8 mod37，所以曲线 y²=x³+13x+8。","doubling 得 λ=(3×25²+13)(28)⁻¹≡15，故 2P=(3,0)；3P=(25,23)=-P，4P=O。"],final:"平方根为四个 CRT 结果；ECC 的 Q=2P=(3,0)，P 的 order n=4。"},
          {label:"1(e)",ask:"解密 RLWE 两字符。",steps:["ring 为 Rq=Z_83[y]/(y^8+1)，故 y^8=-1。","按 data sheet 把第一项视为 c_aux、第二项为 c_msg，计算 s·c_aux。","约简后 s·c_aux 的低到高系数为 [0,52,71,11,39,5,40,1]。","c_msg-s·c_aux mod83 得 [2,43,77,39,45,45,45,38]。","按靠近 0/83 与靠近 q/2 的阈值解码为 bits 01011111，即两个 hex characters 5F。"],final:"plaintext 为十六进制 5F（若再按 ASCII 解释，则是字符 underscore “_”）。"}
        ]
      },
      {
        question:"Q2 考 AES XOR、把 block cipher 工程成 8-bit stream，以及 ETM 抵抗 adaptive ciphertext 的结构。",
        parts:[
          {label:"2(a)",ask:"从 ARK 前后 state 求 round key。",steps:["把 before 对齐为 123456ff123456ff123456ff123456ff，after 为 a93456ff123456ff123456ff12345644。","ARK 是 S_after=S_before XOR K_round，所以 K=S_before XOR S_after。","首 byte：0x12 XOR 0xa9=0xbb；中间相同 bytes 全给 0x00；末 byte 0xff XOR0x44=0xbb。","拼成 16 bytes 并再 XOR 回去验证。"],final:"round key=bb0000000000000000000000000000bb。"},
          {label:"2(b)",ask:"选择 mode 模拟 8-bit cipher并恢复 plaintext byte。",steps:["可用 OFB/CTR 让 AES 先产生 128-bit keystream，再逐 byte 使用。","选择题面对应的 keystream byte；给出的 Ek(IV) 末 byte 为 0xdf，C1=0x20。","解密 P1=C1 XOR K1=0x20 XOR0xdf。","00100000 XOR11011111=11111111。"],final:"在取末 byte 的图示约定下 plaintext=0xff；卷面必须画清 byte 选取，否则数值没有依据。"},
          {label:"2(c)",ask:"完整解释 ETM。",steps:["ETM=Encrypt Then MAC。","发送：C=Enc_Ke(M;IV)，T=MAC_Km(IV||C)，发送 IV,C,T。","接收：先重算并常数时间比较 T；失败统一丢弃；成功后才 decrypt。","E&M 对 plaintext 做 MAC，若实现先 decrypt 才能验证，可能暴露 padding/格式错误 oracle。","ETM 满足 confidentiality 与 integrity/authenticity；不保证 availability。"],final:"独立 keys、先认证后解密、CIA 映射是三个主要得分点。"}
        ]
      },
      {
        question:"Q3 依次要求恢复 RSA d、利用 Rabin oracle 分解 N，以及按给定倍点验证 ECDSA。",
        parts:[
          {label:"3(a)",ask:"恢复 RSA private key d。",steps:["790199209=27611×28619。","φ(n)=27610×28618=790142980。","求 564387843⁻¹ mod790142980；extended Euclid 给 d=7。","验证 564387843×7 mod790142980=1。"],final:"RSA private exponent d=7，因数为 27611、28619。"},
          {label:"3(b)",ask:"完成 Rabin 攻击与防御。",steps:["R=23769451，提交 C=R² mod47479253=23004433。","oracle 返回另一根 Y=31423469。","gcd(|R-Y|,N)=gcd(7654018,47479253)=13523。","gcd(R+Y,N)=gcd(55192920,47479253)=3511；且 13523×3511=47479253。","攻击利用不同平方根；应使用带 redundancy/CCA security 的编码并拒绝非规范密文。"],final:"Rabin private factors 为 p=13523、q=3511（顺序可交换）。"},
          {label:"3(c)",ask:"验证 ECDSA signature (1,6)。",steps:["w=6⁻¹ mod7=6；h=22 mod7=1。","u1=1×6=6，u2=1×6=6 mod7。","在给定曲线上 6P=(13,15)，6Y=(1,14)；相加 X=(1,3)。","v=X_x mod7=1。","v=r=1，所以签名通过。"],final:"signature (r,s)=(1,6) valid。"}
        ]
      }
    ]
  },
  cs618: {
    start:{
      title:"从一个神经元开始，不预设你会线性代数",
      intro:"深度学习模型看起来巨大，但每层只做“输入乘权重、加偏置、经过函数”。训练就是比较预测与目标，再沿计算链反向调整参数。今年真题主要检查概念和尺寸/参数计算，所以先把每个数字来自哪里说清。",
      blocks:[{t:"看 shape",p:"每个 tensor 都写成高度×宽度×通道或样本×特征，先追踪尺寸。"}, {t:"数 parameters",p:"每个输出单元连接多少输入，再加几个 bias；不要把输出像素数量误当独立权重。"}, {t:"分数据职责",p:"training 学参数，validation 选超参数，test 只做最终评估。"}]
    },
    glossary:[["Tensor","多维数字数组；图片常是 H×W×C。"],["Parameter","训练直接更新的 weight 和 bias。"],["Hyperparameter","训练前/过程中由人或搜索选的设置，如 learning rate。"],["Embedding","把对象表示成一个可比较、可供下游使用的向量。"],["Loss","一个标量，衡量预测与目标差多少。"],["Epoch","训练集被完整使用一遍。"]],
    learn:[
      {
        plain:"一个 neuron 先做加权和 z=w·x+b，再经过 activation。多层网络只是把这个操作反复组合。Loss 告诉模型错多少，backprop 用 chain rule 算每个参数应往哪个方向改。",
        steps:["输入 x 是数据；weights 决定各输入影响；bias 平移决策边界。","activation 引入非线性，否则多层线性层仍等价于一层。","forward pass 得 prediction，loss 与 target 比较。","backprop 从 loss 向前逐层求导，optimizer 按 learning rate 更新。"],
        example:{title:"手算一个 ReLU neuron",prompt:"x=(2,-1)，w=(3,4)，b=-1。",steps:["点积 w·x=3×2+4×(-1)=2。","加 bias：z=2-1=1。","ReLU(z)=max(0,1)=1。","若 target=3 且 MSE=(y-target)²，则 loss=(1-3)²=4。"],result:"输出 1，loss 4；每个数字都有清楚来源。"},
        practice:{q:"若同一 neuron 的 z=-2，ReLU 输出多少？",hint:"ReLU=max(0,z)。",a:"输出 0。负输入被截断，这也解释了 ReLU 在负区间梯度为 0。"}
      },
      {
        plain:"Autoencoder 自己制造训练目标：输入 x，同时要求输出重建 x。Encoder 把输入压成 latent/embedding，decoder 从它重建；因此最终输出维度必须回到输入维度 D。",
        steps:["输入 x∈R^D 经过 encoder 得 z∈R^d。","z 是 embedding；d 通常小于 D 形成 bottleneck，但不是数学强制。","decoder 把 z 映射为 x-hat∈R^D。","loss 比较 x-hat 与 x，例如 MSE；不需要人工 class label。","训练后丢掉 decoder，encoder 可用于特征提取、聚类、可视化或异常检测。"],
        example:{title:"4维输入的压缩 autoencoder",prompt:"结构 4→2→4。",steps:["输入是四个数，因此 D=4。","encoder 输出两个数，embedding dimension d=2。","decoder 输出必须为四个数，才能逐维与输入比较。","MSE=(1/4)Σ_i(x_i-xhat_i)²。"],result:"embedding 是 2 维，最终 reconstruction 是 4 维；不要混淆两者。"},
        practice:{q:"autoencoder 的 embedding 一定比输入维度小吗？",hint:"overcomplete autoencoder 是否存在？",a:"不一定。可使用 d≥D，但需 sparse、denoising 等约束防止简单学 identity；经典 bottleneck autoencoder 通常 d<D。"}
      },
      {
        plain:"CNN 的 filter 在整张图上共享，所以参数数量只取决于 filter 大小、输入通道和输出通道，不取决于图片宽高。Pooling 改尺寸但没有 learnable weights。",
        steps:["一个 3×3 filter 跨越所有 Cin channels，因此有 3×3×Cin 个 weights。","每个输出 channel 对应一个独立 filter，再加一个 bias。","总参数=(kh×kw×Cin+1)×Cout。","same padding、stride1 保持 H/W；2×2 stride2 pooling 将 H/W 各减半，C 不变。","FC 层每个输出连接所有 n_in 输入：参数=(n_in+1)×n_out。"],
        example:{title:"VGG 第一层完整计算",prompt:"224×224×3，64 个 3×3 filters。",steps:["每个 filter 权重数 3×3×3=27。","每个 filter 加 1 bias，共 28 parameters。","64 filters：28×64=1,792。","same/stride1 后 output shape 224×224×64。","随后 2×2/stride2 pool 得 112×112×64。"],result:"1,792 parameters；卷积输出 224×224×64；池化输出 112×112×64。"},
        practice:{q:"为什么不把 224×224 乘进参数数目？",hint:"同一个 filter 在不同位置是否重复使用？",a:"卷积共享同一组 filter weights；不同空间位置产生不同 activation，但不是独立参数。"}
      },
      {
        plain:"Transformer 是 CS636 扩展，不是今年卷直接重点。只需在完成今年核心后理解：每个 token 用 query 去和所有 key 比相似度，再用权重混合 value。",
        steps:["线性投影得到 Q、K、V。","scores=QK^T/√dk；softmax 变成每行和为 1 的权重。","weights×V 得上下文表示。","multi-head 在多个子空间重复，再 concat。","没有 recurrence，所以用 positional encoding 表示顺序。"],
        example:{title:"Attention 的一句话读法",prompt:"某 token 对另一个 token 权重很高意味着什么？",steps:["当前 token 的 query 与对方 key 点积大。","softmax 后对方占更大比例。","输出会混入更多对方 value。","这表示模型当前层认为对方信息对当前 token 更相关。"],result:"attention weight 是上下文相关的信息混合权重，不自动等于人类可解释的因果重要性。"},
        practice:{q:"为什么要除以 √dk？",hint:"维度增大时点积方差怎样变化？",a:"点积幅度随维度变大，softmax 会过度饱和、梯度变小；缩放让数值保持稳定。"}
      },
      {
        plain:"模型选择必须防止 data leakage。Training data 用来更新 weights；validation data 用来比较 learning rate、层数等设置；test data 直到所有选择冻结后才使用。",
        steps:["先划分 train/validation/test，预处理统计量只在 train 拟合。","对每组 hyperparameters 从 train 训练。","在 validation metric 上选择，并可 early stopping。","锁定结构与设置后进行最终训练方案。","只在最后一次或严格受控次数上报告 test performance。"],
        example:{title:"选择 learning rate",prompt:"候选 0.1、0.01、0.001。",steps:["分别只用 training set 训练三个模型。","在同一 validation set 比较目标 metric。","选择 validation 最好的 0.01。","不能根据 test 结果改成 0.001；否则 test 已参与调参。"],result:"parameters 由 gradient optimizer 学，hyperparameters 由 validation/search 选择。"},
        practice:{q:"反复查看 test accuracy 再改模型，有什么问题？",hint:"test 是否仍代表未见数据？",a:"造成 test leakage 和乐观偏差；模型选择已经针对 test 调整，它不再是独立最终评估。"}
      },
      {
        plain:"Invertible layer 对每个输出都能唯一找回输入。Normalizing Flow 用一串可逆层把简单分布变成复杂数据分布，并利用 Jacobian 精确计算 density。今年只直接问可逆层及其使用场景。",
        steps:["可逆要求 f 是一一对应，并存在 f^-1。","通常输入输出维度相同；压缩 4→2 丢信息，一般不可逆。","Flow 从简单 z 分布经过可逆 f 得 x；反向可把 x 映回 z。","change-of-variables 用 |det J| 修正体积变化，得到 exact likelihood。","VAE/GAN/diffusion 是扩展对照，不要当作全部使用可逆层。"],
        example:{title:"线性层何时可逆",prompt:"y=Wx+b。",steps:["平移 b 可通过 y-b 消去。","关键是 W 是否方阵且 det(W)≠0。","若可逆，x=W^-1(y-b)。","若 W 把高维压到低维，多个 x 会映到同一 y，无法唯一恢复。"],result:"可逆线性层需要非奇异方阵 W。"},
        practice:{q:"普通 bottleneck autoencoder 的 encoder 通常可逆吗？",hint:"D 维压到 d<D。",a:"通常不可逆。降维必然丢失某些信息；decoder 学近似重建，不是严格数学逆函数。"}
      },
      {
        plain:"伦理答案不能只写 bias/privacy 两个词。要说清谁受影响、伤害如何产生、怎样测量和缓解。GNN/XAI 是 CS636 扩展；今年直接考两个现实伦理例子。",
        steps:["选具体场景和 stakeholder。","说明数据、目标函数或部署方式怎样产生风险。","说明可观察伤害和受影响群体。","提出 audit/metric 与技术或治理缓解。","承认 trade-off：解释不等于因果，去标识不等于绝对隐私。"],
        example:{title:"招聘模型的偏差",prompt:"历史招聘数据中某群体录取率低。",steps:["模型把历史 decision 当 label 学习。","历史结构性偏差会进入预测。","受影响候选人可能在同等能力下被系统性低估。","按群体报告 TPR/FPR、做数据审计和人工申诉。","重新设计 label/features、约束公平并持续监控。"],result:"完整伦理答案包含场景、机制、伤害、测量、缓解五部分。"},
        practice:{q:"“删除姓名就没有隐私风险”正确吗？",hint:"其他特征能否重新识别个人？",a:"不正确。位置、年龄、行为组合可能重新识别；模型也可能记忆训练样本。还需最小化数据、访问控制、隐私评估等措施。"}
      }
    ],
    exam:[
      {
        question:"Q1 六个小问围绕 self-supervision 与 autoencoder，从训练信号一直问到 encoder 的下游用途。",
        parts:[
          {label:"1(a)",ask:"比较 supervised 与 self-supervised learning。",steps:["共同点：都有输入、目标、loss、gradient optimization，并学习 parameters。","supervised 的目标来自人工/外部 label，例如 image class。","self-supervised 的目标由数据自身构造，例如重建输入或预测被遮盖部分。","self-supervised 常先学 general representation，再用于下游任务。"],final:"不要说 self-supervised“没有 target”；它没有人工标签，但有由数据构造的训练目标。"},
          {label:"1(b)(c)",ask:"定义 autoencoder 并说明输出维度。",steps:["encoder z=f(x)，decoder xhat=g(z)。","训练目标是让 xhat 接近 x。","若 x∈R^D，重建需逐维与 x 比较，所以 xhat∈R^D。","latent z 的维度 d 是另一件事，通常 d<D。"],final:"最终输出维度 D；embedding 维度 d 不要写成输出维度。"},
          {label:"1(d)(e)",ask:"解释 embedding 与 loss。",steps:["embedding space 是 encoder 输出 z 所在空间，相近向量可表示相似数据特征。","典型 bottleneck d<D，但 overcomplete 也可能存在。","连续像素常用 MSE；适合伯努利/归一化输出时可用 BCE。","还可加入 sparsity、KL 或 regularisation，需说明目的。"],final:"loss 必须与输出分布/任务匹配，并明确 reconstruction target 是输入本身。"},
          {label:"1(f)",ask:"训练后怎样使用 encoder。",steps:["丢弃 decoder，只计算 z=encoder(x)。","z 可作为低维 feature。","用于 classification 前端、clustering、visualisation、retrieval 或 anomaly detection。","下游可冻结 encoder 或 fine-tune。"],final:"至少给两个具体用途并解释为什么 embedding 比原始高维输入方便。"}
        ]
      },
      {
        question:"Q2 围绕 VGG-16 图，要求 CNN 定义、卷积/池化/FC 计算和 ReLU 公式。",
        parts:[
          {label:"2(a)",ask:"CNN 是什么，Convolutional 的含义是什么。",steps:["CNN=Convolutional Neural Network。","卷积层用小 filter 在空间位置滑动。","同一 filter weights 在所有位置共享，提取局部模式。","共享带来参数效率和对平移的等变响应。"],final:"展开 acronym 后解释 local receptive field 与 weight sharing。"},
          {label:"2(b)",ask:"首卷积层参数数。",steps:["一个 filter 覆盖 3×3×3=27 inputs。","每个 filter 加 1 bias，得 28。","64 filters：28×64=1,792。","stride/padding 改输出位置数量，不改变 filter 参数数。"],final:"1,792 learnable parameters。"},
          {label:"2(c)",ask:"max pool 输出 shape。",steps:["输入 224×224×64。","2×2 filter、stride2 在每个方向取不重叠窗口。","高度 224/2=112，宽度同样 112。","pooling 对每个 channel 独立，通道仍 64。"],final:"112×112×64，且 pooling 没有 learnable parameters。"},
          {label:"2(d)",ask:"首 FC 层参数数。",steps:["flatten size=7×7×512=25,088。","每个输出 unit 有 25,088 weights+1 bias。","共有 4,096 outputs。","(25,088+1)×4,096=102,764,544。"],final:"102,764,544 learnable parameters。"},
          {label:"2(e)",ask:"解释 ReLU。",steps:["公式 ReLU(x)=max(0,x)。","x>0 输出 x；x≤0 输出 0。","它引入非线性且正区间梯度简单。","可简述负区间可能出现 dead units。"],final:"给公式、分段含义和在网络中的作用。"}
        ]
      },
      {
        question:"Q3 要求两个伦理案例、可逆层及其网络场景，以及正确的数据集/算法分工来优化参数和超参数。",
        parts:[
          {label:"3(a)",ask:"给两个现实伦理问题。",steps:["例1偏差：招聘/信贷历史标签导致群体 TPR/FPR 差异；写 stakeholder、伤害、audit 与缓解。","例2隐私：医疗数据或模型记忆泄露；写未经同意使用、重识别/攻击和访问控制、最小化、隐私技术。","每例都要是完整因果链，不只列名词。"],final:"两例各用“场景—机制—伤害—缓解”，才能匹配 10 分。"},
          {label:"3(b)(c)",ask:"解释 invertible layer 及使用它的网络。",steps:["定义：对每个 y=f(x) 存在唯一 x=f^-1(y)。","通常维度保持且 Jacobian 非奇异/可处理。","Normalizing Flow 由可逆层 composition 构成。","可双向 sampling/inference，并通过 change-of-variables 精确 likelihood。"],final:"点名 normalizing flows；不要声称普通 ReLU、pooling 或 bottleneck encoder 可逆。"},
          {label:"3(d)",ask:"怎样找最佳 parameters 与 hyperparameters。",steps:["training set 通过 backprop+SGD/Adam 学 weights/biases。","validation set 比较 architecture、learning rate、batch size、regularisation 等。","搜索可用 grid、random、Bayesian optimization；数据少可 cross-validation。","test set 在所有选择冻结后做最终无偏评估。","预处理与 early stopping 也必须只基于 train/validation。"],final:"parameters—train—gradient optimizer；hyperparameters—validation—search；test—final report。"}
        ]
      }
    ]
  }
};
