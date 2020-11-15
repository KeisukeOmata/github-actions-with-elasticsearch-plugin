export type Api = {
  id: string;
  title: string;
  body: string;
  publishedAt?: Date;
  category: {
    name: string
  };
};
