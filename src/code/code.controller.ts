import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CodeService } from './code.service';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';

@Controller('code')
export class CodeController {
    constructor(private readonly codeService: CodeService) { }

    @ApiResponse({ description: "Success", status: 202 })
    @ApiResponse({ description: "Fail", status: 404 })
    @Post(":activationCode")
    async validate(@Param('activationCode') activationCode: string, @Res() res: Response) {
        console.log(activationCode)
        const isValid = await this.codeService.validateCode(activationCode);



        isValid ? res.status(202).send("Success") : res.status(404).send("Fail");

    }

    @Get()
    async generate(): Promise<string> {
        const activationCode = await this.codeService.generateCode();
        return activationCode
    }

}
