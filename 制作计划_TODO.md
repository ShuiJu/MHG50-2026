# 2026 May Exam Prep 制作计划 / TODO

更新时间：2026-05-06 19:21

## 项目目标

- 目标总文件：`2026 May exam prep.pptx`
- 主交付：静态网页复习站，先用于系统学习和真题题型攻克。
- 辅助交付：后续把网页内容压缩整理成 PPT，作为考前临时抱佛脚版本。
- 当前阶段：先制作一个样章给用户过目，确认风格、深度、结构后再批量展开四门课。

## 用户要求

- 以攻克所有已考题型和 sample 题型为主线。
- 内容必须是从零开始的扫盲风格，不只是考点目录。
- 网站不需要花哨，但要用高性价比手法提升可读性。
- 要有明确的线性学习流程。
- 同时支持通过关键词跳转到相关页面或相关小节。
- 制作计划、制作过程、TODO 必须记录在本目录的文本文件中，避免 auto compact 后丢失上下文。

## 当前样章范围

- 课程：CS608 Software Testing
- 样章主题：Q1 黑盒测试核心题型
- 覆盖内容：
  - 穷举测试为什么不可行
  - Boundary Value Analysis (BVA)
  - Decision Table (DT)
  - Test Coverage Items (TCI)
  - Data Values table
  - Test Cases table
  - 历年题型如何套模板

## 网站结构计划

- `exam-prep-site/index.html`：总入口、四门课路线、关键词跳转。
- `exam-prep-site/cs608-q1-sample.html`：当前样章。
- `exam-prep-site/assets/styles.css`：统一样式。
- `exam-prep-site/assets/app.js`：关键词过滤和跳转增强。

## 全部课程长期计划

### CS615

- [ ] 真题/sample 题型矩阵
- [ ] Full-stack / HTTP / CRUD / SQL-NoSQL 扫盲
- [ ] MVC / Rails / Active Record / routes
- [ ] Node.js / Express / callback / chaining / code reading
- [ ] React / componentization
- [ ] Accessibility / SEO / Security
- [ ] Cloud / CI-CD / AI agents sample 题
- [ ] 考前 PPT 压缩版

### CS605

- [ ] 真题/sample 题型矩阵
- [ ] Regular / CFL / FA / PDA 基础
- [ ] Pumping lemma 证明模板
- [ ] Decidable / Turing-recognisable 模板
- [ ] Mapping reduction / HALT 归约模板
- [ ] P / NP / certificate / verifier
- [ ] NP-hard / NP-complete reduction
- [ ] Sample A/B 逐题模板化训练
- [ ] 考前 PPT 压缩版

### CS608

- [ ] 真题/sample 题型矩阵
- [ ] Q1 Exhaustive + BVA + DT 样章
- [ ] Q2 White-box / JaCoCo / SC / BC
- [ ] Q3 In-class context / EP
- [ ] Q4 Random testing / automated random tests
- [ ] 2023-2025 真题逐题拆解
- [ ] 考前 PPT 压缩版

### CS603

- [ ] 真题题型矩阵
- [ ] Predicate / propositional logic
- [ ] Design by Contract / Hoare logic
- [ ] Dafny loops / arrays / recursion / termination
- [ ] Dafny classes / object invariants / ghost
- [ ] Model checking / Kripke / LTL / CTL / Spin / NuSMV
- [ ] FRET / data refinement / SMT / SAT / Z3 / DPLL
- [ ] 考前 PPT 压缩版

## 当前 TODO

