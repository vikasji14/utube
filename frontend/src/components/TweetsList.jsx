import React, { useState } from "react";
import { useSelector } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";
import { useDispatch } from "react-redux";
import { Like, DeleteConfirmation, Edit } from "./index";
import { HiOutlineDotsVertical } from "./icons";
import { deleteTweet, editTweet } from "../store/Slices/tweetSlice";

function TweetsList({
    tweetId,
    avatar,
    username,
    fullName,
    createdAt,
    content,
    likesCount = 0,
    isLiked,
}) {
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const dispatch = useDispatch();

    const [editState, setEditState] = useState({
        editing: false,
        editedContent: content,
        isOpen: false,
        delete: false,
    });

    const handleEditTweet = (editedContent) => {
        dispatch(editTweet({ tweetId, content: editedContent }));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            editedContent,
            isOpen: false,
            delete: false,
        }));
    };

    const handleDeleteTweet = () => {
        dispatch(deleteTweet(tweetId));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            isOpen: false,
            delete: false,
        }));
    };

    return (
        <>
            <div className="text-white w-full flex flex-col  justify-start items-start border-b border-slate-600 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-1">
                        <img
                            src={avatar || avatar2}
                            className="w-12 h-12 object-cover rounded-full"
                        />
                        <div className="flex items-center gap-2">
                            <span className="flex flex-col pl-2 ">
                                <span>{fullName}</span>
                                <span className="text-xs"> @{username}</span>
                            </span>
                           
                        </div>

                    </div>

                    <div>
                        {authUsername == username && (
                            <div className="w-8 h-8 pr-4 font-bold pl-10 right-0 text-2xl  cursor-pointer">
                                <HiOutlineDotsVertical
                                    onClick={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            isOpen: !prevState.isOpen,
                                        }))
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full pl-14 flex flex-col gap-1 relative">


                    {/* editing the tweet */}

                    {editState.editing ? (
                        <Edit
                            initialContent={editState.editedContent}
                            onCancel={() =>
                                setEditState((prevState) => ({
                                    ...prevState,
                                    editing: false,
                                    isOpen: false,
                                }))
                            }
                            onSave={handleEditTweet}
                        />
                    ) : (
                        editState.editedContent
                    )}

                    {/* Like the tweet */}
                    <div className="mt-4">
                        <Like
                            isLiked={isLiked}
                            likesCount={likesCount}
                            tweetId={tweetId}
                            size={20}
                        />
                         <span className="text-xs text-slate-400">
                            {timeAgo(createdAt)}
                        </span>

                    </div>


                    {/* edit and delete dropdown */}
                    {editState.isOpen && (
                        <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
                            <ul>
                                <li
                                    className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                                    onClick={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            editing: !prevState.editing,
                                            isOpen: false,
                                        }))
                                    }
                                >
                                    Edit
                                </li>
                                <li
                                    className="px-5 hover:opacity-50 cursor-pointer"
                                    onClick={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            delete: true,
                                            isOpen: false,
                                        }))
                                    }
                                >
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* deleteing the tweet */}
                    {editState.delete && (
                        <DeleteConfirmation
                            tweet={true}
                            onCancel={() =>
                                setEditState((prevState) => ({
                                    ...prevState,
                                    delete: !prevState.delete,
                                }))
                            }
                            onDelete={handleDeleteTweet}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default TweetsList;