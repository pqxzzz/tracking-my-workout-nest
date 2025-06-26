import * as bcrypt from 'bcrypt';

// isso é uma função que recebe uma senha e retorna uma senha hasheada
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// isso é uma função que recebe uma senha e uma senha hasheada e retorna um booleano
// se a senha é igual à senha hasheada
export async function comparePasswords(
  plain: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
