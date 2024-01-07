export type IParagraph = {
  blockList: IBlockList;
};

export type IBlockList = {
  _type: string;
  _key: string;
  paragraph: string;
};
