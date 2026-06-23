import React, { useEffect, useRef } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FilterStatus = "all" | "active" | "completed";

type Props = {
  selectedFilter: FilterStatus;
  onChangeFilter: (filter: FilterStatus) => void;
};

const filters: FilterStatus[] = ["all", "active", "completed"];

const FilterTabs = ({ selectedFilter, onChangeFilter }: Props) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = React.useState(0);

  const selectedIndex = filters.indexOf(selectedFilter);
  const tabWidth = containerWidth / filters.length;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex * tabWidth,
      useNativeDriver: true,
      speed: 16,
      bounciness: 6,
    }).start();
  }, [selectedIndex, tabWidth, translateX]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.slider,
            {
              width: tabWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {filters.map((filter) => {
        const isSelected = selectedFilter === filter;

        return (
          <Pressable
            key={filter}
            style={styles.tab}
            onPress={() => onChangeFilter(filter)}
          >
            <Text
              style={[styles.tabText, isSelected && styles.selectedTabText]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  slider: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
    zIndex: 1,
  },
  tabText: {
    fontWeight: "600",
    color: "#6B7280",
  },
  selectedTabText: {
    color: "#2563EB",
  },
});
