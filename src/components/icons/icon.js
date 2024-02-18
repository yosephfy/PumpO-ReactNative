import * as ICONS from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Icon({
  type,
  onClick,
  query = { func: () => {}, key: [] },
  showText,
  secondaryIcon,
  ...props
}) {
  const SelectedIcon = ICONS[type];

  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();

  if (!SelectedIcon) {
    console.warn(`Icon '${type}' not found`);
    return null;
  }

  useEffect(() => {}, [toggle]);

  const { error, isLoading, data, refetch } = useQuery(
    query == null
      ? {}
      : {
          queryKey: query.key,
          queryFn: () => {
            return query.func;
          },
        }
  );

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { height: props.size + 5, width: props.size + 10 },
        props.style,
      ]}
      onPress={() => {
        //if (onClick) onClick();
        const c = new Promise((res, err) => {
          if (onClick) {
            onClick();
            res();
          } else {
            err();
          }
        });
        //refetch();
        c.then(() => {
          refetch();
          setToggle((prev) => !prev);
        }).catch(() => {});
      }}
    >
      <SelectedIcon {...props} />
      {showText &&
        (error ? (
          <Text>ERROR</Text>
        ) : isLoading ? (
          <Text>LOADING</Text>
        ) : (
          <Text style={styles.text}>{data}</Text>
        ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  text: {
    position: "absolute",
    bottom: 0,
    left: "85%",
    fontSize: 14,
  },
});
