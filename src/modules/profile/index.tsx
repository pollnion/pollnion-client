import { ViewState } from "@/types";
import { ProfileItem } from "@/models/profiles";

const Profile: React.FC<ViewState<ProfileItem>> = ({ viewProps }) => {
  const { data } = viewProps || {};
  console.log(data);

  return <div>profile</div>;
};

export default Profile;
