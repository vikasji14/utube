import React, { useState } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { useSelector, useDispatch } from "react-redux";
import { Like, DeleteConfirmation, Edit } from "./index";
import { HiOutlineDotsVertical } from "./icons";
import { deleteAComment, editAComment } from "../store/Slices/commentSlice";

function CommentsList({
    avatar,
    username,
    createdAt,
    content,
    commentId,
    isLiked,
    likesCount,
}) {
    const avatar2 = useSelector((state) => state.auth?.userData?.avatar.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const dispatch = useDispatch();

    const [editState, setEditState] = useState({
        editing: false,
        editedContent: content,
        isOpen: false,
        delete: false,
    });

    const handleEditComment = (editedContent) => {
        console.log(editedContent);
        dispatch(editAComment({ commentId, content: editedContent }));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            editedContent,
            isOpen: false,
            delete: false,
        }));
    };

    const handleDeleteComment = () => {
        dispatch(deleteAComment(commentId));
        setEditState((prevState) => ({
            ...prevState,
            delete: false,
        }));
    };

    return (
        <>
            <div className="text-white w-full flex flex-col  justify-start items-start border-b border-slate-600 p-2">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-1">
                        <img
                            src={avatar || avatar2}
                            className="w-12 h-12 object-cover rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                            <span className="flex flex-row items-center justify-between">
                                <span className="text-[15px] text-gray-400 "> @{username}</span>
                                <span className="text-[15px] text-gray-400 ">
                                    <div>
                                        {authUsername == username && (
                                            <div className="w-8 h-8 pr-8 font-bold pl-10 right-0 text-2xl  cursor-pointer">
                                                <HiOutlineDotsVertical
                                                    onClick={() =>
                                                        setEditState((prevState) => ({
                                                            ...prevState,
                                                            isOpen: !prevState.isOpen,
                                                        }))
                                                    }
                                                />
                                                {/* edit and delete dropdown */}
                                                {editState.isOpen && (
                                                    <div className="border bg-black text-lg border-slate-600 absolute left-0  text-center  rounded-xl">
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
                                            </div>
                                        )}
                                    </div>
                                </span>
                            </span>
                            {/* edit and write comment */}
                            <span>
                                {editState.editing ? (
                                    <Edit
                                        className="w-[800px]"
                                        initialContent={editState.editedContent}
                                        onCancel={() =>
                                            setEditState((prevState) => ({
                                                ...prevState,
                                                editing: false,
                                                isOpen: false,
                                            }))
                                        }
                                        onSave={handleEditComment}
                                    />
                                ) : (
                                    <div className=" overflow-hidden pr-4 w-[330px] md:w-[800px] break-words">
                                        {editState.editedContent}
                                    </div>


                                )}
                            </span>
                        </div>


                    </div>




                </div>

                <div className="flex flex-wrap gap-1">

                    {/* Like the tweet */}
                    <div className="mt-4 pl-10">
                        <Like
                            isLiked={isLiked}
                            likesCount={likesCount}
                            tweetId={commentId}
                            size={20}
                        />
                        <span className="text-xs text-slate-400">
                            {timeAgo(createdAt)}
                        </span>

                    </div>





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
                            onDelete={handleDeleteComment}
                        />
                    )}


                </div>
            </div>
        </>
    );
}

export default CommentsList;
