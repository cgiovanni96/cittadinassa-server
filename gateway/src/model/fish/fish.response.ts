import { Responses } from 'src/model/global/response';
import { Fish } from 'src/model/fish/fish.model';

export class Found extends Responses.Found<{ fish: Fish }> {}
export class Created extends Responses.Created<{ fish: Fish }> {}
export class Updated extends Responses.Updated {}
export class Deleted extends Responses.Deleted {}
export class FoundAll extends Responses.Found<{ fishes: Fish[] }> {}
