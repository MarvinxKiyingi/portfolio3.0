type IListOfAgencyWork = {
  _rev: string;
  _type: string;
  _id: string;
  href: string;
  _updatedAt: string;
  _createdAt: string;
  companyName: string;
};
type IOpenLink = IListOfAgencyWork & {
  indx: number;
};

type IBlockList = {
  listOfAgencyWork: IListOfAgencyWork[];
};

type IAgencyWorkGallery = {
  blockList: IBlockList;
};

type IAgencyWorkViewProps = {
  listOfAgencyWork: IListOfAgencyWork[];
};
