===
{
    "title":"Something about viewport on mobile browsers",
    "author":"xiebaochun",
    "categories":["web"],
    "tags":["viewport"]
}
===

# something about viewport on mobile browsers

## Introduction

Mobile browsers render pages in a virtual "window"(the viewport),usually wider than the mobile screen,so they don't need to aqueeze every page layout into a tiny window.User can pan and zoom see diffrent areas of the page.

## Viewport basics

A typical mobile-optimized site contains something like the following:

```
<meta name = "viewport" content="width=device-width,initial-scale=1">
```
The width property control the size of the viewport.It can be set to a specific number of pixels like width=600 or to the special value device-width value which is the width of the screen in CSS pixels at a scale of 100%.(There are corresponding height and device-height values,which may be useful for pages width elements that change size or position based on the viewport height.)

The initial-scale property controls the zoom level when the page is first loaded.The maximum-scale,minimum-scale,and user-scalable properties control how users are allowed to zoom the page in or out.

## A pixel is not a pixel

The iPhone and many popular Android phones have 3- to 4-inch(7-10cm)screen with 320--480 pixel(~160 dpi).Firefox for Maemo runs on nokia n900,which has the same physical size but 480--800 pixels(~240 dpi).Because of this,the last version of Fennec displayed many pages about one third smaller(in actual,physic size) than iPhone or Android. This caused usability and readability problems on many touch-optimized web sites. Peter-Paul Koch wrote about this problem in [Apixel is not a pixel](http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html).

For web developers,this means that 320px be full width in portrait mode at scale=1, on all of the above-mentioned handheld devices,and they may size their layouts and images accordingly.But remember that not all mobile devices are the same width;you should also make sure that your pages work well in landscape mode,and on larger devices like the iPad and Android tablets.

The default ratio depends on the display density.  On a display with density less than 200dpi, the ratio is 1.0.  On displays with density between 200 and 300dpi, the ratio is 1.5.  For displays with density over 300dpi, the ratio is the integer floor(density/150dpi).  Note that the default ratio is true only when the viewport scale equals 1. Otherwise, the relationship between CSS pixels and device pixels depends on the current zoom level.

## Viewport width and screen width

For pages that set an initial or maximum scale, this means the width property actually translates into a minimum viewport width. For example, if your layout needs at least 500 pixels of width then you can use the following markup. When the screen is more than 500 pixels wide, the browser will expand the viewport (rather than zoom in) to fit the screen:

```
<meta name="viewport" content="width=500, initial-scale=1">
```

Mobile browsers handle orientation changes slightly differently. For example, Mobile Safari often just zooms the page when changing from portrait to landscape, instead of laying out the page as it would if originally loaded in landscape. If web developers want their scale settings to remain consistent when switching orientations on the iPhone, they must add a maximum-scale value to prevent this zooming, which has the sometimes-unwanted side effect of preventing users from zooming in:

```
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
```

## Reference

[Using the viewport meta tag to control layout on mobile browsers](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)