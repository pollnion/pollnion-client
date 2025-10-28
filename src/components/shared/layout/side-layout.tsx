import { Children, Element } from "@/types/global";

const SideLayout: React.FC<{
  left: Children;
  right: Children;
  children: Children;
}> = ({ left, right, children }): Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_300px] gap-4">
      {left && <aside className="hidden md:block">{left}</aside>}

      {children && <main>{children}</main>}

      {right && <aside className="hidden lg:block">{right}</aside>}
    </div>
  );
};

export default SideLayout;
