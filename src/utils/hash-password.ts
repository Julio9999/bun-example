import * as bcrypt from 'bcrypt';

export const hasPassword = async(password: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}

export const comparePassword = async(password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}