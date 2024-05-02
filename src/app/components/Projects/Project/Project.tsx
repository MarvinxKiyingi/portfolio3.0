'use client';
import React, { useState } from 'react';
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
  const { mobileImage, mobileImageAlt } = project;
  const [viewDetails, setViewDetails] = useState(false);

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

  function updateStyles() {
    setViewDetails(!viewDetails);
  }

  return (
    <div className={styles.container}>
      <Image
        alt={isMobile.alt}
        src={isMobile.img.url}
        className={styles.isMobile}
        width={isMobile.img.width}
        height={isMobile.img.height}
        priority
      />

      <Button
        className={`${
          !viewDetails ? styles.projectButton : styles.detailsButton
        }`}
        id={`${project._id}-viewDetailsButton`}
        onClick={() => updateStyles()}
        variant='outlinedWithTint'
        text={`${viewDetails ? 'Close' : 'Details'}`}
        icon='cross'
        isIconRotated={viewDetails}
        iconStyles={{ transition: 'transform 0.3s ease' }}
        as='button'
      />

      <div
        className={`${!viewDetails ? styles.detailsWrapper : styles.view}`}
        id={project._id}
      >
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
