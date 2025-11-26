"use client";
import Profile from "@/modules/profile";
import { useReadStoreById } from "@/store";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const username = params.username as string;
  const viewProps = useReadStoreById("profiles", { id: username });

  console.log(viewProps);

  return (
    <div>
      <Profile />
    </div>
  );
};

export default Page;
