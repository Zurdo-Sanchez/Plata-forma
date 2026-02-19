import { BadRequestException, Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard, AuthRequest } from './auth.guard';
import { LoginSchema, RegisterSchema } from './auth.schemas';
import { resolveLocale, t } from './auth.messages';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown, @Headers('accept-language') acceptLanguage?: string) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    return this.authService.register(parsed.data, acceptLanguage);
  }

  @Post('login')
  async login(
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage: string | undefined,
    @Req() request: Request,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    return this.authService.login(parsed.data, {
      acceptLanguage,
      ip: request.ip,
      userAgent: request.get('user-agent') ?? undefined,
    });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() request: AuthRequest) {
    return {
      ok: true,
      user: request.user,
    };
  }
}
