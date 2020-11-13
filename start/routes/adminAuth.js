'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('signIn', 'AuthController.signIn').middleware(['guest'])
  Route.post('signUp', 'AuthController.signUp')
  Route.post('refresh', 'AuthController.refresh').middleware(['auth', 'admin'])
  Route.post('logout', 'AuthController.logout').middleware(['auth', 'admin'])
  Route.get('getUser', 'AuthController.getUser').middleware(['auth', 'admin'])
})
  .prefix('v1/adminAuth')
  .namespace('AdminAuth')
