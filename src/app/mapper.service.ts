import { Injectable } from '@angular/core';

class ObjectI {
  key: string;
  items: ObjectI;
  collapse?: boolean;
}

@Injectable()
export class MapperService {
  constructor() {}
  parse = (data: any, keys: Array<string>): ObjectI[] => {
    if (!keys.length) return data;
    let [current, ...rest] = keys;
    const res = this.groupBy(data, current).reduce((acc, { key, items }) => {
      acc.push({
        key,
        items: this.parse(items, rest),
        ...(!rest.length && { collapsed: true }),
      });
      return acc;
    }, []);

    return res;
  };

  groupBy = (arr, criteria): ObjectI[] => {
    const list = arr.reduce((objects, item) => {
      var key = item[criteria];
      // If the key doesn't exist yet, create it
      var element = objects.find((obj) => obj.key == key);

      if (!element) {
        element = {
          key,
          items: [],
        };
        objects.push(element);
      }
      // Push the value to the object
      element.items.push(item);
      // Return the object to the next item in the loop
      return objects;
    }, []);
    // return this.mapValues(objects);
    return list;
  };
}
