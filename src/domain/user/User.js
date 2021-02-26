export default class User {

  constructor (nome = '', guerra = '', nome_guerra = '', posto_grad = '', cpf = '', om = 'om', tipo = 'tipo') {
    this.nome = nome
    this.posto_grad = posto_grad
    this.nome_guerra = nome_guerra
    this.guerra = guerra
    this.cpf = cpf
    this.om = om
    this.tipo = tipo
  }
}
