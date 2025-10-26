import React, { useEffect, useRef, useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { MdGif, MdEmojiEmotions, MdLocalPostOffice } from "react-icons/md";
import Profile from "../Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { sendCommentOrReply } from "@/lib/post";
import useScreenSize from "@/app/hooks/useScreenSize";

interface BaseCommentModalProps {
  userdata: {
    name: string;
    username: string;
  };
  Posttext: string;
  PostId: string;
  replyId?: string;
}

type CommentModalProps =
  | (BaseCommentModalProps & {
      Reply: true;
      commentId: string;
    })
  | (BaseCommentModalProps & {
      Reply?: false;
      commentId?: undefined;
    });

const CommentModal = ({
  userdata,
  Posttext,
  PostId,
  Reply,
  commentId,
  replyId,
}: CommentModalProps) => {
  const [text, setText] = useState("");
  const [height, setHeight] = useState("h-[80px]");
  const [error, setError] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const pref = useRef<HTMLParagraphElement>(null);
  const screenSize = useScreenSize();

  useEffect(() => {
    setHeight(`${80 + ((pref.current?.offsetHeight || 24) / 24 - 1) * 24}px`);
  }, [pref.current?.offsetHeight, screenSize]);

  function getCorrectResponseToID() {
    return replyId ?? (Reply ? commentId : PostId);
  }

  async function sendComment() {
    await sendCommentOrReply(
      PostId,
      user,
      text,
      Reply || false,
      commentId,
      replyId,
      userdata,
      Posttext,
      setText,
      setError,
      getCorrectResponseToID
    );
  }

  return (
    <dialog
      id={`CommentModal${getCorrectResponseToID()}`}
      className="modal modal-middle"
      data-theme="dark"
    >
      <div className="modal-box w-10/12 max-w-10/12 min-h-0">
        <form method="dialog" name="Closing Post Modal">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <span className="text-white">✕</span>
          </button>
        </form>
        <div className="flex items-baseline min-w-0">
          <div className="flex flex-col items-center">
            <Profile
              classname="mt-2"
              userdata={[userdata.name, userdata.username]}
            />
            <div
              className={`w-0.5 bg-gray-500 m-0`}
              style={{ height: height }}
            />
            <Profile />
          </div>
          <div className="flex-col flex-grow min-w-0">
            <div className="ml-2 flex space-x-4 items-center">
              <p className="text-sm font-bold text-white">{userdata.name}</p>
              <p className="text-xs text-gray-500">{userdata.username}</p>
            </div>
            <div className="ml-4 mt-4">
              <p
                className="text-white text-[1rem] mb-1 break-words whitespace-normal"
                ref={pref}
              >
                {Posttext}
              </p>
              <p className="text-gray-400 text-xs">
                <span className="text-gray-500 mr-0.5">Replying to </span>
                {userdata.name}
              </p>
            </div>
            <div className="px-3 mt-5 sm:mt-9">
              <textarea
                placeholder="Send your Reply"
                className="textarea textarea-ghost w-full text-white"
                name="Post-Main"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="flex justify-start items-center space-x-4 relative">
          <AiFillPicture className="w-6 h-6 hover:scale-105  transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <MdGif className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <MdEmojiEmotions className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <GiPositionMarker className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <button
            onClick={() => {
              sendComment();
            }}
            className={`btn btn-info ${
              text.length < 1 ? "btn-disabled" : "btn-soft"
            } btn-sm absolute right-0 sm:w-24`}
          >
            <MdLocalPostOffice className="w-4 h-4" />
          </button>
        </div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop cursor-none"
        name="Closing Post Modal from Backgound"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CommentModal;
