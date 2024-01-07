import React from 'react';
import styles from './Projects.module.scss';
import { client } from '@/app/utils/sanity/client';
import Project from './Project/Project';
import { IWork } from '.';

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
