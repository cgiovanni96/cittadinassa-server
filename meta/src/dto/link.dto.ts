import { UUID } from 'src/types/base.types';
import { LINKTYPES } from 'src/types/link.types';

export class LinkDto {
  userId: UUID;
  type: LINKTYPES;
}
