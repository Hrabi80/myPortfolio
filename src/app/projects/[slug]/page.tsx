import { Container } from "@/components/layout/primitives";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ArrowLeft, Github, Globe } from "lucide-react";
import Link from "next/link";
import { fetchProjectBySlug } from "@/features/projects/services/projects.services";



export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;
    const project = await fetchProjectBySlug(slug)


  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">
        <Container size="md">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-xl text-muted-foreground">{project.description}</p>
          </div>
          <div className="mb-12 flex gap-4">
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" /> View Code
                </Link>
              </Button>
            )}
            {project.live && (
              <Button asChild>
                <Link href={project.live} target="_blank">
                  <Globe className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </div>
          {/* <NotionRenderer blocks={project.blocks ?? []} /> */}
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
