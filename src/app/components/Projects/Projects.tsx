import React from 'react';
import styles from './Projects.module.scss';
import { client } from '@/app/utils/sanity/client';
import Project from './Project/Project';

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
  _createdAt: string;
  githubUrl?: string;
  mobileImage?: IMobileImage;
  gitHubLabel?: string;
  tags?: ITag[];
  author?: IAsset;
};

export type ITag = {
  _ref: string;
  _type: string;
  _key: string;
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

const Projects = async () => {
  const work = await client.fetch<IWork>(
    `*[name == "Work"][0]{blockList[0]{listOfProjects[]->}}`
  );
  const { listOfProjects } = work.blockList;

  return (
    <div className={styles.wrapper}>
      {listOfProjects.map((project, indx) => (
        <Project key={project._id} project={project} indx={indx} />
      ))}
    </div>
  );
};

export default Projects;
