export type ImageResponse = {
  id: string;
  createdAt: Date;
  width: number;
  height: number;
  imageType: string;
  imageURI: string;
};

export type ImagesResponse = {
  message: string;
  data: ImageResponse[];
};
