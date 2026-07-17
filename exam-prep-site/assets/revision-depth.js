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
      ["Counterexample / 反例","一条真正违反性质的输入或执行路径。"],
      ["Hoare Triple","形式为 {P} C {Q} 的断言：若前置条件 P 成立且程序 C 终止，则后置条件 Q 成立。"],
      ["Precondition / 前置条件","方法执行前必须满足的条件，用 requires 声明。"],
      ["Postcondition / 后置条件","方法执行后承诺满足的条件，用 ensures 声明。"],
      ["Partial Correctness","若程序终止，则结果正确；不保证终止。"],
      ["Total Correctness","程序必定终止且结果正确。"],
      ["Loop Invariant / 循环不变量","循环每次迭代前后都保持为真的条件，用于证明循环正确性。"],
      ["Variant / 变体","用于证明终止的度量，每次循环迭代必须严格减小且非负。"],
      ["Dafny","一种内置规格和自动验证的编程语言，支持 requires/ensures/invariant。"],
      ["Event-B","基于集合论和事件逻辑的形式化建模方法，用于系统级规格和验证。"],
      ["Model Checking / 模型检测","穷举有限状态系统的所有可达状态，检查是否满足时序性质。"],
      ["LTL / 线性时序逻辑","用 G(总是)、F(最终)、X(下一)、U(直到) 描述路径性质的逻辑。"],
      ["CTL / 计算树时序逻辑","显式带路径量词 A(所有路径) 和 E(存在路径) 的时序逻辑。"],
      ["SAT / 可满足性","判断布尔公式是否存在使其为真的赋值。"],
      ["SMT / 理论可满足性","在 SAT 基础上加入整数、数组等理论的可满足性检查。"],
      ["FRET","用受限自然语言记录需求并生成形式化规格的工具。"],
      ["Refinement / 精化","从抽象模型逐步增加细节，同时证明新模型模拟原模型。"],
      ["Proof Obligation / 证明义务","工具自动生成的、需要证明的逻辑公式，用于验证规格被满足。"]
    ],
    learn: [
      {
        plain:"逻辑符号只是把“所有”“至少一个”“如果……那么……”写得没有歧义。先把每个符号读成完整中文，再做运算，不要直接盯着公式猜。",
        steps:["把 A(x) 看作一句带空格的句子，例如“x 是员工”。给定 x 后它才有真假。","∀x 表示范围内每一个 x；∃x 表示至少找到一个 x。量词只管理它后面的作用域。","p→q 只在 p 真而 q 假时为假；它不表示时间先后，而表示“满足 p 的情况不能违反 q”。","复杂公式从最内层括号向外读，并先把每个谓词写回自然语言。"],
        example:{title:"2026 两条存在量词公式为什么不同",prompt:"比较 ∃x.(A(x) ∧ ¬(G(x) ∨ Y(x))) 与 ∃x.(A(x) → ¬(G(x) ∨ Y(x)))。",steps:["先按题面的 ∃x. 把整个 body 加括号；没有课程证据时，不把量词擅自截断在 A(x)，也不宣称后面的 x 是自由变量。","第一式要求找到同一个对象：它是 A，并且既不是 G 也不是 Y。","第二式只要求找到一个对象使 implication 为真；若该对象不是 A，前件为假，整条 implication 已经为真，所以它通常弱得多。","反例：domain={u,v}，A(u)=真、G(u)=真，A(v)=假。第一式为假；第二式可取 v，因此为真。"],result:"真正差别是量词 body 中 conjunction 与 implication 的真值条件；答案应把两式完全加括号后再比较。"},
        practice:{q:"“每个请求最终都有响应”可否写成 ∃x(Request(x)→Response(x))？",hint:"先看“每个”对应哪个量词，再看“最终”是否需要时间算子。",a:"不可以。“每个”需要 ∀；“最终”不是普通蕴含能表达的，进入 LTL 后应写 G(request→F response)。"}
      },
      {
        plain:"Hoare Logic 像检查一条流水线：入口满足 P，执行一小步后得到中间条件，再执行下一步，最终得到 Q。循环之所以难，只是因为同一段代码可能重复任意次，所以要找一句每轮都不坏的话。",
        steps:["先写目标 {P} C {Q}，确认 P 是执行前已知事实，Q 是执行后要保证的事实。","赋值 x:=E 用倒推：若之后想要 Q，就把 Q 中的 x 替换为 E，得到赋值前必须满足的条件。","顺序 C1;C2 先寻找中间断言 R，分别证明 {P}C1{R} 与 {R}C2{Q}。","while 用 invariant I：证明 P⇒I、I∧guard 执行 body 后仍为 I、I∧¬guard⇒Q；总正确性再加严格下降且非负的 variant。"],
        example:{title:"数组复制：把每条 Hoare 规则真正写出来",prompt:"b:=new int[n]; i:=0; while i<n { b[i]:=a[i]; i:=i+1 }，证明复制完成。",steps:["令 n=a.Length。[Allocation/Assignment] b:=new int[n] 建立 b.Length=n；对 i:=0 做 substitution，得到 I≜0≤i≤n ∧ b.Length=n ∧ ∀k(0≤k<i→b[k]=a[k])，其中 i=0 时全称范围为空。","[While-premise] 假设 I∧i<n，因此 0≤i<n，数组访问合法。","[Array assignment] b[i]:=a[i] 后，旧的 k<i 项未变且新位置 i 相等，所以得到 ∀k(0≤k<i+1→b[k]=a[k])。","[Assignment + Sequence] 对 i:=i+1 做 substitution，边界变成 0≤i≤n，前缀式重新写成 <i，故 body 保持 I。","[While + Consequence] 退出有 I∧¬(i<n)，由 i≤n 得 i=n，前缀性质即全部下标的后置条件。总正确性另证 n-i 在 guard 为真时非负且每轮减 1。"],result:"必须把 allocation、assignment substitution、sequence、while 和 consequence 逐一落到中间断言；只写 invariant 名称不能满足题面“rules and simplification steps”。"},
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
        example:{title:"红灯停车：为什么单写 eventually 不够",prompt:"检测到红灯后，车必须在路口前停下并保持停止直到绿灯。",steps:["定义 red、beforeIntersection、passedIntersection、stopped、green，并声明 beforeIntersection 一旦越线便不再为真。","只写 F(beforeIntersection∧stopped) 会允许车辆先越线、以后返回停车，因此必须约束停车前不能 passedIntersection。","可写 G((red∧¬green∧beforeIntersection) → (¬passedIntersection U (stopped∧beforeIntersection)))，要求最终在越线前停下。","再写 G((red∧stopped∧¬green) → (stopped W green))，表示绿灯前保持停车；若假设 green 最终必发生，可用 strong U 取代 W。"],result:"把“及时停下”和“停下后保持”拆成两条性质，并写清 green 是否保证最终发生；这样不会让一个过晚的 F 偷偷满足题意。"},
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
        question:"Q1 是送分+基本功题，五部分考逻辑、真值表、开发方法、Hoare验证和正确性概念。逐个击破！",
        parts:[
          {label:"(a)",ask:"解释两个量词公式为什么长得像但意思差很多。",steps:["先把括号加全！第一条：∃x.(A(x) ∧ ¬(G(x) ∨ Y(x)))。第二条：∃x.(A(x) → ¬(G(x) ∨ Y(x)))。∧就是「且」，→就是「如果...那么...」。差别就在这个连接词上！","第一条∧（且）：你得找到一个x，它同时满足三个条件：是A、不是G、不是Y。三个条件缺一不可，非常严格！","第二条→（蕴含）：你只需要找一个x让整个蕴含为真。最简单的作弊方式：找一个不是A的x！前件为假，蕴含自动为真，根本不用管后面是什么。所以这条通常弱得多。","举个例子：世界上只有u和v两个人。u是A且是G，v不是A。第一条找不到合适的x（u是G，v不是A），所以假。第二条取v就行（v不是A，蕴含自动成立），所以真。"],final:"核心差别：∧要求所有条件同时满足，→只要前件为假就自动过关。千万别搞混！"},
          {label:"(b)",ask:"用真值表证明两个公式等价。",steps:["先列标题：p | q | ¬p | p∨¬p | p∧q | (p∧q)→p。T=True（真），F=False（假）。然后逐行代入：","p=T, q=T：¬p=F，p∨¬p=T，p∧q=T，(p∧q)→p=T→T=T。","p=T, q=F：¬p=F，p∨¬p=T，p∧q=F，(p∧q)→p=F→T=T。","p=F, q=T：¬p=T，p∨¬p=T，p∧q=F，(p∧q)→p=F→F=T。p=F, q=F：¬p=T，p∨¬p=T，p∧q=F，(p∧q)→p=F→F=T。","最后一列全是T，说明这个公式在所有情况下都为真，是tautology（永真式）。右边r∨¬r也是永真式，所以两边等价！"],final:"真实呈现四行和最终列，不能只说“二者都是 tautology”。"},
          {label:"(c)",ask:"解释三种严格开发/验证方法是什么，以及它们怎么工作。",steps:["Behaviour Driven Formal Model Development（行为驱动形式化建模）：说白了就是Event-B！用variables（变量）、invariants（不变量）、events（事件）来描述系统状态和行为，用集合论和事件逻辑支持抽象和精化，由Rodin工具自动生成证明义务。","Model Checking（模型检测）：把系统建成有限状态图，然后穷举所有可能的路径。比如用Spin工具检查Promela模型，如果违反性质就给你一条反例路径。","Deductive Verification（演绎验证）：从程序和formal contract（形式化合约）生成verification conditions（验证条件），然后用逻辑证明。比如用Dafny或Hoare Logic证明数组方法满足ensures（后置条件）。"],final:"每项都按“定义—验证的性质—工具/例子”写；不要把第一项误写成普通 BDD 测试。"},
          {label:"(d)(e)",ask:"验证数组复制循环，并说明怎么从部分正确性扩展到总正确性。",steps:["先令n=a.Length。requires（前置条件）要求a不是null。两个ensures（后置条件）：(1)b的长度等于a的长度；(2)b的每个元素都等于a的对应元素。","第1步[分配/赋值]：执行b:=new int[n]后，b.Length=n。执行i:=0后，代入不变量I得到：0≤i≤n且b.Length=n且b的前i个元素和a一样。","第2步[数组赋值]：假设I成立且i<n（还能进循环）。执行b[i]:=a[i]后，b的前i+1个元素都和a一样了。再执行i:=i+1，不变量I恢复！","第3步[循环退出]：退出时I成立且i≥n。因为I里有i≤n，所以只能是i=n。代入I，b的前n个元素（即全部）和a一样。证明完成！","部分正确性（partial correctness）只保证「如果程序停了，结果是对的」。总正确性（total correctness）还要证明「程序一定会停」：用n-i作为variant（变体），只要i<n，n-i就是正的，每次循环减1，所以一定会停。"],final:"必须把每条Hoare规则（分配、赋值、顺序、循环、推论）的中间断言都写出来，加上variant才能拿满8+4分。光说「显然复制正确」是没分的！"}
        ]
      },
      {
        question:"Q2 要你把同一套“规格—保持—终止”方法应用到类不变量、原地数组反转和递归序列。",
        parts:[
          {label:"(a)",ask:"设计一个Employee类，并解释继承时不变量怎么处理。",steps:["先写字段：var age:int。再写Valid()谓词：reads this {15<age<65}，表示age必须在15到65之间。","构造函数：constructor(a:int) requires 15<a<65 ensures Valid() && age==a { age:=a; }。注意！constructor返回前必须建立Valid，否则编译报错！","method CalculateAge(currentYear:int,birthYear:int) returns (res:int) requires Valid() && currentYear>=birthYear ensures res==currentYear-birthYear ensures Valid() {res:=currentYear-birthYear;}；若题意要求更新字段，则还须要求并保证新 age 仍在范围。","若 Employee 继承/实现 Person 抽象，Employee 对象还必须满足 Person 的 Valid/contract；子类 method 不能破坏父类入口可用性和出口承诺。具体 extends/trait 语法按课程 Dafny 版本写。"],final:"卷面必须同时有：字段、Valid、constructor、方法体/合约，以及继承产生的两层证明义务。光写原则不写代码不算完成！"},
          {label:"(b)",ask:"为原地数组反转写合约、不变量和变体。",steps:["先令n=a.Length。requires a!=null（数组不能是null）。modifies a（会修改数组）。ensures：(1)长度不变；(2)每个位置i的值等于原来位置n-1-i的值（即反转了）。","边界/对称 invariant：0≤i≤j+1≤n 且 i+j=n-1。","左区：∀k(0≤k<i→a[k]==old(a[n-1-k]))；右区：∀k(j<k<n→a[k]==old(a[n-1-k]))。","未处理区：∀k(i≤k≤j→a[k]==old(a[k]))。它说明奇数长度退出时中央元素没有被错误改写；结合 i+j=n-1 可得中央元素正是自身镜像。","decreases j-i；guard i<j 时为正，每轮 i+1、j-1 后减少 2。分别检查初始化、swap 后保持和退出。"],final:"把四组 invariant 写成公式；“两端已处理、中间未处理”的口头描述不能替代题面要求的 annotations。"},
          {label:"(c)",ask:"为AllEven递归函数写decreases、sequence解释和合约。",steps:["decreases |s|；递归参数 s[1..] 长度少 1。","sequence 是不可变值，slice 安全表达剩余输入并便于 old/等式推理。","ensures res 等价于所有合法下标元素为偶数。","说明空序列使全称命题为真，递归分支与定义一致。"],final:"必须用iff（当且仅当）合约，不能只写res→allEven。这样才能完整刻画返回值！"}
        ]
      },
      {
        question:"Q3 是概念题，但别以为光写名词就行！评分要求你把概念连接到具体性质、工具工作方式和例子。",
        parts:[
          {label:"(a)",ask:"解释Event-B的五个核心元素和proof obligations（证明义务）。",steps:["context：静态集合/常量/公理；machine：动态状态。","variables 描述状态；invariants 描述所有可达状态规则；events 用 guard/action 改状态。","before-after predicate 把旧值与新值关系写成逻辑。","用一个计数器例子列 initialization preserves invariant 与 Enter preserves invariant 两项 PO。"],final:"至少给两项具体的proof obligation，不能只罗列术语！"},
          {label:"(b)(d)",ask:"解释AI verification（AI验证）的机会和挑战，以及两种训练方法。",steps:["机会 1：从代码生成候选规格/不变量；机会 2：搜索反例或辅助证明。","挑战 1：hallucination 导致错误规格；挑战 2：分布外行为、不可解释或验证成本。","adversarial training 用对抗样本；property-driven training 将性质违反加入 loss/数据生成。","共同点是训练时引导行为；差别是样本攻击与显式性质驱动；两者都不是对全域的形式证明。"],final:"严格写两项机会、两项挑战、相同点、不同点和“不足以保证”。"},
          {label:"(c)",ask:"解释FRET工具怎么从自然语言走到形式化验证。",steps:["受限自然语言模板减少歧义。","记录 component、scope、condition、response、timing 等字段。","将需求自动形式化为时间逻辑等性质。","提供需求追踪、检查和与验证工具衔接。"],final:"答案要形成“记录自然语言→形式化→验证与追踪”的连续链。"}
        ]
      },
      {
        question:"Q4 把合约层次、两种运行行为检查、四条自动驾驶LTL性质放在同一题。信息量大，但每小问都有固定套路！",
        parts:[
          {label:"(a)",ask:"区分软件合约（单个方法/类）和系统合约（跨组件/时间）。",steps:["软件合约约束方法/类：requires、ensures、invariant；例：withdraw requires amount≤balance，ensures balance==old(balance)-amount。","系统合约跨组件并常含时间/交互；例：每个 request 最终都有 response。","选择一条工具链详细写：在 FRET 中用 FRETish 的 scope/condition/component/timing/response 记录系统 requirement。","FRET 可生成 CoCoSpec assume-guarantee contracts，把它们加入 Simulink component，再由 Kind2 model checker 检查；也可生成 Copilot runtime monitor。说明每个工具的角色，不把 editor、model checker、monitor 混为同一物。"],final:"差别落在作用范围与时间行为；工具部分形成“需求→合约→模型检查/监控→证据”的完整链，而非只列名称。"},
          {label:"(b)",ask:"比较Model Checking（模型检测）和Runtime Verification（运行时验证）。",steps:["Model Checking 构造/探索模型所有可达状态与路径。","失败给 counterexample；成功是在模型与假设范围内的全局结论。","Runtime Verification 把性质变成 monitor，只观察一次或若干实际 trace。","它适合部署期发现违反，但未观察到违反不证明所有未来路径安全。"],final:"一项是模型全空间，一项是实际轨迹；都配一个例子。"},
          {label:"(c)",ask:"用LTL（线性时序逻辑）写四条自动驾驶汽车的性质。",steps:["先定义 destinationReached、progress、emergency、resolved、red、beforeIntersection、passedIntersection、stopped、green、sensorFail、safe、recovered，并说明 green/recovered 是否由环境保证最终发生。","i：G(¬destinationReached→(progress U destinationReached))；strong U 同时要求到达前持续 progress 且最终到达。","ii：G(emergency→((emergency U resolved)∧F¬emergency))；resolved 前保持 emergency，并最终退出。","iii 拆写：G((red∧¬green∧beforeIntersection)→(¬passedIntersection U (stopped∧beforeIntersection)))，再写 G((red∧stopped∧¬green)→(stopped W green))。若环境保证 green 最终发生，把 W 加强为 U。","iv：G monitorSensors，并写 G(sensorFail→(¬recovered U (safe∧(safe W recovered))))。这强迫 safe 在本次 recovery 前出现，并在不恢复时一直保持；若保证 recovered 最终发生，用 U 代 W。"],final:"公式后要逐符号解释，并写清模型假设。只写F（最终）太弱了，会允许先过线再停车，或者先恢复再安全！"}
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
    glossary:[["Language","一组被判为 yes 的字符串或编码。"],["Decider","对每个输入都停机并给正确 yes/no 的 TM。"],["Recogniser","yes 必须最终接受；no 可以拒绝或永远运行。"],["Reduction","把 A 的实例有效翻译成 B 的实例并保持 yes/no。"],["Certificate","yes-instance 随附的短证据。"],["Polynomial time","运行步数由输入长度的某个多项式上界控制。"],["DFA / 确定有限自动机","每个状态对每个输入符号恰有一个转移的有限状态机。"],["NFA / 非确定有限自动机","可有多个转移或 ε-转移的有限自动机，与 DFA 等价。"],["PDA / 下推自动机","带栈的自动机，可识别上下文无关语言。"],["TM / 图灵机","有无限带和读写头的计算模型，可执行一般算法。"],["Regular Language / 正则语言","可由有限自动机识别的语言类。"],["Context-Free Language / 上下文无关语言","可由下推自动机或上下文无关文法描述的语言类。"],["Pumping Lemma","若语言属于某类，则足够长的字符串可被泵入；用于证明语言不属于该类。"],["HALT Problem / 停机问题","判断任意图灵机在给定输入上是否停机的问题，不可判定。"],["Mapping Reduction / 映射归约","把问题 A 的实例翻译成问题 B 的实例的可计算函数，保持 yes/no。"],["NP","yes 实例有多项式大小证书可被确定性多项式时间验证器检查的复杂性类。"],["NP-complete","既在 NP 中又是 NP-hard 的问题，是 NP 中最难的问题。"],["NP-hard","至少和 NP 中任何问题一样难的问题，不要求在 NP 中。"],["3-SAT","每个子句恰有三个文字的布尔可满足性问题，是经典的 NP-complete 问题。"],["CLIQUE","判断图中是否存在大小为 k 的完全子图的问题，是 NP-complete 的。"],["Dovetail / 交替模拟","同时模拟多个计算的方法：第 1 轮各跑 1 步，第 2 轮加入新任务并各跑更多步，避免单个任务卡住。"],["Verifier / 验证器","检查给定证书是否证明输入属于语言的算法。"]],
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
          {label:"1(b)",ask:"证明二进制 u<v 的语言非CFL。",steps:["先明确选择一族能把数值比较变成严格长度/位模式约束的串，并验证在语言中。","设 pumping length p，选择分隔符两侧结构都长于 p 的边界串。","对任意 uvxyz，利用 |vxy|≤p 说明 v、y 只能落在一个局部区域或跨一个边界。","按落在左数、分隔符附近、右数等情况分类，取 i=0 或 2。","每种情况说明 pump 后格式失效或原本 u<v 的数值关系反转/不再成立。"],final:"CFL题得分核心是覆盖v、y的所有可能位置！要按试卷空间写清分类，不能只给一种分割。"}
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
          {label:"Q5",ask:"证明 Java 行为语言不可判定。",steps:["假设目标语言 L5 decidable。","F 输入 ⟨M,w⟩，输出 Java 程序 J 的文本。","J 初始化 int a=0,b=0；随后模拟 M(w)；模拟若返回则执行 a++;b++;。","F 只写出代码，不运行模拟，所以 F 总停机。","M(w) 停机 iff J 最终 increment 两变量 iff ⟨J⟩∈L5。","用假设的 L5 decider 可决定 HALT，矛盾。"],final:"所以L5是undecidable的。如果选择补语言，必须同步调整iff方向和模板。"}
        ]
      },
      {
        question:"Q6 要你为两个问题写polynomial verifier（多项式验证器）：CLIQUE形式的岛屿问题和长度恰为k的simple path（简单路径）。",
        parts:[
          {label:"6(a)",ask:"证明岛屿 fully-connected subset 在 NP。",steps:["证书 c 是 k 个岛屿的列表。","检查数量、属于 V、互不重复。","检查所有 C(k,2) 对之间都有 boat edge。","全部通过 accept；邻接矩阵下 O(k²)，是 polynomial。"],final:"给出 certificate、verifier、runtime 三项后得 L6A∈NP。"},
          {label:"6(b)",ask:"证明 exact simple a-b path 在 NP。",steps:["证书为 v0...vk，共 k+1 个顶点。","检查 v0=a、vk=b、每点属于 V。","检查所有顶点互不重复。","对 i=0..k-1 检查 (vi,vi+1)∈E。","哈希集合与邻接矩阵下 O(k²) 或更好，均为 polynomial。"],final:"路径长度k指k条边，所以证书有k+1个顶点。"}
        ]
      },
      {
        question:"Q7 用3-SAT→CLIQUE归约证明岛屿问题是NP-complete的，并画出给定四clause公式的输出图。",
        parts:[
          {label:"7(a)",ask:"写 NP-completeness 证明。",steps:["引用 Q6(a)：L6A∈NP。","对每个 clause 的每个 literal 建 vertex。","只在不同 clauses 且不互相否定的两个 vertices 间加 edge。","输出 (G,k)，k=clauses 数。","满足赋值→每 clause 选真 literal→k-clique；k-clique→每 clause 一个互不矛盾 literal→一致满足赋值。","构造 O(x²) 规模/时间，因此 polynomial，L6A NP-hard；结合 in NP 得 NP-complete。"],final:"方向必须是3-SAT≤pL6A，不能搞反！"},
          {label:"7(b)",ask:"画给定四 clause 公式的 reduction 图。",steps:["画四列/四层，每层对应一个 clause，各有三个 literal 顶点。","同层不连边。","跨层时逐对检查，互补 literals 不连，其余连。","标 k=4，并圈出一组对应满足赋值的四点 clique。"],final:"图的判分点：分层正确、互补不连、k=4、有一个可见的clique。"}
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
    glossary:[["Test oracle","判断 actual result 是否正确的规则或机制。"],["TCI","Test Coverage Item，要被至少一个测试覆盖的抽象项目。"],["Partition","被认为行为相同的一组输入或输出。"],["Branch","一个 decision 的 true 或 false 出口。"],["Class context","连同对象构造、状态设置和观察一起测试方法。"],["MTBF","平均故障间隔；总运行时间除以观察到的故障数的估计。"],["EP / 等价类划分","假设同一 partition 内的值触发相同处理，因此选一个代表进行测试。"],["BVA / 边界值分析","测试边界及其相邻值的黑盒技术，关注边界内外行为。"],["Decision Table / 决策表","列出多个条件组合及其对应动作的表格，用于设计测试用例。"],["Statement Coverage / 语句覆盖","要求每条可执行语句至少被执行一次的覆盖标准。"],["Branch Coverage / 分支覆盖","要求每个判定的 true 和 false 出口都至少执行一次。"],["TestNG","Java 测试框架，支持注解如 @Test、@DataProvider 等。"],["Black-box Testing / 黑盒测试","基于规格而非代码内部结构的测试方法。"],["White-box Testing / 白盒测试","基于代码内部结构如分支、路径的测试方法。"],["Fault / 缺陷","代码中的错误，可能导致 error 和 failure。"],["Error / 错误","程序执行中的错误状态，由 fault 引起。"],["Failure / 失败","可观察到的程序错误行为，由 error 传播导致。"],["Test Case / 测试用例","包含输入、前置条件、调用序列和预期结果的完整测试规格。"],["Test Data / 测试数据","测试中使用的具体输入值。"],["Random Testing / 随机测试","使用随机生成的输入进行测试，需配合 oracle 判断正确性。"],["Operational Profile / 操作剖面","模拟真实使用场景的输入分布，用于随机测试和可靠性评估。"],["Value Line / 值域线","画出输入的自然范围和规格边界，帮助识别 partition。"]],
    learn:[
      {
        plain:"测试不是证明没有 bug，而是在有限预算下有系统地寻找故障并建立信心。穷举测试常因输入域相乘而爆炸，所以要用覆盖标准挑少量代表。",
        steps:["区分 fault（代码缺陷）、error（内部错误状态）、failure（外部可观察错误）。","一个 test case 至少写 inputs、preconditions/call sequence、expected result。","先算自然输入域的数量；多个参数组合数相乘。","再说明时间、存储和 oracle 成本，使 exhaustive testing 不现实。"],
        example:{title:"calc(int a,int b,int c,short d) 为什么不能穷举",prompt:"四个整数类型参数全部取遍。",steps:["Java int 有 2^32 个可能值，三个 int 共 (2^32)^3。","short 有 2^16 个值。","组合总数 2^(32×3+16)=2^112。","即使每秒执行十亿个测试，也远超可用时间；还未计算 expected result 和环境成本。"],result:"用数量级和实际速率共同说明不可行，比只写“组合太多”更完整。"},
        practice:{q:"一个 boolean 和一个 byte 参数共有多少输入组合？",hint:"boolean 有 2 个，byte 有 256 个。",a:"2×256=512。是否可穷举还取决于单次执行和 oracle 成本，但数量本身可控。"}
      },
      {
        plain:"Equivalence Partitioning 假设同一 partition 内的值会触发相同处理，因此选一个代表。Value line 帮你先看清自然范围和规格边界，避免漏掉 error partition。",
        steps:["为每个输入先画类型自然范围，再标规格允许范围和行为切换点。","给每个 input partition 编号；所有非法区也要独立编号并加 *。","为每个 output 建 output TCI。","normal TC 应尽量组合多个尚未覆盖的 normal TCI；error TC 则一次只含一个 input error TCI，避免 error hiding。","填写 TC→TCI mapping；如果两个 TC 的 TCI 覆盖集合完全相同，删除一个或明确说明它只是额外 robustness test。"],
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
        plain:"实例方法的结果可能写入对象字段而不直接 return。此时测试必须先建立对象状态，调用被测方法，再通过 observer/getter 观察结果；这就是 class context。课程把 getters/setters 广义合称 accessor，但更精确地说 setter 是 mutator。",
        steps:["列出 constructor、被测方法、每个 attribute 可用的 getter/observer 与 setter/mutator。","Shipping.isFree 是 freeShipping 的 getter；setPrime 是 primeCustomer 的 setter/mutator。primeCustomer 没有 getter，不能独立观察，但仍可由 setPrime 建立 decide 所需 pre-state。","把 parameter partition 与调用前 attribute state partition 一起组合。","每个 TC 写完整方法顺序以及每次调用的 expected；void 方法没有 return，最终状态通过 getter 建 oracle。","若目标状态既无 getter也无任何可见效果，应明确指出 testability/oracle 问题；测试间新建对象或重置状态。"],
        example:{title:"Shipping.decide 的调用链",prompt:"非Prime顾客订单 €120 应免费。",steps:["Shipping s=new Shipping() 建立默认 prime=false。","s.setPrime(false) 明确 pre-state。","s.decide(120) 修改 freeShipping。","actual=s.isFree() 观察状态。","assert actual==true，因为非Prime但 value>100。"],result:"Test case 表中应按这一顺序列出所有 calls，而不只是写 (false,120,true)。"},
        practice:{q:"decide() 返回 void，为什么仍可测试？",hint:"对象是否提供可观察结果的方法？",a:"可以。调用 decide 后用 isFree() 读取 freeShipping，并与 expected 比较；isFree 是 test oracle 的观察接口。"}
      },
      {
        plain:"随机测试不是随便生成数。先用 Decision Table 固定要覆盖的 rule，再只在该 rule 对应区间内随机；这样同时得到结构覆盖与多样数据。",
        steps:["为每条 rule 写 causes 的真值与 expected effect。","把数值 cause 翻译成随机区间，例如 lux<5000→0..4999。","boolean cause 直接固定 true/false，不随机到不可控。","循环生成时保存 seed、输入和失败日志，确保可复现。","MTBF 测试还需使用接近真实使用频率的 operational profile。"],
        example:{title:"题面签名 int genRand(int max, int min)",prompt:"按题面参数顺序，生成 min 到 max（两端都含）的均匀 int。",steps:["先检查 max≥min；注意题面是 max 在前、min 在后。","区间元素数是 max-min+1。","random.nextInt(bound) 产生 0..bound-1。","令 bound=max-min+1，最后加 min，得到 min..max。","一般实现必须防 max-min+1 溢出；本题使用 0..4999 或 5000..Integer.MAX_VALUE 时，两个 bound 均为正 int。"],result:"int genRand(int max,int min){ if(max<min) throw new IllegalArgumentException(); return min+random.nextInt(max-min+1); }"},
        practice:{q:"SolarPanel 要满足 lux≥5000，随机区间上界应写什么？",hint:"题面声明 lux 为 int，Decision Table 又把讨论域限定为 lux≥0。",a:"自然域可写 rand(5000..Integer.MAX_VALUE)。如果为了运行效率选有限 operational/test cap U，也可以写 rand(5000..U)，但必须声明 U 的来源，不能称它是题面规格边界。"}
      },
      {
        plain:"Agile 中测试贯穿每个迭代；白盒测试贴近实现，所以重构常迫使它更新。数值、AI、移动端等专题提供额外风险，但今年卷只直接抽取 Agile 解释。",
        steps:["在 backlog/refinement 阶段澄清 acceptance criteria。","开发中写 unit/component tests，CI 每次提交运行。","Sprint 内做集成、探索与回归，review 后继续监控。","黑盒测试依赖外部规格；实现重构但行为不变时通常仍有效。","白盒测试依赖内部 branch/path，结构改变后覆盖映射与测试可能要改。"],
        example:{title:"课程风险图怎样解释",prompt:"为什么测试投入不是越高越好？",steps:["课程直接给出 Expected cost(risk)=Pr(failure)×cost(failure)。","增加 testing expenditure 通常会降低 failure probability 和 expected failure cost。","testing cost 随投入增加，expected failure cost 与 testing cost 相加得到 total cost。","最优投入位于 total cost 最低处；若收入固定，这等价于 profit 最高处。","avoided-loss benefit/net-profit 是从课程成本图推导的解释，不应冒充讲义原图标签。"],result:"最优点不是零风险，而是总成本最小；用边际语言表达时，是新增测试的预期风险降低等于新增测试成本。"},
        practice:{q:"方法内部从 if 改成 table lookup，但外部行为不变，哪类测试更可能无需修改？",hint:"哪类测试只依赖 specification？",a:"黑盒测试更可能无需修改；以旧 branch 为 TCI 的白盒测试需要重新分析覆盖结构。"}
      }
    ],
    exam:[
      {
        question:"Q1 先解释穷举为什么不可能，再对Charging.required完成值域线、分区、测试覆盖项、代表值和无重复EP测试。",
        parts:[
          {label:"1(a)",ask:"解释为什么对calc做exhaustive testing（穷举测试）是不可行的。",steps:["三个 int 各 2^32，short 为 2^16。","组合数为 2^112≈5.19×10^33。","即使每秒 10^9 次也需约 5.19×10^24 秒。","还未包括 expected result、测试启动和报告成本。"],final:"用输入域的乘积和数量级说明穷举不可行。"},
          {label:"1(b)",ask:"画Charging的值域线并定义partitions（分区）。",steps:["两参数的 Java short 自然范围都是 -32768..32767。","battLevel 输入 TCI：B1* -32768..-1，B2 0..9，B3 10..49，B4 50..100，B5* 101..32767。","dischargeRate 输入 TCI：R1* -32768..-1，R2 0..50，R3 51..255，R4* 256..32767。","Output TCIs：O1 NONE、O2 FAST_CHARGE、O3 SLOW_CHARGE、O4 PARAM_ERROR。","FAST 当 B2∧R3；SLOW 当 batt<50 且非FAST；NONE 是其余合法组合。"],final:"卷面应画两条从 -32768 到 32767 的 value line，并分别交付 input 与 output partition 表；四个 input error TCI 均加 *。"},
          {label:"1(c)",ask:"给最小、可追踪的 EP tests。",steps:["T1 (9,51)→FAST_CHARGE，覆盖 B2/R3/O2。","T2 (10,51)→SLOW_CHARGE，新增 B3/O3；R3 是不可避免的重复覆盖。","T3 (50,50)→NONE，新增 B4/R2/O1。","T4 (-1,50)、T5 (101,50)、T6 (50,-1)、T7 (50,256) 均→PARAM_ERROR；每个 TC 只含一个 input error TCI，分别覆盖 B1*/B5*/R1*/R4*，O4 可重复并在表中标明。","完成每个 TCI→TC mapping；只有两个 TC 的完整覆盖集合相同时才删除一个，不能因某个 normal TCI 不可避免地重复就误删必要测试。"],final:"完整答案要有selected values、TCI、TC三张表，明确expected enum、error星号、output coverage和duplicate review。"}
        ]
      },
      {
        question:"Q2 从JaCoCo部分覆盖补Filestore的branch tests（分支测试），再写TestNG结构，解释Agile中测试怎么维护。",
        parts:[
          {label:"2(a)",ask:"根据实际代码截图补 Branch Coverage。",steps:["先把 2026 PDF 截图中的实际源码、28/32/33 行和 JaCoCo diamonds 可靠转录；yellow/red 只说明部分/未执行，不能单凭颜色猜 branch。","把每个 implementation decision（含短路产生的条件求值和可能的 null-else）编号，再结合已有 EP tests 标出确实未走的 branch。","规格 oracle 是 enabled∧((¬exists∧¬overwrite)∨(exists∧overwrite))；它只能计算 expected output，不能决定源码的 branch 数或执行顺序。","仅对截图可确认的 missed branch 写 line/branch ID、布尔约束、enabled/exists/overwrite 和 expected。","完成 TCI→TC mapping；如果当前资料提取不到截图代码，应明确写证据不足，不生成虚假的具体 branch 答案。"],final:"Q2(a)没有脱离截图的唯一branch答案！规格真值表不是branch map，最终答案必须能追溯到截图实现。"},
          {label:"2(b)",ask:"写 TestNG outline。",steps:["import org.testng.Assert 与 org.testng.annotations.Test。","定义 public test class。","每个 TC 用 @Test 方法，Arrange 三个 boolean。","Act：Boolean actual=Filestore.decideWrite(...);。","Assert.assertEquals(actual, expected);；可用 @DataProvider 合并表格。"],final:"annotation、class、method、call、expected assertion 五层结构必须出现。"},
          {label:"2(c)",ask:"画 Scrum 并解释白盒维护。",steps:["画 Product Backlog→Sprint Planning→Sprint/Development→Review→Retrospective→下一轮。","在 refinement/acceptance、开发单元测试、CI、集成与回归位置标 testing。","白盒测试和行/branch 强耦合，重构改变控制流会频繁更新。","黑盒测试来自稳定规格，内部实现变化而外部行为不变时可复用。"],final:"测试不是Sprint末尾的单独阶段，而是整个循环中的活动！"}
        ]
      },
      {
        question:"Q3 比较Level的静态方法测试和class-context（类上下文）测试，再为Shipping.decide交付完整的EP设计。",
        parts:[
          {label:"3(a)",ask:"写两种调用顺序与 oracle 位置。",steps:["静态：actual=Level.checkLevel(x)→assert actual==expected。","class context：obj=new Level(x)→obj.isValid()→actual=obj.getResult()→assert。","checkLevel 直接 return；isValid 把结果写入字段，所以需 getter。","明确 constructor 建立 attribute l，getResult 负责观察 result。"],final:"用调用序列或时序图展示 actual 与 expected 在哪里比较。"},
          {label:"3(b)",ask:"完成 Shipping class-context EP。",steps:["freeShipping 的 getter/observer 是 isFree；primeCustomer 的 setter/mutator 是 setPrime。课程可把二者广义列作 accessors，但 setPrime 不是 getter。primeCustomer 无 getter，无法独立读取，不过可由 setPrime 建立 pre-state。","value 是 decide 参数而非字段；仅按行为切换分为 V1 value≤100 与 V2 value>100。负数属于 V1，合法但不是第三个 EP。","State TCIs：P1 prime=true、P2 prime=false；Output TCIs：O1 free、O2 not-free。","T1：new→setPrime(true)[void]→decide(-1)[void]→isFree()[true]，覆盖 P1/V1/O1并显式证明负数合法。T2：new→setPrime(false)→decide(101)→isFree()[true]，覆盖 P2/V2/O1。T3：new→setPrime(false)→decide(100)→isFree()[false]，覆盖 P2/V1/O2。","不要再加入 prime=false,value=-1 作为 EP 必需 TC；它与 T3 的 P2/V1/O2 集完全重复，只能标成可选 robustness example。"],final:"最小normal EP设计是3个TC。通过isFree建立decide的oracle，在表中列全所有calls和expected return/void。"}
        ]
      },
      {
        question:"Q4 对SolarPanel的四条Decision Table rules（决策表规则）做约束随机测试，写自动化代码和inclusive generator（包含性生成器），再解释MTBF和风险投资。",
        parts:[
          {label:"4(a)",ask:"完成四条 Random DT tests。",steps:["题面给 int lux 且把 DT 讨论域限定为 lux≥0，因此自然范围是 0..Integer.MAX_VALUE。","T1 Rule1：grid=true，lux=genRand(4999,0)，expected false。","T2 Rule2：grid=true，lux=genRand(Integer.MAX_VALUE,5000)，expected true。","T3 Rule3：grid=false，lux=genRand(4999,0)，expected false。","T4 Rule4：grid=false，lux=genRand(Integer.MAX_VALUE,5000)，expected false。若改用有限 cap U，必须声明 U 是 operational/test cap，不是题面规格上界。"],final:"5000 属于 ≥5000 的 Rule2/4；四行都要写 TCI、固定 grid、随机 criteria 与 expected。"},
          {label:"4(b)(c)",ask:"写自动化框架和 genRand。",steps:["保存 seed 并创建 Random；为 T1–T4 各循环 N 次，固定 grid，按该 rule 调用 genRand，执行 SolarPanel.enable。","每次用 assertEquals(actual,expected)；失败记录 seed、rule、grid、lux，终止条件写固定 loops 或时长。","按题面原样写签名 int genRand(int max, int min)，先 if(max<min) 抛 IllegalArgumentException。","核心返回语句是 return min + random.nextInt(max-min+1)；一般实现需检查差值溢出，本题四个区间的 bound 均为正 int。"],final:"完整代码骨架必须同时出现generator、四条rule循环、oracle/assert、completion criterion（完成条件）和可复现日志。"},
          {label:"4(d)",ask:"解释 MTBF 与 risk investment。",steps:["按真实用户输入/操作频率构造具有统计代表性的 operational profile，长时间自动运行并保留 failure 的时间和输入。","只有在每次 failure 后按一致规则修复/重置、并以 operational uptime 计时的前提下，才用累计 uptime/failure count 作简化 MTBF 估计；同时报告总时长与 failure count。","零 failure 只给出删失观测，不能直接声称无限 MTBF。","课程风险图先画 Pr(failure) 随 testing expenditure 下降、expected failure cost=Pr(failure)×cost(failure) 下降、testing cost 上升，以及二者相加的 total cost。","最优投入在 total cost 最低处；若收入固定，这等价于 profit 最高。avoided-loss/net-profit 曲线只能标为从课程成本图推导。"],final:"结论必须同时交代工作负载代表性、恢复/计时假设、观测量，以及课程原图和利润推导之间的关系。"}
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
    glossary:[["Mod n","两个整数相差 n 的倍数时视为同一个余数类。"],["Inverse","a⁻¹ 满足 aa⁻¹≡1 mod n，只有与 n 互素的元素才有逆元。"],["Nonce","只用一次的随机数；重复或可预测常泄漏密钥。"],["MAC","用共享密钥验证消息完整性与来源。"],["Public key","可公开的加密/验证参数；私钥用于解密/签名。"],["Ring","可做加减乘的代数集合；RLWE 中多项式还要按模多项式约简。"],["Extended Euclid Algorithm / 扩展欧几里得算法","求 ax+ny=gcd(a,n) 的整数解 x,y 的算法；当 gcd=1 时，x 就是 a⁻¹ mod n。"],["Modular Exponentiation / 模幂运算","计算 a^e mod n，通常用 repeated squaring（快速平方）提高效率。"],["CRT / 中国剩余定理","将模不同素数的解组合成模其乘积的解的方法，常用于 RSA 和 Rabin。"],["AES / 高级加密标准","对称分组密码，固定 128-bit 分组，密钥 128/192/256 位。"],["RSA","基于大整数分解困难的公钥加密算法，私钥 d=e⁻¹ mod φ(n)。"],["Rabin Cryptosystem","基于模合数平方根困难的加密算法，解密等价于分解 n。"],["ECC / 椭圆曲线密码学","基于椭圆曲线上离散对数问题困难的密码系统，可用更短密钥达到同等安全。"],["ECDSA / 椭圆曲线数字签名算法","基于 ECC 的数字签名方案，验证时计算 w=s⁻¹ mod q 和点运算。"],["RLWE / 环上带误差学习","后量子密码的基础困难问题，在多项式环上构造加密方案。"],["Zero-Knowledge Proof / 零知识证明","证明者能让验证者相信某陈述为真，而不泄露任何额外信息。"],["Affine Cipher / 仿射密码","古典密码，加密 c≡am+b mod n，解密需要 a 的逆元。"],["ETM / Encrypt-then-MAC","先加密再对密文计算 MAC 的认证加密方式，比 E&M 和 MTE 更安全。"],["Quadratic Residue / 二次剩余","模 n 下存在平方根的数，即存在 x 使 x²≡a mod n。"],["Jacobi Symbol","Legendre 符号的推广，Jacobi=1 不保证是二次剩余。"],["GCD / 最大公约数","两个整数的最大公共因子，gcd(a,n)=1 表示 a 与 n 互素。"],["Repeated Squaring / 快速平方","计算大指数模幂的方法：连续平方并按指数二进制位相乘。"]],
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
        steps:["AddRoundKey 是逐 byte XOR，因此 roundKey=before XOR after。","CTR/OFB/CFB 可把 block cipher 输出变成流；具体 mode 决定取 MSB/LSB、反馈什么，必须服从题面与讲义。","ETM 使用独立 Ke、Km：先 C=Enc(Ke,M)，再 T=MAC(Km,C)。","接收端先验证 T；invalid 永远只返回统一 null。为符合课程的 timing 防护，可让 valid/invalid 走等成本或 dummy decryption，但绝不在 invalid 时释放 plaintext。","CIA：encryption 给 confidentiality，MAC 给 integrity/authenticity；availability 需其他机制。"],
        example:{title:"单字节 stream 解密",prompt:"keystream byte=0xAD，cipher byte=0x20。",steps:["流模式中 C=P XOR K，所以 P=C XOR K。","0x20=0010 0000。","0xAD=1010 1101。","逐位 XOR 得 1000 1101=0x8D。"],result:"P=0x20 XOR 0xAD=0x8D；具体题必须按图说明 keystream byte 的选取。"},
        practice:{q:"为什么 ETM 验证失败后不能返回解密错误或 plaintext？",hint:"课程允许等成本解密，但允许使用结果吗？",a:"不同错误或 plaintext 会形成 oracle。课程为隐藏 timing 可执行等成本/dummy decryption，但 invalid tag 时必须丢弃结果并统一返回 null；只有 valid 才释放 plaintext。"}
      },
      {
        plain:"RSA 的私钥来自 φ(n) 上的逆元；Rabin 解密是开平方。Textbook Rabin 的危险在于：若解密 oracle 返回攻击者所提交平方的另一个根，两个根的差会暴露 n 的因子。",
        steps:["RSA 先 factor n=pq，再 φ=(p-1)(q-1)，最后 d=e⁻¹ modφ。","验证 ed≡1 modφ，不要在 mod n 下求 inverse。","Rabin 的 c=m² modN 在形式上像 RSA 的 e=2，但 2 与 φ(N) 不互素，不能作为普通 RSA 的合法 exponent；Rabin 解密有四根，必须额外消歧。","若 oracle 对 c=R² 返回 Y≠±R，则 gcd(R-Y,N) 或 gcd(R+Y,N) 给非平凡因子。","课程修复是在 QR_N 中选唯一 QR root，并发送 ⟨x² modN,lsb(x) XOR m⟩；通用实现还应使用 CCA-secure encoding，不能裸用 textbook Rabin。"],
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
        question:"Q1 是五个8分计算题，分别考：固定challenge的ZK攻击、Affine digraph密钥恢复、合数模平方根、ECC点运算、RLWE解密。逐个击破！",
        parts:[
          {label:"1(a)",ask:"用 R=333 击败固定 challenge 的 ZK shift。",steps:["Schnorr/shift 型检查为 g^R≡commitment·f(secret)^c modp；这里 c 永远为 1。","攻击者先选 response R=333。由 333=5×64+13 和题给 2^64 mod991=827，可算 2^333 mod991=904。","697⁻¹ mod991=691，因此反向选择 commitment=904×691 mod991=334。","发送 commitment=334；收到必然的 c=1 后回答 R=333。","验证端算 334×697 mod991=904，恰等于 2^333 mod991，所以接受；攻击者却没有证明能回答其他 challenge。"],final:"伪造transcript（对话记录）为 (commitment,c,response)=(334,1,333)；固定挑战破坏soundness（可靠性/安全性）。"},
          {label:"1(b)",ask:"由 mail→uwex 恢复 Affine digraph key。",steps:["用 A=0 映射和 26x+y：ma=312，il=219，uw=542，ex=127，modulus=26²=676。","建立 542≡312a+b、127≡219a+b (mod676)。","相减得 415≡93a；题给 93⁻¹=189，所以 a≡415×189≡19 mod676。","回代 b≡542-19×312≡22 mod676。","验证 19×312+22≡542，19×219+22≡127。"],final:"Affine digraph私钥是(a,b)=(19,22) mod676。"},
          {label:"1(c)(d)",ask:"求平方根和椭圆曲线点。",steps:["平方根：p=0x20b=523，n=0x45d81=286081，所以 q=547=0x223。题给 residues 给出 mod p 根 ±415，即 415/108；mod q 根 ±62，即 62/485。","用 p⁻¹ modq=433 和 x=a+p((b-a)433 modq) 组合四对根。","四个十进制根为 163068、118090、167991、123013；平方 mod286081 均回到题给 radicand 0x3817b。","ECC：b≡14²-25³-13×25≡8 mod37，所以曲线 y²=x³+13x+8。","doubling 得 λ=(3×25²+13)(28)⁻¹≡15，故 2P=(3,0)；3P=(25,23)=-P，4P=O。"],final:"平方根是四个CRT结果。ECC的Q=2P=(3,0)，P的order（阶）n=4。"},
          {label:"1(e)",ask:"解密 RLWE 两字符。",steps:["约定先置顶：ciphertext tuple 第一项是 c_aux、第二项是 c_msg；题面多项式按 y^7→y^0 显示。ring 为 Rq=Z_83[y]/(y^8+1)，故 y^8=-1。","计算 s·c_aux；约简后按 y^0→y^7 的系数为 [0,52,71,11,39,5,40,1]。","c_msg-s·c_aux mod83 按 y^0→y^7 得 [2,43,77,39,45,45,45,38]。","转回题面/课程的 y^7→y^0 顺序：[38,45,45,45,39,77,43,2]。","按 q/4 到 3q/4 解为 1 的课程阈值，得到 bits 11111010，即 hex FA。"],final:"plaintext（明文）是两个十六进制字符FA。注意！不要把y^0→y^7数组直接当作从高位到低位的bit string！"}
        ]
      },
      {
        question:"Q2 考AES的XOR操作、把block cipher工程化成8-bit stream，以及ETM怎么抵抗adaptive ciphertext攻击。",
        parts:[
          {label:"2(a)",ask:"从 ARK 前后 state 求 round key。",steps:["把 before 对齐为 123456ff123456ff123456ff123456ff，after 为 a93456ff123456ff123456ff12345644。","ARK 是 S_after=S_before XOR K_round，所以 K=S_before XOR S_after。","首 byte：0x12 XOR 0xa9=0xbb；中间相同 bytes 全给 0x00；末 byte 0xff XOR0x44=0xbb。","拼成 16 bytes 并再 XOR 回去验证。"],final:"round key（轮密钥）=bb0000000000000000000000000000bb。"},
          {label:"2(b)",ask:"选择课程指定的 8-bit CFB 并恢复 plaintext byte。",steps:["画 128-bit IV/register→AES encryption→S_8→XOR 的 CFB 图。","Day 3 讲义定义 S_8 取 E_k(IV) 的 most significant 8 bits；题给输出开头是 EA，因此 K1=0xEA。","解密 P1=C1 XOR K1=0x20 XOR0xEA。","00100000 XOR11101010=11001010。"],final:"plaintext byte=0xCA。最左byte/MSB的约定来自课程CFB定义，不能改取末byte DF！"},
          {label:"2(c)",ask:"完整解释 ETM，并与 E&M/MTE 分开比较。",steps:["ETM=Encrypt Then MAC。发送：C=Enc_Ke(M;IV)，T=MAC_Km(IV||C)，发送 IV,C,T。","E&M 对 plaintext 产生 deterministic tag：攻击者可先查询 m0 的 tag，再在 IND-CPA challenge 中比较 tag，直接识别 m0/m1；这是它的主要课程反例。","MTE/decrypt-before-auth 是另一问题，可能暴露 padding/格式 oracle，不要与 E&M 的 deterministic-tag 泄漏混为一谈。","接收端先验证 tag；课程讲义要求 invalid/valid 路径保持相同可观察时间，可执行等成本或 dummy decryption，但 invalid 永远只返回统一 null，只有 valid 才释放 plaintext。","ETM提供confidentiality（机密性）和integrity/authenticity（完整性/真实性），但不自动保证availability（可用性）。"],final:"卷面要点：独立 Ke/Km、ciphertext MAC、E&M equality leak、MTE oracle、constant-work invalid path，以及 CIA 映射。"}
        ]
      },
      {
        question:"Q3 依次要求：恢复RSA私钥d、利用Rabin oracle分解N、按给定倍点验证ECDSA签名。",
        parts:[
          {label:"3(a)",ask:"恢复 RSA private key d。",steps:["用 Fermat factorisation：ceil(sqrt(790199209))=28115。","28115²-790199209=504²，所以 p=28115-504=27611，q=28115+504=28619。","φ(n)=27610×28618=790142980。","求 564387843⁻¹ mod790142980；extended Euclid 给 d=7。","验证 564387843×7 mod790142980=1。"],final:"RSA的private exponent d=7，因数是27611和28619。"},
          {label:"3(b)",ask:"讨论 Rabin 与 RSA 的关系，完成攻击并给课程版防御。",steps:["Rabin c=m² modN 在代数形式上像 RSA e=2；但标准 RSA 要求 gcd(e,φ(N))=1，而 Blum integer 的 φ(N) 为偶数，所以 e=2 不可逆。Rabin 解密有四个根，因此它不是普通 RSA 的合法参数特例。","R=23769451，提交 C=R² mod47479253=23004433；oracle 返回 Y=31423469。","gcd(|R-Y|,N)=13523，gcd(R+Y,N)=3511，且两者乘积为 N。","攻击利用 composite modulus 下的不同平方根。","课程防御：在 QR_N 中选择唯一 QR square root，密文使用 ⟨x² modN,lsb(x) XOR m⟩，解密只输出消息 bit，不向攻击者返回 root；通用系统再配合 CCA-secure encoding。"],final:"Rabin形式类似e=2，但不是标准RSA的合法特例。私钥因数是13523和3511。"},
          {label:"3(c)",ask:"验证 ECDSA signature (1,6)。",steps:["w=6⁻¹ mod7=6；h=22 mod7=1。","u1=1×6=6，u2=1×6=6 mod7。","在给定曲线上 6P=(13,15)，6Y=(1,14)；相加 X=(1,3)。","v=X_x mod7=1。","v=r=1，所以签名通过。"],final:"签名(r,s)=(1,6)是valid（有效的）。"}
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
    glossary:[["Tensor","多维数字数组；图片常是 H×W×C。"],["Parameter","训练直接更新的 weight 和 bias。"],["Hyperparameter","训练前/过程中由人或搜索选的设置，如 learning rate。"],["Embedding","把对象表示成一个可比较、可供下游使用的向量。"],["Loss","一个标量，衡量预测与目标差多少。"],["Epoch","训练集被完整使用一遍。"],["Neural Network / 神经网络","由多层神经元组成的计算图，通过学习参数进行预测。"],["Activation Function / 激活函数","引入非线性的函数，如 ReLU、sigmoid、softmax。"],["ReLU / 修正线性单元","激活函数 max(0,x)，正区间恒等，负区间输出 0。"],["Backpropagation / 反向传播","用链式法则从 loss 向前逐层求梯度的算法。"],["CNN / 卷积神经网络","用共享 filter 在空间滑动提取局部特征的网络，常用于图像。"],["Autoencoder / 自编码器","输入→encoder→latent→decoder→输出的网络，训练目标是重建输入。"],["Transformer","基于 self-attention 的架构，无 recurrence，需 positional encoding。"],["Attention / 注意力机制","用 query 和 key 的相似度加权混合 value 的机制。"],["Gradient Descent / 梯度下降","沿 loss 对参数的负梯度方向更新参数的优化方法。"],["Learning Rate / 学习率","控制每次参数更新步长的超参数。"],["Batch Size / 批大小","一次前向/反向传播使用的样本数。"],["Overfitting / 过拟合","模型在训练集上表现好但在新数据上泛化差。"],["Regularization / 正则化","防止过拟合的技术，如 L1/L2、dropout、data augmentation。"],["Validation Set / 验证集","用于选择超参数和 early stopping 的数据集，不用于训练参数。"],["Test Set / 测试集","最终评估模型性能的数据集，选择冻结后才使用。"],["Supervised Learning / 监督学习","有外部标签指导的学习方式。"],["Self-supervised Learning / 自监督学习","标签由数据自身构造的学习方式，如重建输入或预测遮盖部分。"],["Latent / 隐变量","encoder 输出的低维表示，也叫 embedding。"],["Loss Function / 损失函数","衡量预测与目标差距的函数，如 MSE、cross-entropy。"],["Optimizer / 优化器","执行参数更新的算法，如 SGD、Adam。"],["Normalizing Flow / 归一化流","由可逆层组成的生成模型，可精确计算 likelihood。"],["Invertible Layer / 可逆层","输入可从输出唯一恢复的层，存在逆函数。"]],
    learn:[
      {
        plain:"一个 neuron 先做加权和 z=w·x+b，再经过 activation。多层网络只是把这个操作反复组合。Loss 告诉模型错多少，backprop 用 chain rule 算每个参数应往哪个方向改。",
        steps:["输入 x 是数据；weights 决定各输入影响；bias 平移决策边界。","activation 引入非线性，否则多层线性层仍等价于一层。","forward pass 得 prediction，loss 与 target 比较。","backprop 从 loss 向前逐层求导，optimizer 按 learning rate 更新。"],
        example:{title:"手算一个 ReLU neuron",prompt:"x=(2,-1)，w=(3,4)，b=-1。",steps:["点积 w·x=3×2+4×(-1)=2。","加 bias：z=2-1=1。","ReLU(z)=max(0,1)=1。","若 target=3 且 MSE=(y-target)²，则 loss=(1-3)²=4。"],result:"输出 1，loss 4；每个数字都有清楚来源。"},
        practice:{q:"若同一 neuron 的 z=-2，ReLU 输出多少？",hint:"ReLU=max(0,z)。",a:"输出 0。负输入被截断，这也解释了 ReLU 在负区间梯度为 0。"}
      },
      {
        plain:"Autoencoder 自己制造训练目标：输入 x，同时要求输出重建 x。Encoder 把输入压成 latent/embedding，decoder 从它重建；因此最终输出维度必须回到输入维度 D。",
        steps:["输入 x∈R^D 经过 encoder 得 z∈R^d。","课程讲义的典型设计是 d<D，形成 bottleneck；答卷先写这一点。d≥D 的 overcomplete 架构是需额外约束的例外，不是今年题的主答案。","decoder 把 z 映射为 x-hat∈R^D。","课程主损失是 quadratic/MSE：L=(1/N)Σ||x-xhat||²；可加 λ||z||₁ 鼓励稀疏。BCE 只在合适的伯努利/归一化输出假设下补充。","训练后丢掉 decoder，encoder 可用于特征提取、聚类、可视化或异常检测。"],
        example:{title:"4维输入的压缩 autoencoder",prompt:"结构 4→2→4。",steps:["输入是四个数，因此 D=4。","encoder 输出两个数，embedding dimension d=2。","decoder 输出必须为四个数，才能逐维与输入比较。","MSE=(1/4)Σ_i(x_i-xhat_i)²。"],result:"embedding 是 2 维，最终 reconstruction 是 4 维；不要混淆两者。"},
        practice:{q:"今年卷问 embedding 相对 D 的维度，最稳的作答顺序是什么？",hint:"先写讲义典型设计，再写例外。",a:"先写经典 bottleneck autoencoder 取 d<D，以迫使网络学习压缩 representation；再补充这不是数学强制，d≥D 的 overcomplete 设计需要 sparsity、denoising 等约束防止只学 identity。"}
      },
      {
        plain:"CNN 的 filter 在整张图上共享，所以参数数量只取决于 filter 大小、输入通道和输出通道，不取决于图片宽高。Pooling 改尺寸但没有 learnable weights。",
        steps:["一个 3×3 filter 跨越所有 Cin channels，因此有 3×3×Cin 个 weights。","每个输出 channel 对应一个独立 filter，再加一个 bias。","总参数=(kh×kw×Cin+1)×Cout；H×W×Cout 是 activation/output elements，不是 learnable parameters。","same padding、stride1 保持 H/W；2×2 stride2 pooling 将 H/W 各减半，C 不变。","FC 层每个输出连接所有 n_in 输入：参数=(n_in+1)×n_out。"],
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
        steps:["先划分 train/validation/test，预处理统计量只在 train 拟合。","对每组 hyperparameters 从 train 训练；weights/biases 用 backprop+SGD/Adam 优化。","在 validation metric 上选择 learning rate、batch size、层数、regularisation，并可 early stopping。","课程讲义称 test 用于 benchmark 已优化模型；严谨实践是在结构、设置和选择规则冻结后才看独立 test。","若根据 test 结果继续换模型或改设置，test 已参与选择；必须另留 final hold-out 才能报告无偏最终性能。"],
        example:{title:"选择 learning rate",prompt:"候选 0.1、0.01、0.001。",steps:["分别只用 training set 训练三个模型。","在同一 validation set 比较目标 metric。","选择 validation 最好的 0.01 并冻结选择规则，再用 test benchmark。","若看 test 后改成 0.001，原 test 已参与选择，需另留 final hold-out。"],result:"train 学 parameters，validation 选 hyperparameters；test benchmark 冻结方案。用 test 做了选择，就另留 final hold-out。"},
        practice:{q:"反复查看 test accuracy 再改模型，有什么问题？",hint:"test 是否仍代表未见数据？",a:"造成 test leakage 和乐观偏差；模型选择已经针对 test 调整，它不再是独立最终评估。"}
      },
      {
        plain:"Invertible layer 对每个输出都能唯一找回输入。Normalizing Flow 用一串可逆层把简单分布变成复杂数据分布；只有映射可逆、可微且 Jacobian determinant 可高效计算时，才可用 change of variables 高效求 exact likelihood。今年只直接问可逆层及其使用场景。",
        steps:["可逆要求 f 是一一对应，并存在 f^-1。","flow 中通常输入输出维度相同；压缩 4→2 丢信息，一般不可逆。","Flow 从简单 z 分布经过可逆 f 得 x；反向可把 x 映回 z。","在可逆、可微且 Jacobian determinant tractable 的条件下，change-of-variables 用 |det J| 修正体积变化，得到 exact likelihood。","VAE/GAN/diffusion 是扩展对照；不能说任何可逆网络都能高效 exact likelihood，也不要说这些模型全部使用可逆层。"],
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
        question:"Q1 六个小问围绕self-supervision（自监督学习）和autoencoder（自编码器），从训练信号一直问到encoder的下游用途。故事线很清晰！",
        parts:[
          {label:"1(a)",ask:"比较 supervised 与 self-supervised learning。",steps:["共同点：都有输入、目标、loss、gradient optimization，并学习 parameters。","supervised 的目标来自人工/外部 label，例如 image class。","self-supervised 的目标由数据自身构造，例如重建输入或预测被遮盖部分。","self-supervised 常先学 general representation，再用于下游任务。"],final:"不要说 self-supervised“没有 target”；它没有人工标签，但有由数据构造的训练目标。"},
          {label:"1(b)(c)",ask:"定义 autoencoder 并说明输出维度。",steps:["encoder z=f(x)，decoder xhat=g(z)。","训练目标是让 xhat 接近 x。","若 x∈R^D，重建需逐维与 x 比较，所以 xhat∈R^D。","latent z 的维度 d 是另一件事，通常 d<D。"],final:"最终输出维度是D（和输入一样）。embedding维度d不要写成输出维度！"},
          {label:"1(d)(e)",ask:"解释 embedding 与 loss。",steps:["embedding space 是 encoder 输出 z 所在空间，相近向量可表示相似数据特征。","先按课程讲义写典型 bottleneck d<D；再说明 overcomplete d≥D 是需约束的例外。","课程主答案：quadratic/MSE reconstruction loss，L=(1/N)Σ||x-xhat||²。","按讲义可加 λ||z||₁ sparsity regularisation；BCE 只在伯努利/合适归一化输出假设下补充，KL 不是普通 autoencoder 的必需项。"],final:"先写MSE公式和L1 sparsity。明确reconstruction target（重建目标）是输入本身，再有条件地补充其他loss。"},
          {label:"1(f)",ask:"训练后怎样使用 encoder。",steps:["丢弃 decoder，只计算 z=encoder(x)。","z 可作为低维 feature。","用于 classification 前端、clustering、visualisation、retrieval 或 anomaly detection。","下游可冻结 encoder 或 fine-tune。"],final:"至少给两个具体用途，并解释为什么embedding比原始高维输入方便。"}
        ]
      },
      {
        question:"Q2 围绕VGG-16图，要求CNN定义、卷积/池化/FC计算和ReLU公式。都是算术题，别慌！",
        parts:[
          {label:"2(a)",ask:"CNN 是什么，Convolutional 的含义是什么。",steps:["CNN=Convolutional Neural Network。","卷积层用小 filter 在空间位置滑动。","同一 filter weights 在所有位置共享，提取局部模式。","共享带来参数效率和对平移的等变响应。"],final:"展开 acronym 后解释 local receptive field 与 weight sharing。"},
          {label:"2(b)",ask:"首卷积层参数数。",steps:["一个 filter 覆盖 3×3×3=27 inputs。","每个 filter 加 1 bias，得 28。","64 filters：28×64=1,792。","stride/padding 改 output positions，不改变共享 filter 参数数；224×224×64是activations（激活值）数量，不是parameters（参数）！别搞混！"],final:"1,792 learnable parameters；不要乘空间位置数。"},
          {label:"2(c)",ask:"max pool 输出 shape。",steps:["输入 224×224×64。","2×2 filter、stride2 在每个方向取不重叠窗口。","高度 224/2=112，宽度同样 112。","pooling 对每个 channel 独立，通道仍 64。"],final:"112×112×64，且 pooling 没有 learnable parameters。"},
          {label:"2(d)",ask:"首 FC 层参数数。",steps:["flatten size=7×7×512=25,088。","每个输出 unit 有 25,088 weights+1 bias。","共有 4,096 outputs。","(25,088+1)×4,096=102,764,544。"],final:"102,764,544个learnable parameters（可学习参数）。这是个天文数字！"},
          {label:"2(e)",ask:"解释 ReLU。",steps:["公式 ReLU(x)=max(0,x)。","x>0 输出 x；x≤0 输出 0。","它引入非线性且正区间梯度简单。","可简述负区间可能出现 dead units。"],final:"给公式、分段含义，以及在网络中的作用。"}
        ]
      },
      {
        question:"Q3 要求两个伦理案例、可逆层及其使用场景，以及怎么正确分工来优化参数和超参数。",
        parts:[
          {label:"3(a)",ask:"给两个现实伦理问题。",steps:["例1人脸/情绪识别：有偏训练数据导致群体误识别差异，可能影响被监控者、公民权利或公平审判；按群体 audit 并限制高风险部署。","例2抓取数据：未经同意收集的私人/可重识别或受版权保护内容进入训练集；做 consent/licence/data audit、最小化数据并提供治理与申诉。","也可用训练/推理耗电、耗水和 carbon footprint 作完整案例，但必须写受影响者、可测量伤害与缓解。","每例都要写：场景→机制→受影响者→伤害→测量→缓解。不能只列名词！"],final:"两例各写完整因果链；本地 Ethics 讲义直接支持偏差、隐私、版权和环境影响。"},
          {label:"3(b)(c)",ask:"解释 invertible layer 及使用它的网络。",steps:["定义：对每个 y=f(x) 存在唯一 x=f^-1(y)。","flow 中通常维度保持；用于 density 的映射还需可微且 Jacobian determinant 可处理。","Normalizing Flow 由可逆层 composition 构成。","满足这些条件时可双向 sampling/inference，并通过 change-of-variables 计算 exact likelihood。"],final:"点名 normalizing flows及条件；不要声称任意可逆网络都能高效 exact likelihood，也不要称普通 ReLU、pooling 或 bottleneck encoder 可逆。"},
          {label:"3(d)",ask:"怎样找最佳 parameters 与 hyperparameters。",steps:["training set 通过 backprop+SGD/Adam 学 weights/biases。","validation set 比较 architecture、learning rate、batch size、regularisation，并用于 early stopping。","搜索可用 grid、random、Bayesian optimization；这些是合理例子，考场核心是 validation+search，数据少可 cross-validation。","按课程讲义，test set 用于 benchmark 已优化、已冻结的模型；严谨 final evaluation 也遵循这一冻结原则。","若看 test 后继续换模型或改设置，test 已参与选择，必须另留独立 final hold-out；预处理统计量只从 train 拟合。"],final:"parameters—train—gradient optimizer；hyperparameters—validation—search；test—冻结后 benchmark；test 若参与选择则另留 hold-out。"}
        ]
      }
    ]
  }
};