- [x] 确认目标文件是 `2026 May exam prep.pptx`。
- [x] 确认先做静态网页主版，PPT 作为后续速查版。
- [x] 建立本制作计划 / TODO 文本文件。
- [x] 抽取 CS608 Q1 样章所需真题结构和 lecture notes 依据。
- [x] 创建静态网页目录和基础样式。
- [x] 完成 CS608 Q1 样章内容。
- [x] 检查链接和关键词跳转。
- [x] 用户审阅样章，提出结构和 note 使用反馈。
- [x] 根据用户反馈调整样章结构和备注形式。
- [x] 用户确认样章方向不错。
- [x] 按用户指定顺序制作：CS615 -> CS605 -> CS608 -> CS603。
- [x] 当前开始 CS615 正式页面。
- [ ] 用户审阅 CS615 页面。
- [x] 根据用户反馈继续细化 CS615。
- [x] 当前开始 CS605。
- [x] 扩展 CS608 完整页面。
- [x] 扩展 CS603 完整页面。
- [ ] 用户审阅 CS605 / CS608 / CS603 页面。
- [x] 为每个科目增加基于教材的线性全课程学习页面。
- [ ] 按 CS615 新深度继续扩写 CS605 / CS608 / CS603 线性页。
- [ ] 制作 `2026 May exam prep.pptx` 考前速查版。

## 2026-05-06 当前推进

- 用户要求：继续按顺序完成后续科目。
- 制作顺序保持：CS615 -> CS605 -> CS608 -> CS603。
- 当前任务：制作 CS605 页面，然后继续 CS608、CS603。
- 继续遵循：
  - 一页内尽量完整学完一门课。
  - 避免“知识的诅咒”。
  - 专业术语第一次出现时解释清楚。
  - 少用打断式 note/warning。
  - 答题模板使用普通可换行文本框。

### 2026-05-06 00:10

- 已按顺序完成后续科目第一版：
  1. `exam-prep-site/cs605.html`
  2. `exam-prep-site/cs608.html`
  3. `exam-prep-site/cs603.html`
- 新增资源：
  - `exam-prep-site/assets/cs605-proof-flow.svg`
- 已更新 `exam-prep-site/index.html`：
  - CS605、CS608、CS603 入口已接上。
  - 关键词跳转已增加 CS605 / CS608 / CS603 相关入口。
- CS605 页面当前覆盖：
  - 语言和符号：alphabet、string、language、complement、encoding。
  - FA / PDA / TM 三种机器。
  - Pumping lemma：not regular / not CFL。
  - Decidable、Turing-recognisable、co-T-r。
  - HALT mapping reductions。
  - P / NP / certificate / verifier。
  - NP-complete 证明结构。
  - 7 道题题型识别和 2025-2026 考法地图。
- CS608 页面当前覆盖：
  - 测试基础词汇。
  - Q1 黑盒：BVA / DT / exhaustive。
  - Q2 白盒：statement coverage、branch coverage、JaCoCo、short-circuit。
  - Q3 class context：static vs instance、accessor、EP。
  - Q4 random testing：data/oracle/completion 三问题、random criteria。
  - 2023-2025 考法地图。
- CS603 页面当前覆盖：
  - 形式化验证基础。
  - Predicate / propositional logic。
  - Hoare logic、partial/total correctness、invariant、variant。
  - Dafny：requires、ensures、invariant、decreases、assert、ghost、class invariant。
  - Model checking：Kripke、LTL、CTL、Spin、NuSMV、runtime verification。
  - SAT/SMT/Z3/DPLL/CDCL/CNF。
  - FRET、Data Refinement、Under-specification。
  - 2023-2025 考法地图。
- 已做全站检查：
  - 所有本地链接和锚点通过。
  - 全站未发现 `<pre>` 长模板框。
  - 全站未发现 `note` / `warning` / `callout-line` 打断式提示。
  - 全站未发现 `本章按`、`先学`、`再拿` 等元叙述残留。

### 2026-05-06 16:40

- 用户新增要求：为每个科目使用本地教材/讲义，再提供一个“线性的全教材一路学到头”的页面。
- 新页面与现有页面的区别：
  - 现有页面：按考试题型组织，便于做题和速查。
  - 新页面：按教材/lecture notes 顺序组织，便于从零开始系统学习整门课。
