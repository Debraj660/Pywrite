import Parser from "./parser.js";
import Tokenizer from "./tokenizer.js";
import Interpreter from "../Interpreter/interpreter.js";
const program = "(4 - 4) * (3);";
const tokenizer = new Tokenizer();
tokenizer.init(program);
let token ;
while((token = tokenizer.getNextToken())){
    console.log(token);
}


const parser = new Parser();
const ast = parser.parse(program);
console.log(JSON.stringify(ast, null, 2));

const interpreter = new Interpreter();
const result = interpreter.interpret(ast.body);
console.log(result);