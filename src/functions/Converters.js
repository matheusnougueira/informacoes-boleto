export function convertToBoletoArrecadacao(barCode) {
	let codigoBarras = '';
	for (let index = 0; index < 4; index++) {
		const start = (11 * (index)) + index;
		const end = (11 * (index + 1)) + index;
		codigoBarras += barCode.substring(start, end);
	}
	return codigoBarras;
}

export function convertToBoletoBancario(barCode) {
	let codigoBarras = '';
	codigoBarras += barCode.substring(0, 3);
	codigoBarras += barCode.substring(3, 4);
	codigoBarras += barCode.substring(32, 33);
	codigoBarras += barCode.substring(33, 37);
	codigoBarras += barCode.substring(37, 47);
	codigoBarras += barCode.substring(4, 9);
	codigoBarras += barCode.substring(10, 20);
	codigoBarras += barCode.substring(21, 31);
	return codigoBarras;
}

export function converterValores(boleto) {
	let expirationDate = "";
	if (Number(boleto.fatorVencimento) > 0) {
		const date = new Date('1997-10-07');
		date.setDate(date.getDate() + Number(boleto.fatorVencimento) + 1);
		expirationDate = ("0" + (date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
	}

	let valor = 0;
	if (!isNaN(boleto.valor) > 0) {
		const qtdeNumeros = boleto.valor.toString().length;
		valor = Number(boleto.valor.substring(0, qtdeNumeros - 2) + "." + boleto.valor.substring(qtdeNumeros - 2, qtdeNumeros))
	}

	return {
		barCode: boleto.barCode,
		amount: valor,
		expirationDate,
	}
}
