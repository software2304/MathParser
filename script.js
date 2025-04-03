const Op = { sum: "+", sub: "-", mul: "*", div: "/" };

function parseExpression(tokens) {
    let c = 0;
    const consume = () => tokens[c++];

    const parseNum = () => ({ val: parseInt(consume()), type: "num" });

    const parseOp = () => {
        const node = { val: consume(), type: "op", expr: [] };
        while (c < tokens.length) node.expr.push(parseExpr());
        return node;
    };

    const parseExpr = () => (/\d/.test(tokens[c]) ? parseNum() : parseOp());

    return parseExpr();
}

function evaluateAST(ast, steps) {
    if (ast.type === "num") return ast.val;

    const results = ast.expr.map((e) => evaluateAST(e, steps));
    const result = results.reduce((a, b) => eval(`${a} ${Op[ast.val]} ${b}`));

    steps.push(`${ast.val.toUpperCase()}(${results.join(` ${Op[ast.val]} `)}) = ${result}`);
    return result;
}

function evaluateExpression() {
    let input = document.getElementById("expression").value.trim();
    if (!input) return;

    let tokens = input.split(" ").map(s => s.trim());
    let steps = [];
    let ast = parseExpression(tokens);
    let result = evaluateAST(ast, steps);

    document.getElementById("result").innerHTML = `Result: ${result}`;
    document.getElementById("steps").innerHTML = `Steps:<br>${steps.join("<br>")}`;
}
