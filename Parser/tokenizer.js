const Spec = [
    // --------------------------------------
    // Whitespace:
    [/^\s+/, null],

    // --------------------------------------
    // Comments:

    // Skip single-line comments:
    [/^\/\/.*/, null],

    // Skip multi-line comments:
    [/^\/\*[\s\S]*?\*\//, null],

    // --------------------------------------
    // Math operators: +, -, *, /, %
    [/^[+\-]/, "ADDITIVE_OPERATOR"],
    [/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],
    [/^%/, "MODULO_OPERATOR"],

    // --------------------------------------
    // Symbols and delimiters:
    [/^;/, ";"], // Semicolon
    [/^{/, "{"], // LeftBrace
    [/^}/, "}"], // RightBrace
    [/^\(/, "("], // LeftParen
    [/^\)/, ")"], // RightParen
    [/^\[/, "["], // LeftBracket
    [/^\]/, "]"], // RightBracket
    [/^,/, ","], // Comma
    [/^\./, "."], // Dot
    [/^\?/, "?"], // Question Mark
    [/^:/, ":"], // Colon

    // --------------------------------------
    // Numbers:
    [/^\d+/, "NUMBER"],

];

class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
        this._line = 1;
        this._column = 1;
    }
    hasNextToken() {
        return this._cursor < this._string.length;
    }

    getNextToken() {
        if (!this.hasNextToken()) {
            return null;
        }
        const string = this._string.slice(this._cursor);
        
        for(const [regex, tokenType] of Spec) { 
            const tokenValue = this._match(regex, string);
            if(tokenValue == null) continue;

            if(tokenType == null) {
                //tokenType == null means it's whitespace so skip it
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue,
            }
        }
        throw new SyntaxError(
            `Unexpected token: "${string[0]}"`
        );
    }

    _match(regexp, string){
        const matched = regexp.exec(string); // exec -> inbuilt function of js -> match pattern

        if (matched == null) return null;

        this._cursor += matched[0].length;

        return matched[0];
    }


};

export default Tokenizer ;