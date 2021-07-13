---
title: How to test React third-party library events in Jest 
description: I'm working on an audio player that uses `react-player` and I need to write some tests
createdAt: 2021-07-12
updatedAt: 2021-07-12
---

# Testing React third-party library events in Jest
_For an audio player that uses `react-player`_

I've been working on an audio player for the SBS Language sites. Ultimately, this audio player will be "global" to a particular visitor session, and allow users to play podcast episodes and catchup radio programs as they navigate the site. It allows multilingual audiences to navigate across language sites and queue up programs they'd like to listen to. In many ways, I like what it says about who our audiences are and Australia today, but that's another post. 

Recently, I built a number of features including autoplay (a recommended track starts playing when the current one ends) and additional UI components that allows a user to seek to a particular point in the track. This audio player also has to function in left-to-right (ltr) and right-to-left (rtl languages).

Writing unit tests for this player was a good exercise in how to test third-party library events with Jest and React.

## The Player

The audio player is built using [`react-player`](https://github.com/CookPete/react-player). I won't go into the implementation details here, but let's imagine a component that looks something like this. Note that I'm using `React.useState` here instead of a named import, because I'm going to `spyOn` `useState` (more on that later).

```typescript
import React from 'react';
import useMediaPlayer from './hooks/useMediaPlayer';
import { ReactPlayerProps } from 'react-player/lazy';
import Player from './components/Player';

const AudioPlayer = () => {
  const {
    state: { play },
    setPlay,
    getNextTrack,
  } = useMediaPlayer();
  const [autoplay, setAutoplay] = React.useState(true);
  const [player, setPlayer] = React.useState(null);
  const onRef = (ele: ReactPlayerProps) => setPlayer(ele);

  const onEnded = () => {
    setPlay(false);
    if (autoplay) getNextTrack();
  };

  return (
    <>
      <label for="autoplay">Autoplay?</label>    
      <input
        onClick={(e) => setAutoplay(e.target.checked)}
        checked={autoplay}
        type="checkbox"
        id="autoplay"
      />
      <Player
        onRef={onRef}
        onEnded={onEnded}
      />
    </>
  );
};

export default AudioPlayer;
```

And the `Player` component is just a wrapper around `react-player`

```typescript
import ReactPlayer from 'react-player/lazy';
import React from 'react';
import useMediaPlayer from './hooks/useMediaPlayer';

export default function Player({ onRef, onEnded }) {
  const {
    state: { play, media },
  } = useMediaPlayer();
  return (
    <ReactPlayer
      onEnded={onEnded}
      ref={onRef}
      url={media.url}
      playing={play}
      width="100%"
      height="0"
      volume={0.5}
      playsinline
    />
  );
}

```

The sample assumes you have implemented methods to control the audio player. For example, the state and methods to control the audio player (such `setPlay` and `getNextTrack`) are returned from our custom hook `useMediaPlayer`. Here, I want to focus on how you might unit test custom functionality that rely on events in `react-player`.

In our player, we are relying on the `onEnded` event `react-player` provides to implement the autoplay functionality. When the current track ends, we continue playing the next track if `autoplay` is true.

```typescript
const onEnded = () => {
  setPlay(false);
  if (autoplay) getNextTrack();
};
```

Let's look at how this can be unit tested with Jest.

## Define what will be tested

Before writing our tests, let's define what will be tested. We want to avoid testing `react-player` itself and focus on our functionality. In other words, we do not want to check if `onEnded` is called at the end of the current track. Instead, we want to test whether our components tries to fetch the next track if `autoplay` is `true` when the `onEnded` event fires. A small but important distinction.

This means we will have to
- Mock the `Player` implementation
- Mock the custom hook `useMediaPlayer`
- Spy on the `getNextTrack` method to test if it has been called

Optionally, we may have to mock/set the `autoplay` state to test cases where autoplay is on or off.

## Writing the test

I'm using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) here.

Let's start by scaffolding our unit test:

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import mediaHook from '@sbs/core/MediaContext/hooks/useMediaPlayer';
import AudioPlayer from './AudioPlayer';
import playerComponent from './components/Player';

jest.mock('@sbs/core/MediaContext/hooks/useMediaPlayer');
jest.mock('./components/Player');

const Player = playerComponent as jest.Mock;
const useMediaPlayer = mediaHook as jest.Mock;

// default mock implementation
Player.mockImplementation(() => 'mock-Player');

describe("Audio Player", () => {
  it("renders", () => {
    // our test and assertions
    const {asFragment} = render(
      <AudioPlayer />
    );
    expect(asFragment()).toMatchSnapshot();
  })
})
```

This is a simple snapshot test to check that the component renders.

Let's update this simple test to check that the autoplay functionality works correctly.

### 1. Mock the `Player` implementation

We want to mock the `Player` component in a way that we are able to fire the `onEnded` event. Remember that we only want to test that our player behaves correctly when `onEnded` is called, not if `react-player` calls `onEnded` when a track ends.

Here is a simple mock implementation of our `Player` component.

```typescript

let mockOnEnded;
Player.mockImplementation(({ onEnded }) => {
  mockOnEnded = onEnded;
  return <div>Mock Player</div>;
});

```

Things to note:
1. We are not using a `react-player` component and simply returning a `div` instead.
2. I'm also ignoring the other prop `onRef`, because it's not relevant to this particular test.
3. I'm assigning the `onEnded` prop to a variable `mockOnEnded` in order to be able to call this event in my test.

### 2. Mock the `useMediaPlayer` hook

This is particular to the implementation here. You may need to do this differently depending on the mechanism used to control the player. 

```typescript
const nextTrackSpy = jest.fn(() => undefined);

const state = {
  play: true,
  media: {
    image: 'https://unsplash.it/224/136',
    url: 'http://mockaudio-url',
    name: 'mock-name',
  },
};

useMediaPlayer.mockReturnValue({
  setPlay: () => undefined,
  getNextTrack: nextTrackSpy,
  state,
});
```

The important thing to note here is the use of a spy function `nextTrackSpy` in order to assert whether the `getNextTrack` method has been called.

### The unit test for autoplay functionality

Putting it all together, let's test the autoplay functionality:

```typescript
import React from 'react';
import { render, act } from '@testing-library/react';
import mediaHook from '@sbs/core/MediaContext/hooks/useMediaPlayer';
import AudioPlayer from './AudioPlayer';
import playerComponent from './components/Player';

jest.mock('@sbs/core/MediaContext/hooks/useMediaPlayer');
jest.mock('./components/Player');

const Player = playerComponent as jest.Mock;
const useMediaPlayer = mediaHook as jest.Mock;

// default mock implementation
Player.mockImplementation(() => 'mock-Player'); 

describe("Audio Player", () => {
  it('calls next track when autoplay is on', () => {
    // Autoplay is on by default in the component
    // The custom `Player` implementation for this test
    let mockOnEnded;
    Player.mockImplementation(({ onEnded }) => {
      mockOnEnded = onEnded;
      return <div>Mock Player</div>;
    });
    
    // The custom `useMediaPlayer` hook implementation
    const nextTrackSpy = jest.fn(() => undefined);

    const state = {
      play: true,
      media: {
        image: 'https://unsplash.it/224/136',
        url: 'http://mockaudio-url',
        name: 'mock-name',
      },
    };

    useMediaPlayer.mockReturnValue({
      setPlay: () => undefined,
      getNextTrack: nextTrackSpy,
      state,
    });

    render(
      <AudioPlayer />
    );

    // Call the `onEnded` event
    // Note that we are not relying an audio track ending 
    // to call this event
    act(() => {
      mockOnEnded();
    });
    
    // Our assertion - expect that the player will attempt to play 
    // the next track when the `onEnded` event is called
    expect(nextTrackSpy).toHaveBeenCalled();
  });
});
```

If we wanted to test that the player stops if autoplay is off, we can spy on and mock what `useState` returns:

```typescript
// We can toggle the initial value of autoplay 
// by spying on `React.useState`
jest
  .spyOn(React, 'useState')
  .mockImplementationOnce(() => [false, jest.fn()])
```

The assertion will then be
```typescript
expect(nextTrackSpy).not.toHaveBeenCalled();
```

Building this player has been helpful for me to think about what to test for and how to structure my tests. You can extend this approach for other events that `react-player` provides such as `onReady, onStart, onProgress` and so on, or other libraries that provide similar callback props.

Thanks for reading!
