const bancoDePalavras = [
    "ABRIR", "AJUDA", "ALUNO", "AMIGO", "ANDAR", "ANTES", "APOIO", "ARROZ", "ASSIM", "ATIVO", "AZUL",
    "BANHO", "BARCO", "BEIJO", "BOLSA", "BOLSO", "BRACO", "BRASA", "BRAVO", "BRISA", "CALMA", "CAMPO",
    "CANTO", "CARNE", "CARRO", "CARTA", "CASAL", "CAUSA", "CEDER", "CENSO", "CERTO", "CHEFE", "CHEIO",
    "CHUVA", "CICLO", "CINTO", "CINZA", "CLARO", "CLIMA", "CONTA", "CORPO", "CORTE", "COURO", "CRIME",
    "CRISE", "CULPA", "CURSO", "CURTO", "CUSTO", "DANCA", "DADOS", "DEIXA", "DELE", "DELTA", "DENSO",
    "DEUSA", "DIETA", "DIGNO", "DIZER", "DONO", "DROGA", "DUELO", "DUQUE", "ENTAO", "FALAR", "FALSO",
    "FAROL", "FESTA", "FICAR", "FILHO", "FILME", "FINAL", "FIXAR", "FORCA", "FORMA", "FORTE", "FUNDO",
    "FURIA", "FUSCA", "GANHO", "GARRA", "GASTO", "GENTE", "GESTO", "GRAVE", "GRITO", "GRUPO",
    "HAVER", "HEROI", "HORAS", "IDEIA", "IDOSO", "IGUAL", "IMPAR", "IRADO", "JOGAR", "JOVEM", "JUIZO",
    "JULHO", "JUNHO", "JUSTO", "LABIO", "LANCE", "LAPIS", "LARGO", "LASER", "LEGAL", "LEITE", "LEITO",
    "LEMBRE", "LENTO", "LERDO", "LESAO", "LESTE", "LETRA", "LEVAR", "LIDAR", "LIMPO", "LINDA", "LINDO",
    "LISTA", "LIVRE", "LIVRO", "LOCAL", "LONGE", "LOUCA", "LOUCO", "LUGAR", "MAGIA", "MAIOR", "MAMAE",
    "MANHA", "MARCA", "MARCO", "MEDIR", "MEDO", "MEIGO", "MESMO", "METAL", "METER", "METRO", "MORAL",
    "MORAR", "MORTE", "MOTOR", "MUNDO", "MURAL", "NASCI", "NAVAL", "NEGAR", "NEVAR", "NINHO", "NIVEL",
    "NOBRE", "NOITE", "NORTE", "NOSSO", "NUNCA", "ONDE", "ONTEM", "PAIOL", "PAPEL", "PARAR", "PARTO",
    "PASMO", "PASSO", "PASTA", "PAUSA", "PEDIR", "PEDRA", "PEIXE", "PENAS", "PENSO", "PRAIA", "PRECO",
    "PRETO", "PROVA", "QUASE", "QUEDA", "QUERO", "RAIVA", "RAPAZ", "REDES", "REGRA", "REINO", "RENDA",
    "RESTO", "ROCHA", "RODAR", "ROSTO", "ROUBA", "ROUPA", "SABER", "SALVE", "SANTO", "SAUDE", "SENHA",
    "SENTI", "SERIO", "SERVE", "SEXTA", "SINAL", "SOBRA", "SOLAR", "SOMAR", "SONDA", "SONHO", "SORTE",
    "SUBIR", "SUTIL", "TARDE", "TECLA", "TELHA", "TEMER", "TEMPO", "TENIS", "TERCO", "TERMO", "TERRA",
    "TESTE", "TRAGO", "TEXTO", "TITIA", "TITIO", "TOMAR", "TOPICO", "TORNO", "TOTAL", "TOURO", "LINHA",
    "TRATO", "TREVO", "TRONO", "TURMA", "TURVO", "UMIDO", "UNIAO", "UNICO", "URGIR", "USADO", "VAGAS",
    "VALER", "VALOR", "VAMOS", "VASTO", "VELHO", "VENDA", "VENTO", "VERAO", "VERBO", "VERDE", "VIDRO",
    "VIGOR", "VINHO", "VINTE", "VIRAR", "VISTA", "VIVER", "VOLTA", "VOTOS", "VOZES", "ZERAR", "ZONZO"
];

function escolherPalavraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * bancoDePalavras.length);
    return bancoDePalavras[indiceAleatorio];
}

const palavra1 = escolherPalavraAleatoria();
const palavra2 = escolherPalavraAleatoria();

