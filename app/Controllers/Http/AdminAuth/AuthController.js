'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class AuthController {
  async signIn({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const token = await auth.withRefreshToken().attempt(email, password)
      return response.status(200).send(token)
    } catch (error) {
      return response.status(error.status).send({
        message: 'E-mail ou Senha incorretos'
      })
    }
  }

  async signUp({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { email, password, name, username } = request.all()
      const user = await User.create({ email, password, username }, trx);
      
      await user
        .admin()
        .create({ user_id: user.id, name: name }, trx)

      await trx.commit()

      return response.status(200).json(user)
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async refresh({ request, response, auth }) {
    const refresh_token = request.input('refresh_token')
    const token = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token)
    return response.status(200).send(token)
  }

  async logout({ request, response, auth }) {
    const refresh_token = request.input('refresh_token')
    await auth.authenticator('jwt').revokeTokens([refresh_token], true)
    return response.status(200).send()
  }

  async getUser({ response, auth }) {
    try {
      const user = await auth.getUser()
      const admin = await user.admin().fetch()

      const data = Object.assign(admin, { email: user.email })

      return response.status(200).send(data)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}

module.exports = AuthController
