import './styles/scss/globals.scss';
import styles from './page.module.scss';
import { client } from './utils/sanity/client';
import { PortableText } from '@portabletext/react';
import { IHome } from './home';
import Link from 'next/link';
import SocialLinks from './components/SocialLinks/SocialLinks';

export default async function Home() {
  const home = await client.fetch<IHome[]>(`*[name == "Home"]`);
  const { blockList } = home[0];
  const descriptionRichTextBlocks = blockList[0].richTextEditor;

  return (
    <main className={styles.wrapper}>
      <div className={styles.gridItem}>
        <h1 className={styles.name}>
          <Link href='/' className={`heading-h1 ${styles.initialsWrapper}`}>
            Marvin Kiyingi
          </Link>
        </h1>

        <div className={styles.contactWrapper}>
          <span className={styles.dot} />
          <SocialLinks />
        </div>
      </div>
      <div className={styles.gridItem}></div>
    </main>
  );
}
