'use client';
import React from 'react';
import styles from './Project.module.scss';
import { IProject } from '../Projects';
import Image from 'next/image';
import { urlForImage } from '@/app/utils/sanity/imgBuilder';
import Button from '../../Button/Button';

type IProjectProps = {
  project: IProject;
  indx: number;
};

const Project = ({ project, indx }: IProjectProps) => {
  const { name, mobileImage, mobileImageAlt, desktopImage, desktopImageAlt } =
    project;

  const isMobile = {
    url: mobileImage ? urlForImage(mobileImage).url() : '',
    alt: `${mobileImageAlt}`,
  };
  const isDesktop = {
    url: desktopImage ? urlForImage(desktopImage).url() : '',
    alt: `${desktopImageAlt}`,
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={`.heading-1 ${styles.heading}`}>{`0${
        indx + 1
      } / ${name}`}</h1>

      <div className={styles.isMobile}>
        <Image alt={isMobile.alt} src={isMobile.url} fill />
        <Button
          className={styles.projectButton}
          onClick={() => console.log('hello')}
          variant='outlinedWithTint'
          text='Details'
          icon='cross'
        />
      </div>

      <Image
        className={styles.isDesktop}
        alt={isDesktop.alt}
        src={isDesktop.url}
        sizes=''
        fill
      />
    </div>
  );
};

export default Project;
