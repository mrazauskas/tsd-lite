type JsonValue = string | number | boolean | JsonObject | Array<JsonValue>;

export interface JsonObject {
  [key: string]: JsonValue;
}
