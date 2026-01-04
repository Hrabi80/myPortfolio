import { Tag } from "./types";

export interface Project  {
    id: string;
    slug: string;
    name: string;
    subTitle:string;
    live?: string;
    summary:string;
    description: string;
    coverImage?:string;
    tags?:Tag[];
    status? : "published" | "unpublished", 
    gallery?: string [];
    order?:number;
    githubUrl?: string;
    publishedAt: string;
}
