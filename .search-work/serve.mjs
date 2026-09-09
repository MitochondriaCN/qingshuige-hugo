import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' }
for (const [name, port] of [['preview', 4173], ['papermod', 4174]]) {
  const root = resolve(import.meta.dirname, name)
  createServer(async (req, res) => {
    try {
      let path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
      if (path !== root && !path.startsWith(root + sep)) throw new Error('Invalid path')
      if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html')
      res.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' })
      res.end(await readFile(path))
    } catch { res.writeHead(404); res.end('Not found') }
  }).listen(port, '127.0.0.1', () => console.log(`${name}: http://127.0.0.1:${port}`))
}
