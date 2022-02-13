import { UUID } from '../global/type';

export class Create {
  userId: UUID;
}

export class Decode {
  token: string;
}

export class Destroy {
  userId: UUID;
}
