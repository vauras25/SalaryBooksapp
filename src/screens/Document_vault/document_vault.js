import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Linking,
  Modal,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from "react-native-linear-gradient";
import Navbar from '../Dashboardscreen/navbar';
import BottomNavigation from '../BottomNavigation';
import { useRoute } from "@react-navigation/native";
import { NativeModules } from "react-native";
// import RNFetchBlob from "rn-fetch-blob";
import ReactNativeBlobUtil from 'react-native-blob-util';
const { PdfPicker } = NativeModules;
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from "react-native-pdf";
import axios from "axios";
import RNFS from "react-native-fs";
const { width } = Dimensions.get("window");

const DocumentVaultScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Personal");
  const navigation = useNavigation();

  const [uploadedFiles, setUploadedFiles] = useState({
    documents: [],
    other_documents: []
  });
  const [menuIndex, setMenuIndex] = useState(null);

  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameText, setRenameText] = useState("");
  const [renameIndex, setRenameIndex] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setuserData] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isPDF, setIsPDF] = useState(false);

  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const stored = await AsyncStorage.getItem("userData");

        console.log("TOKEN LOADED:", token);

        if (stored) {
          const parsedUser = JSON.parse(stored);

          setToken(token);
          setuserData(parsedUser);

          fetchUploadedDocs(parsedUser._id, token);

        }
      } catch (error) {
        console.log("ERROR reading storage:", error);
      }
    };

    loadToken();
  }, []);


  const pickDocument = async (field) => {
    // console.log(field,"field");

    try {
      const file = await PdfPicker.pickFile();


      let extractedName = "Unknown File";
      if (file.uri) {
        const parts = file.uri.split("/");
        extractedName = parts[parts.length - 1];
      }
      console.log(extractedName,"extractedName");
      const key = field === "Personal" ? "documents" : "other_documents";
      const currentList = uploadedFiles[key] || [];
      // extractedName=extractedName.replace("%", "_")
      extractedName = `Document ${currentList.length + 1}`.replace(" ", "_");
      console.log(extractedName,"extractedName");
      
      // setUploadedFiles(prev => [
      //   ...prev,
      //   {
      //     name: extractedName, 
      //     uri: file.uri,
      //     type: file.type,
      //     size: file.size,
      //   }
      // ]);
      const fileObj = {
        name: extractedName,
        uri: file.uri,
        type: file.type,
        size: file.size,
      };

      setUploadedFiles(prev => ({
        ...prev,
        [field === "Personal" ? "documents" : "other_documents"]: [
          ...(prev[field === "Personal" ? "documents" : "other_documents"] || []),
          fileObj
        ]
      }));


      if (token) {
        uploadFileToServer(fileObj, field);
      } else {
        console.log("TOKEN NOT READY!");
      }

    } catch (error) {
      console.log("File picking cancelled or failed", error);
    }
  };

  
  // const pickDocument = async (field) => {
  //   try {
  //     const file = await PdfPicker.pickFile();

  //     const key = field === "Personal" ? "documents" : "other_documents";
  //     const currentList = uploadedFiles[key] || [];

  //     const newCustomName = `Document ${currentList.length + 1}`;
  //     console.log(newCustomName,"newCustomName");
      
  //     const fileObj = {
  //       shownName: newCustomName,
  //       uri: file.uri,
  //       type: file.type,
  //       size: file.size,
  //     };
  //     console.log(fileObj,"fileObj");
  //     setUploadedFiles(prev => ({
  //       ...prev,
  //       [key]: [...currentList, fileObj]
  //     }));


  //     if (token) {
  //       uploadFileToServer(
  //         {
  //           ...fileObj,
  //           name: newCustomName.replace(/\s+/g, "_") + ".pdf"
  //         },
  //         field
  //       );
  //     }

  //   } catch (error) {
  //     console.log("File picking cancelled or failed", error);
  //   }
  // };




  const uploadFileToServer = async (file, field) => {
    setUploading(true);
    try {
      const formData = new FormData();

      formData.append("employee_id", userData._id);
      formData.append("field", field);

      formData.append("document_file", {
        uri: file.uri,
        name: file.name,
        type: file.type || "application/octet-stream",
      });

      const response = await axios.post(
        "http://10.0.2.2:8080/employee/upload-employee-documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );

      console.log("Upload Result:", response.data.status);

      if (response.data.status) {
        // alert("Uploaded Successfully!");
        fetchUploadedDocs(userData._id, token);
      }
      else {
        alert("Upload Failed");
      }
    } catch (err) {
      console.log("UPLOAD ERROR:", err.response?.data || err);
    } finally {
      setUploading(false);
    }
  };

  const fetchUploadedDocs = async (employeeId, token) => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8080/employee/get-employee-documents",
        { employee_id: employeeId },
        { headers: { "x-access-token": token } }
      );

      console.log("Fetched Docs:", response.data);
      console.log(response.data, "response.data.documents");

      if (response.data.success) {
        setUploadedFiles(prev => ({
          ...prev,
          documents: response.data.documents || [],
          other_documents: response.data.other_documents || []
        }));
      }
    } catch (error) {
      console.log("Fetch Docs Error:", error.response?.data || error);
    }
  };


  const buildFileUri = (filePath) => {
    return `http://10.0.2.2:8080/${filePath.replace(/\\/g, "/")}`;
  };
  const getMimeType = (uri) => {
  if (!uri) return "application/octet-stream";

  const ext = uri.split(".").pop().toLowerCase();

  switch (ext) {
    case "pdf":
      return "application/pdf";

    case "png":
      return "image/png";

    case "jpg":
    case "jpeg":
      return "image/jpeg";

    case "txt":
      return "text/plain";

    case "doc":
      return "application/msword";

    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    case "xls":
      return "application/vnd.ms-excel";

    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    case "ppt":
      return "application/vnd.ms-powerpoint";

    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    case "csv":
      return "text/csv";

    case "zip":
      return "application/zip";

    case "rar":
      return "application/vnd.rar";

    default:
      return "application/octet-stream"; 
  }
};

  // const getMimeType = (uri) => {
  //   const ext = uri.split(".").pop().toLowerCase();
  //   switch (ext) {
  //     case "pdf": return "application/pdf";
  //     case "png": return "image/png";
  //     case "jpg":
  //     case "jpeg":
  //       return "image/jpeg";
  //     case "doc":
  //       return "application/msword";
        
  //     case "docx":
  //       return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  //     default:
  //       return "application/octet-stream";
  //   }
  // };




  // const downloadFile = async (remoteFileUrl, fileName) => {
  //   try {
  //     remoteFileUrl = buildFileUri(remoteFileUrl);
  //     const fileUrl = remoteFileUrl.replace(/\\/g, "/");

  //     const downloadDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;
  //     const localPath = `${downloadDir}/${fileName || ("doc_" + Date.now())}`;

  //     console.log("Downloading to:", localPath);

  //     const res = await ReactNativeBlobUtil.config({
  //       addAndroidDownloads: {
  //         useDownloadManager: true,
  //         notification: true,
  //         path: localPath,
  //         title: "Downloading Document",
  //         mime: getMimeType(fileUrl),
  //       },
  //     }).fetch("GET", fileUrl);

  //     console.log("Downloaded File Path:", res.path());
  //     // alert("Download Completed!");
  //   } catch (e) {
  //     console.log("Download error:", e);
  //     alert("Download Failed");
  //   }
  // };

  const downloadFile = async (remoteFileUrl, fileName) => {
  try {
    remoteFileUrl = buildFileUri(remoteFileUrl);
    const fileUrl = remoteFileUrl.replace(/\\/g, "/");

    const downloadDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;

    let safeName = fileName;

    if (!safeName || !safeName.includes(".")) {

      const matchExt = fileUrl.split(".").pop();

      if (matchExt && matchExt.length <= 4) {
        safeName = (fileName || ("doc_" + Date.now())) + "." + matchExt;
      } else {
        safeName = (fileName || ("doc_" + Date.now())) + ".pdf"; 
      }
    }

    const localPath = `${downloadDir}/${safeName}`;

    console.log("Downloading to:", localPath);

    const res = await ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: localPath,
        title: "Downloading Document",
        mime: getMimeType(localPath),
      },
    }).fetch("GET", fileUrl);

    console.log("Downloaded File Path:", res.path());
  } catch (e) {
    console.log("Download error:", e);
    alert("Download Failed");
  }
};

  const renameFile = async () => {
    if (!renameText.trim()) return;

    try {
      const selectedArray = activeTab === "Personal" ? "documents" : "other_documents";
      const doc = uploadedFiles[selectedArray][renameIndex];

      const document_id = doc._id || doc.id;
      if (!document_id) {
        alert("Unable to rename: document id missing.");
        setRenameModalVisible(false);
        return;
      }

      const response = await axios.post(
        "http://10.0.2.2:8080/employee/rename-employee-document",
        {
          employee_id: userData._id,
          document_id: document_id,
          new_name: renameText,
          field: activeTab === "Personal" ? "Personal" : "Others"
        },
        {
          headers: { "x-access-token": token }
        }
      );

      if (response.data.success) {
        setUploadedFiles(prev => {
          const updated = { ...prev };
          const arrCopy = [...(updated[selectedArray] || [])];
          arrCopy[renameIndex] = { ...arrCopy[renameIndex], file_name: renameText };
          updated[selectedArray] = arrCopy;
          return updated;
        });

        // alert("Renamed Successfully!");
      } else {
        alert(response.data.message || "Rename Failed");
      }
    } catch (error) {
      console.log("Rename Error:", error.response?.data || error);
      alert("Rename Failed");
    }

    setRenameModalVisible(false);
  };



  const deleteDocument = async (docId, index, field) => {
    console.log(docId, "docId", userData._id, "userData._id");

    try {
      const response = await axios.post(
        "http://10.0.2.2:8080/employee/delete-employee-document",
        {
          employee_id: userData._id,
          document_id: docId,
          field: field
        },
        {
          headers: {
            "x-access-token": token
          }
        }
      );

      // console.log("Delete Response:", response.data);

      if (response.data.success) {
        // alert("Deleted Successfully!");

        setUploadedFiles(prev => {
          if (activeTab === "Personal") {
            return {
              ...prev,
              documents: prev.documents.filter((_, i) => i !== index)
            };
          } else {
            return {
              ...prev,
              other_documents: prev.other_documents.filter((_, i) => i !== index)
            };
          }
        });
      } else {
        alert("Delete Failed");
      }

    } catch (error) {
      console.log("Delete Error:", error.response?.data || error);
    }
  };



  const route = useRoute();
  const screenTitle = route.params?.title;


  return (
    <TouchableWithoutFeedback onPress={() => setMenuIndex(null)}>
      <LinearGradient colors={["#0B132B", "#1c68beff"]} style={styles.gradient}>
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>

          <Navbar title={screenTitle} />

          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "Personal" && styles.tabButtonActive]}
              onPress={() => setActiveTab("Personal")}
            >
              <Text style={[styles.tabText, activeTab === "Personal" && styles.tabTextActive]}>
                Personal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === "Others" && styles.tabButtonActive]}
              onPress={() => setActiveTab("Others")}
            >
              <Text style={[styles.tabText, activeTab === "Others" && styles.tabTextActive]}>
                Others
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Uploaded PDFs</Text>

            <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(activeTab)}>
              <Text style={styles.uploadText}>Upload File</Text>
            </TouchableOpacity>
          </View>
          {uploading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={{ color: "white", marginTop: 5 }}>Uploading...</Text>
            </View>
          )}

          <ScrollView
            style={styles.fileScroll}
            contentContainerStyle={styles.fileScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >

            {activeTab === "Personal" && uploadedFiles.documents.map((file, index) => (
              <View key={index} style={styles.card}>
                {/* <View style={styles.cardLeft}>
                <Text style={styles.cardIcon}>📄</Text>
                <Text style={styles.cardTitle}>{file.file_name}</Text>
              </View> */}
                <TouchableOpacity
                  key={index}
                  // style={styles.card}
                  activeOpacity={0.8}
                  onPress={() => {
                    const uri = buildFileUri(file.file_path);
                    setSelectedFile({ ...file, uri });
                    setIsPDF(file.file_type === "application/pdf");
                    setModalVisible(true);
                  }}
                >
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardIcon}>📄</Text>
                    <Text style={styles.cardTitle}>{file.file_name}</Text>
                  </View>

                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() => setMenuIndex(menuIndex === index ? null : index)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.menuDots}>⋮</Text>
                  </TouchableOpacity>

                  {menuIndex === index && (
                    <View style={styles.dropdown}>
                      {/* <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={async () => {
                        const uri = buildFileUri(file.file_path);
                        setSelectedFile({ ...file, uri });
                        setIsPDF(file.file_type === "application/pdf");
                        setModalVisible(true);
                        setMenuIndex(null);
                      }}
                    >
                      <Text style={styles.dropdownText}>👁  View</Text>
                    </TouchableOpacity> */}

                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          downloadFile(file.file_path, file.file_name);
                          setMenuIndex(null);
                        }}
                      >
                        <Text style={styles.dropdownText}>⬇️  Download</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setRenameIndex(index);
                          setRenameText(file.file_name);
                          setRenameModalVisible(true);
                          setMenuIndex(null);
                        }}
                      >
                        <Text style={styles.dropdownText}>✏️  Rename</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          deleteDocument(file._id || file.id, index, "Personal");
                          setMenuIndex(null);
                        }}
                      >
                        <Text style={styles.dropdownText}>🗑️  Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}

            {/* Others */}
            {activeTab === "Others" && uploadedFiles.other_documents.map((file, index) => (
              <View key={index} style={styles.card}>
                {/* <View style={styles.cardLeft}>
                <Text style={styles.cardIcon}>📄</Text>
                <Text style={styles.cardTitle}>{file.file_name}</Text>
              </View> */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    const uri = buildFileUri(file.file_path);
                    setSelectedFile({ ...file, uri });
                    setIsPDF(file.file_type === "application/pdf");
                    setModalVisible(true);
                  }}
                >
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardIcon}>📄</Text>
                    <Text style={styles.cardTitle}>{file.file_name}</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() => setMenuIndex(menuIndex === index ? null : index)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.menuDots}>⋮</Text>
                  </TouchableOpacity>

                  {menuIndex === index && (
                    <View style={styles.dropdown}>
                      {/* <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={async () => {
                          const uri = buildFileUri(file.file_path);
                          setSelectedFile({ ...file, uri });
                          setIsPDF(file.file_type === "application/pdf");
                          setModalVisible(true);
                          setMenuIndex(null);
                        }}
                      >
                        <Text style={styles.dropdownText}>👁  View</Text>
                      </TouchableOpacity> */}

                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          downloadFile(file.file_path, file.file_name);
                          setMenuIndex(null);
                        }}
                      >
                        <Text style={styles.dropdownText}>⬇️  Download</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setRenameIndex(index);
                          setRenameText(file.file_name);
                          setRenameModalVisible(true);
                          setMenuIndex(null);
                        }}
                      >
                        <Text style={styles.dropdownText}>✏️  Rename</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          deleteDocument(file._id || file.id, index, "Others");
                          setMenuIndex(null);
                        }}
                      >
                        <Text style={styles.dropdownText}>🗑️  Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}

            <View style={{ height: 140 }} />
          </ScrollView>
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.overlay}>
              <LinearGradient colors={["#00213F", "#002C56"]} style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedFile?.file_name}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeBtn}>✖</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ height: 450, marginTop: 10 }}>
                  {!selectedFile ? (
                    <Text style={{ color: "#fff" }}>No File Available</Text>
                  ) : isPDF ? (
                    <Pdf
                      source={{ uri: selectedFile.uri }}
                      trustAllCerts={false}
                      style={{ width: "100%", height: "100%", borderRadius: 12 }}
                      onError={err => console.log("PDF Error:", err)}
                    />
                  ) : (
                    <Image
                      source={{ uri: selectedFile.uri }}
                      style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                    />
                  )}
                </View>
              </LinearGradient>
            </View>
          </Modal>

          <Modal transparent={true} visible={renameModalVisible} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Rename File</Text>

                <TextInput
                  value={renameText}
                  onChangeText={setRenameText}
                  style={styles.input}
                  placeholder="Enter new name"
                  placeholderTextColor="#ccc"
                />

                <View style={styles.modalBtns}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setRenameModalVisible(false)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.saveBtn} onPress={renameFile}>
                    <Text style={styles.saveText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <BottomNavigation />
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );

};