- 计划新增：
  - `exam-prep-site/cs615-linear.html`
  - `exam-prep-site/cs605-linear.html`
  - `exam-prep-site/cs608-linear.html`
  - `exam-prep-site/cs603-linear.html`
- 写作标准继续保持：
  - 循序渐进。
  - 避免知识的诅咒。
  - 每个新术语第一次出现时解释。
  - 少用打断式提示块。
  - 用普通文本框/表格承载模板和例子。

### 2026-05-06 16:52

- 已新增四个基于教材/讲义顺序的线性学习页：
  - `exam-prep-site/cs615-linear.html`
  - `exam-prep-site/cs605-linear.html`
  - `exam-prep-site/cs608-linear.html`
  - `exam-prep-site/cs603-linear.html`
- 已更新 `exam-prep-site/index.html`：
  - 每门课现在都有 `教材线性页` 和 `题型页` 两个入口。
  - 关键词跳转新增四个线性页入口。
- 四个线性页的定位：
  - CS615：从 Web 三层、数据库、Rails/MVC、Spring/REST、Node/React、Web quality 到 CI/CD/AI Agents。
  - CS605：按 annotated notes 从数学地基、FA/regular、PDA/CFL、TM/decidability、reductions 到 complexity/NP。
  - CS608：按 01-26 讲义从测试基础、EP/BVA/DT、SC/BC、OO/class context、automation 到 random/numerical/AI/process。
  - CS603：按知识依赖从形式化验证基础、logic/Hoare、Dafny、requirements/refinement、model checking 到 SAT/SMT/Z3。
- 已检查：
  - 全站本地链接和锚点通过。
  - 新线性页没有使用 `note` / `warning` / `callout-line`。
  - 新线性页没有 `<pre>` 长模板框。
  - 线性页里的“先学...”是教材顺序说明，和之前被删除的空泛页面流程话术不同。

### 2026-05-06 19:21

- 用户反馈：当前线性页“不够详细”。从当前打开文件判断，优先处理 `exam-prep-site/cs615-linear.html`。
- 已将 CS615 线性页从“路线表”扩写为更完整的教材式长页：
  - 以“一次网页请求”作为全课主线，解释浏览器、服务器、request、response、route、controller、business logic、database、API、JSON、CRUD。
  - 扩写三层架构：presentation / business logic / data access，各自职责、边界和为什么客户端不能直接连数据库。
  - 扩写数据库部分：table、row、column、schema、primary key、foreign key、join、transaction、ACID、NoSQL、document database、ORM、ODM、SQL/NoSQL 选择方法。
  - 扩写 Rails 部分：Ruby 基础、gem、route、controller action、Active Record、MVC request flow、SRP 和胖 controller 重构方向。
  - 扩写 Spring REST 部分：resource、HTTP verbs、stateless、representation、controller/service/repository、dependency injection、forms/security。
  - 扩写 Node/Express/Mongoose 部分：Node runtime、I/O、event loop、异步输出题读法、route/middleware/controller/model、chaining。
  - 扩写 React 部分：component、props、state、hook、SPA、container/presentational、Fetch/Axios、API 错误状态。
  - 扩写 Web Quality：accessibility、SEO、SQL injection、XSS、CSRF、access control。
  - 扩写交付与运维：HTTP 版本、IaaS/PaaS/SaaS、CI/CD pipeline、observability 的 logs/metrics/traces、AI agents 风险和人类审查。
  - 新增更具体的教材阅读顺序和每组材料的自测问题。
- 已检查 `cs615-linear.html`：
  - 本地链接和锚点通过。
  - 未发现 `<pre>`、`note`、`warning`、`callout-line`。
  - 未发现 `本章按`、`再拿`、`强事务`、`ACID 常见` 等不符合当前风格的残留。
- 后续建议：
  - 如果用户认可这个深度，就按同一密度继续扩写 `cs605-linear.html`、`cs608-linear.html`、`cs603-linear.html`。

