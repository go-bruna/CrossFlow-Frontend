import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const GovernanceSkeleton: React.FC = (): JSX.Element => (
  <SkeletonTheme baseColor="#101010" highlightColor="#202020">
    <Skeleton className="h-10 mb-10" />
    <Skeleton className="h-[120px] mb-10" />
    <Skeleton className="h-[440px]" />
  </SkeletonTheme>
)
export default GovernanceSkeleton
