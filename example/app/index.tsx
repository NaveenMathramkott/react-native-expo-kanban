import React, { useState } from "react"
import { Alert, Button, Modal, StyleSheet, Text, TextInput, View } from "react-native"
import ReactNativeKanbanBoard from "react-native-expo-kanban"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  // Sample data format to pass to KanbanBoard
  const boardStatusData = [
    { id: 1, status: "New", color: "#FF6B6B", is_end: false },
    { id: 2, status: "Contacted", color: "#4ECDC4", is_end: false },
    { id: 3, status: "Qualified", color: "#45B7D1", is_end: false },
  ]
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [currentBoardId, setCurrentBoardId] = useState(0)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    priority: 'medium',
  })
  const [boardCardData, setBoardCardData] = useState({
    "1": {
      leads: [
        {
          id: 101,
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          phone: "+1 555-123-4567",
          company: "Acme Inc.",
          created_on: new Date().toISOString(),
          priority: "high",
          status: "New",
          notes: "Interested in premium package",
          assigned_to: {
            first_name: "Alex",
            last_name: "Johnson",
            profile_pic: null,
          },
        },
        {
          id: 102,
          first_name: "Sarah",
          last_name: "Smith",
          email: "sarah.smith@example.com",
          phone: "+1 555-987-6543",
          company: "Globex Corp",
          created_on: new Date().toISOString(),
          priority: "medium",
          status: "New",
          notes: "Requested demo next week",
          assigned_to: {
            first_name: "Taylor",
            last_name: "Wilson",
            profile_pic: null,
          },
        },
      ],
      total_count: 2,
    },
    "2": {
      leads: [
        {
          id: 201,
          first_name: "Mike",
          last_name: "Brown",
          email: "mike.brown@example.com",
          phone: "+1 555-456-7890",
          company: "Tech Solutions",
          created_on: new Date().toISOString(),
          priority: "low",
          status: "Contacted",
          notes: "Follow up in 2 days",
          assigned_to: {
            first_name: "Jordan",
            last_name: "Lee",
            profile_pic: null,
          },
        },
      ],
      total_count: 1,
    },
    "3": {
      leads: [],
      total_count: 0,
    },

  })

  // Custom card styles
  const cardStyles = {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginVertical: 6,
    padding: 12,
  }



  // Handle card press
  const handleCardPress = (item) => {
    // You can navigate to a detail screen here with cardData
    Alert.alert("card pressed", item.id)
  }

  const handleAddLeadPress = (boardId: number) => {
    setCurrentBoardId(boardId)
    setIsAddModalVisible(true)
  }

  const priorityColors = {
    high: "#FF5252",
    medium: "#FFC107",
    low: "#4CAF50",
  }

  const handleCreateLead = () => {
    // Update board data add logic here

    const newLead = {
      id: `new-${Math.random().toString(36).substr(2, 5)}`,
      ...formData,
      status: boardStatusData.find(b => b.id === currentBoardId)?.status || "",
      created_on: new Date().toISOString(),
      assigned_to: {
        first_name: "You",
        last_name: "",
        profile_pic: null,
      },
    }

    setBoardCardData(prev => ({
      [currentBoardId]: {
        leads: [...(prev[currentBoardId]?.leads || []), newLead],
        total_count: (prev[currentBoardId]?.total_count || 0) + 1,
      },
      ...prev,
    }))

    setIsAddModalVisible(false)
    // Reset form
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      company: '',
      priority: 'medium',
    })
  }
  const handleDeleteLead = async (leadId: number, boardId: number) => {
    try {
      // Your delete logic here
      // Update boardData state
    } catch (error) {
      // Handle error
    }
  }

  return (
    <SafeAreaView style={styles.containerWrapper}>
      <ReactNativeKanbanBoard
        boardHeaderData={boardStatusData}
        boardCardData={boardCardData}
        onCardPress={(data) => handleCardPress(data)}
        onBoardChange={(data) => setBoardCardData(data)}
        onAddCard={handleAddLeadPress}
        cardStyle={cardStyles}
        priorityColors={priorityColors}
        onDeleteLead={handleDeleteLead}
      />
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Lead</Text>

            <TextInput
              placeholder="First Name"
              value={formData.first_name}
              onChangeText={(text) => setFormData({ ...formData, first_name: text })}
              style={styles.textInput}
            />

            <TextInput
              placeholder="Last Name"
              value={formData.last_name}
              onChangeText={(text) => setFormData({ ...formData, last_name: text })}
              style={styles.textInput}
            />

            <TextInput
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              style={styles.textInput}
            />

            <TextInput
              placeholder="Company"
              value={formData.company}
              onChangeText={(text) => setFormData({ ...formData, company: text })}
              style={styles.textInput}
            />

            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setIsAddModalVisible(false)}
              />
              <Button
                title="Add Lead"
                onPress={handleCreateLead}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerWrapper: { flex: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2D3748",
    textAlign: "center",
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
})