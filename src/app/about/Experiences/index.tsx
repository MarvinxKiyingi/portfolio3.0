import React from 'react';
import styles from './Experiences.module.scss';
import { client } from '@/app/utils/sanity/client';
import ExperiencesView from './ExperiencesView';

const Experiences = async () => {
  const tagsArrayWTitle = await client.fetch<IExperienceGallery>(
    `*[name == "About"]{blockList[_type == "experienceGallery"][0]{...,listOfExperiences[]->}}[0]`
  );

  const { listOfExperiences } = tagsArrayWTitle.blockList;

  return (
    <div className={styles.wrapper}>
      <ExperiencesView listOfExperiences={listOfExperiences} />
    </div>
  );
};

export default Experiences;
