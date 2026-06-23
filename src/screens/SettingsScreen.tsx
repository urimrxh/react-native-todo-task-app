import { StyleSheet, Text, View } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.settings}>Settings are not available right now!</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by Urim Rexhepi</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    padding: 16,
    fontSize: 18,
    color: "#6B7280",
    margin: "auto",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b728069",
  },
});
