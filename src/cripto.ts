import * as bcrypt from 'bcrypt';
export class Cripto {
  private static salt = 10;

  static async hashPassword(password): Promise<string> {
    try {
      const hashPassword = await bcrypt.hash(password, this.salt);
      return hashPassword;
    } catch (e) {
      console.log(e);
      return '';
    }
  }
  static async comparePassword(password, hash): Promise<boolean> {
    try {
      return bcrypt.compare(password, hash);
    } catch (e) {
      return false;
    }
  }
}
