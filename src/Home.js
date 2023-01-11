import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Menu, Button, AlertDialog } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllNotes, deleteNote } from './redux/notesActions'

const Home = ({navigation}) => {

    const notesList = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const [sortedNotes, setSortedNotes] = useState([]);

    
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)

    const cancelRef = useRef(null)

    const sort =(arr) => {
        var date = '';
        var sorted = [];
        var temp = [];

        arr.forEach((e, index) => {
            if(index === 0){
                temp.push(e);
                date = e.date;
                if(index === arr.length -1){
                    const ob = {
                        day:date,
                        notes:temp,
                    };
                    sorted.push(ob);
                }
            }else{
                if(e.date === date){
                    temp.push(e);
                    if(index === arr.length -1){
                        const ob = {
                            dat:date,
                            notes:temp
                        };
                        sorted.push(ob);
                    }
                }else{
                    const ob = {
                        day:date,
                        notes:temp,
                    };

                    sorted.push(ob);
                    temp = [];
                    date = e.date;
                    temp.push(e);

                    if(index === arr.length -1){
                        const ob = {
                            day:date,
                            notes:temp
                        };
                        sorted.push(ob)
                    }
                }
            }
        });
        return sorted;
    };

    useEffect(() => {
        setSortedNotes(sort(notesList))
    },[notesList])

    const handleClickNote = (id) => {
        navigation.navigate('Note', {noteId:id})
    }

    const handleDeleteAll = async() => {
        dispatch(deleteAllNotes());
        onClose();
    }

    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id))
    }

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='auto' />

        <ScrollView style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Notes</Text>
            </View>
            <View style={styles.subHeader}>
                <Menu placement='bottom left' w="190" trigger={(triggerProps) => {
                    return(
                        <Pressable accessibilityLabel='More options menu' {...triggerProps}>
                            <MaterialCommunityIcons name='dots-vertical' size={24} color="#404040" />
                        </Pressable>
                    );
                }}>
                    <Menu.Item onPress={() => setIsOpen(!isOpen)} >Delete All</Menu.Item>
                    <Menu.Item onPress={() => navigation.navigate('About')} >About</Menu.Item>
                </Menu>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose} >
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>Delete All Notes</AlertDialog.Header>
                        <AlertDialog.Body>
                            <Text style={{ color: '#404040' }}>
                                This will remove all your notes. This action cannot be undone.
                            </Text>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant="unstyled"
                                    colorScheme="coolGray"
                                    onPress={onClose}
                                    ref={cancelRef}>
                                    Cancel
                                </Button>
                                <Button colorScheme="danger" onPress={handleDeleteAll} >
                                    Delete
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </View>

            {
                notesList.length > 0 ? (
                    <>
                    {
                        sortedNotes.map((notes, index) => (
            <View key={index} style={styles.noteContainer}>
                <View style={styles.noteHeader}>
                    <Text style={styles.noteDate}>{notes.day}</Text>
                    <Text style={styles.noteView}>View All</Text>
                </View>
                    {
                notes.notes.map((m, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleClickNote(m.idx)}>
                    <View style={styles.noteCardWrapper}>
                        <View style={styles.noteLeftContent}>
                            <View style={{backgroundColor: "#427dde", height:55, width:5}}>
                            </View>
                        </View>
                        <View style={styles.noteMiddleContent}>
                            <Text style={styles.topText}>{m.topic }</Text>
                            <Text style={styles.middleText}>{m.desc}</Text>
                            <Text style={styles.bottomText}>{m.time}</Text>
                        </View>
                        <TouchableOpacity style={styles.noteRightContainer} onPress={() => handleDeleteNote(m.id)} >
                            <FontAwesome5 name="trash" size={16} color="#404040" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                ))}
            </View>
                        ))}
                        </>
                ) : (
                    <View style={{display:'flex', alignItems:'center'}}>
                        <Text style={{color:'#9f9f9f'}}>
                            You dont have any notes.
                        </Text>
                    </View>
                )}
        </ScrollView>
        <View style={styles.addButtonView}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Note', {noteId:null})}>
                <Feather name='plus' size={20} color='white' />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    main: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    subHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '400',
    },
    noteContainer: {
        paddingBottom: 30,
    },
    noteHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    noteDate: {
        fontSize: 16,
        fontWeight: "500",
        color: '#404040',
    },
    noteView: {
        color: '#404040',
        fontWeight: '500',
    },
    noteCardWrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#404040',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        marginBottom: 10,
    },
    noteLeftContent: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteMiddleContent: {
        flex: 0.8,
    },
    noteRightContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    topText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#404040',
        marginBottom: 6,
    },
    middleText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9f9f9f',
        marginBottom: 10,
    },
    bottomText: {
        fontSize: 12,
        color: '#9f9f9f',
    },
    addButtonView: {
        marginTop: 10,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        backgroundColor: '#427dde',
        padding: 15,
        borderRadius: 25,
    },
})