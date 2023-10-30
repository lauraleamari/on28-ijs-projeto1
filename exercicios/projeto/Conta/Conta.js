class Conta{
  #agencia
  #conta
  #saldo
  chavePix

  constructor(agencia, conta, saldo, chavePix){
    this.#agencia = agencia;
    this.#conta = conta;
    this.#saldo = saldo;
    this.chavePix = {
      cpf: undefined,
      email: undefined,
      telefone: undefined
    }
  }

  getAgencia(){
    return this.#agencia
  }
  getConta(){
    return this.#conta
  }
  getSaldo(){
    return this.#saldo
  }

  // setAgencia(newAgencia){
  //   this.#agencia = newAgencia
  // }

  setSaldo(novoSaldo){
    this.#saldo = novoSaldo
  }

  // criarConta(agencia, conta, saldo) {
  //   if (typeof agencia !== 'string' && agencia.length !== 4) {
  //     throw new Error('Dados inválidos para cadastro');
  //   }

  //   if (typeof conta !== 'string' && conta.length !== 5) {
  //     throw new Error('Dados inválidos para cadastro');
  //   }

  //   if (typeof saldo !== 'number' && saldo < 0) {
  //     throw new Error('Dados inválidos para cadastro');
  //   }

  //   this.#agencia = agencia;
  //   this.#conta = conta;
  //   this.#saldo = saldo;

  //   return "Conta criada com sucesso";
  // }

  // sacar(amount){

  //   if (amount >= 0) {
  //     if (this.#saldo >= amount) {
  //       this.#saldo -= amount;
  //     } else {
  //       throw new Error("Saldo insuficiente");
  //     }
  //   } else {
  //     throw new Error("Valor inválido para Saque");
  //   }
  // };

  // depositar(valor){
  //   if (typeof valor === "number" && valor >= 0) {
  //     this.#saldo += valor;
  //   } else {
  //     throw new Error("Valor inválido para depósito");
  //   }
  // }

  //Profa

  criarConta(agencia, conta, saldo) {
    if(agencia.length === 4 && conta.length === 5 && saldo >= 0){
      this.#agencia = agencia;
      this.#conta = conta;
      this.#saldo = saldo;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro")
    }
  }

  sacar(valor){
    if(valor > 0 && typeof valor === 'number'){
      if(this.#saldo - valor > 0){
        const saldoAtualizado = this.#saldo - valor
        this.setSaldo(saldoAtualizado)
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Valor inválido para Saque");
    }
  }

  depositar(valor){
    if(valor > 0 && typeof valor === 'number') {
      if(this.#saldo + valor > 0){
        const saldoAtualizado = this.#saldo + valor
        this.setSaldo(saldoAtualizado)

      } else {
        throw new Error("Valor inválido para depósito")
      }

    } else {
      throw new Error("Valor inválido para depósito");
    }
  }

}


module.exports = Conta