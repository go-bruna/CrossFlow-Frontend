import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const StakingSkeleton: React.FC = (): JSX.Element => (
  <SkeletonTheme baseColor="#101010" highlightColor="#202020">
    <Skeleton className="h-10 mb-10 mt-2" />
    {/* <Skeleton className="h-[100px] mb-6" />
    <Skeleton className="h-[150px] mb-10" />
    <Skeleton className="h-[240px]" count={2} /> */}
    <Skeleton className="h-[240px]" />
  </SkeletonTheme>
)
export default StakingSkeleton
