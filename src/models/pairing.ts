export class Pairing {

  public ingt: string;
  public score: number;

  constructor(data: any = {}) {
    this.ingt = data.ingt || null;
    this.score = data.score || null;
  }

}
