export default class Api {
  public static async getTree(uri: string) {
    const result = await fetch(uri);
    const json = await result.json();
    return json;
  }
}
