const bancoDePalavras = [
    "ABRIR", "AJUDA", "ALUNO", "AMIGO", "ANDAR", "ANTES", "APOIO", "ARROZ", "ASSIM", "ATIVO", "AZUL",
    "BANHO", "BARCO", "BEIJO", "BOLSA", "BOLSO", "BRACO", "BRASA", "BRAVO", "BRISA", "CALMA", "CAMPO",
    "CANTO", "CARNE", "CARRO", "CARTA", "CASAL", "CAUSA", "CEDER", "CENSO", "CERTO", "CHEFE", "CHEIO",
    "CHUVA", "CICLO", "CINTO", "CINZA", "CLARO", "CLIMA", "CONTA", "CORPO", "CORTE", "COURO", "CRIME",
    "CRISE", "CULPA", "CURSO", "CURTO", "CUSTO", "DANCA", "DADOS", "DEIXA", "DELE", "DELTA", "DENSO",
    "DEUSA", "DIETA", "DIGNO", "DIZER", "DONO", "DROGA", "DUELO", "DUQUE", "ENTAO", "FALAR", "FALSO",
    "FAROL", "FESTA", "FICAR", "FILHO", "FILME", "FINAL", "FIXAR", "FORCA", "FORMA", "FORTE", "FUNDO",
    "FURIA", "FUSCA", "GANHO", "GARRA", "GASTO", "GENTE", "GESTO", "GRAVE", "GRITO", "GRUPO", "HAJA",
    "HAVER", "HEROI", "HORAS", "IDEIA", "IDOSO", "IGUAL", "IMPAR", "IRADO", "JOGAR", "JOVEM", "JUIZO",
    "JULHO", "JUNHO", "JUSTO", "LABIO", "LANCE", "LAPIS", "LARGO", "LASER", "LEGAL", "LEITE", "LEITO",
    "LEMBRE", "LENTO", "LERDO", "LESAO", "LESTE", "LETRA", "LEVAR", "LIDAR", "LIMPO", "LINDA", "LINDO",
    "LISTA", "LIVRE", "LIVRO", "LOCAL", "LONGE", "LOUCA", "LOUCO", "LUGAR", "MAGIA", "MAIOR", "MAMAE",
    "MANHA", "MARCA", "MARCO", "MEDIR", "MEDO", "MEIGO", "MESMO", "METAL", "METER", "METRO", "MORAL",
    "MORAR", "MORTE", "MOTOR", "MUNDO", "MURAL", "NASCI", "NAVAL", "NEGAR", "NEVE", "NINHO", "NIVEL",
    "NOBRE", "NOITE", "NORTE", "NOSSO", "NUNCA", "ONDE", "ONTEM", "PAIOL", "PAPEL", "PARAR", "PARTO",
    "PASMO", "PASSO", "PASTA", "PAUSA", "PEDIR", "PEDRA", "PEIXE", "PENAS", "PENSAR", "PRAIA", "PRECO",
    "PRETO", "PROVA", "QUASE", "QUEDA", "QUERO", "RAIVA", "RAPAZ", "REDE", "REGRA", "REINO", "RENDA",
    "RESTO", "ROCHA", "RODAR", "ROSTO", "ROUBA", "ROUPA", "SABER", "SALVE", "SANTO", "SAUDE", "SENHA",
    "SENTI", "SERIO", "SERVE", "SEXTA", "SINAL", "SOBRA", "SOLAR", "SOMAR", "SONDA", "SONHO", "SORTE",
    "SUBIR", "SUTIL", "TARDE", "TECLA", "TELHA", "TEMER", "TEMPO", "TENIS", "TERCO", "TERMO", "TERRA",
    "TESTE", "TETO", "TEXTO", "TIPO", "TITIO", "TOMAR", "TOPICO", "TORNO", "TOTAL", "TOURO", "TRACA",
    "TRATO", "TREVO", "TRONO", "TURMA", "TURVO", "UMIDO", "UNIAO", "UNICO", "URGIR", "USADO", "VAGAS",
    "VALER", "VALOR", "VAMOS", "VASTO", "VELHO", "VENDA", "VENTO", "VERAO", "VERBO", "VERDE", "VIDRO",
    "VIGOR", "VINHO", "VINTE", "VIRAR", "VISTA", "VIVER", "VOLTA", "VOTO", "VOZES", "ZERAR", "ZONZO"
];

function escolherPalavraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * bancoDePalavras.length);
    
    return bancoDePalavras[indiceAleatorio];
}

const palavra1=escolherPalavraAleatoria();
const palavra2=escolherPalavraAleatoria();

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


