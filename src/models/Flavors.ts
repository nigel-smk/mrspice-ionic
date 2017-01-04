export class Flavors {

  public bitter: number;
  public salty: number;
  public meaty: number;
  public sour: number;
  public piquant: number;
  public sweet: number;

  constructor(data: any) {
    this.bitter = data.bitter || 0;
    this.salty = data.salty || 0;
    this.meaty = data.meaty || 0;
    this.sour = data.sour || 0;
    this.piquant = data.piquant || 0;
    this.sweet = data.sweet || 0;
  }

}
