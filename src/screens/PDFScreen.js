import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPDF } from '../features/installationOrder/installationOrderSlice';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import Spinner from '../components/Spinner';
import HeaderTitle from '../components/HeaderTitle';
//import Pdf from 'react-native-pdf';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';

const PDFScreen = ({ navigation, route }) => {
  const filePath = route.params.filePath;
  const fileName = route.params.fileName;
  const fileUri = FileSystem.documentDirectory + filePath + fileName;
  const { isLoading, error } = useSelector((state) => state.installationOrder);

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [pressAndGoBack, setPressAndGoBack] = useState(false);

  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  const source = {
    uri: fileUri,
    cache: true,
  };

  //initialize
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={`OBJOIN - PDF - ${fileName}`} />,
    });

    dispatch(openPDF({ fileName, filePath }));
  }, []);

  // handle error
  useEffect(() => {
    if (error !== '') {
      //show modal error and go back
      setModalMessage(error.message);
      setPressAndGoBack(true);
      setModalType(0);
      setIsModalVisible(true);
    }
  }, [error]);

  const goBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1">
      {/* Modal box */}
      <ModalBox
        isModalVisible={isModalVisible}
        modalMessage={modalMessage}
        modalType={modalType}
        setIsModalVisible={setIsModalVisible}
        pressAndGoBack={pressAndGoBack}
        goBack={goBack}
      />
      <Pdf
        maxScale={10}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          //console.log(`Number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          //console.log(`Current page: ${page}`)
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          //console.log(`Link pressed: ${uri}`)
        }}
        style={{ flex: 1, width, height }}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default PDFScreen;
