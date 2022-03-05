import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Models } from 'src/app/auth/models.auth';
import { USER_ACTIONS } from 'src/app/auth/user/user.ability';
import { FishClient } from 'src/app/clients/fish.client';
import { Authenticated } from 'src/app/guards/authentication.guard';
import { Protected } from 'src/app/guards/authorization.guard';
import { ResponseInterceptor } from 'src/app/interceptors/response.interceptor';

import { Dto } from 'src/model/fish';
import { CreateFishDto } from 'src/model/fish/fish.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('fish')
export class FishRoute {
  constructor(private readonly fish: FishClient) {}

  /* -------------------------------------------------------------------------- */
  /*                               CRUD OPERATION                               */
  /* -------------------------------------------------------------------------- */

  @Get('/')
  async getFishes() {
    console.log('hello');
    return this.fish.getAll();
  }

  @Get(':id')
  async getFish(@Param() params: { id: string }) {
    return this.fish.get(params);
  }

  @Post('/')
  @Authenticated()
  @Protected({ model: Models.USER, action: USER_ACTIONS.CREATE })
  async createFish(@Body() data: CreateFishDto) {
    const response = await this.fish.create(data);
    return response;
  }

  @Delete('/')
  @Authenticated()
  @Protected({ model: Models.USER, action: USER_ACTIONS.DELETE })
  async deleteFish(@Body() data: Dto.Delete) {
    return this.fish.delete(data);
  }

  @Put('/')
  @Authenticated()
  @Protected({ model: Models.USER, action: USER_ACTIONS.UPDATE })
  async updateFish(@Body() data: Dto.Update) {
    return this.fish.update(data);
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  @Post('/upload')
  @Authenticated()
  @Protected({ model: Models.USER, action: USER_ACTIONS.CREATE })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCover(@UploadedFile('file') file: any) {
    console.log('here', file);
    await this.fish.uploadCover({ file });
  }
}
