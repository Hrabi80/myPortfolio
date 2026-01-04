import { BlogPost } from "../entities/blog.entity";
import { ContactMessage } from "../entities/contact.entity";
import { Project } from "../entities/project.entity";

export interface ProjectsRepository {
  getAllProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
}

export interface BlogRepository {
  getAllPosts(): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
}

export interface MessageSender {
  send(message: ContactMessage): Promise<void>;
}
