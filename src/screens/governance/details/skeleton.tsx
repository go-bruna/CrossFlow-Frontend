import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const GovernanceProposalsSkeleton: React.FC = (): JSX.Element => (
  <SkeletonTheme baseColor="#101010" highlightColor="#202020">
    <Skeleton className="h-10 mb-10" />
    <Skeleton className="h-10 mb-6" />
    <Skeleton className="h-10 mb-6" />
    <Skeleton className="h-10 mb-6" />
    <Skeleton className="h-[100px] mb-6" />
    <Skeleton className="h-[400px]" />
  </SkeletonTheme>
)
export default GovernanceProposalsSkeleton
