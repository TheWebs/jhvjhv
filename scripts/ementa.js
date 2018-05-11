﻿/** Classe Prato */
/**
 * @class Representa um prato da ementa
 * @constructs Prato
 * @property {string} nome - nome do prato
 * @property {TipoPrato} tipo - tipo do prato.
 * @property {number} preco - preço do prato.
 */
function Prato(nome, tipo, preco) {
    /** @todo Completar */
    if(verificaTipo(tipo) && nome && preco >= 0)
    {
        this.nome = nome;
        this.tipo = tipo;
        this.preco = preco;
    }
}

/** Propriedades e Métodos de Classe */
/**
 * @param {Prato} tipo - verifica se válido 
 * @property {string} cabecalhoTabela - devolve uma String com código HTML para construir uma linha de cabeçalho 
 */
function verificaTipo(tipo){
    tipoUp = tipo.toUpperCase();
    if(tipoUp==="B" || tipoUp==="P" || tipoUp==="E" || tipoUp==="S"){
        return true;
    }
    return false;
}

/** Propriedades e Métodos de Classe */
/**
 * @param {Prato} prato - prato para sacar os atributos
 * @property {string} cabecalhoTabela - devolve uma String com código HTML para construir uma linha de cabeçalho 
 */
Prato.cabecalhoTabela = function (prato) {
    /** @todo Completar */
    return "<tr><th>nome</th><th>tipo</th><th>preco</th></tr>";
};

/** Métodos de Instância */
/**
 * Representação da informação de um prato sob a forma do código HTML para construir uma linha de tabela
 * @returns {string} representação da informação de um prato sob a forma do código HTML para construir uma linha de tabela.
 */
Prato.prototype.toString = function () {
    /** @todo Completar */
    var texto = "<tr>";
    for(propriedade in this){
        if(!(this[propriedade] instanceof Function))
            texto +=  "<td>" + this[propriedade] + "</td>";
    }
    texto += "</tr>";
    return texto;
};

/** Classe Ementa */
/**
 * @class Representa a ementa do restaurante
 * @constructs Ementa
 * @property {Prato[]} pratos - pratos da ementa
 */
function Ementa() {
    this.pratos = [];
}

/** Métodos de Instância */
/**
 * Cria uma string com código HTML para construir uma tabela com a informação de todos os pratos 
 * @returns {string} código HTML para construir uma tabela com a informação de todos os pratos da ementa.
 */
Ementa.prototype.listarPratos = function () {
    if (this.pratos.length === 0) {
        return "";
    } else {
        var resultado = "<table><thead>" + Prato.cabecalhoTabela(this.pratos[0]) + "</thead>";
        this.pratos.forEach(function (currentValue, index, array) {
            resultado += currentValue; 
        });
        return (resultado += "</table>");
    }
};

/**
 * Acrescenta um prato à ementa.
 * @param {Prato} prato - prato para acrescentar à ementa. 
 */
Ementa.prototype.acrescentarPrato = function (prato) {
    /** @todo Completar */
    this.pratos.push(prato);
    return this;
};

/** Acrescenta diversos pratos à ementa
 * @param {...Prato} pratos - pratos para acrescentar à ementa. 
 */
Ementa.prototype.acrescentarPratos = function (pratos) {
    pratos = Array.prototype.slice.call(arguments); //Transformar o "arguments" num array para poder usar o forEach
    pratos.forEach(function (currentValue, index, array) {
            this.acrescentarPrato(currentValue);
        },
        this); //Indicar que a ementa atual será o this dentro de cada chamada à função anterior
    return this;
};

/**
 * Remove pratos à ementa
 * @param {string} nome - nome de prato que servirá para selecionar os pratos a remover.
 */
Ementa.prototype.removerPrato = function (nome) {
    /** @todo Completar */
    for(var i = 0; i<this.pratos.length; i++)
    {
        if(this.pratos[i].nome === nome)
        this.pratos.splice(i, 1);
    }
};

/** Apresenta, via alert, a informação (nome e preço) dos pratos da ementa
 * @param {string} nome - parte de um nome de prato que servirá como padrão para selecionar os pratos a apresentar. 
 */
Ementa.prototype.procurarPrato = function (nome) {
    /** @todo Completar */
    for(var i = 0; i < this.pratos.length; i++)
    {
        if(nome === this.pratos[i].nome)
            alert(this.pratos[i].preco + "€");
    }
};

/** Métodos de Classe
 * Coloca a informação da ementa, em formato de tabela, no div com id="pratos" 
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.apresentar = function (ementa) {
    ementa = ementa || Ementa.omissao;
    document.getElementById("pratos").innerHTML = ementa.listarPratos();
};

/**Acrescenta um prato à ementa. A informação do prato será pedida ao utilizador através de "prompt"
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.acrescentar = function (ementa) {
    ementa = ementa || Ementa.omissao;
    var informacao = prompt("Indique os dados do prato a adicionar:", "<nome>|<tipo: E-Entrada/B-Bebida/P-Prato Principal/S-Sobremesa>|<preço>");
    if (informacao) {
        var campos = informacao.split("|");
        if (campos.length !== 3)
            alert("Dados mal introduzidos. Devia ser '<nome>|<tipo: E-Entrada/B-Bebida/P-Prato Principal/S-Sobremesa>|<preço>'!");
        else {
            ementa.acrescentarPrato(new Prato(campos[0], campos[1], campos[2]));
            Ementa.apresentar(ementa);
        }
    }
};

/** Remove pratos à ementa. A informação dos nome dos pratos a remover será pedida ao utilizador através de "prompt"
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.remover = function (ementa) {
   /** @todo Completar */
   ementa = ementa || Ementa.omissao;
   var nome = prompt("Introduza o nome do prato a remover");
   if(nome)
   ementa.removerPrato(nome);
   Ementa.apresentar(ementa);
};

/** Apresenta, via alert, a informação (nome e preço) dos pratos da ementa. A informação dos nome dos pratos a apresentar será pedida ao utilizador através de "prompt"
 * @memberof Ementa
 * @param {Ementa} [ementa=Ementa.omissao] - ementa para apresentar a informação.
 */
Ementa.procurar = function (ementa) {
    /** @todo Completar */
    ementa = ementa || Ementa.omissao;
    var nome = prompt("Introduza o nome do prato a remover");
    ementa.procurarPrato(nome);
};

/** @memberof Ementa
 * @property {Ementa} omissao - Ementa por omissão: contém os dados de teste.
 */
Ementa.omissao = (new Ementa()).acrescentarPratos(
    new Prato("Choco Frito", "P", 15.0),
    new Prato("Mousse de Chocolate", "S", 2.5),
    new Prato("Pão", "E", 0.8),
    new Prato("JMF Reserva", "B", 5.2)
);