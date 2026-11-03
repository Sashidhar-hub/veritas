const http = require('http');
const fs = require('fs');
const path = require('path');

// Auto-load .env file if present
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.substring(0, idx).trim();
            const val = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
            process.env[key] = val;
          }
        }
      });
      console.log('[VERITAS] .env configuration loaded.');
    } catch (e) {
      console.warn('[VERITAS] Failed reading .env:', e.message);
    }
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // --------------------------------------------------------------------------
  // API Route: GET /api/status
  // --------------------------------------------------------------------------
  if (pathname === '/api/status' && req.method === 'GET') {
    // Reload env dynamically so changes to .env take effect without restarting
    loadEnv();
    const hasKey = Boolean(
      process.env.TAVILY_API_KEY &&
      process.env.TAVILY_API_KEY !== 'your_tavily_api_key_here' &&
      process.env.TAVILY_API_KEY.trim() !== ''
    );
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      hasTavilyKey: hasKey,
      keyPrefix: hasKey ? process.env.TAVILY_API_KEY.substring(0, 6) + '...' : null
    }));
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: POST /api/search (Tavily Proxy)
  // --------------------------------------------------------------------------
  if (pathname === '/api/search' && req.method === 'POST') {
    loadEnv();
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const userQuery = payload.query || '';
        const searchDepth = payload.search_depth || 'advanced';
        const maxResults = payload.max_results || 8;
        const passedKey = payload.api_key;

        const effectiveKey = (passedKey && passedKey.trim()) || process.env.TAVILY_API_KEY;

        if (!effectiveKey || effectiveKey === 'your_tavily_api_key_here') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            error: 'Tavily API key is missing. Please add your key in the .env file or Settings view.'
          }));
          return;
        }

        console.log(`[VERITAS Agent] Dispatching real-time Tavily search for: "${userQuery}"`);

        // Call Tavily Search API
        const tavilyResponse = await fetch('https://api.tavily.com/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            api_key: effectiveKey,
            query: userQuery,
            search_depth: searchDepth,
            include_answer: true,
            include_raw_content: false,
            max_results: maxResults
          })
        });

        if (!tavilyResponse.ok) {
          const errText = await tavilyResponse.text();
          console.error('[VERITAS Agent] Tavily API error:', tavilyResponse.status, errText);
          res.writeHead(tavilyResponse.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            error: `Tavily API error (${tavilyResponse.status}): ${errText}`
          }));
          return;
        }

        const data = await tavilyResponse.json();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          query: userQuery,
          answer: data.answer || '',
          results: data.results || [],
          responseTime: data.response_time || 0
        }));

      } catch (err) {
        console.error('[VERITAS Agent] Search error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: err.message
        }));
      }
    });
    return;
  }

  // --------------------------------------------------------------------------
  // Static File Server with No-Cache Headers
  // --------------------------------------------------------------------------
  let safePath = pathname === '/' ? '/index.html' : pathname;
  safePath = path.normalize(safePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (indexErr, content) => {
        if (indexErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`VERITAS Research Platform running at http://localhost:${PORT}`);
});
