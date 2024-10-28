const calcular = () => {
    const entrada = document.getElementById('entrada').value
    const resultado = document.getElementById('resultado')
    resultado.value = ''

    if (!entrada) {
        resultado.value = 'Ingresa una operación'
            return;
    }

    const pasos = resolverExpresion(entrada)
        pasos.forEach((paso, index) => {
            resultado.value += `R${index + 1}: ${paso}\n`
    });
};

const resolverExpresion = (expresion) => {
    const pasos = [];
       // pasos.push(`Operación a trabajar: ${expresion}`)

    let expresionModificada = expresion;
    const parentesisRegex = /\(([^()]+)\)/
    while (parentesisRegex.test(expresionModificada)) {
        expresionModificada = expresionModificada.replace(parentesisRegex, (match, contenido) => {
            const resultado = eval(contenido);
            pasos.push(`${contenido} = ${resultado}`)
                return resultado;
        })
    }

    const multiplicacionDivisionRegex = /(\d+(\.\d+)?)([\*\/])(\d+(\.\d+)?)/;
    while (multiplicacionDivisionRegex.test(expresionModificada)) {
        expresionModificada = expresionModificada.replace(multiplicacionDivisionRegex, (match, num1, _, operador, num2) => {
            const resultado = operador === '*' ? parseFloat(num1) * parseFloat(num2) : parseFloat(num1) / parseFloat(num2);
            pasos.push(`${num1} ${operador} ${num2} = ${resultado}`)
                return resultado;
        })
    }

    const sumaRestaRegex = /(\d+(\.\d+)?)([\+\-])(\d+(\.\d+)?)/;
    while (sumaRestaRegex.test(expresionModificada)) {
        expresionModificada = expresionModificada.replace(sumaRestaRegex, (match, num1, _, operador, num2) => {
            const resultado = operador === '+' ? parseFloat(num1) + parseFloat(num2) : parseFloat(num1) - parseFloat(num2);
            pasos.push(`${num1} ${operador} ${num2} = ${resultado}`);
            return resultado;
        });
    }

    pasos.push(`(Resultado final): ${expresionModificada}`)
        return pasos;
};

document.getElementById('calcular').addEventListener('click', calcular)

