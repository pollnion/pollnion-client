import React from "react";
import truncate from "lodash/truncate";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbProps = {
  data: { href?: string; label: string }[];
  isLoading?: boolean;
};

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { data } = props; // isLoading
  const _path: string = usePathname();

  const isActive = (path?: string) => path === _path;

  return (
    <React.Fragment>
      <ShadcnBreadcrumb className="px-3">
        <ShadcnBreadcrumbList>
          {data.map(({ href = undefined, label }, index: number) => {
            const _label = truncate(label, { length: 20 });

            return (
              <React.Fragment key={index}>
                {index !== 0 && <ShadcnBreadcrumbSeparator />}
                <ShadcnBreadcrumbItem>
                  {href === undefined && <span>{_label}</span>}
                  {isActive(href) && (
                    <ShadcnBreadcrumbPage>{_label}</ShadcnBreadcrumbPage>
                  )}
                  {href && !isActive(href) && (
                    <Link
                      href={href}
                      className="flex items-center space-x-2 hover:underline"
                    >
                      <span>{_label}</span>
                    </Link>
                  )}
                </ShadcnBreadcrumbItem>
              </React.Fragment>
            );
          })}
        </ShadcnBreadcrumbList>
      </ShadcnBreadcrumb>
    </React.Fragment>
  );
};

export default Breadcrumb;
