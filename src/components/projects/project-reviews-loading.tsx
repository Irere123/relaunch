export const ProjectReviewsLoading: React.FC = () => {
  return (
    <div className="w-full">
      <div className="p-6">
        <div className="space-y-6">
          {/* Comment Form Skeleton */}
          <div className="space-y-4">
            <div className="h-[100px] bg-gray-100 animate-pulse rounded-md" />
            <div className="flex justify-between items-center">
              <div className="w-20 h-9 bg-gray-100 animate-pulse rounded-md" />
            </div>
          </div>

          {/* Comments Header Skeleton */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-24 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-6 w-8 bg-gray-100 animate-pulse rounded-full" />
            </div>
            <div className="h-9 w-32 bg-gray-100 animate-pulse rounded-md" />
          </div>

          {/* Comments List Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-32 bg-gray-100 animate-pulse rounded-md" />
                        <div className="h-5 w-24 bg-gray-100 animate-pulse rounded-md" />
                      </div>
                      <div className="h-8 w-8 bg-gray-100 animate-pulse rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-100 animate-pulse rounded-md" />
                      <div className="h-4 bg-gray-100 animate-pulse rounded-md w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
