class Cadastros{
    constructor(tipo,nf,data,cliente,remetente,cidade,destinatario,uf,prazo){
        this.tipo = tipo
        this.nf = nf
        this.data = data
        this.cliente = cliente
        this.remetente = remetente
        this.cidade = cidade
        this.destinatario = destinatario
        this.uf = uf
        this.prazo = prazo
    }

    validaDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class bancoDeDados{
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id',0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(c){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(c))
        localStorage.setItem('id', id)
    }

    leDados(){
       let leitura = Array()
       let id = localStorage.getItem('id')
       for(let i=1; i<=id; i++){
           let Cad = JSON.parse(localStorage.getItem(i))
           if(Cad === null){continue}
           leitura.push(Cad)
       }
       return (leitura)
    }

    pesquisa(c){
        let filtro = Array()
        filtro = this.leDados()
        
        if(cadastro.tipo !=''){filtro = filtro.filter(c=> c.tipo == cadastro.tipo)}
        if(cadastro.nf !=''){filtro = filtro.filter(c=> c.nf == cadastro.nf)}
        if(cadastro.data !=''){filtro = filtro.filter(c=> c.data == cadastro.data)}
        if(cadastro.cliente !=''){filtro = filtro.filter(c=> c.cliente == cadastro.cliente)}
        if(cadastro.remetente !=''){filtro = filtro.filter(c=> c.remetente == cadastro.remetente)}
        if(cadastro.cidade !=''){filtro = filtro.filter(c=> c.cidade == cadastro.cidade)}
        if(cadastro.destinatario !=''){filtro = filtro.filter(c=> c.destinatario == cadastro.destinatario)}
        if(cadastro.uf !=''){filtro = filtro.filter(c=> c.uf == cadastro.uf)}

        return(filtro)
    }
}

bd = new bancoDeDados() // escopo global

function Enviar(){
    let tipo = document.getElementById('tipo')
    let nf = document.getElementById('nf')
    let data = document.getElementById('data')
    let cliente = document.getElementById('cliente')
    let remetente = document.getElementById('remetente')
    let cidade = document.getElementById('cidade')
    let destinatario = document.getElementById('destinatario')
    let uf = document.getElementById('uf')
    let prazo = document.getElementById('prazo')

    cadastro = new Cadastros(
        tipo.value,
        nf.value,
        data.value,
        cliente.value,
        remetente.value,
        cidade.value,
        destinatario.value,
        uf.value,
        prazo.value
    )

    if(cadastro.validaDados()){
        alert('Dados Salvos com sucesso!')
        bd.gravar(cadastro)
        tipo.value = '';
        nf.value = '';
        data.value = '';
        cliente.value = '';
        remetente.value = '';
        cidade.value = '';
        destinatario.value = '';
        uf.value = '';
        prazo.value ='';
    } else{
        alert('Erro ao salvar dados!, por favor preencher todos os campos!')
        tipo.value = '';
        nf.value = '';
        data.value = '';
        cliente.value = '';
        remetente.value = '';
        cidade.value = '';
        destinatario.value = '';
        uf.value = '';
        prazo.value ='';
    }
}

function ListarDados(registros = Array(), erro = false){
    if(registros.length == 0 && erro == false){
        registros = bd.leDados()
    }
    
    let tabela = document.getElementById('tabela')
    tabela.innerHTML = ''
    registros.forEach(function(r){
        let linhas = tabela.insertRow()
        linhas.insertCell(0).innerHTML = r.tipo
        linhas.insertCell(1).innerHTML = r.nf
        linhas.insertCell(2).innerHTML = r.data
        linhas.insertCell(3).innerHTML = r.cliente
        linhas.insertCell(4).innerHTML = r.remetente
        linhas.insertCell(5).innerHTML = r.cidade
        linhas.insertCell(6).innerHTML = r.destinatario
        linhas.insertCell(7).innerHTML = r.uf
        linhas.insertCell(8).innerHTML = r.prazo
    })
}

function Pesquisar(){
    let tipo = document.getElementById('ptipo').value
    let nf = document.getElementById('pnf').value
    let data = document.getElementById('pdata').value
    let cliente = document.getElementById('pcliente').value
    let remetente = document.getElementById('premetente').value
    let cidade = document.getElementById('pcidade').value
    let destinatario = document.getElementById('pdestinatario').value
    let uf = document.getElementById('puf').value

    cadastro = new Cadastros(
        tipo,
        nf,
        data,
        cliente,
        remetente,
        cidade,
        destinatario,
        uf
    )
        

    registros = bd.pesquisa(cadastro)
    ListarDados(registros, true)
}

function LimparDados(){
    tipo.value = '';
    nf.value = '';
    data.value = '';
    cliente.value = '';
    remetente.value = '';
    cidade.value = '';
    destinatario.value = '';
    uf.value = '';
    prazo.value ='';
}