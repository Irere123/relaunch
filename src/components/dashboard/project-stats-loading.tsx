export function ProjectStatsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-48 bg-gray-100 animate-pulse rounded-md mb-4" />
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.08)]">
          <div className="h-72 w-full bg-gray-100 animate-pulse rounded-md" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="h-8 w-40 bg-gray-100 animate-pulse rounded-md mb-4" />
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-24 bg-gray-100 animate-pulse rounded-md" />
                  <div className="h-3 flex-1 bg-gray-100 animate-pulse rounded-md" />
                  <div className="h-4 w-16 bg-gray-100 animate-pulse rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="h-8 w-44 bg-gray-100 animate-pulse rounded-md mb-4" />
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-3 w-5 bg-gray-100 animate-pulse rounded-sm" />
                  <div className="h-4 w-20 bg-gray-100 animate-pulse rounded-md" />
                  <div className="h-3 flex-1 bg-gray-100 animate-pulse rounded-md" />
                  <div className="h-4 w-16 bg-gray-100 animate-pulse rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
