import { Event } from 'src/entities/fish/children/event.fish';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UUID } from 'src/types/base.types';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly event: Repository<Event>,
    private readonly connection: Connection,
  ) {}

  async save(data: { event: Event }): Promise<Event> {
    return this.connection.manager.save(data.event);
  }

  async getAll(): Promise<Event[]> {
    return this.event.find();
  }

  async get(data: { id: string }): Promise<Event> {
    return this.event.findOneOrFail({ id: data.id });
  }

  async create(data: { event: Partial<Event> }): Promise<Event> {
    return this.event.save(data.event);
  }

  async update(data: { id: UUID; payload: Partial<Event> }): Promise<Event> {
    const event = await this.event.findOneOrFail({ id: data.id });
    return this.event.save({ ...event, ...data.payload });
  }

  async deleted(data: { id: UUID }): Promise<void> {
    await this.event.delete({ id: data.id });
  }
}
