import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { GoBellFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function ChannelSubscribers() {
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.user.profileData?._id);
    const subscribers = useSelector(
        (state) => state.subscription.channelSubscribers
    );

    useEffect(() => {
        if (channelId) {
            dispatch(getUserChannelSubscribers(channelId));
        }
    }, [dispatch, channelId]);

    const navigate = useNavigate();

    return (
        <>
            {subscribers?.map((subscriber) => (
                <div
                    key={subscriber?.subscriber?._id}
                    className="flex border-b border-slate-500 px-3 py-1 justify-between items-center text-white"
                >
                    <div className="flex gap-3 items-center">
                        <Avatar
                            src={subscriber?.subscriber?.avatar.url}
                            channelName={subscriber?.subscriber?.username}

                        />
                        <div className="flex flex-col">
                            <span className="flex items-center">
                                <span>  {subscriber?.subscriber?.fullName} </span>
                                <span className="text-[12px] text-gray-400 my-1 cursor-pointer" onClick={() => navigate(`/channel/${subscriber?.subscriber?.username}`)}>
                                    /@{subscriber?.subscriber?.username}
                                </span>
                            </span>

                            <span className="text-xs text-slate-400">
                                {subscriber?.subscriber?.subscribersCount}{" "}
                                Subscribers
                            </span>
                        </div>
                    </div>
                    <div>
                        <Button className={` text-black text-xs py-1 px-2 ${subscriber?.subscriber?.subscribedToSubscriber ? 'bg-black border-2 ' : 'bg-purple-500'}`}>
                            {subscriber?.subscriber?.subscribedToSubscriber
                                ? <div className="flex items-center gap-2 justify-center"><GoBellFill /> Subscribed</div>
                                : "subscribe"}
                        </Button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ChannelSubscribers;
