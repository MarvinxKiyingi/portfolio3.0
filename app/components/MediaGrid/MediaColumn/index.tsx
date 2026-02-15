import React from 'react';
import { MediaGroup } from '@/sanity.types';
import { dataAttr } from '@/sanity/lib/utils';
import Media from '../../Media';
import { getColumnSpanClass } from '../getColumnSpanClass';
import { getColumnOrder } from '../getColumnOrder';

type IMediaColumn = {
  mediaColumn: MediaGroup;
  columnIdx: number;
  totalColumns: number;
  flipLayout?: boolean;
  dataSanity?: string;
  pageId?: string;
  pageType?: string;
  blockKey?: string;
  columnKey?: string;
};

const MediaColumn = ({
  mediaColumn,
  columnIdx,
  totalColumns,
  flipLayout,
  dataSanity,
  pageId,
  pageType,
  blockKey,
  columnKey,
}: IMediaColumn) => {
  const columnOrder = getColumnOrder(
    flipLayout,
    mediaColumn.columnSpan,
    columnIdx,
    totalColumns
  );

  const columnSpan = getColumnSpanClass(mediaColumn.columnSpan);

  // Build a data attribute scope for media items in this column
  const columnScope =
    pageId && pageType && blockKey && columnKey
      ? dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${blockKey}"].mediaItems[_key=="${columnKey}"]`,
        })
      : null;

  return (
    <div
      key={columnIdx}
      id={`media-column-${columnIdx + 1}`}
      className={`grid gap-5 ${columnSpan} ${columnOrder}`}
      {...(dataSanity && { 'data-sanity': dataSanity })}
    >
      {mediaColumn?.mediaItems?.map((mediaItem, itemIdx) => {
        const heightClass = mediaItem.fullHeight ? 'h-full' : 'h-fit';
        const paddingClass = mediaItem.border ? 'p-5 2xl:p-10' : '';
        const stickyClass = mediaItem.stickyToTop
          ? 'sticky top-5 2xl:top-10'
          : '';

        const customColors = {
          ...(mediaItem.borderColorLight?.hex && {
            '--light-bg': mediaItem.borderColorLight.hex,
          }),
          ...(mediaItem.borderColorDark?.hex && {
            '--dark-bg': mediaItem.borderColorDark.hex,
          }),
        } as React.CSSProperties;

        // Generate data attribute for individual media items
        const mediaItemDataAttr = columnScope
          ?.scope(`mediaItems[_key=="${mediaItem._key}"].media`)
          .toString();

        return (
          <div
            key={mediaItem._key}
            id={`media-column-${columnIdx + 1}-${itemIdx + 1}`}
            className={`w-full ${heightClass} ${paddingClass} ${stickyClass} media-bg`}
            style={customColors}
          >
            <Media
              media={mediaItem.media}
              alt={
                mediaItem.media?.image?.alt ||
                `Media item ${columnIdx + 1}-${itemIdx + 1}`
              }
              className="w-full object-cover"
              priority={columnIdx < 1 && itemIdx < 2}
              dataSanity={mediaItemDataAttr}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MediaColumn;
