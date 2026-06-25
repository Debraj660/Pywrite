import Tokenizer from "./tokenizer.js";

/*
    AST be like ->
    {
        type: "Program",
        body: [StatementLists()]
    }
*/


class Parser{
    constructor(){
        this._string = "";
        this._tokenizer = new Tokenizer();
    }

    parse(string){
        this._string = string ;
        this._tokenizer.init(this._string);
        this._lookahead = this._tokenizer.getNextToken();
        return this.Program();
    }

    Program(){
        return {
            type: "Program",
            body: this.StatementList()
        }
    }

    StatementList(){
        const list = [] ;
        while(this._lookahead != null){
            list.push(this._Statement());
        }
        return list;
    }

    _Statement(){
        return this.ExpressionStatement();
    }

    ExpressionStatement(){
        const expression = this.Expression();
        this._eat(";");
        return {
            type: "ExpressionStatement",
            expression
        }
    }

    Expression(){
        return this.AdditiveExpression();
    }

    AdditiveExpression(){
        let left = this.ModuloExpression();
        while(this._lookahead && this._lookahead.type === "ADDITIVE_OPERATOR"){
            const operator = this._eat("ADDITIVE_OPERATOR").value ;
            const right = this.ModuloExpression();
            left = {
                type: "BinaryExpression",
                operator,
                left,
                right
            }
        }
        return left ;
    }
    ModuloExpression(){
        let left = this.MultiplicativeExpression();
        while(this._lookahead && this._lookahead.type === "MODULO_OPERATOR"){
            const operator = this._eat("MODULO_OPERATOR").value ;
            const right = this.MultiplicativeExpression();
            left = {
                type: "BinaryExpression",
                operator,
                left,
                right
            }
        }
        return left ;
    }

    MultiplicativeExpression(){
        let left = this.PrimaryExpression();
        while(this._lookahead && this._lookahead.type === "MULTIPLICATIVE_OPERATOR"){
            const operator = this._eat("MULTIPLICATIVE_OPERATOR").value ;
            const right = this.PrimaryExpression();
            left = {
                type: "BinaryExpression",
                operator,
                left,
                right
            }
        }
        return left ;
    }

    PrimaryExpression(){
        if(this._isLateral(this._lookahead.type)){
            return this.Literal();
        }

        switch(this._lookahead.type){
            case "(":
                return this.ParenthesizedExpression();
        }
    }

    ParenthesizedExpression(){
        this._eat("(");
        const expression = this.Expression();
        this._eat(")");
        return expression ;
    }

    _isLateral(tokenType){
        return tokenType == "NUMBER";
    }

    Literal(){
        switch(this._lookahead.type){
            case "NUMBER":
                return this.NumericLiteral();
        }
        throw new SyntaxError(`Literal: unexpected`);
    }

    NumericLiteral(){
        const token = this._eat("NUMBER");
        return {
            type: "NumericLiteral",
            value: Number(token.value)
        }
    }

    _eat(tokenType){
        const token = this._lookahead ;
        if(token == null){
            throw new SyntaxError(`Unexpected error at eat`)
        }

        if(token.type !== tokenType) throw new SyntaxError(`Unexpected token : "${token.value}, expected: "${tokenType}"`);
        this._lookahead = this._tokenizer.getNextToken();
        return token;
    }
};

export default Parser ;