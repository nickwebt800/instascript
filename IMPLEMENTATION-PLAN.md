# InstaScript 全站视觉升级实施文档

状态：设计与实施计划，尚未修改生产页面或功能脚本

目标：在保留现有搜索入口、URL、内容资产和工具功能的前提下，将全站升级到首页概念预览所示的视觉语言，并通过可验证的发布流程降低 SEO、功能和性能风险。

## 1. 已确认的边界

本项目属于 redesign-preserve。现有站点已经拥有稳定的页面集合、内部链接、站点地图和多套工具逻辑，因此第一阶段不改变信息架构。

必须保留：

- 所有公开 URL、页面 slug、现有 301/Worker 路由行为和 `sitemap.xml` 中的地址。
- 页面可索引的正文、FAQ、测速数据、工具索引、Recommended、隐私说明和页脚链接。
- 每个工具页面现有的表单字段、按钮文案语义、分析入口以及 JavaScript 依赖的 DOM `id`。
- Smol Launch 图片链接：`https://smollaunch.com` 与 `/badges/featured.svg`。
- 现有 Cloudflare Worker、API、MCP 和 agent 相关端点。视觉升级不触碰这些服务契约。

可以调整：

- 布局、字体、颜色、间距、边框、阴影、响应式断点和交互状态。
- 内容的视觉分组、标题层级和阅读顺序。SEO 文本本身只做必要的清晰度和标点整理。
- 共享页头、工具容器、内容区、FAQ、工具索引和页脚的表现方式。

## 2. 当前站点审计

### 技术形态

- 多页面静态 HTML，主要样式集中在 `style.css`。
- 共享页脚由 `footer.js` 注入；部分页面已经有静态相关链接，页面之间存在不完全一致的页脚结构。
- Instagram、TikTok、Facebook、视频和音频转录页面共用 `app.js` 的 Whisper 浏览器转录流程。
- YouTube 转录和下载使用 `js/youtube-transcript.js`、`js/youtube-transcript-download.js` 以及 Worker/API 代理。
- 字幕工具使用独立脚本：`subtitle-editor.js`、`txt-to-srt.js`、`vtt-to-srt.js`、`srt-to-text.js`、`ass-to-srt.js`。
- `functions/_middleware.js` 负责站点 API、路由、服务发现和部分资源代理。不能因视觉改版改变其请求路径。

### 页面家族

| 家族 | 页面 | 功能契约 |
|---|---|---|
| 首页 | `/` | 文件上传、公开 Instagram URL、浏览器转录、TXT/SRT 导出 |
| 浏览器转录 | `/video-to-text`、`/audio-to-text`、`/tiktok-transcript`、`/facebook-video-transcript` | `app.js` 的上传、处理、进度、错误、语言检测和导出状态 |
| Instagram 内容页 | `/instagram-transcript-generator`、`/instagram-reels-transcript`、`/instagram-video-to-text`、`/reels-to-text`、`/instagram-caption-extractor` | SEO 内容页及到工具的清晰入口；不得把正文改成只有 CTA |
| YouTube 工具 | `/youtube-transcript`、`/youtube-shorts-transcript`、`/youtube-transcript-download` | URL 表单、字幕轨道选择、结果查看、复制、TXT/SRT 下载、失败状态 |
| 字幕工具 | `/subtitle-editor`、`/txt-to-srt`、`/vtt-to-srt`、`/ass-to-srt`、`/srt-to-text` | 本地文件/文本输入、编辑、转换、清空、复制、下载和状态提示 |
| 教程与说明 | `/how-to-get-a-transcript-of-a-youtube-video`、`/about`、`/privacy`、`/contact` | 可读内容、导航、法律/联系信息和 SEO 内部链接 |

### 现有 SEO 基线与风险

- `sitemap.xml` 已覆盖主要工具、说明页和 `/ai/`，发布后必须继续覆盖所有可索引页面。
- 许多工具页已有 canonical 和 JSON-LD，但首页、About、Privacy、Contact 等页面需要统一检查并补齐页面级 canonical、Open Graph 和 Twitter 元数据。
- 部分页脚依赖 `footer.js` 在运行时生成。核心内部链接应在初始 HTML 中可见，脚本只负责增强和统一，避免依赖 JavaScript 才能发现导航。
- 页面标题已按关键词区分，改版不得让多个页面共享同一 title、H1 或 description。
- 当前正文存在 `&mdash;` 等长破折号写法。视觉改版时统一为句号、逗号或普通连字符，避免文案语气和排版不一致。
- 当前页面混合了工具页、回答优先内容页和字幕编辑器。不能用一套首页卡片强行包裹所有页面，应采用同一 token 系统配合不同页面骨架。