## 制作记录

### 2026-05-05

- 已扫描目录，发现根目录有 `2026 May exam prep.pptx` 和 `CS608_考点目录.pptx`。
- 已确认当前目标文件为 `2026 May exam prep.pptx`。
- 已确认主交付采用静态网页，PPT 后续作为考前速查版。
- 已建立本日志文件，用于记录计划、制作过程、正在做什么、还有什么没做。
- 已抽取 CS608 Q1 相关材料：
  - lecture notes：`06-bva.pdf`、`07-bva-more-detail.pdf`、`08-dt.pdf`、`09-dt-more-detail.pdf`
  - exam papers：`2023-CS608-Summer.pdf`、`2024-CS608-Summer.pdf`、`2025-CS608-Summer.pdf`、`2025-CS608-Autumn_0.pdf`
- 已建立静态网站目录：
  - `exam-prep-site/index.html`
  - `exam-prep-site/cs608-q1-sample.html`
  - `exam-prep-site/assets/styles.css`
  - `exam-prep-site/assets/app.js`
  - `exam-prep-site/assets/cs608-q1-flow.svg`
- 已完成 CS608 Q1 样章，内容包括：
  - 线性学习路线
  - 历年 Q1 题型地图
  - exhaustive testing 5 分答题模板
  - BVA 从零解释
  - 2025 Summer `Climate.determine()` 完整 BVA worked example
  - DT 从零解释与 2023 `boilerSetting()` 迷你例
  - Q1 答题检查清单
- 已做本地检查：
  - 所有站点文件存在。
  - `index.html` 和 `cs608-q1-sample.html` 的本地链接与锚点检查通过。
  - 关键词过滤脚本已加入。

## 当前正在等待

- 等待用户审阅样章，确认：
  - 是否足够“从零扫盲”
  - worked example 是否需要更细
  - 中文/英文术语比例是否合适
  - 页面视觉密度是否舒服
  - 是否继续按此结构扩展其他章节

## 用户反馈记录

### 2026-05-05

- 用户认为当前样章结构不好，应该改为：
  1. 先学知识点，例如 BVA、DT 是什么，怎么理解，要点是什么。
  2. 再给出判断题目类型的方法。
  3. 然后给出历年 Q1 题型地图。
  4. 再选择经典题目进行讲解。
  5. 最后总结。
- 需要按这个结构重排 `exam-prep-site/cs608-q1-sample.html`。
- 用户补充：少用 `note` 类型的备注，因为会打断注意力和阅读流畅度。后续页面应尽量把提示融入正文、表格或普通内容块，只保留少量必要 warning。
- 用户继续反馈：
  - 页面开头不应写“本章按先理解知识点...”这种所有页面都会采用的流程说明，属于无意义元叙述。
  - 页面主标题应直接指向考点，例如“Q1 关于 BVA/DT 和黑盒测试”，不要写“先学...再拿真题练流程”。
  - 小节标题也应直击主题，例如“用系统方法挑出少量有代表性的测试”，不要写“先学知识点：Q1 到底在考什么”这种笼统标题。
  - `5 分答案模板` 的代码框需要横向滚动，不合理，应改为普通文本框。

## 样章调整记录

### 2026-05-05 22:48

- 已按用户反馈重排 `exam-prep-site/cs608-q1-sample.html`：
  1. 先讲知识点：Exhaustive Testing、BVA、Decision Table、TCI/Data Values/Test Cases。
  2. 再讲如何判断题目类型。
  3. 再列历年 Q1 题型地图。
  4. 再讲经典题：穷举测试、2025 Summer BVA、2023 Summer DT。
  5. 最后给 Q1 答题检查清单。
