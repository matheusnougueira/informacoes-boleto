import { IsValid } from "../functions/index.js";

export async function get(req, res, next) {
    let codBoleto = req.params.codBoleto;

    codBoleto.replace(/( |-)/g, '');

    var result = IsValid(codBoleto)

    if (result.status === 'erro'){
        return res.status(400).send(result)
    }

    return res.status(200).send(result)
}