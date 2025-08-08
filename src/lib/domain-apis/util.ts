export function parseDomainsFromText(input: string): string[] {
  const tokens = input
    .split(/[\s,;\n\r\t]+/)
    .map(t => t.trim().toLowerCase())
    .filter(Boolean)
  const re = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/
  return Array.from(new Set(tokens.filter(t => re.test(t))))
}

