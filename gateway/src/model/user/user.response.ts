import { Responses } from 'src/model/global/response';
import { UserModel } from 'src/model/user/user.model';

export class Found extends Responses.Found<{ user: UserModel }> {}
export class Created extends Responses.Created<{ user: UserModel; link: string }> {}
export class Updated extends Responses.Updated {}
export class Deleted extends Responses.Deleted {}
export class FoundAll extends Responses.Found<{ users: UserModel[] }> {}
