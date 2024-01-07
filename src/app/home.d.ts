export type BlockList = {
  richTextEditor: RichTextEditor[];
  _type: string;
  _key: string;
};

export type RichTextEditor = {
  style: string;
  _key: string;
  markDefs: any[];
  children: Child[];
  _type: string;
};

export type Child = {
  _type: string;
  marks: any[];
  text: string;
  _key: string;
};

export type IHome = {
  _updatedAt: string;
  _createdAt: string;
  blockList: BlockList[];
  _rev: string;
  _type: string;
  name: string;
  _id: string;
};
