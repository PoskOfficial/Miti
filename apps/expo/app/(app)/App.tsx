import { useEffect, useState } from "react";
import { Pressable, useColorScheme } from "react-native";
import { router } from "expo-router";
import type { InferResponseType } from "hono";
import { Button, H3, H4, Image, Text, View, XStack, YStack } from "tamagui";

import type { Api } from "../../lib/api.client";
import { useAuth } from "../../lib/auth/AuthProvider";

export function App() {
  const scheme = useColorScheme();
  const { user, signOut, getOAuthAccounts, signInWithOAuth } = useAuth();
  const [accounts, setAccounts] = useState<
    InferResponseType<(typeof Api.client)["user"]["oauth-accounts"]["$get"]>["accounts"]
  >([]);
  useEffect(() => {
    void getOAuthAccounts().then((response) => setAccounts(response));
  }, [getOAuthAccounts]);
  return (
    <View alignItems="center" flex={1} margin={"$3"}>
      <YStack
        gap={"$3"}
        flex={1}
        width={"100%"}
        maxWidth={500}
        backgroundColor={scheme === "light" ? "#ffffff" : "#161b26"}
        padding={"$4"}
        borderRadius={"$4"}
        borderWidth={1}
        borderColor={scheme === "light" ? "#e4e4e7" : "#252d3d"}
      >
        {user && (
          <View>
            <H3 marginBottom={"$3"}>User Information</H3>
            <XStack gap={"$4"} alignItems="center" marginBottom={"$3"}>
              {user.profilePictureUrl ? (
                <Image src={user.profilePictureUrl} width={"$8"} height={"$8"} borderRadius={999} />
              ) : (
                <View width={"$8"} height={"$8"} backgroundColor={"$gray11"} borderRadius={999} />
              )}
              <View>
                <H4>{user.username}</H4>
                <Text>{user.email}</Text>
              </View>
            </XStack>
            <YStack gap={6}>
              <Text color="$gray11">User ID: {user.id}</Text>
              <Text color="$gray11">E-Mail Verified: {user.emailVerified ? "yes" : "no"}</Text>
            </YStack>
          </View>
        )}
        <H3>OAuth</H3>
        {["Google", "Apple", "Github"].map((provider) => (
          <XStack
            key={provider}
            alignItems="center"
            justifyContent="space-between"
            backgroundColor={scheme === "light" ? "#f4f4f5" : "$gray3"}
            borderRadius={"$3"}
            padding={"$3"}
          >
            <Text>{provider}</Text>
            {accounts.some((account) => account.provider === provider.toLowerCase()) ? (
              <Text color="$green10">Connected</Text>
            ) : (
              <Pressable onPress={() => signInWithOAuth({ provider: provider.toLowerCase() })}>
                <Text color="#4f46e5" fontWeight="600">
                  Connect now
                </Text>
              </Pressable>
            )}
          </XStack>
        ))}
        <Button
          onPress={() => {
            void signOut().then(() => router.replace("/auth/sign-in"));
          }}
          backgroundColor={scheme === "light" ? "$gray4" : "#4f46e5"}
          pressStyle={{ scale: 0.98, backgroundColor: "#4338ca" }}
        >
          Sign out
        </Button>
      </YStack>
    </View>
  );
}
