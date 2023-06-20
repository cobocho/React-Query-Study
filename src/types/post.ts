export interface Post {
  id: string;
  title: string;
  body: string;
  comment: Comment;
}

export interface Comment {
  id: string;
  email: string;
  body: string;
}
