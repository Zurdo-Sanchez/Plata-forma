import { Injectable } from '@nestjs/common';
import { AuthLoginAlert, AuthLoginAttempt, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  updateUserAuthState(userId: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  recordLoginAttempt(data: Prisma.AuthLoginAttemptCreateInput): Promise<AuthLoginAttempt> {
    return this.prisma.authLoginAttempt.create({ data });
  }

  recordLoginAlert(data: Prisma.AuthLoginAlertCreateInput): Promise<AuthLoginAlert> {
    return this.prisma.authLoginAlert.create({ data });
  }
}
