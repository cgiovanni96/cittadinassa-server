import { Get as DefaultGet } from '../global/dto/get.dto';
import { Update as DefaultUpdate } from '../global/dto/update.dto';
import { ExtraInfo, Fish } from './fish.model';
import { FISH_TYPE } from './fish.type';

export class Get extends DefaultGet {}
export class Search extends Fish {}
export class Create extends Fish {}
export class Delete extends DefaultGet {}
export class Update extends DefaultUpdate<Fish> {}

export class CreateFishDto {
  name: string;
  codename: string;
  description?: string;
  type: FISH_TYPE;
  extra?: ExtraInfo;
}

export class UploadCoverDto {
  file: any;
}
