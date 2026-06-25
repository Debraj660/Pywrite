class Interpreter{
    interpret(node){
        return this.StatementList(node);
    }

    StatementList(body){
        let res ;
        for(const statement of body){
            res = this.Statement(statement);
        }
        return res ;
    }

    Statement(node){
        switch(node.type){
            case "ExpressionStatement":
                return this.ExpressionStatement(node.expression)
        }
    }

    ExpressionStatement(expression){
        return this.Expression(expression);
    }

    Expression(node){
        switch(node.type){
            case "NumericLiteral" : 
                return this.NumericLiteral(node);
            case "BinaryExpression" : 
                return this.BinaryExpression(node);
        }
    }

    BinaryExpression(node){
        switch(node.operator){
            case "+" : 
            case "-" : 
            case "*" : 
            case "/" : 
            case "%" :
                return this.MathExpression(node);
        }
    }

    MathExpression(node){
        let left = this.Expression(node.left);
        let right = this.Expression(node.right);

        switch(node.operator){
            case "+" : return left + right ;
            case "-" : return left - right ;
            case "*" : return left * right ;
            case "/" : return left / right ;
            case "%" : return left % right ;
            
        }
    }

    NumericLiteral(node){
        return node.value ;
    }


};

export default Interpreter ;