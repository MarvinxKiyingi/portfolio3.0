import React from 'react';
import styles from './Project.module.scss';
import { IProject } from '../Projects';

type IProjectProps = {
  project: IProject;
  indx: number;
};

const Project = ({ project }: IProjectProps) => {
  const { name } = project;
  return <div className={styles.wrapper}>{name}</div>;
};

export default Project;
