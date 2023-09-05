export interface CommentBody {
  rating: number;
  name: string;
  date: string;
  commentTitle: string;
  commentDescription: string;
}

export interface Props {
  comment: CommentBody[];
}
