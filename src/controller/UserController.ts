import { Request, Response } from 'express';
import session from 'express-session'
import { UserInputDTO, LoginInputDTO } from '../model/User';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();
      const token = await userBusiness.createUser(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();
      const token = await userBusiness.getUserByEmail(loginData);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async logout(req: Request, res: Response) {
    try {

      const previousToken: any = req.headers.authorization;

      if (!previousToken) {
        return res.status(400).send({ error: 'Not logged in' });
      }
      const token = null
      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}
