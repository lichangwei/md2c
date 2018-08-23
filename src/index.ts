import * as marked from 'marked';

/**
 * 转义`Confluence`语法使用的特殊字符
 * @param text 将要转义的字符串
 */
const escape = (text)=>(text || '').replace(/(?=[{}|*!\[\]])/gm, '\\');

/**
 * 将代码语言转成`Confluence`识别的语言，他识别的语言如下：
 * actionscript3,applescript,bash,c#,cpp,css,coldfusion,delphi,diff,erl,groovy,
 * xml,java,jfx,js,php,perl,text,powershell,py,ruby,sql,sass,scala,vb,yaml(6.7)
 */
const languages = {
    html: 'xml',
    json: 'js',
    javascript: 'js',
    less: 'sass',
    'c++': 'cpp',
    python: 'py',
};

/**
 * 创建一个将`Markdown`转成`Confluence Wiki Markup`的渲染器
 * 参考文档
 * https://confluence.atlassian.com/display/CONF42/Confluence+Wiki+Markup
 */
function Renderer(){}
Object.assign(Renderer.prototype, marked.Renderer.prototype, {
    hr: ()=>'----\n',
    em: (text)=>`_${escape(text)}_`,
    del: (text)=>`-${escape(text)}-`,
    strong: (text)=>`*${escape(text)}*`,

    text: (text)=>escape(text),
    link: (href, title, text)=>text ? `[${escape(text)}|${href}]` : `[${href}]`,
    image: (href, title, alt)=>`!${href}|title=${escape(title)},alt=${escape(alt)}!`,

    code: (code, lang)=>`{code:language=${languages[lang]||lang}|linenumbers=true|collapse=true}\n${code}\n{code}\n`,
    codespan: (code)=>`{{${escape(code)}}}`,

    list: (text, ordered)=>text.trim().replace(/^|(?<=\n+)/g, ordered ? '# ' : '* ') + '\n\n',
    listitem: (text)=>`${escape(text)}\n`,

    table: (header, body)=>`${header}${body}`,
    tablerow: (cells)=>`${cells}|\n`,
    tablecell: (cell, options)=>options.header ? `||${escape(cell)}` : `|${escape(cell)}`,

    heading: (text, depth)=>`h${depth}. ${escape(text)}\n`,
    paragraph: (text)=>`${text}\n`,
    blockquote: (quote)=>`{quote}${escape(quote)}{quote}\n`,

    // 使用`marked`自带渲染器的方法
    // br: ()=>'\n',
    // html: (html)=>html,
    // checkbox: (checked)=>checked,
});

const renderer = new Renderer();

export default (markdown:string)=>marked(markdown, {renderer});
