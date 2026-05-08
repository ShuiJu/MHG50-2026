(function () {
  const searchInputs = document.querySelectorAll("[data-keyword-search]");

  searchInputs.forEach((input) => {
    const targetSelector = input.getAttribute("data-keyword-search");
    const items = document.querySelectorAll(targetSelector);

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const keywords = (item.getAttribute("data-keywords") || "").toLowerCase();
        item.classList.toggle("hidden", query.length > 0 && !text.includes(query) && !keywords.includes(query));
      });
    });
  });

  document.querySelectorAll("[data-copy-template]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.querySelector(button.getAttribute("data-copy-template"));
      if (!target || !navigator.clipboard) return;
      await navigator.clipboard.writeText(target.innerText);
      const oldText = button.textContent;
      button.textContent = "已复制";
      window.setTimeout(() => {
        button.textContent = oldText;
      }, 1200);
    });
  });

  const q = (question, answer) => ({ question, answer });
  const sectionQuizzes = {
    "index.html#exam-system": [
      q("这个网站的第一使用顺序是什么？", "先用单科教材线性页把概念学顺，再用题型页练考试答案，最后用关键词跳转补薄弱点。"),
      q("线性页和题型页的区别是什么？", "线性页负责从零学习和铺台阶；题型页负责把同一批知识压成可交卷的模板、表格、证明或比较结构。"),
      q("为什么关键词跳转放在最后？", "关键词跳转适合查漏补缺。基础没铺好时直接跳词，容易只记片段，不能形成考试答案。")
    ],
    "index.html#learning-path": [
      q("四门课入口里最推荐先点哪个？", "先点当前要复习科目的教材线性页，因为它按知识依赖把台阶铺平。"),
      q("题型页什么时候用？", "学完一个主题后马上回题型页看它怎样出现在历年题或 sample 里，避免只懂概念不会作答。"),
      q("一门课怎样算完成第一轮？", "线性页能顺着讲一遍，题型页每类题能说出答案结构，关键词里薄弱术语能快速定位并解释。")
    ],
    "index.html#keywords": [
      q("关键词搜索适合搜什么？", "适合搜术语、题型和技术名，例如 MVC、HALT、BVA、Dafny、observability。"),
      q("搜到多个结果怎么办？", "先看线性页结果补理解，再看题型页结果学考试写法。"),
      q("关键词跳转不能替代什么？", "不能替代完整学习流程。它解决局部卡点，不负责建立整门课的顺序感。")
    ],

    "cs615-linear.html#textbook-audit": [
      q("CS615 为什么不能从 React 或 AI 开始？", "React 和 AI 很显眼，但它们依赖 request、API、数据库和分层架构这些地基。先学它们会变成背名词。"),
      q("Rails 和 Spring 在学习流程里承担什么角色？", "它们是同一条 Web request 主线的两种实现：Rails 训练 MVC 和 convention，Spring 训练显式分层、REST 和 dependency injection。"),
      q("WSFE 为什么是桥梁材料？", "它把 Express/Mongoose 后端和 React 前端连接起来，让前面的 API、数据库和后面的页面交互合成完整 Web app。")
    ],
    "cs615-linear.html#request": [
      q("一次 request 的最小链条是什么？", "Browser 发 request，router 找 controller，controller 调业务和数据访问，database 返回数据，server 返回 HTML 或 JSON。"),
      q("<code>GET</code> 和 <code>POST</code> 的核心区别是什么？", "<code>GET</code> 通常读取资源，<code>POST</code> 通常创建资源或提交数据。考试要把 method 和 CRUD 意图连起来。"),
      q("API 为什么能让前后端分工？", "前端按约定 URL 和 JSON 调用，后端隐藏内部实现。双方只要遵守接口，就可以分别开发和替换。")
    ],
    "cs615-linear.html#architecture": [
      q("三层架构最重要的边界是什么？", "Presentation 负责界面，business logic 负责规则，data access 负责读写数据库。不要让浏览器直接越过后端接触数据库。"),
      q("MVC 和三层架构有什么关系？", "三层是系统层面的分工；MVC 是 Web framework 内部组织 request、数据和页面的方式。它们都在服务 separation of concerns。"),
      q("Pattern 和 framework 怎么区分？", "Pattern 是组织思想，例如 MVC、3-tier；framework 是落地工具，例如 Rails、Spring、Express。")
    ],
    "cs615-linear.html#database": [
      q("SQL / NoSQL 判断先看哪三件事？", "先看数据形状是否稳定，关系是否复杂，写入出错代价是否高。然后再看扩展压力和变化速度。"),
      q("为什么收据、付款、库存常偏 SQL？", "它们关系清楚且不能半成功，适合表、外键、join 和 ACID transaction。"),
      q("NoSQL 不是没有结构，那它灵活在哪里？", "Document database 可以让每条记录像 JSON 文档，字段更灵活，也适合高写入和分布式场景；但仍可用 schema/validation 管理。")
    ],
    "cs615-linear.html#rails": [
      q("Rails request flow 的六步是什么？", "URL 进 router，匹配 controller action，读取 params，调用 model/service，Active Record 读写数据库，render view 或 redirect。"),
      q("胖 controller 为什么不好？", "它把 HTTP、业务规则、数据访问和副作用混在一起，导致难测试、难维护、修改风险高。"),
      q("Sample Rails controller 题的核心不是解释什么？", "不是只翻译代码，而是用 MVC、SRP 和 separation of concerns 指出风险并给重构与测试方向。")
    ],
    "cs615-linear.html#spring": [
      q("REST 不是只返回 JSON，那它还要求什么？", "把对象看成 resources，用 URL 定位，用 HTTP verbs 表达动作，并保持 stateless request。"),
      q("Spring controller、service、repository 各管什么？", "Controller 管 HTTP 边界，service 管业务规则，repository 管数据库访问。"),
      q("Dependency injection 的考试价值是什么？", "它降低耦合，让依赖可替换，尤其方便测试时换 fake repository 或替代实现。")
    ],
    "cs615-linear.html#node-react": [
      q("Node 输出题先看什么？", "先标同步代码，它们立即按顺序执行；再看 setTimeout、Promise、数据库请求等异步回调进入队列的时机。"),
      q("Express route、middleware、controller 的区别是什么？", "Route 决定 URL 进谁，middleware 做通用前后处理，controller 处理 request 并返回 response。"),
      q("React 答案不能只写什么？", "不能只写更快。要写 component、props、state 如何组织复杂 UI，以及 SEO、initial load、tooling 和 accessibility 的代价。")
    ],
    "cs615-linear.html#quality": [
      q("Accessibility 的核心不是价值观，而是什么？", "是具体可执行做法：语义 HTML、label、alt、键盘可用、焦点清楚、颜色对比足够。"),
      q("SQL injection 和 XSS 的共同根源是什么？", "把用户输入当成可信内容。防御要验证输入、参数化查询、输出转义、避免直接拼可执行内容。"),
      q("为什么前端验证不能替代后端验证？", "攻击者可以绕过页面直接打 API。服务器端验证才是权限和数据安全的边界。")
    ],
    "cs615-linear.html#delivery": [
      q("HTTP 版本题的主线是什么？", "每一代怎样减少连接开销、阻塞和等待，让多个 request/response 更高效。"),
      q("PaaS 为什么常适合课程订阅工具？", "它允许部署自定义 Web app，同时平台管理大量 runtime、部署和伸缩细节，小团队负担更低。"),
      q("Observability 比 monitoring 多回答什么？", "Monitoring 告诉你是不是坏了；observability 用 logs、metrics、traces 帮你查为什么坏了。")
    ],
    "cs615-linear.html#exam-ladder": [
      q("CS615 比较题的固定写法是什么？", "先定义两个方案，再按维度比较 trade-off，最后落回题目场景给 recommendation。"),
      q("技术名清单为什么拿不到高分？", "考试要的是职责和理由。Rails、Spring、Express、React 要放回 request flow、分层、数据和维护性里解释。"),
      q("做题前最该先画哪条线？", "Browser -> route -> controller -> service/model -> database -> response。这条线能串起绝大多数 CS615 题。")
    ],

    "cs605-linear.html#language": [
      q("CS605 里的 language 是什么？", "Language 是一组字符串。题目条件决定哪些字符串是 yes instance，满足条件的字符串就在语言里。"),
      q("为什么要把机器、图、公式编码成字符串？", "因为理论模型里的 TM 输入是字符串；编码让程序、图、公式都能作为语言成员被讨论。"),
      q("读语言定义的第一步是什么？", "先找输入长什么样，再找 yes 条件，最后判断该用 pumping、decider、reduction 还是 NP 工具。")
    ],
    "cs605-linear.html#proof-basics": [
      q("反证法在 CS605 里怎么用？", "先假设相反结论成立，例如假设语言 regular 或 decidable，再推出和 pumping lemma 或 HALT 结论冲突。"),
      q("Pumping proof 里为什么强调 for all split？", "因为你不能挑自己喜欢的切法；你要证明所有合法切法 pump 后都会破坏语言条件。"),
      q("<code>iff</code> 在 reduction 里为什么关键？", "它证明翻译前后的 yes/no 完全同步。没有 iff，decider 不能可靠地从新问题答案推出原问题答案。")
    ],
    "cs605-linear.html#automata": [
      q("FA 的能力边界是什么？", "FA 只有有限状态，能记有限摘要和模数信息，但不能准确保存任意大的计数。"),
      q("Regular language 的直觉是什么？", "有限记忆就能识别的字符串集合，例如固定后缀、奇偶性、有限模式。"),
      q("为什么 <code>a^n b^n</code> 不像 regular？", "它需要比较任意多的 <code>a</code> 和 <code>b</code> 数量，有限状态没有足够记忆。")
    ],
    "cs605-linear.html#pumping-regular": [
      q("Regular pumping lemma 用来证明什么？", "它通常用来证明一个语言 not regular，而不是证明 regular。"),
      q("<code>|xy|≤p</code> 的用处是什么？", "它限制 <code>x</code> 和 <code>y</code> 都在前 <code>p</code> 个字符里，方便判断被 pump 的段落位置。"),
      q("为什么常用 <code>i=0</code> 或 <code>i=2</code>？", "它们分别删除或重复被 pump 段，容易破坏数量、顺序或位置关系。")
    ],
    "cs605-linear.html#pda-cfl": [
      q("PDA 比 FA 多了什么？", "多了一个 stack，可以记一类后进先出的配对信息，例如括号或 <code>a^n b^n</code>。"),
      q("CFL pumping 为什么切成五段？", "Context-free 结构可能有两处一起重复，所以写成 <code>uvxyz</code>，同时 pump <code>v</code> 和 <code>y</code>。"),
      q("not CFL 题为什么常分情况？", "因为 <code>v</code> 和 <code>y</code> 可能落在不同区间，你要证明每种合法位置 pump 后都会坏。")
    ],
    "cs605-linear.html#tm": [
      q("Decider 和 recogniser 的区别是什么？", "Decider 对 yes/no 都会停机给答案；recogniser 只保证 yes 时 accept，no 时可以永远跑。"),
      q("证明 decidable 时最后必须补哪句？", "必须说明构造的机器 halts on every input，否则只是 recogniser 级别。"),
      q("Java eventually does X 常证明成什么？", "通常证明 Turing-recognisable：模拟程序，一旦看到 X 就 accept；如果永远不发生，模拟可一直跑。")
    ],
    "cs605-linear.html#reductions": [
      q("要证明新语言 undecidable，常用什么方向？", "常写 <code>HALT ≤m L</code>：如果新语言可判定，就能判定 HALT，从而矛盾。"),
      q("归约构造机器 <code>N</code> 的常见套路是什么？", "<code>N</code> 先模拟 <code>M(w)</code>；若模拟停机，就触发题目 property；若不停机，property 不出现。"),
      q("为什么只说 reduce to HALT 不够？", "必须写清楚输入如何翻译、构造是否可计算，以及 yes/no 的 iff 正确性。")
    ],
    "cs605-linear.html#complexity": [
      q("Computability 和 complexity 的区别是什么？", "Computability 问有没有算法；complexity 问算法随着输入变大要花多久。"),
      q("P 和 NP 的最短区别是什么？", "P 是能快速求解；NP 是给你候选答案后能快速验证。"),
      q("Certificate 在图题里常是什么？", "通常是一组选中的点、边、集合或赋值，用来作为 yes instance 的候选证据。")
    ],
    "cs605-linear.html#np-complete": [
      q("NP-complete 证明有哪两半？", "先证明 in NP，再证明 NP-hard。缺一半都不完整。"),
      q("NP-hard reduction 的方向怎么选？", "从已知 NP-complete 问题 reduce 到要证明的新问题，例如 <code>3-SAT ≤p L</code>。"),
      q("Correctness 要证明哪两个方向？", "原实例 yes 推出新实例 yes；新实例 yes 也能反推出原实例 yes。")
    ],
    "cs605-linear.html#exam-ladder": [
      q("CS605 做题第一步永远是什么？", "先把 language 和输入编码翻译成人话，再决定用哪种证明工具。"),
      q("Q1 到 Q7 的主线是什么？", "从机器能力边界，到可判定/可识别，到 HALT 归约，再到 P/NP 和 NP-complete。"),
      q("为什么题型页要在线性页之后用？", "线性页建立概念依赖；题型页把概念压成可交卷的证明模板。")
    ],

    "cs608-linear.html#test-case": [
      q("没有 expected result 的运行为什么不算严格测试？", "因为你只能看到程序跑了，却无法判断 actual result 是否正确。"),
      q("一个 test case 至少包含什么？", "输入、执行方式和 expected result。更完整时还包括测试目标、环境和实际结果记录。"),
      q("Failure 和 fault 的区别是什么？", "Failure 是外部可见错误行为；fault 是代码或设计中的错误原因。")
    ],
    "cs608-linear.html#coverage": [
      q("Coverage 不是测得多，而是什么？", "是测到应该测的风险点。TCI 说明测试覆盖目标，test case 才是具体输入和期望。"),
      q("TCI 和 data value 的区别是什么？", "TCI 是抽象覆盖目标，例如 just below boundary；data value 是具体值，例如 <code>17</code>。"),
      q("Coverage 来源有哪些？", "Specification、code、object state 和 random strategy 都能生成不同类型的 coverage items。")
    ],
    "cs608-linear.html#black-box": [
      q("EP、BVA、DT 的判断口诀是什么？", "类别用 EP，边界用 BVA，条件组合用 DT。"),
      q("BVA 为什么不盲目全组合？", "多变量时常用 one fault assumption，一次只让一个变量靠边界，其余取 nominal value，避免测试爆炸。"),
      q("Decision Table 的一条 rule 表示什么？", "一组 conditions 的真假组合，以及该组合对应的 effects 或 actions。")
    ],
    "cs608-linear.html#white-box": [
      q("Statement coverage 问什么？", "每条可执行语句有没有至少执行一次。"),
      q("Branch coverage 比 statement coverage 多看什么？", "每个 decision 的 true 和 false 结果是否都被测试到。"),
      q("JaCoCo 黄色通常提示什么？", "某个语句或分支只覆盖了一部分，常需要 additional test 补未走到的 branch。")
    ],
    "cs608-linear.html#oo": [
      q("对象方法为什么不能当孤立函数测？", "因为它可能依赖对象字段和之前的方法调用历史，也就是 class context。"),
      q("类内测试的基本顺序是什么？", "创建对象，设置状态，调用被测方法，通过 getter 或返回值观察，最后 assert。"),
      q("为什么不建议直接改 private field？", "那会把测试绑死在内部实现上。测试应尽量通过 public API 设置和观察行为。")
    ],
    "cs608-linear.html#automation": [
      q("自动化测试能自动替你想测试吗？", "不能。自动化负责重复执行和报告，测试设计仍来自 specification、coverage 和 oracle。"),
      q("什么时候适合参数化测试？", "多组 test cases 结构相同，只是输入和 expected result 不同时，适合用同一个测试方法跑数据表。"),
      q("为什么 100% coverage 不等于没 bug？", "Coverage 只说明代码被执行过，不保证 oracle 正确，也不保证重要输入空间都覆盖。")
    ],
    "cs608-linear.html#random": [
      q("随机测试三问题是什么？", "Data problem、oracle problem、completion problem。"),
      q("Oracle problem 问什么？", "随机输入跑完后，怎样知道输出对不对。可能需要 reference implementation、invariant 或 metamorphic relation。"),
      q("浮点数测试为什么不能总用完全相等？", "Floating point 可能有表示误差，数值测试常用 tolerance 判断结果是否足够接近。")
    ],
    "cs608-linear.html#exam-ladder": [
      q("CS608 四大题怎么分？", "Q1 黑盒，Q2 白盒，Q3 class context，Q4 random testing。"),
      q("Q1 的交卷产物通常是什么？", "TCI、data values、test cases，以及 expected result。"),
      q("Q2 additional test 不能只给什么？", "不能只给输入；还要说明它补了哪条 statement 或 branch coverage。")
    ],

    "cs603-linear.html#properties": [
      q("Formal verification 和 testing 的核心区别是什么？", "Testing 用有限例子找错误；formal verification 试图证明一类输入或行为都满足性质。"),
      q("性质为什么要形式化？", "自然语言容易含糊；形式化后才能被证明、检查或交给工具分析。"),
      q("把“不会崩溃”改成可证明性质应怎么做？", "写成具体条件，例如数组下标始终在范围内，或返回值始终满足某个 postcondition。")
    ],
    "cs603-linear.html#logic": [
      q("Satisfiable 和 tautology 的区别是什么？", "Satisfiable 是至少有一种赋值为真；tautology 是所有赋值都为真。"),
      q("<code>P ⇒ Q</code> 怎么读才不误解？", "只要 <code>P</code> 成立，<code>Q</code> 必须成立；如果 <code>P</code> 不成立，implication 不被违反。"),
      q("从英语到逻辑的第一步是什么？", "先找对象和变量，再找范围，最后写性质和连接符。")
    ],
    "cs603-linear.html#contracts": [
      q("Precondition 和 postcondition 的责任边界是什么？", "调用者负责满足 precondition；方法在 precondition 成立时负责保证 postcondition。"),
      q("Invariant 是什么？", "在某段过程前后必须保持的性质，例如对象余额始终非负。"),
      q("Partial correctness 少证明了什么？", "少证明 termination。它只说如果程序终止，结果正确。")
    ],
    "cs603-linear.html#hoare": [
      q("Hoare triple <code>{P} C {Q}</code> 怎么读？", "如果执行 <code>C</code> 前 <code>P</code> 成立，并且 <code>C</code> 终止，则执行后 <code>Q</code> 成立。"),
      q("Loop invariant 要证明哪三件事？", "Establishment、preservation、exit use。"),
      q("Variant 用来证明什么？", "证明 termination：一个非负量每次循环严格变小，因此不能无限循环。")
    ],
    "cs603-linear.html#dafny": [
      q("<code>requires</code> 和 <code>ensures</code> 对应什么？", "<code>requires</code> 是 precondition，<code>ensures</code> 是 postcondition。"),
      q("Dafny 循环 invariant 先写什么最稳？", "先写范围 invariant，例如 <code>0 ≤ i ≤ a.Length</code>，再写已处理部分性质。"),
      q("<code>ghost</code> 变量有什么特点？", "它只帮助证明，不影响运行时行为或程序输出。")
    ],
    "cs603-linear.html#requirements": [
      q("Formalising requirements 解决什么问题？", "解决自然语言需求含糊、缺条件、缺时间界限、缺例外路径的问题。"),
      q("FRET 会逼你补哪些信息？", "触发条件、响应、时间范围、持续条件和例外情况。"),
      q("Refinement 的核心承诺是什么？", "实现可以更具体，但不能违背抽象模型已经承诺的性质。")
    ],
    "cs603-linear.html#model-checking": [
      q("Kripke structure 的基本部件是什么？", "States、initial states、transitions、labels 和 paths。"),
      q("LTL 和 CTL 的主要区别是什么？", "LTL 沿路径描述时间；CTL 把路径量词 A/E 和时间操作符组合进公式。"),
      q("Counterexample 在 model checking 里是什么？", "一条违反性质的状态路径，用来说明性质为什么不成立。")
    ],
    "cs603-linear.html#sat-smt": [
      q("SAT 问什么？", "问一个布尔公式是否存在 true/false 赋值让它成立。"),
      q("SMT 比 SAT 多懂什么？", "SMT 还懂整数、数组、等式等背景理论，因此更接近程序验证中的约束。"),
      q("Z3 返回 sat 后为什么要 get-model？", "因为 model 给出一组具体赋值，说明约束怎样被满足。")
    ],
    "cs603-linear.html#exam-ladder": [
      q("CS603 做题先判断哪类动作？", "先判断是在表达性质、证明程序、补 Dafny annotation、做 model checking，还是解释 SAT/SMT。"),
      q("Dafny 题和 Hoare 题的共同核心是什么？", "都在证明前后条件、循环不变量和终止性，只是 Dafny 让 verifier 帮忙检查。"),
      q("Model checking 题的答题顺序是什么？", "先定义状态和 transition，再写性质，最后解释 model checker 探索状态空间和 counterexample。")
    ],

    "cs615.html#foundation": [
      q("CS615 基础词汇最该串成哪条线？", "Browser request -> backend processing -> database -> response。不要把词孤立背。"),
      q("API 的考试解释要包含什么？", "要说它是前后端约定好的入口，包括 URL、method、数据格式和 response。"),
      q("Business logic 和 database 有什么区别？", "Business logic 是规则；database 是持久保存数据的地方。规则不应散落在页面或 SQL 字符串里。")
    ],
    "cs615.html#full-stack": [
      q("Full-stack 题不能只列什么？", "不能只列 React、Node、MongoDB。要解释前端、后端、数据库、API、安全和部署如何协作。"),
      q("CRUD 和 HTTP verbs 怎么对应？", "Create 常用 POST，Read 用 GET，Update 用 PUT/PATCH，Delete 用 DELETE。"),
      q("三层架构的好处怎么写？", "写 maintainability、testability、security boundary、frontend/backend 可分别演进。")
    ],
    "cs615.html#database": [
      q("购物习惯题为什么默认选 SQL？", "customer、receipt、items、price、date 关系清楚，且收据数据需要事务和一致性。"),
      q("什么时候 NoSQL 可以被合理辩护？", "如果重点是高量点击流、灵活事件文档或字段经常变化，而不是强交易一致性。"),
      q("ACID 最适合用什么场景解释？", "用付款、库存、收据这类不能只成功一半的场景解释。")
    ],
    "cs615.html#mvc": [
      q("MVC 25 分题必须出现什么流程？", "Browser -> route -> controller -> model/database -> view/response。"),
      q("Controller 不该做什么？", "不该承担大量业务计算、复杂查询、邮件发送和页面拼接全部职责。"),
      q("MVC 的主要工程好处是什么？", "Separation of concerns，让维护、测试和并行开发更容易。")
    ],
    "cs615.html#node-react": [
      q("Node callback 输出题怎么做？", "先输出同步代码，再根据 event loop 和异步回调进入队列的顺序判断后续输出。"),
      q("Chaining 的读法是什么？", "从左到右读，每一步返回一个对象或结果，供下一步继续调用。"),
      q("React componentization 的价值是什么？", "把复杂 UI 拆成可复用组件，用 props 和 state 管输入与变化。")
    ],
    "cs615.html#quality": [
      q("Accessibility 题要避免什么空话？", "不要只写“让更多人使用”。要给具体 CSS/HTML/交互做法。"),
      q("SEO 的 white-hat 和 black-hat 差别是什么？", "White-hat 让内容结构真实清楚；black-hat 欺骗搜索引擎，长期可能被惩罚。"),
      q("XSS 防御常写哪几项？", "Output encoding、sanitization、CSP、避免危险 HTML 插入、使用 HttpOnly cookie 降低 token 泄露风险。")
    ],
    "cs615.html#http-cloud": [
      q("HTTP evolution 题看什么？", "看多个 request/response 如何更高效地共享连接和减少阻塞。"),
      q("Cloud model 题为什么常推荐 PaaS？", "自定义 app 需要自己写功能，但不一定要自己管理 VM 和 runtime，PaaS 平衡自由度和运维成本。"),
      q("IaaS、PaaS、SaaS 的区分关键是什么？", "看你自己管理多少东西：IaaS 管最多，PaaS 管代码和配置，SaaS 主要使用现成软件。")
    ],
    "cs615.html#sample-topics": [
      q("Monolith 和 microservices 比较要看哪些维度？", "Scalability、consistency、resilience、development velocity、operational complexity。"),
      q("AI agents 题的平衡答案是什么？", "能加速代码、测试和文档，但必须配合 PR review、测试、安全扫描和人工架构判断。"),
      q("CI/CD 和 observability 如何协同？", "CI/CD 让发布可靠可回滚，observability 把生产问题反馈到下一轮测试和开发。")
    ],
    "cs615.html#triage": [
      q("看到题面关键词后第一步是什么？", "先归类题型，再套对应答案结构，不要想到什么写什么。"),
      q("比较题的固定骨架是什么？", "定义两个方案，按维度比较，写 trade-off，最后 recommendation。"),
      q("安全题的固定骨架是什么？", "定义攻击，给例子，写具体防御措施。")
    ],
    "cs615.html#exam-map": [
      q("考法地图的用法是什么？", "用来识别重复题型和新增 sample 主题，决定哪些模板必须熟练。"),
      q("2023-2025 最稳定的主题有哪些？", "MVC、SQL/NoSQL、Node/React、Accessibility/SEO/Security、HTTP/Cloud。"),
      q("Sample 新题型说明什么？", "考试可能从传统 Web 基础扩到 microservices、AI agents、CI/CD 和 observability。")
    ],
    "cs615.html#templates": [
      q("MVC 25 分题第一段写什么？", "定义 Model、View、Controller 的职责，并说明它们分离关注点。"),
      q("方案比较题最怕漏什么？", "漏 trade-off 和 recommendation。只写优点通常不够。"),
      q("Security 题为什么要给例子？", "例子能证明你知道攻击如何发生，也方便自然引出防御措施。")
    ],
    "cs615.html#summary": [
      q("CS615 答案最常见扣分点是什么？", "只背定义，不落回 Web 场景和题目条件。"),
      q("比较题怎样显得像工程答案？", "按维度评估成本、风险、扩展性、维护性、安全性，而不是简单选新技术。"),
      q("最后检查答案时问自己什么？", "我有没有定义、例子、trade-off、recommendation 或具体防御措施。")
    ],

    "cs605.html#symbols": [
      q("看到 CS605 题面先做什么？", "先把符号和 language 条件翻译成人话，明确输入是什么、yes 条件是什么。"),
      q("<code>&lt;M,w&gt;</code> 表示什么？", "把机器 <code>M</code> 和输入 <code>w</code> 编码成一个字符串，作为语言的输入。"),
      q("Complement 必须注意什么？", "Complement 是相对于同一个 universe 或 alphabet 的所有不在 <code>L</code> 的字符串。")
    ],
    "cs605.html#automata": [
      q("三种机器能力从弱到强怎么排？", "FA，PDA，TM。FA 有有限状态，PDA 加 stack，TM 有可读写无限纸带。"),
      q("PDA 为什么能处理 <code>a^n b^n</code>？", "它可以读 <code>a</code> 时压栈，读 <code>b</code> 时出栈，用 stack 匹配数量。"),
      q("TM 强但仍有什么限制？", "它仍然不能 decide HALT 这类不可判定问题。")
    ],
    "cs605.html#pumping": [
      q("Pumping lemma proof 的结尾必须是什么？", "指出 pumped word 不在语言里，与 lemma 矛盾，因此语言不属于该类。"),
      q("Not regular 和 not CFL 最大形式差别是什么？", "Regular 切 <code>xyz</code>，CFL 切 <code>uvxyz</code> 并同时 pump <code>v</code> 和 <code>y</code>。"),
      q("为什么不能只写“显然 pump 后不行”？", "考试要看到切法限制和所有合法切法都会导致矛盾的理由。")
    ],
    "cs605.html#tm": [
      q("Decidable 题的机器要保证什么？", "对每个输入都 halt，并正确 accept/reject。"),
      q("T-r 题为什么 no instance 可以 loop？", "Recognizer 只要求 yes instance 最终 accept，不要求 no instance 一定 reject。"),
      q("co-T-r 怎么理解？", "Complement 是 Turing-recognisable，也就是能认出 no 的一侧。")
    ],
    "cs605.html#reductions": [
      q("HALT reduction 的核心矛盾是什么？", "如果新语言有 decider，就能通过翻译输入来 decide HALT，但 HALT 已知 undecidable。"),
      q("Reduction 的 construction 要证明什么？", "可计算、yes/no 对齐，并且能用新问题 decider 解旧难题。"),
      q("Q4 常用哪个定理？", "如果 <code>L</code> 和 complement 都 T-r，则 <code>L</code> decidable。")
    ],
    "cs605.html#np": [
      q("证明 in NP 必须写哪两件事？", "Certificate 是什么，verifier 为什么 polynomial time。"),
      q("Polynomial time 为什么重要？", "NP 关注能否快速验证候选答案，不允许验证过程本身指数爆炸。"),
      q("NP-complete 证明为什么先 in NP？", "因为 NP-complete 必须同时属于 NP 并且 NP-hard。")
    ],
    "cs605.html#question-types": [
      q("Q1 通常考什么？", "Not regular 和 not context-free 的 pumping lemma proof。"),
      q("Q3-Q5 常见工具是什么？", "从 HALT 做 mapping reductions，并分析 TR/complement。"),
      q("Q6-Q7 的差别是什么？", "Q6 证明 in NP；Q7 证明 NP-complete，需要 in NP + NP-hard。")
    ],
    "cs605.html#exam-map": [
      q("考法地图显示 CS605 的稳定结构是什么？", "每年大致覆盖 pumping、decidable/T-r、HALT reductions、NP、NP-complete。"),
      q("Sample A/B 应该怎样用？", "按题型拆模板，而不是只做一遍答案。"),
      q("地图里 Q6-Q7 为什么要一起看？", "它们都用 certificate/verifier 思维，但 Q7 多了 reduction hardness。")
    ],
    "cs605.html#summary": [
      q("Pumping proof 最后检查什么？", "是否写了 contradiction、切法限制、pump 值和 pumped word 不在语言里。"),
      q("Reduction proof 最后检查什么？", "是否写了 mapping function、iff、computable construction 和 HALT contradiction。"),
      q("NP proof 最后检查什么？", "是否写清 certificate、verifier 步骤和 polynomial runtime。")
    ],

    "cs608.html#terms": [
      q("Test case 和 test data 的区别是什么？", "Test data 是输入值；test case 还包括执行动作和 expected result。"),
      q("Expected result 从哪里来？", "从 specification 或 oracle 来，不能从程序实际输出倒推。"),
      q("Coverage item 是什么？", "一个抽象测试目标，例如某个边界、分区、decision rule 或 branch。")
    ],
    "cs608.html#q1": [
      q("Q1 为什么是黑盒？", "它主要从 specification 生成代表性输入，不依赖代码内部结构。"),
      q("BVA 的关键词有哪些？", "Boundary、minimum、maximum、threshold、less than、at least、between。"),
      q("Decision Table 的关键词有哪些？", "Multiple conditions、combinations、causes、effects、rules、infeasible。")
    ],
    "cs608.html#q2": [
      q("Q2 的核心产物是什么？", "Additional tests，并解释它们补了哪些 statements 或 branches。"),
      q("SC 和 BC 哪个更强？", "BC 通常更强，因为它要求每个 decision 的 true 和 false 都被覆盖。"),
      q("Short-circuit 为什么影响覆盖？", "复合条件可能提前停止，导致某些子条件根本没有被 evaluated。")
    ],
    "cs608.html#q3": [
      q("Class context 测试为什么要设置对象状态？", "对象方法依赖字段和调用历史，必须先让对象进入目标状态。"),
      q("Static 和 instance 方法测试有什么差别？", "Static 不依赖某个对象实例；instance 方法通常要先创建对象并设置 state。"),
      q("Accessor 在测试里有什么用？", "它通过 public API 观察对象内部状态变化，避免直接访问 private field。")
    ],
    "cs608.html#q4": [
      q("Random testing 不是纯随机的原因是什么？", "仍然要设计数据分布、oracle 和停止条件，否则无法判断结果和覆盖风险。"),
      q("Completion problem 可以用什么回答？", "测试数量、时间预算、覆盖目标、失败率稳定或风险优先级。"),
      q("AI 生成测试时人要检查什么？", "检查 specification 是否符合、oracle 是否正确、关键边界和风险是否覆盖。")
    ],
    "cs608.html#exam-map": [
      q("CS608 考法地图怎么用？", "把每年题目归到 Q1-Q4 的固定技能，复习时按技能补弱点。"),
      q("Q1 样章为什么重要？", "它完整展示了 BVA/DT 的知识点、题型判断、表格和 worked example。"),
      q("如果时间少，优先稳哪几类？", "BVA/DT 表格、JaCoCo additional tests、class context 模板、random 三问题。")
    ],
    "cs608.html#summary": [
      q("CS608 答案最怕漏什么？", "漏 expected result 或 coverage explanation。只给输入不够。"),
      q("黑盒表格最后检查什么？", "TCI、data values、test cases、expected result 是否一一对应。"),
      q("白盒题最后检查什么？", "是否明确说出新增测试覆盖了哪条未覆盖语句或分支。")
    ],

    "cs603.html#foundation": [
      q("形式化验证解决什么问题？", "把正确性要求写成数学性质，并尝试证明所有相关行为都满足，而不只测试几个例子。"),
      q("Safety 和 liveness 怎么粗略区分？", "Safety 是坏事不发生；liveness 是好事最终发生。"),
      q("CS603 为什么从逻辑开始？", "因为 contract、Hoare、Dafny、model checking、SMT 都需要把要求写成公式。")
    ],
    "cs603.html#logic": [
      q("Predicate 和 proposition 的区别是什么？", "Predicate 带变量；proposition 在给定变量后有确定真假。"),
      q("Unsatisfiable 表示什么？", "没有任何赋值能让公式成立。"),
      q("量词最容易漏什么？", "变量范围，例如数组下标必须限制在 <code>0 ≤ i &lt; a.Length</code>。")
    ],
    "cs603.html#hoare": [
      q("Hoare logic 证明循环的核心是什么？", "找到 invariant，并证明建立、保持、退出推出 postcondition。"),
      q("Total correctness 比 partial 多什么？", "多 termination proof，通常用 variant。"),
      q("Assignment rule 为什么常倒着看？", "因为要知道赋值前需要什么条件，才能保证赋值后 postcondition 成立。")
    ],
    "cs603.html#dafny": [
      q("Dafny verifier 不会自动知道什么？", "不会自动知道循环整体做了什么，需要 invariant 描述已处理部分和范围。"),
      q("<code>decreases</code> 用来解决什么报错方向？", "证明递归或循环会终止，避免 verifier 无法确认 termination。"),
      q("Object invariant 要由谁维护？", "Constructor 建立它，所有会改变状态的方法都要保持它。")
    ],
    "cs603.html#model-checking": [
      q("Model checking 适合什么系统？", "适合状态系统、协议、并发或时间性质，而不只是单个函数前后条件。"),
      q("<code>AG safe</code> 和 <code>EF error</code> 分别是什么意思？", "<code>AG safe</code> 是所有路径永远 safe；<code>EF error</code> 是存在路径最终到达 error。"),
      q("Counterexample 为什么有用？", "它给出具体违反路径，帮助定位模型或性质哪里出问题。")
    ],
    "cs603.html#sat-smt": [
      q("CNF 是什么结构？", "多个 clauses 的 AND，每个 clause 是多个 literals 的 OR。"),
      q("DPLL 的直觉是什么？", "系统地猜变量真假、简化、发现冲突后回溯。"),
      q("SMT 为什么和程序验证关系密切？", "程序验证常产生整数、数组、等式等约束，SMT solver 能处理这些理论。")
    ],
    "cs603.html#fret-refinement": [
      q("Under-specification 为什么危险？", "需求没说清时，多个实现都可能自称正确，但行为不符合用户真实期待。"),
      q("FRET 改善需求的方式是什么？", "把自然语言需求拆成触发、条件、响应和时间范围，减少歧义。"),
      q("Data refinement 的核心检查是什么？", "具体表示的数据行为要保持抽象模型承诺的性质。")
    ],
    "cs603.html#exam-map": [
      q("CS603 考法地图怎样使用？", "把题目归到 logic/Hoare、Dafny、FMAS/SAT、model checking，再按模板练。"),
      q("Dafny 题常见缺口是什么？", "缺 invariant、decreases、assert 或对象 invariant 维护。"),
      q("Model checking 题常考什么？", "状态图、LTL/CTL 公式、工具比较和 counterexample 解释。")
    ],
    "cs603.html#summary": [
      q("Hoare 答案最后检查什么？", "是否有 pre/post、invariant 三步证明和 termination 说明。"),
      q("Dafny 答案最后检查什么？", "是否覆盖 requires、ensures、invariant、decreases、assert/ghost 的作用。"),
      q("SAT/SMT 答案最后检查什么？", "是否区分 sat、unsat、model，以及 SAT 和 SMT 的理论能力差别。")
    ],

    "cs608-q1-sample.html#knowledge": [
      q("Q1 为什么不能穷举测试？", "输入空间通常太大甚至无限，穷举在时间和成本上不可行，所以要系统挑代表性测试。"),
      q("BVA 的核心风险是什么？", "边界附近最容易写错，例如 <code>&lt;</code> 和 <code>&lt;=</code> 搞反。"),
      q("TCI、Data Values、Test Cases 的顺序是什么？", "先定 coverage item，再选具体数据值，最后写包含 expected result 的 test case。")
    ],
    "cs608-q1-sample.html#judge": [
      q("题面有数值范围时优先想什么？", "优先想 BVA，找 lower/upper boundary 和 just below/on/just above。"),
      q("题面有多个条件组合时优先想什么？", "优先想 Decision Table，列 causes、effects、rules 和 infeasible combinations。"),
      q("EP 和 BVA 的关系是什么？", "EP 先分行为相同的区域，BVA 再重点检查区域边界附近的值。")
    ],
    "cs608-q1-sample.html#exam-patterns": [
      q("考法变化表应该怎么用？", "用来判断 Q1 在不同年份更偏 BVA、DT 还是 exhaustive explanation，并准备对应表格。"),
      q("为什么样章要看 2023-2025？", "它能显示 Q1 不是单一模板，而是在黑盒方法之间切换。"),
      q("看到旧题时要抽取什么？", "抽取题型关键词、输出表格结构和 expected result 写法，而不是死背数据。")
    ],
    "cs608-q1-sample.html#classic": [
      q("Worked example 的学习重点是什么？", "看题面如何转成 TCI、data values、test cases 和 expected results。"),
      q("BVA worked example 最该观察什么？", "每个 boundary 为什么选这些值，以及 nominal value 怎样避免组合爆炸。"),
      q("DT worked example 最该观察什么？", "conditions/actions 怎样变成 rules，哪些组合 infeasible，哪些 rule 需要 test case。")
    ],
    "cs608-q1-sample.html#worked-bva": [
      q("BVA worked example 的第一步是什么？", "先从 specification 找输入变量和边界，不要直接猜测试数据。"),
      q("为什么 nominal value 很重要？", "它让其他变量保持普通有效值，帮助你把失败原因定位到当前边界。"),
      q("BVA 表格里的 expected result 从哪里来？", "只能从题目 specification 推出，不能从代码运行结果反推。")
    ],
    "cs608-q1-sample.html#worked-dt": [
      q("Decision Table worked example 先列什么？", "先列 causes 和 effects，再组合 rules。"),
      q("为什么要标 infeasible combinations？", "有些条件组合现实或规格上不可能，不应该硬凑 test case。"),
      q("每条可行 rule 至少需要什么？", "至少一个具体 test case，并写出 expected effect。")
    ],
    "cs608-q1-sample.html#summary": [
      q("Q1 答案必须包含什么？", "方法选择理由、TCI、data values、test cases、expected result 和必要的 infeasible 说明。"),
      q("BVA 表格最后检查什么？", "每个边界是否有 below/on/above，expected result 是否来自 specification。"),
      q("DT 表格最后检查什么？", "每条可行 rule 是否有 test case，infeasible combination 是否说明理由。")
    ]
  };

  const fallbackQuestions = (section) => {
    const title = section.querySelector("h2")?.textContent.trim() || "本节";
    return [
      q(`${title}：本节最核心的判断是什么？`, "先用自己的话复述本节标题，再回到表格或模板里找关键词，确认自己知道它在考试中解决哪类问题。"),
      q(`${title}：答案应该落到哪里？`, "落到题目场景、证明步骤、测试表格、代码结构或 trade-off。只背定义通常不够。"),
      q(`${title}：学完后怎样自测？`, "遮住正文，用 30 秒说出本节的定义、一个例子、一个常见扣分点；说不出就回到本节重新读。")
    ];
  };

  const pageName = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");

  const examFollowups = (section) => {
    const id = section.id;
    const pageKey = pageName.replace(".html", "");

    const cs615 = {
      "textbook-audit": [
        q("CS615 Sample Q1 FinTrack 说明教材流程为什么要先学 3-tier？", "因为题目直接要求把 monolith 和 microservices 映射到 Presentation/Application/Data 三层。"),
        q("2025 Summer Q1 说明为什么数据库要早学？", "因为 full-stack 和 shopping habits database choice 都要求先懂 server/database 分工、SQL/NoSQL 和 transaction。"),
        q("Sample Q4 说明为什么 CI/CD/Observability 不能单独背？", "因为 CI/CD 和 observability 要服务于生产 Web app 的交付、回滚、质量和故障排查。")
      ],
      foundation: [
        q("2025 Summer Q1(a) 小题：给 intern 解释 full-stack 时，frontend、server、database 各用一句话怎么分工？", "Frontend 显示界面并收集输入；server 接 request、执行业务规则和权限检查；database 长期保存用户、订单、收据等数据。"),
        q("2025 Summer Q1(a) 小题：CRUD 里的 Update 和 Create 各对应什么 HTTP 意图？", "Create 是新增资源，常用 <code>POST</code>；Update 是修改已有资源，常用 <code>PUT</code> 或 <code>PATCH</code>。"),
        q("2025 Summer Q1(a) 小题：SQL 和 NoSQL 的差别不能只写“表格 vs 文档”，还要补哪一点？", "要补数据关系、事务一致性、查询方式和扩展压力；这些才决定题目场景里选哪一个。")
      ],
      "full-stack": [
        q("2025 Summer Q1(a) 小题：如果要求解释 frontend、database、servers roles，答案应该按哪三层写？", "按 presentation、application/business logic、data layer 写，并用 request/response 串起来。"),
        q("2024 Summer Q1 小题：CRUD 解释要不要给 Web API 例子？", "要。比如 <code>POST /orders</code> 创建订单，<code>GET /orders/15</code> 读取订单，能把抽象 CRUD 落到 Web 场景。"),
        q("CS615 past paper 小题：full-stack 题里为什么不能只列 MERN 技术名？", "因为题目问角色和职责。要说每层做什么、如何通信、数据在哪里保存、权限在哪里检查。")
      ],
      database: [
        q("2025 Summer Q1(b) 小题：顾客购物习惯数据有 items、price、date、unique receipt number，为什么先考虑 SQL？", "因为它像收据/订单系统，实体关系清楚，receipt number 和 item rows 需要一致，适合表、外键、join 和 transaction。"),
        q("2025 Summer Q1(b) 小题：这个场景下 NoSQL 什么时候才更合理？", "如果题目重点变成高量 clickstream、浏览事件、灵活行为日志，而不是可靠收据和交易历史，NoSQL 才更好辩护。"),
        q("2024/2025 SQL/NoSQL 小题：写 database choice 时必须出现哪三个判断维度？", "数据形状是否稳定、关系和 join 是否重要、出错时是否需要 ACID transaction。")
      ],
      mvc: [
        q("2025 Summer Q2 小题：MVC 25 分题里 web example 的 request flow 怎么写？", "Browser -> route -> controller -> model/database -> view/response，并说明每一步的职责。"),
        q("Sample Q3 Rails controller 小题：controller 同时算折扣、保存订单、发邮件、记录 analytics，违反什么？", "违反 MVC 的职责边界和 SRP。折扣应进 service，保存进 model/repository，邮件和 analytics 应拆到 mailer/job/adapter。"),
        q("2023 Summer Q1(b) 小题：MVC 还要求另一个 programming environment example，怎么避免只写 Rails？", "可以写 desktop/mobile GUI：View 是界面，Controller 处理用户动作，Model 保存和验证数据。")
      ],
      architecture: [
        q("Sample Q1 FinTrack 小题：Approach A 的 3-tier monolith 怎样映射三层？", "React frontend 是 presentation；Spring Boot backend 是 application/logic；PostgreSQL 是 data layer。"),
        q("Sample Q1 FinTrack 小题：Approach B 的 Application tier 和 A 最大通信差别是什么？", "B 把 application tier 拆成多个 Node services，服务之间通过 API/网络通信；A 的 logic 多在一个 monolith 内部调用。"),
        q("Sample Q1 FinTrack 小题：transaction history strict consistency 更支持哪种 data choice？", "更支持 PostgreSQL/SQL，因为交易历史需要可靠事务、一致性和关系查询。")
      ],
      request: [
        q("2025 Summer full-stack 小题：点击“查看 receipt”时 request/response 链条怎么拆？", "Browser 发 <code>GET /receipts/{id}</code>，server route 到 controller，controller 查 database，server 返回 HTML/JSON，browser 渲染。"),
        q("Sample FinTrack 小题：real-time stock price update 走 request/response 时，Application tier 需要额外考虑什么？", "需要考虑频繁更新、缓存/streaming、服务吞吐和前端状态刷新，而不是只做一次普通页面加载。"),
        q("2023 cloud subscriptions 小题：学生 sign up to courses 时，为什么 request 必须经过后端？", "后端要检查身份、课程容量、权限和数据一致性，不能让前端直接写数据库。")
      ],
      rails: [
        q("Sample Q3 Rails 小题：<code>OrdersController#create</code> 里折扣计算应该抽到哪里？", "抽到 service object，例如 <code>OrderPricingService</code>，controller 只协调 request 和 response。"),
        q("Sample Q3 Rails 小题：如果 action 同时 redirect/render、发邮件、记 analytics，测试会难在哪里？", "每个测试都被多个副作用牵连，难以只验证一个职责，mock/stub 也会变多。"),
        q("Sample Q3 Rails 小题：重构后至少要写哪两类测试？", "Service 的业务规则单元测试，以及 controller 的 request/response、params、redirect/render 测试。")
      ],
      spring: [
        q("Sample FinTrack 小题：Spring Boot monolith 里 controller、service、repository 怎样分工？", "Controller 接 API request，service 处理 filtering/transaction rule，repository 访问 PostgreSQL。"),
        q("2023 course subscriptions 小题：PaaS 部署 Spring app 时，团队主要还要负责什么？", "负责应用代码、配置、数据模型、访问控制和业务功能；平台负责大量 runtime 和部署基础设施。"),
        q("Forms/Security 小题：学生课程注册表单为什么要后端验证？", "因为用户可以绕过前端。后端必须检查身份、输入范围、课程是否可选和重复注册。")
      ],
      "node-react": [
        q("2023 Summer Q2(iv) 小题：<code>console.log('first'); setTimeout(...); console.log('fifth')</code> 前两个输出是什么？", "先输出 <code>first</code>，再输出 <code>fifth</code>，因为同步代码先执行，timeout callback 后进队列。"),
        q("2023 Summer Q2(ii) 小题：为什么会用 Node.js 做 web project？", "Node 适合 I/O-heavy Web API，JavaScript 前后端统一，生态丰富，Express 能快速写 routes/middleware。"),
        q("2025 Summer Q3(b) 小题：有人说永远不该用 React，你至少要反驳哪两点？", "React 用 component/props/state 管复杂交互，适合动态 UI；但也承认 tooling、SEO、initial load 和学习成本。")
      ],
      quality: [
        q("2023 Summer Q3(a) 小题：accessible website 用 CSS 能写哪三个具体做法？", "足够颜色对比、可见 focus outline、响应式/可缩放字号布局；还可避免只靠颜色表达状态。"),
        q("2023 Summer Q4(a) 小题：white-hat SEO 给 client 的两条建议是什么？", "清楚标题和语义结构、真实高质量内容、可读 URL、alt text、合理性能和内部链接。"),
        q("2023 Summer Q4(b) 小题：SQL injection 防御不能只写 sanitize，还要写什么？", "写 parameterized queries/prepared statements、ORM 安全 API、输入验证和最小数据库权限。")
      ],
      "http-cloud": [
        q("2023 Summer Q1(a) 小题：HTTP/1.1 相比 HTTP/1.0 处理多个请求的关键改进是什么？", "HTTP/1.1 支持 persistent connections/keep-alive，减少每个资源都新建连接的开销。"),
        q("2023 Summer Q1(a) 小题：HTTP/2 的 multiplexing 要解决什么？", "让多个 streams 在一个连接上交错传输，减少 HTTP 层面的 head-of-line blocking。"),
        q("2023 Summer Q3(c) 小题：course subscriptions tool 为什么推荐 PaaS 而不是 SaaS？", "题目要自建订阅工具，SaaS 太固定；PaaS 能部署自定义 app，又少管底层服务器。")
      ],
      delivery: [
        q("Sample Q4(a) 小题：CI/CD 和 Observability 各用一句话怎么定义？", "CI/CD 是自动构建、测试、交付/部署流程；Observability 是通过 logs、metrics、traces 理解生产系统内部状态。"),
        q("Sample Q4(b) 小题：Observability 和 Monitoring 的区别用 production bug 怎么说？", "Monitoring 告诉你 error rate 升高；observability 帮你用 trace/log 找到哪个 service、哪次 deploy、哪条 request 出问题。"),
        q("Sample Q2 AI agents 小题：agent 重构 monolith 成 microservices 时，opaque optimized code 最大风险是什么？", "维护性下降、debug 困难、技术债隐藏，团队可能无法审查架构边界和安全影响。")
      ],
      "sample-topics": [
        q("Sample Q1 FinTrack 小题：高频价格更新更支持 microservices 的哪一面？", "可以单独扩展价格/streaming 服务，提高 scalability；但会增加网络、部署和数据一致性复杂度。"),
        q("Sample Q2 AI Agents 小题：列一个 advantage 和一个 risk，必须贴 e-commerce。", "Advantage：快速生成 login/cart tests 或 deployment scripts；risk：误处理支付/隐私逻辑或生成难审查代码。"),
        q("Sample Q4 CI/CD 小题：full observability stack 的 trade-off 写哪两类？", "收益是更快定位生产问题；代价是工具成本、数据量、隐私风险、团队学习成本和告警疲劳。")
      ],
      triage: [
        q("2025 Summer Q1(b) 看到 receipt number、items、price、date，应归到哪类答案结构？", "SQL/NoSQL database choice：先描述数据关系和事务一致性，再比较 NoSQL 何时可行。"),
        q("2023 Summer Q2(iv) 看到嵌套 <code>setTimeout</code>，应归到哪类答案结构？", "Node event loop 输出题：先列同步输出，再解释 callback 排队和延迟。"),
        q("Sample Q1 看到 FinTrack 和两种 architecture，应归到哪类答案结构？", "Architecture comparison：映射 3-tier，再按 scalability/performance/resilience/deployment 比较并推荐。")
      ],
      "exam-map": [
        q("从 2023 到 2025，MVC 在 CS615 里出现过几种问法？", "2023 要解释 MVC 并给 web/other environment；2025 是 25 分 essay；Sample Q3 用 Rails controller 检查 MVC/SRP。"),
        q("从 2023 到 2025，Node/React 出题怎样变化？", "2023 偏 Node callback/output 和 React merits；2024/2025 继续考 Node/Express/React 与 componentization。"),
        q("Sample 相比 past paper 新增了哪些工程主题？", "FinTrack architecture、AI agents、Rails controller refactor、CI/CD 和 observability。")
      ],
      templates: [
        q("2025 MVC 25 分题：模板第一段不要写什么？", "不要直接堆 Rails 名词；先定义 Model/View/Controller，然后再放 request flow 和 concrete example。"),
        q("Sample FinTrack 比较题：recommendation 不能只选 microservices，为什么？", "要看团队能力、transaction consistency 和 operational complexity；可推荐 modular monolith 或逐步拆分。"),
        q("2023 security 题：SQL injection/XSS 模板都要有哪三段？", "定义攻击、给一个简短攻击例子、写具体防御。")
      ],
      summary: [
        q("做 2025 shopping database 题时，答案最后用哪一句收束？", "Given structured receipt data and consistency needs, SQL is the stronger default; NoSQL is only better for flexible high-volume event data."),
        q("做 2023 HTTP evolution 题时，答案最后用哪条主线收束？", "每一代都在减少连接开销、阻塞和等待，提高多个 requests/responses 的传输效率。"),
        q("做 Sample AI agents 题时，答案最后要落在哪个立场？", "AI agents can accelerate SDLC tasks, but human oversight, tests, review and security checks remain necessary.")
      ],
      "exam-ladder": [
        q("CS615 2025 Q1 小题：学完线性页后第一套可练哪题？", "练 2025 Summer Q1：intern full-stack explanation + shopping habits SQL/NoSQL choice。"),
        q("CS615 Sample 小题：学完架构和数据库后应练哪题？", "练 Sample Q1 FinTrack：3-tier monolith vs microservices，并比较 scalability、resilience、deployment。"),
        q("CS615 Sample 小题：学完 Rails/SRP 后应练哪题？", "练 Sample Q3 OrdersController：指出 controller 过胖、违反 SRP，并提出 service/job/model 重构。")
      ]
    };

    const cs605 = {
      language: [
        q("Sample B Q1(a) 小题：<code>L1A={w1#w2#...#w2n : wi∈{a}*, wi=wi+1 for one odd i}</code> 的输入长什么样？", "输入是用 <code>#</code> 分隔的偶数个 unary blocks，例如 <code>a#aa#...</code>；yes 条件是某个奇数位置 block 等于下一个 block。"),
        q("Sample A Q2(b) 小题：<code>{J,a,b,c : running J sometime makes a+b=c true}</code> 是在问字符串结构还是程序行为？", "是在问 Java program 的运行行为，所以更接近 recogniser/模拟，而不是 pumping lemma。"),
        q("Sample B Q6A 小题：CARA friends clique 语言的 yes instance 是什么？", "输入是 graph <code>G,k</code>；yes 条件是存在 size <code>k</code> 的学生集合，集合中任意两人都是朋友。")
      ],
      symbols: [
        q("Sample B Q6A 小题：<code>G=(V,E)</code> 里 <code>V</code> 和 <code>E</code> 分别是什么？", "<code>V</code> 是学生集合，<code>E</code> 是社交网站 CARA 上互为朋友的学生对。"),
        q("Sample A Q6B 小题：<code>A</code> 是一组 finite automata，<code>W</code> 是什么？", "<code>W</code> 是 <code>n</code> 个长度正好为 <code>n</code> 的 words，题目要求某个 word 被所有 automata 接受。"),
        q("Sample B Q5 小题：<code>{J,b,c : throughout execution b &lt; mean(c)}</code> 的输入编码包含哪些对象？", "包含 Java program <code>J</code>、浮点变量 <code>b</code> 和整数数组 <code>c</code> 的编码。")
      ],
      "proof-basics": [
        q("Sample B Q1(a) not regular 小题：证明开头第一句怎么写？", "Assume for contradiction that <code>L1A</code> is regular. Let <code>p</code> be the pumping length."),
        q("Sample A Q3 L3 exception 21 小题：mapping reduction 里 <code>iff</code> 要对齐哪两件事？", "构造出的 Java program 是否不抛 exception 21，要和原 <code>M</code> 是否 halts on <code>w</code> 精确对齐。"),
        q("Sample B Q7 3-SAT to CARA clique 小题：correctness 需要哪两个方向？", "如果 3-SAT formula satisfiable，则构造图有 clique；如果图有目标 clique，则能读回 satisfying assignment。")
      ],
      automata: [
        q("Sample A Q2(a) 小题：FA accepts at least one word of length greater than 5，decider 先检查什么？", "先检查输入是否是有效 FA 编码，再搜索有限状态图中是否存在长度大于 5 的 accepting path。"),
        q("Sample B Q2(a) 小题：FA language nonempty 怎么 decide？", "从 start state 做 graph reachability，看是否能到达 accepting state；状态有限，所以会停机。"),
        q("Sample A Q6B 小题：一组 FA 都接受某个 word，verifier 要模拟什么？", "证书给出那个 word；verifier 检查 word 在 <code>W</code> 中且每个 automaton 都接受它。")
      ],
      "pumping-regular": [
        q("Sample B Q1(a) 小题：对 <code>w1#w2#...#w2n</code> 类语言，pumping 时为什么要选很多 unary block？", "因为要让 pumped part 被限制在某个局部，pump 后破坏某个相邻 block 相等关系或分隔结构。"),
        q("Sample A Q1(a) 小题：not regular 证明中，选 word 后下一句必须说明什么？", "说明任意合法 split <code>xyz</code> 中 <code>y</code> 被 pumping length 限制在特定区域。"),
        q("Sample B Q1(a) 小题：pump 后如何写 contradiction？", "指出 pumped string 不再满足题目定义的相等/位置条件，但 pumping lemma 要求仍在语言中。")
      ],
      pumping: [
        q("Sample B Q1(a) 小题：not regular 证明不能只说“FA 记不住”，还要写什么？", "要写 pumping length、选 word、任意 split 限制、pump 值和 pumped word 不在语言里。"),
        q("Sample A/B Q1(b) 小题：not CFL 证明为什么要按 <code>v,y</code> 位置分情况？", "因为 <code>v,y</code> 可落在不同 block 或跨分隔符，必须证明所有合法位置 pump 后都会破坏条件。"),
        q("Sample Q1 小题：如果题目让 choose one not CFL，选择时优先选什么样的语言？", "优先选结构分区清楚、pump 后容易破坏多段相等或复制关系的语言。")
      ],
      "pda-cfl": [
        q("Sample Q1(b) 小题：not context-free 题里 <code>|vxy|≤p</code> 的作用是什么？", "它让 <code>vxy</code> 只能覆盖局部区域，不能同时修正所有相关 block。"),
        q("Sample Q1(b) 小题：如果 <code>v</code> 和 <code>y</code> 都落在同一段，pump 后通常破坏什么？", "通常破坏该段数量而其他段不变，从而破坏相等或配对关系。"),
        q("Sample Q1(b) 小题：如果 <code>vxy</code> 跨过分隔符，pump 后常破坏什么？", "常破坏字符串格式或分隔符数量/位置，使 pumped word 不符合语言定义。")
      ],
      tm: [
        q("Sample A Q2(b) 小题：Java 运行中某次 <code>a+b=c</code>，recogniser 怎么构造？", "模拟 <code>J</code>，每一步检查变量 <code>a,b,c</code>；一旦发现 <code>a+b=c</code> 就 accept。"),
        q("Sample B Q2(b) 小题：Java opens at least <code>n</code> files 后文件数不等于 <code>n</code>，为什么是 recognisable？", "可以模拟程序，观察 open file count；一旦目标事件发生就 accept，若永不发生可一直模拟。"),
        q("Sample A/B Q2(a) 小题：FA 相关 decidable proof 结尾必须写什么？", "状态图有限、搜索/模拟有限，因此 TM halts on every input。")
      ],
      reductions: [
        q("Sample A Q3 小题：L3 是 Java program 不抛 exception 21，构造 <code>N</code> 时如何让 HALT 控制 property？", "<code>N</code> 先模拟 <code>M(w)</code>；根据是否 halts 决定是否抛 exception 21，使 property 与 HALT 对齐。"),
        q("Sample A Q5 小题：line number <code>n</code> never executed，如何把目标 line 放进构造？", "让 <code>N</code> 先模拟 <code>M(w)</code>；若模拟停机才执行指定 line，从而 line 是否执行反映 HALT。"),
        q("Sample B Q5 小题：<code>b &lt; mean(c)</code> throughout execution 的 reduction 要控制什么？", "构造程序让该不变量在 <code>M(w)</code> 是否停机时被保持或被破坏，从而和 HALT yes/no 对齐。")
      ],
      complexity: [
        q("Sample B Q6A 小题：CARA clique 的 certificate 是什么？", "一个 size <code>k</code> 的学生子集 <code>S</code>。Verifier 检查每对学生是否在 <code>E</code> 中。"),
        q("Sample B Q6B 小题：phones vertex cover 语言的 certificate 是什么？", "一个 size <code>k</code> 的 phone 子集 <code>S</code>。Verifier 检查每条 communication edge 至少有一个端点在 <code>S</code> 中。"),
        q("Sample A Q6A 小题：两个 proper subsets <code>Y,Z</code> 覆盖 <code>A</code> 且 sums equal，certificate 是什么？", "Certificate 是两个子集 <code>Y,Z</code>；verifier 检查 proper、覆盖每个元素、并比较两边 sum。")
      ],
      np: [
        q("Sample B Q6A 小题：CARA clique verifier 的 polynomial loop 主要检查什么？", "检查 <code>|S|=k</code>，然后检查 <code>S</code> 中每一对学生是否都有 edge。最多二重循环，多项式。"),
        q("Sample B Q6B 小题：phone vertex cover verifier 为什么是 polynomial？", "遍历每条 communication pair，检查至少一端在证书集合 <code>S</code> 中；最多按边数循环。"),
        q("Sample A Q6B 小题：FA set + word set 题的 verifier 为什么不是 exponential？", "证书指定某个 word；verifier 只需对每台 FA 模拟这个 word，不需要枚举所有 words。")
      ],
      "np-complete": [
        q("Sample B Q7 小题：要证明 CARA clique NP-complete，已知源问题是什么？", "题目给定 3-SAT is NP-complete，因此 reduction 从 3-SAT 到 L6A/CARA clique。"),
        q("Sample B Q7(b) 小题：给公式 <code>(b∨a∨c)...</code> 要求 reduction output，考的是什么？", "考你是否真的会把 clauses/literals 转成 clique construction 的 vertices 和 edges，而不是只背模板。"),
        q("Sample Q7 小题：证明 NP-complete 时为什么要引用前一题 in NP？", "因为 NP-complete 需要 membership + hardness；前一题已经证明 <code>L∈NP</code>，Q7 重点补 NP-hard reduction。")
      ],
      "question-types": [
        q("Sample A Q2(a) 对 FA 接受长度 >5 的 word，是哪类题？", "Construct decider：有限自动机状态有限，可以有限搜索。"),
        q("Sample A Q3/Q5 exception 21、line n never executed，是哪类题？", "HALT mapping reduction：构造程序把停机行为转成 Java property。"),
        q("Sample B Q6/Q7 CARA clique，是哪两类题连续出现？", "先 Q6 证明 in NP，再 Q7 从 3-SAT reduce 证明 NP-complete。")
      ],
      "exam-map": [
        q("Sample A 和 B 的 Q2 有什么共同模式？", "Q2(a) 是 FA decidable；Q2(b) 是 Java program property Turing-recognisable。"),
        q("Sample A 和 B 的 Q3/Q5 有什么共同模式？", "都从 HALT 做 mapping reduction 到 Java/TM 行为性质。"),
        q("Sample B Q6/Q7 比 Sample A 更具体在哪里？", "它用 CARA friends clique 和 phone vertex cover 这类图问题，让 certificate/verifier 更具体。")
      ],
      summary: [
        q("Sample A Q3 exception 21 题检查清单第一项是什么？", "是否明确写出从 <code>&lt;M,w&gt;</code> 到 Java program <code>N</code> 的 computable mapping。"),
        q("Sample B Q6A clique 题检查清单第一项是什么？", "是否明确 certificate 是 size <code>k</code> 的 vertex/student subset。"),
        q("Sample B Q1 pumping 题检查清单第一项是什么？", "是否先选了足够长且结构能暴露矛盾的 word，并说明任意 split 的限制。")
      ],
      "exam-ladder": [
        q("CS605 Sample A 小题：学完 decider/recogniser 后先练哪题？", "练 Q2：FA accepts word length >5 decidable，以及 Java <code>a+b=c</code> Turing-recognisable。"),
        q("CS605 Sample A 小题：学完 reductions 后先练哪题？", "练 Q3 exception 21 和 Q5 line number n never executed 的 HALT mapping reductions。"),
        q("CS605 Sample B 小题：学完 NP 后先练哪题？", "练 Q6 CARA clique/phone vertex cover in NP，再接 Q7 3-SAT reduction。")
      ]
    };

    const cs608 = {
      "test-case": [
        q("2025 Summer Q1(b) Climate.determine 小题：<code>temp&lt;16</code> 和 <code>humidity&gt;60</code> 各对应什么输出风险？", "温度边界控制 HEAT，湿度边界控制 AC；两者组合产生 NONE、HEAT_ONLY、AC_ONLY、HEAT_AND_AC。"),
        q("2023 Summer Q1(a) maxv 小题：为什么 expected result 不能靠程序输出？", "maxv 的 oracle 应该是数组最大值定义；如果用 actual output 当 expected，就无法发现错误。"),
        q("2025 Summer Q2 decideWrite 小题：additional test 也必须写 expected result，为什么？", "因为 coverage 只说明执行路径，expected result 才能判断路径上的行为是否正确。")
      ],
      terms: [
        q("2023 Summer Q1(a) maxv 小题：exhaustive testing 不可行要同时提哪两种时间？", "Test design time 和 test execution time；Java array 最大长度让输入组合巨大。"),
        q("2025 Summer Q1(c) Climate.determine 小题：TCI 和 Test Case 为什么不能混？", "TCI 是覆盖目标，如 temp boundary；Test Case 是具体调用和 expected output。"),
        q("2025 Summer Q4 PV.exportPower 小题：random testing 的 oracle 是什么？", "根据 Decision Table 判断 enabled/nettPower 对应 true/false，而不是随机猜结果。")
      ],
      coverage: [
        q("2025 Summer Q1(c) Climate.determine 小题：BVA 的 selected equivalence values 应围绕哪些边界？", "围绕 <code>temp=16</code> 和 <code>humidity=60</code>，例如 just below/on/above，且不包含 error values。"),
        q("2023 Summer Q2 Wind.categorise 小题：JaCoCo 红线表示什么 coverage item？", "红线表示未执行 statement，需要设计输入让该语句执行，形成 statement coverage TCI。"),
        q("2025 Summer Q2 decideWrite 小题：黄色 diamond 的 TCI 应怎样写？", "写成具体未走分支，例如 line 28 true/false branch 或 null else branch，而不是只写“yellow line”。")
      ],
      "black-box": [
        q("2025 Summer Q1(c) Climate.determine 小题：为什么题目说 Do not include error values？", "BVA tests 只覆盖非错误边界附近的有效行为，error partition 已在 part (b) 输入/输出 partition 里处理。"),
        q("2023 Summer Q1(b) boilerSetting 小题：温度 <code>t</code> 的 value line 至少有哪些区间？", "非常低、<code>t&lt;1</code>、<code>1≤t&lt;25</code>、<code>t≥25</code>，并结合 <code>isOn</code> 形成 causes。"),
        q("2023 Summer Q1(c) boilerSetting 小题：为什么要 cross out infeasible combinations？", "Decision Table 可能包含互斥条件组合，例如同一 <code>t</code> 不可能同时在两个温度区间。")
      ],
      q1: [
        q("2025 Summer Q1(b) Climate.determine 小题：input partitions 应包含哪些错误类？", "温度/湿度超出规格允许范围时应列 error partitions，并映射到 <code>ERROR</code> 输出。"),
        q("2023 Summer Q1(c) boilerSetting 小题：题目指定 -50 和 +50 是让你做什么？", "用作 very low / very high 的具体 data values，支撑 DT test cases。"),
        q("2025 Summer Q1(c) Climate.determine 小题：如何避免 duplicate coverage？", "每个 test case 要覆盖新的 TCI 或 expected output TCI；已经覆盖的边界不要重复用另一个等价 test case。")
      ],
      "white-box": [
        q("2025 Summer Q2(a) decideWrite 小题：lines 28 和 32 黄色、line 33 红色，第一步写什么？", "明确未走分支和未执行语句，包括 null else，再给触发条件。"),
        q("2025 Summer Q2(b) optimized decideWrite 小题：line 51 的 '1 of 4 branches missed' 为什么是 4？", "复合条件经过 short-circuit bytecode 分成多个 branch，不只是源代码层面一个 if 的 true/false。"),
        q("2023 Summer Q2 Wind.categorise 小题：full SC 和 full BC 要求有什么不同？", "SC 只要求红色语句执行；BC 还要求每个 decision 的 true/false 分支都走到。")
      ],
      q2: [
        q("2023 Summer Q2(a) 小题：black-box vs white-box 要比较哪五点？", "错误类型、source code change 对测试的影响、能否先于代码写测试、specification 作用、coverage 是否易测量。"),
        q("2025 Summer Q2(a) decideWrite 小题：Test Coverage Items table 里不要写什么？", "不要只写 test input；要写未覆盖 branch/statement 本身作为 coverage item。"),
        q("2025 Summer Q2(b) short-circuit 小题：答案必须提到哪个层次？", "必须提 bytecode-level branch coverage，因为 JaCoCo 的 4 branches 来自编译后的短路控制流。")
      ],
      oo: [
        q("2025 Summer Q3(a) Numbers 小题：static <code>isNeg(x)</code> 的调用顺序是什么？", "直接调用 <code>Numbers.isNeg(x)</code>，把 return value 和 expected result 比较。"),
        q("2025 Summer Q3(a) Numbers 小题：instance <code>checkValue/isNegative</code> 的调用顺序是什么？", "创建 object，<code>setValue(x)</code>，调用 <code>isNegative()</code>，再 <code>getResult()</code> 并 assert。"),
        q("2023 Summer Q3(b) Lighting.decide 小题：为什么要先识别 accessor methods？", "因为 class context 测试要通过 setters/getters 或 public methods 设置状态和观察 power/override。")
      ],
      q3: [
        q("2025 Summer Q3(b) Braking.decide 小题：analysis 阶段要列哪三个东西？", "Accessor methods、dangerLevel value line、override/dangerLevel/emergencyBrake 的 EP。"),
        q("2023 Summer Q3(b) Lighting.decide 小题：brightness 的关键 partitions 是什么？", "sensor error <0、dark <100、dim 100..500、bright >500，并结合 override。"),
        q("2023 Summer Q3(b) Lighting.decide 小题：Test Cases 必须显示什么？", "必须显示精确 method call sequence 和 expected return/getter values。")
      ],
      automation: [
        q("2025 Summer Q4(b) PV.exportPower 小题：自动化 random test outline 必须包含什么？", "循环/重复结构、随机生成范围、调用 method、assert expected、覆盖每条 DT rule。"),
        q("2025 Summer Q4(b) 小题：安全生成两个 integer limits 之间的 random int 要注意什么？", "要控制 inclusive/exclusive 边界，避免 overflow，并确保生成范围匹配 TCI。"),
        q("2025 Autumn Q2 TestNG pseudo-code 小题：参数化测试表里至少要有什么？", "输入、expected result、TCI id，并让测试方法逐行取数据执行 assert。")
      ],
      random: [
        q("2025 Summer Q4(a) PV.exportPower 小题：Rule 1 的随机数据条件是什么？", "<code>enabled=true</code> 且 <code>nettPower&gt;0</code>，expected return true。"),
        q("2023 Summer Q4(a) isSquare 小题：oracle problem 怎么具体化？", "随机给 <code>x</code> 后，必须有办法判断它是否平方数，例如计算整数平方根再验证。"),
        q("2023 Summer Q4(b) whatSpeed 小题：ERROR partitions 对应哪些 random ranges？", "例如 temp below valid range 或 above valid range，对应 EP1*/EP5*，expected ERROR。")
      ],
      q4: [
        q("2025 Summer Q4 PV.exportPower 小题：Decision Table 四条 rules 如何变成 random test cases？", "每条 rule 固定 boolean cause，再为 nettPower 的 true/false 条件生成随机范围值。"),
        q("2023 Summer Q4 isSquare 小题：test completion problem 可以用什么停止条件？", "固定随机次数、覆盖所有 partitions、达到时间预算，或失败率稳定后停止。"),
        q("2023 Summer Q4 whatSpeed 小题：Random EP Test Cases Table 里 <code>rand(0,50)</code> 覆盖什么？", "覆盖 temp 的 0..50 partition，同时结合其他 boolean/input EP 和 expected OFF。")
      ],
      "exam-map": [
        q("2023 Q1 boilerSetting 和 2025 Q1 Climate.determine 的共同训练是什么？", "都训练从 specification 生成黑盒 coverage items、data values 和 test cases。"),
        q("2023 Wind.categorise 和 2025 decideWrite 的共同训练是什么？", "都训练从 JaCoCo coverage 找 additional tests，但一个偏 SC，一个偏 BC/short-circuit。"),
        q("2023 isSquare/whatSpeed 和 2025 PV.exportPower 的共同训练是什么？", "都训练 random testing 三问题，并把随机生成限制在 EP/DT coverage criteria 内。")
      ],
      summary: [
        q("2025 Climate.determine 检查清单：BVA 答案少哪张表会扣大分？", "少 TCI、selected equivalence values 或 Test Cases 任一表都会让设计不完整。"),
        q("2025 decideWrite 检查清单：additional tests 少哪句话不够？", "少解释该 test 触发哪个 untaken branch/statement，不只是给输入。"),
        q("2025 PV.exportPower 检查清单：random tests 少哪一项不够？", "少 random value generation criteria 或 oracle/expected result，就不能说明随机测试有效。")
      ],
      "exam-ladder": [
        q("CS608 2025 小题：学完黑盒后先练哪题？", "练 2025 Summer Q1 Climate.determine partitions + BVA tables。"),
        q("CS608 2025 小题：学完白盒后先练哪题？", "练 2025 Summer Q2 decideWrite JaCoCo 黄色/红色 additional BC tests。"),
        q("CS608 2025 小题：学完随机测试后先练哪题？", "练 2025 Summer Q4 PV.exportPower random DT tests 和 automated code outline。")
      ],
      knowledge: [
        q("2023 Summer maxv 小题：为什么 Java 最大数组长度这个数字能支持 infeasible？", "因为数组长度和每个元素取值组合极大，设计 expected result 和执行所有组合都不可行。"),
        q("2025 Climate.determine 小题：HEAT_AND_AC 何时出现？", "<code>temp&lt;16</code> 且 <code>humidity&gt;60</code> 同时成立时。"),
        q("2023 boilerSetting 小题：<code>isOn=false</code> 对 effects 有什么影响？", "即使温度低，也应返回 NONE/off，因为系统开关关闭。")
      ],
      judge: [
        q("2025 Climate.determine 小题：为什么这是 BVA 而不是 DT 主题？", "核心是 temp=16、humidity=60 这类数值边界附近的错误风险。"),
        q("2023 boilerSetting 小题：为什么这是 Decision Table？", "它有温度区间和 <code>isOn</code> 多个 causes 组合，对应 LOW/HIGH/NONE effects。"),
        q("2025 PV.exportPower 小题：为什么 random tests 基于 Decision Table？", "题目直接给 DT rules，随机数据只是在每条 rule 的条件范围内生成具体值。")
      ],
      "exam-patterns": [
        q("2023 Q1 与 2025 Q1 的差异是什么？", "2023 偏 exhaustive + boilerSetting DT；2025 偏 exhaustive/input-output partitions + Climate.determine BVA。"),
        q("2025 Autumn Q1 database exhaustive + BVA 说明什么？", "BVA 不只出在气候控制，也会出在数据库/业务规则方法上；关键仍是边界和 partitions。"),
        q("样章复习时要把 2023 boilerSetting 和 2025 Climate.determine 对照什么？", "对照题面关键词：组合条件走 DT，数值阈值边界走 BVA。")
      ],
      classic: [
        q("2025 Climate.determine worked example：选择 temp=15/16/17 是为了覆盖什么？", "覆盖 heating boundary just below/on/above 16。"),
        q("2023 boilerSetting worked example：为什么 -50 和 +50 是 sensible data values？", "它们代表 very low 和 very high 温度，方便覆盖 HIGH/NONE 这类极端区间。"),
        q("2025 decideWrite 类题的 worked mindset 是什么？", "不要从规格开始，而是从 JaCoCo 未覆盖 line/branch 反推 additional inputs。")
      ],
      "worked-bva": [
        q("Climate.determine 小题：humidity=59/60/61 分别服务哪个 BVA 目标？", "分别是 just below/on/above air-conditioning boundary 60。"),
        q("Climate.determine 小题：如果 temp 测边界，humidity 应取什么？", "取 nominal valid value，避免同时触发另一个边界，让测试目标清楚。"),
        q("Climate.determine 小题：为什么题目要求 identify expected output TCIs？", "因为输出 NONE/HEAT_ONLY/AC_ONLY/HEAT_AND_AC 也要被覆盖，不能只覆盖输入边界。")
      ],
      "worked-dt": [
        q("boilerSetting 小题：causes 至少包括哪两类？", "温度区间 causes 和 <code>isOn</code> cause。"),
        q("boilerSetting 小题：effects 对应哪三个 enum？", "<code>NONE</code>、<code>LOW</code>、<code>HIGH</code>。"),
        q("boilerSetting 小题：interpret each rule 是让你做什么？", "用一句话解释每条可行组合为什么返回对应 boiler setting，确认 DT 没填错。")
      ]
    };

    const cs603 = {
      properties: [
        q("2025 Summer Q1(d) Find 小题：<code>ensures forall i :: min <= a[i]</code> 表达什么性质？", "返回的 <code>min</code> 不大于数组中任何元素，是 Find 方法 partial correctness 的核心 postcondition。"),
        q("2025 Summer Q2(c) BankAccount 小题：<code>Balance == deposits.total - withdrawals.total</code> 是什么性质？", "这是 class invariant/ghost predicate <code>Valid()</code> 中的账户一致性性质。"),
        q("2025 Summer Q4(a) Spin 小题：safety property 在 model checking 里通常表达什么？", "表达坏事永不发生，例如某个 error state 不可达或 mutual exclusion 不被破坏。")
      ],
      foundation: [
        q("2025 Summer Q1(d) Find 小题：partial correctness 要证明什么？", "如果程序终止，则返回 <code>min</code> 满足 postcondition，例如不大于数组每个元素。"),
        q("2025 Summer Q1(e) 小题：total correctness 比 partial 多证明什么？", "多证明 termination，通常需要 variant/ranking function。"),
        q("2025 Summer Q4(c) 小题：state explosion problem 是哪类验证的痛点？", "Model checking，因为它要探索大量系统状态和路径。")
      ],
      logic: [
        q("2025 Summer Q1(a) 小题：'If John is right, somebody took his pen' 需要哪些 predicate？", "例如 <code>Right(John)</code>、<code>Took(x, PenOfJohn)</code>，公式可写 <code>Right(John) => ∃x Took(x, PenOfJohn)</code>。"),
        q("2025 Summer Q1(a) 小题：'Every person is walking and talking' 的量词结构是什么？", "<code>∀x (Person(x) => Walking(x) ∧ Talking(x))</code>。"),
        q("2025 Summer Q1(b) 小题：tautology、satisfiable、unsatisfiable 要不要给例子？", "要。题目明确要求 explain terms with example。")
      ],
      contracts: [
        q("2025 Find 小题：<code>requires a.Length > 0</code> 为什么是 precondition？", "因为方法先读 <code>a[0]</code>；空数组会越界，调用者必须保证非空。"),
        q("2025 BankAccount 小题：constructor contract 要建立什么？", "要建立对象初始状态和 class invariant，例如 transactions 初始化、Balance 与 totals 一致。"),
        q("2025 BankAccount 小题：withdraw 方法的 precondition 应防止什么？", "防止取款后余额为负，或破坏 <code>Valid()</code> 中 Balance/totals 的关系。")
      ],
      hoare: [
        q("2025 Summer Q1(d) Find 小题：while loop 的核心 invariant 应描述什么？", "已扫描部分 <code>a[0..i)</code> 中，<code>min</code> 不大于每个已扫描元素，并且 <code>1≤i≤a.Length</code>。"),
        q("2025 Summer Q1(d) Find 小题：退出时 <code>i >= a.Length</code> 如何推出 postcondition？", "结合 invariant 的已扫描范围，当 <code>i==a.Length</code> 时已扫描部分就是整个数组。"),
        q("2025 Summer Q1(e) Find 小题：total correctness 的 variant 可选什么？", "可选 <code>a.Length - i</code>，每次循环 <code>i := i+1</code> 后严格减少且非负。")
      ],
      dafny: [
        q("2025 Summer Q2(a) Ack 小题：为什么 <code>decreases</code> 可以用 tuple？", "Ack 递归有两个参数，tuple metric 允许按词典序证明递归调用整体变小。"),
        q("2025 Summer Q2(b) method <code>M(x,y)</code> 小题：找 code errors 后为什么还要给 invariant 和 variant？", "题目要求修复/解释循环正确性和终止性，invariant 证明结果关系，variant 证明循环停止。"),
        q("2025 Summer Q2(c) BankAccount 小题：ghost predicate <code>Valid()</code> 的作用是什么？", "把对象一致性条件集中成可复用证明义务，方法前后都要维护它。")
      ],
      requirements: [
        q("2025 Summer Q3(c) FRET 小题：FRET 如何支持 model checking temporal formulae？", "把结构化自然语言需求生成 temporal formulae，并进入相应 tool chain 做模型检查。"),
        q("2025 Summer Q3(b) Data Refinement 小题：coded example 要体现什么？", "要体现抽象数据表示和具体数据表示之间的 relation，并证明操作保持抽象行为。"),
        q("2024/2025 FMAS 小题：under-specification 在需求里通常表现为什么？", "时间、触发条件、异常情况或术语范围没说清，导致实现可钻空子。")
      ],
      "model-checking": [
        q("2025 Summer Q4(a) Spin 小题：答案要说明系统模型怎样表示？", "说明用状态/transition 或 Promela-like model 表示系统行为，并用 temporal formula 表示要检查的性质。"),
        q("2025 Summer Q4(b) NuSMV vs Spin 小题：比较时至少提哪一差别？", "Spin 常用于 Promela/explicit-state/LTL 并发协议；NuSMV 常用于 symbolic model checking，支持 CTL/LTL。"),
        q("2025 Summer Q4(d) LTL 小题：如果题目说“请求最终被响应”，常用哪个 LTL 形状？", "常用 <code>G(request -> F response)</code>：每次 request 后最终 response。")
      ],
      "sat-smt": [
        q("2025 Summer Q3(d) SAT/CDCL 小题：CDCL 比 stochastic search 的优势是什么？", "CDCL 从冲突中学习 clauses，避免重复同类错误搜索；stochastic search 通常缺少这种系统学习保证。"),
        q("2025 Summer Q1(b) propositional logic 小题：unsatisfiable 的例子可以写什么？", "<code>P ∧ ¬P</code>，没有任何赋值能让它为 true。"),
        q("Z3 lab 类小题：<code>check-sat</code> 返回 sat 后为什么要看 model？", "model 给出使 constraints 成立的具体赋值，可用于解释或调试约束。")
      ],
      "fret-refinement": [
        q("2025 Summer Q3(c) FRET 小题：temporal formulae 来自哪里？", "来自结构化需求句子中的条件、触发、响应和时间约束。"),
        q("2025 Summer Q3(b) Data Refinement 小题：Dafny/Event-B example 至少要说明什么 relation？", "说明 concrete state 如何对应 abstract state，以及每个 concrete operation 如何模拟 abstract operation。"),
        q("2023/2024 under-spec 小题：如果需求写“quickly respond”，应怎样改？", "改成具体时间边界，例如 request 后 2 seconds 内 response，才能检查。")
      ],
      "exam-map": [
        q("2025 Summer Q1 把 logic 和 Hoare 放在一起考，说明复习时要连哪两步？", "先把性质写成公式，再用 Hoare/invariant 证明程序满足公式。"),
        q("2025 Summer Q2 把 Ack、loop、BankAccount 放在一起考，说明 Dafny 题覆盖哪三类？", "递归终止、循环 invariant/variant、对象 ghost/class invariant。"),
        q("2025 Summer Q4 把 Spin/NuSMV/runtime/LTL 放一起考，说明 model checking 题至少要会什么？", "工具差异、系统模型、temporal formula、counterexample/runtime verification。")
      ],
      summary: [
        q("2025 Find Hoare 题最后检查哪三项？", "Precondition 使用、loop invariant 三步、variant/termination 如果问 total correctness。"),
        q("2025 Ack Dafny 题最后检查哪两项？", "Decreases clause 是否适合递归结构，以及是否解释 tuple metrics。"),
        q("2025 SAT/CDCL 题最后检查哪一项？", "是否用一个冲突学习例子解释 CDCL，而不是只展开缩写。")
      ],
      "exam-ladder": [
        q("CS603 2025 小题：学完 logic/Hoare 后先练哪题？", "练 2025 Summer Q1：predicate logic、tautology/sat/unsat、Find 方法 Hoare proof。"),
        q("CS603 2025 小题：学完 Dafny 后先练哪题？", "练 2025 Summer Q2：Ack decreases、method M invariant/variant、BankAccount ghost Valid。"),
        q("CS603 2025 小题：学完 model checking 后先练哪题？", "练 2025 Summer Q4：Spin verification、NuSMV vs Spin、state explosion、LTL formulae。")
      ]
    };

    const indexDrills = {
      "exam-system": [
        q("具体复习动作：做 CS608 2025 Climate.determine 前，应先打开哪两页？", "先看 CS608 线性页黑盒/BVA，再看 CS608 Q1 样章 worked BVA。"),
        q("具体复习动作：做 CS615 Sample FinTrack 前，应先补哪两块？", "先补 CS615 线性页的 3-tier/MVC/database，再到题型页 sample-topics 做架构比较。"),
        q("具体复习动作：做 CS605 Sample B CARA clique 前，应先补哪两块？", "先补 CS605 的 certificate/verifier，再补 NP-complete reduction from 3-SAT。")
      ],
      "learning-path": [
        q("从 past paper 角度：CS615 第一轮完成后应能答哪道具体题？", "2025 Summer Q1：给 interns 解释 full-stack、CRUD、SQL/NoSQL，并为 shopping habits 选数据库。"),
        q("从 past paper 角度：CS608 第一轮完成后应能答哪道具体题？", "2025 Summer Q1：Climate.determine input/output partitions 和 BVA tables。"),
        q("从 past paper 角度：CS603 第一轮完成后应能答哪道具体题？", "2025 Summer Q1(d)：用 Hoare logic 验证 Find 方法 partial correctness。")
      ],
      keywords: [
        q("搜 <code>HALT</code> 后应练哪道具体题？", "CS605 Sample A Q3 exception 21 或 Sample B Q5 Java mean property 的 mapping reduction。"),
        q("搜 <code>BVA</code> 后应练哪道具体题？", "CS608 2025 Climate.determine BVA，不包含 error values，并完成 TCI/data/test cases。"),
        q("搜 <code>MVC</code> 后应练哪道具体题？", "CS615 2025 MVC 25-mark essay 或 Sample Rails OrdersController SRP/refactor 题。")
      ]
    };

    if (pageKey === "index") return indexDrills[id] || indexDrills["exam-system"];
    if (pageKey.startsWith("cs615")) return cs615[id] || cs615.foundation;
    if (pageKey.startsWith("cs605")) return cs605[id] || cs605.language;
    if (pageKey.startsWith("cs608")) return cs608[id] || cs608.terms;
    if (pageKey.startsWith("cs603")) return cs603[id] || cs603.properties;

    return indexDrills["exam-system"];
  };

  document.querySelectorAll("main section[id]").forEach((section) => {
    if (section.querySelector(".qa-set")) return;
    const key = `${pageName}#${section.id}`;
    const examQuestions = examFollowups(section);
    const questions =
      examQuestions.length >= 3 ? examQuestions : [...(sectionQuizzes[key] || fallbackQuestions(section)), ...examQuestions];
    if (questions.length < 3) return;

    const set = document.createElement("div");
    set.className = "qa-set";
    set.setAttribute("aria-label", "过关问答");

    const title = document.createElement("p");
    title.className = "qa-title";
    title.textContent = "过关问答：基于 past/sample paper，悬停或点击显示答案";
    set.appendChild(title);

    questions.slice(0, 5).forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "qa-card";

      const button = document.createElement("button");
      button.className = "qa-question";
      button.type = "button";
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = `${index + 1}. ${item.question}`;

      const answer = document.createElement("div");
      answer.className = "qa-answer";
      answer.innerHTML = `<p>${item.answer}</p>`;

      button.addEventListener("click", () => {
        const isOpen = card.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
      });

      card.appendChild(button);
      card.appendChild(answer);
      set.appendChild(card);
    });

    section.appendChild(set);
  });
})();
