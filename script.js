const modal = window.document.querySelector('.modal-container');
const modalEdicao = window.document.querySelector('#modal-edicao');

const btnsalvar = window.document.getElementById('btnsalvar');
const btnsalvarEdit = window.document.getElementById('btnsalvaredit');

const btnfechar = window.document.getElementById('btnfechar');
const btnfecharEdit = window.document.getElementById('btnfecharedit');

const nome = window.document.getElementById('nome');
const nomeEdit = window.document.getElementById('nomeedit');

const funcao = window.document.getElementById('funcao');
const funcaoEdit = window.document.getElementById('funcaoedit');

const salario = window.document.getElementById('salario');
const salarioEdit = window.document.getElementById('salarioedit');

const tabela = window.document.getElementById('table');


let funcionarios = [];
let index = 0;


function carregarItens() {
    let ConsultaDados = localStorage.getItem('db_func');
    let ConverteDados = JSON.parse(ConsultaDados);
    //console.log(conv)
    if(ConsultaDados === null){
        return
    } else {
        ConverteDados.forEach(function(item){

            addTabela(item.Nome, item.Funcao, item.Salario);
            //console.log(item.Nome, item.Funcao, item.Salario);
        })
    }
    
}

carregarItens();

function Cadastrar() {

    funcionarios.push({'Nome':nome.value, 'Funcao':funcao.value, 'Salario':salario.value});

    //Verifica se o localStorage está vazio, se estiver, adiciona o array como valor
    if(localStorage.getItem('db_func') === null){

        localStorage.setItem('db_func', JSON.stringify(funcionarios));

        addTabela(nome.value, funcao.value, salario.value);

    } else { //caso já tenha dados, adiciona novos objetos ao array já existente

        //criando um novo objeto
        let novoObj = {Nome:nome.value, Funcao:funcao.value, Salario:salario.value}
        
        let ConsultaDados = localStorage.getItem('db_func');
        let ConverteDados = JSON.parse(ConsultaDados);

        ConverteDados.push(novoObj);
        localStorage.setItem('db_func', JSON.stringify(ConverteDados));
        
        //console.log(ConverteDados);
        addTabela(nome.value, funcao.value, salario.value);
    }

}

function addTabela(n, f, s) {
    let tr = document.createElement('tr');

    tr.innerHTML = `<td> ${n}</td>
                       <td> ${f}</td>
                       <td>R$ ${s}</td>
                       <td><button id="edit-${index}" class="acao" onclick="editar(this.id)">
                       <i class="bx bxs-edit"></i>
                       </button>
                       <button id="del-${index}" class="acao" onclick="deletar(this.id)">
                       <i class="bx bxs-trash"></i>
                       </button></td>`;

    tabela.appendChild(tr);
    index = index + 1;
}


//Chama janela modal no botão cadastrar
function modalCad() {
    modal.style.display = 'flex'
    nome.focus()
}

//habilita o botão salvar
function habilitar() {
    if(nome.value.length != 0 &&
       funcao.value.length != 0 && 
       salario.value.length != 0){

        btnsalvar.disabled = false

    } else {
        btnsalvar.disabled = true
    }
}

function habilitarEdit() {
    if(nomeEdit.value.length != 0 &&
        funcaoEdit.value.length != 0 && 
        salarioEdit.value.length != 0){
 
         btnsalvarEdit.disabled = false
 
     } else {
         btnsalvarEdit.disabled = true
     }
}

function deletar(index) {

    /*let separar = index.split(""); //separando caracteres do id
    let id = separar[4]; //buscando caractere na posição 4
    let indexConvert = Number(id); //convertendo para número */
    let excluir = window.confirm('Os dados serão excluídos permanentemente! Deseja prosseguir?');

    let separar = index.replace(/[^0-9]/g, ''); //separando números dos caracteres
    let indexConvert = parseInt(separar); //convertendo String para Inteiro

    let ConsultaDados = localStorage.getItem('db_func');
    let ConverteDados = JSON.parse(ConsultaDados);

    if(excluir == true){

        ConverteDados.splice(indexConvert, 1);

        localStorage.setItem('db_func', JSON.stringify(ConverteDados));
        console.log(ConverteDados);

        delTabela();
        carregarItens();
        
    }else {
        return;
    }
}
 

function delTabela() {

    let tablerows = document.querySelectorAll('#table tr');
    tablerows.forEach(function(row){
        if(row.id != 'cabecalho'){
             row.parentNode.removeChild(row);
             index = 0;
        }     
    })

}

function editar(index) {
    modalEdicao.style.display = 'flex';
    btnsalvarEdit.disabled = false;

    let separar = index.replace(/[^0-9]/g, '');
    let indexConvert = parseInt(separar);

    let ConsultaDados = localStorage.getItem('db_func');
    let ConverteDados = JSON.parse(ConsultaDados);

    let novoNome;
    let novaFunc;
    let novoSal;

    nomeEdit.value = ConverteDados[indexConvert].Nome;
    novoNome = nomeEdit.value;

    funcaoEdit.value = ConverteDados[indexConvert].Funcao;
    novaFunc = funcaoEdit.value;

    salarioEdit.value = ConverteDados[indexConvert].Salario;
    novoSal = salarioEdit.value;


    nomeEdit.addEventListener('change', (e)=> {
        novoNome = e.target.value;
        console.log(novoNome);
    })

    funcaoEdit.addEventListener('change', (e)=> {
        novaFunc = e.target.value;
        console.log(novaFunc);
    })

    salarioEdit.addEventListener('change', (e)=> {
        novoSal = e.target.value;
        console.log(novoSal);  
    })

    btnsalvarEdit.addEventListener('click', function() {

        let novoObj = {Nome:novoNome, Funcao:novaFunc, Salario:novoSal};
        console.log(novoObj);

        ConverteDados.splice(indexConvert, 1, novoObj);
        localStorage.setItem('db_func', JSON.stringify(ConverteDados));

        delTabela();
        carregarItens();

        modalEdicao.style.display = 'none';
    })

}

btnsalvar.addEventListener('click', function() {
    //modal.style.display = 'none'
    Cadastrar();

    nome.value = '';
    funcao.value = '';
    salario.value = '';

    nome.focus();
    btnsalvar.disabled = true
})


btnfechar.addEventListener('click', function() {
    modal.style.display = 'none';
    nome.value = '';
    funcao.value = '';
    salario.value = '';
})

btnfecharEdit.addEventListener('click', ()=> {
    modalEdicao.style.display = 'none';
    nomeEdit.value = '';
    funcaoEdit.value = '';
    salarioEdit.value = '';
})