const worker = {
  fetch(): Response {
    return new Response('vokdev-community-website worker', {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  },
}

export default worker