function lidarComCliqueDaTecla(event) {
    let textoTecla;
    /*If para poder reconhecer o botão de apagar que possui imagem*/
    if (event.target.tagName === 'IMG') {
        textoTecla = "Apagar";
    }
    /*Caso não tenha imagem vai pegar o texto do botão*/ 
    else {
        textoTecla = event.target.textContent;
    }

    const inputsDaLinha1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
    const inputsDaLinha2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');

    /*Definindo a funcionalidade pro botão de enviar*/
    if (textoTecla === 'ENTER') {
        if (colunaAtual === inputsPorLinha) {
            verificarPalavras();
        }
    }

    /*Funcionalidade para o botão de apagar */
    else if (textoTecla === 'Apagar') {
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

    /*Codigo para passar para a proxima linha */
    else if (colunaAtual < inputsPorLinha) {
        if (!palavra1Adivinhada) {
            inputsDaLinha1[colunaAtual].value = textoTecla;
        }
        if (!palavra2Adivinhada) {
            inputsDaLinha2[colunaAtual].value = textoTecla;
        }
        colunaAtual++;
    }
}

function verificarPalavras() {
    const inputsDaLinha1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
    const inputsDaLinha2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');
    let palavraDigitada = '';

    const inputsReferencia = !palavra1Adivinhada ? inputsDaLinha1 : inputsDaLinha2;
    for (let i = 0; i < inputsPorLinha; i++) {
        palavraDigitada += inputsReferencia[i].value;
    }

    /*Verifica se a palavra da grade 1 foi adivinhada e se for verdade desativa a grade toda */
    if (!palavra1Adivinhada) {
        avaliarTentativa(palavraDigitada, palavrasSecretas[0], inputsDaLinha1);
        if (palavraDigitada === palavrasSecretas[0]) {
            palavra1Adivinhada = true;
            desativarGrade(linhasGrade1);
        }
    }

    /*Verifica se a palavra da grade 2 foi adivinhada e se for verdade desativa a grade toda */
    if (!palavra2Adivinhada) {
        avaliarTentativa(palavraDigitada, palavrasSecretas[1], inputsDaLinha2);
        if (palavraDigitada === palavrasSecretas[1]) {
            palavra2Adivinhada = true;
            desativarGrade(linhasGrade2);
        }
    }

    /*Condição de vitória */
    if (palavra1Adivinhada && palavra2Adivinhada) {
        alert("Você venceu! Parabéns por encontrar as duas palavras!");
        desativarTeclado();
    }
    /*Joga o jogador para a proxima rodada de tentativas dele */
    else if (tentativaAtual < numeroDeTentativas - 1) {
        tentativaAtual++;
        colunaAtual = 0;

        /*Se a palavra da grade1 não está no jogo ele ativa a proxima linha para mais tentativas */
        if (!palavra1Adivinhada) {
            const proximaLinhaInputs1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
            proximaLinhaInputs1.forEach(input => {
                input.classList.remove('espera');
                input.classList.add('ativa');
            });
        }

        /*Se a palavra da grade2 não está no jogo ele ativa a proxima linha para mais tentativas */
        if (!palavra2Adivinhada) {
            const proximaLinhaInputs2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');
            proximaLinhaInputs2.forEach(input => {
                input.classList.remove('espera');
                input.classList.add('ativa');
            });
        }
    }
    /*Caso não tenha mais tentativas anuncia derrota*/
    else {
        alert("Você perdeu! As palavras eram: " + palavrasSecretas[0] + " e " + palavrasSecretas[1]);
        desativarTeclado();
    }
}

/*Realiza a definição de classes da tentativa */
function avaliarTentativa(palavraDigitada, palavraSecreta, inputsDaLinha) {
    for (let i = 0; i < inputsPorLinha; i++) {
        const letraInput = inputsDaLinha[i];
        const letraDigitada = palavraDigitada[i];

        /*Desativa o input*/
        letraInput.classList.remove('ativa');

        if (palavraSecreta[i] === letraDigitada) {
            letraInput.classList.add('correta');
        }
        else if (palavraSecreta.includes(letraDigitada)) {
            letraInput.classList.add('presente');
        }
        else {
            letraInput.classList.add('errada');
        }
    }
}

function desativarGrade(linhasDaGrade) {
    linhasDaGrade.forEach(linha => {
        const inputs = linha.querySelectorAll('.letra');
        inputs.forEach(input => {
            input.disabled = true;
        });
    });
}

/*Desativa o teclado em caso de vitoria OU derrota */
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

/*Le as teclas do teclado físico */
teclas.forEach(tecla => {
    tecla.addEventListener('click', lidarComCliqueDaTecla);
});
botaoApagar.addEventListener('click', lidarComCliqueDaTecla);
botaoEnter.addEventListener('click', lidarComCliqueDaTecla);

/* Limpa os inputs ao carregar a página*/
function limparInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
}
window.onload = limparInputs;

function lidarComTecladoFisico(event) {
    const tecla = event.key;

    /*If para dar função ao enter */
    if (tecla === 'Enter') {
        if (colunaAtual === inputsPorLinha) {
            verificarPalavras();
        }
    }
    

    /*If para dar função ao botão de apagar,igual a função de lidarComCliqueTela */
    else if (tecla === 'Backspace') {
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

    /*If para as letras do teclado, minusculas e maiusculas */
    else if (/^[a-zA-Z]$/.test(tecla)) {
        if (colunaAtual < inputsPorLinha) {
            /*Seleciona as atuais linhas*/
            const inputsDaLinha1 = linhasGrade1[tentativaAtual].querySelectorAll('.letra');
            const inputsDaLinha2 = linhasGrade2[tentativaAtual].querySelectorAll('.letra');
            
            if (!palavra1Adivinhada) {
                inputsDaLinha1[colunaAtual].value = tecla.toUpperCase();
            }
            if (!palavra2Adivinhada) {
                inputsDaLinha2[colunaAtual].value = tecla.toUpperCase();
            }
            colunaAtual++;
        }
    }
}

/*Codigo para poder utilizar o teclado físico */
window.addEventListener('keydown', lidarComTecladoFisico);