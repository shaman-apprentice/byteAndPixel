import { PMap } from '@shaman-apprentice/pack-mule';

export class HashMap<K, V> extends PMap<K, V> {

  private transformKey: (key: K) => string;

  constructor(transformKey: (key: K) => string, entries?: [K, V][]) {
    super(transformKey, entries)
    this.transformKey = transformKey;
  }

  public getValues() {
    return [...super.values()];
  }

  public getKeys() {
    return [...super.keys()];
  }

  public getEntries() {
    return [...super.entries()].map(([key, value]) => {
      return { key, value }
    });
  }

  public copyMapType() {
    return new HashMap<K,V>(this.transformKey)
  }
}
