import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export default function Modal({ children, onClose }) {
  const snapshots = useMemo(() => ["50%", "70%"], []);
  return (
    <BottomSheet
      index={0}
      snapPoints={snapshots}
      enablePanDownToClose
      onClose={onClose}
    >
      <View style={{ height: "100%" }}>{children}</View>
    </BottomSheet>
  );
}
