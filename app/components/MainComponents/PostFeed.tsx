"use client";

import { useEffect, useState } from "react";
import Profile from "../ui/Profile";
import FollowButton from "../MainComponents/FollowButton";
import MainButtons from "../MainComponents/MainButtons";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { subscribeToPostsFeed } from "@/lib/get";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTION_PATH } from "@/app/constants/path";
import Moment from "react-moment";
import CommentModal from "../PopUpModals/CommentModal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CommentShower from "./CommentShower";
import TruncateText from "../ui/TruncateText";
import EmptyPostFeed from "./EmptyPostFeed";
import Poster from "./Poster";

const PostFeed = ({
  navigationPagerForYou,
}: {
  navigationPagerForYou: boolean;
}) => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [postsFollowing, setPostsFollowing] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [showComments, setShowComments] = useState<boolean[]>([]);
  const [hideFullText, setHideFullText] = useState<boolean[]>([]);
  const loaded = useSelector((state: RootState) => state.loader.loaded);
  const [loading, setLoading] = useState(true);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (
      !loaded ||
      !user.userTableId ||
      user.email === "guest123@gmail.com" ||
      user.email === ""
    )
      return;
    const unsubscribeFollowing = onSnapshot(
      collection(
        db,
        COLLECTION_PATH.USERS,
        user.userTableId,
        COLLECTION_PATH.FOLLOWING,
      ),
      (snap) =>
        setFollowingIds(snap.docs.map((d) => d.data().userTableId as string)),
    );
    return unsubscribeFollowing;
  }, [loaded, user.userTableId, user.email]);

  useEffect(() => {
    if (loaded) {
      const unsubsribe = subscribeToPostsFeed(
        setPosts,
        setPostsFollowing,
        setShowComments,
        setHideFullText,
        user,
        setLoading,
      );
      return unsubsribe;
    }
  }, [loaded]);

  const showPosts = navigationPagerForYou ? posts : postsFollowing;

  if (showPosts.length > 0 && !loading)
    return (
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        <Poster />
        {showPosts.map((post, index) => (
          <article
            className={`${showPosts.length - 1 !== index ? "border-b-2" : ""} border-blue-400 dark:border-blue-950 overflow-hidden hover:bg-slate-100 dark:hover:bg-gray-900`}
            key={post.id}
          >
            <CommentModal
              userdata={{
                name: post.data().name,
                username: post.data().username,
              }}
              Posttext={post.data().text}
              PostId={post.id}
            />
            <div className="flex items-center w-full">
              <div className="m-2 flex-1 min-w-0">
                <Profile
                  classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
                  tooltipDirectionEmail="tooltip-bottom"
                  displayUserInfo={true}
                  userdata={[post.data().name, post.data().username]}
                />
              </div>
              <div className="flex flex-shrink-0 justify-end ml-auto mr-2 mt-3">
                <FollowButton
                  followActionParameters={{
                    currentuser: user,
                    toFollowUserId: post.data().userFromUserTableId,
                  }}
                  isFollowing={followingIds.includes(
                    post.data().userFromUserTableId,
                  )}
                />
              </div>
            </div>
            {post.data().text.length > 500 && hideFullText[index] ? (
              <TruncateText
                maxLength={500}
                text={post.data().text}
                widthToShowFull={Infinity}
                className="m-2 break-words text-black dark:text-white"
              />
            ) : (
              <p className="m-2 break-words text-black dark:text-white">
                {post.data().text}
              </p>
            )}

            {post.data().text.length > 500 && (
              <button
                className="p-2 "
                onClick={() =>
                  setHideFullText((prev) =>
                    [...prev].map((p, i) => (i === index ? !p : p)),
                  )
                }
              >
                {hideFullText[index] ? (
                  <span className="text-sm text-gray-600 hover:text-gray-500">
                    Show Full Text
                  </span>
                ) : (
                  <span className="text-sm text-gray-600 hover:text-gray-500">
                    Hide Text
                  </span>
                )}
              </button>
            )}

            <p className="m-2 text-end text-xs text-gray-500">
              {post.data().timeStamp && (
                <Moment fromNow date={post.data().timeStamp.toDate()} />
              )}
            </p>
            <div className="divider"></div>

            <MainButtons
              commentId={posts[index].id}
              ShowCommentObject={{
                showComments: showComments,
                setShowComments: setShowComments,
                index: index,
                commentamout: post.data().NumberOfComments,
              }}
              Likes={post.data().likes}
              isLiked={post.data().likes.includes(user.email)}
            />

            {showComments[index] && (
              <CommentShower post={post} postId={post.id} />
            )}
          </article>
        ))}
      </div>
    );

  if (loading) {
    return (
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        <Poster />
        {Array.from({ length: 4 }, (_, index) => (
          <article
            className="border-b-2 border-blue-400 dark:border-blue-950 overflow-hidden hover:bg-slate-100 dark:hover:bg-gray-900"
            key={index}
          >
            <div className="flex items-center w-full">
              <div className="m-2 flex-1 min-w-0">
                <Profile
                  classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
                  displayUserInfo={true}
                />
              </div>
              <div className="flex flex-shrink-0 justify-end ml-auto mr-2 mt-3">
                <FollowButton disabled={!loaded} />
              </div>
            </div>
            <div className="grid grid-cols-10 gap-2 p-3">
              {Array.of(
                "col-span-7",
                "col-span-3",
                "col-span-4",
                "col-span-6",
                "col-span-2",
                "col-span-4",
                "col-span-4",
              ).map((val, index) => {
                return (
                  <div
                    key={index}
                    className={`${val} animate-pulse bg-gray-500 p-2`}
                  ></div>
                );
              })}
            </div>
            <div className="divider"></div>

            <MainButtons
              commentId={""}
              ShowCommentObject={{
                showComments: [],
                setShowComments: setShowComments,
                index: index,
                commentamout: null,
              }}
            />
          </article>
        ))}
      </div>
    );
  }

  if (!loading) {
    return (
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        <EmptyPostFeed navigationPagerForYou={navigationPagerForYou} />
      </div>
    );
  }
};

export default PostFeed;
