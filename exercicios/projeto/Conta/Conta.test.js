/*
ESTRUTURA DOS TESTES
test("DESCRIÇÃO", () => {
    // assim que se começa um teste!
    // setup (o que a função/método/classe que vai ser testada precisa para funcionar?)
    // acao (execução da função testada)
    // verificacao (o que eu quero que seja retornado , comparado com o que de fato é retornado)
  })
*/

const Conta = require('./Conta')

describe('Testes da classe conta', () => {
  test("verificar se instancia foi criada corretamente", () => {
    const conta = new Conta()
    expect(conta instanceof Conta).toBe(true)
  })

  test('instanciar conta com valores validos', () => {
    /**
     * todos são privados
     * Agência (4 digitos - string)
     * Conta (5 digitos - string)
     * Saldo (número positivo)
     */
    const conta = new Conta('1234', '12345', 1000)
    expect(conta.getAgencia()).toBe('1234')
    expect(conta.getConta()).toBe('12345')
    expect(conta.getSaldo()).toBe(1000)
  })

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta()
    expect(conta.criarConta('1234', '12345', 1000)).toBe("Conta criada com sucesso")
    expect(conta.getAgencia()).toBe('1234')
    expect(conta.getConta()).toBe('12345')
    expect(conta.getSaldo()).toBe(1000)
  })

  test("retorna mensagem de erro ao criar conta com dados inválidos", () => {
    const conta = new Conta()
    expect(() => conta.criarConta('123467', '345', 1000)).toThrow("Dados inválidos para cadastro")
  })

  test("retorna sucesso ao sacar valor da conta", () => {
    const conta = new Conta()
    conta.criarConta('1234', '12345', 1000)
    conta.sacar(100)
    expect(conta.getSaldo()).toBe(900)
  })

  test("retorna mensagem de erro ao sacar -100 da conta", () => {
    const conta = new Conta()
    conta.criarConta('1234', '12345', 1000)
    expect(() => conta.sacar(-100)).toThrow("Valor inválido para Saque")
    expect(conta.getSaldo()).toBe(1000)
  })

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta()
    conta.criarConta('1234', '12345', 1000)
    expect(() => conta.sacar(1100)).toThrow("Saldo insuficiente")
    expect(conta.getSaldo()).toBe(1000)
  })

  test("retorna sucesso ao depositar 100 reais na conta", () => {
    const conta = new Conta()
    conta.criarConta('1234', '12345', 1000)
    conta.depositar(100)
    expect(conta.getSaldo()).toBe(1100)
  })

  test("retorna mensagem de erro ao depositar -100 da conta", () => {
    const conta = new Conta()
    conta.criarConta('1234', '12345', 1000)
    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito")
    expect(conta.getSaldo()).toBe(1000)
  })

  test("retorna mensagem de erro ao depositar valor não numérico", () => {
    const conta = new Conta()
    conta.criarConta('1234', '12345', 1000)
    expect(() => conta.depositar(' ')).toThrow("Valor inválido para depósito")
    expect(conta.getSaldo()).toBe(1000)
  })

  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("40814360879", "CPF");

    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const conta = new Conta();

    //verificacao
    expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");

    // remover conta da lista de contas
    conta.destruir()
});

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("analu@email.com", "EMAIL");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");

    // remover conta da lista de contas
    conta.destruir()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("11951639874", "TELEFONE");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    // remover conta da lista de contas
    conta.destruir()
  });

  /**
   * TRANFERENCIA
   * emissor = conta q esta enviando o dinheiro
   * recepto = conta q está recebendo esse dinheiro
   * agencia e conta do receptor
   * metodo vai precisar de valor, agencia do Receptor e conta do Receptor
   * valor valido
   * saldo suficiente
   * dados validos do receptor
   */

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    //setup
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "78945")

    //verificacao
    expect(operacao).toBe("Tranferencia realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruir();
    contaReceptor.destruir();

  })
});