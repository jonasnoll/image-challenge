export type Image = {
  id: string;
  createdAt: Date;
  width: number;
  height: number;
  imageType: string;
  imageString: string;
  contentType: string; // to convert to valid uri
};

export type ImageDimension = {
  width: number;
  height: number;
};
