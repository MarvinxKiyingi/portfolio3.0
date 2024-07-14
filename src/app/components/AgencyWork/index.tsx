import React from 'react';
import styles from './AgencyWork.module.scss';
import { client } from '@/app/utils/sanity/client';
import OpenLink from '../OpenLink/OpenLink';

const AgencyWork = async () => {
  const agencyWork = await client.fetch<IAgencyWorkGallery>(
    `*[name == "AgencyWork"][0]{blockList[0]{listOfAgencyWork[]->{...,tags[]->}}}`
  );
  const { listOfAgencyWork } = agencyWork.blockList;

  return (
    <ul className={`${styles.agencyWorkWrapper}`}>
      {listOfAgencyWork?.map((work, indx) => (
        <OpenLink key={work._id} indx={indx} {...work} />
      ))}
    </ul>
  );
};

export default AgencyWork;
