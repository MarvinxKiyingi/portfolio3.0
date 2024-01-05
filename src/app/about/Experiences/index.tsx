import React from 'react';
import styles from './Experiences.module.scss';
import Image from 'next/image';
import Experience from './Experience';
import { client } from '@/app/utils/sanity/client';

export type IListOfExperience = {
  companyName: string;
  _type: string;
  from: string;
  _id: string;
  to: string;
  _updatedAt: string;
  image?: IImage;
  _createdAt: string;
  role: string;
  _rev: string;
};

type IImage = {
  _type: string;
  asset: IAsset;
};

type IAsset = {
  _ref: string;
  _type: string;
};

type IBlockList = {
  listOfExperiences: IListOfExperience[];
  _type: string;
  _key: string;
  title: string;
};

type IExperienceGallery = {
  blockList: IBlockList;
};

const Experiences = async () => {
  const tagsArrayWTitle = await client.fetch<IExperienceGallery>(
    `*[name == "About"]{blockList[_type == "experienceGallery"][0]{...,listOfExperiences[]->}}[0]`
  );

  const { listOfExperiences } = tagsArrayWTitle.blockList;

  return (
    <div className={styles.wrapper}>
      <Image className={styles.image} src='' alt='hello' fill />
      <div className={styles.experienceContent}>
        {listOfExperiences.map((experience) => (
          <>
            <Experience key={experience._id} experience={experience} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
