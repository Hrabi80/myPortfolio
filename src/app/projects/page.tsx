import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { fetchProjects } from "@/features/projects/services/fetch-projects";
import Image from "next/image";

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  if (!projects || !projects.length) 
    return (
    <h1>no project found</h1>
    )
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden pb-16 pt-32">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="opacity-0 animate-fade-up">
                <p className="mb-2 font-medium text-primary">My Work</p>
                <h1 className="font-display mb-6 text-4xl font-bold text-foreground md:text-5xl">
                  Featured Projects
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground">
                  A curated collection of work showcasing product strategy, engineering depth, and polished user
                  experiences.
                </p>
              </div>

              <div className="flex justify-center opacity-0 animate-fade-up stagger-2">
                <Image
                 width={100}
                 height={100}
                  src="/assets/projects-illustration.png"
                  alt="Projects illustration"
                  className="w-64 animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
