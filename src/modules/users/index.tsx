import { User } from "@/models/users";
import { useRouter } from "next/navigation";
import Avatar from "@/components/custom/avatar";
import Box from "@/components/custom/layout/box";
import { Typography } from "@/components/custom/typography";

const Index = ({ item }: { item: User }) => {
  const router = useRouter();
  const { avatar_url, username, display_name } = item || {};

  return (
    <Box
      color="background"
      className="p-2 mb-1 hover:bg-card/80 rounded-none sm:rounded cursor-pointer"
      onClick={() => router.push(`/${username}`)}
    >
      <div className="flex items-center gap-2">
        <Avatar src={avatar_url} alt={username} className="w-12 h-12" />
        <div className="flex flex-col">
          <Typography weight="semibold" className="text-md">
            {username}
          </Typography>
          <Typography variant="muted">
            {display_name === username ? "" : display_name}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default Index;
