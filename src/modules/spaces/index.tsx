import { map } from "lodash";

import { useReadStore } from "@/store";
import Button from "@/components/custom/button";
import { TABLE_SPACES } from "@/constants/tables";
import { Typography } from "@/components/custom/typography";
import SpacesSkeleton from "./spaces-skeleton";

const Index = () => {
  const spacesProps = useReadStore<{ label: string }>(TABLE_SPACES);

  if (spacesProps.isLoading) {
    return <SpacesSkeleton />;
  }

  return (
    <div>
      <Typography className="mb-2">Spaces</Typography>
      <div className="border-l px-2">
        {map(spacesProps.data, (item: { label: string }, idx: number) => {
          const { label } = item || {}; // value,
          return (
            <div key={idx}>
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                {label}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
