export type User = {
  id: string;
  name: string;
  image: string;
};

export type ProjectBase = {
  id: string;
  name: string;
  description: string;
  stars: number;
  clicks: number;
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
  team: ProjectContrib
}
