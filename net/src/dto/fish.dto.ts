import { FISH_TYPE } from 'src/types/fish.type';

export class FishDto {
  name: string;
  codename: string;
  description?: string;
  type: FISH_TYPE;
  extra?: ExtraInfoDto;
}

export class ExtraInfoDto {
  drive?: string;
  discord?: string;
}
