const { default: axios } = require("axios");

export const fipeAPI = "https://veiculos.fipe.org.br/api/veiculos";
export var marcas = [];
export var modelos = [];
export var anos = [];
export const tipos = { carro: 1, moto: 2, caminhao: 3 };

export var referencia = "";

export var referencias = [];

export var veiculo = {};

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
    console.log(referencia);
    const [anoModelo, codigoTipoCombustivel] = ano.split("-");
    const params = { referencia, tipo, marca, modelo, ano, anoModelo, codigoTipoCombustivel };
    const form = new FormData();
    form.append("codigoTabelaReferencia", parseInt(referencia, 10));
    form.append("codigoTipoVeiculo", parseInt(tipo, 10));
    form.append("codigoMarca", parseInt(marca, 10));
    form.append("codigoModelo", parseInt(modelo, 10));
    form.append("ano", ano);
    form.append("anoModelo", parseInt(anoModelo, 10));
    form.append("codigoTipoCombustivel", parseInt(codigoTipoCombustivel, 10));
    form.append("tipoConsulta", "tradicional");

    const { data } = await axios.post(`${fipeAPI}/ConsultarValorComTodosParametros`, form);
    console.log(data);
    veiculo = data;
    veiculo.params = params;

    return veiculo;
  } catch (err) {
    console.log("loadVeiculo error", err);
  }
}

export async function loadModelos(_referencia, _tipoVeiculo, _marca, _ano) {
  try {
    
    //codigoTipoVeiculo=1&codigoTabelaReferencia=285&codigoModelo=&codigoMarca=4&ano=&codigoTipoCombustivel=&anoModelo=&modeloCodigoExterno
    //codigoTipoVeiculo=1&codigoTabelaReferencia=285&codigoModelo=&codigoMarca=23&ano=1985-1&codigoTipoCombustivel=1&anoModelo=1985&modeloCodigoExterno=

    const form = new FormData();
    form.append("codigoTabelaReferencia", parseInt(_referencia, 10));
    form.append("codigoTipoVeiculo", parseInt(_tipoVeiculo, 10));
    form.append("codigoMarca", parseInt(_marca, 10));
    if (_ano) {
      const [anoModelo, codigoTipoCombustivel] = _ano.split("-");
      form.append("ano", _ano);
      form.append("codigoTipoCombustivel", parseInt(codigoTipoCombustivel, 10));
      form.append("anoModelo",parseInt(anoModelo,10 ));
      form.append("modeloCodigoExterno", "");
    }else{
        form.append("ano", "");
        form.append("codigoTipoCombustivel", "");
        form.append("anoModelo", "");
        form.append("modeloCodigoExterno", "");
    }
    if (_ano){
        return loadModelosFromAnos(form)
    }


    console.log(form);
    const response = await axios.post(`${fipeAPI}/ConsultarModelos`, form);
    console.log(response.data);
    modelos = response.data.Modelos;
    return response.data;
  } catch (err) {
    console.log("loadModelos error", err);
  }

}

export async function loadModelosFromAnos(form) {
    try {       

        const { data } = await axios.post(`${fipeAPI}/ConsultarModelosAtravesDoAno`, form);
        console.log(data);
        modelos = data.Modelos;
        return {Modelos: data};
    } catch (err) {
        console.log("loadModelos error", err);
    }
}