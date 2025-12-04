import React, { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import {
  ArrowUp,
  Forward,
  Repeat2,
  Bookmark,
  MessageCircle,
} from "lucide-react";

import { formatNum } from "@/lib";
import { useAuth } from "@/store";
import { AnyObject } from "@/types";
import { FeedItem } from "@/models";
import Button from "@/components/custom/button";
import { Drawer } from "@/components/custom/drawer";
import FeedShare from "./feed-share";

const FeedCta: React.FC<{ item: FeedItem }> = ({ item }) => {
  const { isAuth, user, toggleAuthGuard } = useAuth();
  const { engagementCount } = item || {};
  const {
    likes: initialLikes,
    repost: initialReposts,
    comments,
  } = engagementCount || {};

  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [likes, setLikes] = useState(initialLikes || 0);
  const [reposts, setReposts] = useState(initialReposts || 0);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .rpc("get_feed_summary", { p_feed_id: item.id, p_user_id: user?.id })
        .single();

      if (!error && data) {
        const {
          liked,
          reposted,
          bookmarked,
          likes_count,
          reposts_count,
          // bookmarks_count,
          // comments_count,
        } = (data || {}) as AnyObject;
        setLiked(liked ?? false);
        setLikes(likes_count ?? 0);
        setReposted(reposted ?? false);
        setReposts(reposts_count ?? 0);
        setBookmarked(bookmarked ?? false);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle engagement with optimistic UI
  const toggleEngagement = async (type: "like" | "repost") => {
    if (!isAuth) return alert("Login first!");
    // Optimistic UI update
    if (type === "like") {
      setLiked((prev) => !prev);
      setLikes((prev) => prev + (liked ? -1 : 1));
    }
    if (type === "repost") {
      setReposted((prev) => !prev);
      setReposts((prev) => prev + (reposted ? -1 : 1));
    }

    const { data, error } = await supabase.rpc("toggle_engagement", {
      p_user_id: user?.id,
      p_feed_id: item.id,
      p_type: type,
    });

    if (error) {
      console.error(error);
      // rollback UI
      if (type === "like") {
        setLiked((prev) => !prev);
        setLikes((prev) => prev + (liked ? 1 : -1));
      }
      if (type === "repost") {
        setReposted((prev) => !prev);
        setReposts((prev) => prev + (reposted ? 1 : -1));
      }
    } else {
      if (type === "like") setLiked(data as boolean);
      if (type === "repost") setReposted(data as boolean);
    }
  };

  const toggleBookmark = async () => {
    if (!user) return alert("Login first!");

    setBookmarked((prev) => !prev); // optimistic UI

    const { data, error } = await supabase.rpc("toggle_bookmark", {
      p_user_id: user.id,
      p_feed_id: item.id,
    });

    if (error) {
      console.error(error);
      setBookmarked((prev) => !prev); // rollback
    } else {
      setBookmarked(data as boolean);
    }
  };

  const actions = {
    like: () => toggleEngagement("like"),
    repost: () => toggleEngagement("repost"),
    comment: () => console.log("open page"),
    bookmark: toggleBookmark,
  };

  const handleClick = (e: React.MouseEvent, type: keyof typeof actions) => {
    e.stopPropagation();
    toggleAuthGuard(() => actions[type]() as unknown as () => void);
  };

  const buttons = [
    {
      icon: ArrowUp,
      children: formatNum(likes),
      variant: (liked ? "default" : "secondary") as "default" | "secondary",
      onClick: (e: React.MouseEvent) => handleClick(e, "like"),
    },
    {
      icon: Repeat2,
      children: formatNum(reposts),
      variant: (reposted ? "default" : "secondary") as "default" | "secondary",
      onClick: (e: React.MouseEvent) => handleClick(e, "repost"),
    },
    {
      icon: MessageCircle,
      children: formatNum(comments),
      variant: "secondary" as const,
      onClick: (e: React.MouseEvent) => handleClick(e, "comment"),
    },
  ];

  const buttons_v2 = [
    {
      icon: Bookmark,
      variant: (bookmarked ? "default" : "ghost") as "default" | "ghost",
      onClick: (e: React.MouseEvent) => handleClick(e, "bookmark"),
      isForward: false,
    },
    {
      icon: Forward,
      variant: "ghost" as const,
      // onClick: (e: React.MouseEvent) => handleClick(e, "forward"),
      isForward: true,
    },
  ];

  return (
    <div className="flex justify-between sm:justify-start mt-3">
      <div className="flex space-x-1">
        {buttons.map((item, idx) => (
          <Button key={idx} {...item} size="sm" className="rounded-full" />
        ))}
        <div className="flex">
          {buttons_v2.map((v, idx) => {
            const { isForward, ...buttonProps } = v || {};
            if (isForward) {
              return (
                <Drawer
                  key={idx}
                  title="Share"
                  triggerBtn={
                    <Button
                      key={idx}
                      {...buttonProps}
                      size="sm"
                      className="rounded-full"
                    />
                  }
                >
                  <FeedShare item={item} />
                </Drawer>
              );
            }

            return (
              <Button
                key={idx}
                {...buttonProps}
                size="sm"
                className="rounded-full"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedCta;
