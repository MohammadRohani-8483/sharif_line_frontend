export function paginate<T>(arr: T[], page: number, pageSize: number) {
  const items = [...arr]
  return items.splice((page - 1) * pageSize, pageSize)
}