- 已减少 `note` 类型备注：
  - 将 TCI / Data Values / Test Cases 的提示块改为连续表格。
  - 将“一句话判断”从 warning 提示块改为正文段落。
  - 将 worked example 的 review 句从 note 提示块改为普通步骤。
  - 删除样章页中的 `class="note"`、`class="warning"`、`callout-line` 使用。
- 已重新检查：
  - 本地链接和锚点全部通过。
  - 样章页标题顺序符合“知识点 -> 题型判断 -> 历年题型 -> 经典题 -> 总结”。

### 2026-05-05 22:53

- 已继续完善 `exam-prep-site/cs608-q1-sample.html`：
  - 页面标题改为 `Q1 关于 BVA / DT 和黑盒测试`。
  - 删除开头关于“本章按...”的无意义流程说明，改为直接说明 Q1 的考点：穷举不可行、BVA 边界值、DT 条件组合、TCI 来源不同。
  - 第一节标题改为 `1. 用系统方法挑出少量有代表性的测试`。
  - 后续一级标题改为更贴近主题的表达：
    - `2. 根据题面关键词区分 BVA 和 Decision Table`
    - `3. 2023-2025 年 Q1 考法变化`
    - `4. 从经典题拆解完整答题表格`
    - `5. Q1 答案必须包含的东西`
  - 将 `5 分答案模板` 从需要横向滚动的代码块改为普通可换行文本框。
  - 新增 `.answer-box` 样式，后续所有答案模板优先使用这种不横向滚动的格式。
- 已重新检查：
  - 本地链接和锚点全部通过。
  - 页面中不再残留 `先学`、`再拿`、`本章按`、`到底在考什么`、`流程` 等空泛表述。

## 正式制作顺序

1. CS615
2. CS605
3. CS608
4. CS603

## CS615 当前制作计划

- [x] 抽取 2023/2024/2025 Summer 真题与 `CS615Sample.pdf` 题型。
- [x] 对照本地教材：
  - `ArchitecturalPatterns.pdf`
  - `DB_WS_C.pdf`
  - `Intro to Ruby on Rails.pdf`
  - `Rails Routes and Active Record.pdf`
  - `Introduction to Ruby.pdf`
  - `REST Architecture with Spring .pdf`
  - `Introduction to Spring.pdf`
  - `Data and Spring.pdf`
  - `Forms and Security.pdf`
  - `Security.pdf`
  - `WSFE.pdf`
  - `CICDOBS.pdf`
  - `VibeCoding.pdf`
- [ ] 制作 `exam-prep-site/cs615.html`。
- [x] 制作 `exam-prep-site/cs615.html`。
- [x] 更新 `exam-prep-site/index.html` 的 CS615 入口和关键词。
- [x] 检查链接、锚点、标题结构和模板框可读性。
- [ ] 用户审阅 CS615 页面。
- [ ] 根据反馈继续细化 CS615。

## CS615 制作记录

### 2026-05-05 23:07

- 用户确认制作顺序：`CS615 -> CS605 -> CS608 -> CS603`，并要求先从 CS615 开始，注意使用本地教材。
- 已抽取 CS615 材料：
  - 真题：`2023-CS615_Summer.pdf`、`2024-CS615-Summer.pdf`、`2025-CS615-Summer.pdf`
  - Sample：`CS615Sample.pdf`
  - 教材/课件：`ArchitecturalPatterns.pdf`、`DB_WS_C.pdf`、`Intro to Ruby on Rails.pdf`、`Rails Routes and Active Record.pdf`、`Introduction to Ruby.pdf`、`REST Architecture with Spring .pdf`、`Introduction to Spring.pdf`、`Data and Spring.pdf`、`Forms and Security.pdf`、`Security.pdf`、`WSFE.pdf`、`CICDOBS.pdf`、`VibeCoding.pdf`、`Design Patterns.pdf`
- 已创建：
  - `exam-prep-site/cs615.html`
  - `exam-prep-site/assets/cs615-3tier.svg`
- 已更新：
  - `exam-prep-site/index.html`：CS615 入口、CS615 关键词跳转、当前状态。
