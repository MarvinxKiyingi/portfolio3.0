import React from 'react';
import { MediaGrid as MediaGridType, HeaderQueryResult } from '@/sanity.types';
import { dataAttr } from '@/sanity/lib/utils';
import MediaColumn from './MediaColumn';

type IMediaGrid = {
  block: MediaGridType & { _key: string };
  index: number;
  header?: HeaderQueryResult;
  pageId?: string;
  pageType?: string;
};

const MediaGrid = ({ block, pageId, pageType }: IMediaGrid) => {
  if (!block) return null;

  const { mediaItems } = block;

  const totalColumns = mediaItems?.length || 0;

  // Build a data attribute scope for this block if live preview metadata is available
  const blockScope =
    pageId && pageType
      ? dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        })
      : null;

  return (
    <section
      id="media-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {mediaItems?.map((mediaColumn, columnIdx) => {
        const columnDataAttr = blockScope
          ?.scope(`mediaItems[_key=="${mediaColumn._key}"]`)
          .toString();

        return (
          <MediaColumn
            key={mediaColumn._key}
            mediaColumn={mediaColumn}
            columnIdx={columnIdx}
            totalColumns={totalColumns}
            flipLayout={block?.flipLayout}
            dataSanity={columnDataAttr}
            pageId={pageId}
            pageType={pageType}
            blockKey={block._key}
            columnKey={mediaColumn._key}
          />
        );
      })}
    </section>
  );
};

export default MediaGrid;
