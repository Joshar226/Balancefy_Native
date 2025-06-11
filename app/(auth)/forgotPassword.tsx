import { forgotPassword } from "@/src/api/AuthAPI";
import AuthLayout from "@/src/layouts/AuthLayout";
import { globalStyles } from "@/src/styles/styles";
import { ForgotPasswordType } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { Toast } from "toastify-react-native";

export default function ForgotPassword() {
  //Variables

  const initialValues: ForgotPasswordType = {
    email: "",
  };

  //Functions
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => Toast.error(error.message),
    onSuccess: (data) => {
      Toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (email: ForgotPasswordType) => mutate(email);

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

        <Pressable
          style={globalStyles.authSubmitBtn}
          onPress={handleSubmit(handleForgotPassword)}
        >
          <Text style={globalStyles.authSubmitText}>Send Email</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 15 }}>
        <Link href={"/(auth)"} style={globalStyles.authSubmitText}>
          Log In
        </Link>
        <Link href={"/singUp"} style={globalStyles.authSubmitText}>
          Sing Up
        </Link>
      </View>
    </AuthLayout>
  );
}
