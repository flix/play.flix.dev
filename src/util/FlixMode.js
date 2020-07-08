import 'brace/mode/java';

export class CustomHighlightRules extends window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules {
    constructor() {
        super();

        var keywords = (
            "namespace|def|case|enum|opaque|type|alias|rel|lat|use|null|ref|deref|if|else|let|let*|new|as|get|set|import|match|match?|select|spawn|???|solve|project|fold"
        );

        var builtinConstants = (
            "true|false|Nil"
        );

        var builtinFunctions = (
            "avg"
        );

        var dataTypes = (
            "Unit|Bool|Char|Float32|Float64|Int|Int8|Int16|Int32|Int64|BigInt|String|Array|Channel|Ref|true|false|not|and|or|Pure|Impure"
        );

        var keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants,
            "storage.type": dataTypes
        }, "identifier", true);

        this.$rules = {
            "start" : [ {
                token : "comment",
                regex : "\\/\\/.*$"
            },  {
                token : "comment",
                start : "/\\*",
                end : "\\*/"
            }, {
                token : "string",           // " string
                regex : '".*?"'
            }, {
                token : "string",           // ' string
                regex : "'.*?'"
            }, {
                token : "string",           // ` string (apache drill)
                regex : "`.*?`"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
            }, {
                token : "paren.lparen",
                regex : "[\\(]"
            }, {
                token : "paren.rparen",
                regex : "[\\)]"
            }, {
                token : "text",
                regex : "\\s+"
            } ]
        };
        this.normalizeRules();
    }
}

export default class FlixMode extends window.ace.acequire('ace/mode/java').Mode {
    constructor() {
        super();
        this.HighlightRules = CustomHighlightRules;
    }
}

