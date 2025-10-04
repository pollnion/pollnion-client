import React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type BaseBreadcrumbProps = {data: {href: string; label: string}[]; isLoading?: boolean}

const BaseBreadcrumb: React.FC<BaseBreadcrumbProps> = (props) => {
  const {data} = props // isLoading
  const _path: string = usePathname()

  const isActive = (path: string) => path === _path

  return (
    <React.Fragment>
      <Breadcrumb className="px-3">
        <BreadcrumbList>
          {data.map(({href, label}, index: number) => {
            return (
              <React.Fragment key={index}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isActive(href) && <BreadcrumbPage>{label}</BreadcrumbPage>}
                  {href && !isActive(href) && (
                    <Link href={href} className="flex items-center space-x-2">
                      <span>{label}</span>
                    </Link>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </React.Fragment>
  )
}

export default BaseBreadcrumb
