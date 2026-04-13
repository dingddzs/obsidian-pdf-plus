/**
 * PDF++ Internationalization (i18n) System
 *
 * Translation lookup order:
 *   1. Current locale JSON (e.g. zh)
 *   2. English JSON (fallback)
 *   3. The key itself (last resort)
 */

let currentLocale = 'zh';

/** Detect Obsidian interface language */
function detectLocale(): string {
    try {
        // @ts-ignore
        const lang = window.localStorage.getItem('language');
        if (lang === 'zh' || lang === 'ja') return lang;
        // @ts-ignore
        const lang2 = window.localStorage.getItem('app-settings:language');
        if (lang2 === 'zh' || lang2 === 'ja') return lang2;
    } catch (e) { }

    // Fallback: check browser/System language
    try {
        const navLang = navigator.language || navigator.userLanguage || '';
        if (navLang.startsWith('zh')) return 'zh';
        if (navLang.startsWith('ja')) return 'ja';
    } catch (e) { }

    return 'en';
}

/** Initialize the i18n system. Call this from the plugin's onload(). */
export function initI18n(): void {
    currentLocale = detectLocale();
}

/** Get the current locale code */
export function getLocale(): string {
    return currentLocale;
}

/** Set the locale manually (e.g., from plugin settings) */
export function setLocale(locale: string): void {
    currentLocale = locale;
}

type TranslationMap = Record<string, string>;

