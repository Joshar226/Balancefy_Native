import { createExpense } from '@/src/api/ExpenseAPI'
import { globalStyles } from '@/src/styles/styles'
import { ExpenseForm } from '@/src/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text, TextInput, View } from 'react-native'
import { Toast } from 'toastify-react-native'

export default function ExpensesForm() {

    const queryClient = useQueryClient()

    const initialValues : ExpenseForm = {
        title: '',
        value: ''
    }

    const { handleSubmit, reset, control, formState: {errors} } = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createExpense,
        onError: error => Toast.error(error.message),
        onSuccess: (data) => {
        Toast.success(data)
        queryClient.invalidateQueries({queryKey: ['expenses']})
        reset()
        }
    })

    const handleCreateIncome = (formData : ExpenseForm) => mutate(formData) 
  
  return (
    <>
      <View style={globalStyles.appInputsContent} >
        <View style={globalStyles.appInputContent}>
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
        <View style={globalStyles.appInputContent}>
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
      </View>

      <Pressable
        style={[globalStyles.appSubmitBtn, {backgroundColor: '#82181a'}]}
        onPress={handleSubmit(handleCreateIncome)}
      >
        <Text style={globalStyles.appSubmitText}>Create Expense</Text>
      </Pressable>
    </>
  )
}
