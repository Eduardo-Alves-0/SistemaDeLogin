let nomeUsuario = '';
let emailUsuario = '';
let senhaUsuario = '';

function inputUsuario() {
    let nome = prompt('Digite seu nome: ');
    let email = prompt('Digite seu email: ');
    let senha = prompt('Digite sua senha: ');
    let confirmarSenha = prompt('Confirma sua senha: ');

    while (nome === '' || nome === null || email === '' || email === null || senha === '' || senha === null || confirmarSenha === '' || confirmarSenha === null) {
        alert('Todos os campos são obrigatórios!');
        nome = prompt('Digite seu nome: ');
        email = prompt('Digite seu email: ');
        senha = prompt('Digite sua senha: ');
        confirmarSenha = prompt('Confirma sua senha: ');
    }

    while (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        senha = prompt('Digite sua senha: ');
        confirmarSenha = prompt('Confirma sua senha: ');
    }

    return { nome, email, senha };
}

function validarDadosCadastro(nome, email, senha) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (nome === '' || nome === null || email === '' || email === null || senha === '' || senha === null) {
        alert('Todos os campos são obrigatórios!');
        return { isValid: false, erro: 'Todos os campos são obrigatórios!' };
    }

    while (!emailRegex.test(email)) {
        alert('Email inválido!');
        email = prompt('Digite seu email: ');
        while (email === '' || email === null) {
            alert('O email é obrigatório!');
            email = prompt('Digite seu email: ');
        }
    }

    while (!senhaRegex.test(senha)) {
        senha = prompt('A senha deve ter 6+ caracteres, maiúscula, minúscula, número e caractere especial');
        while (senha === '' || senha === null) {
            alert('A senha é obrigatória!');
            senha = prompt('Digite sua senha: ');
        }
        let confirmarSenha = prompt('Confirme sua senha: ');
        while (confirmarSenha !== senha) {
            alert('As senhas não coincidem!');
            confirmarSenha = prompt('Confirme sua senha: ');
            while (confirmarSenha === '' || confirmarSenha === null) {
                alert('A confirmação da senha é obrigatória!');
                confirmarSenha = prompt('Confirma sua senha: ');
            }
        }
    }

    return { isValid: true, dados: { nome, email, senha } };
}

function cadastrarUsuario() {
    let { nome, email, senha } = inputUsuario();
    let { isValid, dados, erro } = validarDadosCadastro(nome, email, senha);

    if (isValid) {
        nomeUsuario = dados.nome;
        emailUsuario = dados.email;
        senhaUsuario = dados.senha;
        alert('Cadastro realizado com sucesso!');
        alert('Dados salvos: ' + nomeUsuario + ', ' + emailUsuario + ', ' + senhaUsuario); // Temporário para verificar
    } else {
        alert('Erro ao cadastrar usuário: ' + erro);
    }
}

function inputLogin() {
    let email = prompt('Digite seu email: ');
    let senha = prompt('Digite sua senha: ');

    while (email === '' || email === null || senha === '' || senha === null) {
        alert('Todos os campos são obrigatórios!');
        email = prompt('Digite seu email: ');
        senha = prompt('Digite sua senha: ');
    }
    return { email, senha };
}

function validarLogin(email, senha) {
    if (emailUsuario === '' || senhaUsuario === '') {
        return { isValid: false, erro: 'Nenhum usuário cadastrado!' };
    }

    if (email === emailUsuario && senha === senhaUsuario) {
        return { isValid: true, mensagem: 'Login bem-sucedido!' };
    } else {
        return { isValid: false, erro: 'Email ou senha incorretos!' };
    }
}

function fazerLogin() {
    let { email, senha } = inputLogin();
    let { isValid, mensagem, erro } = validarLogin(email, senha);

    if (isValid) {
        alert(mensagem);
    } else {
        alert(erro);
        fazerLogin();
    }
}


cadastrarUsuario();
fazerLogin();
