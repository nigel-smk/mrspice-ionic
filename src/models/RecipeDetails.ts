export class RecipeDetails {

  public id: string;
  public name: string;
  public source: Source;
  public images: Images[];
  public ingredientLines;


  constructor(data: any = {}) {
    this.id = data.id || null
    this.name = data.recipeName || null;
    this.source = new Source(data.source);
    this.images = [new Images(data.images)];
    this.ingredientLines = data.ingredientLines || []

  }

}

export class Source {

  public sourceRecipeUrl: string;
  public sourceSiteUrl: string;
  public sourceDisplayName: string;

  constructor(data: any = {}) {
    this.sourceRecipeUrl = data.sourceRecipeUrl || null;
    this.sourceSiteUrl = data.sourceSiteUrl || null;
    this.sourceDisplayName = data.sourceDisplayName || null;
  }

}

export class Images {

  public hostedLargeUrl: string;
  public hostedSmallUrl: string;

  constructor(data: any = {}) {
    this.hostedLargeUrl = data.hostedLargeUrl || null;
    this.hostedSmallUrl = data.hostedSmallUrl || null;
  }

}
