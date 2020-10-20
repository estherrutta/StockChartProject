import { Observable } from "rxjs/Observable";
import Rx from "rxjs/Rx";
import Asset from "../../objects/asset.ts";

const buildAssetList = (n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(new Asset({ assetId: i, assetType: "Stock" }));
    result.push(new Asset({ assetId: i + n, assetType: "Currency" }));
  }
  return result;
};

const assets = buildAssetList(200);

const timeObservable = Rx.Observable.interval(1000);
export const dataStream = Observable.create((ob) => {
  timeObservable.subscribe(() => {
    Rx.Observable.from(assets)
      .map((val) => {
        const random = Math.random();
        val.price = random >= 0.5 ? val.price + random : val.price - random;
        val.lastUpdate = Date.now();
        return val;
      })
      .subscribe((val) => ob.next(val));
    //creates an observable that emits values upon subscription
  });
  return () => null;
});
