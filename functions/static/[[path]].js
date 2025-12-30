export async function onRequest(context) {
    const url = new URL(context.request.url);
    const pathWithQuery = url.pathname.replace('/static', '/static') + url.search;

    const posthogUrl = `https://eu-assets.i.posthog.com${pathWithQuery}`;

    const headers = new Headers(context.request.headers);
    headers.set('Host', 'eu-assets.i.posthog.com');

    const response = await fetch(posthogUrl, {
        method: context.request.method,
        headers: headers,
    });

    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Cache-Control', 'public, max-age=86400');

    return newResponse;
}
