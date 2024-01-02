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

type IAuthor = {
  _ref: string;
  _type: string;
};

const Projects = async () => {
  const work = await client.fetch<IWork>(
    `*[name == "Work"][0]{blockList[0]{listOfProjects[]->{...,tags[]->}}}`
  );
  const { listOfProjects } = work.blockList;

  return (
    <div className={styles.wrapper} id='Work'>
      {listOfProjects.map((project, indx) => (
        <Project key={project._id} project={project} indx={indx} />
      ))}
    </div>
  );
};

export default Projects;
