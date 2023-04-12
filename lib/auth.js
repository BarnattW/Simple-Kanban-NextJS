import { hash } from "bcryptjs";

export async function hashPassword(password) {
	const hashedPassword = hash(password, 12);
	return hashedPassword;
}
