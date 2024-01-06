import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import styles from './about.module.scss';
import Knowledge from './Knowledge';
import Experiences from './Experiences';
import { client } from '../utils/sanity/client';
import { IParagraph } from './About';

const About = async () => {
  const about = await client.fetch<IParagraph>(
    `*[name == "About"]{blockList[_type == "paragraph"][0]}[0]`
  );
  const { paragraph } = about.blockList;

  console.log('hello:', about.blockList);
  return (
    <div className={styles.wrapper}>
      <NavBar />

      <div className={styles.content}>
        <h1 className={`${styles.heading}`}>{paragraph}</h1>
        <Knowledge />
        <Experiences />
      </div>
    </div>
  );
};

export default About;
