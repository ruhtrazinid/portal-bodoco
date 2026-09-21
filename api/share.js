export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.redirect(302, '/');
  }

  const HYGRAPH_ENDPOINT = 'https://us-west-2.cdn.hygraph.com/content/cmtup25dl011107v1w3cuwi71/master';

  let titulo = 'Portal Bodocó — A notícia perto de você';
  let subtitulo = 'Informação local e regional com clareza e credibilidade.';
  let imagemCapa = 'https://portalbodoco.com.br/assets/portal-bodoco-mark.png';

  // Se a notícia vier do Hygraph
  if (id.startsWith('hygraph-')) {
    const idHygraph = id.replace('hygraph-', '');
    const query = `query { noticia(where: { id: "${idHygraph}" }) { titulo subtitulo capa { url } } }`;

    try {
      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      const n = data?.data?.noticia;
      if (n) {
        if (n.titulo) titulo = n.titulo;
        if (n.subtitulo) subtitulo = n.subtitulo;
        if (n.capa?.url) imagemCapa = n.capa.url;
      }
    } catch (e) {
      console.error('Erro na consulta Hygraph:', e);
    }
  }

  const urlDestino = `https://portalbodoco.com.br/noticia.html?id=${encodeURIComponent(id)}`;

  // Devolve o HTML com as tags estáticas para o robô e redireciona leitores comuns
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <title>${titulo} | Portal Bodocó</title>
        <meta name="description" content="${subtitulo}" />
        
        <!-- Open Graph lido pelo WhatsApp / Facebook / Telegram -->
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Portal Bodocó" />
        <meta property="og:title" content="${titulo}" />
        <meta property="og:description" content="${subtitulo}" />
        <meta property="og:image" content="${imagemCapa}" />
        <meta property="og:image:secure_url" content="${imagemCapa}" />
        <meta property="og:url" content="${urlDestino}" />
        
        <!-- Redirecionamento instantâneo se um utilizador humano aceder ao link -->
        <meta http-equiv="refresh" content="0;url=${urlDestino}" />
        <script>window.location.replace("${urlDestino}");</script>
      </head>
      <body>
        <p>A redirecionar para a matéria... <a href="${urlDestino}">Clique aqui se não for redirecionado</a>.</p>
      </body>
    </html>
  `);
}