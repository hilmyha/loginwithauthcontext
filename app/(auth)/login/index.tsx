import { View, Text, TextInput, Pressable, Button } from "react-native";
import { useContext, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View style={{ padding: 24, flex: 1, gap: 3 }}>
      <Text>Login</Text>

      <View>
        <TextInput
          placeholder="username"
          onChangeText={(text: string) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>

      <Button onPress={login} title="Login" />
    </View>
  );
}
