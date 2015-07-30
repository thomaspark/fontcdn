
## react-zeroclipboard

This is a wrapper around ZeroClipboard for use with React.  ZeroClipboard has a difficult to work with api
which is being abstracted from you.  This library...

*   asynchronusly loads zeroclipboard from cdnjs
*   handles mounting/unmounting of components
*   figures out which element was clicked
*   allows you to declare text/html/rtf, or pass a function which returns it dynamically

### Install

This is only available through npm, it should work with browserify or webpack.  It's compatible with react 0.13.

```sh
npm install --save react-zeroclipboard@1
```

Or for react 0.11 and 0.12

```sh
npm install --save react-zeroclipboard@0.4
```

Also install react if you haven't already (of course).

### Usage

Here's a simple example:

```js
render: function(){
   return (
      <div>
         <p>Click the button to copy some text</p>
            <ReactZeroClipboard text="Hello, world!">
               <button>Copy</button>
            </ReactZeroClipboard>
      </div>
   )
}
```

The full api offers more flexibility.  If you provide e.g. html and text, they'll both be set and
the application you're pasting into decides which one to use.  Methods have higher priority than
the literal strings, if for some reason you pass both.

```js
<ReactZeroClipboard 
   text="text to copy"
   html="<b>html to copy</b>"
   richText="{\\rtf1\\ansi\n{\\b rich text to copy}}"
   getText={(Void -> String)}
   getHtml={(Void -> String)}
   getRichText={(Void -> String)}

   onCopy={(Event -> Void)}
   onAfterCopy={(Event -> Void)}
   onErrorCopy={(Error -> Void)}

   onReady={(Event -> Void)}
/>
```

Here's an example where we copy the current url to the clipboard, both in plain text and a html anchor

If the user pastes this in their address bar they get the url, and if they paste it in gmail they get a nice link.

```js
render: function(){
   return (
      <div>
         <p>Copy a link to this page</p>
            <ReactZeroClipboard 
               getText={function(){ return location.href; }}
               getHtml={function(){ return '<a href="' + location.href + '">My Page</a>'; }}>
                  <button>Copy</button>
            </ReactZeroClipboard>
      </div>
   )
}
```
