export interface IComment {
  name: string;
  review: string;
  rating: number;
  img: string;
  jobtitle: string;
  grade: "best" | "average" | "bad";
}
