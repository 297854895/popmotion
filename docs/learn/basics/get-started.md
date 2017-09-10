---
title: Get started
description: Introduction to Popmotion's tween, physics and user input tracking functions.
category: basics
next: input-tracking
---

# Get started

Popmotion is a functional, reactive JavaScript animation library.

It allows developers to combine observable **actions**, like tweens, physics, and input tracking, to create polished and engaging interfaces.

In this simple guide we're going to install Popmotion and create our first animation using the simplest action, the tween.

## Installation

```javascript
npm install popmotion --save
```

## The "Hello World" tween

A tween is a function that changes one number to another, over a set duration of time. It's identical to a CSS transition.

We can import `tween` like so:

```javascript
import { tween } from 'popmotion';
```

By default, a tween will change `0` to `1` over `300` milliseconds:

```marksy
<Example template="Counter" id="a">{`
const counter = document.querySelector('#a .counter');

tween()
  .subscribe((v) => counter.innerHTML = v)
  .start();
`}</Example>
```

All examples on this site are editable; you can edit the above example by providing

```javascript
{
  to: 300,
  duration: 1000
}
```

properties to the `tween` function call. The counter will now count up to `300` over the course of `1000` milliseconds.

## Animate!

This raw value output is very powerful. It can be used to drive animations in HTML, SVG, Three.js, React, D3 - anything that takes a number as an input.

As web developers our most common use-case is to animate the DOM. Popmotion provides in-built functions to help render CSS and SVG.

```javascript
import { css, svg } from 'popmotion';
```

When provided a single `Node`, they provide `get` and `set` methods for that element's visual properties.

```marksy
<Example template="Ball" id="css">{`
const ball = document.querySelector('#css .ball');
const ballRenderer = css(ball);

ballRenderer.set({
  backgroundColor: '#FFAD44',
  x: 150, // Automatically converted to px
  y: '100%'
});
`}</Example>
```

By changing the function passed to `subscribe`, we can easily make the above tween an animation:

```marksy
<Example template="Ball" id="b">{`
const ball = document.querySelector('#b .ball');
const ballRenderer = css(ball);

tween({ to: 300, duration: 1000 })
  .subscribe((x) => ballRenderer.set('x', x))
  .start();
`}</Example>
```

And that's it! Your first animation. Next, learn about [input tracking](/learn/input-tracking) or deep-dive into the [tween docs](/api/tween)
