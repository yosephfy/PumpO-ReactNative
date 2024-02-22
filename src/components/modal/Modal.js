import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { View } from "react-native";

export default function Modal({ children, onClose }) {
  const snapshots = useMemo(() => ["70%", "50%", "100%"], []);
  return (
    <BottomSheet
      index={0}
      snapPoints={snapshots}
      enablePanDownToClose
      onClose={onClose}
      enableHandlePanningGesture
      enableContentPanningGesture
    >
      <View style={{ flex: 1 }}>{children}</View>
    </BottomSheet>
  );
}
