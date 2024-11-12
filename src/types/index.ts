export type User = {
  id: string;
  name: string;
  image: string;
  emailVerified: boolean;
};

export type ProjectBase = {
  id: string;
  name: string;
  slug: string;
  userId: string | null;
  description: string;
  gradient: string | null;
  likes: number | null;
  clicks: number | null;
  logo: string | null;
  image: string | null;
};

export type Link = {
  id: string;
  type: string | null;
  url: string | null;
  projectId: string | null;
};

export type ProjectContrib = User;

export interface Project extends ProjectBase {
  links: Link[];
  githubLink: Link;
  websiteLink: Link | undefined;
  team: ProjectContrib[];
}
