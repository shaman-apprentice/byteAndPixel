import { Monster } from './Monster';

export class Dummymon extends Monster {

  constructor(x: number, y: number) {
    super(x, y, 'Assets/Images/Dummymon.png');
  }
}
