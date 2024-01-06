type IListOfExperience = {
  companyName: string;
  _type: string;
  from: string;
  _id: string;
  to: string;
  _updatedAt: string;
  image: IImage;
  _createdAt: string;
  role: string;
  _rev: string;
};

type IImage = {
  _type: string;
  asset: IAsset;
};

type IAsset = {
  _ref: string;
  _type: string;
};

type IBlockList = {
  listOfExperiences: IListOfExperience[];
  _type: string;
  _key: string;
  title: string;
};

type IExperienceGallery = {
  blockList: IBlockList;
};
