export class Pairing {

  public name: string;
  public score: number;

  constructor(data: any = {}) {
    this.name = data.name || null;
    this.score = data.score || 0;
  }

}
