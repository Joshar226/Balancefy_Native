import { login } from "@/src/api/AuthAPI";
import AuthLayout from "@/src/layouts/AuthLayout";
import { globalStyles } from "@/src/styles/styles";
import { AuthLogInForm } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { Toast } from "toastify-react-native";

export default function Login() {
  //Variables
  const router = useRouter();
  const initialValues: AuthLogInForm = {
    email: "",
    password: "",
  };

  //States
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem("AUTH_TOKEN")             
        // If token exists, redirect to the app
        if (token) {
          router.replace('/(app)');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser()
  }, []);

  //Functions
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => Toast.error(error.message),
    onSuccess: () => router.replace("/(app)")
  });

  const handleLogin = (formData: AuthLogInForm) => mutate(formData)

  return (
    <AuthLayout>
      <View style={globalStyles.authform}>
        <View style={globalStyles.authInputContent}>
          <Controller
            control={control}
            rules={{
              required: "Your Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="E-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={globalStyles.authInput}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={globalStyles.authErrorMessage}>
              {errors.email.message}
            </Text>
          )}
        </View>

        <View style={globalStyles.authInputContent}>
          <Controller
            control={control}
            rules={{
              required: "Your Password is required",
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={globalStyles.authInput}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={globalStyles.authErrorMessage}>
              {errors.password.message}
            </Text>
          )}
        </View>

        <Pressable
          style={globalStyles.authSubmitBtn}
          onPress={handleSubmit(handleLogin)}
        >
          <Text style={globalStyles.authSubmitText}>Log In</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 15 }}>
        <Link href={"/singUp"} style={globalStyles.authSubmitText}>
          Sing Up
        </Link>
        <Link href={"/forgotPassword"} style={globalStyles.authSubmitText}>
          Forgot Password?
        </Link>
      </View>
    </AuthLayout>
  );
}
