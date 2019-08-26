type Authority = {
  viewer: boolean,
  editor: boolean,
  admin: boolean,
  [key: string]: boolean,
}
