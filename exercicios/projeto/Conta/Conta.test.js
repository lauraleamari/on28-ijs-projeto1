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

})