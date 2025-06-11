import { createAccount } from "@/src/api/AuthAPI";
import AuthLayout from "@/src/layouts/AuthLayout";
import { globalStyles } from "@/src/styles/styles";
import { AuthSingUpForm } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { Toast } from "toastify-react-native";

export default function SingUp() {
  //Variables
  const initialValues: AuthSingUpForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  //Functions
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => Toast.error(error.message),
    onSuccess: (data) => {
      Toast.success(data);
      reset();
    },
  });

  const password = watch('password')
  const handleRegister = (formData: AuthSingUpForm) => mutate(formData);

  return (
    <AuthLayout>
      <View style={globalStyles.authform}>
        <View style={globalStyles.authInputContent}>
          <Controller
            control={control}
            rules={{
              required: "Your Name is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Your Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={globalStyles.authInput}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text style={globalStyles.authErrorMessage}>
              {errors.name.message}
            </Text>
          )}
        </View>

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
              required: "A password is required",
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

        <View style={globalStyles.authInputContent}>
          <Controller
            control={control}
            rules={{
              required: "The password doesn't match",
              validate: (value) => value === password || 'Passwords are not the same'
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password Confirmation"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={globalStyles.authInput}
                secureTextEntry={true}
              />
            )}
            name="password_confirmation"
          />
          {errors.password_confirmation && (
            <Text style={globalStyles.authErrorMessage}>
              {errors.password_confirmation.message}
            </Text>
          )}
        </View>

        <Pressable
          style={globalStyles.authSubmitBtn}
          onPress={handleSubmit(handleRegister)}
        >
          <Text style={globalStyles.authSubmitText}>Sing Up</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 15 }}>
        <Link href={"/(auth)"} style={globalStyles.authSubmitText}>
          Log In
        </Link>
        <Link href={"/forgotPassword"} style={globalStyles.authSubmitText}>
          Forgot Password?
        </Link>
      </View>
    </AuthLayout>
  );
}
