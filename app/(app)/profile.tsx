import ProfileForm from '@/src/components/ProfileForm';
import Spinner from '@/src/components/Spinner';
import { useAuth } from '@/src/hooks/useAuth';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ChangePassword from '../changePassword';

export default function Profile() {

  const [ showProfile, setShowProfile ] = useState(false)
  const { data, isLoading } = useAuth()
      
  if (isLoading) return <Spinner />

  if(data)
  return (
    <View style={styles.container}>
      {!showProfile ? (
        <ProfileForm data={data} setShowProfile={setShowProfile}/>
      ) : (
        <ChangePassword setShowProfile={setShowProfile}/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18183d',
    borderRadius: 10,
    padding: 20
  }
})