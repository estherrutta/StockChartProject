export default class Asset {
  assetId?: number | null;
  assetName?: string | null;
  price?: number | null;
  lastUpdate?: Date | null;
  assetType?: string | null;
  isFavorite?: boolean | null;
  public constructor(params: Asset = {} as Asset) {
    let {
      assetId = 0,
      assetName = "",
      price = 0,
      lastUpdate = null,
      assetType = "",
      isFavorite = false,
    } = params;
    this.assetId = assetId;
    this.assetType = assetType;
    this.assetName =
      assetType === "Stock"
        ? ["AAPL", "GOOGL", "FB", "TSLA", "MSFT"][Math.floor(Math.random() * 4)]
        : ["EUR", "USD", "GBP", "NIS", "AUD"][Math.floor(Math.random() * 4)];
    this.price = Math.random() * 10;
    this.lastUpdate = new Date();
    this.isFavorite = isFavorite;
  }
}