const translations: Record<string, TranslationMap> = {
    en: {
        // Display text formats
        "display-text-format.title-page": "Title & page",
        "display-text-format.page": "Page",
        "display-text-format.text": "Text",
        "display-text-format.emoji": "Emoji",
        "display-text-format.none": "None",

        // Copy formats
        "copy-format.quote": "Quote",
        "copy-format.link": "Link",
        "copy-format.embed": "Embed",
        "copy-format.callout": "Callout",
        "copy-format.quote-in-callout": "Quote in callout",

        // Highlight style
        "setting.highlight-style.highlight": "Highlight",
        "setting.highlight-style.underline": "Underline",

        // Pane types
        "setting.pane-type.current-tab": "Current tab",
        "setting.pane-type.new-tab": "New tab",
        "setting.pane-type.split-right": "Split right",
        "setting.pane-type.split-left": "Split left",
        "setting.pane-type.split-down": "Split down",
        "setting.pane-type.split-up": "Split up",
        "setting.pane-type.new-window": "New window",
        "setting.pane-type.right-sidebar": "Right sidebar",
        "setting.pane-type.left-sidebar": "Left sidebar",

        // Hover highlight actions
        "setting.hover-highlight-action.open-backlink": "Open backlink",
        "setting.hover-highlight-action.popover-preview": "Popover preview of backlink",

        // Citation hover actions
        "setting.action-on-citation.same-as-other": "Same as other internal links",
        "setting.action-on-citation.pdf-plus-bib": "PDF++'s custom bibliography popover",
        "setting.action-on-citation.google-scholar": "Google Scholar popover",

        // Mobile copy actions
        "setting.mobile-copy-action.copy-text": "Copy text",
        "setting.mobile-copy-action.obsidian-default": "Obsidian default (copy as quote)",
        "setting.mobile-copy-action.pdf-plus-command": "Run PDF++'s copy command",

        // Page label update methods
        "setting.page-label-update-method.keep": "Keep labels unchanged",
        "setting.page-label-update-method.update": "Update",

        // New PDF location
        "setting.new-pdf-location.vault-folder": "Vault folder",
        "setting.new-pdf-location.current-folder": "Same folder as current file",
        "setting.new-pdf-location.in-specified-folder": "In the folder specified below",
        "setting.new-pdf-location.subfolder": "In subfolder under current folder",

        // Target markdown
        "setting.target-markdown.last-pasted": "Last pasted .md",
        "setting.target-markdown.last-active": "Last active .md",
        "setting.target-markdown.last-active-and-open": "Last active & open .md",
        "setting.target-markdown.last-pasted-then-last-active": "Last pasted .md if any, otherwise last active .md",
        "setting.target-markdown.last-pasted-then-last-active-and-open": "Last pasted .md if any, otherwise last active & open .md",
        "setting.target-markdown.last-active-and-open-then-last-pasted": "Last active & open .md if any, otherwise last pasted .md",

        // Plugin
        "plugin.toggle-auto-focus": "PDF++: Toggle auto-focus",
        "plugin.toggle-auto-paste": "PDF++: Toggle auto-paste",

        // Hover link sources
        "hover-link-source.backlink-highlights": "PDF++: backlink highlights",
        "hover-link-source.internal-links": "PDF++: internal links in PDF (except for citations)",
        "hover-link-source.citation-links": "PDF++: citation links in PDF",
        "hover-link-source.external-links": "PDF++: external links in PDF",
        "hover-link-source.outlines": "PDF++: outlines (bookmarks)",
        "hover-link-source.thumbnails": "PDF++: thumbnails",

        // Notices
        "notice.newer-version-available": "PDF++: There is a newer version available! ",
        "notice.update-now": "Update now",
        "notice.default-setting-restored": "Default setting restored. Note that some options require a restart to take effect.",
        "notice.color-name-already-used": "This color name is already used.",
        "notice.format-name-already-used": "This format name is already used.",
        "notice.cannot-delete-last-display-text-format": "You cannot delete the last display text format.",
        "notice.cannot-delete-last-copy-format": "You cannot delete the last copy format.",
        "notice.link-copied": "Link copied to clipboard",
        "notice.outline-copied": "Outline copied to clipboard.",
        "notice.highlighted-text-copied": "Highlighted text copied to clipboard.",
        "notice.no-highlighted-text-found": "No highlighted text found.",
        "notice.debug-info-copied": "Debug info copied to clipboard.",
        "notice.debug-info-loaded": "Debug info loaded from clipboard.",
        "notice.debug-info-not-found": "Debug info not found in clipboard.",
        "notice.failed-to-extract-page": "Failed to extract page.",
        "notice.failed-to-divide-pdf": "Failed to divide PDF.",

        // Tooltips
        "tooltip.customize": "Customize...",
        "tooltip.restore-default-value": "Restore default value of this setting",
        "tooltip.copy-link-to-setting": "Copy link to this setting",
        "tooltip.copy-link-to-heading": "Copy link to this heading",
        "tooltip.add-new-color": "Add a new color",
        "tooltip.return-to-previous-color": "Return to previous color",
        "tooltip.delete": "Delete",
        "tooltip.reset": "Reset",
        "tooltip.add-new-display-text-format": "Add a new display text format",
        "tooltip.add-new-copy-command": "Add a new copy command",

        // Placeholders
        "placeholder.color-name": "Color name (case-insensitive)",
        "placeholder.format-name": "Format name",
        "placeholder.display-text-format-placeholder": "Display text format",
        "placeholder.copied-text-format-placeholder": "Copied text format",

        // Commands
        "command.copy-link-to-selection-or-annotation": "Copy link to selection or annotation",
        "command.start-rectangular-selection": "Start rectangular selection",
        "command.show-context-menu-at-selection": "Show context menu at selection",
        "command.extract-copy-annotations": "Extract & copy annotations in this PDF",
        "command.copy-link-to-current-page-view": "Copy link to current page view",
        "command.show-outline": "Show outline",
        "command.show-thumbnail": "Show thumbnail",
        "command.close-pdf-sidebar": "Close PDF sidebar",
        "command.toggle-pdf-sidebar": "Toggle PDF sidebar",
        "command.fit-width": "Fit width",
        "command.fit-height": "Fit height",
        "command.zoom-in": "Zoom in",
        "command.zoom-out": "Zoom out",
        "command.adapt-to-theme": "Adapt to theme",
        "command.dont-adapt-to-theme": "Don't adapt to theme",
        "command.toggle-adapt-to-theme": "Toggle \"adapt to theme\"",
        "command.go-to-page": "Go to page",
        "command.show-copy-format-menu": "Show copy format menu",
        "command.show-display-text-format-menu": "Show display text format menu",
        "command.enable-pdf-edit": "Enable PDF edit",
        "command.disable-pdf-edit": "Disable PDF edit",
        "command.toggle-auto-focus": "Toggle auto-focus",
        "command.toggle-auto-paste": "Toggle auto-paste",
        "command.toggle-auto-copy": "Toggle auto-copy",
        "command.add-new-page-at-end": "Add new page at the end",
        "command.insert-page-before": "Insert page before this page",
        "command.insert-page-after": "Insert page after this page",
        "command.delete-this-page": "Delete this page",
        "command.extract-this-page": "Extract this page to a new file",
        "command.divide-pdf-at-page": "Divide this PDF into two files at this page",
        "command.edit-page-labels": "Edit page labels",
        "command.copy-outline-as-markdown-list": "Copy PDF outline as markdown list",
        "command.copy-outline-as-markdown-headings": "Copy PDF outline as markdown headings",
        "command.add-to-outline": "Add to outline (bookmark)",
        "command.create-new-note-for-auto": "Create new note for auto-focus or auto-paste",
        "command.copy-debug-info": "Copy debug info",
        "command.load-debug-info": "Load debug info",
        "command.create-new-pdf": "Create new PDF",
        "command.import-this-pdf": "Import this PDF into vault",
        "command.open-pdf-in-original-location": "Open this PDF in the original location",
        "command.create-dummy-file": "Create dummy file for external PDF",
        "command.restore-default-settings": "Restore default settings",
        "command.check-dataview-inline-fields": "Check Dataview inline fields",

        // Context menu items
        "menu.insert-page-before": "Insert page before this page",
        "menu.insert-page-after": "Insert page after this page",
        "menu.delete-page": "Delete page",
        "menu.extract-page-to-new-file": "Extract page to new file",
        "menu.divide-document-at-page": "Divide document at this page",
        "menu.customize": "Customize...",
        "menu.add-subitem": "Add subitem",
        "menu.rename": "Rename...",
        "menu.move-item-to": "Move item to...",
        "menu.delete": "Delete",
        "menu.extract-to-new-file": "Extract to new file",
        "menu.add-top-level-item": "Add top-level item",
        "menu.edit-annotation": "Edit annotation",
        "menu.delete-annotation": "Delete annotation",
        "menu.copy-pdf-link": "Copy PDF link",
        "menu.search-on-google-scholar": "Search on Google Scholar",
        "menu.paste-copied-pdf-link": "Paste copied PDF link to selection",
        "menu.paste-copied-link": "Paste copied link to selection",
        "menu.copy-selected-text": "Copy selected text",
        "menu.copy-annotated-text": "Copy annotated text",
        "menu.copy-link-to-search": "Copy link to search",
        "menu.read-aloud-selected-text": "Read aloud selected text",
        "menu.copy-link-to-page": "Copy link to page",
        "menu.customize-menu": "Customize menu...",
        "menu.dont-specify-color": "Don't specify color",
        "menu.unset-color": "Unset color",
        "menu.copy-as-image": "Copy as image",
        "menu.enable-pdf-editing": "Enable PDF editing",
        "menu.disable-pdf-editing": "Disable PDF editing",

        // Toolbar
        "toolbar.fit-width": "Fit width",
        "toolbar.fit-height": "Fit height",
        "toolbar.fit-page": "Fit page",
        "toolbar.vertical-scroll": "Vertical scroll",
        "toolbar.horizontal-scroll": "Hotizontal scroll",
        "toolbar.in-page-scroll": "In-page scroll",
        "toolbar.wrapped-scroll": "Wrapped scroll",
        "toolbar.single-page": "Single page",
        "toolbar.two-pages-odd": "Two pages (odd)",
        "toolbar.two-pages-even": "Two pages (even)",
        "toolbar.adapt-to-theme": "Adapt to theme",
        "toolbar.customize-defaults": "Customize defaults...",

        // Modals
        "modal.edit-annotation": "edit annotation contents",
        "modal.delete-annotation": "delete annotation",
        "modal.delete-annotation-confirm": "Are you sure you want to delete this annotation?",
        "modal.delete-annotation-warning": "There are one or more links pointing to this annotation.",
        "modal.create-dummy-file": "Create dummy file for external PDF",
        "modal.source-location": "Source location",
        "modal.source-location-desc": "Where the external PDF is located.",
        "modal.on-this-computer": "On this computer",
        "modal.web": "Web",
        "modal.folder-for-dummy-files": "Folder to save the dummy files",
        "modal.absolute-path-to-pdf": "Absolute path to the PDF",
        "modal.browse": "Browse",
        "modal.pdf-files": "PDF files",
        "modal.url-of-pdf": "URL of the PDF",
        "modal.url-desc": "Must start with \"https://\" or \"http://\".",
        "modal.create": "Create",
        "modal.cancel": "Cancel",
        "modal.close": "Close",
        "modal.save": "Save",
        "modal.delete": "Delete",
        "modal.edit-page-labels": "edit page labels",
        "modal.page-labels-desc": "Each page in a PDF document can be assigned a ***page label***...",
        "modal.loading": "Loading...",
        "modal.no-page-labels-found": "No page labels found",
        "modal.no-page-labels-desc": "This PDF document does not have any page labels.",
        "modal.from": "From",
        "modal.to": "To",
        "modal.numbering-style": "Numbering Style",
        "modal.start-counting-from": "Start counting from",
        "modal.prefix": "Prefix",
        "modal.delete-page": "delete page",
        "modal.delete-page-confirm": "Are you sure you want to delete this page?",
        "modal.delete-page-warning": "There are one or more links pointing to this page.",
        "modal.keep-labels-unchanged": "Keep labels unchanged",
        "modal.update": "Update",
        "modal.page-composer": "Page composer",
        "modal.update-page-labels": "Update the page labels?",
        "modal.remove-pages-from-original": "Remove pages from original file?",
        "modal.proceed": "Proceed",
        "modal.create-new-pdf": "Create new PDF",
        "modal.page-size": "Page size",
        "modal.orientation": "Orientation",
        "modal.portrait": "Portrait",
        "modal.landscape": "Landscape",
        "modal.restore-default": "Restore default settings",
        "modal.restore-default-desc": "This operation will overwrite your PDF++ config file...",
        "modal.i-understand-restore": "I understand, restore default settings",
        "modal.color": "Color",
        "modal.opacity": "Opacity",
        "modal.draw-border": "Draw border",
        "modal.comment": "Comment",
        "modal.title": "Title",
        "modal.add": "Add",

        // Dataview
        "dataview.open-in-settings": "Open in PDF++ settings",
        "dataview.copy-links-as-markdown": "Copy links as markdown",
        "dataview.copy-link-as-markdown": "Copy link as markdown",
    },
    zh: {
        // Display text formats
        "display-text-format.title-page": "标题和页码",
        "display-text-format.page": "页码",
        "display-text-format.text": "文本",
        "display-text-format.emoji": "表情符号",
        "display-text-format.none": "无",

        // Copy formats
        "copy-format.quote": "引用",
        "copy-format.link": "链接",
        "copy-format.embed": "嵌入",
        "copy-format.callout": "提示块",
        "copy-format.quote-in-callout": "引用提示块",

        // Highlight style
        "setting.highlight-style.highlight": "高亮",
        "setting.highlight-style.underline": "下划线",

        // Pane types
        "setting.pane-type.current-tab": "当前标签页",
        "setting.pane-type.new-tab": "新标签页",
        "setting.pane-type.split-right": "右侧分屏",
        "setting.pane-type.split-left": "左侧分屏",
        "setting.pane-type.split-down": "下方分屏",
        "setting.pane-type.split-up": "上方分屏",
        "setting.pane-type.new-window": "新窗口",
        "setting.pane-type.right-sidebar": "右侧边栏",
        "setting.pane-type.left-sidebar": "左侧边栏",

        // Hover highlight actions
        "setting.hover-highlight-action.open-backlink": "打开反向链接",
        "setting.hover-highlight-action.popover-preview": "弹出反向链接预览",

        // Citation hover actions
        "setting.action-on-citation.same-as-other": "与其他内部链接相同",
        "setting.action-on-citation.pdf-plus-bib": "PDF++ 自定义参考文献弹出窗口",
        "setting.action-on-citation.google-scholar": "Google Scholar 弹出窗口",

        // Mobile copy actions
        "setting.mobile-copy-action.copy-text": "复制文本",
        "setting.mobile-copy-action.obsidian-default": "Obsidian 默认（复制为引用）",
        "setting.mobile-copy-action.pdf-plus-command": "运行 PDF++ 的复制命令",

        // Page label update methods
        "setting.page-label-update-method.keep": "保持标签不变",
        "setting.page-label-update-method.update": "更新",

        // New PDF location
        "setting.new-pdf-location.vault-folder": "保险库文件夹",
        "setting.new-pdf-location.current-folder": "当前文件所在文件夹",
        "setting.new-pdf-location.in-specified-folder": "在下方指定的文件夹中",
        "setting.new-pdf-location.subfolder": "当前文件夹的子文件夹",

        // Target markdown
        "setting.target-markdown.last-pasted": "最近粘贴的 .md",
        "setting.target-markdown.last-active": "最近活动的 .md",
        "setting.target-markdown.last-active-and-open": "最近活动并打开的 .md",
        "setting.target-markdown.last-pasted-then-last-active": "如果有最近粘贴的 .md 则使用它，否则使用最近活动的 .md",
        "setting.target-markdown.last-pasted-then-last-active-and-open": "如果有最近粘贴的 .md 则使用它，否则使用最近活动并打开的 .md",
        "setting.target-markdown.last-active-and-open-then-last-pasted": "如果有最近活动并打开的 .md 则使用它，否则使用最近粘贴的 .md",

        // Plugin
        "plugin.toggle-auto-focus": "PDF++：切换自动聚焦",
        "plugin.toggle-auto-paste": "PDF++：切换自动粘贴",

        // Hover link sources
        "hover-link-source.backlink-highlights": "PDF++：反向链接高亮",
        "hover-link-source.internal-links": "PDF++：PDF 中的内部链接（引用除外）",
        "hover-link-source.citation-links": "PDF++：PDF 中的引用链接",
        "hover-link-source.external-links": "PDF++：PDF 中的外部链接",
        "hover-link-source.outlines": "PDF++：大纲（书签）",
        "hover-link-source.thumbnails": "PDF++：缩略图",

        // Notices
        "notice.newer-version-available": "PDF++：有新版本可用！",
        "notice.update-now": "立即更新",
        "notice.default-setting-restored": "已恢复默认设置。请注意，某些选项需要重启才能生效。",
        "notice.color-name-already-used": "此颜色名称已被使用。",
        "notice.format-name-already-used": "此格式名称已被使用。",
        "notice.cannot-delete-last-display-text-format": "无法删除最后一个显示文本格式。",
        "notice.cannot-delete-last-copy-format": "无法删除最后一个复制格式。",
        "notice.link-copied": "链接已复制到剪贴板",
        "notice.outline-copied": "大纲已复制到剪贴板。",
        "notice.highlighted-text-copied": "高亮文本已复制到剪贴板。",
        "notice.no-highlighted-text-found": "未找到高亮文本。",
        "notice.debug-info-copied": "调试信息已复制到剪贴板。",
        "notice.debug-info-loaded": "已从剪贴板加载调试信息。",
        "notice.debug-info-not-found": "剪贴板中未找到调试信息。",
        "notice.failed-to-extract-page": "提取页面失败。",
        "notice.failed-to-divide-pdf": "拆分 PDF 失败。",

        // Tooltips
        "tooltip.customize": "自定义……",
        "tooltip.restore-default-value": "恢复此设置的默认值",
        "tooltip.copy-link-to-setting": "复制指向此设置的链接",
        "tooltip.copy-link-to-heading": "复制指向此标题的链接",
        "tooltip.add-new-color": "添加新颜色",
        "tooltip.return-to-previous-color": "返回上一个颜色",
        "tooltip.delete": "删除",
        "tooltip.reset": "重置",
        "tooltip.add-new-display-text-format": "添加新的显示文本格式",
        "tooltip.add-new-copy-command": "添加新的复制命令",

        // Placeholders
        "placeholder.color-name": "颜色名称（不区分大小写）",
        "placeholder.format-name": "格式名称",
        "placeholder.display-text-format-placeholder": "显示文本格式",
        "placeholder.copied-text-format-placeholder": "复制文本格式",

        // Commands
        "command.copy-link-to-selection-or-annotation": "复制指向选择/批注的链接",
        "command.start-rectangular-selection": "开始矩形选择",
        "command.show-context-menu-at-selection": "在选择处显示右键菜单",
        "command.extract-copy-annotations": "提取并复制此 PDF 中的批注",
        "command.copy-link-to-current-page-view": "复制指向当前页面视图的链接",
        "command.show-outline": "显示大纲",
        "command.show-thumbnail": "显示缩略图",
        "command.close-pdf-sidebar": "关闭 PDF 侧边栏",
        "command.toggle-pdf-sidebar": "切换 PDF 侧边栏",
        "command.fit-width": "适应宽度",
        "command.fit-height": "适应高度",
        "command.zoom-in": "放大",
        "command.zoom-out": "缩小",
        "command.adapt-to-theme": "适应主题",
        "command.dont-adapt-to-theme": "不适应主题",
        "command.toggle-adapt-to-theme": "切换「适应主题」",
        "command.go-to-page": "跳转到页面",
        "command.show-copy-format-menu": "显示复制格式菜单",
        "command.show-display-text-format-menu": "显示显示文本格式菜单",
        "command.enable-pdf-edit": "启用 PDF 编辑",
        "command.disable-pdf-edit": "禁用 PDF 编辑",
        "command.toggle-auto-focus": "切换自动聚焦",
        "command.toggle-auto-paste": "切换自动粘贴",
        "command.toggle-auto-copy": "切换自动复制",
        "command.add-new-page-at-end": "在末尾添加新页面",
        "command.insert-page-before": "在此页面之前插入",
        "command.insert-page-after": "在此页面之后插入",
        "command.delete-this-page": "删除此页面",
        "command.extract-this-page": "将此页面提取到新文件",
        "command.divide-pdf-at-page": "在此页面处将 PDF 分为两个文件",
        "command.edit-page-labels": "编辑页面标签",
        "command.copy-outline-as-markdown-list": "复制 PDF 大纲为 Markdown 列表",
        "command.copy-outline-as-markdown-headings": "复制 PDF 大纲为 Markdown 标题",
        "command.add-to-outline": "添加到大纲（书签）",
        "command.create-new-note-for-auto": "为自动聚焦或自动粘贴创建新笔记",
        "command.copy-debug-info": "复制调试信息",
        "command.load-debug-info": "加载调试信息",
        "command.create-new-pdf": "创建新 PDF",
        "command.import-this-pdf": "将此 PDF 导入到保险库",
        "command.open-pdf-in-original-location": "在原始位置打开此 PDF",
        "command.create-dummy-file": "为外部 PDF 创建虚拟文件",
        "command.restore-default-settings": "恢复默认设置",
        "command.check-dataview-inline-fields": "检查 Dataview 内联字段",

        // Context menu items
        "menu.insert-page-before": "在此页面之前插入",
        "menu.insert-page-after": "在此页面之后插入",
        "menu.delete-page": "删除页面",
        "menu.extract-page-to-new-file": "将页面提取到新文件",
        "menu.divide-document-at-page": "在此页面处拆分文档",
        "menu.customize": "自定义……",
        "menu.add-subitem": "添加子项",
        "menu.rename": "重命名……",
        "menu.move-item-to": "移动到……",
        "menu.delete": "删除",
        "menu.extract-to-new-file": "提取到新文件",
        "menu.add-top-level-item": "添加顶级项",
        "menu.edit-annotation": "编辑批注",
        "menu.delete-annotation": "删除批注",
        "menu.copy-pdf-link": "复制 PDF 链接",
        "menu.search-on-google-scholar": "在 Google Scholar 搜索",
        "menu.paste-copied-pdf-link": "将复制的 PDF 链接粘贴到选择",
        "menu.paste-copied-link": "将复制的链接粘贴到选择",
        "menu.copy-selected-text": "复制所选文本",
        "menu.copy-annotated-text": "复制批注文本",
        "menu.copy-link-to-search": "复制搜索链接",
        "menu.read-aloud-selected-text": "朗读所选文本",
        "menu.copy-link-to-page": "复制页面链接",
        "menu.customize-menu": "自定义菜单……",
        "menu.dont-specify-color": "不指定颜色",
        "menu.unset-color": "取消颜色",
        "menu.copy-as-image": "复制为图片",
        "menu.enable-pdf-editing": "启用 PDF 编辑",
        "menu.disable-pdf-editing": "禁用 PDF 编辑",

        // Toolbar
        "toolbar.fit-width": "适应宽度",
        "toolbar.fit-height": "适应高度",
        "toolbar.fit-page": "适应页面",
        "toolbar.vertical-scroll": "垂直滚动",
        "toolbar.horizontal-scroll": "水平滚动",
        "toolbar.in-page-scroll": "页内滚动",
        "toolbar.wrapped-scroll": "环绕滚动",
        "toolbar.single-page": "单页",
        "toolbar.two-pages-odd": "双页（奇数）",
        "toolbar.two-pages-even": "双页（偶数）",
        "toolbar.adapt-to-theme": "适应主题",
        "toolbar.customize-defaults": "自定义默认值……",

        // Modals
        "modal.edit-annotation": "编辑批注内容",
        "modal.delete-annotation": "删除批注",
        "modal.delete-annotation-confirm": "您确定要删除此批注吗？",
        "modal.delete-annotation-warning": "有一个或多个链接指向此批注。",
        "modal.create-dummy-file": "为外部 PDF 创建虚拟文件",
        "modal.source-location": "源位置",
        "modal.source-location-desc": "外部 PDF 所在的位置。",
        "modal.on-this-computer": "在此电脑上",
        "modal.web": "网页",
        "modal.folder-for-dummy-files": "保存虚拟文件的文件夹",
        "modal.absolute-path-to-pdf": "PDF 的绝对路径",
        "modal.browse": "浏览",
        "modal.pdf-files": "PDF 文件",
        "modal.url-of-pdf": "PDF 的 URL",
        "modal.url-desc": "必须以「https://」或「http://」开头。",
        "modal.create": "创建",
        "modal.cancel": "取消",
        "modal.close": "关闭",
        "modal.save": "保存",
        "modal.delete": "删除",
        "modal.edit-page-labels": "编辑页面标签",
        "modal.page-labels-desc": "每个页面都可以分配一个与页码不同的页面标签……",
        "modal.loading": "加载中……",
        "modal.no-page-labels-found": "未找到页面标签",
        "modal.no-page-labels-desc": "此 PDF 文档没有任何页面标签。",
        "modal.from": "从",
        "modal.to": "到",
        "modal.numbering-style": "编号样式",
        "modal.start-counting-from": "从以下数字开始计数",
        "modal.prefix": "前缀",
        "modal.delete-page": "删除页面",
        "modal.delete-page-confirm": "您确定要删除此页面吗？",
        "modal.delete-page-warning": "有一个或多个链接指向此页面。",
        "modal.keep-labels-unchanged": "保持标签不变",
        "modal.update": "更新",
        "modal.page-composer": "页面编辑器",
        "modal.update-page-labels": "更新页面标签？",
        "modal.remove-pages-from-original": "从原始文件中移除页面？",
        "modal.proceed": "继续",
        "modal.create-new-pdf": "创建新 PDF",
        "modal.page-size": "页面大小",
        "modal.orientation": "方向",
        "modal.portrait": "纵向",
        "modal.landscape": "横向",
        "modal.restore-default": "恢复默认设置",
        "modal.restore-default-desc": "此操作将覆盖您的 PDF++ 配置文件……",
        "modal.i-understand-restore": "我理解，恢复默认设置",
        "modal.color": "颜色",
        "modal.opacity": "不透明度",
        "modal.draw-border": "绘制边框",
        "modal.comment": "评论",
        "modal.title": "标题",
        "modal.add": "添加",

        // Dataview
        "dataview.open-in-settings": "在 PDF++ 设置中打开",
        "dataview.copy-links-as-markdown": "复制为 Markdown 链接",
        "dataview.copy-link-as-markdown": "复制为 Markdown 链接",
    }
};

/**
 * Translate a string key.
 */
export function t(key: string, params?: Record<string, string | number>): string {
    const locale = translations[currentLocale] ?? translations['en'] ?? {};
    let text = locale[key] ?? translations['en']?.[key] ?? key;

    if (params) {
        for (const [k, v] of Object.entries(params)) {
            text = text.replace(new RegExp(`\\\$\\\{${k}\\\}`, 'g'), String(v));
        }
    }

    return text;
}

/** Shortcut for `t()` */
export const _ = t;
