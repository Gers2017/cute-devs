export default interface Post {
  id: string;
  text: string;
  stars: number;
  date: string;
  creator: {
    id: string;
    username: string;
    imageUrl: string;
  };
}
