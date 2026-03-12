const ref = 'master'
export const baseUrl = `https://raw.githubusercontent.com/flix/flix/${ref}/examples/`

export async function fetchSampleFiles() {
  const response = await fetch(
    `https://api.github.com/repos/flix/flix/git/trees/${ref}?recursive=1`,
  )
  const data = await response.json()

  // Find directories containing flix.toml (i.e. Flix projects)
  const projectDirs = data.tree
    .filter(entry => entry.path.startsWith('examples/') && entry.path.endsWith('/flix.toml'))
    .map(entry => entry.path.slice(0, entry.path.lastIndexOf('/') + 1))

  return data.tree
    .filter(entry =>
      entry.path.startsWith('examples/') &&
      entry.type === 'blob' &&
      entry.path.endsWith('.flix') &&
      !projectDirs.some(dir => entry.path.startsWith(dir))
    )
    .map(entry => {
      const relativePath = entry.path.replace('examples/', '')
      return { name: relativePath, file: relativePath }
    })
}
