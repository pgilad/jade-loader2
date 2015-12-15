# jade-loader2
> Webpack new and improved jade loader

## Install

```sh
$ npm install jade-loader2 --save-dev
```

## Setup

In your webpack config:

```js
var webpackConfig = {
    // ...
    module: {
        loaders: [
        //...
        {
            test: /\.jade$/,
            exclude: [/node_modules/],
            loaders: ['jade-loader2'],
        },
        // ...
        ],
    },
    // ...
};
```

## License

MIT ©[Gilad Peleg](http://giladpeleg.com)
