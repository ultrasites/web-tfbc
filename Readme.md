# Web-TFBC (Typescript File Based Cache)

This is a file based cache written in typescript. It is a simple cache with an expired date option (default 50.000 ms).

[web-tfbc on NPM](https://www.npmjs.com/package/web-tfbc)

## Configuration (default)

```
export const WebTFBCDefaultConfig: WebTFBCConfig = {
  expired: 50000,
  filePath: "./web-tfbc-cache/",
  encoding: "utf-8",
};
```

## Example

``` 
document.body.innerHTML =
      '<div id="cache">' +
      '  <span id="username" />' +
      '  <button id="button" />' +
      "</div>";

    const cache = new WebTFBC();
    const content = await cache.cache<HTMLElement>(
      "htmlElement",
      document.getElementById("cache")!
    );

    // File, DOM Element, String or other ...
    return content;    
```

## Author
Ultra Sites Medienagentur 2021

[https://www.ultra-sites.de](https://www.ultra-sites.de)