import { cn } from "@/lib/utils";
import { Children } from "@/types/global";

const commonStyles =
  "space-y-4 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto scroll-invisible";

interface SideColumnProps {
  children: Children;
  className?: string;
}

/**
 * SideColumn — base wrapper for left and right side sections
 */
const SideColumn = ({ children, className }: SideColumnProps) => (
  <aside className={cn(commonStyles, className)}>{children}</aside>
);

/**
 * PublicColLayout — 3-column layout (Left, Middle, Right)
 *
 * left: hidden on mobile, shown on sm+
 * right: hidden on md-, shown on md+
 * children: main middle content
 */
interface PublicColLayoutProps {
  left?: Children;
  right?: Children;
  children: Children;
}

const PublicColLayout = ({ left, right, children }: PublicColLayoutProps) => (
  <div className="flex items-start justify-between md:space-x-2">
    {left && (
      <SideColumn className="hidden sm:block sm:w-[200px] md:w-[280px]">
        {left}
      </SideColumn>
    )}

    <div className="w-full md:w-[560px] space-y-4">{children}</div>

    {right && (
      <SideColumn className="hidden md:block sm:w-[200px] md:w-[280px]">
        {right}
      </SideColumn>
    )}
  </div>
);

export default PublicColLayout;
