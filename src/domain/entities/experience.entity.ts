import { Tag } from "resend";

export interface Experience  {
    id: string;
    slug: string;
    title: string;
    enterprise: string;
    position: string;
    location: string;
    type: "hybrid" | "remote" | "on-site" ;
    contract: "full-time" | "part-time" | "freelance";
    startDate:Date;
    endDate?: Date | "Present";
    responsability:string;
    achievement:string;
    summary:string;
    technologies?:Tag[];
    tools?:Tag[];
    status? : "published" | "unpublished", 
    order?:number
}