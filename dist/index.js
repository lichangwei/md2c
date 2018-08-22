"use strict";
exports.__esModule = true;
var marked = require("marked");
/**
 * 转义`Confluence`语法使用的特殊字符
 * @param text 将要转义的字符串
 */
var escape = function (text) { return (text || '').replace(/(?=[{}|*!\-\[\]])/gm, '\\'); };
/**
 * 将代码语言转成`Confluence`识别的语言，他识别的语言如下：
 * actionscript3,applescript,bash,c#,cpp,css,coldfusion,delphi,diff,erl,groovy,
 * xml,java,jfx,js,php,perl,text,powershell,py,ruby,sql,sass,scala,vb,yaml(6.7)
 */
var languages = {
    html: 'xml',
    json: 'js',
    javascript: 'js',
    less: 'sass',
    'c++': 'cpp',
    python: 'py'
};
/**
 * 创建一个将`Markdown`转成`Confluence Wiki Markup`的渲染器
 * 参考文档
 * https://confluence.atlassian.com/display/CONF42/Confluence+Wiki+Markup
 */
function Renderer() { }
Object.assign(Renderer.prototype, marked.Renderer.prototype, {
    hr: function () { return '----\n'; },
    em: function (text) { return "_" + escape(text) + "_"; },
    del: function (text) { return "-" + escape(text) + "-"; },
    strong: function (text) { return "*" + escape(text) + "*"; },
    text: function (text) { return escape(text); },
    link: function (href, title, text) { return text ? "[" + escape(text) + "|" + href + "]" : "[" + href + "]"; },
    image: function (href, title, alt) { return "!" + href + "|title=" + escape(title) + ",alt=" + escape(alt) + "!"; },
    code: function (code, lang) { return "{code:language=" + (languages[lang] || lang) + "|linenumbers=true|collapse=true}\n" + code + "\n{code}\n"; },
    codespan: function (code) { return "{{" + escape(code) + "}}"; },
    list: function (text, ordered) { return text.trim().replace(/^|(?<=\n+)/g, ordered ? '# ' : '* ') + '\n\n'; },
    listitem: function (text) { return escape(text) + "\n"; },
    table: function (header, body) { return "" + header + body; },
    tablerow: function (cells) { return cells + "|\n"; },
    tablecell: function (cell, options) { return options.header ? "||" + escape(cell) : "|" + escape(cell); },
    heading: function (text, depth) { return "h" + depth + ". " + escape(text) + "\n"; },
    paragraph: function (text) { return text + "\n"; },
    blockquote: function (quote) { return "{quote}" + escape(quote) + "{quote}\n"; }
});
var renderer = new Renderer();
exports["default"] = (function (markdown) { return marked(markdown, { renderer: renderer }); });
