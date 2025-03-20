import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/store/auth/auth-context';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ms } from 'react-native-size-matters';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading, signOut } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  // Only require authentication within the (tabs) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="../auth/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            display: "flex",
            backgroundColor: Colors[colorScheme ?? "light"].background,
            shadowColor: "transparent",
            elevation: 0,
            borderTopWidth: 0,
          },
        }),
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          shadowColor: "transparent",
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerStatusBarHeight: 0,
        headerTitle: "",
        headerRight: () => (
          <FontAwesome
            name="cog"
            size={ms(24)}
            color={Colors[colorScheme ?? "light"].primary}
            onPress={signOut}
          />
        ),
        headerRightContainerStyle: {
          paddingHorizontal: ms(10),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: () => (
            <FontAwesome
              name="dashboard"
              size={ms(24)}
              color={Colors[colorScheme ?? "light"].primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Transactions",
          tabBarIcon: () => (
            <FontAwesome5
              name="wallet"
              size={ms(24)}
              color={Colors[colorScheme ?? "light"].primary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
