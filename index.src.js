import md2c from '../dist/index.js';

var markdown = document.getElementById('markdown');
var markup   = document.getElementById('markup');

markdown.onchange = markdown.onkeyup = function(){
    markup.value = md2c(markdown.value);
};