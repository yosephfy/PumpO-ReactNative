import React from "react";
import { TouchableHighlight, Text } from "react-native";

export default function MyButton({ buttonStyle, lableStyle, lable, onClick }) {
  return (
    <TouchableHighlight style={buttonStyle} onPress={onClick}>
      <Text style={lableStyle}>{lable}</Text>
    </TouchableHighlight>
  );
}
