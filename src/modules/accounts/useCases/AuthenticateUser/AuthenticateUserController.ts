import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCases } from "./AuthenticateUserUseCases";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const authenticateUserUseCases = container.resolve(
        AuthenticateUserUseCases
      );

      const token = await authenticateUserUseCases.execute({
        email,
        password,
      });

      return response.status(200).json(token);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Email or password is incorrect" });
    }
  }
}

export { AuthenticateUserController };
