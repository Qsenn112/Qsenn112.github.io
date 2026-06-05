// Static asset serving via Workers Assets + R2 for large files
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Large files stored in R2 bucket
    const R2_PATHS = [
      '/games/jumprace/index.wasm',
      '/games/jumprace/index.pck',
      '/todo/todo-list.apk',
      '/webnovel/red-moon-night.apk',
    ];

    if (R2_PATHS.includes(path)) {
      // R2 keys don't have leading slash
      const key = path.startsWith('/') ? path.slice(1) : path;
      const object = await env.ASSETS_BUCKET.get(key);
      if (object === null) {
        return new Response('Not Found', { status: 404 });
      }
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('cache-control', 'public, max-age=31536000, immutable');
      return new Response(object.body, { headers });
    }

    // Workers Assets handles everything else automatically
    return new Response('Not Found', { status: 404 });
  }
};
