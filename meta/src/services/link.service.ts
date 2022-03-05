import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { LinkDto } from 'src/dto/link.dto';
import { Link } from 'src/entities/link.entity';
import { Conditions, UUID } from 'src/types/base.types';
import { LINKTYPES } from 'src/types/link.types';
import { Connection, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LinkService {
  constructor(
    private readonly connection: Connection,
    private readonly config: ConfigService,
    @InjectRepository(Link) private readonly link: Repository<Link>,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                   DEFAULT                                  */
  /* -------------------------------------------------------------------------- */

  async save(data: { link: Link }): Promise<Link> {
    return this.connection.manager.save(data.link);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GETTER                                   */
  /* -------------------------------------------------------------------------- */

  async getAll(): Promise<Link[]> {
    return this.link.find();
  }

  async get(data: { id: UUID }): Promise<Link> {
    return this.link.findOneOrFail({ id: data.id });
  }

  async find(data: { conditions: Conditions<Link> }): Promise<Link> {
    return this.link.findOneOrFail({
      where: data.conditions,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   SETTER                                   */
  /* -------------------------------------------------------------------------- */

  async create(data: LinkDto): Promise<Link> {
    const linkUUID = uuid();
    return this.link.save({ link: linkUUID, ...data });
  }

  async update(data: { conditions: Conditions<Link>; data: Partial<Link> }): Promise<Link> {
    const linkToUpdate = await this.link.findOneOrFail({ where: data.conditions });
    return this.link.save({ ...linkToUpdate, ...data.data });
  }

  async delete(data: { id: UUID }): Promise<void> {
    await this.link.delete({ id: data.id });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    EXTRA                                   */
  /* -------------------------------------------------------------------------- */

  async generateHttpLink(data: { link: string }): Promise<string> {
    return `${this.config.get('client')}/users/confirm/${data.link}`;
  }
}
