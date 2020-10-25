---
title: Getting started with composition functions in Vue
description: Refactoring an existing component using the composition API
createdAt: 2020-08-06
updatedAt: 2020-08-06
---

# Getting started with composition functions in Vue
_Refactoring an existing component using the composition API_

The timing was good. I'd just used [React hooks](https://reactjs.org/docs/hooks-intro.html) extensively for Story Line, and I was curious about things in Vue land.

As I write this, Vue 3.0 is in release candidate stage ([with docs](https://v3.vuejs.org/guide/introduction.html)!) and the and the current release of `vue-cli` makes it easy to scaffold a new project in Vue 3 (along with the upcoming releases of `vue-router` and `vuex`).

## Background

The Composition API is a new approach to building web applications in Vue 3 and exists alongside the current approach, the Options API. A key motivation of the Composition API is to allow flexible code re-use and organisation, by writing composition functions to encapsulate logical concerns of a component. If you're interested to learn more, head to [the guide](https://v3.vuejs.org/guide/composition-api-introduction.html) and [RFC docs](https://composition-api.vuejs.org/).

I was working on an existing Vue 2 codebase, and it seemed like a good opportunity to try out Vue 3. Nothing like refactoring a simple component to get a feel for the composition api.

## `useWebcam`

In the app, I request for access to the user's camera. The code to do this with the options API looked something like this:

```js
// @/views/Home.vue
<template>
  <div>
    <!-- Other content -->
    <button @click="requestCameraAccess">Enable Webcam</button>
  </div>
</template>

<script>
export default {
  name: 'ViewName',
  methods: {
    requestCameraAccess() {
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(stream => {
          // do something with the stream
          // and update view
        })
        .catch(err => {
          console.error(err);
          // Show error page
        });
    }
  }
};
</script>
```
This component requires access to the webcam, and it is likely that we will need this functionality in other views such as an error page for example. While there are ways to achieve logic reuse through other means, they have drawbacks.

This is a good candidate for the first composition function — `useWebcam`.

Let's start by rewriting the view using the new composition API.

```js
// @/views/Home.vue
<template>
  <div>
    <!-- Other content -->
    <button @click="requestCameraAccess">Enable Webcam</button>
  </div>
</template>

<script>
export default {
  name: 'ViewName',
  setup() {
    const requestCameraAccess = () => {
      // we'll call a method from our composition function here
    }

    return {
      requestCameraAccess
    }
  }
}
</script>
```

Vue 3 introduces a new option — `setup` which serves as an entry point for composition APIs. Here, we declare the `requestCameraAccess` method, which is bound to the click event on the button. And finally we have to return this method, so that it is available to the template.

On to `useWebcam`:

```js
// @/src/composables/useWebcam.js
import { ref, computed } from "vue";

export const useWebcam = () => {
  const videoStream = ref(null);
  const cameraAllowed = computed(() => videoStream.value !== null);

  const loadWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        videoStream.value = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    videoStream,
    cameraAllowed,
    loadWebcam
  }
};
```

Going through this in detail:

1. The `useWebcam` composition function has two "state" elements. Both are implemented using the new Vue Reactivity APIs `ref` and `computed`. A ref is a mutable reactive reference with a `.value` property that points to the value. Here, `videoStream.value` is initialised to `null`. `computed` returns a immutable reference to the object returned by the provided function — `cameraAllowed.value` will be either `true` or `false` depending on the value of `videoStream.value`.
2. The `loadWebcam` method is an encapsulation of `navigator.mediaDevices.getUserMedia` which used to live in the Vue component. We set the value of `videoStream` depending on the result (remember that the value of `cameraAllowed` will be updated as well).
3. The composition function returns the properties and methods needed in the Vue component.

And in the Vue component, we can now use this composition function.

```js
// @/views/Home.vue
<template>
  <div>
    <!-- Other content -->
    <button @click="requestCameraAccess">Start</button>
  </div>
</template>

<script>
import { watchEffect } from "vue"
import { useWebcam } from "@/composables/useWebcam" // <-- our composition function

export default {
  name: 'ViewName',
  setup() {
    const { videoStream, loadWebcam, cameraAllowed } = useWebcam();

    const requestCameraAccess = () => {
      loadWebcam();
    }

    watchEffect(() => {
      if (cameraAllowed.value === true) {
        // We have permission!
        // Do something
      }
    })

    return {
      requestCameraAccess
    }
  }
}
</script>
```

We import `useWebcam` and get the parameters by destructuring the object the composition function returns. The `loadWebcam` method is now called when the user clicks the button.

Next, note the use of another new Vue 3 reactivity API - `watchEffect`. This function will run whenever its dependencies change. In this example. the function has one dependency — `cameraAllowed`. For example, if the user allows camera access, we can navigate to a different view here.

## Good first impressions

The logic of requesting and tracking the camera permissions now resides in `useWebcam`. The component is easier to scan & reason about and we can use the composition function in other parts of the app that require this functionality. One caveat is I had to remember to use `watch` and `watchEffect`. Often, I'd set up my composition functions and reactive states, only to find that I was missing one of these. I suspect it's probably because most components I've built in the Options API used `props`, reactive `data` or `vuex` stores (or that the API is just new to me in general). Just _watch_ out for that.