export default DocumentVaultScreen;

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 15 },

  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: "#0f1b33",
    borderRadius: 25,
    marginTop: -450,
    zIndex: 50,
    elevation: 6,
    padding: 4,
  },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 20 },
  tabButtonActive: { backgroundColor: "#1c68be", borderRadius: 20 },
  tabText: { color: "#788a9e", fontWeight: "600" },
  tabTextActive: { color: "#fff" },


  titleRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 40,
    elevation: 4,
  },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  uploadBtn: {
    backgroundColor: "#1c68be",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadText: { color: "#fff", fontSize: 13, fontWeight: "600" },


  fileScroll: {
    flex: 1,
    marginTop: 8,
    zIndex: 1,
  },
  fileScrollContent: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardLeft: { flexDirection: "row", alignItems: "center", marginTop:5},
  cardIcon: { fontSize: 22, marginRight: 10, color: "#fff" },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },

  menuDots: { color: "#fff", fontSize: 22, padding: 5 },

  dropdown: {
    position: "absolute",
    top: 28,
    right: 0,
    backgroundColor: "#1c1c2b",
    padding: 8,
    borderRadius: 6,
    width: 140,
    zIndex: 999,
    elevation: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  dropdownItem: { paddingVertical: 8 },
  dropdownText: { color: "#fff", fontSize: 14 },


  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 8,
  },
  modalTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  closeBtn: { color: "red", fontSize: 20, fontWeight: "bold" },

  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" },
  modalBox: { width: "80%", backgroundColor: "#1c1c2b", padding: 20, borderRadius: 10 },
  modalBtns: { flexDirection: "row", justifyContent: "flex-end" },
  cancelBtn: { marginRight: 15 },
  saveBtn: { backgroundColor: "#1c68be", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6 },
  saveText: { color: "#fff", fontWeight: "600" },
  cancelText: { color: "#bbb", fontSize: 15 },
  input: { backgroundColor: "#303045", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 15 },
});

