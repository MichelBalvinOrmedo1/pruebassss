
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
    private readonly clientId = '751902293045624';
    private readonly clientSecret = '00a486c16ebc9243a199f671c0a7affe';
    private readonly redirectUri = 'https://pruebaapinest.onrender.com/auth/instagram/redirect';

    async getInstagramAuthUrl(): Promise<string> {
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code`;
        return authUrl;
    }

    async getInstagramAccessToken(code: string): Promise<string> {
        try {
            const response = await axios.post('https://api.instagram.com/oauth/access_token', {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: this.redirectUri,
                code: code,
            });
            return response.data.access_token;
        } catch (error) {
            throw new Error('Error al obtener el token de acceso de Instagram');
        }
    }
}
