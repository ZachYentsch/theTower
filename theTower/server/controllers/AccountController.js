import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/attendees', this.getMyAttendance)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyAttendance(req, res, next) {
    try {
      const myAttendance = await attendeesService.getMyAttendance(req.userInfo.id)
      return res.send(myAttendance)
    } catch (error) {
      next(error)
    }
  }

}
