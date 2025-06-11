import { updatePassword } from '@/src/api/AuthAPI'
import { globalStyles } from '@/src/styles/styles'
import { UpdatePasswordType } from '@/src/types'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Toast } from 'toastify-react-native'

type ChangePasswordProps = {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChangePassword({ setShowProfile }: ChangePasswordProps) {

  const initialValues : UpdatePasswordType = {
    current_password: '',
    password_confirmation: '',
    password: ''
  }

  const {handleSubmit, control, reset, watch, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
    mutationFn: updatePassword,
    onError: error => Toast.error(error.message),
    onSuccess: (data) => {
      Toast.success(data)
      reset()
      setShowProfile(false)
    }})

    const password = watch('password')
    const handleUpdatePassword = (formData : UpdatePasswordType) => mutate(formData)

  return (
    <>

      <Pressable onPress={() => setShowProfile(false)} style={styles.backBtn}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>
      <View style={globalStyles.profileInputContainer}>
            <Text style={globalStyles.profileLabel}>Current Password</Text>
            <Controller
              control={control}
              rules={{
                required: "Your password is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Current Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={globalStyles.appInput}
                  secureTextEntry={true}
                />
              )}
              name="current_password"
            />
            {errors.current_password && (
              <Text style={globalStyles.authErrorMessage}>
                {errors.current_password.message}
              </Text>
            )}
        </View>

        <View style={globalStyles.profileInputContainer}>
            <Text style={globalStyles.profileLabel}>New Password</Text>
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
                  placeholder="New Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={globalStyles.appInput}
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

        <View style={globalStyles.profileInputContainer}>
            <Text style={globalStyles.profileLabel}>Confirm Password</Text>
            <Controller
              control={control}
              rules={{
                required: "The password doesn't match",
                validate: (value) => value === password || 'Passwords are not the same'
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Confirm Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={globalStyles.appInput}
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

        <Pressable style={globalStyles.profileSubmitbtn} onPress={handleSubmit(handleUpdatePassword)}>
            <Text style={globalStyles.profileSubmitText}>Change Password</Text>
        </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  backBtn: {
    width: '100%',
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 5
  }
})