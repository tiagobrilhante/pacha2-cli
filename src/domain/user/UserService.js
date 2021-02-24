export default class UserService {
  constructor () {
    this._resource = this.$http.get('users{/id}')
  }

  lista () {
    return this._resource
      .query()
      .then(res => res.json(), err => {
        console.log(err)
        throw new Error('Não foi possivel obter a lista de usuários.')
      })
  }

  cadastra (foto) {
    if (foto._id) {
      return this._resource
        .update({id: foto._id}, foto)
    } else {
      return this._resource
        .save(foto)
    }
  }

  apaga (id) {
    return this._resource
      .delete({id})
      .then(null, err => {
        console.log(err)
        throw new Error('Não foi possivel remover o usuário!')
      })
  }

  busca (id) {
    return this._resource
      .get({id})
      .then(res => res.json())
  }
}
