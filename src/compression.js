/**
 * Compression helpers using the native CompressionStream API.
 * Produces base64url-encoded DEFLATE-raw payloads for URL sharing.
 */

/**
 * Compress a string and return a URL query string like `?q=...`.
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function compressToURL(text) {
  const bytes = new TextEncoder().encode(text)
  const cs = new CompressionStream('deflate-raw')
  const writer = cs.writable.getWriter()
  writer.write(bytes)
  writer.close()
  const compressed = await new Response(cs.readable).arrayBuffer()
  const base64 = btoa(String.fromCharCode(...new Uint8Array(compressed)))
  const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return '?q=' + base64url
}

/**
 * Decompress a base64url-encoded DEFLATE-raw payload back to a string.
 * @param {string} param - the raw value of the `q` query parameter
 * @returns {Promise<string>}
 */
export async function decompressFromURL(param) {
  const base64 = param.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
  const ds = new DecompressionStream('deflate-raw')
  const writer = ds.writable.getWriter()
  writer.write(bytes)
  writer.close()
  const decompressed = await new Response(ds.readable).arrayBuffer()
  return new TextDecoder().decode(decompressed)
}
