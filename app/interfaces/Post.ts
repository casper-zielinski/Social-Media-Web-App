import { FieldValue } from "firebase/firestore";

interface Postable {
  likes: string[];
  text: string;
  name: string;
  userId: string;
  timeStamp: FieldValue;
  username: string;
  NumberOfComments: number;
  useremail: string;
}

export interface PostDTO extends Postable {}

export interface CommentDTO extends Postable {}

export type ReplyDTO = Omit<Postable, "NumberOfComments"> & {
  replyTo: {
    userId: string;
    userName: string;
    userUsername: string;
    textToReplyTo: string;
  };
  NumberOfReplys: number;
};
