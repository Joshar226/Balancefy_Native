import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Toast } from 'toastify-react-native'
import { updateProfile } from '../api/AuthAPI'
import { globalStyles } from '../styles/styles'
import { ProfileForm as ProfileFormType } from '../types'

type ProfileFormProps = {
  data: ProfileFormType
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProfileForm({ data, setShowProfile }: ProfileFormProps) {

    const router = useRouter()
    const queryClient = useQueryClient()

    const initialValues : ProfileFormType = {
        name: data.name,
        email: data.email
    }

  const { handleSubmit, control, formState: { errors } } = useForm({defaultValues : initialValues})

  const {mutate} = useMutation({
    mutationFn: updateProfile,
    onError: error => Toast.error(error.message),
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['user']})
        Toast.success(data)
    }
  })

  const handleEditProfile = (formData : ProfileFormType) => mutate(formData)

  const handleSingOut = async () => {
    await AsyncStorage.removeItem('AUTH_TOKEN')
    router.replace('/(auth)/singUp')
  }

  return (
    <>
        <View style={globalStyles.profileInputContainer}>
            <Text style={globalStyles.profileLabel}>Name</Text>
            <Controller
                control={control}
                rules={{
                required: "A title is required"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Title"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={globalStyles.appInput}
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

        <View style={globalStyles.profileInputContainer}>
            <Text style={globalStyles.profileLabel}>Email</Text>
            <Controller
                control={control}
                rules={{
                    required: "A title is required",
                    pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email",
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Title"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={globalStyles.appInput}
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

        <Pressable style={globalStyles.profileSubmitbtn} onPress={handleSubmit(handleEditProfile)}>
            <Text style={globalStyles.profileSubmitText}>Save</Text>
        </Pressable>

        <Pressable onPress={() => setShowProfile(true)}>
            <Text style={styles.changePasswordText}>Change Password</Text>
        </Pressable>

        <Pressable style={[globalStyles.profileSubmitbtn, {backgroundColor: '#e7000b'}]} onPress={handleSingOut}>
            <Text style={styles.singOutText}>Sing Out</Text>
        </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
    changePasswordText: {
        marginTop: 30,
        color: '#fff',
        fontSize: 16
    },
    singOutText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})
