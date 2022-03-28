import { modulo10, modulo11Arrecadacao } from './Modules.js';
import { convertToBoletoArrecadacao } from './Converters.js';

function validaCodigoBarras(barCode) {
    if (!/^[0-9]{44}$/.test(barCode) || Number(barCode[0]) !== 8)
        return false;

    const codigoMoeda = Number(barCode[2]);
    const DV = Number(barCode[3]);
    const bloco = barCode.substring(0, 3) + barCode.substring(4);

    let modulo;

    if (codigoMoeda === 6 || codigoMoeda === 7) {
        modulo = modulo10;
    }
    else if (codigoMoeda === 8 || codigoMoeda === 9) {
        modulo = modulo11Arrecadacao;
    }
    else {
        return false;
    }

    return modulo(bloco) === DV;
}

function validaLinhaDigitavel(barCode) {
    if (!/^[0-9]{48}$/.test(barCode) || Number(barCode[0]) !== 8) 
        return false;
  
    const validDV = validaCodigoBarras(convertToBoletoArrecadacao(barCode));
  
    const codigoMoeda = Number(barCode[2]);
    
    let modulo;
    if (codigoMoeda === 6 || codigoMoeda === 7) 
        modulo = modulo10;
    else if (codigoMoeda === 8 || codigoMoeda === 9) 
        modulo = modulo11Arrecadacao;
    else 
        return false;
    
    const blocos = Array.from({ length: 4 }, (v, index) => {
        const start = (11 * (index)) + index;
        const end = (11 * (index + 1)) + index;
    
        return {
            num: barCode.substring(start, end),
            DV: barCode.substring(end, end + 1),
        };
    });

    const validBlocos = blocos.every(e => modulo(e.num) === Number(e.DV));
    return validBlocos && validDV;
}

export function isValidBoletoArrecacao(barCode) {
    let isValid = false;
    let barCodeSemDV = barCode;

    if (barCode.length === 44) {
        isValid = validaCodigoBarras(barCode);
    }
  
    if (barCode.length === 48) {
        isValid = validaLinhaDigitavel(barCode);
        barCodeSemDV = removeDV(barCode);
    }

    if (isValid) {
        const valor = barCodeSemDV.substring(5, 15);
        const data = barCodeSemDV.substring(19, 27);

        //Primeiros 8 dígitos a do campo livre
        const vencimento = data.substring(6,8) + '/' +
                           data.substring(4,6) + '/' +
                           data.substring(0,4);

        let patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
        if(!patternData.test(vencimento)){
            vencimento = "" 
        }

        return {
            barCode,
            valor,
            vencimento
        }
    }

    return isValid;
}


function removeDV(barCode) {
    let codigo = barCode;

    codigo = removeByIndex(codigo, 11)
    codigo = removeByIndex(codigo, 22)
    codigo = removeByIndex(codigo, 33)
    codigo = removeByIndex(codigo, 44)

    return codigo
}

function removeByIndex(str,index) {
    return str.slice(0,index) + str.slice(index+1);
}