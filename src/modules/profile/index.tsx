import { ViewState } from "@/types";
import { ProfileItem } from "@/models/profiles";
import Box from "@/components/custom/layout/box";
import Avatar from "@/components/custom/avatar";
import { Typography } from "@/components/custom/typography";

const Profile: React.FC<ViewState<ProfileItem>> = ({ viewProps }) => {
  const { data } = viewProps || {};
  const { avatar_url = "", username = "" } = data || {};

  return (
    <Box className="bg-card rounded-none sm:rounded p-0">
      <div className="relative w-full bg-red-300 h-20 mb-6">
        <Avatar
          src={avatar_url as string}
          alt={username as string}
          className="absolute h-18 w-18 -bottom-5 left-2"
        />
      </div>

      <div className="p-2">
        <Typography variant="large" weight="bold">
          {username}
        </Typography>
      </div>
    </Box>
  );
};

export default Profile;
