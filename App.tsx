import React, {FC, useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  PanResponder,
  Platform,
  Dimensions
} from 'react-native';
// import clamp from 'clamp';
import Carousel from 'react-native-looped-carousel';

import {profiles} from './utils/profiles';
import {Container, ProfileView, ButtonsView, Bottom} from './styles/AppStyles';

const SWIPE_THRESHOLD = 120;
const { width, height } = Dimensions.get('window');
function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

const App: FC = () => {
  const [items, setItems] = useState(profiles);
  const [size, setSize] = useState({
    width: '100%',
    height: '100%',
  });

  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  const transitionNext = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setItems(prev => {
        return prev.slice(1);
      });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (e, {dx, dy, vx, vy}) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 4, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 4, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.decay(animation, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.99,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: false,
            }),
          ]).start(transitionNext);
          if (velocity > 0) {
            // handleRightDecay();
            console.log('right');
          } else {
            // handleLeftDecay();
            console.log('left');
          }
        } else {
          Animated.spring(animation, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    scale.setValue(0.9);
    opacity.setValue(1);
    animation.setValue({x: 0, y: 0});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
      useNativeDriver: false,
    }).start(transitionNext);
  };

  const handleYes = () => {
    Animated.timing(animation.x, {
      toValue: SWIPE_THRESHOLD,
      useNativeDriver: false,
    }).start(transitionNext);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ProfileView>
        {items
          .slice(0, 2)
          .reverse()
          .map((item, index, items) => {
            // check if it's top card
            const isLastItem = index === items.length - 1;
            // apply panhandlers if it's top card
            const panHandlers = isLastItem ? {...panResponder.panHandlers} : {};
            // check if it's next card
            const isSecondToLast = index === items.length - 2;

            // rotate from -30 degree to +30 degree for swipe distance of -200 to 200
            const rotate = animation.x.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: ['-30deg', '0deg', '30deg'],
              extrapolate: 'clamp', // makes sure rotation does not exceed 30deg
            });

            const _opacity = animation.x.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: [0.5, 1, 0.5],
            });

            // prepare card styles
            const animatedCardStyles = {
              transform: [{rotate}, ...animation.getTranslateTransform()],
              opacity,
            };
            const animatedImageStyles = {
              opacity: _opacity,
            };
            const cardStyle = isLastItem ? animatedCardStyles : undefined;
            const nextStyle = isSecondToLast
              ? {transform: [{scale: scale}], borderRadius: 5}
              : undefined;

            const imageStyle = isLastItem ? animatedImageStyles : undefined;
            const generatePages = photos =>
              photos.map((x, i) => (
                <Animated.Image
                  key={i}
                  source={x.url}
                  style={[styles.image, imageStyle]}
                  resizeMode="cover"
                />
              ));
            return (
              <Animated.View
                {...panHandlers}
                style={[styles.card, cardStyle, nextStyle]}
                key={item.id}>
                <Animated.View style={{flex: 1}}>
                  <Carousel
                    style={size}
                    leftArrowText={' '}
                    leftArrowStyle={styles.arrow}
                    rightArrowText={' '}
                    rightArrowStyle={styles.arrow}
                    bullets
                    bulletsContainerStyle={{top: 20}}
                    arrows
                    isLooped={false}
                    autoplay={false}
                    // onAnimateNextPage={p => console.log(p)}
                  >
                    {generatePages(item.photos)}
                  </Carousel>
                </Animated.View>

                <Bottom style={styles.lowerText}>
                  <Text style={styles.name}>
                    {item.name}, {item.age}
                  </Text>
                  <Text style={styles.bio}>
                    {item.type}, {item.gender}
                  </Text>
                  <Text style={styles.bio}>{item.sexuality}</Text>
                  {/* <Text>Likes: {item.likes.join(', ')}</Text> */}
                </Bottom>

                {isLastItem && (
                  <Animated.View style={[styles.nope, animatedNopeStyles]}>
                    <Text style={styles.nopeText}>Meh!</Text>
                  </Animated.View>
                )}

                {isLastItem && (
                  <Animated.View style={[styles.yup, animatedYupStyles]}>
                    <Text style={styles.yupText}>Okay!</Text>
                  </Animated.View>
                )}
              </Animated.View>
            );
          })}
      </ProfileView>
      <ButtonsView>
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
      </ButtonsView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      web: {
        boxShadow: '0 3px 5px rgba(0,0,0,0.10), 1px 2px 5px rgba(0,0,0,0.10)',
      },
    }),
    borderWidth: 1,
    borderColor: '#FFF',
  },
  lowerText: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 0,
    left: 0,
    right: 0,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    shadowColor: '#000',
    letterSpacing: 1,
  },
  bio: {
    fontSize: 20,
    color: '#fff',
    shadowColor: '#000',
    letterSpacing: 1,
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 4,
    borderRadius: 2,
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    padding: 10,
    top: 20,
    left: 20,
    backgroundColor: '#fff',
  },
  yupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    padding: 10,
    top: 20,
    right: 20,
    backgroundColor: '#fff',
  },
  nopeText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  yupButton: {
    shadowColor: 'green',
    borderColor: 'green',
  },
  nopeButton: {
    shadowColor: 'red',
    borderColor: 'red',
  },
  arrow: {color: 'white', fontSize: 22, margin: 20},
});

export default App;
