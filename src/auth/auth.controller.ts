// auth/auth.controller.ts

import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('instagram')
    @Redirect()
    async loginWithInstagram(@Req() req): Promise<any> {
        const redirectUrl = await this.authService.getInstagramAuthUrl();
        return { url: redirectUrl };
    }

    @Get('instagram/redirect')
    @Redirect()
    async handleInstagramRedirect(@Req() req): Promise<any> {
        const { code } = req.query;
        const accessToken = await this.authService.getInstagramAccessToken(code);
        console.log('Access Token:', accessToken); // Muestra el token en la consola
        // Aquí puedes redirigir a una página de inicio de sesión exitosa o realizar otras acciones.
        return { url: '/login-success' }; // Cambia '/login-success' según tus necesidades.
    }

    @Get('login-success')
    loginSuccess(): string {
        // Muestra una página de éxito de inicio de sesión
        return '¡Inicio de sesión exitoso!';
    }
}