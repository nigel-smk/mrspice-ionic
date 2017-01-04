export class ImageUrlsBySize {

  public size90: string;

  constructor(data: any) {
    this.size90 = data['90'] || "";
  }

}
