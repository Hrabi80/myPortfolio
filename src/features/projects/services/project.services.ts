import type { ProjectRepository } from "../project.repository";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  list() {
    return this.projectRepository.list();
  }

  getBySlug(slug: string) {
    return this.projectRepository.getBySlug(slug);
  }
}
