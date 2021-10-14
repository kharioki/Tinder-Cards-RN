import React, { FC, useState, useRef, useCallback } from 'react';
import {
  StatusBar,
  StyleSheet,
  Animated,
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import clamp from 'clamp';

import {profiles, Profile} from './utils/profiles';

const SWIPE_THRESHOLD = 120;
const { height } = Dimensions.get('window');

const App: FC = () => {
  const [items, setItems] = useState(profiles);
  const [animation, setAnimation] = useState(new Animated.ValueXY());
  const [opacity, setOpacity] = useState(new Animated.Value(1));
  const [next, setNext] = useState(new Animated.Value(0.9));

  // const transitionNext = () => {
  //   setItems(prev => {
  //     return [...prev.slice(1)];
  //   });
  // };
  const transitionNext = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(next, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setItems(prev => [...prev.slice(1)]);
      next.setValue(0.9);
      opacity.setValue(1);
      animation.setValue({x: 0, y: 0});
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>  true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: animation.x,
            dy: animation.y,
          },
        ],
        {useNativeDriver: true},
      ),
      onPanResponderRelease: (e, {dx, vx, vy}) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(animation, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98,
            useNativeDriver: true,
          }).start(transitionNext);
        } else {
          Animated.spring(animation, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const rotate = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const _opacity = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
  });

  const animatedCardStyles = {
    transform: [{rotate}, ...animation.getTranslateTransform()],
    opacity,
  };

  const animatedImageStyles = {
    opacity: _opacity,
  };

  const yesOpacity = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
  });

  const yesScale = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const animatedYupStyles = {
    transform: [{scale: yesScale}, {rotate: '-30deg'}],
    opacity: yesOpacity,
  };

  const noOpacity = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
  });

  const noScale = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });

  const animatedNopeStyles = {
    transform: [{scale: noScale}, {rotate: '30deg'}],
    opacity: noOpacity,
  };

  const handleNo = () => {
    Animated.timing(animation.x, {
      toValue: -SWIPE_THRESHOLD,
      useNativeDriver: true,
    }).start(transitionNext);
  };

  const handleYes = () => {
    Animated.timing(animation.x, {
      toValue: SWIPE_THRESHOLD,
      useNativeDriver: true,
    }).start(transitionNext);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.top}>
        {items
          .slice(0, 2)
          .reverse()
          .map(({id, name, photos}, index, items) => {
            const isLastItem = index === items.length - 1;
            const isSecondToLast = index === items.length - 2;

            const panHandlers = isLastItem ? panResponder.panHandlers : {};

            const imageStyle = isLastItem ? animatedImageStyles : undefined;
            const cardStyle = isLastItem ? animatedCardStyles : undefined;
            const nextStyle = isSecondToLast
              ? {transform: [{scale: next}]}
              : undefined;
            return (
              <Animated.View
                {...panHandlers}
                style={[styles.card, cardStyle, nextStyle]}
                key={id}>
                <Animated.Image
                  source={photos[0].url}
                  style={[styles.image, imageStyle]}
                  resizeMode="cover"
                />
                <View style={styles.lowerText}>
                  <Text>{name}</Text>
                </View>

                {isLastItem && (
                  <Animated.View style={[styles.nope, animatedNopeStyles]}>
                    <Text style={styles.nopeText}>Nope!</Text>
                  </Animated.View>
                )}

                {isLastItem && (
                  <Animated.View style={[styles.yup, animatedYupStyles]}>
                    <Text style={styles.yupText}>Yup!</Text>
                  </Animated.View>
                )}
              </Animated.View>
            );
          })}
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity 
          onPress={handleNo}
          style={[styles.button, styles.nopeButton]}>
          <Text style={styles.nopeText}>NO</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleYes}
          style={[styles.button, styles.yupButton]}>
          <Text style={styles.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    height: '75%',
    position: 'absolute',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {x: 0, y: 0},
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  lowerText: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 3,
    borderRadius: 2,
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    padding: 20,
    top: 20,
    left: 20,
    backgroundColor: '#fff',
  },
  yupText: {
    fontSize: 20,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    padding: 20,
    top: 20,
    right: 20,
    backgroundColor: '#fff',
  },
  nopeText: {
    fontSize: 20,
    color: 'red',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {x: 0, y: 0},
  },
  yupButton: {
    shadowColor: 'green',
  },
  nopeButton: {
    shadowColor: 'red',
  },
});

export default App;
