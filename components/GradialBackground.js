// Background.js
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

export default function Background({ children,enableAnimation = true }) {
  const [radius, setRadius] = useState(50);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRadius(prevRadius => {
        let newRadius = prevRadius + (0.3 * direction);
        
        if (newRadius >= 70) {
          setDirection(-1);
          return 70;
        } else if (newRadius <= 50) {
          setDirection(1);
          return 50;
        }
        
        return newRadius;
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [radius, direction, enableAnimation]);

  return (
    <React.Fragment>
      {/* Background */}
      <Svg height="100%" width="100%" style={styles.background}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="-5%" r={`${radius}%`} fx="50%" fy="50%">
            <Stop offset="0%" stopColor="#21286f" stopOpacity="0.98" />
            <Stop offset="25%" stopColor="#1c225a" stopOpacity="0.99" />
            <Stop offset="50%" stopColor="#0e1355" stopOpacity="1" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      {/* Children should appear above */}
      {children}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // push behind
  },
});
