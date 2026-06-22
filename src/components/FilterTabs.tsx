import { Pressable, StyleSheet, Text, View } from "react-native";

type FilterStatus = "all" | "active" | "completed";

type Props = {
  selectedFilter: FilterStatus;
  onChangeFilter: (filter: FilterStatus) => void;
};

const filters: FilterStatus[] = ["all", "active", "completed"];

const FilterTabs = ({ selectedFilter, onChangeFilter }: Props) => {
  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter;

        return (
          <Pressable
            key={filter}
            style={[styles.tab, isSelected && styles.selectedTab]}
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
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
  },
  selectedTab: {
    backgroundColor: "#FFFFFF",
  },
  tabText: {
    fontWeight: "600",
    color: "#6B7280",
  },
  selectedTabText: {
    color: "#2563EB",
  },
});
