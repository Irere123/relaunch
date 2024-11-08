export type User = {
  id: string;
  name: string;
  image: string;
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
  type: string;
  url: string;
};

export type ProjectContrib = User;

export interface Project extends ProjectBase {
  links: Link[];
  githubLink: string;
  websiteLink: string;
  team: ProjectContrib[];
}
