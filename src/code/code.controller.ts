import { Controller, Get, Param, Post } from '@nestjs/common';
import { CodeService } from './code.service';

@Controller('code')
export class CodeController {
    constructor(private readonly codeService: CodeService) { }


    @Post(":activationCode")
    async validate(@Param('activationCode') activationCode: string): Promise<string> {
        console.log(activationCode)
        const isValid = await this.codeService.validateCode(activationCode);
        return isValid ? 'Success' : 'Fail';
    }

    @Get()
    async generate(): Promise<string> {
        const activationCode = await this.codeService.generateCode();
        return activationCode
    }

}