## 3. 目标视觉系统

设计方向：可信、轻量、浏览器优先的创作者工具。首页概念图是方向参考，不是要求每个页面复制同一布局。

### 视觉 token

```css
--canvas: #f6f7f8;
--surface: #ffffff;
--ink: #172033;
--muted: #667085;
--line: #e2e7ed;
--accent: #d9533f;
--accent-deep: #b94332;
--accent-soft: #fff0ec;
--success: #18794e;
--radius-card: 14px;
--radius-control: 9px;
```

实现规则：

- 全站只使用珊瑚红作为主强调色，成功、错误、警告保留各自语义色。
- 卡片、输入框、按钮使用一致的圆角体系；避免一页同时出现锐角、圆角和胶囊式容器。
- 页面级背景保持一致，不在滚动过程中随机切换为完全不同的主题。
- 首屏以左对齐内容加工具区域为主；移动端严格单列。
- 阴影只用于工具容器、结果面板和需要层级的元素；内容正文优先使用留白和稀疏分隔线。
- 动画只使用 `transform` 和 `opacity`，尊重 `prefers-reduced-motion`。
- 不使用 AI 紫色渐变、装饰性网格线、无意义状态圆点或假的产品截图。

### 文字系统

- 首屏 H1 保持单个、描述性、可读，首页建议使用 `Instagram videos to text, in your browser.` 的语义方向。
- 工具页 H1 继续对应搜索意图，例如 `YouTube Transcript Generator`、`Subtitle Editor`。
- 正文控制在易读行宽；FAQ、测速表和工具索引保持真实信息，不为了“简洁”删除。
- 页面中只保留一个 H1。H2 表示主要内容区，H3 表示 FAQ 或工具组项目。
- 所有可见文案在发布前做复制审校：语法、事实、文件格式、语言支持和隐私承诺必须与功能一致。

## 4. 页面实施方案

### 4.1 共享壳层

在 `style.css` 中建立共享 token 和组件样式，并逐步替换现有局部规则：

- `site-header`：品牌标识、页面上下文和桌面/移动导航。
- `page-shell`：最大宽度、水平边距、移动端内边距和垂直节奏。
- `tool-card`：工具标题、状态徽章、tab、表单和结果状态的统一容器。
- `content-section`：正文、步骤、测速、FAQ 和工具索引的统一章节样式。
- `site-footer`：三组链接、隐私说明、推荐内容和 Smol Launch 徽章。

如果当前类名已经被多个脚本或页面使用，优先保留类名并重写样式；新增类名只用于页面级布局。不要通过删除旧类名来“清理” DOM。

### 4.2 首页 `/`

首屏顺序：品牌导航、描述性 H1、简短副标题、隐私提示、工具卡片。

工具卡必须继续提供：

- `#tab-upload` 和 `#tab-url` 两个 tab。
- `#panel-upload`、`#dropZone`、`#fileInput`、`#fileInfo`、`#fileName`、`#fileSize`、`#transcribeBtn`。
- `#panel-url`、`#urlInput`、`#urlBtn`、`#urlNote`。
- `#processing`、`#processingText`、`#progressBar`、`#progressFill`、`#errorBox`。
- `#transcriptSection`、`#transcriptOutput`、`#copyBtn`、`#downloadTxtBtn`、`#downloadSrtBtn`。

首屏之后按以下顺序保留所有现有内容：

1. Browser-first / No account / Ready to export 信任说明。
2. How long does a transcript take? 及真实测速表。
3. How an Instagram transcript generator works。
4. FAQ。
5. Tools by task。
6. Recommended 及 affiliate disclosure。
7. 完整页脚链接和 Smol Launch 图片链接。

首页的视觉优化重点是层级、留白和折叠密度，不是删掉可索引内容。

### 4.3 浏览器转录页

应用于 `/video-to-text`、`/audio-to-text`、`/tiktok-transcript`、`/facebook-video-transcript`：

- 保留现有 `app.js` DOM 契约和语言检测行为。
- 工具卡将输入、隐私说明、处理进度、错误和 transcript result 分成明确状态。
- 上传后文件名和大小必须可见；加载模型和转录进度必须可读。
- 结果区保持 Copy、TXT、SRT 操作，移动端允许按钮换行但不截断。
- 页面下方的定义、三步说明、测量数据、FAQ 和 Recommended 继续保留。

### 4.4 Instagram SEO 内容页

应用于 `/instagram-transcript-generator`、`/instagram-reels-transcript`、`/instagram-video-to-text`、`/reels-to-text`、`/instagram-caption-extractor`：

