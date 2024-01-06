import './styles/scss/globals.scss';
import styles from './page.module.scss';
import NavBar from './components/NavBar/NavBar';
import { client } from './utils/sanity/client';
import { PortableText } from '@portabletext/react';
import Work from './components/Projects/Projects';
import LogoMarquee from './components/LogoMarquee/LogoMarquee';
import { IHome } from './home';

export default async function Home() {
  const home = await client.fetch<IHome[]>(`*[name == "Home"]`);
  const { blockList } = home[0];
  const descriptionRichTextBlocks = blockList[0].richTextEditor;

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <NavBar />

        <section className={styles.textWrapper}>
          <PortableText value={descriptionRichTextBlocks} />
        </section>
      </div>

      <div className={styles.workWrapper}>
        <LogoMarquee />
        <Work />
      </div>
    </main>
  );
}
