const { default: axios } = require("axios");

export const fipeAPI = "https://veiculos.fipe.org.br/api/veiculos";
export var marcas = [];
export var modelos = [];
export var anos = []
export const tipos = { carro: 1, moto: 2, caminhao: 3 }

export var referencia = '';

export var referencias = []

export var veiculo = {}

export async function loadMarcas(referencia, tipoVeiculo) {
    try {
        const form = new FormData();
        form.append("codigoTabelaReferencia", parseInt(referencia, 10));
        form.append("codigoTipoVeiculo", parseInt(tipoVeiculo, 10));

        const { data } = await axios.post(`${fipeAPI}/ConsultarMarcas`, form);
        console.log(data);
        marcas = data;


    } catch (err) {
        console.log("loadMarcas error", err);
    }
}

export async function loadReferencias() {
    try {
        const { data } = await axios.post(`${fipeAPI}/ConsultarTabelaDeReferencia`);
        console.log(data);

        referencias = data;
        referencia = data[0];
    } catch (err) {
        console.log("loadReferencia error", err);
    }
}

export async function loadAnos(referencia, tipo, marca, modelo) {
    try {
        console.log(referencia),
        console.log(tipo),
        console.log(marca)
        console.log(modelo)
        const form = new FormData();
        form.append("codigoTabelaReferencia", parseInt(referencia, 10));
        form.append("codigoTipoVeiculo", parseInt(tipo, 10));
        form.append("codigoMarca", parseInt(marca, 10));
        form.append("codigoModelo", parseInt(modelo, 10));

        const { data } = await axios.post(`${fipeAPI}/ConsultarAnoModelo`, form);
        console.log(data);
        anos = data;


    } catch (err) {
        console.log("loadAnos error", err);
    }
}

export async function loadVeiculo(referencia, tipo, marca, modelo, ano) {
    try {
        const [anoModelo, codigoTipoCombustivel] = ano.split("-");
        console.log({referencia,tipo,marca,modelo,ano,anoModelo,codigoTipoCombustivel})
        const form = new FormData();
        form.append("codigoTabelaReferencia", parseInt(referencia, 10));
        form.append("codigoTipoVeiculo", parseInt(tipo, 10));
        form.append("codigoMarca", parseInt(marca, 10));
        form.append("codigoModelo", parseInt(modelo, 10));
        form.append("ano", ano);
        form.append("anoModelo", parseInt(anoModelo, 10));
        form.append("codigoTipoCombustivel", parseInt(codigoTipoCombustivel, 10));
        form.append("tipoConsulta", "tradicional");
        console.log(form.toString())

        const { data } = await axios.post(
            `${fipeAPI}/ConsultarValorComTodosParametros`,
            form
        );
        console.log(data);
        veiculo = data;

        return veiculo;
    } catch (err) {
        console.log("loadVeiculo error", err);
    }
}

export async function loadModelos(_referencia, _tipoVeiculo, _marca) {
    try {
        console.log(_referencia);
        console.log(_tipoVeiculo);
        console.log(_marca);
        const form = new FormData();
        form.append("codigoTabelaReferencia", parseInt(_referencia, 10));
        form.append("codigoTipoVeiculo", parseInt(_tipoVeiculo, 10));
        form.append("codigoMarca", parseInt(_marca, 10));
        console.log(form)
        const { data: { Modelos: data }, } = await axios.post(`${fipeAPI}/ConsultarModelos`, form);
        console.log(data);
        modelos = data;

    } catch (err) {
        console.log("loadModelos error", err);
    }
}