- 保留页面特定 H1、正文、FAQ、相关链接和 CTA 目的。
- 工具入口采用统一 `tool-card`，但页面首段继续先回答搜索意图。
- 不把五个页面合并成一个模板化页面；每页保留不同的关键词解释和使用边界。
- 处理内部链接锚文本重复和空泛的问题，锚文本要描述目标页面实际功能。

### 4.5 YouTube 工具页

应用于 `/youtube-transcript`、`/youtube-shorts-transcript`、`/youtube-transcript-download`：

- 继续使用页面自己的脚本和 API 路径。
- 表单提交、字幕语言、时间戳/纯文本切换、复制、TXT/SRT 下载以及失败说明全部可见。
- 统一结果区视觉，但不改变字幕来源边界：读取现有 caption track 与浏览器音频转录是两种不同能力。
- 保留已有 JSON-LD，并在改版后验证 JSON 内容与页面正文一致。

### 4.6 字幕工具页

应用于 `/subtitle-editor`、`/txt-to-srt`、`/vtt-to-srt`、`/ass-to-srt`、`/srt-to-text`：

- 统一编辑器工具栏、文件按钮、状态消息、结果区和导出操作。
- 保留 textarea、file input、清空、转换、复制、下载以及逐行编辑等现有行为。
- 长表格使用横向滚动或明确的移动端列布局，不让页面产生不可见的内容溢出。
- 对 ASS/SSA 样式丢失、VTT/SRT 方向、时间偏移等事实保持原有说明，视觉升级不改变转换语义。

### 4.7 说明、法律和联系页

应用于教程、About、Privacy、Contact：

- 使用同一页头、正文宽度和页脚，不套用转录工具的大卡片。
- 保留法律文本、联系信息、affiliate disclosure 和所有相关链接。
- 目录、代码、表格或长文段使用适合阅读的内容宽度，不强行做营销型首屏。

## 5. SEO 实施要求

### 页面级元数据

每个可索引 HTML 页面必须有：

- 唯一 `<title>`，对应一个明确搜索意图。
- 唯一 `<meta name="description">`，描述实际功能，不堆叠关键词。
- 一个稳定的 `<link rel="canonical">`，使用规范 HTTPS URL。
- `og:title`、`og:description`、`og:url`、`og:type`，必要时补 `og:image`。
- 可选但一致的 Twitter 卡片元数据。
- 一个 H1，且 H1 与 title/正文意图一致。

### 结构化数据

- 工具页使用与页面事实一致的 `WebApplication` 或 `SoftwareApplication` 数据。
- FAQ 仅在页面确实展示问答时使用 `FAQPage`，内容必须逐字匹配可见答案。
- 教程页使用 `Article` 或 `HowTo`，步骤必须与页面可见步骤一致。
- 站点级 `WebSite`/`Organization` 数据只放在适合的页面，避免每页复制不相关字段。
- 结构化数据发布前通过 Rich Results Test 和 Schema Validator 检查。

### 内部链接和索引

- 页脚核心链接直接出现在初始 HTML；`footer.js` 作为统一增强层使用。
- 保留所有 sitemap URL、页面 slug 和现有相关链接。
- 检查 canonical、sitemap、robots、Worker 路由、404 和 trailing slash 行为的一致性。
- 新增或删除页面必须同步更新 sitemap、页脚分组和相关内容链接。
- 不为同一搜索意图复制多个几乎相同的页面；现有页面先保留，后续通过 Search Console 数据决定合并策略。

### 内容质量

- 保留当前真实测速数据，并明确测量环境、限制和推断范围。
- 不虚构精确性能数字、语言覆盖或隐私承诺。
- 文件格式、最大大小、字幕来源和浏览器处理范围必须与脚本行为一致。
- affiliate 内容保留清晰 disclosure，不将推荐链接伪装成产品功能。

## 6. 功能正确性与无障碍标准

每个页面发布前必须通过对应清单：

- Tab 使用真实 `role="tablist"`、`role="tab"`、`role="tabpanel"`，`aria-selected`、`aria-controls` 和可键盘操作状态同步。
- 所有表单控件有可访问名称；错误消息通过 `role="alert"` 或 `aria-live` 告知辅助技术。
- 键盘可以完成上传、URL 提交、转换、复制、下载、清空和编辑流程。
- focus 状态清晰，正文与控件颜色通过 WCAG AA 对比度检查。
- `prefers-reduced-motion` 下禁用自动动画；无动画时布局仍完整。
- 文件过大、格式不支持、空输入、无字幕、网络失败、模型加载失败和剪贴板不可用都有可理解的状态。
- 移动端不依赖 hover；按钮、输入框和可点击区域满足触控尺寸。
- 结果区域中的时间戳、纯文本和字幕下载在宽屏与窄屏都可读。

