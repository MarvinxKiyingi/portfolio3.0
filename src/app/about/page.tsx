import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import styles from './about.module.scss';
import Knowledge from './Knowledge';
import Experiences from './Experiences';
import { client } from '../utils/sanity/client';

type IParagraph = {
  blockList: BlockList;
};

type BlockList = {
  _type: string;
  _key: string;
  paragraph: string;
};

const About = async () => {
  const about = await client.fetch<IParagraph>(
    `*[name == "About"]{blockList[_type == "paragraph"][0]}[0]`
  );
  const { paragraph } = about.blockList;

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
