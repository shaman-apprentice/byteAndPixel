import { PMap } from '@shaman-apprentice/pack-mule';

export class HashMap<K, V> extends PMap<K, V> {
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
}
