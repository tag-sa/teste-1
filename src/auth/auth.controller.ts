import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ token: string }> {
    // Lógica de autenticação
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.createToken(user.id);
    console.log(token, 'token');
    return { token };
  }
}
