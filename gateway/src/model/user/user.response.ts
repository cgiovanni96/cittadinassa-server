import { Responses } from 'src/model/global/response';
import { User } from 'src/model/user/user.model';

export class Found extends Responses.Found<{ user: User }> {}
export class Created extends Responses.Created<{ user: User; link: string }> {}
export class Updated extends Responses.Updated {}
export class Deleted extends Responses.Deleted {}
export class FoundAll extends Responses.Found<{ users: User[] }> {}
