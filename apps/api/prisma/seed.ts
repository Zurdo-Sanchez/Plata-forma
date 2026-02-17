import { PrismaClient } from '@prisma/client';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const prisma = new PrismaClient();
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

  return {
    hash: derivedKey.toString('hex'),
    salt,
  };
}

async function main() {
  const email = 'su@admin.com';
  const password = 'secret';

  const existing = await prisma.user.findUnique({ where: { email } });
  const { hash, salt } = await hashPassword(password);

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash: hash,
        passwordSalt: salt,
        isSuperAdmin: true,
      },
    });
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash: hash,
        passwordSalt: salt,
        isSuperAdmin: true,
      },
    });
  }
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
