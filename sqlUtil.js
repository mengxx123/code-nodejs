var classContent = "public class SysUserDetail { \n\tprivate Long tbid;\n\tprivate String realname;\n\tprivate Timestamp logintime;\n\tprivate Integer loginnum;\n\tprivate tinyInteger data_flag;\n} ";
var className = "Snippet";
var attrs = new Array();

function generateCode(sql) {
    sql = sql.replace(/      /g, " ");
    sql = sql.replace(/     /g, " ");
    sql = sql.replace(/    /g, " ");
    sql = sql.replace(/   /g, " ");
    sql = sql.replace(/  /g, " ");
    var classstart = sql.indexOf("create table");
    var classend = sql.indexOf("(");
    if (classstart >= 0) {
        var name = sql.substring(classstart + 12, classend);
        name = name.replace(/ /g, '');
        name = name.replace(/`/g, '');
        if (name.indexOf("_") >= 0) {
            var names = name.split("_");
            var temp = "";
            for (var i = 0; i < names.length; i++) {
                var splitstr = names[i];
                temp += splitstr.substring(0, 1).toUpperCase() + splitstr.substring(1, splitstr.length)
            };
            name = temp
        } else if (name.indexOf("-") >= 0) {
            var names = name.split("-");
            var temp = "";
            for (var i = 0; i < names.length; i++) {
                var splitstr = names[i];
                temp += splitstr.substring(0, 1).toUpperCase() + splitstr.substring(1, splitstr.length)
            };
            name = temp
        } else {
            name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length)
        }
        className = name;
        sql = sql.substring(classend + 1)
    }
    classContent = "public class " + className + " { \n";
    var codeStr = '<ol class="linenums"><li class="L0"><span class="kwd">public</span><span class="pln"> </span><span class="kwd">class</span><span class="pln"> </span><span class="typ">' + className + '</span><span class="pln"> </span><span class="pun">{</span><span class="pln"> </span></li>';
    var fields = sql.split(",\n");
    for (var i = 0; i < fields.length - 1; i++) {
        var filed = $.trim(fields[i]);
        console.log(filed)
        var commentStart = filed.indexOf("comment '");
        var commentStr = "";
        if (commentStart >= 0) {
            commentStr = filed.substring(commentStart + 9);
            commentStr = commentStr.substring(0, commentStr.indexOf("'"));
            console.log("attrComment : " + commentStr)
        }
        filed = filed.replace(/`/g, '');
        var temps = filed.split(" ");
        var filedname = temps[0];
        var filedtype = temps[1];
        if (filedtype && filedtype.indexOf("(") >= 0) {
            filedtype = filedtype.substring(0, filedtype.indexOf("("))
        };
        filedtype = filedtype;
        if (!filedtype) {
            continue
        };
        filedtype = filedtype.replace("varchar2", "String");
        filedtype = filedtype.replace("varchar", "String");
        filedtype = filedtype.replace("character", "String");
        filedtype = filedtype.replace("char", "String");
        filedtype = filedtype.replace("text", "String");
        filedtype = filedtype.replace("bigint", "Long");
        filedtype = filedtype.replace("number", "Integer");
        filedtype = filedtype.replace("tinyint", "Integer");
        filedtype = filedtype.replace("integer", "Integer");
        filedtype = filedtype.replace("smallint", "Integer");
        filedtype = filedtype.replace("int", "Integer");
        filedtype = filedtype.replace("boolean", "Integer");
        filedtype = filedtype.replace("date", "Date");
        filedtype = filedtype.replace("timestamp", "Timestamp");
        filedtype = filedtype.replace("float", "Float");
        filedtype = filedtype.replace("double", "Double");
        filedtype = filedtype.replace("decimal", "Double");
        filedtype = filedtype.replace("numeric", "Double");
        var primary = (attrs.length == 0) ? 1 : 0;
        var jsonStr = '{ "attrName": "' + filedname + '", "attrType": "' + filedtype + '" , "attrPrimary": "' + primary + '" , "attrComment": "' + commentStr + '" }';
        attrs[attrs.length] = eval('(' + jsonStr + ')');
        classContent += "\tprivate " + filedtype + " " + filedname + ";";
        codeStr += '<li class="L' + (i + 1) + '"><span class="pln">	</span><span class="kwd">private</span><span class="pln"> </span><span class="typ">' + filedtype + '</span><span class="pln"> ' + filedname + '</span><span class="pun">;</span>';
        if (commentStart >= 0) {
            codeStr += '<span class="com">//' + commentStr + '</span>';
            classContent += "//" + commentStr
        }
        classContent += "\n";
        codeStr += '</li>'
    };
    classContent += " \n}";
    console.log(classContent);
    codeStr += '<li class="L0"><span class="pln"> </span></li><li class="L1"><span class="pun">}</span></li></ol>';
    return codeStr
}

module.exports = generateCode
