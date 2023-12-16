import './styles/scss/globals.scss';
import styles from './page.module.scss';
import NavBar from './components/NavBar/NavBar';
import ArrowDown from './components/Icons/ArrowDown';
import { client } from './utils/sanity/client';
import { PortableText } from '@portabletext/react';
import NavPill from './components/NavPill/NavPill';

type BlockList = {
  richTextEditor: RichTextEditor[];
  _type: string;
  _key: string;
};

type RichTextEditor = {
  style: string;
  _key: string;
  markDefs: any[];
  children: Child[];
  _type: string;
};

type Child = {
  _type: string;
  marks: any[];
  text: string;
  _key: string;
};

type IHome = {
  _updatedAt: string;
  _createdAt: string;
  blockList: BlockList[];
  _rev: string;
  _type: string;
  name: string;
  _id: string;
};

export default async function Home() {
  const home = await client.fetch<IHome[]>(`*[name == "Home"]`);
  const { blockList } = home[0];
  const descriptionRichTextBlocks = blockList[0].richTextEditor;

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <NavBar />

        <section className={styles.textWrapper}>
          {/* //Todo: Customize PortableText's styles with the `components`prop  */}
          {/* //Todo: Once above is done, remove the example comment bellow   */}
          {/* <p className={`sub-text ${styles.description}`}>
          </p> */}
          <PortableText value={descriptionRichTextBlocks} />
        </section>
      </div>
      <NavPill />
    </main>
  );
}
