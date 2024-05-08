import React, { useState } from "react";
import { View, Button, Modal, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PopupWithIcons = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Popup" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <TouchableOpacity
              onPress={() => {
                /* Handle option 1 */
              }}
            >
              <AntDesign name="heart" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                /* Handle option 2 */
              }}
            >
              <AntDesign name="star" size={30} color="yellow" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                /* Handle option 3 */
              }}
            >
              <AntDesign name="smileo" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ marginTop: 10, color: "blue" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopupWithIcons;
