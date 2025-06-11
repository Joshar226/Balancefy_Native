import { deleteIncomebyId, updateIncomeById } from '@/src/api/IncomeAPI'
import { globalStyles } from '@/src/styles/styles'
import { Income, IncomeForm } from '@/src/types'
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

type EditIncomeFormProps = {
    income: Income
}

export default function EditIncomeForm({income} : EditIncomeFormProps) {
    const [ show, setShow ] = useState(false)
    const router = useRouter()

    const initialValues : IncomeForm = {
        title: income.title,
        value: income.value
    }

    const { control, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const editIncome = useMutation({
        mutationFn: updateIncomeById,
        onError: error => Toast.error(error.message),
        onSuccess: (data) => {
            Toast.success(data)
            router.replace('/(app)/incomes')
        }
    })
    const deleteIncome = useMutation({
        mutationFn: deleteIncomebyId,
        onError: error => Toast.error(error.message),
        onSuccess: (data) => {
            Toast.success(data)
            setShow(false)
            router.replace('/(app)/incomes')
        }
    })

    const handleEditIncome = (formData : IncomeForm) => {
        const data = {
            formData,
            incomeId: income._id
        }
        editIncome.mutate(data)
    }

    const handleDeleteIncome = () => deleteIncome.mutate(income._id)

  return (
    <SafeAreaView style={{padding: 20}}>
        <View style={globalStyles.editForm}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={globalStyles.editText}>{income.title}</Text>
                    <Text style={globalStyles.editText}>{formatCurrency(+income.value)}</Text>
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
            onPress={handleSubmit(handleEditIncome)}
            >
            <Text style={globalStyles.appSubmitText}>Edit Income</Text>
            </Pressable>
        </View>

        <Portal>
          <Dialog visible={show} onDismiss={() => setShow(false)}>
            <Dialog.Title>Delete Income?</Dialog.Title>
            <Dialog.Content>
              <Text>Once an Income is deleted, it cannot be recovered</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShow(false)} textColor='gray'>Cancel</Button>
              <Button onPress={handleDeleteIncome} textColor='red'>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

    </SafeAreaView>
  )
}


