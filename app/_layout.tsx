import { UserProvider } from "@/contexts/userContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}
