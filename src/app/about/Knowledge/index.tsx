import React from 'react';
import styles from './Knowledge.module.scss';
import { client } from '@/app/utils/sanity/client';

type ITagsList = {
  _createdAt: string;
  _rev: string;
  _type: string;
  name: string;
  _id: string;
  _updatedAt: string;
  author?: Author;
};

type Author = {
  _ref: string;
  _type: string;
};

type BlockList = {
  title: string;
  _type: string;
  TagsList: ITagsList[];
  _key: string;
};

type ITagsArrayWTitle = {
  blockList: BlockList[];
};

const Knowledge = async () => {
  const tagsArrayWTitle = await client.fetch<ITagsArrayWTitle>(
    `*[name == "About"]{blockList[_type == "tagsArrayWTitle"]{...,TagsList[]->}}[0]`
  );

  const { blockList } = tagsArrayWTitle;

  return (
    <div className={styles.wrapper}>
      {blockList.map((item) => {
        const { title, TagsList, _key } = item;
        return (
          <>
            <div key={_key} className={`${styles.item}`}>
              <h2 className={`link ${styles.subHeading}`}>{title} </h2>
              <p className={`body ${styles.description}`}>
                {TagsList.map((tag) => (
                  <>
                    <span>{tag.name}</span>
                  </>
                ))}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Knowledge;
