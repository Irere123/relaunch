const getPageVisits = (id: string, slug: string) =>
  fetch(`/api/analytics/visits?projectId=${id}&slug=${slug}`).then((resp) =>
    resp.json()
  );
