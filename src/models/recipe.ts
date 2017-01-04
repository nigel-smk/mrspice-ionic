import {ImageUrlsBySize} from "./imageUrlsBySize";
import {Attributes} from "./Attributes";
import {Flavors} from "./Flavors";
export class Recipe {

  public id: string;
  public recipeName: string;
  public ingredients: string[];
  public imageUrlsBySize: ImageUrlsBySize;
  public smallImageUrls: string[];
  public rating: number;
  public attributes: Attributes;
  public flavors: Flavors;
  public totalTimeInSeconds: number;
  public sourceDisplayName: string;


  constructor(data: any = {}) {
    this.id = data.id || null
    this.recipeName = data.recipeName || null;
    this.ingredients = data.ingredients || 0;
    this.imageUrlsBySize = new ImageUrlsBySize(data.imageUrlsBySize)
    this.smallImageUrls = data.smallImageUrls || []
    this.rating = data.rating || 0;
    this.attributes = new Attributes(data.attributes)
    this.flavors = new Flavors(data.flavors)
    this.totalTimeInSeconds = data.totalTimeInSeconds || 0
    this.sourceDisplayName = data.sourceDisplayName || null;

  }

}