## 7. 性能和安全边界

- 首屏 CSS 只加载必要规则，避免引入新的大型 UI 框架。
- 图片使用明确宽高和合适的压缩格式；Smol Launch 徽章保持 lazy loading，避免影响 LCP。
- 不把转录模型、YouTube 解析库或字幕编辑逻辑提前加载到不需要它们的页面。
- 动画只改 `transform`/`opacity`；不使用滚动事件驱动 React 重渲染。
- 保留现有 CSP、Worker、API、CORS 和第三方资源完整性策略。
- 不在改版过程中改变文件处理位置、跨域请求目标或隐私声明。

## 8. 分阶段实施

### Phase 0：基线与测试夹具

- 记录当前每个 URL 的 HTTP 状态、title、description、canonical、H1、JSON-LD、截图和 Lighthouse 基线。
- 建立页面家族清单和 DOM 契约清单。
- 用本地静态服务器验证所有路由、相对资源和 Worker fallback。

### Phase 1：共享样式与首页

- 只改 `style.css` 和首页结构中必要的视觉容器。
- 先把首页工具区接回真实 `app.js`，验证上传、URL、处理、错误和导出。
- 保留首页全部 SEO 区块、工具索引、Recommended、页脚和 Smol Launch。

### Phase 2：浏览器转录页

- 将共享工具卡样式应用到视频、音频、TikTok、Facebook 页面。
- 逐页验证现有 DOM `id`、脚本加载和状态流程。

### Phase 3：YouTube 页面

- 统一表单、结果和操作区的视觉表现。
- 对字幕语言、caption track、失败边界、JSON-LD 和 API 请求做回归测试。

### Phase 4：字幕工具和内容页

- 统一编辑器和转换器样式。
- 最后处理教程、About、Privacy、Contact，避免法律和长文内容被视觉重构误伤。

### Phase 5：SEO、性能和发布

- 完成 metadata、canonical、OG、JSON-LD、sitemap、页脚链接和 404 检查。
- 运行 Lighthouse、移动端布局检查、键盘/读屏检查和真实工具流程测试。
- 先发布小范围可回滚版本，观察 Search Console、错误日志、Worker 指标和功能反馈，再清理旧的未使用样式。

## 9. 验收矩阵

### 功能

- 首页上传文件、拖拽文件、公开 Instagram URL、英文语言拒绝、进度、错误、复制、TXT、SRT 全部可用。
- 视频/音频/TikTok/Facebook 页面与首页共享流程一致。
- YouTube 页面能够提交 URL、选择可用字幕轨道、显示结果并导出。
- 字幕工具能够打开/粘贴、转换、编辑、清空、复制和下载。
- 所有页面页脚、相关链接、推荐内容和法律链接可访问。

### SEO

- 每个索引页面都有唯一 title、description、canonical 和 H1。
- 页面正文、FAQ、JSON-LD 和 sitemap 互相一致。
- 初始 HTML 中能发现主要内部链接。
- 无意中的 noindex、canonical 指向错误、死链、重复 title 或错误 trailing slash。

### 视觉与体验

- 桌面 1440px、平板 768px、移动 390px 截图通过。
- Tab、输入、按钮、文件状态、处理中、错误和结果状态没有重叠或溢出。
- 深浅背景、文本、按钮和焦点环达到可读对比度。
- reduced motion、键盘操作和窄屏触控流程通过。

### 性能

- LCP、CLS、INP 没有因新字体、图片、动画或首屏脚本明显退化。
- 非当前页面所需的脚本不会被全站加载。
- Lighthouse 的 SEO、Accessibility、Best Practices 分数没有回归。

## 10. 回滚策略

- 每个页面家族独立提交，保持小范围变更和可逆发布。
- 不在一次提交中同时改 URL、正文、脚本契约和 Worker 路由。
- 保留旧 CSS 规则直到对应页面通过功能和视觉验收，再清理无引用规则。
- 若出现索引或功能回归，先恢复页面模板/样式引用，保留已验证的 metadata 和内容改动。

## 11. 本阶段交付与下一阶段入口

本阶段只产出实施文档和现有页面审计，不修改生产页面或功能脚本。首页概念预览保存在 `design-preview/instascript-homepage-v1.html`，用于确认视觉方向与 DOM 契约。

开始编码前的唯一必要确认是：接受本文件中的“保留 URL、内容、功能 DOM 契约和页脚资产”的实施边界。确认后按 Phase 0 和 Phase 1 开始，先完成首页真实功能接入和回归，再扩展到其余页面家族。
