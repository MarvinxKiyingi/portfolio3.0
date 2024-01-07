import React from 'react';
import styles from './Knowledge.module.scss';
import { client } from '@/app/utils/sanity/client';

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