const palavrasSecretas = [palavra1, palavra2];
const numeroDeTentativas = 7;
const inputsPorLinha = 5;

/*DOM*/
const linhasGrade1 = document.querySelectorAll('#grade-letras-1 .linha');
const linhasGrade2 = document.querySelectorAll('#grade-letras-2 .linha');
const teclas = document.querySelectorAll('#teclado .tecla');
const botaoApagar = document.querySelector('.apagar');
const botaoEnter = document.querySelector('.enter');

/*Status do jogo*/
let tentativaAtual = 0;
let colunaAtual = 0;
let palavra1Adivinhada = false;
let palavra2Adivinhada = false;

const statusDasLetras = {};

/*Função para bloquear a entrada de letras consideradas como erradas por conta de alguma tentativa */
function lidarComEntradaDeLetra(letra) {
    
    /*Verifica se está errada */
    if (statusDasLetras[letra] === 'errada') {
        return; 
    }
    
    /*Inserindo a letra na grade */
    if (colunaAtual < inputsPorLinha) {
        const inputsDaLinha1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
        const inputsDaLinha2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');
        
        if (!palavra1Adivinhada) {
            inputsDaLinha1[colunaAtual].value = letra;
        }
        if (!palavra2Adivinhada) {
            inputsDaLinha2[colunaAtual].value = letra;
        }
        colunaAtual++;
    }
}

/*Função separada para poder apagar alguma letra */
function lidarComApagar() {
    if (colunaAtual > 0) {
        colunaAtual--;
        const inputsDaLinha1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
        const inputsDaLinha2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');

        if (!palavra1Adivinhada) {
            inputsDaLinha1[colunaAtual].value = '';
        }
        if (!palavra2Adivinhada) {
            inputsDaLinha2[colunaAtual].value = '';
        }
    }
}

/*Função separa para poder dar enviar a tentativa */
function lidarComEnter() {
    if (colunaAtual === inputsPorLinha) {
        verificarPalavras();
    }
}

/*Função mais optimizada e organizada para poder puxar outras funções */
function lidarComCliqueDaTecla(event) {
    let textoTecla;
    if (event.target.tagName === 'IMG') {
        textoTecla = "Apagar";
    } else {
        textoTecla = event.target.textContent;
    }

    if (textoTecla === 'ENTER') {
        lidarComEnter();
    } else if (textoTecla === 'Apagar') {
        lidarComApagar();
    } else {
        lidarComEntradaDeLetra(textoTecla);
    }
}

/*Função para poder verificar se o jogador acertou alguma grade */
function verificarPalavras() {
    const inputsDaLinha1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
    const inputsDaLinha2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');
    let palavraDigitada = '';

    const inputsReferencia = !palavra1Adivinhada ? inputsDaLinha1 : inputsDaLinha2;
    for (let i = 0; i < inputsPorLinha; i++) {
        palavraDigitada += inputsReferencia[i].value;
    }

    if (!palavra1Adivinhada) {
        avaliarTentativa(palavraDigitada, palavrasSecretas[0], inputsDaLinha1);
        if (palavraDigitada === palavrasSecretas[0]) {
            palavra1Adivinhada = true;
            desativarGrade(linhasGrade1);
        }
    }

    if (!palavra2Adivinhada) {
        avaliarTentativa(palavraDigitada, palavrasSecretas[1], inputsDaLinha2);
        if (palavraDigitada === palavrasSecretas[1]) {
            palavra2Adivinhada = true;
            desativarGrade(linhasGrade2);
        }
    }

    /*Função para atualizar as cores das teclas, para poder guiar o jogador em qual tecla pode usar */
    atualizarTeclado();

    /*Mensagem de vitoria caso as duas variaveis for igual a True */
    if (palavra1Adivinhada && palavra2Adivinhada) {
        alert("Você venceu! Parabéns por encontrar as duas palavras!");
        desativarTeclado();
    } 

    /*Passa para a proxima tentativa */
    else if (tentativaAtual < numeroDeTentativas - 1) {
        tentativaAtual++;
        colunaAtual = 0;

        /*Muda a linha das grades, caso a palavra não tenha sido adivinhada */
        if (!palavra1Adivinhada) {
            const proximaLinhaInputs1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
            proximaLinhaInputs1.forEach(input => {
                input.classList.remove('espera');
                input.classList.add('ativa');
            });
        }

        if (!palavra2Adivinhada) {
            const proximaLinhaInputs2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');
            proximaLinhaInputs2.forEach(input => {
                input.classList.remove('espera');
                input.classList.add('ativa');
            });
        }
    } 
    /*Caso de tentativas igual a 0, anunciar derrota */
    else {
        alert("Você perdeu! As palavras eram: " + palavrasSecretas[0] + " e " + palavrasSecretas[1]);
        desativarTeclado();
    }
}

