'use client';
import React, { useState } from 'react';
import styles from '../Experiences.module.scss';
import Image from 'next/image';
import { urlForImage } from '@/app/utils/sanity/imgBuilder';
import Experience from '../Experience';
import { getImageDimensions } from '@sanity/asset-utils';

type IExperiencesViewProps = {
  listOfExperiences: IListOfExperience[];
};

const ExperiencesView = ({ listOfExperiences }: IExperiencesViewProps) => {
  const [activeIndx, setActiveIndx] = useState(0);

  const imgUrl = urlForImage(listOfExperiences[activeIndx].image).url() || '';

  const imgDimensions = getImageDimensions(imgUrl);

  const getActiveIndex = (indx: number) => {
    setActiveIndx(indx);
  };

  return (
    <>
      <Image
        className={styles.image}
        src={imgUrl}
        alt='hello'
        height={imgDimensions.width}
        width={imgDimensions.height}
      />
      <div className={styles.experienceContent}>
        {listOfExperiences.map((experience, indx) => (
          <Experience
            key={experience._id}
            experience={experience}
            onMouseEnter={() => getActiveIndex(indx)}
          />
        ))}
      </div>
    </>
  );
};

export default ExperiencesView;
