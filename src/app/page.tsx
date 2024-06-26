import './styles/scss/globals.scss';
import styles from './page.module.scss';
import { client } from './utils/sanity/client';
import { PortableText } from '@portabletext/react';
import { IHome } from './home';
import Link from 'next/link';
import SocialLinks from './components/SocialLinks/SocialLinks';
import { IWork } from './components/Projects';
import OpenLink from './components/OpenLink/OpenLink';
import Projects from './components/Projects/Projects';

export default async function Home() {
  const home = await client.fetch<IHome[]>(`*[name == "Home"]`);
  const agencyWork = await client.fetch<IAgencyWorkGallery>(
    `*[name == "AgencyWork"][0]{blockList[0]{listOfAgencyWork[]->{...,tags[]->}}}`
  );
  const { blockList } = home[0];
  const descriptionRichTextBlocks = blockList[0].richTextEditor;
  const { listOfAgencyWork } = agencyWork.blockList;

  return (
    <main className={styles.wrapper}>
      <section className={styles.gridItem}>
        <h1 className={styles.nameWrapper}>
          <Link href='/' className={`heading-h1 ${styles.name}`}>
            Marvin Kiyingi
          </Link>
        </h1>

        <div className={styles.contactWrapper}>
          <div className={`sticky ${styles.contactContainer}`}>
            <span className={styles.dot} />
            <SocialLinks />
          </div>
        </div>

        <div className={`${styles.descriptionWrapper} body-tiny`}>
          <div className={`sticky ${styles.descriptionContainer}`}>
            <PortableText value={descriptionRichTextBlocks} />
          </div>
        </div>
      </section>

      <section className={`${styles.gridItem} ${styles.gridRowUnset}`}>
        <h2 className={`heading-h6 ${styles.workTitle}`}>
          Personal & Agency Contributions
        </h2>

        <ul className={`${styles.agencyWorkWrapper}`}>
          {listOfAgencyWork?.map((work) => (
            <OpenLink key={work._id} {...work} />
          ))}
        </ul>

        <Projects />
      </section>
    </main>
  );
}
