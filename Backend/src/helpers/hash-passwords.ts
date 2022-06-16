import crypto from "crypto";

const salt = process.env.HASH_SALT

export function hashing(plainText: string) {
    if (!plainText) return null;
    if (plainText.length === 0) return null;
    if (plainText === "") return null;

    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashText;
}