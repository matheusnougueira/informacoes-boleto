import { isValidBoletoArrecacao } from "./TicketCollection.js";
import { isValidBoletoBancario } from "./bankSlip.js";
import { converterValores } from "./Converters.js"

export function IsValid(barCode) {
    if (!barCode){
        return {
            message: "Ops! o boleto não foi informado.",
            status: "erro"
        }
    }

    if (isNaN(barCode)){
        return {
            message: "Ops! Digite somente números.",
            status: "erro"
        }
    }

    let result;

    if (barCode[0] == "8"){
        result = isValidBoletoArrecacao(barCode);
    } 
    else {
        result = isValidBoletoBancario(barCode);
    }

    if (!result){
        return {
            message: "Ops! O boleto é inválido!",
            status: "erro"
        }
    }

    const boleto = converterValores(result);

    return boleto;
}

