
import React, { useState, useEffect, useRef } from 'react';

// --- TELA DE LOGIN (PONTO DE PARTIDA) ---
// Esta é a tela principal que o usuário verá primeiro.
// A prop 'navigation' é uma função para mudar de tela.
function LoginScreen({ navigation }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo de Volta!</h1>

      {/* Inputs para email e senha (simulados) */}
      <input
        style={styles.input}
        placeholder="Seu Email"
        type="email"
      />
      <input
        style={styles.input}
        placeholder="Sua Senha"
        type="password"
      />

      <button style={styles.button}>
        <span style={styles.buttonText}>Entrar</span>
      </button>

      {/* Botões para navegar para as outras telas */}
      <button style={styles.linkButton} onClick={() => navigation('Cadastro')}>
        Não tem uma conta? Cadastre-se
      </button>

      <button style={styles.linkButton} onClick={() => navigation('RedefinirSenha')}>
        Esqueci minha senha
      </button>
    </div>
  );
}

// --- TELA DE CADASTRO ---
// Componente funcional para a tela de registro de novos usuários.
function CadastroScreen({ navigation }) {
  // --- ESTADOS (useState) ---
  // "Estado" é como a memória do componente. Usamos 'useState' para criar variáveis
  // que, quando alteradas, fazem a tela se redesenhar automaticamente.
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estado para controlar se o formulário é válido
  const [isFormValid, setIsFormValid] = useState(false);

  // --- EFEITOS (useEffect) ---
  // 'useEffect' executa um código sempre que uma das variáveis em sua lista de
  // dependências (o array no final) muda.
  // Aqui, usamos para verificar se todos os campos estão preenchidos.
  useEffect(() => {
    // A condição é verdadeira apenas se todos os campos tiverem algum texto.
    const isValid = cpf.length > 0 && nome.length > 0 && email.length > 0 && senha.length > 0;
    setIsFormValid(isValid);
  }, [cpf, nome, email, senha]); // A lista de dependências

  // Função para lidar com o clique no botão "Salvar"
  const handleSalvar = () => {
    // Mostra um alerta de sucesso
    alert('Usuário registrado com sucesso');
    // Navega de volta para a tela de Login
    navigation('Login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crie sua Conta</h1>

      {/* Cada input atualiza seu respectivo estado a cada letra digitada */}
      <input
        style={styles.input}
        placeholder="CPF"
        type="text"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)} // Atualiza o estado 'cpf'
      />
      <input
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)} // Atualiza o estado 'nome'
      />
      <input
        style={styles.input}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email'
      />
      <input
        style={styles.input}
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)} // Atualiza o estado 'senha'
      />

      {/* O botão de Salvar usa um estilo condicional.
          Se 'isFormValid' for falso, ele fica com uma aparência de desabilitado.
          A propriedade 'disabled' impede o clique se o formulário não for válido. */}
      <button
        style={{...styles.button, ...(!isFormValid ? styles.buttonDisabled : {})}}
        onClick={handleSalvar}
        disabled={!isFormValid}>
        <span style={styles.buttonText}>Salvar</span>
      </button>

      {/* Botão para retornar à tela de login */}
      <button style={styles.linkButton} onClick={() => navigation('Login')}>
        Voltar para Login
      </button>
    </div>
  );
}

// --- TELA DE REDEFINIÇÃO DE SENHA ---
function RedefinirSenhaScreen({ navigation }) {
  // Estados para os campos de senha
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // --- REFERÊNCIAS (useRef) ---
  // 'useRef' é como um "gancho" que podemos prender a um elemento da tela (como um input)
  // para controlá-lo diretamente, como dar foco a ele.
  const senhaInputRef = useRef(null);

  // Função para lidar com o clique no botão de redefinir
  const handleRedefinir = () => {
    // 1. Validação: Verifica se os campos estão preenchidos e se são iguais
    if (senha.length === 0 || confirmarSenha.length === 0) {
      alert('Atenção: Por favor, preencha os dois campos de senha.');
      return;
    }

    if (senha !== confirmarSenha) {
      // Se as senhas não forem iguais...
      alert('Erro: Senhas não são iguais');
      // Usamos a referência para focar no primeiro campo de senha
      senhaInputRef.current?.focus();
      return; // Para a execução da função aqui
    }

    // 2. Sucesso: Se tudo estiver certo...
    alert('Sucesso! Senha redefinida com sucesso');
    navigation('Login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Redefinir Senha</h1>

      <input
        ref={senhaInputRef} // "Prendemos" a referência neste input
        style={styles.input}
        placeholder="Nova Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Confirmar Nova Senha"
        type="password"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />

      <button style={styles.button} onClick={handleRedefinir}>
        <span style={styles.buttonText}>Salvar Nova Senha</span>
      </button>

      <button style={styles.linkButton} onClick={() => navigation('Login')}>
        Voltar para Login
      </button>
    </div>
  );
}


// --- COMPONENTE PRINCIPAL DO APP ---
// É aqui que a mágica da navegação acontece, de forma simulada.
export default function App() {
  // Criamos um estado para controlar qual tela está visível no momento.
  const [telaAtual, setTelaAtual] = useState('Login');

  // Função para renderizar a tela correta com base no estado 'telaAtual'.
  const renderizarTela = () => {
    switch (telaAtual) {
      case 'Cadastro':
        // Passamos a função 'setTelaAtual' como prop para que a tela de Cadastro
        // possa mudar a tela atual de volta para 'Login'.
        return <CadastroScreen navigation={setTelaAtual} />;
      case 'RedefinirSenha':
        return <RedefinirSenhaScreen navigation={setTelaAtual} />;
      default:
        // Por padrão, mostramos a tela de Login.
        return <LoginScreen navigation={setTelaAtual} />;
    }
  };

  return (
    <div style={styles.appWrapper}>
      {/* O cabeçalho é simulado aqui */}
      <header style={styles.header}>
          <h2 style={styles.headerTitle}>
            {telaAtual === 'Cadastro' ? 'Cadastro de Usuário' : 
             telaAtual === 'RedefinirSenha' ? 'Redefinição de Senha' : 'Login'}
          </h2>
      </header>
      {/* Renderiza a tela que estiver ativa no momento */}
      {renderizarTela()}
    </div>
  );
}

// --- FOLHA DE ESTILOS (StyleSheet) ---
// Em React para a web, usamos objetos JavaScript para estilização (CSS-in-JS).
const styles = {
  appWrapper: {
    fontFamily: 'sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#f0f0f0',
    padding: '15px 20px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 70px)'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '400px',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    border: '1px solid #ddd',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    width: '100%',
    maxWidth: '400px',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    border: 'none',
    cursor: 'pointer',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#a0c7ff',
    cursor: 'not-allowed',
  },
  linkButton: {
    color: '#007bff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginTop: 10,
    fontSize: 16,
  },
};