/*Verificação de cada letra do input*/
function avaliarTentativa(palavraDigitada, palavraSecreta, inputsDaLinha) {
    for (let i = 0; i < inputsPorLinha; i++) {
        const letraInput = inputsDaLinha[i];
        const letraDigitada = palavraDigitada[i];
        letraInput.classList.remove('ativa');
        
        /*Verificação se a letra já tem algum tipo de status */
        const statusAtual = statusDasLetras[letraDigitada];

        /*Letra correta*/
        if (palavraSecreta[i] === letraDigitada) {
            letraInput.classList.add('correta');
            statusDasLetras[letraDigitada] = 'correta';
        } 
        
        /*Verifica se a letra está pelo menos presente dentro da palavra secreta */
        else if (palavraSecreta.includes(letraDigitada)) {
            letraInput.classList.add('presente');
            /*Se no statusAtual a letra não for correta adiciona o status de presente, mas se ela for correta
            * por questão de ordem de prioridade mantem o status de correta, para manter a cor do teclado
            */
            if (statusAtual !== 'correta') {
                statusDasLetras[letraDigitada] = 'presente';
            }
        } 
        
        /*Se nenhum dos outros ifs ocorreu a letra não pertence a palavra */
        else {
            letraInput.classList.add('errada');
            if (statusAtual !== 'correta' && statusAtual !== 'presente') {
                statusDasLetras[letraDigitada] = 'errada';
            }
        }
    }
}

/*Atualiza as cores do teclado virtual*/
function atualizarTeclado() {
    teclas.forEach(tecla => {
        const letra = tecla.textContent;
        const status = statusDasLetras[letra];
        if (status) {
            /*Remove as classes já definidas e coloca outros, ou o mesmo em caso de nenhuma mudança */
            tecla.classList.remove('presente', 'errada');
            tecla.classList.add(status);
        }
    });
}

function desativarGrade(linhasDaGrade) {
    linhasDaGrade.forEach(linha => {
        const inputs = linha.querySelectorAll('.letra');
        inputs.forEach(input => {
            input.disabled = true;
        });
    });
}

function desativarTeclado() {
    teclas.forEach(tecla => {
        tecla.removeEventListener('click', lidarComCliqueDaTecla);
        tecla.style.pointerEvents = 'none';
        tecla.style.opacity = '0.6';
    });
    botaoApagar.removeEventListener('click', lidarComCliqueDaTecla);
    botaoApagar.style.pointerEvents = 'none';
    botaoApagar.style.opacity = '0.6';

    botaoEnter.removeEventListener('click', lidarComCliqueDaTecla);
    botaoEnter.style.pointerEvents = 'none';
    botaoEnter.style.opacity = '0.6';

    window.removeEventListener('keydown', lidarComTecladoFisico);
}

/*Receber informação dos botões */
teclas.forEach(tecla => {
    tecla.addEventListener('click', lidarComCliqueDaTecla);
});
botaoApagar.addEventListener('click', lidarComCliqueDaTecla);
botaoEnter.addEventListener('click', lidarComCliqueDaTecla);

/*Caso recarregue a pagina o jogo é resetado, limpando os inputs e também mudando a palavra */
function limparInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
}
window.onload = limparInputs;

function lidarComTecladoFisico(event) {
    const tecla = event.key;

    if (tecla === 'Enter') {
        lidarComEnter();
    } else if (tecla === 'Backspace') {
        lidarComApagar();
    } else if (/^[a-zA-Z]$/.test(tecla)) {
        lidarComEntradaDeLetra(tecla.toUpperCase());
    }
}

/*Receber informações do teclado físico */
window.addEventListener('keydown', lidarComTecladoFisico);


/*JANELA DE REGRAS*/
/*DOM */
const modal = document.getElementById('modal-regras');
const botaoFecharModal = document.querySelector('.fechar-modal');

/*Abrir e fechar a janela de regras */
function abrirModal() {
  modal.style.display = 'flex';
}
function fecharModal() {
  modal.style.display = 'none';
}

/*Aparecer a tela de regras, toda vez que a pagina recarregar */
window.addEventListener('load', abrirModal);

/*Fecha a tela de regras quando clica no X*/
botaoFecharModal.addEventListener('click', fecharModal);