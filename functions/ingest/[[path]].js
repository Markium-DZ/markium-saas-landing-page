export async function onRequest(context) {
    const url = new URL(context.request.url);
    const pathWithQuery = url.pathname.replace('/ingest', '') + url.search;

    const posthogUrl = `https://eu.i.posthog.com${pathWithQuery}`;

    const headers = new Headers(context.request.headers);
    headers.set('Host', 'eu.i.posthog.com');

    const response = await fetch(posthogUrl, {
        method: context.request.method,
        headers: headers,
        body: context.request.method !== 'GET' ? context.request.body : undefined,
    });

    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');

    return newResponse;
}