- CS615 页面当前覆盖：
  1. 三层架构和 Full-Stack 基本分工。
  2. CRUD 和 HTTP 动作。
  3. SQL / NoSQL 选择，含 shopping habits 经典场景答案。
  4. MVC，含 Rails/Spring/Express 对应和 25 分答案骨架。
  5. Sample Rails controller 题：MVC / SRP / refactor / unit test。
  6. Node.js、callback、event loop 输出题、chaining、Express routes/controllers/models。
  7. React vs vanilla、componentization。
  8. Accessibility、SEO、SQL Injection、XSS。
  9. HTTP 1.0/1.1/2/3 evolution。
  10. Cloud model 选择，含 PaaS 推荐答案。
  11. Sample 新题型：microservices、AI Agents、CI/CD、Observability。
  12. 题面关键词识别答案结构。
  13. 2023-2025 和 Sample 考法地图。
  14. 高频 25 分题写法和 CS615 答案检查清单。
- 已检查：
  - 所有本地链接和锚点通过。
  - CS615 标题编号连续。
  - CS615 页面没有使用 `note` / `warning` / `callout-line`。
  - CS615 页面没有 `<pre>` 模板框，避免长文本横向滚动。

### 2026-05-05 后续反馈

- 用户认为 CS615 页面总体架构和内容不错，但从学习角度仍不够扫盲。
- 问题示例：类似“强事务支持，ACID 常见”这类专业表述入门门槛较高。
- 新要求：尽量让学习者在一个页面上完整学完这一门，而不是只看懂题型索引。
- 用户补充：要避免“知识的诅咒”。写作标准改为：第一次见这个词也能懂；每个新术语第一次出现要解释；不要用一个专业词解释另一个专业词。
- 后续调整方向：
  - 增加基础术语层。
  - 对专业词汇做中文直解释义。
  - 避免默认读者已懂 ACID、事务、一致性、schema、API、runtime、event loop、SPA、observability 等术语。

### 2026-05-05 23:20

- 已按“避免知识的诅咒”原则继续改写 `exam-prep-site/cs615.html`：
  - 新增 `1. Web 应用的基础词汇`，解释 Client/Browser、Frontend、Backend、Database、Request/Response、API、JSON、Business Logic、Framework。
  - 新增常见英文缩写速查：HTTP、API、URL、JSON、MVC、CRUD、SQL、NoSQL、SPA、CI/CD。
  - 修改页面开头，避免直接堆术语，改为“一个网站怎样被设计、实现、保护、发布和维护”。
  - 将数据库章节改为从“数据形状和出错代价”入手。
  - 拆解数据库术语：schema、外键/关系、transaction、consistency、join、horizontal scaling。
  - 单独解释 ACID：Atomicity、Consistency、Isolation、Durability，并用收据例子说明。
  - 将 SQL/NoSQL 表中“强事务支持，ACID 常见”等高门槛表达改成具体场景解释。
  - MVC 增加点餐类比，解释 Model/View/Controller 的职责边界。
  - Node.js 增加 runtime、I/O、CPU 密集型、event loop 的扫盲解释。
  - React 增加 library、component、props、state、SPA 的解释。
  - Accessibility 增加辅助技术和语义化 HTML 解释。
  - Security 增加 injection、SQL、script 的基础解释。
  - Cloud 增加 cloud computing、IaaS/PaaS/SaaS 和 runtime 的解释。
  - Sample 章节解释 monolith、microservices、scalability、performance、resilience、development velocity、AI agent、SDLC、CI/CD、observability/logs/metrics/traces。
  - 侧边目录和关键词增加 `基础词汇`。
- 已重新检查：
  - 所有本地链接和锚点通过。
  - CS615 标题编号连续。
  - 未发现 `强事务`、`ACID 常见`、`<pre>`、`note/warning/callout-line` 等不符合当前风格的问题。
