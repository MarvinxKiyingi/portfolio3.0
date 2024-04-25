'use client';
import React from 'react';
import styles from './Project.module.scss';
import { IProjectProps } from '.';
import Image from 'next/image';
import { urlForImage } from '@/app/utils/sanity/imgBuilder';
import Button from '../../Button/Button';
import Link from 'next/link';
import Github from '../../Icons/Github';
import { getImageDimensions } from '@sanity/asset-utils';
import OpenLinkIcon from '../../Icons/OpenLinkIcon';

const Project = ({ project, indx }: IProjectProps) => {
  const { name, mobileImage, mobileImageAlt, desktopImage, desktopImageAlt } =
    project;

  const isMobile = {
    alt: `${mobileImageAlt}`,
    img: {
      url: mobileImage ? urlForImage(mobileImage).url() : '',
      width: mobileImage
        ? getImageDimensions(urlForImage(mobileImage).url()).width
        : 0,
      height: mobileImage
        ? getImageDimensions(urlForImage(mobileImage).url()).height
        : 0,
      aspectRatio: mobileImage
        ? getImageDimensions(urlForImage(mobileImage).url()).aspectRatio
        : 0,
    },
  };

  function viewDetails() {
    document.getElementById(`${project._id}`)?.classList.toggle('view');
  }

  return (
    <div className={styles.container}>
      <Image
        alt={isMobile.alt}
        src={isMobile.img.url}
        className={styles.isMobile}
        width={isMobile.img.width}
        height={isMobile.img.height}
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
          <p className={`body ${styles.description}`}>{project.description}</p>

          {project.tags && (
            <div className={styles.tagsWrapper}>
              <h3 className={`body-small ${styles.tagsTitle}`}>Built with:</h3>
              <div className={styles.tags}>
                {project.tags?.map((tag) => (
                  <p key={tag._id} className={`body-small ${styles.tag}`}>
                    {tag.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className={styles.LinksWrapper}>
            {project.pageUrl && (
              <Link href={project.pageUrl} className={styles.LinkWrapper}>
                <span className={`link ${styles.Link}`}>
                  {project.pageLabel}
                </span>
                <OpenLinkIcon />
              </Link>
            )}

            {project.githubUrl && (
              <Link href={project.githubUrl} className={styles.LinkWrapper}>
                <span className={`link ${styles.Link}`}>
                  {project.gitHubLabel}
                </span>
                <Github />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
