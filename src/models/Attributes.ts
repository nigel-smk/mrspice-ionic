export class Attributes {

  public course: string[];

  constructor(data: any) {
    this.course = data.course || []
  }

}
