'use client';
import React from 'react';
import styles from './Project.module.scss';
import { IProjectProps } from '.';
import Image from 'next/image';
import { urlForImage } from '@/app/utils/sanity/imgBuilder';
import Button from '../../Button/Button';
import Link from 'next/link';
import OpenPage from '../../Icons/OpenPage';
import Github from '../../Icons/Github';

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

  function viewDetails() {
    document.getElementById(`${project._id}`)?.classList.toggle('view');
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.heading} ${styles.isMobile} `}>{`0${
        indx + 1
      } / ${name}`}</h1>

      <div className={styles.container}>
        <h1 className={`${styles.heading} ${styles.isDesktop}`}>{`0${
          indx + 1
        } / ${name}`}</h1>

        <Image
          alt={isMobile.alt}
          src={isMobile.url}
          className={styles.isMobile}
          fill
        />

        <Button
          className={styles.projectButton}
          onClick={() => viewDetails()}
          variant='outlinedWithTint'
          text='Details'
          icon='cross'
          as='button'
        />

        <div className={styles.detailsWrapper} id={`${project._id}`}>
          <Button
            className={`${styles.projectButton} ${styles.detailsButton}`}
            onClick={() => viewDetails()}
            variant='outlinedWithTint'
            text='Close'
            icon='minus'
            as='button'
          />

          <div className={styles.details}>
            <p className={styles.description}>{project.description}</p>

            {project.tags && (
              <div className={styles.tagsWrapper}>
                <h2 className={`sub-text ${styles.tagsTitle}`}>Built with:</h2>
                <div className={styles.tags}>
                  {project.tags?.map((tag) => (
                    <p key={tag._id} className={styles.tag}>
                      {tag.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.LinksWrapper}>
              {project.pageUrl && (
                <Link href={project.pageUrl} className={styles.LinkWrapper}>
                  <span className={styles.Link}>{project.pageLabel}</span>
                  <OpenPage />
                </Link>
              )}

              {project.githubUrl && (
                <Link href={project.githubUrl} className={styles.LinkWrapper}>
                  <span className={styles.Link}>{project.gitHubLabel}</span>
                  <Github />
                </Link>
              )}
            </div>
          </div>
        </div>

        <Image
          className={styles.isDesktop}
          alt={isDesktop.alt}
          src={isDesktop.url}
          fill
        />
      </div>
    </div>
  );
};

export default Project;
