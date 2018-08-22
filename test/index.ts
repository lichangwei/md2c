import * as assert from 'assert';

import 'mocha';
import md2c from '../src/index';

describe('convert', () => {
    it('标题', () => {
        assert.equal(md2c(`# h1`),      'h1. h1\n');
        assert.equal(md2c(`## h2`),     'h2. h2\n');
        assert.equal(md2c(`### h3`),    'h3. h3\n');
        assert.equal(md2c(`#### h4`),   'h4. h4\n');
        assert.equal(md2c(`##### h5`),  'h5. h5\n');
        assert.equal(md2c(`###### h6`), 'h6. h6\n');
        assert.equal(md2c(`h1\n===`),   'h1. h1\n');
        assert.equal(md2c(`h2\n---`),   'h2. h2\n');
    });
    it('文字', () => {
        assert.equal(md2c('**加粗**'), '*加粗*\n');
        assert.equal(md2c('*斜体*'),   '_斜体_\n');
        assert.equal(md2c('~~删除~~'), '-删除-\n');
    });
    it('引用', () => {
        assert.equal(md2c('>引用'), '{quote}引用\n{quote}\n');
    });
    it('代码', () => {
        let code = '```json\n{\n  "result": true\n}\n```';
        let mark = '{code:language=js|linenumbers=true|collapse=true}\n{\n  "result": true\n}\n{code}\n';
        assert.equal(md2c(code), mark);
        code = '```bash\nnpm install\n```';
        mark = '{code:language=bash|linenumbers=true|collapse=true}\nnpm install\n{code}\n'
        assert.equal(md2c(code), mark);

        assert.equal(md2c('`Get /api/user/${id}`'), '{{Get /api/user/$\\\{id\\\}}}\n');
    });
    it('链接', () => {
        let code = '[Markdown Guide](https://www.markdownguide.org/)';
        let mark = '[Markdown Guide|https://www.markdownguide.org/]\n';
        assert.equal(md2c(code), mark);
        code = '[](https://www.markdownguide.org/)';
        mark = '[https://www.markdownguide.org/]\n';
        assert.equal(md2c(code), mark);
    });
    it('图片', () => {
        const code = '![Google](google.png)';
        const mark = '!google.png|title=,alt=Google!\n';
        assert.equal(md2c(code), mark);
    });
    it('列表', () => {
        let code = '我喜欢吃以下水果：\n- 香蕉\n- 桔子';
        let mark = '我喜欢吃以下水果：\n* 香蕉\n* 桔子\n\n';
        assert.equal(md2c(code), mark);
        code = '我喜欢吃以下水果：\n1. 香蕉\n2. 桔子';
        mark = '我喜欢吃以下水果：\n# 香蕉\n# 桔子\n\n';
        assert.equal(md2c(code), mark);
    });
    it('表格', () => {
        const code = '| foo | bar |\n| --- | --- |\n| baz | bim |';
        const mark = '||foo||bar|\n|baz|bim|\n';
        assert.equal(md2c(code), mark);
    });
    it('横线', () => {
        assert.equal(md2c('---'), '----\n');
    });
});