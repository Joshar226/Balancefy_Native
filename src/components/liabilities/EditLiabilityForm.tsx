import { deleteLiabilitybyId, updateLiabilityById } from '@/src/api/LiabilityAPI'
import { globalStyles } from '@/src/styles/styles'
import { Liability, LiabilityForm } from '@/src/types'
import { formatCurrency } from '@/src/utils/utils'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text, TextInput, View } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'toastify-react-native'

type EditLiabilityFormProps = {
  liability: Liability
}

export default function EditLiabilityForm({liability} : EditLiabilityFormProps) {
  const [ show, setShow ] = useState(false)
    const router = useRouter()

    const initialValues : LiabilityForm = {
        title: liability.title,
        value: liability.value
    }

    const { control, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const editLiability = useMutation({
        mutationFn: updateLiabilityById,
        onError: error => Toast.error(error.message),
        onSuccess: (data) => {
            Toast.success(data)
            router.replace('/(app)/liabilities')
        }
    })
    const deleteLiability = useMutation({
        mutationFn: deleteLiabilitybyId,
        onError: error => Toast.error(error.message),
        onSuccess: (data) => {
            Toast.success(data)
            setShow(false)
            router.replace('/(app)/liabilities')
        }
    })

    const handleEditLiability = (formData : LiabilityForm) => {
        const data = {
            formData,
            liabilityId: liability._id
        }
        editLiability.mutate(data)
    }

    const handleDeleteLiability = () => deleteLiability.mutate(liability._id)

  return (
    <SafeAreaView style={{padding: 20}}>
        <View style={globalStyles.editForm}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={globalStyles.editText}>{liability.title}</Text>
                    <Text style={globalStyles.editText}>{formatCurrency(+liability.value)}</Text>
                </View>

                <Ionicons name='trash' color='red' size={27} onPress={() => setShow(true)}/>
            </View>

            <View style={globalStyles.editInputContent}>
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
                    name="title"
                />
                {errors.title && (
                    <Text style={globalStyles.authErrorMessage}>
                    {errors.title.message}
                    </Text>
                )}
            </View>

            <View style={globalStyles.editInputContent}>
            <Controller
                control={control}
                rules={{
                required: "A value is required"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Value"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType='decimal-pad'
                    style={globalStyles.appInput}
                />
                )}
                name="value"
            />
            {errors.value && (
                <Text style={globalStyles.authErrorMessage}>
                {errors.value.message}
                </Text>
            )}
            </View>

            <Pressable
            style={[globalStyles.appSubmitBtn, globalStyles.editSubmitBtn]}
            onPress={handleSubmit(handleEditLiability)}
            >
            <Text style={globalStyles.appSubmitText}>Edit Liability</Text>
            </Pressable>
        </View>

        <Portal>
          <Dialog visible={show} onDismiss={() => setShow(false)}>
            <Dialog.Title>Delete Liability?</Dialog.Title>
            <Dialog.Content>
              <Text>Once a Liability is deleted, it cannot be recovered</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShow(false)} textColor='gray'>Cancel</Button>
              <Button onPress={handleDeleteLiability} textColor='red'>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

    </SafeAreaView>
  )
}
