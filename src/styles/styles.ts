import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    // Auth
    authform: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 30,
        width: '85%'
    },
    authInputContent: {
        marginBottom: 30
    },
    authInput: {
        borderWidth: 2,
        paddingHorizontal: 15,
        fontFamily: 'Tagesschrift',
        fontSize: 16
    },
    authErrorMessage: {
        color: 'red',
        marginTop: 10,
        backgroundColor: '#f9c4d1',
        paddingVertical: 4,
        paddingLeft: 10,
        borderLeftWidth: 4,
        borderLeftColor: 'red'
    },
    authSubmitBtn: {
        backgroundColor: '#162456',
        borderRadius: 10
    },
    authSubmitText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Tagesschrift',
        paddingVertical: 10,
        fontSize: 20
    },
    authLinks: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Tagesschrift',
        paddingVertical: 10,
        fontSize: 20
    },


    // App
    appContent: {
        padding: 20
    },
    appViewType : {
        paddingVertical: 20,
        borderRadius: 10,
        gap: 5
    },
    appTextType: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    appForm: {
        marginTop: 25,
        paddingHorizontal: 15
    },
    appInputsContent: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    appInputContent: {
        flex: 1
    },
    appInput: {
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        fontSize: 15
    },
    appSubmitBtn: {
        borderRadius: 10
    },
    appSubmitText: {
        paddingVertical: 12,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    },

    // Card
    cardContent: {
        width: '47%',
        marginVertical: 13,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10
    },
    cardTextContent: {
        paddingVertical: 10, gap: 2
    },
    cardText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },


    // Edit Form
    editText: {
        color: '#fff',
        marginBottom: 15,
        fontSize: 22,
        fontWeight: 'bold'
    },
    editForm: {
        backgroundColor: '#18183d',
        borderRadius: 10,
        padding: 20,
    },
    editInputContent: {
        marginBottom: 30
    },
    editSubmitBtn: {
        backgroundColor: '#28289e'
    },


    // Profile
    profileInputContainer: {
        width: '100%',
        marginBottom: 30
    },
    profileLabel: {
        color: '#fff',
        fontSize: 19,
        paddingLeft: 5,
        fontWeight: 'bold',
        marginBottom: 6
    },
    profileSubmitbtn: {
        backgroundColor: '#1c398e',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        width: '100%'
    },
    profileSubmitText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },


    // Charts
    chartContainer: {
        alignItems: 'center',
    },
    chartTitle: {
        color: '#18183d',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },


    // Dashboard
    dashboardCard: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10        
    },
    dashboardCardText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})