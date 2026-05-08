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
    const title = section.querySelector("h2")?.textContent.trim() || "本节";
    const id = section.id;
    const isLinear = pageName.includes("-linear");
    const pageKey = pageName.replace(".html", "");
    const label = title.replace(/^\d+\.\s*/, "").replace(/^0\.\s*/, "");

    if (pageKey.startsWith("cs615")) {
      return [
        q(`考试追问：题面如果考 ${label}，第一句应该先写什么？`, "先给一句可评分定义，再立刻放回 Web 场景，例如 request flow、3-tier、MVC、API、database 或 deployment，不要只背术语。"),
        q(`考试追问：这一节最容易变成哪类 CS615 题？`, "通常是 explain、compare 或 recommend 题。答案要有 definition、example、trade-off 和 recommendation，尤其要落回题目给的 business scenario。"),
        q(`考试追问：本节答案最不能漏哪个工程判断？`, "不能漏职责边界和取舍：谁负责什么，为什么这样分层或选择，以及代价是什么。")
      ];
    }

    if (pageKey.startsWith("cs605")) {
      return [
        q(`考试追问：题面如果落在 ${label}，先判断哪种证明工具？`, "先看它是字符串结构、机器行为还是图/集合复杂度题；再选 pumping lemma、decider/recogniser、HALT reduction、in NP 或 NP-complete proof。"),
        q(`考试追问：这节写成证明时必须出现什么硬结构？`, "必须有假设、构造或选择对象、关键限制、推出矛盾或 iff 正确性，最后明确 conclusion。"),
        q(`考试追问：最常见扣分点是什么？`, "只写直觉不写形式理由。例如 pumping 不覆盖所有切法、decidable 不说明 halt、reduction 不写 iff、NP 不写 certificate 和 polynomial time。")
      ];
    }

    if (pageKey.startsWith("cs608")) {
      return [
        q(`考试追问：题面如果考 ${label}，要先交付什么表格或测试产物？`, "先判断是 TCI/data/test case 表、additional tests、class context test sequence，还是 random testing strategy；CS608 不能只写概念解释。"),
        q(`考试追问：这一节的 expected result 或 oracle 从哪里来？`, "从 specification、coverage target、代码路径或测试 oracle 来，不能从 actual output 倒推。"),
        q(`考试追问：最容易漏掉的评分点是什么？`, "漏 coverage explanation：要说明测试为什么代表某个分区、边界、rule、statement、branch、对象状态或随机测试准则。")
      ];
    }

    if (pageKey.startsWith("cs603")) {
      return [
        q(`考试追问：题面如果考 ${label}，先把什么形式化？`, "先把自然语言要求改成 property、pre/postcondition、invariant、temporal formula 或 SAT/SMT constraint。"),
        q(`考试追问：这一节对应的交卷证据是什么？`, "可能是 Hoare proof、Dafny annotations、LTL/CTL formula、counterexample explanation、Z3 sat/unsat/model，必须写出可检查结构。"),
        q(`考试追问：最常见扣分点是什么？`, "只写工具名不写证明义务。例如 invariant 不证明建立/保持/退出，Dafny 不写 decreases，model checking 不解释 state/path/formula。")
      ];
    }

    if (pageKey === "index") {
      return [
        q("考试追问：首页路线怎样转成每天复习动作？", "每天选一门课，先读线性页一个 section，再做对应题型页小节，最后用 QA 追问检查能不能写成考场答案。"),
        q("考试追问：关键词搜索什么时候用最有效？", "做题卡住具体术语时使用，例如 HALT、BVA、MVC、Dafny；搜完要回到题型页确认答案结构。"),
        q("考试追问：怎么判断自己不是只看懂网页？", "遮住答案后能说出题面关键词、答题产物和常见扣分点，才算能上考场。")
      ];
    }

    return [
      q(`考试追问：${label} 会怎样出现在试卷里？`, `它通常会变成定义解释、比较判断、证明步骤、测试表格或工具分析题；先判断题型再写答案。`),
      q(`考试追问：${label} 的答案必须有哪三件事？`, "至少要有定义、题目场景连接、可评分产物，例如公式、表格、流程、证明、trade-off 或 recommendation。"),
      q(`考试追问：复习 ${label} 时怎么模拟考场？`, "用 60 秒写出开头定义，再用 3 个 bullet 写核心步骤，最后补一个常见扣分点。")
    ];
  };

  document.querySelectorAll("main section[id]").forEach((section) => {
    if (section.querySelector(".qa-set")) return;
    const key = `${pageName}#${section.id}`;
    const questions = [...(sectionQuizzes[key] || fallbackQuestions(section)), ...examFollowups(section)];
    if (questions.length < 3) return;

    const set = document.createElement("div");
    set.className = "qa-set";
    set.setAttribute("aria-label", "过关问答");

    const title = document.createElement("p");
    title.className = "qa-title";
    title.textContent = "过关问答：鼠标悬停或点击题目显示答案";
    set.appendChild(title);

    questions.slice(0, 8).forEach((item, index) => {
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
