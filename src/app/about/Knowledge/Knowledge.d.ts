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
