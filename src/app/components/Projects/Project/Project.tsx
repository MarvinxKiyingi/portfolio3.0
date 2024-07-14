'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Github from '../../Icons/Github';
import OpenLinkIcon from '../../Icons/OpenLinkIcon';
import Button from '../../Button/Button';
import styles from './Project.module.scss';
import { IProjectProps } from '.';
import { urlForImage } from '@/app/utils/sanity/imgBuilder';
import { getImageDimensions } from '@sanity/asset-utils';

const Project = ({ project, indx }: IProjectProps) => {
  const { mobileImage, mobileImageAlt } = project;
  const [viewDetails, setViewDetails] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);

  const imageUrl = mobileImage ? urlForImage(mobileImage).url() : '';
  const { width, height, aspectRatio } = mobileImage
    ? getImageDimensions(imageUrl)
    : { width: 0, height: 0, aspectRatio: 0 };

  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };

  const detailsButtonStyles: IButton = {
    className: viewDetails ? styles.detailsButton : styles.projectButton,
    id: `${project._id}-viewDetailsButton`,
    onClick: toggleDetails,
    variant: 'outlinedWithTint',
    text: viewDetails ? 'Close' : 'Details',
    icon: 'cross',
    isIconRotated: viewDetails,
    iconStyles: { transition: 'transform 0.3s ease' },
    as: 'button',
  };

  // Delay visibility effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsViewVisible(true);
    }, indx * 400);

    return () => clearTimeout(timer);
  }, [indx]);

  return (
    <div
      className={`${styles.container} ${
        isViewVisible ? styles.containerView : undefined
      }`}
    >
      <div className={styles.imageContainer}>
        <Image
          alt={mobileImageAlt}
          src={imageUrl}
          className={styles.isMobile}
          width={width}
          height={height}
          priority
        />
      </div>

      <Button {...detailsButtonStyles} />

      <div
        className={`${styles.detailsWrapper} ${viewDetails ? styles.view : ''}`}
        id={project._id}
      >
        <div className={styles.details}>
          <p className={`body ${styles.description}`}>{project.description}</p>

          {project.tags && (
            <div className={styles.tagsWrapper}>
              <h3 className={`body-small ${styles.tagsTitle}`}>Built with:</h3>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
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
