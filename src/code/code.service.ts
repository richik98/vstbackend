import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { promises as fs } from 'fs'; // Import file system promises
import { join } from 'path'; // Import path for constructing file paths


@Injectable()
export class CodeService {

    private readonly validCodes = ['code123', 'code456', 'code789'];

    async validateCode(activationCode: string): Promise<boolean> {
        try {
            const filePath = "./verification_codes.json"
            const fileData = await fs.readFile(filePath, 'utf-8');
            const codes = JSON.parse(fileData).codes;

            return codes.includes(activationCode);
        } catch (error) {
            console.error('Error reading verification codes:', error);
            throw error; // Re-throw to handle errors in calling code
        }
    }


    async generateCode(): Promise<string> {
        try {
            const verificationCode = await this.generateVerificationCode();

            const filePath = "./verification_codes.json" // Plural for multiple codes

            let codes = [];
            try {
                const fileData = await fs.readFile(filePath, 'utf-8');
                codes = JSON.parse(fileData)?.codes || []; // Handle potential parsing errors
            } catch (error) {
                if (error.code !== 'ENOENT') { // Ignore "file not found" error
                    throw error;
                }
            }

            codes.push(verificationCode);

            await fs.writeFile(filePath, JSON.stringify({ codes }, null, 2));

            console.log('Verification code added to file:', filePath);

            return verificationCode;
        } catch (error) {
            console.error('Error writing verification code to file:', error);
            throw error;
        }
    }



    async generateVerificationCode(length: number = 32): Promise<string> {
        // Generate random bytes of specified length
        const randomData = randomBytes(length);

        // Encode random bytes in Base64 format (URL safe for compatibility)
        return Buffer.from(randomData).toString('base64url');
    }
}


