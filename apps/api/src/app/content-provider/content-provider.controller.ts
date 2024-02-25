import { Controller, Get, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { RMQService } from 'nestjs-rmq'
import { Express } from 'express'
import { FileElementResponse } from '../dtos/file-element.response';
import { ContentProviderService } from './content-provider.service';

@Controller('content-service')
export class ContentProviderController {
	constructor(private readonly rmqService: RMQService, private readonly fileService: ContentProviderService) { }

	@Get('ping')
	ping() {
		return { message: 'Hello INCITY API' };
	}

	@Post('upload')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const res = await this.fileService.saveFile([file], 'media', true);
		//console.log(res);
		return res
	}


}