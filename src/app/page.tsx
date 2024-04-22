import './styles/scss/globals.scss';
import styles from './page.module.scss';
import { client } from './utils/sanity/client';
import { PortableText } from '@portabletext/react';
import { IHome } from './home';

export default async function Home() {
  const home = await client.fetch<IHome[]>(`*[name == "Home"]`);
  const { blockList } = home[0];
  const descriptionRichTextBlocks = blockList[0].richTextEditor;

  return <main></main>;
}
