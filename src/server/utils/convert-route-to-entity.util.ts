const mapping: Record<string, string> = {
  advertisements: 'advertisement',
  cycles: 'cycle',
  shops: 'shop',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
