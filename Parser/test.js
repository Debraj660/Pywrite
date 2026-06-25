import Parser from "./parser.js";
import Tokenizer from "./tokenizer.js";
const program = "2 + 3;";
const tokenizer = new Tokenizer();
tokenizer.init(program);
let token ;
while((token = tokenizer.getNextToken())){
    console.log(token);
}


const parser = new Parser();
const ast = parser.parse(program);
console.log(JSON.stringify(ast, null, 2));