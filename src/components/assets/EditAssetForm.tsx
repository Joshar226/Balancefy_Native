import { deleteAssetById, updateAssetById } from '@/src/api/AssetAPI'
import { globalStyles } from '@/src/styles/styles'
import { Asset, AssetForm } from '@/src/types'
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

type EditAssetFormProps = {
  asset: Asset 
}

export default function EditAssetForm({ asset } : EditAssetFormProps) {
  const [ show, setShow ] = useState(false)
    const router = useRouter()

    const initialValues : AssetForm = {
        title: asset.title,
        value: asset.value
    }

    const { control, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const editAsset = useMutation({
        mutationFn: updateAssetById,
        onError: error => Toast.error(error.message),
        onSuccess: (data) => {
            Toast.success(data)
            router.replace('/(app)/assets')
        }
    })
    const deleteAsset = useMutation({
        mutationFn: deleteAssetById,
        onError: error => Toast.error(error.message),
        onSuccess: (data) => {
            Toast.success(data)
            setShow(false)
            router.replace('/(app)/assets')
        }
    })

    const handleEditAsset = (formData : AssetForm) => {
        const data = {
            formData,
            assetId: asset._id
        }
        editAsset.mutate(data)
    }

    const handleDeleteAsset = () => deleteAsset.mutate(asset._id)

  return (
    <SafeAreaView style={{padding: 20}}>
        <View style={globalStyles.editForm}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={globalStyles.editText}>{asset.title}</Text>
                    <Text style={globalStyles.editText}>{formatCurrency(+asset.value)}</Text>
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
            onPress={handleSubmit(handleEditAsset)}
            >
            <Text style={globalStyles.appSubmitText}>Edit Asset</Text>
            </Pressable>
        </View>

        <Portal>
          <Dialog visible={show} onDismiss={() => setShow(false)}>
            <Dialog.Title>Delete Asset?</Dialog.Title>
            <Dialog.Content>
              <Text>Once an Asset is deleted, it cannot be recovered</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShow(false)} textColor='gray'>Cancel</Button>
              <Button onPress={handleDeleteAsset} textColor='red'>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

    </SafeAreaView>
  )
}
