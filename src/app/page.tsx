import './styles/scss/globals.scss';
import styles from './page.module.scss';
import { client } from './utils/sanity/client';
import { PortableText } from '@portabletext/react';
import { IHome } from './home';
import Link from 'next/link';
import SocialLinks from './components/SocialLinks/SocialLinks';
import { IWork } from './components/Projects';
import OpenLink from './components/OpenLink/OpenLink';

export default async function Home() {
  const home = await client.fetch<IHome[]>(`*[name == "Home"]`);
  const work = await client.fetch<IWork>(
    `*[name == "Work"][0]{blockList[0]{listOfProjects[]->{...,tags[]->}}}`
  );
  const agencyWork = await client.fetch<IAgencyWorkGallery>(
    `*[name == "AgencyWork"][0]{blockList[0]{listOfAgencyWork[]->{...,tags[]->}}}`
  );
  const { blockList } = home[0];
  const descriptionRichTextBlocks = blockList[0].richTextEditor;
  const { listOfProjects } = work.blockList;
  const { listOfAgencyWork } = agencyWork.blockList;

  console.log('listOfAgencyWork:', listOfAgencyWork);

  return (
    <main className={styles.wrapper}>
      <section className={styles.gridItem}>
        <h1 className={styles.name}>
          <Link href='/' className={`heading-h1 ${styles.initialsWrapper}`}>
            Marvin Kiyingi
          </Link>
        </h1>

        <div className={styles.contactWrapper}>
          <span className={styles.dot} />
          <SocialLinks />
        </div>

        <div className={`${styles.descriptionWrapper} body-tiny`}>
          <PortableText value={descriptionRichTextBlocks} />
        </div>
      </section>

      <section className={styles.gridItem}>
        <h2 className={`heading-h6 ${styles.workTitle}`}>
          Personal & Agency Contributions
        </h2>

        <ul className={`${styles.agencyWorkWrapper}`}>
          {listOfAgencyWork?.map((work) => (
            <OpenLink key={work._id} {...work} />
          ))}
        </ul>
      </section>
    </main>
  );
}
