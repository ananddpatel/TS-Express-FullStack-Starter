import { klassFunc } from './CommonKlassFunc';

export function Controller(name: string = null) {
  return klassFunc(name);
}
