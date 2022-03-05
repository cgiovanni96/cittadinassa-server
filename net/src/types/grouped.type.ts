import { Event } from 'src/entities/fish/children/event.entity';
import { Group } from 'src/entities/fish/children/group.entity';
import { Project } from 'src/entities/fish/children/project.entity';

export type GroupedFishes = {
  projects: Project[];
  groups: Group[];
  events: Event[];
};
