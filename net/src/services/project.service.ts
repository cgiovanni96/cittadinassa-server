import { Project } from 'src/entities/fish/children/project.fish';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UUID } from 'src/types/base.types';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly project: Repository<Project>,
    private readonly connection: Connection,
  ) {}

  async save(data: { project: Project }): Promise<Project> {
    return this.connection.manager.save(data.project);
  }

  async getAll(): Promise<Project[]> {
    return this.project.find();
  }

  async get(data: { id: string }): Promise<Project> {
    return this.project.findOneOrFail({ id: data.id });
  }

  async create(data: { project: Partial<Project> }): Promise<Project> {
    return this.project.save(data.project);
  }

  async update(data: { id: UUID; payload: Partial<Project> }): Promise<Project> {
    const project = await this.project.findOneOrFail({ id: data.id });
    return this.project.save({ ...project, ...data.payload });
  }

  async deleted(data: { id: UUID }): Promise<void> {
    await this.project.delete({ id: data.id });
  }
}
