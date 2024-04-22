import './styles/scss/globals.scss';
import styles from './page.module.scss';
import { client } from './utils/sanity/client';
import { PortableText } from '@portabletext/react';
import { IHome } from './home';
import Link from 'next/link';

export default async function Home() {
  const home = await client.fetch<IHome[]>(`*[name == "Home"]`);
  const { blockList } = home[0];
  const descriptionRichTextBlocks = blockList[0].richTextEditor;

  return (
    <main className={styles.wrapper}>
      <div className={styles.gridItem}>
        <h1 className={styles.name}>
          <Link href='/' className={styles.initialsWrapper}>
            Marvin Kiyingi
          </Link>
        </h1>
      </div>
      <div className={styles.gridItem}></div>
    </main>
  );
}
