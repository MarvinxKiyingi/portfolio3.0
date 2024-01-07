export type IWork = {
  blockList: BlockList;
};

export type BlockList = {
  listOfProjects: IProject[];
};

export type IProject = {
  _updatedAt: string;
  pageLabel: string;
  _rev: string;
  description: string;
  _type: string;
  name: string;
  pageUrl: string;
  _id: string;
  desktopImage: IDesktopImage;
  desktopImageAlt: string;
  _createdAt: string;
  githubUrl?: string;
  mobileImage?: IMobileImage;
  mobileImageAlt: string;
  gitHubLabel?: string;
  tags?: ITag[];
  author?: IAsset;
};

export type ITag = {
  _rev: string;
  _type: string;
  name: string;
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  author?: IAuthor;
};

export type IMobileImage = {
  asset: IAsset;
  _type: string;
};

export type IDesktopImage = {
  asset: IAsset;
  _type: string;
  hotspot?: IHotspot;
  crop?: ICrop;
};

export type ICrop = {
  top: number;
  left: number;
  bottom: number;
  _type: string;
  right: number;
};

export type IHotspot = {
  _type: string;
  width: number;
  x: number;
  y: number;
  height: number;
};

export type IAsset = {
  _type: string;
  _ref: string;
};

export type IAuthor = {
  _ref: string;
  _type: string;
};
